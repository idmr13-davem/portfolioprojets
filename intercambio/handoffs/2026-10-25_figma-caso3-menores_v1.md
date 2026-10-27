# Handoff: figma-caso3-menores v1

## Objetivo
Diagramar en Figma el caso de estudio 3 (Accounts for minors in Mexico) en 1600, 1280, 768 y 390. Usar auto layout, tokens, grilla de 12 columnas y componentes (skill `figma-senior-build`), con alineación a la grilla (skill `pixel-perfect`).

## Contexto y restricciones
- El trabajo es solo en Figma, en la sección "Caso estudio 3" (`5076:2434`). No se cambió código del sitio.
- Los frames parten de los del caso 1 y aplican la plantilla que David aprobó: título en 3 columnas y contenido en 9 en desktop; Final outcome con viñetas y fondo `Background/Deep`.
- Cifras y textos copiados de `v3/shared/content.js` (caso `menores`), sin cambios. La nota "Active project…" se mantiene porque los resultados son expectativas de lanzamiento (CLAUDE.md: no presentar resultados finales de producción para Menores).
- No hacer commit ni push (CLAUDE.md).

## Qué se hizo
Ver `intercambio/evidencia/2026-10-25_figma-caso3/estructura.md`: bloques por breakpoint, tokens nuevos, componentes nuevos (`Case step`, variante `Video figure` Format=Journey), verificación y diferencias conocidas.

## Archivos a revisar
- `intercambio/evidencia/2026-10-25_figma-caso3/estructura.md`
- `intercambio/evidencia/2026-10-25_figma-caso3/inventario-grilla.csv`: 57 bloques por frame con columnas y desviaciones.
- `intercambio/evidencia/2026-10-25_figma-caso3/figma-1600.png`, `figma-1280.png`, `figma-768.png`, `figma-390.png` (renders reducidos, completos).
- `intercambio/evidencia/2026-10-25_figma-caso3/browser-1600.png`, `browser-1280.png`, `browser-768.png`, `browser-390.png` (página real a 1×).
- Fuentes: `v3/shared/content.js` (líneas 1274–1600), `v3/shared/site.js` (`caseSection`, `figure`), `v3/statement/styles.css` (líneas 146–198 y media queries), `.claude/skills/pixel-perfect/references/checklist.md`.

## Cómo verificar
1. En el CSV, recalcula los bordes desde `x` y `width`: `dev_left` debe ser ≤ 0.05 en todas las filas; `dev_right` también, excepto en los 21 textos con `alignment=left`, alineados por su borde izquierdo según el criterio de los casos 1 y 2. Las desviaciones derechas exentas se conservan con su valor real. Columna = (W − 2·margin − 11·gutter) / 12, con margin/gutter 16/16 (390 y 768), 25.6/25.6 (1280) y 28/32 (1600). Corrección documental de Codex: ejecutar `python3 intercambio/evidencia/2026-10-25_figma-caso3/verificar-grilla.py`; resultado en `verificacion-grilla.json`.
2. Compara los renders de Figma con los del navegador:
   - que no falte contenido (5 secciones, 4 pasos, 4 videos con caption y nota, cierre con 2 resultados y nota);
   - que el texto coincida con `content.js`;
   - el orden de los bloques y la jerarquía tipográfica.
3. Comprueba que los tokens nuevos de `estructura.md` coinciden con el CSS: `journey-video-height` (80svh / relación del video), `flow-image-height` (en 1600, 80svh = 720), `copy-block-gap` (1.25rem), `Step title` (1.375rem, line-height .95, −0.035em).
4. Revisa contra el checklist de pixel-perfect: grilla, consistencia con los casos 1 y 2, información repetida y jerarquía.

## Supuestos y limitaciones
- Codex no tiene acceso a Figma. Cualquier corrección se aplicará desde Claude: propónla con frame, bloque y valor.
- Desktop difiere del navegador a propósito por la plantilla 3 + 9; el código aún pone el contenido desde la columna 7.
- Diferencias conocidas (detalle en `estructura.md`): la fila vacía de 40 px del código en Journey (tablet/mobile) no se reproduce; las listas no tienen el límite de 52ch del navegador, igual que en los casos 1 y 2; en 390 hay dos textos con una línea más por el ancho de Inter en Figma.
- Los videos se representan con su poster y el botón Play, en FIT dentro del alto medido (el navegador usa `object-fit: contain`).
- En el navegador, el botón Play de los videos del recorrido se superpone a la caption y la nota (está posicionado al pie de la figura). Figma lo deja dentro del video, como en los casos 1 y 2.

## Preguntas para el revisor
1. ¿Algún bloque fuera de la grilla, o algún par de bordes casi alineados (a 2–8 px)?
2. ¿Falta contenido de la página real, o hay algún texto, cifra o caption distinto de `content.js`?
3. ¿Los componentes y tokens nuevos son coherentes con el sistema de los casos 1 y 2, o sobra alguno?
4. ¿El límite de 52ch de las listas debería reproducirse en tablet, aunque los casos 1 y 2 no lo hagan?
