# Handoff — motion-codigo v9: curvas del hero en secuencia

## Objetivo
David pidió esta secuencia para el hero de Motion Level (Statement): 1) la primera curva se reproduce al ingresar; 2) al terminar la primera, la segunda; 3) al terminar la primera y la segunda, la tercera. Se mantiene lo de v8: una sola vez, cada una queda en su último fotograma.

## Cambios
- `v3/statement/app.js`, `playHeroOnce()` (~l.286–321): un solo IntersectionObserver sobre `.a-cs__heroset` (umbral 0.35, con la comprobación de `intersectionRatio` que añadió Codex en v8). Un índice `current` avanza en el `ended` del clip activo y reproduce el siguiente si el hero está visible. Al salir de vista se pausa el clip en curso; al volver continúa. Al terminar el tercero se desconecta el observador. Reduced motion: estático. Limpieza con `disposed`, pausa y retiro de listeners.
- Caché de `app.js` → `20261026-motion-hero-sequence` en los 8 HTML de Statement y `v3/build-pages.mjs:59`.
- Alcance: solo Statement.

## Archivos a revisar
- `v3/statement/app.js`
- `v3/build-pages.mjs:59`
- `intercambio/evidencia/2026-10-26_motion-hero-sequence/sequence-test.mjs`

## Cómo verificar
- `node intercambio/evidencia/2026-10-26_motion-hero-sequence/sequence-test.mjs` (server en 3456 + Chrome): 23/23 PASS en 1600/1280/768/390 — orden 1→2→3 (cada play ≥ fin del anterior), una reproducción por clip, último fotograma tras salir y volver, sin overflow; pausa fuera de vista con 2 y 3 sin empezar y continuación al volver; reduced motion estático.
- `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs`: 6/6 PASS.

## Supuestos y limitaciones
- Se observa el contenedor del hero, no cada video: en todas las resoluciones las tres curvas están en una fila.
- Cambiar de idioma re-renderiza y la secuencia empieza de nuevo.
- Sin commit (lo hará Claude si David lo pide).
