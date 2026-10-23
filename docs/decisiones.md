# Decisiones

## 2026-10-23 — Duración de motion en las propuestas V3

- Revisión Codex `intercambio/revisiones/2026-10-23_v3-statement-tokens_v1_revision.md`, hallazgo 4 (alta): las entradas compartidas de `v3/shared/base.css` duran 700–900 ms, por encima del límite de 500 ms del proyecto.
- Decisión de Claude: **rechazado para la exploración**. David pidió las propuestas V3 "sin limitaciones en cuanto a interacción, uso de imágenes, motion…". Se mantiene reduced motion.
- Escalado a David: si Statement pasa a V3 de producción, decidir si vuelve el límite de 500 ms o si V3 adopta duraciones nuevas para entradas.
