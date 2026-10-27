import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const b = await Browser.launch({});
for (const [w, h] of [[1600, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [360, 800]]) for (const lang of ['', '?lang=es']) {
  const page = await b.newPage({ width: w, height: h, mobile: w < 768, reducedMotion: true });
  await page.goto('http://127.0.0.1:3456/v3/statement/work/motion-design-system.html' + lang, { settleMs: 1500 });
  const r = await page.eval(`(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
    await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(ok => { i.onload = i.onerror = ok; })));
    document.querySelectorAll('[data-reveal],[data-rise]').forEach(e => e.classList.add('is-in'));
    const R = e => { const b = e.getBoundingClientRect(); return [Math.round(b.x*10)/10, Math.round(b.width*10)/10, Math.round(b.height*100)/100]; };
    const q = s => document.querySelector(s);
    const vids = [...document.querySelectorAll('.a-cs__heroset video')].map(v => R(v).concat(getComputedStyle(v).display === 'none' ? 'hidden' : 'shown'));
    return JSON.stringify({ visual: R(q('.a-cs__visual')), heroset: R(q('.a-cs__heroset')), vids, src: q('.a-cs__heroset video source').getAttribute('src').split('/').pop(), goals: R(q('.a-cs__goals')), li: getComputedStyle(q('.a-cs__goals li')).fontWeight, roadmap: R(q('#roadmap')), roadmapImg: !!q('#roadmap img'), stepBullet: getComputedStyle(q('#roadmap .cs-steps')).listStyleType, page: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth });
  })()`);
  console.log(w + lang, r);
  await page.close();
}
await b.close();
