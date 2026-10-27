# Evidencia de revisión v4 · 2026-10-26

- `node server.js`: exit 1, `listen EPERM: operation not permitted 127.0.0.1:3456`.
- `node intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs 1600`: exit 1, `Chrome exited early, code null`.
- Mismo comando con 390: exit 1, mismo error de Chrome.
- Controlador extendido antes: exit 1, 8 PASS / 1 FAIL (evento play pendiente tras salida/reentrada).
- Controlador extendido después: exit 0, 9 PASS. Ver controller-before.txt y controller-after.txt.
- Controlador v3: exit 0, 6 PASS.
- Contrato de render v3: exit 0. Ver render-results.txt. La última comprobación solo ejercita el manejador compartido aislado; no incorpora sequenceSamples y no demuestra duplicación en la v4.
- `node --check v3/statement/app.js`: exit 0.
- `node --check intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs`: exit 0.
- `git diff --check`: exit 0.
- Detector Impeccable: exit 0, [].
- `git diff -- v3/shared/site.js`: vacío.
- Ocho HTML de Statement y el generador usan 20261026-motion-samples-4-review.

Los dobles despachan play sincrónico o mediante una cola explícita. La carrera demostrada es un orden controlado de eventos; no se ha reproducido en Chrome. No certifican decodificación, scroll real, autoplay, consola ni tiempos. Los PASS del navegador declarados por el autor no son resultados independientes de esta revisión. El script de navegador reforzado no pudo validarse de extremo a extremo.
