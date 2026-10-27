import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const b = await Browser.launch({});
for (const [w, h] of [[1600, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [360, 800]]) for (const lang of ['', '?lang=es']) {
  const page = await b.newPage({ width: w, height: h, mobile: w < 768, reducedMotion: true });
  await page.goto('http://127.0.0.1:3456/v3/statement/work/menores-mexico.html' + lang, { settleMs: 1500 });
  const r = await page.eval(`(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
    await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(ok => { i.onload = i.onerror = ok; })));
    document.querySelectorAll('[data-reveal],[data-rise]').forEach(e => e.classList.add('is-in'));
    const R = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x*10)/10, Math.round(b.width*10)/10, Math.round(b.height*100)/100]; };
    const img = document.querySelector('.a-cs__visual img');
    return JSON.stringify({ visual: R('.a-cs__visual'), img: R('.a-cs__visual img'), src: img.currentSrc.split('/').pop(), goals: R('.a-cs__goals'), li: R('.a-cs__goals li'), liFs: getComputedStyle(document.querySelector('.a-cs__goals li')).fontWeight + '/' + getComputedStyle(document.querySelector('.a-cs__goals li')).fontSize, final: R('.a-cs__final'), page: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth });
  })()`);
  console.log(w + lang, r);
  await page.close();
}
await b.close();
