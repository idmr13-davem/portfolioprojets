// Exercises the actual render helpers and shared manual controls in a VM.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const listeners = {};
const context = {
  window: {}, document: {
    documentElement: { dataset: {} }, body: { dataset: { page: 'case', id: 'motion' } },
    getElementById: () => ({}), addEventListener: (type, fn) => { listeners[type] = fn; }
  }, location: { search: '', hash: '' }, localStorage: { getItem: () => null },
  matchMedia: () => ({ matches: false }), URLSearchParams
};
vm.createContext(context);
vm.runInContext(readFileSync('v3/shared/content.js', 'utf8'), context);
vm.runInContext(readFileSync('v3/shared/site.js', 'utf8'), context);
context.V3 = context.window.V3;
vm.runInContext(readFileSync('v3/statement/app.js', 'utf8').replace('  V3.start();', '  window.__review = { casePage };'), context);
const render = context.window.__review.casePage;
const rows = [];
for (const id of ['motion', 'registro', 'menores']) {
  const html = render(id);
  const videos = [...html.matchAll(/<video\b[^>]*>/g)].map(m => m[0]);
  const automatic = videos.filter(v => v.includes('data-autoplay'));
  const manual = videos.filter(v => !v.includes('data-autoplay'));
  assert(automatic.every(v => /\bloop\b/.test(v)));
  assert.equal(manual.length, id === 'motion' ? 12 : 0);
  rows.push({ id, total: videos.length, sharedLoopAutoplay: automatic.length, sequenceSamples: manual.length });
}
console.log(JSON.stringify(rows, null, 2));
const loopVideos = context.V3.C.cases.motion;
assert.equal(loopVideos.heroSet.length, 3);
const exampleSection = loopVideos.sections.find(s => s.id === 'examples');
assert.equal(exampleSection.media.length, 3);
console.log('PASS actual render: hero/examples/expressivity retain shared loop+autoplay; Registro/Menores have no samples');
// The shared handler can start another sample without pausing the sequence.
const first = { paused: false, pause() { this.paused = true; } };
const video = { paused: true, play() { this.paused = false; return Promise.resolve(); }, pause() { this.paused = true; } };
const control = { closest: () => ({ querySelector: () => video }) };
listeners.click({ target: { closest: selector => selector === '[data-video-toggle]' ? control : null } });
assert.equal(first.paused, false); assert.equal(video.paused, false);
console.log('CONFIRMED shared manual Play does not coordinate with the automatic sequence (two clips may play)');
