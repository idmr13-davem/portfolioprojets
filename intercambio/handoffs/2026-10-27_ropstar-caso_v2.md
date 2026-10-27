# Handoff: Caso Ropstar UI en V3 Statement v2

## Objetivo
Resolver el hallazgo 1 de la revisión v1 (título del hero en tres líneas en móvil) con la decisión de David del 27-oct-2026: «Acorta la segunda línea del título en español para que quepa en dos líneas a 390 (por ejemplo «Visual y UI»), y acepta 3 líneas solo en EN a 360.»

## Contexto y restricciones
- Sin commit. Mismo alcance que v1 (`intercambio/handoffs/2026-10-27_ropstar-caso_v1.md`).
- Esta vez la copia previa se tomó antes del cambio, así que el diff aísla solo v2.

## Qué se hizo
1. `v3/shared/content.js`, `cases.ropstar`: ES `title` → "Ropstar Visual y UI" y `titleLines.es` → ["Ropstar", "Visual y UI"]. EN sin cambios. El dato "Contribución: Ejecución visual y de UI" del hero no cambia (no es el título).
2. Nuevo script `intercambio/evidencia/2026-10-27_ropstar-caso/title-lines.mjs` y su salida `title-lines.txt`: líneas del h1 por ancho e idioma.

## Archivos a revisar
- v3/shared/content.js (bloque `"ropstar"`, `title` y `titleLines`)
- Copia previa para diff: /private/tmp/claude-501/-Users-dave--claude-spares-spare-VGMqSk/c4c6f15f-0798-4424-b63c-cba8cf207326/scratchpad/antes-codex-ropstar-v2/v3
- intercambio/evidencia/2026-10-27_ropstar-caso/title-lines.txt

## Resultado medido (Chrome headless)
```
en 1600/1280/768/390 → 2 líneas; en 360 → 3 líneas (aceptado por David)
es 1600/1280/768/390/360 → 2 líneas
overflow horizontal 0 en todos
```

## Cómo verificar
node server.js (127.0.0.1:3456) y:
node intercambio/evidencia/2026-10-27_ropstar-caso/title-lines.mjs
Si Chrome headless no arranca en tu sandbox, comprobar a mano en un navegador a 390 y 360 con `?lang=es` y `?lang=en`.

## Supuestos y limitaciones
- Las traducciones propuestas (hallazgo 3 de v1) siguen pendientes de validación editorial de David.

## Preguntas para el revisor
1. ¿Queda resuelto el hallazgo 1 con la decisión de David?

## Respuesta a la revisión anterior
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1 (alta) título en 3 líneas en móvil | Aceptado con cambios | David eligió acortar la segunda línea en ES a «Visual y UI» y aceptar 3 líneas solo en EN a 360. title-lines.txt: ES 2 líneas en los cinco anchos; EN 2 líneas salvo 360. |
| 2 (baja) copia previa no aislaba el diff | Aceptado | La copia de v2 se tomó antes del cambio. |
| 3 (baja) traducciones propuestas | Aceptado | Se mantiene como pendiente editorial de David; no se reescribe copy. |
