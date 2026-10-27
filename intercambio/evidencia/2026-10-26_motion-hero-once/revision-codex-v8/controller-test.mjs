// Simulation of the real controller, not a browser or media-decoding check.
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync('v3/statement/app.js', 'utf8');
const controller = source.slice(source.indexOf('  let heroCleanup'), source.indexOf('  let statusResizeHandler'));
function setup({ reduced = false, observer = true } = {}) {
  const observers = [];
  const makeClips = () => Array.from({ length: 3 }, () => Object.assign(new EventTarget(), {
    loop: true, paused: true, ended: false, currentTime: 0, calls: 0,
    play() { this.calls++; this.paused = false; return Promise.resolve(); },
    pause() { this.paused = true; }
  }));
  let clips = makeClips();
  const context = { V3: { reduced }, app: { querySelectorAll: () => clips }, window: {},
    IntersectionObserver: class {
      constructor(cb, options) { this.cb = cb; this.options = options; this.targets = new Set(); observers.push(this); }
      observe(v) { this.targets.add(v); } unobserve(v) { this.targets.delete(v); } disconnect() { this.targets.clear(); }
    }
  };
  if (observer) context.window.IntersectionObserver = context.IntersectionObserver;
  vm.createContext(context); vm.runInContext(controller, context);
  const wire = () => vm.runInContext('playHeroOnce()', context);
  wire();
  const notify = (ratio, obs = observers.at(-1), list = clips) => obs.cb(list.map(target => ({ target, isIntersecting: ratio > 0, intersectionRatio: ratio })));
  return { context, observers, get clips() { return clips; }, notify, wire,
    replace() { const old = clips; clips = makeClips(); wire(); return old; } };
}
const tests = {
  'three clips lose loop and start only at 35% visibility': () => {
    const s = setup(); assert(s.clips.every(v => !v.loop)); s.notify(.1);
    assert(s.clips.every(v => v.paused && v.calls === 0)); s.notify(.35);
    assert(s.clips.every(v => !v.paused && v.calls === 1));
    assert.equal(s.observers[0].options.threshold, .35);
  },
  'exit pauses; returning resumes without resetting time': () => {
    const s = setup(); s.notify(.5); s.clips.forEach(v => v.currentTime = 1);
    s.notify(.2); assert(s.clips.every(v => v.paused));
    s.notify(.5); assert(s.clips.every(v => !v.paused && v.currentTime === 1));
    s.notify(0); assert(s.clips.every(v => v.paused));
  },
  'ended clips unobserved and never replayed': () => {
    const s = setup(); s.notify(1);
    s.clips.forEach(v => { v.ended = true; v.paused = true; v.currentTime = 3; v.dispatchEvent(new Event('ended')); });
    assert.equal(s.observers[0].targets.size, 0);
    s.notify(0); s.notify(1); assert(s.clips.every(v => v.calls === 1 && v.currentTime === 3));
  },
  'language cleanup pauses old clips and ignores queued observer callbacks': () => {
    const s = setup(); s.notify(1); const obs = s.observers[0], old = s.replace();
    assert(old.every(v => v.paused)); s.notify(1, obs, old);
    assert(old.every(v => v.paused && v.calls === 1));
    old[0].dispatchEvent(new Event('ended')); assert.equal(obs.targets.size, 0);
    s.notify(1); assert(s.clips.every(v => v.calls === 1));
  },
  'reduced motion remains static': () => {
    const s = setup({ reduced: true }); assert.equal(s.observers.length, 0);
    assert(s.clips.every(v => !v.loop && v.paused && v.currentTime === 0));
  },
  'no observer remains static': () => {
    const s = setup({ observer: false }); assert.equal(s.observers.length, 0); assert(s.clips.every(v => v.paused && !v.loop));
  },
  'all eight shells and generator use the new cache version': () => {
    const shells = readdirSync('v3/statement', { recursive: true }).filter(f => f.endsWith('.html'));
    assert.equal(shells.length, 8);
    for (const file of [...shells.map(f => 'v3/statement/' + f), 'v3/build-pages.mjs']) {
      assert(readFileSync(file, 'utf8').includes('?v=20261026-motion-hero-once-review'));
    }
    assert(source.includes('eager: true, autoplay: false'));
  },
  'browser test reports failed assertions with nonzero status': () => {
    const code = readFileSync('intercambio/evidencia/2026-10-26_motion-hero-once/once-test.mjs', 'utf8').split('\n').find(l => l.startsWith('process.exitCode'));
    for (const [out, expected] of [[['PASS x'], 0], [['PASS x', 'FAIL y'], 1]]) {
      const context = { out, process: {} }; vm.runInNewContext(code, context); assert.equal(context.process.exitCode, expected);
    }
  }
};
for (const [name, test] of Object.entries(tests)) { test(); console.log('PASS', name); }
console.log(`${Object.keys(tests).length}/${Object.keys(tests).length} PASS (simulation/static only)`);
