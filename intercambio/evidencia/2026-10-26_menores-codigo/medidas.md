# Menores (caso 3) en código vs Figma 5076:2434 (2026-10-26)

Chromium del navegador integrado, con reveal forzado e imágenes cargadas. Viewports 1600×900, 1280×800, 768×1024 y 390×844.
Figma: 1600 `5091:1104`, 1280 `5091:1234`, 768 `5091:1364`, 390 `5091:1498`.

## Alto por sección (px): Figma / código
| Sección | 1600 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Context | 380.1 / 379.59 | 367.3 / 367.28 | 392.13 / 390.9 | 534.3 / 533.39 |
| Challenges | 426.2 / 425.2 | 413.4 / 412.88 | 435.25 / 433.91 | 602.6 / 600.77 |
| A redesigned experience | 1400 / 1397.59 | 1387.2 / 1270.23 * | 1262.63 / 1260.77 | 1239.41 / 1237 |
| The adult and minor journey | 1178 / 1176.66 | 1039.2 / 1038.09 | 2003 / 2000.22 | 3298.8 / 3296.06 |
| The advantage over competitors | 568.8 / 567.8 | 586 / 583.98 | 599.5 / 597.57 | 912.4 / 885.58 ** |
| Final outcome | 711.12 / 586.37 *** | 608.1 / 502.51 *** | 453 / 408.31 *** | 518 / 540 ** |

\* 1280: en Figma la imagen del flujo mide 915 × 563, un valor fijo copiado del frame de 1600. A 9 columnas, la imagen se ajusta a 915 × 448.45, su proporción natural de 2.04, la misma que tiene en 1600, 768 y 390. En código no se reproducen los 115 px vacíos.
\*\* 390: diferencias de corte de línea. Advantage tiene una línea menos en Chrome y la nota final una línea más.
\*\*\* Final outcome: Figma todavía limita la lista y la nota con `final-list-width` (965.4 / 772.7 / 547.4) y `final-intro-width` (750.89 / 687.66 / 586.39). Por la regla de David del 26-oct-2026 (no usar tokens de ancho cuando la grilla cubre la composición) y por coherencia con Registro, en código ocupan las 12 columnas. Hay que actualizar Figma.

## Posiciones clave (1600)
- Títulos en x 28 · 362; contenido en x 422 · 1150.
- Imagen del flujo en x 422 · 1150 × 563.5. En Figma está en 423 · 1149, 1 px fuera de la columna 4; en código se alinea a la grilla.
- Recorrido: 4 figuras de 362 (3 columnas cada una) en x 28 / 422 / 816 / 1210. Videos de 362 × 720 y figuras de 828.5–829. El Play queda a 12/12 px de la esquina del video y el pie de foto a 12 px.
- Tablet: recorrido en 2 × 2, videos de 360 × 802.45; la figura completa incluye además el pie de foto y la nota. Mobile: apilado con 16 px de separación, videos de 358 × 675.2.

## Pixel Perfect (audit.mjs, 1600/1280/1024/768/390/360; Menores EN y ES, Registro y Motion EN)
- Antes: Menores con 0 hallazgos altos o medios y 48 bajos (inset del padding de las tarjetas de pasos).
- Después: Menores sigue con 0 altos o medios y 48 bajos (los mismos insets intencionales). Registro: 0. Motion: 27 bajos (padding de las tarjetas de pasos en tablet y mobile, y panel de ejes). Overlays en `pixel-perfect/`.
- Defecto que el audit no detecta y se encontró al revisar el overlay: el botón Play quedaba sobre el pie de foto y la nota de los videos del recorrido. Corregido en la plantilla (ver handoff).
