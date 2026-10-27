# Revisión: motion-codigo v6

## Veredicto

**Aprobado con observaciones**

## Resumen

La sustitución de posters es correcta: ocho JPEG nuevos, nueve referencias en `content.js` y 331.647 bytes en total. Sus dimensiones coinciden con las pistas de video originales. Statement, Stage y Poster generan las rutas esperadas; las 24 páginas V3 y el generador comparten la versión de caché indicada.

Se corrigió una discrepancia documental. La mejora elimina la reducción adicional de los posters; la resolución de los videos todavía limita la nitidez. La validación independiente en navegador quedó bloqueada por el entorno.

Sobre `encodeURIComponent`: su aplicación por segmentos en `generate-posters.mjs:21` conserva los separadores `/` y codifica correctamente espacios y tildes. Se verificó su recorrido con la decodificación de `server.js:10`. No se identificó un problema con las rutas actuales.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/handoffs/2026-10-26_motion-codigo_v6.md:39` | **Corregido.** La comprobación pedía nueve posters nuevos; existen ocho archivos y nueve referencias. | Tres ejemplos, tres hero y dos expresividad. `hero-0` aparece dos veces en `content.js`. | Conservar la distinción entre archivos y referencias. |
| 2 | media | `v3/shared/content.js:732`, `:952`, `:1113` | Persiste el límite de nitidez de las fuentes, declarado en el handoff. | Posters y pistas de video coinciden: hero 360 × 800, expresividad 266 × 598 y ejemplo 5879 de 612 × 1376. No alcanzan los anchos DPR 2 reportados por el autor; esas mediciones de layout no pudieron reproducirse aquí. | **Propuesta, sin aplicar:** obtener videos originales de mayor resolución y regenerar sus posters. No ampliar artificialmente las imágenes. |
| 3 | baja | `intercambio/evidencia/2026-10-26_motion-samples/poster-audit.mjs:2`; `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:10` | Validación independiente en navegador pendiente. | Servidor: `listen EPERM` en 127.0.0.1:3456. Auditoría y secuencia: `Chrome exited early, code null`, exit 1. | Repetir auditoría a 1600/390 y secuencia a 1600 en un entorno habilitado; confirmar carga, transición poster/video y consola. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/handoffs/2026-10-26_motion-codigo_v6.md:39` | Sustituir “9 posters nuevos” por “8 posters nuevos” y explicar las nueve referencias por duplicación de `hero-0`. | Corregir el inventario solicitado en la verificación. |

No se modificaron código de producto ni imágenes. Se añadieron el comprobador reproducible y esta revisión:

- `intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v6/static-check.mjs`
- `intercambio/revisiones/2026-10-26_motion-codigo_v6_revision.md`

Se conservaron los cambios ajenos preexistentes. Sin commit, push ni despliegue.

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v6, revisión v5 y los archivos implicados de contenido, extracción, auditoría, secuencia, servidor y renderizadores.

| Comprobación | Resultado |
|---|---|
| `node --check v3/shared/content.js` | **PASS**, exit 0. |
| `node --check` sobre `generate-posters.mjs`, `poster-audit.mjs` y `v3/build-pages.mjs` | **PASS**, exit 0. |
| Dimensiones con `sips` de los ocho JPEG nuevos | **PASS**: tres de 360 × 800; dos de 720 × 1600; uno de 612 × 1376; dos de 266 × 598. |
| Lectura con Python de las cajas `moov/trak/tkhd` de las ocho fuentes MP4/MOV | **PASS**, dimensiones de presentación coincidentes con los posters. No certifica identidad del primer fotograma. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v6/static-check.mjs` | **PASS**, exit 0: fuentes y posters existentes; ocho JPEG únicos y nueve referencias; tamaños entre 10.006 y 98.015 bytes; caché correcta en 24/24 páginas y generador. |
| Renderizadores reales evaluados en VM mediante el comprobador anterior | **PASS**: las tres variantes emiten los ocho posters nuevos. Stage emite 11 referencias por sus copias adicionales; Statement y Poster emiten ocho. No certifica descargas HTTP. |
| Codificación de rutas con espacios y tildes | **PASS**, recorrido URL → decodificación conserva la ruta. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v4/controller-test.mjs` | **9/9 PASS**, exit 0: orden, parada, reentrada, toma manual, eventos pendientes, limpieza por idioma, visibilidad parcial, movimiento reducido y ausencia de observador. Es simulación del controlador. |
| `node server.js` | **Bloqueada**, exit 1 por `EPERM`. |
| `node intercambio/evidencia/2026-10-26_motion-samples/poster-audit.mjs` | **Bloqueada**, exit 1 al iniciar Chrome. No se certifican aquí los resultados de Motion, Registro o Menores a 1600/390. |
| `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600` | **Bloqueada**, exit 1 al iniciar Chrome. Los PASS del autor no se presentan como verificación independiente. |
| Inspección visual local de `hero-0-hd.jpg`, `expressivity-0-hd.jpg` y `poster-4793-5879-hd.jpg` | Imágenes visibles, sin captura vacía. El ejemplo 5879 incluye Play y barra de controles, según lo declarado. Continuidad al reproducir pendiente. |
| Detector mecánico de Impeccable sobre `v3/shared/content.js` | **PASS**, resultado `[]`, exit 0. |
| `git diff --check` después de la corrección | **PASS**, exit 0. |