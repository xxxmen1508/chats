import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const readJson = async (name) => JSON.parse(await readFile(join(root, 'data', name), 'utf8'));
const [manifest, snap, wa] = await Promise.all([readJson('manifest.json'), readJson('snapchat.json'), readJson('whatsapp.json')]);
const errors = [];
if (snap.length !== 68453) errors.push(`Snapchat count ${snap.length}, expected 68453`);
if (!wa.length) errors.push('WhatsApp contains no messages');
for (const [name, messages] of [['snapchat', snap], ['whatsapp', wa]]) {
  for (let i = 1; i < messages.length; i++) if (messages[i].ts < messages[i-1].ts) errors.push(`${name} is not chronological at ${i}`);
  if (messages.some(m => !m.id || !m.date || !m.time || !m.sender || !('text' in m))) errors.push(`${name} has incomplete message record`);
}
const manifestText = JSON.stringify(manifest);
if (!manifestText.includes('publicMode')) errors.push('manifest missing publicMode');
const html = await readFile(join(root, 'index.html'), 'utf8');
const app = await readFile(join(root, 'js', 'app.js'), 'utf8');
for (const required of ['css/style.css', 'js/app.js']) if (!html.includes(required)) errors.push(`index missing ${required}`);
if (!app.includes("fetch('data/manifest.json')")) errors.push('app does not load manifest');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(JSON.stringify({ok:true, snapchat:snap.length, whatsapp:wa.length, manifest:manifest.whatsapp.archiveFiles}));
