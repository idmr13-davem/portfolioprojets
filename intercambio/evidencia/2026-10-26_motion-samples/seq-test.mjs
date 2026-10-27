// Property samples on Motion Level: plays the section in headless Chrome and asserts the sequence.
// Usage: node seq-test.mjs <width>   (server on 127.0.0.1:3456). Exits 1 on any failed assertion.
import { Browser } from '../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const width = Number(process.argv[2] || 1600);
const expected = Array.from({ length: 12 }, (_, i) => [`p${i}`, `e${i}`]).flat();
let failed = 0;
const check = (name, ok, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`); if (!ok) failed++; };

const b = await Browser.launch({ extraArgs: ['--autoplay-policy=no-user-gesture-required'] });
const page = await b.newPage({ width, height: 900, mobile: width < 768 });
await page.goto('http://127.0.0.1:3456/v3/statement/work/motion-design-system.html', { settleMs: 1500 });
const hook = `(() => { window.__log = []; document.querySelectorAll('.cs-groups video').forEach((v, i) => { v.onplay = () => __log.push('p' + i); v.onended = () => __log.push('e' + i); }); })()`;
const log = async () => JSON.parse(await page.eval('JSON.stringify(__log)'));
const playing = () => page.eval(`[...document.querySelectorAll('.cs-groups video')].filter(v => !v.paused).length`);
const waitFor = async (pred, ms = 40000) => { const t = Date.now(); while (Date.now() - t < ms) { if (pred(await log())) return true; await sleep(500); } return false; };
const enter = () => page.eval(`document.querySelector('.cs-groups').scrollIntoView({ block: 'start' })`);
const leave = () => page.eval('window.scrollTo(0, 0)');

// 1. First pass: twelve clips, once each, in order; nothing plays afterwards.
await page.eval(hook); await enter();
await waitFor(l => l.includes('e11'));
await sleep(3000);
let l = await log();
check(`${width}: first pass in order`, JSON.stringify(l) === JSON.stringify(expected), l.join(' '));
check(`${width}: nothing plays after the last clip`, (await playing()) === 0);

// 2. Leaving and coming back starts the sequence over, completely.
await leave(); await sleep(800); await page.eval('window.__log = []'); await enter();
await waitFor(l => l.includes('e11'));
await sleep(1500);
l = await log();
check(`${width}: second pass after re-entering`, JSON.stringify(l) === JSON.stringify(expected), l.join(' '));

// 3. Playing a sample by hand takes over: the chain stops and only that sample plays.
await leave(); await sleep(800); await page.eval('window.__log = []'); await enter();
check(`${width}: automatic clip 1 starts before manual takeover`, await waitFor(l => l.includes('p1')));
await page.eval(`document.querySelectorAll('.cs-groups .cs-figure')[6].querySelector('[data-video-toggle]').click()`);
await sleep(300);
check(`${width}: manual play leaves one clip playing`, (await playing()) === 1 && await page.eval(`!document.querySelectorAll('.cs-groups video')[6].paused`));
await sleep(8000);
l = await log();
check(`${width}: chain does not continue after manual play`, JSON.stringify(l) === JSON.stringify(['p0', 'e0', 'p1', 'p6', 'e6']) && (await playing()) === 0, l.join(' '));

await b.close();
process.exit(failed ? 1 : 0);
