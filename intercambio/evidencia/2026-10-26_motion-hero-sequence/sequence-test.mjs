// Comprueba que las curvas del hero se reproducen en orden (1 → 2 → 3), una sola vez,
// quedan en su último fotograma y no reinician al salir y volver.
import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const url = 'http://127.0.0.1:3456/v3/statement/work/motion-design-system.html';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const waitFor = async (predicate, timeout = 3000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await predicate()) return true;
    await sleep(25);
  }
  return false;
};
const out = [];
const check = (name, ok, info = {}) => { console.error(name); out.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${JSON.stringify(info)}`); if (!ok) process.exitCode = 1; };
const b = await Browser.launch();
for (const [w, h, mobile] of [[1600, 900, false], [1280, 800, false], [768, 1024, true], [390, 844, true]]) {
  const p = await b.newPage({ width: w, height: h, dsf: 1, mobile });
  await p.goto(url);
  // Registra, en el reloj de la página, cuándo empieza y termina cada clip.
  await p.eval(`window.__log = []; document.querySelectorAll('.a-cs__heroset video').forEach((v, i) => {
    if (!v.paused) __log.push(['play', i, performance.now()]);
    v.addEventListener('playing', () => __log.push(['play', i, performance.now()]));
    v.addEventListener('ended', () => __log.push(['end', i, performance.now()]));
  }); true`);
  await sleep(10000);
  const log = await p.eval(`__log`);
  const firstPlay = i => log.find(e => e[0] === 'play' && e[1] === i)?.[2];
  const end = i => log.find(e => e[0] === 'end' && e[1] === i)?.[2];
  const plays = [0, 1, 2].map(firstPlay), ends = [0, 1, 2].map(end);
  check(`${w} las tres terminan`, ends.every(Boolean), { plays, ends });
  check(`${w} orden 1→2→3`, plays.every(Boolean) && plays[1] >= ends[0] && plays[2] >= ends[1] && plays[0] < plays[1], { plays, ends });
  check(`${w} una sola reproducción por clip`, [0, 1, 2].every(i => log.filter(e => e[0] === 'end' && e[1] === i).length === 1));
  const state = () => p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ ended: v.ended, paused: v.paused, t: +v.currentTime.toFixed(2), d: +v.duration.toFixed(2) }))`);
  await p.eval(`scrollTo(0, document.body.scrollHeight / 2)`); await sleep(800);
  await p.eval(`scrollTo(0, 0)`); await sleep(1500);
  const s = await state();
  check(`${w} quedan en el último fotograma tras volver`, s.every(v => v.ended && v.paused && Math.abs(v.t - v.d) < 0.1), s);
  check(`${w} sin overflow`, await p.eval(`document.documentElement.scrollWidth <= innerWidth`));
}
// Salir a mitad de la primera curva la pausa; al volver continúa y la segunda espera.
{
  const p = await b.newPage({ width: 1600, height: 900, dsf: 1 });
  await p.goto(url, { settleMs: 0 });
  check('la primera curva empieza antes de probar la pausa', await waitFor(() => p.eval(`(() => {
    const v = document.querySelector('.a-cs__heroset video');
    return !!v && !v.paused && !v.ended && v.currentTime > 0;
  })()`)));
  await p.eval(`scrollTo(0, document.body.scrollHeight / 2)`); await sleep(1200);
  const mid = await p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ paused: v.paused, t: +v.currentTime.toFixed(2) }))`);
  check('fuera de vista: pausadas y la 2 y 3 sin empezar', mid.every(v => v.paused) && mid[0].t > 0 && mid[1].t === 0 && mid[2].t === 0, mid);
  await sleep(500);
  const frozen = await p.eval(`document.querySelector('.a-cs__heroset video').currentTime`);
  check('fuera de vista el tiempo no avanza', Math.abs(frozen - mid[0].t) < 0.02, { mid, frozen });
  await p.eval(`scrollTo(0, 0)`); await sleep(500);
  const back = await p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ paused: v.paused, ended: v.ended, t: +v.currentTime.toFixed(2) }))`);
  check('al volver continúa la secuencia sin reiniciar', back.some(v => !v.paused) && back[0].t > mid[0].t, { mid, back });
}
{
  const p = await b.newPage({ width: 1600, height: 900, dsf: 1, reducedMotion: true });
  await p.goto(url); await sleep(1500);
  const r = await p.eval(`[...document.querySelectorAll('.a-cs__heroset video')].map(v => ({ paused: v.paused, t: v.currentTime }))`);
  check('reduced motion estático', r.every(v => v.paused && v.t === 0), r);
}
await b.close();
console.log(out.join('\n'));
