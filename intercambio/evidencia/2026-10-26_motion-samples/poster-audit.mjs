import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const b = await Browser.launch({});
for (const w of [1600, 390]) for (const c of ['motion-design-system', 'registro-ml', 'menores-mexico']) {
  const page = await b.newPage({ width: w, height: 900, dsf: 2, reducedMotion: true, mobile: w < 768 });
  await page.goto(`http://127.0.0.1:3456/v3/statement/work/${c}.html`, { settleMs: 1200 });
  const r = await page.eval(`(async () => {
    const out = [];
    for (const v of document.querySelectorAll('video')) {
      const box = v.getBoundingClientRect(); if (!box.width) continue;
      const nat = await new Promise(ok => { const i = new Image(); i.onload = () => ok(i.naturalWidth); i.onerror = () => ok(0); i.src = v.poster; });
      const need = Math.round(box.width * 2);
      if (nat < need) out.push(v.getAttribute('poster').split('/').pop() + ' ' + nat + '<' + need);
    }
    return JSON.stringify(out);
  })()`);
  console.log(w, c, r);
  await page.close();
}
await b.close();
