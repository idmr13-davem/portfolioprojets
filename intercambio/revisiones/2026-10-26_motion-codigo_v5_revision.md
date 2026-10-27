# Revisión: motion-codigo v5

## Veredicto

**Aprobado con observaciones**

## Resumen

Los 12 posters HD existen, miden 1000 × 1000 y suman 387.315 bytes. Los renderizadores de Statement, Stage y Poster generan las rutas correctas y conservan el mismo HTML salvo los posters. Las 24 páginas y el generador usan la caché esperada.

Se corrigieron dos detalles de portabilidad y documentación. La reproducción y la carga real en navegador quedaron pendientes por restricciones del entorno.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs:2` | **Corregido.** La importación dependía de una ruta absoluta personal. | La nueva ruta relativa resuelve el archivo CDP existente; sintaxis válida. | Conservar la importación relativa. |
| 2 | baja | `intercambio/handoffs/2026-10-26_motion-codigo_v5.md:14`; `work/motion-design-system.html:36`; `docs/v2-public-resources.json:366` | **Corregido en documentación.** Los posters antiguos todavía se usan en V2. | La página V2 referencia los 12 PNG antiguos y el inventario público los incluye. | **No eliminarlos.** Migrar V2 y actualizar su inventario requeriría una tarea separada. |
| 3 | baja | `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:10` | Validación independiente en navegador pendiente. | Servidor: `listen EPERM`. Pruebas a 1600 y 390: `Chrome exited early, code null`. | Repetir la secuencia y comprobar las descargas reales en las tres variantes donde puedan ejecutarse servidor y Chrome. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs:2` | Importación relativa: `../../../.agents/skills/taste-skill/scripts/lib/cdp.mjs`. | Eliminar dependencia de la ubicación personal del checkout. |
| 2 | `intercambio/handoffs/2026-10-26_motion-codigo_v5.md:14` | Precisar que las muestras V3 dejaron de usar los posters antiguos, pero V2 todavía los necesita. | Evitar una eliminación que rompería sus consumidores. |

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v5, revisión v4 y los archivos de extracción, reproducción y renderizado implicados.

| Comprobación | Resultado |
|---|---|
| `node --check v3/shared/content.js` | **PASS**, exit 0. |
| `sips -g pixelWidth -g pixelHeight assets/Motion\ DS/v2/*-hd.png` | **PASS**, 12/12 imágenes de 1000 × 1000. |
| Renderizadores reales evaluados en VM | **PASS** en las tres variantes: 12 rutas HD existentes por variante; HTML idéntico al restaurar únicamente las rutas antiguas en memoria. Esto no certifica descargas HTTP. |
| Caché de `content.js` | **PASS**, 24/24 páginas y `v3/build-pages.mjs:57` usan `20261026-motion-posters-hd`. |
| `node intercambio/evidencia/2026-10-26_motion-samples/revision-codex-v4/controller-test.mjs` | **9/9 PASS**: orden, parada, reentrada, toma manual, evento pendiente, limpieza por idioma, visibilidad parcial, movimiento reducido y ausencia de observador. |
| `node server.js` | **Bloqueada**, exit 1 por `EPERM` en 127.0.0.1:3456. |
| `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600` y con `390` | **Bloqueadas** al iniciar Chrome. Los PASS del autor no se presentan como verificación independiente. |
| Inspección de la captura suministrada y comparación de `poster-4793-5943.png` con su HD | Misma composición circular y mayor definición; esquinas cuadradas según lo documentado. No se certifica ausencia de salto al reproducir. |
| Sintaxis del script de extracción y del generador | **PASS**. La importación relativa resuelve correctamente. No se regeneraron imágenes. |
| `git diff --check` tras las correcciones | **PASS**. |

Revisión completa guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v5_revision.md`. Se conservaron los cambios ajenos preexistentes. Sin commit, push ni despliegue.