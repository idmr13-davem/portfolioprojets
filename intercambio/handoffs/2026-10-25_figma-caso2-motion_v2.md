# Handoff: figma-caso2-motion v2

## Objetivo
El mismo de v1: diagramar el caso 2 (Motion Level) en Figma en 1600, 1280, 768 y 390 con auto layout, tokens, grilla y componentes. Esta versión responde a la revisión v1.

## Contexto y restricciones
Las mismas de v1 (`intercambio/handoffs/2026-10-25_figma-caso2-motion_v1.md`). El frame de 390 sigue editado por David: ahora tiene las muestras en 2 columnas. No hay commit.

## Qué se hizo
- Exporté el render actual completo del frame de 390 a 1×: `intercambio/evidencia/2026-10-25_figma-caso2/figma-390-actual.png` (390×14419, desde Header hasta Footer).
- Comprobé la estructura del frame de 390 leyéndola en Figma:
  - orden de las secciones: Hero → Visual → Objectives and outcomes → Body → Final outcomes → Case navigation → Footer, con el Header como superposición;
  - Final outcomes tiene 2 ítems;
  - el frame raíz es Hug en vertical y Fixed en horizontal;
  - el título del hero quedó en 2 líneas: "Motion design system" (1) y "- Motion Level" (1).
- Agregué un inventario por nodo: `intercambio/evidencia/2026-10-25_figma-caso2/inventario-grilla.csv`.
  - Cubre 122 bloques (instancias, rectángulos y frames con relleno, sin Header, Footer ni el interior del panel de ejes).
  - Para cada uno da x, ancho, columna inicial y final, desviación de cada borde y sizing o variable enlazada.
  - La desviación máxima es 0.03 px (redondeo subpíxel).

## Archivos a revisar
- `intercambio/evidencia/2026-10-25_figma-caso2/inventario-grilla.csv`
- `intercambio/evidencia/2026-10-25_figma-caso2/figma-390-actual.png`
- `v3/statement/styles.css:154`: la regla `.a-cs__visual img, .a-cs__visual video { max-height: 88svh }`.
- Lo de v1.

## Cómo verificar
1. En el CSV, confirma que `dev_left` y `dev_right` sean ≤ 0.05 en todas las filas.
2. En `figma-390-actual.png`, confirma que el cierre esté completo: dos resultados, navegación y footer.
3. En el CSS, confirma que el alto de los videos del hero en 1600 lo limita `max-height: 88svh`: con un viewport de 900 px de alto, 0.88 × 900 = 792.

## Supuestos y limitaciones
- El hero de 1600 no es 9:16 puro porque el sitio lo limita a 88svh. Figma reproduce ese alto (792.44) para coincidir con la página real. Con otro alto de viewport cambiaría.
- Las muestras de 390 en 2 columnas son edición de David. No se tocaron.

## Preguntas para el revisor
1. ¿Queda abierto algún punto de v1 con esta evidencia?
2. ¿Ves algo nuevo en el render mobile actual?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Hero de 1600 fuera de 9:16 (media) | Rechazado | El sitio limita el alto con `max-height: 88svh` (`v3/statement/styles.css:154`). En la página real medida a 1600×900, los videos miden 493×792 (`.a-cs__heroset video`), igual que el token 792.44. Llevarlo a 877 haría que Figma ya no coincida con el sitio. En 1280, 698.03 corresponde a la medición del navegador (el límite de 88svh sería 704, mayor que el 9:16, así que allí manda el 9:16 con redondeo del navegador). |
| 2. Evidencia de 390 incompleta (alta) | Aceptado | Render completo nuevo a 1× (`figma-390-actual.png`, 390×14419) y estructura comprobada en Figma: Final outcomes con 2 ítems, navegación y footer presentes, raíz en Hug. |
| 3. Descripción del título mobile contradictoria (baja) | Aceptado | El render anterior era previo al ajuste. El render actual muestra "Motion design system" en 1 línea y "- Motion Level" en 1 línea, como en el navegador. |
| 4. "0 hallazgos" no reproducible (baja) | Aceptado | Inventario por nodo en `inventario-grilla.csv`, con columnas inicial y final y desviaciones (máximo 0.03 px). |
