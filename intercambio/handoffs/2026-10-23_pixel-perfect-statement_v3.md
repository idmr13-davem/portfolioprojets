# Handoff: pixel-perfect-statement v3

## Objetivo
Tercera y última iteración (máximo del protocolo) de la revisión de la skill **Pixel Perfect** y de la alineación de `v3/statement/`. Mismo objetivo y restricciones que v1 y v2.

## Contexto y restricciones
- Revisiones anteriores: `intercambio/revisiones/2026-10-23_pixel-perfect-statement_v1_revision.md` y `..._v2_revision.md`.
- En tu sandbox, `.agents/` es de solo lectura: para el script y `SKILL.md`, **propón** los cambios con el parche exacto en la revisión; no intentes escribirlos.
- Sin commit, push ni despliegue. Sin cambios de copy, colores, tamaños tipográficos ni motion.

## Qué se hizo
**Script** (`.agents/skills/pixel-perfect/scripts/audit.mjs`):
- `inset` exige padding positivo en el lado coincidente, ese mismo lado del ancestro en la retícula y contención dentro del ancestro; un medio más ancho que una columna necesita ambos lados con inset.
- El centrado solo excusa elementos de texto (`h1–h6, p, li, dt, dd, blockquote, figcaption, output, span` y enlaces que no son botones); formularios, botones, contenedores y medios deben ocupar columnas.
- `clipped` revisa el eje vertical sin el límite de 3 em, en todos los ancestros que recortan.
- El hallazgo guarda el `top` del elemento (no del ancestro); el overlay incluye `strong`/`em` y filtra `excluded`.
- El comentario y `SKILL.md` describen la medición de tinta como estimación, no como contorno exacto, y piden confirmar en el overlay.

**Statement**:
- Ilustración de "en construcción" en columnas 1–6 (ancho completo en móvil).
- Móvil: la lista de casos comparte una sola columna de periodo para todas las filas (`subgrid`); en español el periodo quedaba 3,2 px desalineado entre filas.
- Cache busting: `?v=20261023-grid-v3` para `styles.css` y `app.js` (generador actualizado y HTML regenerados).

**Medición**:
- `.pixel-perfect/v3/`: 8 páginas × 1500/1440/1280/1024/768/390/360 en EN: **0 altos, 0 medios, 50 `inset` bajos**. Los cinco `inset` de 0 px que señalaste desaparecieron.
- `.pixel-perfect/v3-es/` y `v3-es-fix/`: Home, Menores y artículo en ES a 1440/768/390/360: 0 altos y 0 medios tras el arreglo del periodo.
- Estados abiertos a mano con Chrome headless:
  - Menú móvil a 390 px en EN y ES: todos sus elementos arrancan en el margen de 16 px, sin desborde.
  - Vista previa del ledger a 1440 px: ocupa exactamente las columnas 10–12 (1088–1412 px) y queda alineada con la fila activa.
- QA funcional de las tres propuestas a 1440 y 390 px: sin desbordes, imágenes rotas ni errores.

## Archivos a revisar
- `.agents/skills/pixel-perfect/scripts/audit.mjs` y `SKILL.md` (solo lectura para ti)
- `v3/statement/styles.css` (`.a-status__img`, bloque móvil del ledger)
- `v3/build-pages.mjs`
- Evidencia: `.pixel-perfect/v3/`, `.pixel-perfect/v3-es/`, `.pixel-perfect/v3-es-fix/`

## Cómo verificar
Igual que v2. Si Chrome no arranca, usa los `report.json` y las capturas, y reproduce la lógica de `measure` con tus fixtures sintéticos de v2 (inset de 0 px, inset por el lado opuesto, recorte vertical en panel alto, caja centrada no textual).

## Supuestos y limitaciones
- **Tu hallazgo 7 (alto), tamaño del hero móvil 17 → 16,4 vw:** se escaló a David como decisión de diseño; no se resuelve en esta iteración. Contexto: con 17 vw, "Montealegre" ya invadía el margen derecho en todo móvil (a 390 px termina en 389,8 px con margen de 16) y a 360 px desbordaba 1 px. Opciones planteadas: mantener 16,4 vw; ajustar la palabra al ancho de la retícula (`calc((100vw - 2 * var(--margin)) / 5.64)`); o volver a 17 vw aceptando que el nombre ocupe el margen.
- La medición de tinta sigue siendo una estimación por elemento.

## Respuesta a la revisión anterior
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1 `inset` oculta medios fuera de retícula | Aceptado | Padding positivo del mismo lado, lado del ancestro alineado, contención y ambos lados para medios anchos. Tus casos sintéticos dejan de clasificarse como `inset`. |
| 2 Ilustración de 640 px | Aceptado | Columnas 1–6; desaparecen los cinco `inset` de 0 px. |
| 3 Centrado para no-texto | Aceptado | Restringido a elementos de texto. |
| 4 Límite de 3 em en recorte vertical | Aceptado | Eliminado. Sin nuevos falsos positivos en las 56 combinaciones. |
| 5 `measureText` no es exacto | Aceptado | Documentado como estimación en el script y en `SKILL.md`; la skill pide confirmar en el overlay. |
| 6 Overlay no localiza recortes | Aceptado | `top` del elemento, `strong`/`em` en el selector y filtro `excluded`. |
| 7 Hero móvil 16,4 vw (alto) | Escalado a David | Es una decisión tipográfica fuera del alcance de alineación; queda en 16,4 vw hasta que David elija. |
| 8 `SKILL.md` describía el 0,06 em | Aceptado | Actualizado. |
| 9 Cache busting | Aceptado | Mantenido y subido a `grid-v3` por los cambios de esta iteración. |
