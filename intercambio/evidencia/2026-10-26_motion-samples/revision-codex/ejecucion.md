# Ejecución de revisión · 2026-10-26

## Pruebas del handoff intentadas

- `node server.js`: exit 1, `Error: listen EPERM: operation not permitted 127.0.0.1:3456`.
- `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600`: exit 1, `Error: Chrome exited early, code null` en `cdp.mjs:67`.
- `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 390`: mismo resultado.

No se obtuvo una pasada de navegador en esta revisión. No se verificaron tiempos reales, decodificación, scroll, política de autoplay, overflow ni consola del sitio.

## Controlador original: prueba independiente en Node VM

`node intercambio/evidencia/2026-10-26_motion-samples/revision-codex/controller-test.mjs`

Exit 1: 2 PASS, 4 FAIL.

- PASS: 12 clips, parada final y salida/reentrada.
- FAIL: visibilidad parcial; recibió `[0, 0, 0]` en vez de `[0]`.
- FAIL: reduced motion; seguían con loop.
- FAIL: sin IntersectionObserver; seguían con loop.
- FAIL: reemplazo por idioma; el DOM anterior podía continuar la cadena y el callback anterior no estaba invalidado.
- PASS: los callbacks ended antiguos no duplicaban el avance de una nueva pasada sobre el mismo DOM.

## Después de corregir

- `controller-results.txt`: 6 PASS, exit 0.
- `render-results.txt`: contratos de render de Motion, Registro y Menores; control manual compartido, exit 0.
- `node --check v3/statement/app.js`: exit 0.
- `git diff --check`: exit 0.
- `.agents/skills/impeccable/scripts/impeccable detect --json v3/statement/app.js`: `[]`, exit 0.
- `git diff -- v3/shared/site.js`: sin diferencias.
- Cache busting: 8 HTML de Statement y `v3/build-pages.mjs:59` usan `20261026-motion-samples-review`.

Las pruebas VM usan el controlador real extraído del archivo, EventTarget y dobles de video/IntersectionObserver. La prueba de render usa los helpers y el contenido reales. No sustituyen las pruebas de navegador pendientes.
