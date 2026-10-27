# Handoff — motion-codigo v8: curvas del hero se reproducen una sola vez

## Objetivo
David pidió que las tres curvas del hero de Motion Level (Statement) se reproduzcan una sola vez y se queden en el último fotograma. Cierra el hallazgo #3 de la revisión v7 (bucle sin control de pausa, WCAG 2.2.2).

## Cambios
- `v3/statement/app.js`:
  - El heroSet se renderiza con `autoplay: false`, así el observador compartido de `v3/shared/site.js` (`video[data-autoplay]`) ya no lo gestiona.
  - Nueva función `playHeroOnce()` llamada en `wire()`: quita `loop`, reproduce cada clip cuando está visible (umbral 0.35, igual que el compartido), pausa al salir si no terminó, y deja de observar el clip al terminar (`ended`), de modo que queda en el último fotograma y no reinicia al volver. Con reduced motion no reproduce. Limpieza al re-render (cambio de idioma).
- Versión de caché de `app.js` → `20261026-motion-hero-once` en los 8 HTML de Statement y en `v3/build-pages.mjs:59`.
- Alcance: solo la propuesta Statement (Poster y Stage siguen en bucle; no se pidió).

## Archivos a revisar
- `v3/statement/app.js` (render del hero ~l.160, `playHeroOnce` ~l.285–310)
- `v3/build-pages.mjs:59`

## Cómo verificar
- `node intercambio/evidencia/2026-10-26_motion-hero-once/once-test.mjs` (requiere `node server.js` en 3456 y Chrome): 11/11 PASS en 1600 y 390 — sin loop, reproduce al cargar, termina en último fotograma, no reinicia al volver, sin overflow, reduced motion estático.
- `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs`: 6/6 PASS (secuencia de muestras intacta).

## Supuestos y limitaciones
- Si un clip se pausa a mitad (sale del viewport), al volver continúa desde donde quedó; solo los terminados no reinician.
- Cambiar de idioma re-renderiza la página y las curvas vuelven a reproducirse una vez.
- No se hizo commit (David lo pidió).
