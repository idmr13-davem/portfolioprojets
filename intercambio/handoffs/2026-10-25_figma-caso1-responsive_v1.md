# Handoff: figma-caso1-responsive v1

## Objetivo
Llevar a 1280, 768 y 390 los cambios que David hizo en el frame desktop de 1600 del caso de estudio 1 (Registro ML), en Figma. Usar auto layout, tokens, grilla de 12 columnas y componentes (skill `figma-senior-build`), y cuidar la alineación (skill `pixel-perfect`).

## Contexto y restricciones
- El trabajo es solo en Figma: archivo `Nodyl6xcEeEwbhi0OBGFnB`, sección "Caso estudio 1" (`5065:519`). No se cambió código del sitio.
- Referencia: frame `Registro ML · Desktop XL · 1600` (`5074:474`), editado por David.
- Estándar vigente (AGENTS.md, nota del 25-oct-2026): todo en auto layout, valores por breakpoint como variables con un modo por breakpoint, colores de la librería, componentes con variantes, nada de posición absoluta salvo superposiciones.
- No hacer commit ni push (CLAUDE.md).

## Qué se hizo
Cambios de David en 1600, replicados:
1. **Context y Challenges:** título en 3 columnas y copy en el resto. En tablet y mobile: título y copy apilados a todo el ancho.
2. **Secciones con partes** (Agnostic, Sign-up form, Google, Unified): fila de 3 + 4 + 5 columnas (título | partes | video).
   - 1280: igual que en 1600.
   - Tablet: título a todo el ancho y debajo una fila "Parts and video" de 6 + 6 columnas.
   - Mobile: todo apilado.
3. **Párrafos:** ocupan su columna. David quitó el tope de 62ch en 1600, así que se eliminó la variable `case-page/text-width`.
4. **Final outcomes y Case navigation:** fondo `Background/Deep` y padding vertical `section-half` en los cuatro frames.

Tokens:
- `case-page/title-width` ahora mide 3 columnas en desktop.
- Variable nueva `case-page/parts-width`: 4 columnas en desktop, 6 en tablet.
- Se borraron `copy-width`, `copy-offset` y `text-width`, que ya no tenían uso.

Ajuste de pixel-perfect aplicado también a 1600: en Context y Challenges el gap título–copy era 40 px (`block-gap`), y eso dejaba el copy en x 430, fuera de la columna 4. Ahora usa `gutter` y el copy queda en x 422, el inicio de la columna 4.

Ajuste de contenido: en 1280 el título "Agnostic sign-up" tiene el mismo salto de línea manual que David puso en 1600.

## Archivos a revisar
- `intercambio/evidencia/2026-10-25_figma-caso1/estructura.md`: tokens por breakpoint, posiciones de los bloques clave y resultado de la auditoría de grilla.
- `intercambio/evidencia/2026-10-25_figma-caso1/figma-1600.png`, `figma-1280.png`, `figma-768.png`, `figma-390.png`: renders de los frames.
- Contexto: `v3/statement/styles.css` (grilla del sitio: `--margin`, `--gutter`, 12 columnas) y `.claude/skills/pixel-perfect/references/checklist.md`.

## Cómo verificar
1. Con la tabla de `estructura.md`, comprueba que cada bloque empiece en un inicio de columna: inicio de la columna n = margin + (n−1)·(columna + gutter).
2. Mira los renders y busca:
   - bloques que no compartan bordes,
   - ritmo vertical irregular entre secciones,
   - texto cortado,
   - diferencias de jerarquía entre breakpoints,
   - tablet: si la fila 6 + 6 de partes y video es una buena lectura de la composición 3 + 4 + 5 de desktop.
3. Revisa contra `.claude/skills/pixel-perfect/references/checklist.md` (grilla, consistencia, jerarquía, información repetida).

## Supuestos y limitaciones
- Codex probablemente no tiene acceso al archivo Figma. La evidencia son las tablas y los renders exportados; cualquier corrección se aplicará en Figma desde Claude.
- La adaptación de tablet (6 + 6) y mobile (apilado) es criterio de Claude: David solo cambió el desktop.
- En 1280, en "Sign-up with Google" y "Unified", la columna de partes es más alta que el video. La sección crece con el texto y el video queda arriba alineado. Es el comportamiento natural de la composición de David con una columna más angosta.
- El código del sitio todavía tiene el layout anterior (título en 5 columnas y copy desde la columna 7). Esta tarea no lo cambia.

## Preguntas para el revisor
1. ¿Ves algún bloque fuera de la grilla o algún par de bordes casi alineados (a 2–8 px) en las tablas o los renders?
2. ¿La composición de tablet (título arriba + partes | video en 6 + 6) es la mejor traducción de la de desktop, o recomiendas otra?
3. ¿Hay alguna inconsistencia de tokens (un valor fijo donde debería ir una variable) que se pueda inferir de la tabla?
