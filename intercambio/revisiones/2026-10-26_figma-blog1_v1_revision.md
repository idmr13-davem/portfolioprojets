# Revisión: figma-blog1 v1

## Veredicto

**Aprobado con observaciones**

## Resumen

Los cuatro anchos objetivo respetan la grilla declarada y conservan visualmente el contenido, orden y jerarquía del artículo. Los tamaños tipográficos y espaciados documentados corresponden al CSS. No detecté omisiones de secciones, bordes casi alineados ni recortes evidentes en los renders.

El título a 12 columnas y el resumen a 6/10/12 columnas cumplen la regla de anchos. El cuerpo de 1600 a 756 px constituye una diferencia deliberada frente al límite de 62ch del navegador; no la considero un error.

La aprobación cubre los renders y las coordenadas entregadas. No certifica la estructura nativa de Figma —auto layout, instancias y vinculaciones— ni la adaptación fluida entre los cuatro anchos.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-26_figma-blog1/estructura.md:49`; `v3/statement/styles.css:211` | La redimensión reportada a 1440 conserva medidas de 1280 y pierde la relación con la grilla. | Article conserva `x=339.2`, ancho `601.6`. Con la grilla del CSS a 1440, las columnas 4–9 requieren `x=381.2`, ancho `677.6`: diferencias de 42 y 76 px. Es un cálculo independiente, sin reproducción nativa en Figma. | En frame `5111:37338`, proponer que Body/Article derive posición y ancho de las columnas mediante auto layout y Fill. Revisar también Summary. Mantener las medidas actuales en los cuatro anchos objetivo. |
| 2 | media | `intercambio/evidencia/2026-10-26_figma-blog1/estructura.md:52` | El footer heredado difiere de la referencia, especialmente en tablet. | Alturas documentadas: 405.8 frente a 472.2 px en 768; 538 frente a 552.5 en 390. Los renders muestran diferencias en composición del CTA y distribución vertical. | Revisar el componente Footer compartido en frames `5111:37511` y `5111:37684`. Si se exige fidelidad al navegador, reconciliar wrapping y padding; no imponer una altura fija. Queda propuesto porque afecta una plantilla previamente aprobada. |
| 3 | baja | `intercambio/evidencia/2026-10-26_figma-blog1/inventario-grilla.csv:9`; filas 17, 25 y 33; `estructura.md:48` | La evidencia estructural y de igualdad exacta de textos no es completamente reproducible. | Cada fila del cuerpo agrupa 46 nodos bajo una coordenada. Header, navegación, footer y filas de tags carecen de mediciones individuales. No se adjuntan textos extraídos de Figma ni algoritmo de checksum. | Adjuntar exportación por nodo con coordenadas, caracteres, sizing, auto layout, componente y variables vinculadas. Permitirá confirmar independientemente la eliminación de anchos medidos. |

La navegación con fondo Background/Deep se conserva como excepción de la plantilla aprobada (`estructura.md:53`). La distinta sangría de las viñetas (`estructura.md:55`) no constituye por sí sola un error de grilla; las siete viñetas mantienen su jerarquía.

Sobre trasladar los anchos al código: **sí conviene proponerlo, limitado al artículo**. Quitar los 22ch de `.a-ar__head h1`, asignar 6/10/12 columnas a Summary y anular los 62ch únicamente en `.a-ar__body p`. Evitar cambiar globalmente `p` en `base.css`. Validar después los cortes naturales del título y ambos idiomas. Propuesta sin aplicar.

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_figma-blog1/estructura.md:49` | Aclarada la limitación de la redimensión a 1440 e incorporados los valores esperados de grilla. | Evitar presentar ausencia de desbordamiento como prueba de alineación fluida. |
| 2 | `intercambio/evidencia/2026-10-26_figma-blog1/verificar-review.py` y `review-checks.json` | Añadida verificación reproducible y sus resultados. | Dejar evidencia auditable de grilla, valores CSS, contenido fuente y dimensiones PNG. |

No se modificó Figma ni ningún archivo dentro de `v3/`. No se hicieron commits, push ni despliegues.

Revisión guardada en `intercambio/revisiones/2026-10-26_figma-blog1_v1_revision.md`.

## Verificación ejecutada

- Leídos protocolo, handoff, plantilla, CLAUDE.md, archivos referenciados y skill `pixel-perfect` con su checklist.
- Ejecutado `python3 intercambio/evidencia/2026-10-26_figma-blog1/verificar-review.py > intercambio/evidencia/2026-10-26_figma-blog1/review-checks.json`: **salida 0; todas las aserciones correctas**.
- Recalculadas las 32 filas del CSV, representativas de 212 nodos declarados. Anchos de columna en 390/768/1280/1600: **15.1667 / 46.6667 / 78.9333 / 99.3333 px**. Desviaciones máximas: izquierda **0.00334 px**, derecha de spans **0.00667 px**; ambas inferiores a 0.05. Los nodos agrupados no se verificaron individualmente.
- Contrastados `styles.css:202–218`, `styles.css:313–316` y `base.css:55–56`: tamaños de título, resumen, cuerpo y h2; cuerpo **19/30.4**; separación de párrafos **20.9**; `.ar-break` **48**; margen superior h2 **56**; margen de listas **20**, gap **8**; padding de tags **5.6/12.8**. El espacio Meta–Summary incorpora correctamente 24 px más 0.9em del resumen.
- Inspeccionados los ocho PNG: Figma y navegador en **1600, 1280, 768 y 390**. Comparados título, metadata, resumen, cuatro tags, collage responsive, caption, apertura, siete viñetas, cuatro lecciones, cierre, navegación y footer. No se detectaron omisiones visuales.
- Contrastados `content.js:1595`, `site.js:129` y `app.js:191`: **22 párrafos, cuatro h2, siete ítems y cinco separadores**; 33 textos de cuerpo y 41 en total. Se reproducen los **6671 caracteres** al separar los textos con saltos de línea. El checksum de Figma queda sin validación independiente.
- La ausencia de anchos medidos en Figma se sostiene en la documentación y en las coordenadas de columnas completas del CSV; **queda pendiente la confirmación nativa**.
- Una lectura inicial de dimensiones con Pillow falló por dependencia ausente; se sustituyó por lectura PNG con biblioteca estándar y se repitió correctamente.
- No se ejecutaron nuevas pruebas de navegador, consola o interacción: esta revisión utilizó los renders suministrados.