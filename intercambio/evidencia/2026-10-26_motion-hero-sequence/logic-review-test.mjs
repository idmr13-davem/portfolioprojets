// Fallback de revisión: ejecuta la función real con dobles de video/IntersectionObserver.
// No verifica decodificación, fotogramas, geometría ni renderizado del navegador.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../../../v3/statement/app.js', import.meta.url), 'utf8');
const heroCode = source.slice(source.indexOf('  let heroCleanup = null;'), source.indexOf('  let statusResizeHandler = null;'));
function fixture({ reduced = false, supported = true, count = 3 } = {}) {
  const log = [], observers = [];
  const clips = Array.from({ length: count }, (_, i) => ({
    loop: true, paused: true, currentTime: 0, ended: false, listeners: new Set(),
    play() { this.paused = false; log.push(i); return Promise.resolve(); },
    pause() { this.paused = true; },
    addEventListener(type, fn) { assert.equal(type, 'ended'); this.listeners.add(fn); },
    removeEventListener(type, fn) { this.listeners.delete(fn); },
    finish() {
      this.paused = this.ended = true;
      this.currentTime = 2;
      for (const fn of this.listeners) fn({ target: this });
    }
  }));
  const set = { querySelectorAll: () => clips };
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { assert.equal(target, set); }
    disconnect() { this.disconnected = true; }
    emit(ratio, intersecting = ratio > 0) { this.callback([{ intersectionRatio: ratio, isIntersecting: intersecting }]); }
  }
  const ctx = vm.createContext({
    app: { querySelector: () => count ? set : null }, V3: { reduced },
    window: supported ? { IntersectionObserver: Observer } : {}, IntersectionObserver: Observer
  });
  vm.runInContext(heroCode + '\nglobalThis.start = playHeroOnce; globalThis.clean = () => heroCleanup?.();', ctx);
  ctx.start();
  return { clips, log, observers, ctx };
}

let passed = 0;
function check(name, fn) { fn(); console.log('PASS ' + name); passed++; }

check('umbral 0.35 y secuencia exclusiva 1→2→3, sin reinicio tras completar', () => {
  const f = fixture(), o = f.observers[0];
  assert.equal(o.options.threshold, 0.35);
  assert.ok(f.clips.every(v => !v.loop && v.paused));
  o.emit(0.34); assert.deepEqual(f.log, []);
  o.emit(0.35); assert.deepEqual(f.log, [0]);
  f.clips[0].finish(); assert.deepEqual(f.log, [0, 1]);
  // Un ended repetido del anterior no debe saltar el clip actual.
  f.clips[0].finish(); assert.deepEqual(f.log, [0, 1]);
  f.clips[1].finish(); assert.deepEqual(f.log, [0, 1, 2]);
  f.clips[2].finish(); assert.ok(o.disconnected);
  o.emit(0); o.emit(1); assert.deepEqual(f.log, [0, 1, 2]);
  assert.ok(f.clips.every(v => v.ended && v.paused && v.currentTime === 2));
});

for (const index of [0, 1, 2]) check(`pausa/continuación del clip ${index + 1} sin reiniciar`, () => {
  const f = fixture(), o = f.observers[0];
  o.emit(1);
  for (let i = 0; i < index; i++) f.clips[i].finish();
  f.clips[index].currentTime = 0.8;
  o.emit(0.34); assert.ok(f.clips.every(v => v.paused));
  assert.ok(f.clips.slice(index + 1).every(v => v.currentTime === 0));
  o.emit(0.35); assert.equal(f.clips[index].paused, false);
  assert.equal(f.clips[index].currentTime, 0.8);
});

check('ended pendiente fuera de vista espera al reingreso', () => {
  const f = fixture(), o = f.observers[0];
  o.emit(1); o.emit(0); f.clips[0].finish();
  assert.deepEqual(f.log, [0]);
  o.emit(1); assert.deepEqual(f.log, [0, 1]);
});

check('limpieza pausa y retira listeners; callbacks antiguos no reproducen', () => {
  const f = fixture(), o = f.observers[0];
  o.emit(1);
  const queued = [...f.clips[0].listeners][0];
  f.ctx.clean(); o.emit(1); queued({ target: f.clips[0] });
  assert.ok(o.disconnected);
  assert.ok(f.clips.every(v => v.paused && v.listeners.size === 0));
  assert.deepEqual(f.log, [0]);
});

check('reinicialización limpia el observador anterior', () => {
  const f = fixture(); f.observers[0].emit(1); f.ctx.start();
  assert.ok(f.observers[0].disconnected);
  assert.ok(f.clips.every(v => v.paused && v.listeners.size === 1));
  f.observers[1].emit(1); assert.deepEqual(f.log, [0, 0]);
});

for (const options of [{ reduced: true }, { supported: false }, { count: 0 }]) {
  check(`fallback estático ${JSON.stringify(options)}`, () => {
    const f = fixture(options);
    assert.equal(f.observers.length, 0);
    assert.deepEqual(f.log, []);
    assert.ok(f.clips.every(v => v.paused && !v.loop));
  });
}
console.log(`${passed}/${passed} PASS (simulación, sin navegador)`);
