# Handoff: menores-codigo v5

## Objetivo
David pidió quitar la separación entre los componentes de pasos (Case step) del caso 3 y quitarles el color de fondo, según Figma `5093:1306` ("Section · A redesigned experience").

## Contexto y restricciones
- Lectura de Figma, solo consulta:
  - En los cuatro frames, `Steps` tiene gap 0.
  - Los Case step no tienen relleno en 1600, 1280 y 390. En 768 aún tienen fondo, pero David pidió quitarlo, así que se aplica en todas las resoluciones.
  - Cada paso conserva su padding M (24) y el gap de 8 entre título y texto.
  - La "Flow image" también se quitó en Figma, lo que confirma la eliminación de v4.
- Solo Menores. Los pasos de Motion en tablet y mobile, que conservan tarjetas, no cambian.
- Sin commit.

## Qué se hizo
- En el bloque "Menores only" de `v3/statement/styles.css`:
  - `.a-cs--menores .cs-steps { gap: 0; }`
  - `.a-cs--menores .cs-steps li { background: none; }`
- Caché de `styles.css`: `?v=20261026-menores-steps` en los 8 HTML de Statement y en el generador.

## Medidas EN (sección "A redesigned experience", Figma / código)

La tabla corresponde a inglés. En ES las alturas pueden variar por los saltos de línea; se comprueban los mismos criterios de fondo transparente, gap 0, padding 24 y ausencia de overflow.

| Viewport | Sección | Steps | Pasos |
|---|---|---|---|
| 1600×900 | 713 / 710.09 | 424 / 421.59 | 106 ×4 / 105.4 ×4 |
| 1280×800 | 700.2 / 697.78 | 452 / 450.09 | 106·134·106·106 / 105.4·133.9·105.4·105.4 |
| 768×1024 | 778 / 776.13 | 524 / 522.66 | 131 ×4 / 130.7 ×4 |
| 390×844 | 940 / 937.59 | 662 / 659.99 | 154·179·154·175 / 153.4·178.9·153.4·174.3 |

Fondo computado: transparente. Gap: 0. Sin overflow.

## Archivos a revisar
- `v3/statement/styles.css` (final)

## Cómo verificar
1. Menores en los cuatro viewports y en 360×800, EN/ES: compara con la tabla.
2. Motion en 768 y 390: sus tarjetas de pasos siguen con fondo y separación de 28.

## Supuestos y limitaciones
- **Pixel perfect:** sin fondo, el padding de 24 desplaza el texto de los pasos 24 px a la derecha del borde de la columna 4. Queda fuera de la línea del copy de arriba, en x 446 frente a 422 a 1600. Figma conserva ese padding, así que se mantiene. Es decisión de David si los pasos deben alinearse con el copy (padding horizontal 0).

## Preguntas para el revisor
1. ¿Recomiendas quitar el padding horizontal ahora que no hay tarjeta visible, o mantenerlo como en Figma?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Versión de caché de content.js (media) | Aceptado | Corrección de Codex conservada en las 24 páginas y en el generador. |
| 2. Altura orientativa de 826 px (baja) | Aceptado | Era una medida con otro viewport efectivo. Las cifras de este handoff se midieron con emulación exacta. |
