import fs from 'node:fs';
import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const [src, ...jobs] = process.argv.slice(2); // jobs: width:out
const b64 = fs.readFileSync(src).toString('base64');
const b = await Browser.launch({});
const page = await b.newPage({ width: 800, height: 600 });
await page.goto('about:blank', { settleMs: 100 });
await page.eval(`window.__src = 'data:image/png;base64,${b64}'`);
for (const job of jobs) {
  const [w, out] = job.split(':');
  const data = await page.eval(`(async () => { const i = new Image(); i.src = __src; await i.decode(); const W = ${w}, H = Math.round(i.naturalHeight * W / i.naturalWidth); const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(i, 0, 0, W, H); return c.toDataURL('image/webp', 0.85); })()`);
  fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
  console.log(out, fs.statSync(out).size);
}
await b.close();
