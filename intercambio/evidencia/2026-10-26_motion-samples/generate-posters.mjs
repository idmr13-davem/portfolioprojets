// Full-resolution posters from each video's first frame (no ffmpeg on this machine): headless Chrome
// decodes the clip, draws frame 0 to a canvas and saves it. Run from the repo root with the server on :3456.
// Samples (flat shapes) are PNG; the example screen recordings are JPEG to keep them light.
import fs from 'node:fs';
import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const v2 = 'assets/Motion DS/v2/';
// [id, video, poster written next to the original with -hd]
const clips = [
  ...['5915','5918','5921','5935','5937','5941','5943','5945','5947','5949','5951','5953'].map(id => [id, `${v2}video-4793-${id}.mp4`, `${v2}poster-4793-${id}-hd.png`]),
  ['5839', `${v2}video-4793-5839.mp4`, `${v2}poster-4793-5839-hd.jpg`],
  ['5868', `${v2}video-4793-5868.mp4`, `${v2}poster-4793-5868-hd.jpg`],
  ['5879', `${v2}video-4793-5879.mov`, `${v2}poster-4793-5879-hd.jpg`],
  ...[0, 1, 2].map(n => [`hero-${n}`, `${v2}hero-${n}.mp4`, `${v2}hero-${n}-hd.jpg`]),
  ...[0, 1].map(n => [`expressivity-${n}`, `assets/Videos/Motion DS/Motion DS 0${n + 1}.mov`, `${v2}expressivity-${n}-hd.jpg`]),
  // Motion Level hero (Figma 5083:684): the three motion-curve clips, 850 × 860.
  ...[1, 2, 3].map(n => [`curve-${n}`, `assets/Motion DS/v3/Motion curve ${n}.mov`, `assets/Motion DS/v3/motion-curve-${n}-poster.png`]),
  // Registro ML (screen recordings, 712 × 1596).
  ...[['legacy', 'legacy'], ['agnostic', 'agnóstico'], ['form', 'formulario'], ['google', 'Google'], ['unified', 'unificado']]
    .map(([id, file]) => [`registro-${id}`, `assets/Videos/Registro/Registro ${file}.mov`, `assets/Registro ML/v2/${id}-hd.jpg`])
];
const only = process.argv.slice(2);
const b = await Browser.launch({});
const page = await b.newPage({ width: 800, height: 600 });
await page.goto('http://127.0.0.1:3456/v3/statement/index.html', { settleMs: 500 });
for (const [id, src, file] of clips.filter(([id]) => !only.length || only.includes(id))) {
  const url = '/' + src.split('/').map(encodeURIComponent).join('/');
  const type = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const data = await page.eval(`(async () => {
    const v = document.createElement('video'); v.muted = true; v.preload = 'auto'; v.src = ${JSON.stringify(url)};
    await new Promise((res, rej) => { v.onloadeddata = res; v.onerror = () => rej(new Error('load ' + ${JSON.stringify(url)})); });
    v.currentTime = 0; await new Promise(r => { v.onseeked = r; setTimeout(r, 500); });
    const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    return c.toDataURL(${JSON.stringify(type)}, 0.86);
  })()`);
  fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
  console.log(file, fs.statSync(file).size);
}
await b.close();
