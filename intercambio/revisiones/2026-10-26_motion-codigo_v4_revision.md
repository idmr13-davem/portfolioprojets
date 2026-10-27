# Revisión: motion-codigo v4

## Veredicto

**Aprobado con observaciones**

## Resumen

La toma de control manual detiene la cadena, pausa las otras muestras y permite reiniciar al salir y volver a entrar. Se conservan las correcciones de visibilidad, movimiento reducido y limpieza por idioma de v3.

Se corrigió una carrera reproducida con eventos encolados y se reforzaron las aserciones del escenario manual. Las nueve pruebas controladas pasan. La validación independiente en Chrome sigue pendiente por restricciones del entorno; los PASS del handoff corresponden al autor.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/statement/app.js:270` | **Corregido.** Un evento `play` pendiente de un clip ya pausado podía tomar el control después de salir/reentrar y detener la nueva secuencia. | `revision-codex-v4/controller-test.mjs:41`: falla antes y pasa después; comprueba que el nuevo clip 0 siga activo y avance al 1. Reproducción con dobles, no en Chrome. | Aplicada guardia `e.target.paused`. Asignar `current` antes de `play()` cubre el inicio ordinario, pero no bastaba para este evento obsoleto. |
| 2 | baja | `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:37` | **Corregido.** El escenario manual podía aprobar sin iniciar el clip 6: contar un video activo y excluir `p2`/`p7` no demuestra la toma de control. El timeout de `p1` se ignoraba. | Antes, un log detenido en `p0 e0 p1` cumplía la última aserción. Ahora se exige inicio del clip 1, clip 6 activo, log exacto `p0 e0 p1 p6 e6` y parada final. | Aplicadas aserciones más estrictas, manteniendo exit 1 ante fallos. |
| 3 | baja | `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:10` | **Pendiente de verificación.** No se pudo ejecutar la reproducción real en 1600 ni 390. | Servidor: `listen EPERM`; ambos comandos de navegador: `Chrome exited early, code null`. | Ejecutar el script reforzado en un entorno que permita servidor y Chrome; comprobar también idioma durante reproducción. No requiere cambio de diseño. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/app.js:270` | Ignorar eventos `play` de clips pausados. | Evitar que eventos pendientes cancelen la nueva pasada. |
| 2 | `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:37` | Aserción del inicio automático, identidad del clip manual, log completo y parada final. | Eliminar falsos positivos del escenario manual. |
| 3 | `v3/build-pages.mjs:59`; ocho HTML de Statement, línea 21 | Caché de `app.js` actualizada a `20261026-motion-samples-4-review`. | Servir la corrección y conservar coherencia con el generador. |
| 4 | `intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v4/` | Prueba extendida, resultados antes/después y registro de ejecución. | Dejar evidencia reproducible sin sobrescribir la evidencia v3. |

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v4, revisión v3 y sus pruebas/resultados. Se inspeccionaron el controlador, renderizador, controles y observador compartido. Se aplicó la guía técnica de Impeccable dentro del alcance funcional.

| Comprobación | Resultado |
|---|---|
| `node server.js` | **Bloqueada:** exit 1, `listen EPERM` en 127.0.0.1:3456. |
| `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600` y con `390` | **Bloqueadas:** exit 1 al iniciar Chrome. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v4/controller-test.mjs` | **9/9 PASS** después; **8/9** antes. Incluye orden/parada, toma manual, reentrada, evento pendiente, limpieza de listeners por idioma, visibilidad parcial, reduced motion y ausencia de observador. |
| Controlador original `revision-codex/controller-test.mjs` | **6/6 PASS.** |
| `revision-codex/render-contract-test.mjs` | **PASS.** Motion: 12 muestras fuera del autoplay compartido y 8 videos con loop/autoplay; Registro: 5; Menores: 4. Su demostración final de dos videos pertenece al manejador aislado, sin el controlador de muestras; no demuestra un defecto de v4. |
| Observador compartido | `v3/shared/site.js:73` selecciona únicamente `video[data-autoplay]`; se conserva para los demás videos. Archivo sin diferencias. |
| `node --check` sobre controlador y script de navegador | **PASS**, ambos exit 0. |
| `git diff --check` | **PASS.** |
| Detector Impeccable sobre `v3/statement/app.js` | **PASS**, `[]`. |
| Caché | Ocho HTML y generador coinciden. |

Evidencia en `intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v4/`: `controller-before.txt`, `controller-after.txt`, `render-results.txt` y `ejecucion.md`.

Los dobles no certifican decodificación, tiempos, scroll real, autoplay, overflow ni consola. Se mantiene la decisión documentada de no coordinar reproducciones manuales bajo movimiento reducido.

Revisión guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v4_revision.md`. No se modificaron contenido, CSS, runtime compartido ni producción. Se conservaron los cambios ajenos preexistentes. Sin commit, push ni despliegue.