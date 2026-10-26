# Handoff: registro-codigo v2

## Objetivo
Aplicar a Registro ML (`/v3/statement/work/registro-ml.html`) la última versión de sus frames en Figma, página `5013:2330`, sección "Caso estudio 1" (`5065:519`). Además, aplicar la regla nueva de David: no usar tokens de ancho con medidas específicas cuando el bloque puede aprovechar el layout completo de 12 columnas.

## Contexto y restricciones
- Lectura de Figma de solo consulta. El único cambio de layout en los frames de Registro es Final outcomes: título, intro y lista pasan a Fill de 12 columnas en 1600, 1280 y 768.
  - Antes, la intro medía 750.89 / 687.66 / 586.39 y los ítems 965.4 / 772.7 / 547.4.
  - En 390 siguen ligados a `final-intro-width` y `final-list-width`, pero esos tokens valen 358, el ancho completo.
  - Imágenes y videos tienen los mismos `imageHash` en los cuatro frames, y la página ya usa esos medios.
- David pidió no hacer commit. El punto de comparación es una copia: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-registro-v2/`. No hagas commit.
- La regla nueva quedó guardada en las skills:
  - `.agents/skills/pixel-perfect/SKILL.md` (paso 4) y `references/checklist.md` (Grid and alignment);
  - `~/.claude/skills/figma-senior-build/SKILL.md` (estándar 5, tokens).

## Qué se hizo
1. `v3/statement/styles.css`:
   - Nueva regla en la plantilla `.a-cs--grid`: `.a-cs__final > p` y `.a-cs__final .cs-list li` con `max-width: none`. Antes estaban limitados a 40ch, el valor del que salieron esos tokens.
   - Se quitó la regla equivalente que solo existía para Motion, porque ahora cubre ambos casos. Motion no tiene intro y sus ítems ya ocupaban todo el ancho, así que no cambia.
2. Cache: `styles.css` pasa a `?v=20261026-registro-final` en los 8 HTML de `v3/statement/` y en `v3/build-pages.mjs`. `app.js` no cambió.
3. Evidencia: sección "v2" en `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md`.

## Archivos a revisar
- `v3/statement/styles.css` (bloque "Figma case template", reglas de Final outcomes)
- `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md` (sección v2)
- `.agents/skills/pixel-perfect/SKILL.md`, `.agents/skills/pixel-perfect/references/checklist.md`. Revisa que la regla sea clara. `~/.claude/skills/figma-senior-build/SKILL.md` está fuera del proyecto: no lo edites.
- Revisión anterior: `intercambio/revisiones/2026-10-26_registro-codigo_v1_revision.md`

## Cómo verificar
1. Abre Registro a 1600×900, 1280×800, 768×1024, 390×844 y 360×800, en EN y ES.
2. Comprueba que título, intro e ítems de `.a-cs__final` ocupen las 12 columnas (x = margin; ancho = W − 2·margin, menos la sangría de 1.5em de las viñetas). Compara los altos con la tabla v2.
3. Busca en `v3/statement/styles.css`, dentro de la plantilla de casos, otros topes de ancho medidos (`ch`, px) en bloques que deberían ocupar columnas completas.
4. Regresión: Motion y Menores sin cambios. No debe haber overflow horizontal ni errores de consola.

## Supuestos y limitaciones
- La sangría de las viñetas (1.5em) se mantiene. En Figma la viñeta va dentro del ancho del texto. El borde izquierdo coincide con el render de Figma (texto en x 46 a 390).
- Antes de cerrar la revisión v1 vi que el frame de Motion a 1600 también cambió de alto en Figma (de 12519.5 a 12225.5). No se aplicó: este pedido es solo de Registro.

## Preguntas para el revisor
1. ¿Queda algún tope de ancho medido en la plantilla de casos que contradiga la regla nueva?
2. ¿La regla quedó bien redactada en las skills, sin contradecir otras instrucciones de la skill?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Unified a 768 es 56.75 px más bajo que Figma (media) | Aceptado sin cambios de código | Ancho de copy y video idénticos (360) y grilla exacta. La diferencia son dos párrafos con una línea menos en Chrome (5 y 6 líneas medidas, frente a 6 y 7 en Figma). Compensarla exigiría alturas fijas o saltos manuales, que el propio hallazgo desaconseja. Queda como observación. |
| 2. Nota de regresión de Roadmap (baja) | Aceptado | Corrección de Codex conservada en `medidas.md`. |
