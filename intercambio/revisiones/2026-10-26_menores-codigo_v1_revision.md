# Revisión: menores-codigo v1

## Veredicto

Aprobado con observaciones

## Resumen

La implementación cumple el handoff. No encontré defectos críticos, altos o medios atribuibles al cambio. Menores funciona en las seis resoluciones solicitadas, en EN y ES, sin overflow ni contenedores de contenido vacíos. Registro y Motion conservan las dimensiones de referencia.

Respuestas a las preguntas del handoff:

1. No detecté nuevas desviaciones de grilla en las comprobaciones realizadas. Las alturas EN reproducen `medidas.md` con diferencias menores de 1,4 px. Permanecen las diferencias documentadas con Figma.
2. El Play en grilla conserva el botón nativo y su orden DOM. Queda a 12 px del video, sin tapar captions o notas. Enter y espacio activan reproducción/pausa con foco visible en los tres casos (`v3/statement/styles.css:401`).
3. La excepción de 12 columnas está limitada a Menores, sección `flows`, desde 1024 px. No afecta otras evidencias ni casos (`v3/statement/styles.css:490`).

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/evidencia/2026-10-26_menores-codigo/medidas.md:24` | La medida tablet se atribuía a la figura completa, aunque corresponde al video. Corregido. | La figura añade caption, separación y nota al video de aproximadamente 360 × 802,45. | Distinguir el video de su contenedor. |
| 2 | baja | `intercambio/evidencia/2026-10-26_menores-codigo/medidas.md:16` y `:18` | Figma conserva restricciones de ancho en Final outcome y un alto fijo de imagen a 1280 que difieren intencionalmente del código. | Final llena las columnas conforme a la regla de David; imagen medida a 1280: 915,20 × 448,45. | Reconciliar Figma con esas decisiones. No restaurar restricciones en CSS. Propuesto, sin modificar Figma. |
| 3 | baja | `v3/statement/app.js:235` | Escape no cierra el menú móvil. Comportamiento preexistente, fuera del cambio revisado. | A 360 conserva `aria-expanded=true` y bloqueo de scroll; el botón Cerrar funciona. | Mejorarlo en una tarea separada del menú compartido. No aplicado por ampliar el alcance. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_menores-codigo/medidas.md` | Cambié «figuras de 360 × 802.45» por «videos» y aclaré que la figura incluye caption y nota. | Corrección documental verificable, sin alterar diseño ni comportamiento. |

No fue necesario corregir código.

Revisión guardada en [2026-10-26_menores-codigo_v1_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_menores-codigo_v1_revision.md). Evidencia independiente en [verificacion.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_menores-codigo/revision-codex/verificacion.md).

## Verificación ejecutada

- Leídos protocolo, AGENTS.md, CLAUDE.md, handoff, archivos referenciados, generador/HTML, copia de comparación y evidencia local de Figma.
- **Menores EN/ES:** 1600 × 900, 1280 × 800, 1024 × 768, 768 × 1024, 390 × 844 y 360 × 800. Medidas DOM tras scroll y carga de imágenes: sin overflow, sin `.cs-content` vacíos y sin superposición de Play con captions.
- Se compensó el zoom 90 % del navegador. El tamaño CSS real puede conservar una fracción inferior a 0,6 px por redondeo.
- **Registro y Motion EN:** mismas seis resoluciones, sin overflow ni superposición. A 1600, Registro conserva videos de 1150 × 720 / 625 × 720 y figuras de 753; Motion conserva ejemplos de 774, expresividad de 753 y muestras de 362.
- **Teclado:** Enter reproduce y espacio pausa el primer video de cada caso, con foco visible. Menú Menores ES: apertura/cierre por botón correctos.
- **Consola:** consultada por separado en los tres casos ES tras scroll; cero warnings/errors.
- **Audit:** reejecutado para los cuatro URL y seis anchos; no pudo iniciar Chrome (`Chrome exited early, code null`). Se utilizó el respaldo autorizado. Recuento independiente de `report.json`: Menores, 0 altos/medios y 48 bajos; Registro, 0; Motion, 0 altos/medios y 27 bajos. Los bajos corresponden a padding interior intencional. Inspeccionados los overlays Menores de 1600, 768 y 390. Estos resultados automáticos pertenecen a la entrega, no a una nueva ejecución aprobada.
- **Comprobaciones estáticas:** `node --check` aprobado para `app.js`, `content.js` y `build-pages.mjs`; `git diff --check` aprobado. Caché coherente en los ocho HTML y el generador.
- **Detector Impeccable:** avisos tipográficos advisory preexistentes, sin hallazgos sobre las reglas nuevas. Conservadas las expectativas de lanzamiento y la nota de proyecto activo (`v3/shared/content.js:1535`).
- **Límites:** sin lectura nueva de Figma ni certificación de reproducción completa de cada grabación. Sin commit, push ni despliegue.