# Revisión: motion-codigo v3

## Veredicto

**Requiere cambios**

## Resumen

Se corrigieron el reinicio por visibilidad parcial, el bucle manual con movimiento reducido y la limpieza de la secuencia al cambiar de idioma. Las seis pruebas controladas pasan; antes fallaban cuatro.

Queda pendiente definir cómo Play manual debe intervenir en la secuencia: actualmente permite reproducir dos muestras simultáneamente. También falta validar en navegador: los comandos solicitados fallaron porque el servidor recibió `EPERM` y Chrome terminó antes de abrirse.

Revisión guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v3_revision.md`. Sin commit, push ni despliegue.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/app.js:257` | **Corregido.** El observador original reiniciaba al cruzar el umbral 0.1 aunque la sección continuara visible. | Con ratios 0.05 → 0.15 → 0.05, la prueba reproducía el clip 0 tres veces. Después: una sola vez. | Aplicado umbral 0 y guardia de cambio de estado. Reiniciar únicamente después de salir y volver a entrar. |
| 2 | media | `v3/statement/app.js:235` | **Corregido.** La salida anticipada por movimiento reducido o ausencia de IntersectionObserver dejaba `loop` activo para Play manual. | El helper genera `loop` en `v3/shared/site.js:103`. Ambas pruebas fallaban antes y pasan después. | Aplicada la eliminación de `loop` antes de comprobar si procede el autoplay. |
| 3 | media | `v3/statement/app.js:233`; `:264` | **Corregido.** Desconectar el observador por idioma no invalidaba la cadena anterior ni retiraba su listener `ended`. | Al conservar referencias al DOM anterior y entregar eventos pendientes, la prueba podía avanzar sobre clips retirados. Después queda cancelada. No se demostró duplicación visible en navegador. | Aplicada limpieza que desconecta, invalida, retira el listener y pausa/rebobina los clips anteriores. |
| 4 | media | `v3/shared/site.js:87`; `v3/statement/app.js:249` | **Pendiente.** Play en otra muestra puede mantener activo el clip automático y romper la exclusividad y el orden. | El manejador compartido solo controla el video pulsado. La prueba del manejador real con dobles permite dos reproducciones activas. | Propuesta sin aplicar: cancelar la cadena automática y pausar las demás al iniciar otra muestra manualmente, hasta salir/reentrar. Requiere definir esa interacción. |
| 5 | baja | `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:9` | **Pendiente.** La prueba imprime resultados sin aserciones; una secuencia incompleta puede terminar con exit 0. La segunda pasada espera solo seis segundos. | Las líneas 11–15 no comprueban orden, cantidad ni parada. Tampoco prueban idioma o movimiento reducido. | Añadir aserciones para dos pasadas completas, exclusividad, idioma y movimiento reducido. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/app.js:257` | Umbral 0 y guardia del estado de intersección. | Evitar reinicios mientras la sección sigue visible. |
| 2 | `v3/statement/app.js:238` | Quitar `loop` antes de las salidas por movimiento reducido o falta de observador. | Mantener una sola pasada manual. |
| 3 | `v3/statement/app.js:231` | Limpieza por render, invalidación del token, retirada de listeners y pausa/rebobinado. | Cancelar la secuencia anterior y evitar listeners acumulados. |
| 4 | `v3/build-pages.mjs:59`; ocho HTML de Statement, línea 21 | Versión de `app.js`: `20261026-motion-samples-review`. | Invalidar caché y mantener coherente el generador. |
| 5 | `intercambio/evidencia/2026-10-26_motion-samples/revision-codex/` | Pruebas independientes, resultados y registro de ejecución. | Dejar evidencia reproducible y documentar las limitaciones. |

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v3 y antecedentes v1/v2. Se inspeccionaron el script indicado, el renderizador, el contenido, los controles y los observadores compartidos. Se aplicó la guía técnica de `impeccable`.

| Comprobación | Resultado |
|---|---|
| `node server.js` | Falló: `listen EPERM: operation not permitted 127.0.0.1:3456`. |
| `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600` | Falló al iniciar Chrome: `Chrome exited early, code null`. |
| Mismo comando con `390` | Mismo fallo; sin reproducción real verificable. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex/controller-test.mjs` | **6/6 PASS** después; **2/6** antes. Comprueba orden 0–11, parada, salida/reentrada, visibilidad parcial, movimiento reducido, falta de observador y limpieza por idioma. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex/render-contract-test.mjs` | **PASS.** Motion genera 12 muestras sin `data-autoplay` y 8 videos con `loop`/`data-autoplay`. Registro conserva 5 y Menores 4 con esos atributos. Confirma la falta de coordinación manual. |
| `node --check v3/statement/app.js` | **PASS.** |
| `git diff --check` | **PASS.** |
| Detector de Impeccable sobre `v3/statement/app.js` | `[]`, sin hallazgos mecánicos. |
| Alcance | `v3/shared/site.js` sin diferencias. No se modificaron CSS, contenido, Stage, Poster ni código de producción durante esta revisión. Se conservaron los cambios ajenos preexistentes. |

Respecto a las preguntas del handoff:

- **Listeners anteriores:** entre pasadas sobre el mismo DOM, `run` ya impedía avanzar la cadena nueva; esa prueba pasa antes y después. La limpieza incompleta al reemplazar el DOM por idioma quedó corregida.
- **Umbral:** para exigir salir completamente corresponde umbral 0 con guardia de estado. El 0.1 anterior no cumplía ese requisito.

La evidencia está en `intercambio/evidencia/2026-10-26_motion-samples/revision-codex/`: `controller-results.txt`, `render-results.txt` y `ejecucion.md`.

Las pruebas controladas usan dobles de video y observador. No certifican decodificación, tiempos, scroll real, política de autoplay, overflow ni consola del sitio. Queda pendiente comprobar en navegador las dos resoluciones solicitadas, el cambio de idioma con la sección visible y la ausencia de regresiones en los demás videos y casos.