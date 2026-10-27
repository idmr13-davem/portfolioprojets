# Revisión: footer-consent v1

## Veredicto

Aprobado con observaciones

## Resumen

La integración conserva el nodo de preferencias y sus listeners, traduce el disclaimer y comparte el footer en las nueve páginas Statement. No encontré regresiones bloqueantes atribuibles al cambio. No apliqué correcciones de código: los pendientes requieren una decisión de composición, evidencia adicional o intervenir en el comportamiento compartido de V2, expresamente excluido.

El ciclo de vida es correcto para los HTML actuales:

- `app.js` realiza el primer render y registra `DOMContentLoaded`. El script diferido de analytics crea el nodo antes de ese evento.
- `placeConsent()` mueve la instancia existente; no clona el botón ni vuelve a registrar sus listeners.
- Antes de reemplazar `app.innerHTML`, el nodo se rescata a `body` y después se devuelve al nuevo footer.
- El panel permanece fuera de `#app`, por lo que sobrevive al render.
- El runtime cambia `html.lang` antes del render; el observador de analytics traduce después los mismos elementos.

Referencias: `v3/statement/app.js:384–400`, `v3/statement/index.html:21–24`, `v3/shared/site.js:46–52` y `js/analytics.js:187–233`. Esta conclusión depende del orden actual; no acredita una futura carga con `async` o posterior a `DOMContentLoaded`.

El control conserva semántica de botón, nombre bilingüe, `type="button"` y `aria-controls`. Al abrir preferencias se enfoca el título; al responder o cerrar con Escape —con elección previa— se devuelve el foco al mismo botón. El panel es una región no modal. Las capturas muestran subrayado y foco visible; no equivalen a una comprobación de navegación completa con teclado.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `js/analytics.js:168` | Al responder al banner inicial, sin abrirlo desde preferencias, `previousFocus` está vacío: se enfoca el botón del footer con `preventScroll`, aunque esté fuera de pantalla. Es comportamiento heredado de V2, no una regresión del traslado. | Lectura de `saveChoice()` y del registro de `previousFocus` en la línea 224. Las capturas posteriores al rechazo y desplazamiento al footer no cubren esta situación. | Revisar por separado el destino del foco al responder al banner inicial. Conservar la devolución al invocador cuando se reabre preferencias. No modificar aquí analytics ni añadir un parche paralelo en Statement. |
| 2 | baja | `v3/statement/styles.css:343–356` | La composición flex hace que el inicio del disclaimer dependa del contenido y cambie entre idiomas, sin quedar anclado a una columna. El near-miss de 7,9 px con el cuarto botón compara grupos distintos y no demuestra por sí solo un error. | Capturas de 1600 EN/ES, captura de 768 EN y `pixel-perfect/report.md`. El handoff declara esta composición como reproducción del componente Figma. | Documentar la fila legal como excepción intencional al checklist, o proponer una composición con subgrid si se quiere aplicar también aquí la alineación por columnas. No introducir offsets por idioma. |
| 3 | baja | `intercambio/evidencia/2026-10-27_footer-consent/measure.mjs:20–28` | La evidencia funcional guardada es incompleta: el script imprime resultados, pero no hay un log de esas salidas. Comprueba conteo tras un cambio de idioma y reapertura, pero no identidad del nodo, retorno del foco, Escape o cambios repetidos. | Inventario de evidencia y lectura de `measure.mjs`. `shots.mjs` utiliza clic programático. Los resultados funcionales constan como relato en el handoff. | En una futura validación autorizada, conservar las salidas y cubrir esos estados con teclado. Esta revisión distingue lo declarado en el handoff de lo comprobado estáticamente, sin relanzar mediciones. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/revisiones/2026-10-27_footer-consent_v1_revision.md` | Añadida esta revisión. Ninguna corrección de código. | No encontré un defecto inequívoco dentro del alcance que justificara una modificación de bajo riesgo. |

## Verificación ejecutada

- Leídos el handoff, los archivos referenciados, el generador, el runtime compartido, los estilos base, ambos archivos de analytics, el protocolo y el checklist solicitado. Revisados los diffs considerando los cambios de otras sesiones.
- Inspeccionadas las ocho capturas `footer-{1600,1280,768,390}-{en,es}.png`: créditos apilados, disclaimer integrado, adaptación móvil y foco visible. No se aprecian cortes del texto legal ni superposición con los botones de contacto.
- Leídos `pixel-perfect/report.md` y `report.json`: 18 combinaciones, **0 hallazgos altos, 48 medios y 16 bajos** en la auditoría previa completa. Son avisos automáticos existentes, no defectos confirmados ni resultados de una nueva auditoría.
- Los avisos de alineación del botón inline son compatibles con su posición dentro de una frase. No corresponde alinearlo como bloque independiente. Los avisos del banner flotante y del cuerpo de la 404 quedan fuera de esta intervención.
- Checklist: sin nuevos límites `ch` en la fila legal; separación mediante tokens; estructura y copy compartidos; enlace subrayado; jerarquía secundaria del texto legal; sin medios nuevos, apariciones de medios por hover ni información duplicada. La excepción de composición se recoge en el hallazgo 2.
- El nombre decorativo recortado es previo, tiene `aria-hidden` y exclusión explícita de grilla. La separación móvil de 48 frente a 43 en Figma está documentada y utiliza el token existente. Ambos se conservaron.
- Inspeccionados los nueve HTML Statement: una carga de analytics, siempre diferida y posterior al runtime y `app.js`; versiones de caché coherentes con el generador. No se regeneraron páginas.
- `node --check v3/statement/app.js` y `node --check v3/build-pages.mjs`: correctos. Los archivos `js/analytics.js` y `css/analytics.css` permanecen sin diferencias.
- No se verificaron nuevamente las alturas frente a Figma, navegación con teclado, lector de pantalla, consola o ingestión GA4. Las rutas V3 no pertenecen al conjunto medible del analytics compartido.
- Sin servidores, auditorías nuevas, commit, push ni despliegue.