# Motion Level en código vs Figma 5076:1275 (2026-10-25)

Medición en el navegador integrado (Chromium), con reveal forzado y las imágenes cargadas.
Viewports: 1600×900, 1280×800, 768×1024 y 390×844 (los mismos altos con que se armaron los tokens de Figma: 80svh / 88svh).
Figma: frames 1600 `5083:669`, 1280 `5083:941`, 768 `5083:1213`, 390 `5083:1485`.

## Alto de cada sección (px): Figma / código

| Sección | 1600 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Context | 409.1 / 408.09 | 368.3 / 367.28 | 419.13 / 417.78 | 534.3 / 533.39 |
| Challenges | 438.6 / 436.59 | 454.8 / 452.78 | 500 / 498.42 | 662.8 / 635.38 * |
| Roadmap | 1469 / 1467 | 1348.2 / 1346.19 | 1111 / 1101.72 ** | 955 / 940.1 * |
| Where did we focus first? | 508 / 505.89 | 458.2 / 455.02 | 511 / 510.01 | 600 / 598.59 |
| How do other teams… (benchmark) | 1113 / 1112.23 | 965.2 / 964.96 | 776 / 774.95 | 1108 / 1081.38 * |
| What already existed… (examples) | 1167 / 1166.23 | 1019.2 / 1018.73 | 902 / 901.06 | 2643 / 2639.55 |
| What should we define? (muestras) | 2025 / 2024.19 | 1705.2 / 1702.5 | 1490.68 / 1489.93 | 1572 / 1571.59 |
| Building shared criteria | 1874 / 1868.88 | 1781 / 1775.7 | 1980.75 / 1977.37 | 3111.6 / 3105.73 |
| Final outcomes | 549.12 / 546.79 | 461.1 / 459.15 | 350 / 348.28 | 524 / 524 |
| Case navigation | 313 / 312.5 | 260.2 / 258.89 | 179 / 178.88 | 268 / 267 |

\* 390: el texto corta en una línea menos en Chrome que en Figma (Challenges, copy del Roadmap y del benchmark). Es diferencia de rasterizado/`text-wrap: pretty`, no de layout.
\*\* 768: los pasos del roadmap son 77 px fijos en Figma (sizing Fixed); en código miden 24 + line-height + 24 = 74.88 px. Ver supuestos del handoff.
Resto: diferencias ≤ 6 px por el redondeo de cajas de texto de Figma (29 vs 28.5, etc.).

## Posiciones clave
- 1600: títulos x 28 / ancho 362 (3 col); contenido x 422 / ancho 1150 (9 col); muestras 362×362 en x 422 / 816 / 1210; videos de expresividad 362 de ancho en x 422 y 816; ejemplos 493.33 en x 28 / 553.33 / 1078.66; roadmap y benchmark 1544×720.
- 1280: título x 25.6 / 288; contenido x 339.2 / 915.2; muestras 288; videos de expresividad 288.
- 768: todo apilado a 736; ejemplos y muestras 234.67 (4 col); expresividad 360 + 360; ejemplos 593.82 de alto (Figma 594).
- 390: muestras 171×171 en x 16 y 203, grupos en filas separadas 40 px; ejemplos y expresividad apilados a 40 px; viñetas de Final outcomes con texto en x 46 (igual al render de Figma).

## Otras comprobaciones
- 360×800 en inglés y español: `scrollWidth` = 360, ningún elemento de `main` fuera del viewport; títulos de grupo en español (Escala, Posición, Opacidad, Rotación) caben en 156 px.
- 1024×768: título 3 col (230.4) y contenido 9 col (732.17), sin overflow.
- Consola sin errores.
