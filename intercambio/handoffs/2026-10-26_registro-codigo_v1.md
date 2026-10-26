# Handoff: registro-codigo v1

## Objetivo
Llevar al código el caso de estudio 1 (Registro ML) de V3 Statement, `http://localhost:3456/v3/statement/work/registro-ml.html`, siguiendo la grilla y la composición de Figma: archivo `Nodyl6xcEeEwbhi0OBGFnB`, sección "Caso estudio 1" (`5065:519`), frames 1600 `5074:474`, 1280 `5074:650`, 768 `5074:826` y 390 `5074:1002`.

## Contexto y restricciones
- Figma es la fuente de verdad. Se leyó con consultas de solo lectura (estructura, auto layout, variables por modo y `listOptions`); Figma no se modificó.
- Es la misma plantilla aprobada para Motion (handoff `2026-10-25_motion-codigo_v1.md`, revisión aprobada con observaciones). Registro agrega un patrón propio: en las secciones con partes, el título, las partes y el video van en una sola fila de 3 + 4 + 5 columnas.
- David pidió no hacer commit todavía. Por eso el punto de comparación es una copia fuera del repo (`/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-registro-v1/`), no un commit. Codex tampoco debe hacer commit.
- Los cambios de la revisión anterior de Motion (Codex, sin commit) siguen en el árbol de trabajo y se conservaron.
- Menores (`menores-mexico.html`) no cambia: sigue con el renderer compartido y sin la clase `a-cs--grid`.

## Qué se hizo
1. `v3/statement/app.js`:
   - `gridSection` se usa para `motion` y `registro`, y `main` recibe además la clase `a-cs--grid`.
   - Las secciones que tienen partes y media (Registro: agnostic, form, google, unified) llevan la clase `cs-section--split` y colocan el video dentro de `.cs-intro`, al lado de las partes.
   - Las secciones con media pero sin partes (Context de Registro, y roadmap, benchmark y examples de Motion) siguen con la media debajo, a 12 columnas.
   - Motion no tiene secciones con `parts` y `media` a la vez, así que su markup no cambia.
2. `v3/statement/styles.css`: el bloque de Motion se reorganizó en tres partes.
   - **Reglas de plantilla bajo `.a-cs--grid`:**
     - título en 3 columnas y contenido en 9;
     - fila `--split` de 3 | 4 | 5 en desktop; en tablet, título arriba y partes y video en 6 + 6; en mobile, todo apilado;
     - listas sin viñetas;
     - separaciones de 48 / 12 px en las partes;
     - Final outcomes y Case navigation sobre Background/Deep, con viñetas en Final outcomes;
     - entradas de 500 ms.
   - **Reglas solo de Motion (`.a-cs--motion`):** pasos de 77 px, ejemplos 9:20, videos de expresividad en 3 columnas, muestras móviles en 2 columnas y Final outcomes a todo el ancho (en Figma de Motion los ítems miden 1544; en Registro, 965.4 = 40ch, que es el tope que ya tenía el código).
   - **Reglas solo de Registro (`.a-cs--registro`):** todos los videos usan la altura del token `figure-height`: `min(62.5cqw, 80svh)` respecto del ancho de contenido de `.a-cs__body`, que es contenedor `inline-size`. Eso da 720 / 640 / 460 / 223.75 en 1600 / 1280 / 768 / 390. El video se ajusta con `contain` sobre Background/Secondary.
     - En Figma, el video de Context es 16:10 a todo el ancho con tope de 80svh.
     - Los videos de las partes tienen la misma altura que el de Context, no su proporción natural. En tablet: 360 × 460.
3. Cache busting: `styles.css` y `app.js` pasan a `?v=20261026-registro-5065` en los 8 HTML de `v3/statement/` y en `v3/build-pages.mjs`.

## Archivos a revisar
- `v3/statement/app.js` (`gridSection`, `casePage`)
- `v3/statement/styles.css` (bloque final, desde "Figma case template")
- `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md`
- Referencia: `intercambio/evidencia/2026-10-25_figma-caso1/` (estructura y renders de Figma del caso 1) y `intercambio/revisiones/2026-10-25_motion-codigo_v1_revision.md`
- Contexto: `v3/shared/content.js` (sección `registro`) y `v3/shared/site.js` (sin cambios)

## Cómo verificar
1. Abre `/v3/statement/work/registro-ml.html` a 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800, en inglés y en español.
2. Mide con `getBoundingClientRect`:
   - los altos de `.cs-section`, `.a-cs__final` y `.a-cs__next`;
   - las posiciones y anchos de `.cs-intro .cs-title`, `.cs-content` y `.cs-figure video`.

   Compáralos con `medidas.md` y con la grilla: columna = (W − 2·margin − 11·gutter)/12, con margin/gutter 28/32, 25.6/25.6 y 16/16.
3. Regresión: Motion debe dar los mismos altos que en `intercambio/evidencia/2026-10-25_motion-codigo/medidas.md` (salvo el Roadmap, que ahora mide 1469 por los pasos de 77 px de la revisión anterior). Menores debe renderizar igual que antes.
4. Confirma que no haya overflow horizontal ni errores de consola.

## Supuestos y limitaciones
- La altura `figure-height` en tablet (460) no corresponde a la proporción natural de los videos de las partes. Se respetó tal como está en Figma (`Format=Wide`, alto por token). El video se ajusta sin recorte (`contain`).
- `62.5cqw` depende de que `.a-cs__body` sea contenedor `inline-size`. Esta regla solo se aplica en Registro.
- Entre 1024 y 1279 se mantiene la fila 3 + 4 + 5 (columna de partes de unos 314 px a 1024). Figma no tiene un frame intermedio.
- A 768, la sección Unified mide 57 px menos que en Figma porque Chrome corta en distintos puntos dos párrafos (una línea menos en cada uno).

## Preguntas para el revisor
1. ¿Algún bloque fuera de la grilla o con una diferencia mayor que el redondeo de texto?
2. ¿La separación de reglas en `.a-cs--grid`, `.a-cs--motion` y `.a-cs--registro` es correcta? ¿Cambió algo de Motion?
3. ¿Es aceptable el uso de container query units (`cqw`) para el alto de los videos, o conviene otra fórmula equivalente?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| — | — | — |
