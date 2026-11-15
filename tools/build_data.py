#!/usr/bin/env python3
"""Build normalized static data from the supplied Snapchat and WhatsApp exports.
No AI or network access is used. The source archives are never modified.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

IL = ZoneInfo("Asia/Jerusalem")
INVIS = "\u200e\u200f\u202a\u202c\ufeff\u2060"
MEDIA_EXTS = {"jpg","jpeg","png","gif","webp","mp4","opus","m4a","pdf","zip","doc","docx","xls","xlsx","vcf","3gp","webm","avi","mov","mp3","ogg","aac","wav","heic","mkv"}


def clean_name(s: str) -> str:
    return s.translate({ord(c): None for c in INVIS}).strip()


def iso_ms(dt: datetime) -> int:
    return int(dt.timestamp() * 1000)


def read_json_from_zip(z: zipfile.ZipFile, name: str):
    with z.open(name) as f:
        return json.load(f)


def safe_rel(name: str) -> Path:
    parts = [p for p in Path(name).parts if p not in ("", ".")]
    if any(p == ".." for p in parts):
        raise ValueError(f"unsafe archive path: {name}")
    return Path(*parts)


def extract_entry(z: zipfile.ZipFile, info: zipfile.ZipInfo, root: Path, rel: Path) -> None:
    target = root / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    with z.open(info) as src, target.open("wb") as dst:
        shutil.copyfileobj(src, dst, length=1024 * 1024)


def parse_snapchat(src: Path, out: Path):
    snap_media_root = out / "media" / "snapchat"
    snap_media_root.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(src) as z:
        history = read_json_from_zip(z, "json/chat_history.json")
        raw = history.get("myrb_bnkhyy2020", [])
        entries = []
        archive_media = {}
        for info in z.infolist():
            name = info.filename
            if name.endswith("/"):
                continue
            if name.startswith("chat_media/") or name.startswith("memories/"):
                rel = safe_rel(name)
                archive_media[Path(name).name] = str(rel)
                extract_entry(z, info, snap_media_root, rel)
        all_media_names = list(archive_media)
        for original_index, item in enumerate(raw):
            created = str(item.get("Created") or "")
            dt = None
            for fmt in ("%Y-%m-%d %H:%M:%S UTC", "%Y-%m-%d %H:%M:%S"):
                try:
                    dt = datetime.strptime(created, fmt).replace(tzinfo=timezone.utc)
                    break
                except ValueError:
                    pass
            micros = item.get("Created(microseconds)")
            try:
                numeric = int(micros)
            except (TypeError, ValueError):
                numeric = iso_ms(dt) if dt else 0
            # Snapchat export uses a 13-digit millisecond value despite the field name.
            if numeric > 10**14:
                numeric //= 1000
            if dt is None:
                dt = datetime.fromtimestamp(numeric / 1000, tz=timezone.utc)
            local_dt = dt.astimezone(IL)
            is_sender = bool(item.get("IsSender"))
            ids = item.get("Media IDs") or ""
            if isinstance(ids, list):
                id_text = " ".join(map(str, ids))
            else:
                id_text = str(ids)
            attached = []
            tokens = [clean_name(x) for x in re.split(r"[,;|\\s]+", id_text) if clean_name(x)]
            for filename in all_media_names:
                base = clean_name(filename)
                stem = clean_name(Path(filename).stem)
                if any(tok == base or tok == stem or tok in base for tok in tokens):
                    attached.append(f"media/snapchat/{archive_media[filename]}")
            entries.append({
                "id": f"snap-{original_index}",
                "ts": int(numeric),
                "date": local_dt.strftime("%Y-%m-%d"),
                "time": local_dt.strftime("%H:%M"),
                "sender": "other" if is_sender else "me",
                "name": "האושר של חיי😍😍😍😍" if is_sender else "אני",
                "type": str(item.get("Media Type") or "TEXT").upper(),
                "text": str(item.get("Content") or ""),
                "saved": bool(item.get("IsSaved")),
                "media": attached,
                "original": {"from": item.get("From"), "isSender": is_sender, "created": created, "mediaIds": id_text},
            })
    entries.sort(key=lambda x: (x["ts"], int(x["id"].split("-")[-1])))
    return entries, {"archiveFiles": len(archive_media), "mediaNames": all_media_names}


def whatsapp_dt(date_s: str, time_s: str) -> datetime | None:
    date_s = date_s.replace("/", ".")
    for fmt in ("%d.%m.%Y %H:%M", "%d.%m.%Y %H:%M:%S"):
        try:
            return datetime.strptime(f"{date_s} {time_s}", fmt).replace(tzinfo=IL)
        except ValueError:
            continue
    return None


def parse_whatsapp(src: Path, out: Path):
    wa_root = out / "media" / "whatsapp"
    wa_root.mkdir(parents=True, exist_ok=True)
    start_re = re.compile(r"^(\d{1,2}[./]\d{1,2}[./]\d{4}), (\d{1,2}:\d{2}(?::\d{2})?) - (.*)$")
    messages = []
    missing = []
    media_names = []
    with zipfile.ZipFile(src) as z:
        infos = [i for i in z.infolist() if not i.filename.endswith("/")]
        text_infos = [i for i in infos if i.filename.lower().endswith(".txt")]
        if not text_infos:
            raise RuntimeError("WhatsApp chat TXT was not found")
        chat_info = max(text_infos, key=lambda i: i.file_size)
        with z.open(chat_info) as f:
            text = f.read().decode("utf-8-sig", "replace")
        current = None
        for line in text.splitlines():
            m = start_re.match(line)
            if m:
                if current is not None:
                    messages.append(current)
                date_s, time_s, rest = m.groups()
                dt = whatsapp_dt(date_s, time_s)
                sender = None
                body = rest
                if ": " in rest:
                    sender, body = rest.split(": ", 1)
                elif ":" in rest:
                    sender, body = rest.split(":", 1)
                    body = body.lstrip()
                current = {"date_s": date_s, "time_s": time_s, "dt": dt, "senderOriginal": sender, "text": body}
            elif current is not None:
                current["text"] += "\n" + line
        if current is not None:
            messages.append(current)
        archive_by_base = {}
        for info in infos:
            if info == chat_info:
                continue
            rel = safe_rel(Path(info.filename).name)
            # Keep source media names exactly as exported, with a safe flat media folder.
            extract_entry(z, info, wa_root, rel)
            archive_by_base[rel.name] = rel
            media_names.append(rel.name)
        # A follow-up export may contain only the TXT and contact cards.
        # Reuse media already extracted from the numbered export parts.
        for existing in wa_root.iterdir():
            if existing.is_file() and existing.name not in archive_by_base:
                archive_by_base[existing.name] = Path(existing.name)
        media_names = sorted(archive_by_base)
        for i, item in enumerate(messages):
            dt = item["dt"] or datetime(1970, 1, 1, tzinfo=IL)
            sender_raw = clean_name(item["senderOriginal"] or "")
            system = item["senderOriginal"] is None
            is_hila = "הילה" in sender_raw
            is_mine = bool(sender_raw) and not is_hila
            attached = []
            for filename, rel in archive_by_base.items():
                if filename in item["text"]:
                    attached.append(f"media/whatsapp/{rel.name}")
            if "קובץ מצורף" in item["text"] and not attached:
                missing.append({"message": i, "text": item["text"][:300]})
            ext_types = [Path(x).suffix.lower().lstrip(".") for x in attached]
            kind = "SYSTEM" if system else (ext_types[0].upper() if ext_types else "TEXT")
            if kind in {"JPG","JPEG","PNG","GIF","WEBP","HEIC"}: kind = "IMAGE"
            elif kind in {"MP4","3GP","WEBM","AVI","MOV","MKV"}: kind = "VIDEO"
            elif kind in {"OPUS","M4A","MP3","OGG","AAC","WAV"}: kind = "AUDIO"
            elif kind in {"PDF","DOC","DOCX","XLS","XLSX","ZIP","VCF"}: kind = "DOCUMENT"
            display_name = "מערכת" if system else ("אלה❤️" if is_hila else "הילה❤️")
            messages[i] = {
                "id": f"wa-{i}",
                "ts": iso_ms(dt),
                "date": dt.strftime("%Y-%m-%d"),
                "time": dt.strftime("%H:%M"),
                "sender": "system" if system else ("other" if is_mine else "me"),
                "name": display_name,
                "type": kind,
                "text": item["text"],
                "saved": False,
                "media": attached,
                "original": {"sender": item["senderOriginal"], "date": item["date_s"], "time": item["time_s"]},
            }
    messages.sort(key=lambda x: x["ts"])
    return messages, {"archiveFiles": len(media_names), "mediaNames": media_names, "missingAttachments": missing, "chatFile": chat_info.filename}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--snapchat", type=Path, required=True)
    ap.add_argument("--whatsapp", type=Path, required=True)
    ap.add_argument("--out", type=Path, default=Path("."))
    args = ap.parse_args()
    out = args.out.resolve()
    (out / "data").mkdir(parents=True, exist_ok=True)
    snap, snap_meta = parse_snapchat(args.snapchat, out)
    wa, wa_meta = parse_whatsapp(args.whatsapp, out)
    for name, value in (("snapchat.json", snap), ("whatsapp.json", wa)):
        with (out / "data" / name).open("w", encoding="utf-8") as f:
            json.dump(value, f, ensure_ascii=False, separators=(",", ":"))
    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "publicMode": True,
        "snapchat": {"chat": "myrb_bnkhyy2020", "messages": len(snap), **snap_meta},
        "whatsapp": {"messages": len(wa), **wa_meta},
        "notes": ["The WhatsApp source export contains large videos; GitHub's 100 MB per-file limit may require Git LFS or external storage.", "Data is intentionally unencrypted because the user explicitly requested public/plain mode."],
    }
    with (out / "data" / "manifest.json").open("w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(json.dumps({"snapchatMessages": len(snap), "whatsappMessages": len(wa), "snapchatMedia": snap_meta["archiveFiles"], "whatsappMedia": wa_meta["archiveFiles"], "missingAttachments": len(wa_meta["missingAttachments"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
