// Comprueba que las tres curvas del hero se reproducen una vez, quedan en el último fotograma
// y no vuelven a empezar al salir y volver a entrar al hero.
import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const url = 'http://127.0.0.1:3456/v3/statement/work/motion-design-system.html';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const b = await Browser.launch();
const out = [];
const check = (name, ok, info) => { out.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${JSON.stringify(info)}`); };
for (const [w, h, mobile] of [[1600, 900, false], [390, 844, true]]) {
  const p = await b.newPage({ width: w, height: h, dsf: 1, mobile });
  await p.goto(url);
  await sleep(150);
  const state = () => p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ loop: v.loop, auto: v.hasAttribute('data-autoplay'), paused: v.paused, ended: v.ended, t: +v.currentTime.toFixed(2), d: +v.duration.toFixed(2) }))`);
  const s0 = await state();
  check(`${w} sin loop ni data-autoplay`, s0.length === 3 && s0.every(v => !v.loop && !v.auto), s0);
  check(`${w} reproduciendo al cargar`, s0.some(v => !v.paused || v.ended), s0);
  await sleep(4500);
  const s1 = await state();
  check(`${w} terminan en último fotograma`, s1.every(v => v.ended && v.paused && Math.abs(v.t - v.d) < 0.1), s1);
  await p.eval(`scrollTo(0, document.body.scrollHeight / 2)`); await sleep(800);
  await p.eval(`scrollTo(0, 0)`); await sleep(1500);
  const s2 = await state();
  check(`${w} no reinician al volver`, s2.every(v => v.ended && v.paused && Math.abs(v.t - v.d) < 0.1), s2);
  const errs = await p.eval(`document.documentElement.scrollWidth <= innerWidth`);
  check(`${w} sin overflow`, errs, {});
}
const p = await b.newPage({ width: 1600, height: 900, dsf: 1, reducedMotion: true });
await p.goto(url); await sleep(1500);
const r = await p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ paused: v.paused, t: v.currentTime }))`);
check('reduced motion estático', r.every(v => v.paused && v.t === 0), r);
await b.close();
console.log(out.join('\n'));

process.exitCode = out.some(line => line.startsWith('FAIL ')) ? 1 : 0;
