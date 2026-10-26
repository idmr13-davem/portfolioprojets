# Handoff: registro-codigo v3

## Objetivo
1. Llevar a código el ajuste de David en el frame mobile de Registro ML (Figma `5074:1002`): los ejemplos en video de cada iteración miden 420 px de alto en mobile para que se vean mejor.
2. Responder a la revisión v2.

## Contexto y restricciones
- Lectura de Figma de solo consulta en el frame `5074:1002` (390):
  - Los cinco `Video figure` (Context, Agnostic, Form, Google, Unified) miden 358 × 420. Cada uno tiene Media de 358 × 388 (Fill), gap SS de 12 y caption de 20.
  - Altos de sección en Figma: Context 1111.6, Challenges 310.4, Agnostic 1023.2, Form 1218, Google 1346.5 y Unified 1372.5. Frame completo: 8923.81.
  - Tablet y desktop no cambiaron.
- La regla nueva de David quedó en `~/.claude/skills/figma-senior-build/SKILL.md`, estándar 6, "Visual evidence uses the most space it can": todo video, imagen o ejemplo visual debe aprovechar al máximo el espacio para que la referencia se lea con claridad.
- Sin commit (pedido de David). Copia de comparación: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-registro-v3/`.

## Qué se hizo
1. `v3/statement/styles.css`: en `@media (max-width: 767px)`, `.a-cs--registro .cs-figure video { height: 388px; }`. El video mide 388 y la figura completa, con gap y caption, 420. Desktop y tablet siguen con `min(62.5cqw, 80svh)`.
2. Caché de `styles.css`: `?v=20261026-registro-mobile420` en los 8 HTML y en `v3/build-pages.mjs`.
3. Skills, respuesta al hallazgo 1 de v2. Se reescribió la excepción en `.agents/skills/pixel-perfect/SKILL.md` (paso 4), en `references/checklist.md` y en `~/.claude/skills/figma-senior-build/SKILL.md` (estándar 5):
   - la excepción ya no exige "una medida que la grilla no puede expresar" que a la vez sea un número entero de columnas;
   - ahora solo vale para un tamaño intrínseco (ícono, logo, thumbnail nativo) o una restricción explícita del diseño, documentada y dentro de un contenedor alineado a columnas;
   - quitar topes existentes queda limitado al alcance de la tarea; los demás se reportan.

## Medidas en código (Chromium, 390×844, EN)
| Sección | Figma | Código |
|---|---|---|
| Context | 1111.6 | 1110.23 |
| Challenges | 310.4 | 308.98 |
| Agnostic | 1023.2 | 1021.34 |
| Form | 1218 | 1215.13 |
| Google | 1346.5 | 1345.13 |
| Unified | 1372.5 | 1370.63 |
| Página | 8923.81 | 8920 |

Figuras: 358 × 419.55 (video de 388 + 12 + caption de 19.55). A 360×800: video de 388, `scrollWidth` 360, sin elementos fuera del viewport y sin errores de consola.

## Archivos a revisar
- `v3/statement/styles.css` (regla mobile de `.a-cs--registro`)
- `.agents/skills/pixel-perfect/SKILL.md`, `.agents/skills/pixel-perfect/references/checklist.md`
- Revisión anterior: `intercambio/revisiones/2026-10-26_registro-codigo_v2_revision.md`

## Cómo verificar
1. Registro a 390×844 y 360×800, EN y ES: cinco videos de 388 px y figuras de unos 420; compara los altos con la tabla.
2. 768×1024 y 1600×900: los videos siguen en 460 y 720 (sin cambios).
3. Motion y Menores sin cambios; sin overflow ni errores de consola.
4. Lee la redacción de las skills y confirma que la contradicción quedó resuelta.

## Supuestos y limitaciones
- 388 px es un valor fijo en CSS: corresponde al alto que David fijó en Figma para mobile (420 por figura), sin variable. Entre 360 y 767 px de ancho el alto no cambia, a propósito: el objetivo es que la grabación se lea en cualquier teléfono.
- La caption ocupa una línea en todos los casos (los textos son cortos). Si alguna ocupara dos, la figura crecería a unos 440.

## Preguntas para el revisor
1. ¿El alto fijo de 388 en mobile es correcto frente a la regla de aprovechar el espacio, o conviene una fórmula fluida que dé 388 a 390 px?
2. ¿La nueva redacción de las skills resuelve la contradicción?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Excepción contradictoria en las skills (baja) | Aceptado | Redacción corregida en las tres ubicaciones. La aplicó Claude porque Codex no tenía permisos de escritura en `.agents/`. |
| 2. Unified 768 −56.75 px (media) | Aceptado sin cambios de código | Igual que en v1: es diferencia de corte de línea, y la tabla lo documenta. |
| 3. Cambio mobile no descrito en v2 (baja) | Aceptado | Se describe y se mide en este handoff, con los altos de Figma `5074:1002`. |

## Nota: cambios en el árbol de trabajo que no son de esta revisión
Mientras este handoff esperaba revisión, se aplicaron en `v3/statement/styles.css` cambios de Motion Level: el bloque `@media (min-width: 1024px)` y `(min-width: 1500px)` bajo "Motion Level only", y `.a-cs--motion .a-cs__final { margin-top: 0; }`. También cambió la versión de caché a `?v=20261026-motion-desktop`.
- Esos cambios van en su propio handoff, `intercambio/handoffs/2026-10-26_motion-codigo_v2.md`. No los revises aquí.
- Solo comprueba que no afecten a Registro: todas las reglas están bajo `.a-cs--motion`.
