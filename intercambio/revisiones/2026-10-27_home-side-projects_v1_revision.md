# Revisión: Home V3 Statement · Freelance and side projects y media mobile v1

## Veredicto

Aprobado con observaciones

## Resumen

La sección Ropstar/Winefast está implementada con contenido bilingüe, imágenes optimizadas y enlaces con nombres accesibles distintos. La media mobile comprobada respeta los 560 px solicitados, incluida Motion; los controles de Menores y Switch quedan sobre la grabación. No encontré defectos claros que justificaran corregir código.

La copia previa contiene casi todo el trabajo: app.js, content.js y build-pages.mjs son idénticos; styles.css solo difiere en los últimos ajustes de media mobile. Los demás puntos se revisaron como estado entregado. Se excluyeron las pantallas de estado y el banner de otras sesiones.

No se modificó la implementación ni se hizo commit, push o despliegue.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | v3/statement/app.js:108 | Ambos CTA prometen ver una propuesta, pero llevan a la misma página en construcción. Es una limitación declarada. | Destinos comprobados en el DOM y árbol accesible: `articles/page-under-work.html`. Los nombres accesibles sí distinguen los proyectos. | Antes de publicar la sección, conectar las propuestas o acordar una indicación visible de disponibilidad. No aplicado: requiere decidir contenido y destino. |
| 2 | baja | v3/shared/content.js:104 | Las traducciones ES están completas y caben, pero continúan pendientes de validación editorial. | Home ES comprobada entre 360 y 1600 px sin overflow; el handoff identifica el español como propuesta. | Validar títulos, resúmenes y CTA. No se reescribió copy. |
| 3 | baja | intercambio/handoffs/2026-10-27_home-side-projects_v1.md:21 | La copia previa no permite reconstruir el diff completo de los cambios enumerados. | `codex-review/baseline.diff`: tres archivos idénticos; únicamente cambia media mobile en styles.css. | Adjuntar en futuros handoffs una copia anterior al inicio o un parche limitado a la tarea. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | Ninguna corrección de implementación. | No se identificó un defecto claro, acotado y de bajo riesgo que justificara modificar el trabajo. |

Se guardaron esta revisión y los registros de comprobación en `intercambio/revisiones/2026-10-27_home-side-projects_v1_revision.md` y `intercambio/evidencia/2026-10-27_home-side-projects/codex-review/`.

## Verificación ejecutada

- Lectura del protocolo, plantilla, CLAUDE.md, handoff, archivos principales, scripts y evidencia referenciada. Diff contra la copia temporal indicada, guardado en `codex-review/baseline.diff`.
- Chrome mediante extensión sobre `http://127.0.0.1:3456`: Home EN y ES a **1600, 1280, 768, 390 y 360 px CSS**, sin overflow horizontal. Se comprobó `innerWidth`, compensando el zoom existente; el viewport temporal quedó restaurado.
- Las seis imágenes nuevas cargan. Los collages tienen descripción accesible y los enlaces incluyen el nombre del proyecto. Inspección visual de Home desktop y de las capturas entregadas desktop/tablet/mobile, incluida la exportación de Figma; estas últimas son evidencia del autor.
- Home mobile: los cuatro videos miden **358×560** a 390 y **328×560** a 360 (`styles.css:387`). Blog usa Background/Primary; Contacto usa Background/Deep y padding desktop de 160 px.
- Los cuatro casos comprobados a **360, 768, 1280 y 1600**, sin overflow. A 390: Registro tiene cinco videos y Motion cinco ejemplos/expresividad en **358×560 con contain**. Menores muestra cuatro grabaciones de aproximadamente **251×560**; Switch, dos de **253×560** y tres de **251×560**, con play a 12 px del borde (`styles.css:640–648`).
- Se conservaron las excepciones documentadas: collage intrínseco centrado, Motion mobile a 560, quinto video de Registro a 560 y copy autorizado de Switch.
- `node --check` pasó para app.js, content.js y build-pages.mjs. Caché revisada en los **27 HTML**, sin inconsistencias. Detector Impeccable: 31 avisos orientativos; no justifican cambios automáticos fuera del alcance.
- Se intentaron `measure.mjs`, `media-mobile.mjs` y Pixel Perfect: fallaron al iniciar Chrome headless (`Chrome exited early, code null`). Las medidas principales se comprobaron mediante el DOM en Chrome. **No se certifica una nueva auditoría automática Pixel Perfect; el “0 altos” entregado sigue siendo evidencia del autor.**
- La consulta de consola tras el recorrido no devolvió advertencias ni errores capturados. No se verificó reproducción completa de todos los videos, dispositivo físico ni fidelidad píxel a píxel de todos los frames.
- Evidencia independiente: `codex-review/browser-checks.md`, `baseline.diff` y `detector.json`. Una iteración de revisión.