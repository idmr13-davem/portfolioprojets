# Revisión: motion-codigo v9

## Veredicto

Aprobado con observaciones

## Resumen

La implementación cumple en simulación la secuencia 1→2→3, una sola vez, con pausa fuera de vista y continuación sin reiniciar. No encontré defectos que requieran modificar `app.js`. Reforcé la prueba de pausa y guardé evidencia reproducible.

No fue posible iniciar Chrome ni el servidor local. Quedan pendientes la comprobación visual del último fotograma, la consola y el overflow. Sin commit, push ni despliegue.

Revisión guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v9_revision.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/evidencia/2026-10-26_motion-hero-sequence/sequence-test.mjs:44` | La prueba original de pausa podía pasar aunque el primer clip nunca hubiera empezado. Corregido. | Aceptaba las tres curvas pausadas en cero y continuación con `back[0].t >= mid[0].t`. Ahora exige inicio efectivo, tiempo positivo, congelamiento durante la pausa y avance al volver, líneas 45–57. | Ejecutar la prueba reforzada en navegador; ahora contiene 25 comprobaciones. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_motion-hero-sequence/sequence-test.mjs` | Espera acotada al inicio efectivo; comprueba tiempo positivo, congelamiento fuera de vista y avance estricto al volver. | Eliminar el falso positivo de la prueba de pausa. |
| 2 | `intercambio/evidencia/2026-10-26_motion-hero-sequence/logic-review-test.mjs` y `logic-review-results.txt` | Añadida simulación de la función real extraída de `app.js`, con diez escenarios y resultados. | Dejar evidencia reproducible sin Chrome. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, handoff, plantilla y archivos referenciados. Revisados también runtime compartido, contenido, CSS y ocho HTML consumidores.
- **Simulación: 10/10 PASS.** Verifica umbral 0.35, orden exclusivo, ausencia de reinicio al completar, pausa/continuación de cada clip, `ended` pendiente fuera de vista, limpieza, reinicialización y alternativas estáticas. No acredita decodificación ni renderizado.
- `v3/statement/app.js:293–320`: un observador para el conjunto; solo el clip activo avanza la secuencia; desconexión al completar; limpieza con pausa y retiro de listeners. En `:160`, los videos quedan excluidos del autoplay compartido.
- `v3/statement/styles.css:156` y `:480–482`: las reglas mantienen las tres curvas en una fila, incluida la variante móvil. Geometría y overflow pendientes de comprobación visual.
- **Caché coherente en 8/8 HTML** y `v3/build-pages.mjs:59`. Existen los tres videos y sus tres posters.
- `node --check` de los archivos revisados y añadidos: correcto. `git diff --check` del código del alcance: correcto. Detector Impeccable sobre `app.js`: sin hallazgos.
- Intentados ambos scripts del handoff: Chrome terminó antes de iniciar (`Chrome exited early, code null`). El servidor falló con `listen EPERM 127.0.0.1:3456`. Las **25 comprobaciones del hero** y las **6 de samples** quedan pendientes de ejecución en navegador; no se presentan como aprobadas.