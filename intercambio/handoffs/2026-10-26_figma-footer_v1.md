# Handoff: figma-footer v1

## Objetivo
Reconciliar con el navegador el Footer de 768 y 390 en todos los frames de Figma (Home, casos 1–3 y Blog 1), como pidió David.

## Contexto y restricciones
- El trabajo es solo en Figma. No se cambió código del sitio. Otra sesión está editando `v3/` en paralelo; no lo toques.
- Los Footer son frames clonados en cada página (no componente), por eso se corrigieron las 10 copias.
- No hacer commit ni push (CLAUDE.md).

## Qué se hizo
Ver `intercambio/evidencia/2026-10-26_figma-footer/estructura.md`: las 4 diferencias, el cambio aplicado a cada una con su token y el resultado medido.

## Archivos a revisar
- `intercambio/evidencia/2026-10-26_figma-footer/estructura.md`
- `intercambio/evidencia/2026-10-26_figma-footer/browser-footer-768.json`, `browser-footer-390.json` (medición del navegador, coordenadas relativas al footer)
- `intercambio/evidencia/2026-10-26_figma-footer/figma-footer-768.png`, `figma-footer-390.png`, `browser-home-768.png`, `browser-home-390.png`
- `v3/statement/styles.css` (`.a-foot*`, líneas 137–143, 263–266, 325–329, 363–381)

## Cómo verificar
1. Contrasta cada valor de la tabla de diferencias con el CSS y con los JSON del navegador: padding superior 8rem / 5rem, gap de botones `--space-l` en ambos ejes, `.a-foot__buttons { gap: .75rem }` y `.a-btn { width: auto }` en ≤767, margen del legal 3rem, padding inferior del legal .75rem.
2. Comprueba que las alturas resultantes (473 y 554) cuadran con la suma de bloques del navegador (472.2 y 552.5).
3. Compara los renders de Figma con el footer del navegador (bloque final de los PNG de página completa).

## Supuestos y limitaciones
- Codex no tiene acceso a Figma: propón correcciones con frame, nodo y valor.
- Los renders de Figma son solo del Footer de Home; los otros 8 Footer tienen la misma estructura y dieron las mismas alturas al leerlos en Figma.

## Preguntas para el revisor
1. ¿Queda alguna diferencia del footer de 768 o 390 sin reconciliar (wordmark, legal, tipografía)?
2. ¿Los tokens elegidos (L 32, SS 12, `footer-top`) corresponden a los del CSS?
