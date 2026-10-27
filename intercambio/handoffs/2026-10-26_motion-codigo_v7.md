# Handoff: motion-codigo v7

## Objetivo
Aplicar en la web los cambios que David hizo en el caso 2 (Motion Level) en Figma, sección `5076:1275` y hero `5083:684`, con los assets nuevos de `assets/Motion DS/v3/` (`Motion curve 1/2/3.mov`), en todas las resoluciones.

## Contexto y restricciones
- Lectura de Figma de solo consulta. No se editó Figma.
- Cambios encontrados frente a lo implementado:
  1. **Hero:** tres videos nuevos (`Motion curve 1/2/3`, VIDEO/FILL, 850 × 860, proporción 1.0118) a 4 columnas cada uno, con padding vertical `heroset-pad` (64 / 51.2 / 30.72 / 16). En 1600, 768 y 390 el bloque no tiene fondo; 1280 conserva `Background/Deep`, que se trata como resto. En 390 los tres van en una fila de borde a borde (sin márgenes), con gutter de 16 y 119.33 × 120.74 cada uno.
  2. **Objectives / Outcomes:** los ítems pasan a Body strong. El gap sigue en `goal-list-gap` y el padding sigue en section / section-half.
  3. **Roadmap:** se elimina la imagen en todas las resoluciones. En 768 y 390 los pasos dejan de ser tarjetas y pasan a ser lista con viñetas pegada al párrafo, como ya ocurría en desktop.
  4. **Sin cambios:** benchmark sobre Surface/Main en los 4 frames (ya aplicado), viñetas de Challenges y frequency solo en desktop, y el Body sin padding inferior.
- Sin commit.

## Qué se hizo
1. **Assets:**
   - posters del primer fotograma `assets/Motion DS/v3/motion-curve-{1,2,3}-poster.png` (850 × 860, unos 90 KB), generados con `generate-posters.mjs` (entradas `curve-*`);
   - los `.mov` son H.264 de 2,68 / 2,18 / 3,82 s respectivamente (66–79 KB) y se sirven tal cual.
2. **`v3/shared/content.js` (`motion`):**
   - `hero` y `heroSet` apuntan a los tres clips nuevos y sus posters;
   - `heroAlt` se actualizó en EN/ES ("Animated easing curves explored…" / "Curvas de easing animadas…") porque la descripción anterior ("pantallas animadas") ya no corresponde;
   - se eliminó el `media` (imagen del roadmap) de la sección `roadmap`. Los archivos `desktop/mobile-imgRoadmap1.png` y `hero-*.mp4` de v2 siguen en el repo.
3. **`v3/statement/styles.css` ("Motion Level only"):**
   - **hero:** `.a-cs__heroset` sin fondo; video con `aspect-ratio: 850 / 860`, `max-height: none` y sin fondo. En ≤767: `.a-cs__visual` sin padding lateral; `.a-cs__heroset` en 3 columnas con gap gutter; se muestran los tres videos (la regla base ocultaba el 2 y el 3);
   - **objetivos:** lista con `font-size: var(--step-body)`, `font-weight: 700`, `line-height: 1.5` y `gap: calc(var(--step-lead) * .6)`;
   - **roadmap:** lista con viñetas y sin gap en todas las resoluciones. Se quitó el `min-height: 77px` de las tarjetas y el gap XXL de ≥1500, que separaba lista e imagen.
4. **Caché:** `content.js?v=20261026-motion-hero-v3` (24 páginas V3 y generador) y `styles.css?v=20261026-motion-hero-v3` (8 de Statement y generador).

## Medidas (Chrome headless, `intercambio/evidencia/2026-10-26_motion-hero-v3/measure.mjs`, EN; Figma / código)
| | 1600×900 | 1280×800 | 768×1024 | 390×844 |
|---|---|---|---|---|
| Hero (`.a-cs__visual`) | 627.14 / 627.14 | 499.55 / 499.53 | 298.87 / 298.86 | 152.74 / 152.73 |
| Videos | 493.33×499.14 / 493.3×499.13 | 392.53×397.15 / 392.5×397.14 | 234.67×237.43 / 234.7×237.41 | 119.33×120.74 / 119.3×120.72 (x 0 / 135.3 / 270.7) |
| Objectives and outcomes | 542.24 / 541.33 | 475.5 / 474.02 | 408.25 / 407.31 | 608.4 / 607.88 |
| Roadmap | 391 / 391 | 350.2 / 350.19 | 349 / 347.84 | 391 / 390.59 |
| Página | 11006.2 / 10987 | 9697.45 / 9676 | 9070.68 / 9051 | 13221.84 / 13148 * |

\* 390: los cortes de línea ya documentados en v1.

- 1024 y 360, EN y ES: sin overflow.
- Capturas: `hero-1600.png` y `hero-390.png`.

## Archivos a revisar
- `v3/shared/content.js` (sección `motion`)
- `v3/statement/styles.css` (bloque "Motion Level only")
- `assets/Motion DS/v3/`

## Cómo verificar
1. `node --check v3/shared/content.js`; corre `measure.mjs`.
2. La secuencia de muestras sigue pasando: `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600`.
3. Stage y Poster usan el mismo `heroSet`. Comprueba que muestren los clips nuevos sin romper su layout.
4. Registro y Menores sin cambios.

## Supuestos y limitaciones
- En mobile, el hero va de borde a borde, fuera de los márgenes, como en Figma (x 0). Es una excepción intencional a la grilla.
- Los clips traen su propio fondo oscuro, muy parecido al de la página.
- El fondo `Background/Deep` del frame de 1280 no se aplicó, porque los otros tres frames no lo tienen.

## Preguntas para el revisor
1. ¿El hero de borde a borde en mobile tiene algún problema (por ejemplo, el foco del botón Play cerca del borde)?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo (v6) | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Conteo de posters (baja) | Aceptado | Corrección de Codex conservada. |
| 2. Videos fuente de baja resolución (media) | Superado en parte | El hero ya no usa esos videos: los clips nuevos son de 850 × 860. La expresividad sigue limitada por su video de 266 px. |
| 3. Validación en navegador (baja) | Resuelto | Auditoría y secuencia ejecutadas en Chrome real por Claude. |
