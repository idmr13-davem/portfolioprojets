# Handoff — switch-sequence v1: variantes del caso 4 en secuencia

## Objetivo
David pidió que los tres videos de "Change Animation and Variants" (Figma 5203:74265) se reproduzcan uno a la vez, de izquierda a derecha: al terminar el 1 empieza el 2 y por último el 3.

## Cambios
- `v3/statement/app.js`: `sequenceSamples()` ahora recorre cada bloque secuencial (`.cs-groups` de Motion y `.cs-section > .cs-media[data-sequence]`) con la misma función `sequence(box)` que ya usaban las muestras de Motion (cada clip una vez en orden; reinicia solo al salir y volver a entrar; un Play manual toma el control). `gridSection` renderiza la media de una sección con `sequence: true` sin `data-autoplay` y con `data-sequence`.
- `v3/shared/content.js`: `"sequence": true` en la sección `variants` del caso `switch`.
- Caché: `app.js` y `content.js` → `20261027-switch-sequence` en las 27 páginas V3 y en `v3/build-pages.mjs` (líneas 58 y 60).

## Archivos a revisar
- `v3/statement/app.js` (`gridSection` ~l.133–148, `sequenceSamples`/`sequence` ~l.228–282)
- `v3/shared/content.js` (sección `variants` del caso `switch`)

## Cómo verificar
- `node intercambio/evidencia/2026-10-27_switch-sequence/seq-test.mjs 1600` y `390` (server 3456 + Chrome): 6/6 PASS cada una (`seq-results.txt`).
- Regresión Motion: `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600`: 6/6 PASS (`motion-regression.txt`).
- La comparativa del caso 4 sigue con autoplay en bucle (2 videos con `data-autoplay`, `loop`).

## Supuestos y limitaciones
- Al terminar el video 3 ninguno se repite; la secuencia vuelve a empezar si la persona sale de la sección y regresa (mismo comportamiento que las muestras de Motion, que David aprobó).
- En tablet y mobile los tres videos están apilados: el 2 y el 3 pueden reproducirse fuera de la vista si la persona no hace scroll.
- Otra sesión edita en paralelo `styles.css`, `app.js` (pantallas de estado, consentimiento) y `build-pages.mjs`; no forman parte de este handoff. Sin commit.
