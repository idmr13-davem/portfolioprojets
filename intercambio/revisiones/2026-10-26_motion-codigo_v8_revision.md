# Revisión: motion-codigo v8

## Veredicto

**Aprobado con observaciones**

## Resumen

Statement elimina el bucle automático del hero: los tres clips quedan fuera del observador compartido, se reproducen una vez y dejan de observarse al terminar. El controlador conserva su tiempo al regresar al viewport y mantiene el estado estático con movimiento reducido.

Se corrigieron el umbral efectivo de visibilidad, la limpieza al cambiar de idioma y el código de salida de la prueba. Las comprobaciones simuladas y estáticas pasan. La reproducción real y la permanencia visual del último fotograma quedan pendientes: el entorno bloquea el servidor y Chrome. Los resultados 11/11 y 6/6 del handoff no pudieron reproducirse aquí.

La revisión completa quedó guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v8_revision.md`. Poster y Stage permanecen fuera del alcance.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/statement/app.js:296` | **Corregido.** El callback no comprobaba el umbral declarado de 0,35. | `isIntersecting` puede ser verdadero por debajo del umbral. La simulación comprueba entradas de 0,10, 0,35 y 0,20. | Se exige también `intersectionRatio >= 0.35`; por debajo se pausa. |
| 2 | baja | `v3/statement/app.js:304` | **Corregido.** La limpieza no pausaba los clips antiguos ni invalidaba callbacks pendientes. | Al cambiar de idioma se sustituyen los nodos. La simulación entrega un callback antiguo después del reemplazo y comprueba que no reactiva los clips. | Se añadió `disposed` y pausa explícita durante la limpieza. |
| 3 | baja | `intercambio/evidencia/2026-10-26_motion-hero-once/once-test.mjs:34` | **Corregido.** Una aserción fallida imprimía `FAIL`, pero podía devolver código 0. | `check()` acumulaba texto sin establecer un estado de error. Se verificaron resultados PASS y FAIL con códigos 0 y 1. | Se establece `process.exitCode` según los resultados. |
| 4 | baja | `intercambio/evidencia/2026-10-26_motion-hero-once/once-test.mjs:6`; `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:10` | Verificación independiente en navegador pendiente. | Servidor: `listen EPERM 127.0.0.1:3456`. Ambos scripts: `Chrome exited early, code null`, exit 1. | Repetir ambos scripts en un entorno habilitado. Confirmar pausa parcial, regreso, último fotograma, idioma y ausencia de errores/overflow en 390, 768, 1280 y 1600. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/app.js:295–307` | Comprobar el 35 % de visibilidad; invalidar callbacks antiguos y pausar los clips durante la limpieza. | Cumplir el umbral declarado y completar la limpieza por idioma. |
| 2 | `v3/build-pages.mjs:59` y ocho HTML de `v3/statement/` | Actualizar la versión de `app.js` a `20261026-motion-hero-once-review`. | Evitar caché obsoleta y mantener consistente el generador. |
| 3 | `intercambio/evidencia/2026-10-26_motion-hero-once/once-test.mjs:34` | Devolver código 1 cuando exista algún FAIL. | Evitar falsos éxitos automatizados. |

Se añadieron el comprobador reproducible y su salida en `intercambio/evidencia/2026-10-26_motion-hero-once/revision-codex-v8/`.

Se conservaron los cambios ajenos preexistentes. **Sin commit, push, despliegue ni cambios en Figma o producción.**

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v8, revisión v7 y los archivos referenciados de implementación, generación y pruebas. Se aplicó la skill `impeccable` para la revisión técnica dentro del alcance solicitado.

| Comprobación | Resultado |
|---|---|
| Sintaxis de `v3/statement/app.js`, `v3/build-pages.mjs` y `once-test.mjs` | **PASS**. |
| `motion-hero-once/revision-codex-v8/controller-test.mjs` | **8/8 PASS**: umbral, pausa/reanudación, fin sin reinicio, limpieza por idioma, callbacks pendientes, movimiento reducido, ausencia de observador, caché y estado de salida. Simulación y análisis estático. |
| `motion-samples/revision-codex-v4/controller-test.mjs` | **9/9 PASS**: secuencia, toma manual, reentrada, eventos pendientes y limpieza. Simulación. |
| `motion-hero-v3/revision-codex-v7/static-check.mjs` | **PASS**: clips/posters existentes; renderizadores Statement, Stage y Poster en EN/ES; medios de Registro/Menores y cachés comprobadas por el script. |
| Caché de `app.js` | **PASS**, 8/8 HTML Statement y generador consistentes. |
| `node server.js` | **Bloqueada**, exit 1 por EPERM. |
| Prueba del hero en Chrome | **Bloqueada**, exit 1 al iniciar Chrome. |
| Prueba de secuencia en Chrome | **Bloqueada**, exit 1 al iniciar Chrome. |
| Detector Impeccable sobre `v3/statement/app.js` | **PASS**, salida `[]`. |
| `git diff --check` | **PASS**. |

Las simulaciones verifican la lógica del controlador; no certifican decodificación, último fotograma visible, layout ni conformidad global de accesibilidad.