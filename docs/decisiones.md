# Decisiones

## 2026-10-23 — Duración de motion en las propuestas V3

- Revisión Codex `intercambio/revisiones/2026-10-23_v3-statement-tokens_v1_revision.md`, hallazgo 4 (alta): las entradas compartidas de `v3/shared/base.css` duran 700–900 ms, por encima del límite de 500 ms del proyecto.
- Decisión de Claude: **rechazado para la exploración**. David pidió las propuestas V3 "sin limitaciones en cuanto a interacción, uso de imágenes, motion…". Se mantiene reduced motion.
- Escalado a David: si Statement pasa a V3 de producción, decidir si vuelve el límite de 500 ms o si V3 adopta duraciones nuevas para entradas.
- Respuesta de David (23-oct-2026): mantener las duraciones actuales en la exploración V3; la decisión final se toma al pasar a producción.

## 2026-10-23 — Pixel Perfect en Statement (3 iteraciones con Codex)

- Skill nueva `pixel-perfect` en `.agents/skills/pixel-perfect/` (enlazada en `.claude/skills/`); fuera de Git como el resto de `.agents/`.
- Revisiones: `intercambio/revisiones/2026-10-23_pixel-perfect-statement_v{1,2,3}_revision.md`. Las tres terminaron en "Requiere cambios"; los hallazgos aceptados se aplicaron. Tras la v3 se aplicó su parche propuesto para el script, con un ajuste: listas como texto y botones como controles que se alinean por un borde (sin ese ajuste, cada botón ajustado a su texto se reportaba como fuera de retícula).
- Resultado final (`.pixel-perfect/final/`): 70 combinaciones (8 páginas EN + 2 ES, de 360 a 1500 px), 0 altos, 0 medios, 90 `inset` bajos (relleno interno de componentes).
- Pendiente de David (hallazgo alto de Codex): el nombre del hero en móvil pasó de 17 vw a 16,4 vw para evitar 1 px de desborde a 360 px, un cambio tipográfico fuera del alcance. Con 17 vw "Montealegre" invade el margen derecho en todo móvil. Opciones: mantener 16,4 vw; ajustar la palabra exactamente al ancho de la retícula; o volver a 17 vw aceptando que ocupe el margen.
- Decisión de David (24-oct-2026): ajustar "Montealegre" exactamente al ancho de la retícula en móvil, sin invadir el margen. Implementado con `container-type: inline-size` en el hero y `font-size: calc(100cqw / 5.6492)` (ancho de tinta medido con `measureText`); entre 320 y 767 px el último trazo termina a ≤0,05 px del margen. Los titulares de estado vuelven a 17 vw y se ajustan al ancho disponible solo si su línea más larga no cabe (por ejemplo, "construcción" en español).

## 2026-10-24 — Revisión Codex de la segunda tanda (pixel-perfect-statement-r2)

- Revisión: `intercambio/revisiones/2026-10-24_pixel-perfect-statement-r2_v1_revision.md` ("Requiere cambios", por parches propuestos al auditor y al generador).
- Aplicados por Codex: reduced motion del velo del video, un solo listener de resize en los titulares de estado, caché `20261024-grid-r2-review`.
- Aplicados por Claude a partir de sus parches exactos: `competing-hierarchy` solo para encabezado seguido de p/blockquote con peso idéntico; `inconsistent-repeat` excluye tarjetas hermanas en una fila y admite `data-grid-repeat` / `data-grid-repeat-ignore`; generador sincronizado con la caché.
- Verificación posterior: el auditor sigue detectando los problemas de la versión anterior (commit `b57dd55`); Statement queda sin altos ni medios en 120 combinaciones (12 URLs EN/ES × 10 anchos de 320 a 1500, incluida la franja 768–1023). No se abrió una segunda iteración porque los únicos cambios pendientes eran los parches del propio revisor, ya verificados.

## 2026-10-25 — Actualización de Figma 5059:155 en Statement

- Implementado Home · Desktop XL de Figma: Sobre mí con titular y lista (columnas 3–10), blog y contacto en columnas 3–10, pie con los cuatro canales como botones y el nombre al 25 %, casos con fondo plano `--surface-main` y sin zoom en hover (pedido de David). Se mantiene el logo productivo aunque el header de Figma no lo muestre.
- Pendiente de validación de David: el titular de Sobre mí en español ("Además del diseño, mis intereses incluyen:") es traducción propia; Figma solo trae el inglés.
- Revisión Codex `intercambio/revisiones/2026-10-25_figma-5059-statement_v1_revision.md` ("Requiere cambios"): Codex corrigió el contraste de hover/active de los botones del pie (3,05 → 5,55:1) y la caché; Claude aplicó sus parches exactos al generador, al auditor (la excepción de filas de botones exige fila flex horizontal y solapamiento vertical) y a `SKILL.md`. Tras aplicarlos: 0 altos y 0 medios en 64 combinaciones (8 URLs EN/ES × 1600–320). El supuesto borde del video no aparece en el navegador real con el fondo plano. Sin segunda iteración: lo pendiente eran los parches del propio revisor, verificados.
- El commit base `2f5629d` incluyó cambios de móvil de blog/contacto (`20261024-mobile-blog`) hechos fuera de esta sesión el 24-oct que estaban sin commit.
