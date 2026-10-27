# Handoff: figma-caso2-motion v1

## Objetivo
Diagramar en Figma el caso de estudio 2 (Motion design system - Motion Level) en 1600, 1280, 768 y 390. Usar auto layout, tokens, grilla de 12 columnas y componentes (skill `figma-senior-build`), con alineación a la grilla (skill `pixel-perfect`).

## Contexto y restricciones
- El trabajo es solo en Figma, en la sección "Caso estudio 2" (`5076:1275`). No se cambió código del sitio.
- Se aplicó la plantilla de caso que David aprobó en el caso 1: título en 3 columnas y contenido en 9; Final outcomes con viñetas y fondo `Background/Deep`. Los bloques propios de Motion siguen la estructura del código.
- No hacer commit ni push (CLAUDE.md).

## Qué se hizo
Ver `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md`: plantilla, bloque por bloque en cada breakpoint, tokens nuevos, componentes y la corrección global del logo del Header.

## Archivos a revisar
- `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md`
- `intercambio/evidencia/2026-10-25_figma-caso2/figma-1600.png`, `figma-1280.png`, `figma-768.png`, `figma-390.png`
- `intercambio/evidencia/2026-10-25_figma-caso2/browser-1280.png`, `browser-768.png`: la página real como referencia.
- Contexto: `v3/statement/styles.css`, `v3/shared/content.js` (sección `motion`) y `.claude/skills/pixel-perfect/references/checklist.md`.

## Cómo verificar
1. Comprueba con los tokens que cada bloque ocupe columnas completas. Columna = (W − 2·margin − 11·gutter) / 12, con margin/gutter 16/16 (390 y 768), 25.6/25.6 (1280) y 28/32 (1600).
2. Compara los renders de Figma con los del navegador:
   - que no falte contenido,
   - que las captions estén completas,
   - el orden de los bloques,
   - el ritmo vertical,
   - la jerarquía tipográfica.
3. Revisa contra el checklist de pixel-perfect: grilla, consistencia entre bloques repetidos, información repetida y jerarquía.

## Supuestos y limitaciones
- Codex no tiene acceso a Figma. Cualquier corrección se aplicará desde Claude: propónla con frame, bloque y valor.
- El layout desktop difiere del código del sitio a propósito, porque sigue la plantilla del caso 1. El código todavía tiene el layout anterior (título en 5 columnas y contenido desde la columna 7).
- El frame de 390 lo está editando David en paralelo (muestras en 2 columnas). Revisa el render como estado previo y no propongas cambios que choquen con esa edición.
- En el código, el párrafo y los videos de "What do we mean by expressivity?" no tienen separación. En Figma se usó el gap SS (12 px) por ritmo vertical.

## Preguntas para el revisor
1. ¿Algún bloque fuera de la grilla, o algún par de bordes casi alineados (a 2–8 px)?
2. ¿La adaptación de los bloques propios de Motion (hero videos, muestras, ejes, expresividad) a la plantilla de 3 + 9 columnas es coherente con el caso 1?
3. ¿Falta contenido de la página real en los frames, o hay algún texto o caption incompleto?
