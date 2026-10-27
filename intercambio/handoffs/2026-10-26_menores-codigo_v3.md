# Handoff: menores-codigo v3

## Objetivo
Corregir el hallazgo alto de la revisión v2: el radio de 32 px (Border radius L) debe verse sobre las cuatro grabaciones del recorrido en todas las resoluciones, no sobre las bandas del elemento.

## Contexto y restricciones
- El pedido de David es el mismo de v2 (videos del caso 3 con radio L en todas las resoluciones).
- Hay que conservar las alturas aprobadas (720 / 640 / 802.5 / 675.2), el Play a 12 px de la esquina y los pies de foto alineados.
- Sin commit. Copia de comparación: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-menores-v3/`.

## Qué se hizo
En `v3/statement/styles.css`, bloque "Menores only":
- `.cs-section--flows .cs-figure` pasa a ser contenedor `inline-size`.
- El video mide `width: min(100cqw, 80svh * 716 / 1596)`, con `aspect-ratio: 716 / 1596`, `max-height: none`, `justify-self: center`, `object-fit: cover` y `border-radius: var(--radius-l)`.
  - La caja del video es la grabación: cuando 80svh limita el alto, la caja se angosta en lugar de dejar bandas, y queda centrada en sus columnas.
  - `cover` solo absorbe la diferencia de proporción de un clip (696 × 1516, ratio 2.178 frente a 2.229): recorta unos 1.15 % por lado, unos 4 px a 362 de ancho. Los otros tres son 716 × 1596 y 718 × 1592 (0.25 %).
- El Play compensa el inset: `margin-right: calc((100cqw - min(100cqw, 80svh * 716 / 1596)) / 2 + .75rem)`.
- Caché: `styles.css?v=20261026-menores-radius2`.

## Medidas (figura / video / inset del video / Play a la derecha y abajo / caption)
| Viewport | Figura | Video | Inset | Play | Caption |
|---|---|---|---|---|---|
| 1600×900 | 362 | 323 × 720 | 19.5 | 12 / 12 | 12 debajo, x = borde de la figura |
| 1024×768 | 230.4 | 230.4 × 513.6 | 0 | 12 / 12 | 12 |
| 768×1024 | 360 | 360 × 802.5 | 0 | 12 / 12 | 12 |
| 390×844 | 358 | 302.9 × 675.2 | 27.5 | 12 / 12 | 12 |

Alturas sin cambios respecto de v1. Sin overflow (`scrollWidth` igual al ancho). La captura a 390 muestra las esquinas superiores redondeadas sobre la grabación.

## Archivos a revisar
- `v3/statement/styles.css` (final del archivo)
- `intercambio/revisiones/2026-10-26_menores-codigo_v2_revision.md` y su evidencia

## Cómo verificar
1. En cada viewport, comprueba que el rectángulo visible de la grabación coincida con el del elemento `video` (sin bandas) y que el radio computado sea 32 px.
2. Play a 12 px de la esquina del video, sin quedar cortado por la curva. Pies de foto alineados entre las cuatro figuras.
3. Registro y Motion sin cambios.

## Supuestos y limitaciones
- Los pies de foto y las notas mantienen el ancho de la columna (como en Figma), aunque a 1600 y 390 el video sea más angosto y quede centrado.
- `cover` recorta como máximo unos 4 px por lado en un clip (el borde de la barra de estado). No afecta contenido relevante.

## Preguntas para el revisor
1. ¿El centrado del video con el pie de foto alineado a la izquierda de la columna es aceptable, o conviene alinear el video a la izquierda?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Radio no visible sobre la grabación (alta) | Aceptado | La caja del video ahora es la grabación (ver tabla); el radio cae sobre ella. |
| 2. Supuesto incorrecto de llenado completo (baja) | Aceptado | Se conserva la corrección de Codex; la tabla de este handoff lo reemplaza. |
