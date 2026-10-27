// Deterministic controller tests; no browser/media decoding is simulated as verified.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync('v3/statement/app.js', 'utf8');
const controller = source.slice(source.indexOf('  // Property samples'), source.indexOf('  let statusResizeHandler'));
function setup({ reduced = false, observer = true, queued = false } = {}) {
  const observers = [], log = [], pending = [];
  const makeClips = () => Array.from({ length: 12 }, (_, i) => Object.assign(new EventTarget(), {
    loop: true, paused: true, currentTime: 0,
    play() { this.paused = false; log.push(i); if (queued) pending.push(() => this.dispatchEvent(new Event('play'))); else this.dispatchEvent(new Event('play')); return Promise.resolve(); },
    pause() { this.paused = true; }
  }));
  let clips = makeClips();
  const context = { V3: { reduced }, app: { querySelector: () => ({ querySelectorAll: () => clips }) }, window: {},
    IntersectionObserver: class { constructor(cb, options) { this.cb = cb; this.options = options; observers.push(this); } observe() {} disconnect() {} } };
  if (observer) context.window.IntersectionObserver = context.IntersectionObserver;
  vm.createContext(context);
  vm.runInContext(controller, context);
  const wire = () => vm.runInContext('sequenceSamples()', context);
  wire();
  return { context, observers, log, flush() { while (pending.length) pending.shift()(); }, get clips() { return clips; }, wire,
    replace() { const old = clips; clips = makeClips(); wire(); return old; },
    enter(ratio = .5) { observers.at(-1).cb([{ isIntersecting: true, intersectionRatio: ratio }]); },
    exit() { observers.at(-1).cb([{ isIntersecting: false, intersectionRatio: 0 }]); },
    end(i) { clips[i].paused = true; clips[i].dispatchEvent(new Event('ended')); } };
}
const tests = {
  '12 clips once, stop, exit/reentry': () => {
    const s = setup(); s.enter(); for (let i = 0; i < 12; i++) s.end(i);
    assert.deepEqual(s.log, Array.from({ length: 12 }, (_, i) => i));
    assert(s.clips.every(v => v.paused && !v.loop)); s.exit(); s.enter();
    assert.equal(s.log.at(-1), 0); assert.equal(s.log.length, 13);
  },
  'manual takeover stops chain, remains exclusive, reentry restores sequence': () => {
    const s = setup(); s.enter(); s.end(0); s.clips[6].play();
    assert.deepEqual(s.clips.map(v => !v.paused), Array.from({ length: 12 }, (_, i) => i === 6));
    s.end(1); s.end(6); assert.deepEqual(s.log, [0, 1, 6]);
    s.exit(); s.enter(); s.end(0); assert.deepEqual(s.log, [0, 1, 6, 0, 1]);
  },
  'queued play from paused previous run cannot cancel reentry': () => {
    const s = setup({ queued: true }); s.enter(); s.flush(); s.clips[6].play();
    s.exit(); s.enter(); s.flush();
    assert.equal(s.clips[0].paused, false, 'stale play must not pause the new automatic clip');
    s.end(0); assert.equal(s.log.at(-1), 1);
  },
  'language cleanup removes manual listeners': () => {
    const s = setup(); s.enter(); const old = s.replace();
    old[6].play(); old[7].play(); assert.equal(old[6].paused, false);
    s.enter(); assert.equal(s.clips[0].paused, false);
  },
  'partial visibility never restarts': () => {
    const s = setup(); s.enter(.05); s.enter(.15); s.enter(.05);
    assert.deepEqual(s.log, [0]); assert.equal(s.observers[0].options.threshold, 0);
  },
  'reduced motion keeps manual playback non-looping': () => {
    const s = setup({ reduced: true }); assert(s.clips.every(v => !v.loop)); assert.equal(s.log.length, 0);
  },
  'no IntersectionObserver keeps manual playback non-looping': () => {
    const s = setup({ observer: false }); assert(s.clips.every(v => !v.loop)); assert.equal(s.log.length, 0);
  },
  'language replacement cancels old run and queued callback': () => {
    const s = setup(); s.enter(); const oldObserver = s.observers[0], old = s.replace();
    old[0].dispatchEvent(new Event('ended'));
    oldObserver.cb([{ isIntersecting: true, intersectionRatio: .5 }]);
    assert(old.every(v => v.paused)); assert.deepEqual(s.log, [0]);
    s.enter(); assert.deepEqual(s.log, [0, 0]);
  },
  'old ended callbacks cannot advance new run twice': () => {
    const s = setup(); s.enter(); s.exit(); s.enter(); s.end(0);
    assert.deepEqual(s.log, [0, 0, 1]);
  }
};
let failures = 0;
for (const [name, test] of Object.entries(tests)) {
  try { test(); console.log('PASS', name); } catch (e) { failures++; console.log('FAIL', name, e.message); }
}
if (failures) process.exitCode = 1;
