# Handoff: motion-codigo v5

## Objetivo
David vio que las previsualizaciones de las 12 muestras de Motion (Escala, Posición, Opacidad y Rotación) se ven pixeladas antes de que se reproduzcan los videos, y pidió evitarlo.

## Contexto y restricciones
- Causa: los posters `assets/Motion DS/v2/poster-4793-*.png` miden 120 × 120 y se muestran a 362 px en desktop (y al doble de densidad en pantallas retina). Los videos miden 1000 × 1000.
- No hay ffmpeg en la máquina. Los fotogramas se extrajeron con Chrome headless (canvas `drawImage` del fotograma en `t = 0`).
- Sin commit.

## Qué se hizo
1. Se agregaron 12 posters nuevos, `assets/Motion DS/v2/poster-4793-<id>-hd.png`, de 1000 × 1000 (23–44 KB cada uno). Cada uno es el primer fotograma de su video.
   - Script: `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs`.
   - Los posters de 120 px siguen en el repo y ya no se usan en las muestras V3. V2 todavía los referencia en `work/motion-design-system.html` y `docs/v2-public-resources.json`; deben conservarse.
2. En `v3/shared/content.js`, las 12 rutas de `poster` de la sección `properties` apuntan a los `-hd.png`.
3. Caché de `content.js`: `?v=20261026-motion-posters-hd` en las 24 páginas V3 (Statement, Stage y Poster) y en `v3/build-pages.mjs`.

## Evidencia
- `intercambio/evidencia/2026-10-26_motion-samples/poster-hd-1600-2x.png`: captura a 1600 con DPR 2 y reduced motion (para que los videos no arranquen), del grupo Opacidad. Los bordes salen nítidos.
- Comparación visual: `poster-4793-5943.png` (120 px) frente a `poster-4793-5943-hd.png` (1000 px). Tienen el mismo contenido.

## Archivos a revisar
- `v3/shared/content.js` (sección `motion` → `properties`)
- `assets/Motion DS/v2/poster-4793-*-hd.png`
- `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs`

## Cómo verificar
1. `node --check v3/shared/content.js`.
2. Confirma que los 12 `poster` existan y midan 1000 × 1000 (`sips -g pixelWidth -g pixelHeight`).
3. En Statement, Stage y Poster, las 12 muestras cargan el `-hd.png` y nada más cambia.
4. La secuencia de reproducción (v4) sigue intacta: `node seq-test.mjs 1600`.

## Supuestos y limitaciones
- Los posters antiguos tenían las esquinas redondeadas "horneadas" en algunos casos. Los nuevos son el fotograma real del video, cuadrado. Coinciden con el primer fotograma, así que no hay salto al empezar la reproducción.
- Peso total agregado: unos 400 KB (PNG). Un formato más liviano (WebP o AVIF) requeriría un codificador que no está instalado.

## Preguntas para el revisor
1. ¿Recomiendas eliminar del repo los posters antiguos de 120 px?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Carrera de evento `play` pendiente (media) | Aceptado | Corrección de Codex conservada. |
| 2. Aserciones del escenario manual (baja) | Aceptado | Se conservan; la prueba pasa 6/6 a 1600 y 390. |
| 3. Validación en Chrome pendiente (baja) | Resuelto | Ejecuté la prueba reforzada en Chrome real: 6/6 PASS en ambos anchos, exit 0. |
