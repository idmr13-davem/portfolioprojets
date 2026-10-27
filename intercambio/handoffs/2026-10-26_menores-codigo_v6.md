# Handoff: menores-codigo v6

## Objetivo
1. Aplicar en código los cambios de diseño del caso 3 que David hizo en Figma (sección `5076:2434`, frames 1600 `5091:1104`, 1280 `5091:1234`, 768 `5091:1364` y 390 `5091:1498`).
2. Revisar también un cambio pendiente de revisión: los posters de Registro ML a la resolución de sus videos (lo pidió David en la conversación).

## Contexto y restricciones
- Lectura de Figma, solo consulta. Diferencias contra lo implementado en v1–v5:
  1. **Imagen principal (`Frame 8`):** una franja a todo el ancho del frame, sin márgenes, con padding vertical L (32). Contiene `Img hero 1`, una imagen nueva (hash `d415af91…`, PNG transparente de 4096 × 1480) en FILL, más ancha que el frame y centrada; el frame no recorta, así que la recorta la página. Altos de la imagen: 660 / 536 / 356 / 256 en 1600 / 1280 / 768 / 390, con anchos de 1826 / 1483 / 985 / 708.5 (proporción 2.767, la misma del archivo).
  2. **Objectives and outcomes:**
     - los ítems pasan a Body strong (bold, tamaño de Body). El gap sigue en `goal-list-gap` (18.24 / 16.7 / 14.25 / 13.2, o sea .6 del tamaño lead);
     - padding: 1600 = Mega 120 arriba y section-half 110 abajo; 1280 = Huge 80 / 80; 768 y 390 = XXL 64 / 64.
  3. **Body:** sin padding inferior. Final outcome sigue directo a la última sección.
  4. **Sin cambios:**
     - los videos del recorrido (David probó radio en dos figuras de 1600; el código ya los redondea con L);
     - los pasos (gap 0, sin fondo);
     - Final outcome a 12 columnas.
- Sin commit.

## Qué se hizo
1. **Imagen nueva:**
   - se descargó el original de Figma (`download_assets`, raw image);
   - con Chrome se generaron WebP con transparencia (calidad 0.85): `assets/Menores/v2/hero-v3.webp` (2560 × 925, 261 KB) y `assets/Menores/v2/hero-v3-mobile.webp` (1440 × 520, 120 KB). Script: `intercambio/evidencia/2026-10-26_menores-codigo/encode-webp.mjs`;
   - en `v3/shared/content.js`, `menores.hero.src` y `mobile` apuntan a esos archivos (el `<source>` mobile sigue a ≤767 px). Las imágenes `hero.png` y `hero-mobile.png` se conservan.
2. **`v3/statement/styles.css`, "Menores only":**
   - `.a-cs__visual`: `padding: var(--space-l) 0; overflow: hidden`;
   - imagen: `height: calc(38.75vw + 40px)` en ≥1024 (536 a 1280, 660 a 1600) y `calc(26.455vw + 152.8px)` en ≤1023 (356 a 768, 256 a 390), con `object-fit: cover`, `max-height: none` y `background: none`. Son dos rectas que pasan por los altos de Figma; entre 1023 y 1024 el salto es de 13 px;
   - `.a-cs__goals`: padding `--space-mega` / section-half en ≥1500, `--space-huge` en 1024–1499 y `--space-xxl` en ≤1023. Lista: `font-size: var(--step-body)`, `font-weight: 700`, `line-height: 1.5`, `gap: calc(var(--step-lead) * .6)`;
   - `.a-cs__final { margin-top: 0 }`.
3. **Posters de Registro:**
   - `assets/Registro ML/v2/{legacy,agnostic,form,google,unified}-hd.jpg`, de 712 × 1596 (unos 132 KB cada uno), generados con `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs` (entradas `registro-*`);
   - en `content.js`, los 5 `poster` de `registro` apuntan a ellos. Los antiguos de 170 px se conservan porque V2 los usa.
4. **Caché:**
   - `content.js?v=20261026-menores-hero-v3` en las 24 páginas V3 y en el generador;
   - `styles.css?v=20261026-menores-hero-v3` en las 8 páginas de Statement y en el generador.

## Medidas (Chrome headless, `measure-v6.mjs`, EN; Figma / código)
| | 1600×900 | 1280×800 | 768×1024 | 390×844 |
|---|---|---|---|---|
| Franja de la imagen (`.a-cs__visual`) | 724 / 724 | 600 / 600 | 420 / 419.97 | 320 / 319.97 |
| Imagen | 660 / 660 | 536 / 536 | 356 / 355.97 | 256 / 255.97 |
| Objectives and outcomes | 414.24 / 412.83 | 366.7 / 365.23 | 329.25 / 328.44 | 492.2 / 491.69 |
| Final outcome | 589.12 / 586.38 | 504.1 / 502.5 | 411 / 408.33 | 518 / 540 * |
| Página | 6283.46 / 6270 | 5736.1 / 5723 | 6453.13 / 6437 | 8900.3 / 8880 |

\* 390: es la diferencia de corte de línea de la nota final, documentada en v1.

- Ítems de Objectives: 700 / 19 px (1600 y 1280), 17.92 (768) y 17 (390).
- La imagen mobile se usa a 390 y 360.
- En todos los anchos y en ES no hay overflow horizontal (`scrollWidth` = ancho).
- Capturas: `hero-v3-1600.png` y `hero-v3-390.png`.
- Auditoría de posters (`poster-audit.mjs`): Registro pasa de 170 px a 712 px, la resolución nativa. Lo que sigue por debajo del doble del ancho mostrado son cajas de video más anchas que la grabación (se muestran con `contain`).

## Archivos a revisar
- `v3/statement/styles.css` (final)
- `v3/shared/content.js` (`menores.hero` y los posters de `registro`)
- `assets/Menores/v2/hero-v3*.webp` y `assets/Registro ML/v2/*-hd.jpg`
- Evidencia en `intercambio/evidencia/2026-10-26_menores-codigo/`

## Cómo verificar
1. `node --check v3/shared/content.js`. Comprueba dimensiones y transparencia de los WebP.
2. `node intercambio/evidencia/2026-10-26_menores-codigo/measure-v6.mjs` (servidor en :3456) y compara con la tabla.
3. Stage y Poster también usan `menores.hero`. Comprueba que muestren la imagen nueva sin romper su layout.
4. Registro y Motion sin cambios de layout. Registro carga los 5 `-hd.jpg`.

## Supuestos y limitaciones
- **Altos de la imagen:** los interpolé linealmente entre los frames. Figma solo define los cuatro valores, así que entre esos anchos el alto es una interpolación.
- **Imagen distinta en otras propuestas:** que Stage y Poster muestren la imagen nueva es intencional, porque comparten el contenido. Si se quiere que sigan con la anterior, habría que separar el contenido por propuesta.

## Preguntas para el revisor
1. ¿El salto de 13 px entre 1023 y 1024 es aceptable, o conviene una sola fórmula continua?
2. ¿Ves algún problema con el WebP con alfa generado por canvas (calidad 0.85) frente al PNG original?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo (v5) | Decisión | Motivo / evidencia |
|---|---|---|
| 1. La tabla de v5 no identificaba el idioma (baja) | Aceptado | Las tablas de este handoff dicen EN y la revisión de ES se hace aparte. |
