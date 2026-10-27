# Revisión: Caso Ropstar UI en V3 Statement v1

## Veredicto

Requiere cambios

## Resumen

La página incluye las secciones y quince pantallas solicitadas en EN/ES. Home conserva cuatro bandas, su CTA abre Ropstar y el ciclo de casos principales lo excluye correctamente. Las comprobaciones ejecutadas no detectaron regresiones en las listas y enlaces compartidos.

Queda un incumplimiento: el título ocupa tres líneas en ES a 390/360 px y en EN a 360 px. Resolverlo requiere decidir copy o tipografía; se propone sin modificar el diseño.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/shared/content.js:1846`; `v3/statement/app.js:182` | El título incumple las dos líneas solicitadas en móvil. Dos spans no garantizan dos líneas visuales. | Chrome: h1 de 102.586 px con line-height de 34.2 px en ES a 390/360 y EN a 360: tres líneas. La captura entregada `ropstar-390-es.png` también lo muestra. | Acordar un título más corto en ambos idiomas o una adaptación tipográfica específica. No aplicado: cambia contenido o diseño. Revalidar 360/390 en EN/ES. |
| 2 | baja | `intercambio/handoffs/2026-10-27_ropstar-caso_v1.md:33` | La copia presentada como previa ya contiene la implementación completa. No permite aislar el diff de esta tarea. | Los cinco archivos principales son idénticos a la copia temporal. El diff contra HEAD incluye otras tareas. | Entregar una base anterior o un parche acotado. Esta revisión evalúa el estado entregado. |
| 3 | baja | `v3/shared/content.js:1841`; `v3/shared/content.js:1873` | Parte del contenido bilingüe continúa como traducción propuesta. | El handoff:55 identifica EN de Contexto/capítulos/Resultado y ES de hero/datos como propuestas. Ambos idiomas renderizan correctamente. | Validación editorial de David antes de considerar definitivo ese copy. No se reescribió contenido. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | Ninguna corrección de implementación. | El defecto confirmado requiere decidir copy o tipografía. No apareció otro defecto claro, acotado y de bajo riesgo que justificara modificar el producto. |

Revisión guardada en `intercambio/revisiones/2026-10-27_ropstar-caso_v1_revision.md`. Evidencia independiente en `intercambio/evidencia/2026-10-27_ropstar-caso/codex-review/`: `browser-checks.md`, `verify-static.mjs` y `static-checks.txt`.

## Verificación ejecutada

- Leídos protocolo, plantilla, CLAUDE.md, handoff, archivos principales, shell nuevo, scripts y evidencia referenciada. Comparación con la copia temporal: cinco archivos idénticos.
- Intentados los comandos indicados: `node server.js`, `measure.mjs es`, `measure.mjs en` y audit pixel-perfect a 1600/1280/768/390/360. El servidor falló desde el shell con `listen EPERM`; las tres pruebas terminaron al iniciar Chrome con `Chrome exited early, code null`. **No se certifica una nueva auditoría automática pixel-perfect.**
- Verificación alternativa en Chrome existente mediante extensión sobre `localhost:3456`: **Ropstar y Home EN/ES a 1600, 1280, 768, 390 y 360 px CSS**, sin overflow horizontal. Medidas del hero, banda, Contexto y capítulos coherentes con el handoff. Viewport temporal restaurado.
- Registro, Motion, Menores y Switch en EN a esos cinco anchos: overflow 0, Goals conservado y sin textos `undefined`/`[object Object]`. Ciclo comprobado: Registro → Motion → Menores → Switch → Registro. Ropstar enlaza a Registro y no recibe enlaces del ciclo.
- Stage/Poster: Registro EN renderiza título y ocho listas correctamente. Esta comprobación no equivale a una comparación visual exhaustiva de ambas propuestas.
- `node --check` pasó para content.js, site.js, app.js y build-pages.mjs. La prueba estática verificó **50 renderizados de listas existentes** idénticos al helper anterior, listas ordenadas y enlaces enriquecidos en ambos idiomas, escape HTML, **17 assets locales** y **28 shells** coincidentes con el generador ejecutado en memoria. Ropstar solo se genera para Statement.
- Accesibilidad: lista ordenada con tres marcadores, lista final con dos, jerarquía h1/h2 y descripciones de las quince pantallas presentes en el árbol accesible. Enlaces finales con nombres comprensibles en contexto, `_blank` y `noopener noreferrer`; foco por teclado comprobado en ambos, outline de 2 px y offset de 3 px.
- Las consultas de consola tras los recorridos no devolvieron warnings ni errores capturados. No se comprobó reproducción completa de todos los videos ni dispositivos físicos.
- Inspeccionadas las cuatro capturas ES entregadas y overlays desktop/mobile. El reporte automático del autor contiene **0 high, 119 medium y 16 low** entre 21 combinaciones, incluyendo Home y componentes compartidos; esos resultados no son una nueva ejecución independiente.
- Consultados directamente los frames Figma de 1600 y 390, sin modificarlos. **Acepto las decisiones de grilla**: tres pantallas de tres columnas en desktop y ocho columnas centradas en móvil respetan la regla de David. Las diferencias frente a los 319/251 px quedan documentadas; no corresponde reproducir la instancia adicional desbordada de 1600. El hero conserva la composición visual, aunque su identidad exacta de asset no está demostrada por hash.
- Taste lint: 0 FAIL y 1 WARN por Inter, requerido por el proyecto. Su inspector tampoco pudo iniciar Chrome. Detector Impeccable: avisos orientativos de tipografía y sombra que no justifican alterar el sistema aprobado.
- Una iteración. `git diff --check` pasó. Sin cambios de implementación, commit, push ni despliegue. Pendiente resolver el hallazgo 1 y repetir su comprobación responsive.