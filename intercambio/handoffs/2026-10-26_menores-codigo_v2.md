# Handoff: menores-codigo v2

## Objetivo
David pidió (con una captura del recorrido en ES) que los videos del caso 3 lleven un border radius de 32 px con el token Border radius L, en todas las resoluciones.

## Contexto y restricciones
- Alcance: los cuatro videos de "The adult and minor journey" (`#flows`), que son los de la captura. El resto de las medias de Menores (hero y la imagen del flujo) no son videos y no cambian.
- Sin commit (pedido de David). Copia de comparación: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-menores-v2/`.

## Qué se hizo
- `v3/statement/styles.css`, regla "Menores only": `.a-cs--menores .cs-section--flows .cs-figure video` suma `border-radius: var(--radius-l)` (32 px, `css/tokens/figma.css:79`). La regla no tiene media query, así que aplica en todos los anchos.
- Caché de `styles.css`: `?v=20261026-menores-radius` en los 8 HTML y en `v3/build-pages.mjs`.

## Archivos a revisar
- `v3/statement/styles.css` (final del archivo)
- Revisión anterior: `intercambio/revisiones/2026-10-26_menores-codigo_v1_revision.md`

## Cómo verificar
1. Menores a 1600, 1280, 768, 390 y 360: `getComputedStyle(video).borderRadius === '32px'` en los cuatro videos.
2. Comprueba que el botón Play (a 12 px del borde) no quede cortado por la curva y que las alturas no cambien.
3. Registro y Motion sin cambios.

## Supuestos y limitaciones
- El radio se aplica al elemento `video`, no necesariamente al rectángulo de la grabación. Verificación de Codex: `object-fit: contain` y `max-height: 80svh` dejan bandas laterales a 1600, 390 y 360. Las proporciones nativas tampoco son idénticas: 716 × 1596, 696 × 1516, 716 × 1596 y 718 × 1592. Por ello, `borderRadius === '32px'` no garantiza un radio visible de 32 px sobre las cuatro grabaciones. Detalle en `intercambio/evidencia/2026-10-26_menores-codigo/revision-codex-v2/verificacion.md`.

## Preguntas para el revisor
1. ¿Hay riesgo de que la curva corte contenido relevante de las grabaciones o el botón Play?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Medida tablet: video o figura (baja) | Aceptado | Corrección de Codex conservada. |
| 2. Figma con anchos y alto fijos (baja) | Aceptado, pendiente en Figma | Se le informó a David; el código no vuelve a esos valores. |
| 3. Escape no cierra el menú móvil (baja) | Fuera de alcance | Preexistente y compartido; se propondrá como tarea aparte. |
