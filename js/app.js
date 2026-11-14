(() => {
'use strict';
const $ = (s) => document.querySelector(s);
const ICON = {
  back: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 15l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  up: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M6 15l6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z"/></svg>',
  video: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 10l6-3v10l-6-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  emoji: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 14c1 1.5 2.2 2.2 3.5 2.2s2.5-.7 3.5-2.2M9 9.5v.4M15 9.5v.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  clip: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 11l-7.5 7.5a4.5 4.5 0 0 1-6.4-6.4l8-8a3 3 0 0 1 4.3 4.3l-8 8a1.5 1.5 0 0 1-2.1-2.1L15 7.5"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1"/></svg>',
  ticks: '<svg viewBox="0 0 16 11" width="17" height="12"><path d="M11.07.65 5.1 7.5 2.4 5.3l-.9.9 3.7 3.7 6.8-7.5zM15.1.65 9.1 7.4l-.5-.4-.9.9 1.5 1.5 6.9-7.8z" fill="#53bdeb"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg>',
  goto: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
  person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c0-4.5 3.6-7 8-7s8 2.5 8 7z" fill="currentColor"/></svg>',
  first: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M6 5h12M6 12l6-6 6 6M12 6v14"/></svg>',
  last: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M6 19h12M6 12l6 6 6-6M12 18V4"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M4 5h16v11H9l-5 4z"/></svg>',
};

/* ------------------------------------------------------------------ */
const SOURCES = {
  snapchat: { file: 'data/snapchat.json', theme: 'theme-snap', contact: 'האושר של חיי ❤️', me: 'אני', other: 'האושר של חיי ❤️', accent: '#0eadff', avatarText: '❤️' },
  whatsapp: { file: 'data/whatsapp.json', theme: 'theme-wa', contact: 'אלה ❤️', me: 'הילה', other: 'אלה ❤️', accent: '#00a884', avatarText: 'א' },
};
const STATUS_LABEL = {
  STATUS: 'עדכון סטטוס',
  STATUSERASEDMESSAGE: 'הודעה נמחקה',
  STATUSERASEDSNAPMESSAGE: 'סנאפ נמחק',
  STATUSCONVERSATIONCAPTURERECORD: 'הקלטת מסך של השיחה',
  STATUSCONVERSATIONCAPTURESCREENSHOT: 'צילום מסך של השיחה',
  STATUSCALLMISSEDAUDIO: 'שיחה קולית שלא נענתה',
  STATUSCALLMISSEDVIDEO: 'שיחת וידאו שלא נענתה',
  STATUSSAVETOCAMERAROLL: 'נשמר בגלריה',
};
const IMG = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'bmp'];
const VID = ['mp4', 'webm', 'mov', '3gp', 'mkv', 'avi'];
const AUD = ['opus', 'm4a', 'mp3', 'ogg', 'aac', 'wav', 'amr'];

const S = {
  key: null, cfg: null, msgs: [], rows: [], heights: null, offsets: null, total: 0,
  nodes: new Map(), lower: [], rowOfMsg: [], t0: 0, t1: 0,
  q: '', hits: [], hitPos: -1, cache: {}, gallery: null, viewerPos: 0, flip: false, audio: null, audioEl: null,
};
const el = {
  home: $('#home'), chat: $('#chat'), info: $('#info'), scroll: $('#scroll'), vc: $('#vc'), loading: $('#loading'),
  stage: $('#stage'), track: $('#track'), thumb: $('#thumb'), tip: $('#tip'), ticks: $('#ticks'), toBottom: $('#to-bottom'),
  searchbar: $('#searchbar'), sInput: $('#s-input'), sCount: $('#s-count'), viewer: $('#viewer'), vStage: $('#v-stage'),
};

/* ---------- עזרים ---------- */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ext = (p) => String(p).split('?')[0].split('.').pop().toLowerCase();
const base = (p) => decodeURIComponent(String(p).split('/').pop());
const url = (p) => String(p).split('/').map(encodeURIComponent).join('/');
const fmtLong = (iso) => new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso + 'T12:00:00'));
const fmtMonth = (ts) => new Intl.DateTimeFormat('he-IL', { month: 'short', year: '2-digit' }).format(new Date(ts));
const num = (n) => n.toLocaleString('he-IL');
const clean = (t) => String(t || '').replace(/[‎‏‪-‮]/g, '');
const LINK_RE = /https?:\/\/[^\s<>"']+/g;
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }
const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const mediaOf = (m) => (m.media || []);
const isStickerFile = (p) => /(^|\/)STK-/i.test(p) || ext(p) === 'was';
const isAttachText = (t) => /\(קובץ מצורף\)\s*$/.test(clean(t).trim());

function setIcons() {
  const set = (id, k) => { const e = $(id); if (e) e.innerHTML = ICON[k]; };
  set('#back', 'back'); set('#tb-video', 'video'); set('#tb-call', 'phone'); set('#tb-search', 'search'); set('#tb-more', 'info');
  set('#s-close', 'back'); set('#s-up', 'up'); set('#s-down', 'down'); set('#info-back', 'back');
  set('#v-close', 'close'); set('#v-goto', 'goto'); set('#v-prev', 'back'); set('#v-next', 'chevL');
  set('#r-first', 'up'); set('#r-last', 'down'); set('#to-bottom', 'down');
  set('#ia-search', 'search'); set('#ia-first', 'first'); set('#ia-last', 'last');
}

/* ---------- טעינה ---------- */
async function load(key) {
  if (S.cache[key]) return S.cache[key];
  const r = await fetch(SOURCES[key].file);
  if (!r.ok) throw new Error('load failed ' + r.status);
  const d = await r.json();
  S.cache[key] = d;
  return d;
}
async function preCounts() {
  for (const [k, id] of [['snapchat', '#snap-count'], ['whatsapp', '#wa-count']]) {
    try { const d = await load(k); $(id).textContent = num(d.length) + ' הודעות'; } catch { $(id).textContent = 'לא נטען'; }
  }
}

/* ---------- בניית שורות ---------- */
function buildRows() {
  const rows = []; const rowOfMsg = new Array(S.msgs.length);
  let prev = null, prevDate = '';
  S.msgs.forEach((m, i) => {
    if (m.date !== prevDate) { rows.push({ k: 'd', date: m.date, ts: m.ts, mi: i }); prevDate = m.date; prev = null; }
    const kind = String(m.type || 'TEXT').toUpperCase();
    const system = kind === 'SYSTEM' || kind.startsWith('STATUS') || m.sender === 'system';
    if (system) { rows.push({ k: 's', mi: i, ts: m.ts }); rowOfMsg[i] = rows.length - 1; prev = null; return; }
    const first = !prev || prev.sender !== m.sender || (m.ts - prev.ts) > 10 * 60 * 1000;
    rows.push({ k: 'm', mi: i, first, ts: m.ts });
    rowOfMsg[i] = rows.length - 1; prev = m;
  });
  S.rows = rows; S.rowOfMsg = rowOfMsg;
  const n = rows.length;
  S.heights = new Float32Array(n);
  for (let i = 0; i < n; i++) S.heights[i] = estimate(rows[i]);
  S.offsets = new Float64Array(n + 1);
  rebuildOffsets(0);
}
function estimate(r) {
  if (r.k === 'd') return 44;
  const m = S.msgs[r.mi];
  if (r.k === 's') return 36;
  const md = mediaOf(m); let h = r.first ? 40 : 6;
  if (md.length) { const p = md[0]; h += isStickerFile(p) ? 150 : (AUD.includes(ext(p)) || m.type === 'NOTE') ? 60 : 280; }
  const t = clean(m.text);
  if (t && !(md.length && isAttachText(t))) h += Math.max(1, Math.ceil(t.length / 30) + (t.split('\n').length - 1)) * 21 + 8;
  else if (!md.length) h += 44;
  return h;
}
function rebuildOffsets(from) {
  const o = S.offsets, h = S.heights, n = h.length;
  for (let i = from; i < n; i++) o[i + 1] = o[i] + h[i];
  S.total = o[n];
}
function rowAt(y) { // אינדקס השורה שמכילה את y
  const o = S.offsets; let lo = 0, hi = S.rows.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (o[mid] <= y) lo = mid; else hi = mid - 1; }
  return lo;
}

/* ---------- רינדור שורה ---------- */
function hl(text) { // הדגשת חיפוש + קישורים (על טקסט כבר מנוקה)
  const t = clean(text);
  const parts = []; let last = 0, m;
  LINK_RE.lastIndex = 0;
  const segs = [];
  while ((m = LINK_RE.exec(t))) { segs.push([last, m.index, false]); segs.push([m.index, m.index + m[0].length, true]); last = m.index + m[0].length; }
  segs.push([last, t.length, false]);
  for (const [a, b, isLink] of segs) {
    if (a >= b) continue;
    let s = t.slice(a, b), html = '';
    if (S.q) {
      const ls = s.toLocaleLowerCase('he'); let i = 0, j;
      while ((j = ls.indexOf(S.q, i)) !== -1) { html += esc(s.slice(i, j)) + '<mark>' + esc(s.slice(j, j + S.q.length)) + '</mark>'; i = j + S.q.length; }
      html += esc(s.slice(i));
    } else html = esc(s);
    parts.push(isLink ? `<a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${html}</a>` : html);
  }
  return parts.join('');
}
function waveHTML(seed) {
  const h = hash(seed); let s = h, out = '';
  for (let i = 0; i < 34; i++) { s = (Math.imul(s, 1103515245) + 12345) >>> 0; const v = 18 + (s >>> 16) % 82; out += `<i style="height:${v}%"></i>`; }
  return out;
}
function mediaHTML(m, p, sticker) {
  const e = ext(p), u = url(p);
  if (IMG.includes(e)) return sticker ? `<img class="stk" data-view="${esc(p)}" loading="lazy" src="${u}" alt="מדבקה">` : `<div class="media"><img data-view="${esc(p)}" loading="lazy" src="${u}" alt="תמונה"></div>`;
  if (VID.includes(e)) {
    if (m.type === 'NOTE') return voiceHTML(p);
    return `<div class="media"><video controls playsinline preload="metadata" src="${u}"></video></div>`;
  }
  if (AUD.includes(e)) return voiceHTML(p);
  if (e === 'was') return `<div class="stk-ph">😊</div>`;
  return `<a class="file" href="${u}" download target="_blank" rel="noopener">${ICON.doc}<b>${esc(base(p))}</b></a>`;
}
function voiceHTML(p) { return `<div class="voice" data-audio="${esc(url(p))}"><span class="v-play">${ICON.play}</span><div class="wave">${waveHTML(p)}</div><span class="v-time">🎤</span></div>`; }
function placeholderHTML(m) {
  const t = String(m.type).toUpperCase();
  if (t === 'STICKER' || t === 'WAS') return `<div class="stk-ph">😊</div>`;
  if (t === 'NOTE' || t === 'AUDIO') return `<div class="ph"><span class="em">🎤</span>הודעה קולית (הקובץ לא נמצא בייצוא)</div>`;
  if (t === 'VIDEO') return `<div class="ph"><span class="em">🎞️</span>סרטון (הקובץ לא נמצא בייצוא)</div>`;
  if (t === 'IMAGE' || t === 'MEDIA') return `<div class="ph"><span class="em">📷</span>תמונה (הקובץ לא נמצא בייצוא)</div>`;
  if (t === 'DOCUMENT') return `<div class="ph"><span class="em">📎</span>מסמך (הקובץ לא נמצא בייצוא)</div>`;
  return `<div class="ph"><span class="em">❔</span>${esc(t)}</div>`;
}
function rowHTML(r, i) {
  const m = S.msgs[r.mi];
  if (r.k === 'd') return { cls: 'chip-row', html: `<span class="chip">${esc(fmtLong(r.date))}</span>` };
  if (r.k === 's') {
    const t = String(m.type).toUpperCase();
    let label = m.sender === 'system' ? hl(m.text) : esc(STATUS_LABEL[t] || t);
    if (S.key === 'snapchat') { const who = m.sender === 'me' ? S.cfg.me : S.cfg.other; label = esc(who) + ' · ' + label; }
    return { cls: 'sys-row', html: `<span class="sys">${label}</span>` };
  }
  const mine = m.sender === 'me';
  const md = mediaOf(m); const kind = String(m.type).toUpperCase();
  const sticker = md.length && (isStickerFile(md[0]) || kind === 'STICKER');
  const rawText = clean(m.text).trim();
  const showText = rawText && !(md.length && isAttachText(rawText)) && !(!md.length && isAttachText(rawText));
  let inner = '';
  if (md.length) inner += md.map((p) => mediaHTML(m, p, sticker)).join('');
  else if (kind !== 'TEXT') inner += placeholderHTML(m);
  const textHTML = showText ? `<div class="txt">${hl(rawText)}</div>` : '';
  const cls = `m ${mine ? 'me' : 'other'}${r.first ? ' first gap' : ''}`;
  if (S.key === 'snapchat') {
    const who = mine ? S.cfg.me : S.cfg.other;
    const attrs = r.first ? ` data-label="${esc(who)}" data-time="${esc(m.time)}" style="--lw:${Math.round(who.length * 7.2 + 4)}px"` : '';
    return { cls, attrs, html: inner + textHTML };
  }
  const only = md.length && !showText && !sticker && (IMG.includes(ext(md[0])) || (VID.includes(ext(md[0])) && kind !== 'NOTE'));
  const meta = `<span class="meta">${esc(m.time)}${mine ? ICON.ticks : ''}</span>`;
  const bcls = `bubble${sticker ? ' sticker' : ''}${md.length && !sticker ? ' has-media' : ''}${only ? ' only-media' : ''}`;
  return { cls, html: `<div class="${bcls}">${inner}${textHTML}${meta}</div>` };
}
function makeRow(i) {
  const r = S.rows[i]; const d = rowHTML(r, i);
  const div = document.createElement('div');
  div.className = 'row ' + d.cls; div.dataset.i = i;
  if (d.attrs) { const tmp = document.createElement('div'); tmp.innerHTML = `<i${d.attrs}></i>`; const ch = tmp.firstChild; for (const a of ch.attributes) div.setAttribute(a.name, a.value); }
  div.innerHTML = d.html;
  div.style.top = S.offsets[i] + 'px';
  return div;
}

/* ---------- ווירטואליזציה ---------- */
let ignoreScroll = false, rafId = 0;
function firstVisible(st) { return rowAt(st); }
function render() {
  rafId = 0;
  if (!S.rows.length) return;
  const st = el.scroll.scrollTop, h = el.scroll.clientHeight, OVER = 900;
  const first = rowAt(Math.max(0, st - OVER));
  let last = rowAt(st + h + OVER) + 1; if (last > S.rows.length) last = S.rows.length;
  for (const [i, n] of S.nodes) if (i < first || i >= last) { n.remove(); S.nodes.delete(i); }
  const frag = document.createDocumentFragment(); const added = [];
  for (let i = first; i < last; i++) if (!S.nodes.has(i)) { const n = makeRow(i); S.nodes.set(i, n); frag.appendChild(n); added.push(i); }
  el.vc.appendChild(frag);
  measure(added, st);
  updateThumb();
}
function measure(idxs, st) {
  let minI = Infinity, delta = 0; const anchor = firstVisible(st);
  for (const i of idxs) {
    const n = S.nodes.get(i); if (!n) continue;
    const hh = n.offsetHeight;
    if (Math.abs(hh - S.heights[i]) > 0.5) { if (i < anchor) delta += hh - S.heights[i]; S.heights[i] = hh; if (i < minI) minI = i; }
  }
  if (minI !== Infinity) {
    rebuildOffsets(minI);
    for (const [i, n] of S.nodes) n.style.top = S.offsets[i] + 'px';
    el.vc.style.height = S.total + 'px';
    if (delta) { ignoreScroll = true; el.scroll.scrollTop = st + delta; }
  }
}
function schedule() { if (!rafId) rafId = requestAnimationFrame(render); }
el.scroll.addEventListener('scroll', () => { if (ignoreScroll) { ignoreScroll = false; } schedule(); }, { passive: true });
window.addEventListener('resize', schedule);
el.vc.addEventListener('load', (e) => {
  if (e.target.tagName !== 'IMG' && e.target.tagName !== 'VIDEO') return;
  const row = e.target.closest('.row'); if (!row) return;
  measure([+row.dataset.i], el.scroll.scrollTop);
}, true);
el.vc.addEventListener('loadedmetadata', (e) => { const row = e.target.closest && e.target.closest('.row'); if (row) measure([+row.dataset.i], el.scroll.scrollTop); }, true);
el.vc.addEventListener('error', (e) => {
  const t = e.target; if (t.tagName !== 'IMG' && t.tagName !== 'VIDEO') return;
  const row = t.closest('.row'); const holder = t.closest('.media') || t;
  const b = document.createElement('div'); b.className = 'broken'; b.innerHTML = '⚠️ הקובץ לא נמצא באתר';
  holder.replaceWith(b);
  if (row) measure([+row.dataset.i], el.scroll.scrollTop);
}, true);

function scrollToRow(i, center) {
  i = Math.max(0, Math.min(S.rows.length - 1, i));
  const h = el.scroll.clientHeight;
  const y = center ? S.offsets[i] - h / 2 + S.heights[i] / 2 : S.offsets[i] - 8;
  ignoreScroll = false;
  el.scroll.scrollTop = Math.max(0, y);
  render();
  // תיקון אחרי מדידה
  const y2 = center ? S.offsets[i] - h / 2 + S.heights[i] / 2 : S.offsets[i] - 8;
  if (Math.abs(y2 - el.scroll.scrollTop) > 2) { el.scroll.scrollTop = Math.max(0, y2); render(); }
}
function goToMsg(mi, flash) {
  const ri = S.rowOfMsg[mi]; scrollToRow(ri, true);
  if (flash) { const n = S.nodes.get(ri); if (n) { n.classList.remove('flash'); void n.offsetWidth; n.classList.add('flash'); } }
}

/* ---------- ציר זמן ---------- */
function rowByTs(ts) { // שורה ראשונה עם ts >= ts
  const r = S.rows; let lo = 0, hi = r.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (r[mid].ts < ts) lo = mid + 1; else hi = mid; }
  return lo;
}
function topRow() { return rowAt(el.scroll.scrollTop + 12); }
function updateThumb() {
  if (!S.rows.length) return;
  const r = S.rows[topRow()]; const span = Math.max(1, S.t1 - S.t0);
  const f = Math.min(1, Math.max(0, (r.ts - S.t0) / span));
  const th = el.track.clientHeight - el.thumb.offsetHeight;
  if (!dragging) el.thumb.style.top = (f * Math.max(0, th)) + 'px';
  const atBottom = el.scroll.scrollTop + el.scroll.clientHeight < S.total - 400;
  el.toBottom.hidden = !atBottom;
}
function buildTicks() {
  el.ticks.innerHTML = '';
  const span = Math.max(1, S.t1 - S.t0); const h = el.track.clientHeight; if (h < 100) return;
  const months = []; let d = new Date(S.t0); d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  while (d.getTime() < S.t1) { months.push(d.getTime()); d = new Date(d.getFullYear(), d.getMonth() + 1, 1); }
  const step = Math.max(1, Math.ceil(months.length / Math.floor(h / 46)));
  months.forEach((t, k) => { if (k % step) return; const s = document.createElement('span'); s.style.top = ((t - S.t0) / span) * (h - el.thumb.offsetHeight) + el.thumb.offsetHeight / 2 + 'px'; s.textContent = fmtMonth(t); el.ticks.appendChild(s); });
}
let dragging = false;
function trackFrac(ev) {
  const rc = el.track.getBoundingClientRect(); const th = el.thumb.offsetHeight;
  const y = ev.clientY - rc.top - th / 2; return Math.min(1, Math.max(0, y / Math.max(1, rc.height - th)));
}
function scrubTo(f, doJump) {
  const ts = S.t0 + f * (S.t1 - S.t0); const ri = rowByTs(ts);
  const th = el.track.clientHeight - el.thumb.offsetHeight;
  el.thumb.style.top = f * th + 'px';
  el.tip.style.top = f * th + el.thumb.offsetHeight / 2 + 'px';
  el.tip.textContent = fmtLong(S.msgs[S.rows[ri].mi].date);
  if (doJump) scrollToRow(ri, false);
}
el.track.addEventListener('pointerdown', (e) => {
  dragging = true; $('#rail').classList.add('drag'); el.track.setPointerCapture(e.pointerId); el.tip.classList.add('on'); scrubTo(trackFrac(e), true); e.preventDefault();
});
el.track.addEventListener('pointermove', (e) => { if (dragging) scrubTo(trackFrac(e), true); });
const endDrag = () => { dragging = false; $('#rail').classList.remove('drag'); el.tip.classList.remove('on'); updateThumb(); };
el.track.addEventListener('pointerup', endDrag); el.track.addEventListener('pointercancel', endDrag);
$('#r-first').addEventListener('click', () => { scrollToRow(0, false); el.scroll.scrollTop = 0; render(); });
$('#r-last').addEventListener('click', toEnd);
el.toBottom.addEventListener('click', toEnd);
function toEnd() { scrollToRow(S.rows.length - 1, false); el.scroll.scrollTop = S.total; render(); }

/* ---------- חיפוש ---------- */
let sTimer;
function openSearch() { el.searchbar.hidden = false; el.sInput.focus(); el.sInput.select(); }
function closeSearch() { el.searchbar.hidden = true; el.sInput.value = ''; setQuery(''); }
function setQuery(q) {
  S.q = q; S.hits = []; S.hitPos = -1;
  if (q) { for (let i = 0; i < S.lower.length; i++) if (S.lower[i].includes(q)) S.hits.push(i); }
  if (S.hits.length) { // התחל מהתוצאה הקרובה למיקום הנוכחי (או מהאחרונה)
    const cur = S.rows[topRow()].mi; let p = S.hits.findIndex((x) => x >= cur); if (p < 0) p = S.hits.length - 1; S.hitPos = p;
  }
  S.nodes.forEach((n) => n.remove()); S.nodes.clear();
  if (S.hitPos >= 0) goToMsg(S.hits[S.hitPos], true); else render();
  showCount();
}
function showCount() { el.sCount.textContent = !S.q ? '' : S.hits.length ? `${num(S.hitPos + 1)} / ${num(S.hits.length)}` : 'אין תוצאות'; }
function stepHit(d) {
  if (!S.hits.length) return;
  S.hitPos = (S.hitPos + d + S.hits.length) % S.hits.length; goToMsg(S.hits[S.hitPos], true); showCount();
}
el.sInput.addEventListener('input', () => { clearTimeout(sTimer); sTimer = setTimeout(() => setQuery(el.sInput.value.trim().toLocaleLowerCase('he')), 220); });
el.sInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(sTimer); const q = el.sInput.value.trim().toLocaleLowerCase('he'); if (q !== S.q) setQuery(q); else stepHit(e.shiftKey ? -1 : 1); } });
$('#s-up').addEventListener('click', () => stepHit(-1));
$('#s-down').addEventListener('click', () => stepHit(1));
$('#s-close').addEventListener('click', closeSearch);
$('#tb-search').addEventListener('click', openSearch);

/* ---------- הודעות קוליות ---------- */
el.vc.addEventListener('click', (e) => {
  const v = e.target.closest('.voice'); if (v) { toggleVoice(v, e); return; }
  const img = e.target.closest('[data-view]'); if (img) openViewerByPath(img.dataset.view);
});
function toggleVoice(v, e) {
  const src = v.dataset.audio;
  if (S.audio && S.audio.v === v) { // אותו נגן
    const a = S.audioEl;
    if (e.target.closest('.wave')) { const rc = v.querySelector('.wave').getBoundingClientRect(); const f = Math.min(1, Math.max(0, (e.clientX - rc.left) / rc.width)); if (a.duration) a.currentTime = f * a.duration; return; }
    if (a.paused) a.play(); else a.pause(); return;
  }
  stopVoice();
  const a = new Audio(src); S.audioEl = a; S.audio = { v };
  const play = v.querySelector('.v-play'), bars = [...v.querySelectorAll('.wave i')], time = v.querySelector('.v-time');
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  a.addEventListener('play', () => { play.innerHTML = ICON.pause; });
  a.addEventListener('pause', () => { play.innerHTML = ICON.play; });
  a.addEventListener('ended', () => { play.innerHTML = ICON.play; bars.forEach((b) => b.classList.remove('on')); time.textContent = fmt(a.duration || 0); });
  a.addEventListener('timeupdate', () => { const f = a.duration ? a.currentTime / a.duration : 0; bars.forEach((b, k) => b.classList.toggle('on', k / bars.length < f)); time.textContent = fmt(a.currentTime); });
  a.addEventListener('loadedmetadata', () => { time.textContent = fmt(a.duration); });
  a.addEventListener('error', () => { play.innerHTML = ICON.play; time.textContent = '⚠️'; toast('לא ניתן לנגן את הקובץ בדפדפן הזה'); });
  a.play().catch(() => {});
}
function stopVoice() {
  if (S.audioEl) { S.audioEl.pause(); const v = S.audio.v; const p = v.querySelector('.v-play'); if (p) p.innerHTML = ICON.play; }
  S.audioEl = null; S.audio = null;
}

/* ---------- מסך פרטים ---------- */
function collectGallery() {
  if (S.gallery) return S.gallery;
  const media = [], links = [], docs = [], voice = [];
  S.msgs.forEach((m, mi) => {
    mediaOf(m).forEach((p) => {
      const e = ext(p);
      if (isStickerFile(p) && e !== 'jpg') return;
      if (IMG.includes(e)) media.push({ p, mi, t: 'img', ts: m.ts });
      else if (VID.includes(e) && m.type !== 'NOTE') media.push({ p, mi, t: 'vid', ts: m.ts });
      else if (AUD.includes(e) || (VID.includes(e) && m.type === 'NOTE')) voice.push({ p, mi, ts: m.ts });
      else if (e !== 'was') docs.push({ p, mi, ts: m.ts });
    });
    const t = clean(m.text); let x; LINK_RE.lastIndex = 0;
    while ((x = LINK_RE.exec(t))) links.push({ u: x[0].replace(/[.,)]+$/, ''), mi, ts: m.ts });
  });
  media.reverse(); links.reverse(); docs.reverse(); voice.reverse();
  S.gallery = { media, links, docs, voice }; return S.gallery;
}
let tabKey = 'media', shown = 0;
function openInfo() {
  const g = collectGallery();
  $('#info-name').textContent = S.cfg.contact; $('#info-avatar').innerHTML = avatarInner(); $('#info-avatar').className = 'avatar xl';
  $('#info-sub').textContent = `${num(S.msgs.length)} הודעות · ${num(g.media.length)} תמונות וסרטונים`;
  $('#info-head').textContent = S.key === 'whatsapp' ? 'פרטי איש קשר' : 'פרופיל';
  $('#info').style.setProperty('--accent', S.cfg.accent);
  el.info.className = 'info ' + S.cfg.theme + (S.cfg.theme === 'theme-wa' ? ' theme-wa-info' : '');
  void el.info.offsetWidth; el.info.classList.add('open'); el.info.hidden = false;
  document.querySelectorAll('#tabs button').forEach((b) => { const k = b.dataset.tab; b.textContent = { media: 'מדיה', links: 'קישורים', docs: 'מסמכים', voice: 'קוליות' }[k] + ' ' + num(g[k].length); });
  showTab('media');
}
function closeInfo() { el.info.classList.remove('open'); setTimeout(() => { if (!el.info.classList.contains('open')) el.info.hidden = true; }, 260); }
function showTab(k) {
  tabKey = k; shown = 0;
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === k));
  $('#tab-content').innerHTML = ''; $('#info-body').scrollTop = Math.min($('#info-body').scrollTop, 300); moreItems();
}
function moreItems() {
  const g = collectGallery()[tabKey], box = $('#tab-content'); const old = box.querySelector('.more'); if (old) old.remove();
  if (!g.length) { box.innerHTML = '<div class="empty">אין פריטים להצגה</div>'; return; }
  const N = tabKey === 'media' ? 60 : 50; const slice = g.slice(shown, shown + N);
  let host = box.querySelector('.grid, .lst');
  if (!host) { host = document.createElement('div'); host.className = tabKey === 'media' ? 'grid' : 'lst'; box.appendChild(host); }
  host.insertAdjacentHTML('beforeend', slice.map((it, k) => itemHTML(it, shown + k)).join(''));
  shown += slice.length;
  if (shown < g.length) { const b = document.createElement('button'); b.className = 'more'; b.textContent = `הצג עוד (${num(g.length - shown)})`; b.onclick = moreItems; box.appendChild(b); }
}
function itemHTML(it, idx) {
  const d = S.msgs[it.mi].date;
  if (tabKey === 'media') return it.t === 'img'
    ? `<div class="cell" data-gi="${idx}"><img loading="lazy" src="${url(it.p)}" alt=""></div>`
    : `<div class="cell" data-gi="${idx}"><video preload="metadata" muted src="${url(it.p)}#t=0.1"></video><span class="badge">${ICON.play}</span></div>`;
  if (tabKey === 'links') { let host = it.u; try { host = new URL(it.u).hostname; } catch {} return `<div class="list-item" data-goto="${it.mi}"><span class="li-ic">${ICON.link}</span><span class="li-t"><b>${esc(it.u)}</b><small>${esc(host)} · ${esc(fmtLong(d))}</small></span></div>`; }
  if (tabKey === 'voice') return `<div class="list-item" data-goto="${it.mi}"><span class="li-ic">${ICON.mic}</span><span class="li-t"><b>${esc(base(it.p))}</b><small>${esc(fmtLong(d))} · ${esc(S.msgs[it.mi].time)} · לחץ למעבר להודעה</small></span></div>`;
  return `<a class="list-item" href="${url(it.p)}" download target="_blank" rel="noopener"><span class="li-ic">${ICON.doc}</span><span class="li-t"><b>${esc(base(it.p))}</b><small>${esc(fmtLong(d))}</small></span></a>`;
}
$('#tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showTab(b.dataset.tab); });
$('#tab-content').addEventListener('error', (e) => { const t = e.target; if (t.tagName === 'IMG' || t.tagName === 'VIDEO') { const cell = t.closest('.cell'); if (cell) { cell.innerHTML = '<span style="display:grid;place-items:center;height:100%;font-size:26px;opacity:.5">🖼️</span>'; } } }, true);
$('#tab-content').addEventListener('click', (e) => {
  const c = e.target.closest('.cell'); if (c) { openViewer(collectGallery().media, +c.dataset.gi); return; }
  const g = e.target.closest('[data-goto]'); if (g) { closeInfo(); setTimeout(() => goToMsg(+g.dataset.goto, true), 280); }
});
$('#info-flip').addEventListener('click', () => { el.chat.classList.toggle('flip'); try { localStorage.setItem('wa-flip', el.chat.classList.contains('flip') ? '1' : ''); } catch {} toast('הצדדים הוחלפו'); });
$('#contact').addEventListener('click', openInfo);
$('#tb-more').addEventListener('click', openInfo);
$('#info-back').addEventListener('click', closeInfo);
$('#info-search').addEventListener('click', () => { closeInfo(); setTimeout(openSearch, 260); });
$('#info-first').addEventListener('click', () => { closeInfo(); setTimeout(() => { el.scroll.scrollTop = 0; scrollToRow(0, false); }, 260); });
$('#info-last').addEventListener('click', () => { closeInfo(); setTimeout(toEnd, 260); });

/* ---------- מציג מדיה ---------- */
function openViewerByPath(p) { const g = collectGallery().media; let i = g.findIndex((x) => x.p === p); if (i < 0) { openViewer([{ p, t: IMG.includes(ext(p)) ? 'img' : 'vid', mi: S.msgs.findIndex((m) => mediaOf(m).includes(p)) }], 0); return; } openViewer(g, i); }
function openViewer(list, i) { S.vList = list; S.vPos = i; el.viewer.hidden = false; showViewer(); }
function showViewer() {
  const it = S.vList[S.vPos]; if (!it) return;
  const m = S.msgs[it.mi];
  el.vStage.innerHTML = it.t === 'vid' ? `<video controls autoplay playsinline src="${url(it.p)}"></video>` : `<img src="${url(it.p)}" alt="">`;
  $('#v-meta').textContent = m ? `${fmtLong(m.date)} · ${m.time}` : '';
  $('#v-prev').hidden = S.vPos >= S.vList.length - 1; $('#v-next').hidden = S.vPos <= 0;
}
function closeViewer() { el.viewer.hidden = true; el.vStage.innerHTML = ''; }
$('#v-close').addEventListener('click', closeViewer);
$('#v-prev').addEventListener('click', () => { S.vPos++; showViewer(); });
$('#v-next').addEventListener('click', () => { S.vPos--; showViewer(); });
$('#v-goto').addEventListener('click', () => { const it = S.vList[S.vPos]; closeViewer(); if (!el.info.hidden) closeInfo(); setTimeout(() => goToMsg(it.mi, true), 280); });
document.addEventListener('keydown', (e) => {
  if (!el.viewer.hidden) { if (e.key === 'Escape') closeViewer(); if (e.key === 'ArrowLeft') $('#v-prev').click(); if (e.key === 'ArrowRight') $('#v-next').click(); return; }
  if (e.key === 'Escape') { if (!el.info.hidden && el.info.classList.contains('open')) closeInfo(); else if (!el.searchbar.hidden) closeSearch(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f' && !el.chat.hidden) { e.preventDefault(); openSearch(); }
});

/* ---------- פתיחת / סגירת צ'אט ---------- */
function avatarInner() { return S.key === 'whatsapp' ? `<span style="width:60%;display:block;color:#dfe5e7">${ICON.person}</span>` : esc(S.cfg.avatarText); }
function composerHTML() {
  if (S.key === 'snapchat') return `<span class="cc">${ICON.camera}</span><span class="pill">שלח צ'אט</span><span class="cc">${ICON.emoji}</span><span class="cc">${ICON.mic}</span>`;
  return `<span class="pill">${ICON.emoji}<span>הודעה</span>${ICON.clip}${ICON.camera}</span><span class="mic">${ICON.mic}</span>`;
}
async function openChat(key) {
  S.key = key; S.cfg = SOURCES[key];
  el.home.hidden = true; el.chat.hidden = false;
  let fl = ''; try { fl = localStorage.getItem('wa-flip') ? ' flip' : ''; } catch {}
  el.chat.className = 'chat ' + S.cfg.theme + (key === 'whatsapp' ? fl : '');
  $('#info-flip').hidden = key !== 'whatsapp'; el.chat.dataset.theme = S.cfg.theme;
  $('#cname').textContent = S.cfg.contact; $('#csub').textContent = key === 'whatsapp' ? 'לחץ לפרטי איש קשר' : 'לחץ לפרופיל';
  $('#avatar').innerHTML = avatarInner();
  $('#composer').innerHTML = composerHTML();
  const showDeco = key === 'whatsapp';
  $('#tb-video').hidden = !showDeco; $('#tb-call').hidden = !showDeco; if (!showDeco) { /* סנאפצ'אט: וידאו + שיחה */ $('#tb-video').hidden = false; $('#tb-call').hidden = false; }
  el.loading.hidden = false; el.loading.textContent = 'טוען שיחה…';
  S.nodes.forEach((n) => n.remove()); S.nodes.clear(); el.vc.style.height = '0px'; S.gallery = null; S.q = ''; el.searchbar.hidden = true; el.sInput.value = '';
  try {
    S.msgs = await load(key);
  } catch (e) { el.loading.textContent = 'שגיאה בטעינת הנתונים. יש להפעיל דרך שרת (לא file://).'; return; }
  S.lower = S.msgs.map((m) => clean(m.text).toLocaleLowerCase('he'));
  S.t0 = S.msgs[0].ts; S.t1 = S.msgs[S.msgs.length - 1].ts;
  buildRows();
  el.vc.style.height = S.total + 'px';
  el.loading.hidden = true;
  requestAnimationFrame(() => { buildTicks(); el.scroll.scrollTop = S.total; render(); el.scroll.scrollTop = S.total; render(); updateThumb(); });
}
function closeChat() { stopVoice(); el.chat.hidden = true; el.home.hidden = false; closeViewer(); el.info.hidden = true; el.info.classList.remove('open'); }
$('#back').addEventListener('click', closeChat);
document.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => openChat(b.dataset.open)));
window.addEventListener('resize', () => { if (!el.chat.hidden && S.rows.length) buildTicks(); });

setIcons(); preCounts();
})();
