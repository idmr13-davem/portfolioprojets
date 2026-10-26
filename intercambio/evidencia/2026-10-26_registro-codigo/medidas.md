# Registro ML en código vs Figma 5065:519 (2026-10-26)

Navegador integrado (Chromium), con reveal forzado e imágenes cargadas. Viewports 1600×900, 1280×800, 768×1024 y 390×844 (los altos con que se derivaron los tokens: 80svh / 88svh).
Figma: 1600 `5074:474`, 1280 `5074:650`, 768 `5074:826`, 390 `5074:1002`.

## Alto por sección (px): Figma / código

| Sección | 1600 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Hero image | 756.55 / 756.55 | 602.11 / 602.12 | 360.63 / 360.63 | 175.41 / 175.41 |
| Objectives and outcomes | 532.24 / 531.81 | 459.5 / 458.14 | 349 / 347.73 | 504.2 / 502.7 |
| Context | 1247.2 / 1246.69 | 1155.4 / 1154.26 | 995.26 / 992.9 | 947.35 / 945.98 |
| Challenges | 329.8 / 328.3 | 289 / 287.48 | 289.5 / 288.74 | 310.4 / 308.98 |
| Agnostic sign-up | 973 / 973 | 852.2 / 852.07 | 680 / 678.7 | 858.95 / 857.09 |
| Sign-up form | 973 / 973 | 852.2 / 852.07 | 782.76 / 780.47 | 1053.75 / 1050.88 |
| Sign-up with Google | 973 / 973 | 941.7 / 939.52 | 915.88 / 913.24 | 1182.25 / 1180.88 |
| Unified sign-up and login | 973 / 973 | 970.7 / 968.02 | 996.88 / 940.13 * | 1208.25 / 1206.38 |
| Final outcomes | 771.24 / 767.13 | 655 / 652.38 | 488 / 485.09 | 504 / 504 |
| Case navigation | 313 / 312.5 | 260.2 / 258.89 | 179 / 178.88 | 268 / 267 |
| Página completa | 8929.03 / 8919 | 8026.61 / 8011 | 6935.71 / 6930 | 8102.56 / 8099 |

\* 768, Unified: en Chrome, el segundo párrafo de "Iteration" y el de "What did I focus on?" ocupan una línea menos que en Figma (360 px de ancho en ambos). Es diferencia de corte de línea, no de layout.

## Posiciones clave
- 1600: título x 28 · 362 (3 col); copy de Context/Challenges x 422 · 1150 (9 col); partes x 422 · 493.33 (col 4–7); video x 947.33 · 624.67 × 720 (col 8–12); video de Context 1544 × 720; intro final 750.89; viñetas con texto en x 80.8.
- 1280: título 25.6 · 288; partes 339.2 · 392.54; video 757.33 · 497.07 × 640; video de Context 1228.8 × 640; intro final 687.66.
- 1024: título 230.4, partes 314.03, video 397.66 × 614.4 (3 + 4 + 5 se mantiene hasta 1024).
- 768: título a todo el ancho; partes 16 · 360; video 392 · 360 × 460; video de Context 736 × 460; intro final 586.39.
- 390: todo apilado a 358; videos 358 × 223.75; viñetas con texto en x 46.

## Otras comprobaciones
- 360×800 en inglés y español: `scrollWidth` = 360 y ningún elemento de `main` sale del viewport. Consola sin errores.
- Motion Level sin regresión: mismos altos por sección que en la entrega anterior corregida (1600: 408.09 / 436.59 / 1469 / 505.89 / 1112.23 / 1166.23 / 2024.19 / 1868.88). A 390, coinciden con `2026-10-25_motion-codigo/medidas.md` salvo Roadmap, que ahora mide 954.10 px por los pasos de 77 px (antes: 940.10). Roadmap mide 1348.19 px a 1280 y 1110.19 px a 768. Comprobación independiente: `../2026-10-26_registro-codigo-review/verificacion.md`. Pasos de 77 px y muestras móviles en 2 columnas intactos.

## v2: Final outcomes a 12 columnas (Figma actualizado, 2026-10-26)

David actualizó en Figma el bloque Final outcomes de Registro en 1600, 1280 y 768. El título, la intro y la lista pasaron a Fill del ancho completo, sin las variables `final-intro-width` ni `final-list-width`. En 390, esas variables valen 358, que es el ancho completo.

| Bloque | 1600 Figma / código | 1280 | 768 | 390 |
|---|---|---|---|---|
| Intro (ancho × alto) | 1544×46 / 1544×45.59 | 1228.8×42 / 1228.81×41.77 | 736×36 / 736×35.61 | 358×51 / 358×51 |
| Lista (alto) | 197.24 / 194.3 | 156.8 / 155.41 | 112 / 110.38 | 231 / 231 |
| Ítems (alto) | 39·39·77 / 38·38·76 | 31·31·61 / 30.4·30.4·60.8 | 22·22·44 / 21.6·21.6·43.2 | 46·46·115 / 46·46·115 |
| Página completa | 8769.03 / 8760 | 7893.61 / 7878 | 6834.71 / 6829 | 8102.56 / 8099 |

360×800 EN/ES: `scrollWidth` 360, sin elementos fuera del viewport y sin errores de consola.

### Alcance temporal de la tabla v2 — revisión independiente

La tabla v2 corresponde al snapshot `antes-codex-registro-v2`, con videos móviles fluidos de 223.75 px a 390. Durante la revisión apareció una modificación posterior en `v3/statement/styles.css:447`: videos de 388 px a ≤767, con caché `20261026-registro-mobile420`. No cambia las medidas de Final outcomes, pero sí invalida la altura total móvil como descripción del árbol actual: a 390×844 se midieron 8920 px EN y 9471 px ES; a 360×800, 9098 px EN y 9725 px ES. Se preservan los valores anteriores como evidencia histórica. Método y resultados: `../2026-10-26_registro-codigo-v2-review/verificacion.md`.
