# Handoff: menores-codigo v1

## Objetivo
Llevar al código el caso de estudio 3 (Accounts for minors in Mexico, `/v3/statement/work/menores-mexico.html`) según los frames de Figma de la sección "Caso estudio 3" (`5076:2434`), en todas las resoluciones. Se siguen los estándares de los casos 1 y 2 y las skills `figma-senior-build` y `pixel-perfect`.

## Contexto y restricciones
- Lectura de Figma de solo consulta. Frames: 1600 `5091:1104`, 1280 `5091:1234`, 768 `5091:1364` y 390 `5091:1498`.
- Plantilla aprobada (Motion y Registro): título en columnas 1–3 y contenido en 4–12; la media ancha va en las columnas 4–12 en desktop; Final outcomes y la navegación sobre Background/Deep.
- Reglas de David del 26-oct-2026:
  - nada de tokens de ancho cuando la grilla cubre la composición;
  - las evidencias visuales aprovechan todo el espacio.
- Sin commit hasta que David lo pida. Copia de comparación: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-menores-v1/`.

## Qué se hizo
1. `v3/statement/app.js`:
   - `gridSection` también se usa para `menores`.
   - Ya no se genera `.cs-content` cuando la sección no tiene copy, pasos, partes, grupos ni ejes. En el recorrido, el contenedor vacío sumaba un row-gap de 40 en tablet y mobile, y la sección quedaba 37 px más alta que en Figma.
2. `v3/statement/styles.css`:
   - **Plantilla `.a-cs--grid`:**
     - Una lista después de un párrafo lleva 20 px de separación (`copy-block-gap` en Figma: Advantage = párrafo + lista + cierre). Antes era .9em. En Motion y Registro no hay párrafo seguido de lista, así que no cambian.
     - Figuras: el Play queda en la esquina inferior derecha del video, a 12 px. Video y botón comparten la primera fila de una grilla, en lugar de usar `bottom: calc(.75rem + 2.4em)`, que solo funcionaba con un pie de una línea y tapaba la nota en Menores.
     - `.a-cs__final .a-cs__note`: tamaño de la intro final (`--step-lead`) con line-height 1.5 y opacidad .8 (Final intro, Text/Primary al 80% en Figma).
   - **Solo Menores:**
     - El recorrido ("flows") ocupa las 12 columnas en desktop: 4 × 3 columnas, como en Figma.
     - Los cuatro videos comparten la proporción nativa de las grabaciones (716 × 1596, el `journey-video-height`), con tope de 80svh, para que los pies de foto queden alineados.
3. Caché: `styles.css?v=20261026-menores-play` y `app.js?v=20261026-menores-5076b` en los 8 HTML y en `v3/build-pages.mjs`.

## Archivos a revisar
- `v3/statement/app.js` (`gridSection`, `casePage`)
- `v3/statement/styles.css` (bloque de plantilla y final "Menores only")
- `intercambio/evidencia/2026-10-26_menores-codigo/medidas.md` y `pixel-perfect/report.md`, más los overlays `pixel-perfect/*.jpg`
- `v3/shared/content.js` (sección `menores`)

## Cómo verificar
1. Menores a 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800, EN y ES. Compara con `medidas.md`.
2. Re-ejecuta el audit:
   ```
   node .claude/skills/pixel-perfect/scripts/audit.mjs <url> --widths 1600,1280,1024,768,390,360 --cols 12 --margin-var --margin --gutter-var --gutter
   ```
   Debe dar 0 hallazgos altos o medios. Si no puedes lanzar Chrome, usa `report.json` y los overlays.
3. Revisa que el Play no tape textos en ningún caso. En Registro y Motion las figuras deben conservar sus alturas (Registro 1600: 1150 × 720 / 625 × 720 y figura de 753; Motion: ejemplos de 774, expresividad de 753 y muestras de 362).
4. Sin overflow ni errores de consola.

## Supuestos y limitaciones
- **Final outcome:** en código ocupa las 12 columnas aunque Figma todavía use `final-list-width` y `final-intro-width`. Es la regla de David y es igual en Registro. Hay que corregir Figma.
- **Imagen del flujo a 1280:** queda con su alto natural (448), no con el valor fijo de 563 que hay en Figma.
- **Recorrido en desktop:** va a 12 columnas, aunque las otras medias de la plantilla van en 4–12. Así lo diagramó David y aprovecha el espacio para cuatro grabaciones. Hay que confirmarlo con David.
- **Mobile:** las figuras del recorrido van separadas 16 px (gap de wrap = gutter en Figma), no 40 como en Registro.

## Preguntas para el revisor
1. ¿Algún bloque fuera de la grilla o con diferencias mayores al redondeo, aparte de las anotadas?
2. ¿El cambio del Play a grilla (video y botón en la misma celda) tiene algún riesgo en Motion o Registro (accesibilidad, foco, superposición)?
3. ¿La excepción de 12 columnas para el recorrido está bien acotada?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| — | — | — |
