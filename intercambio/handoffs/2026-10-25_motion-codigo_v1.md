# Handoff: motion-codigo v1

## Objetivo
Llevar al código el caso de estudio 2 (Motion design system - Motion Level) de la exploración V3 Statement, `http://localhost:3456/v3/statement/work/motion-design-system.html`, siguiendo exactamente los frames que David, Claude y Codex iteraron en Figma: archivo `Nodyl6xcEeEwbhi0OBGFnB`, sección "Caso estudio 2" (`5076:1275`), frames 1600 `5083:669`, 1280 `5083:941`, 768 `5083:1213` y 390 `5083:1485`. Grilla, tamaños, tokens y resoluciones como en Figma.

## Contexto y restricciones
- Figma es la fuente de verdad. La estructura, el auto layout y las variables (colecciones "Statement · Layout" y "Statement · Type", un modo por breakpoint) se leyeron directamente del archivo con lectura de solo consulta (no se editó Figma).
- Casi todos los tamaños de Figma ya existían en el código: los tokens de Figma salieron de medir la página (tipografías clamp, `--margin`, `--gutter`, `--section`, alturas 80svh/88svh). Lo que cambia es la composición.
- Solo cambia el caso 2. Registro ML y Menores siguen con el renderer compartido (`V3.caseSection`) y sin CSS nuevo: el renderer nuevo solo se usa si `id === 'motion'` y todo el CSS va bajo `.a-cs--motion` (CLAUDE.md: reglas de un solo caso bajo su clase de página).
- `v3/shared/site.js` no se tocó porque lo comparten las propuestas Stage y Poster.
- Sin commit de David ni push (CLAUDE.md); el único commit es el punto de comparación de este handoff.

## Qué se hizo
1. `v3/statement/app.js`
   - Nueva función `gridSection(s)`, que reproduce la estructura de Figma: `section > .cs-intro (título | .cs-content) + media ancha`. En `.cs-content` van copy, pasos, partes (envueltas en `.cs-parts`), grupos de muestras y panel de ejes. Debajo, a 12 columnas, van imágenes y videos de ejemplo.
   - Ya no se genera un `.cs-copy` vacío cuando la sección no tiene texto. Antes ocupaba una fila de grilla y desplazaba las partes de "Where did we focus first?" debajo del título; en Figma empiezan a la altura del título.
   - `main` lleva la clase `a-cs--<id>`.
2. `v3/statement/styles.css`, bloque final "Figma update: case 2 · Motion Level (section 5076:1275)":
   - Título en columnas 1–3 y contenido en 4–12, con block-gap de 40 entre bloques. En tablet y mobile van apilados a 12 columnas.
   - Párrafos y listas a todo el ancho de su columna (`max-width: none`). Figma no tiene el tope de 62ch.
   - Listas sin viñetas, salvo Final outcomes. En Figma, `listOptions` es NONE en Objectives, Outcomes, Challenges, frequency y ejes, y UNORDERED solo en Final outcomes. La sangría de la viñeta es 1.5em: el texto queda en x 46 en 390, igual al render.
   - Partes: 48 entre partes y 12 entre título, copy y media.
   - Videos de expresividad: 3 columnas cada uno en desktop (title-width), 6 + 6 en tablet y apilados en mobile.
   - Videos de ejemplo: proporción común 9:20 con tope de 80svh, sobre `Background/Secondary` (como el token `example-height`). Imágenes de roadmap y benchmark en FIT, sin fondo.
   - Final outcomes y Case navigation: fondo `Background/Deep` (`--surface`) y padding section-half.
   - Mobile:
     - muestras en 2 grupos por fila (6 columnas cada uno), con las tres muestras apiladas (la edición de David en `5083:1485`);
     - medias apiladas con 40 de separación;
     - extremos del eje con 24 de separación.
3. Cache busting: `styles.css` y `app.js` pasan a `?v=20261025-motion-5076` en los 8 HTML de `v3/statement/` y en `v3/build-pages.mjs`.

## Archivos a revisar
- `v3/statement/app.js` (función `gridSection` y `casePage`)
- `v3/statement/styles.css` (bloque final, desde "Figma update: case 2")
- `intercambio/evidencia/2026-10-25_motion-codigo/medidas.md` (Figma frente a código por sección y breakpoint)
- Referencia: `intercambio/evidencia/2026-10-25_figma-caso2/` (estructura, CSV de grilla y renders de Figma, sobre todo `figma-390-actual.png`)
- Contexto: `v3/shared/site.js` (renderer compartido, sin cambios) y `v3/shared/content.js` (sección `motion`)

## Cómo verificar
1. Con `node server.js` (127.0.0.1:3456), abre `/v3/statement/work/motion-design-system.html` a 1600×900, 1280×800, 768×1024, 390×844 y 360×800.
2. Mide con `getBoundingClientRect` los altos de `.cs-section`, `.a-cs__final` y `.a-cs__next`, y las posiciones de `.cs-intro .cs-title` y `.cs-content`. Compáralos con la tabla de `medidas.md` y con la grilla del CSV. Columna = (W − 2·margin − 11·gutter)/12, con margin/gutter 28/32 (1600), 25.6/25.6 (1280) y 16/16 (768/390).
3. Confirma:
   - que no haya overflow horizontal (`scrollWidth === innerWidth`) en inglés y en español;
   - que la consola no tenga errores;
   - que `/v3/statement/work/registro-ml.html` y `menores-mexico.html` se vean igual que antes: no usan `gridSection` y no tienen la clase `a-cs--motion`.

## Supuestos y limitaciones
- En Figma, los pasos del roadmap tienen alto fijo de 77 px (sizing Fixed). En código mantuve padding M + line-height, que da 76.5 en desktop, 74.88 en tablet y 73.5 en mobile. No fijé 77 porque parece un redondeo de la medición original de 1600, no una decisión de diseño. Si se prefiere exactitud, sería `min-height: 77px`.
- A 390, tres textos cortan en una línea menos en Chrome que en Figma. Es rasterizado, no layout.
- El alto de los videos y las imágenes sigue dependiendo del alto de viewport (80svh/88svh). Así se derivaron los tokens de Figma: los altos de Figma corresponden a 1600×900, 1280×800, 768×1024 y 390×844.
- Que la plantilla 3 + 9 esté solo en el caso 2 es deliberado: el caso 1 tiene su propio diseño en Figma (3 + 4 + 5) y no forma parte de este pedido.

## Preguntas para el revisor
1. ¿Algún bloque fuera de la grilla o con una diferencia frente a Figma mayor que el redondeo de texto?
2. ¿El renderer `gridSection` duplica de forma aceptable el compartido, o conviene otra estrategia sin tocar `site.js`?
3. ¿Quitar las viñetas de Objectives, Outcomes, Challenges y las demás listas (siguiendo `listOptions: NONE` de Figma) afecta la semántica o la accesibilidad? Siguen siendo `<ul>`.

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| — | — | — |
