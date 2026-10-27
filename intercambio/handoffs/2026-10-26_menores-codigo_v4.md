# Handoff: menores-codigo v4

## Objetivo
David pidió quitar del caso 3 la imagen de la sección "A redesigned experience" (la composición de teléfonos inclinados que va debajo de los cuatro pasos), en todas las versiones del caso.

## Contexto y restricciones
- La imagen era `assets/Menores/v2/cuenta-menores-registro-app.webp` (versión mobile `...-mobile.webp`), definida como `media` de la sección `experience` en `v3/shared/content.js`. Ese archivo lo comparten las tres propuestas V3 (Statement, Stage y Poster).
- No se tocó la V2 publicada (`work/menores-mexico.html`), que también la muestra. Cambiarla implica preparar una nueva publicación, y eso queda a decisión de David.
- Los archivos de imagen siguen en el repositorio; solo dejaron de usarse.
- Sin commit. La comparación se hace con `git diff v3/shared/content.js`.

## Qué se hizo
- `v3/shared/content.js`: se eliminó el bloque `"media": [...]` de la sección `experience` de `menores` (12 líneas). Los pasos, el título y los textos no cambian.

## Archivos a revisar
- `v3/shared/content.js` (sección `menores` → `experience`)
- Revisión anterior: `intercambio/revisiones/2026-10-26_menores-codigo_v3_revision.md`

## Cómo verificar
1. `node --check v3/shared/content.js`.
2. Abre Menores en Statement, Stage y Poster (EN y ES): no debe haber `img` ni `source` con `cuenta-menores-registro-app`, y deben verse las cuatro tarjetas de pasos.
   - En Statement, a 1600×900, la sección `#experience` mide unos 826 px y no contiene `.cs-media`.
3. Sin overflow ni errores de consola. Registro y Motion sin cambios.

## Supuestos y limitaciones
- En Figma (`5091:1104` y demás frames) la imagen "Flow image" sigue existiendo. Habría que quitarla también allí para que diseño y código coincidan.

## Preguntas para el revisor
1. ¿Queda alguna referencia o texto que dependa de esa imagen (alt, caption, renderers de Stage o Poster)?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Comentario de recorte por lado (baja) | Aceptado | Corrección de Codex conservada. |
