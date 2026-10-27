# Handoff: figma-footer-componente v1

## Objetivo
Convertir el Footer en un componente con una variante por breakpoint y reemplazar las 20 copias por instancias sin cambiar medidas, como pidió David tras la revisión `2026-10-26_figma-footer_v1_revision.md` (hallazgo 2).

## Contexto y restricciones
- Solo Figma. No se tocó código del sitio. Otra sesión edita `v3/`; no lo modifiques.
- No hacer commit ni push (CLAUDE.md).

## Qué se hizo
Ver `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md`.

## Archivos a revisar
- `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md`
- `intercambio/evidencia/2026-10-26_figma-footer-componente/footer-variantes.png`, `footer-instancia-home-1280.png`
- `intercambio/evidencia/2026-10-26_figma-footer/estructura.md` y `figma-footers.csv` (estado previo de 768 y 390)
- `AGENTS.md` (estándar de componentes de Figma, nota del 2026-10-25)

## Cómo verificar
1. Comprueba en la tabla que ninguna altura de Footer ni de frame cambió.
2. Compara las medidas de 768 y 390 con `figma-footers.csv` (alturas, offsets del wordmark).
3. Revisa que el componente cumpla el estándar de AGENTS.md: variantes por breakpoint, propiedades TEXT, instancias anidadas y tokens.

## Supuestos y limitaciones
- Verificación de Codex (2026-10-26): la sesión de Figma se creó, pero la lectura nativa con `use_figma` fue rechazada: «MCP tool call requires approval, but approval policy is never». Las propiedades nativas quedan sin certificar; las propuestas deben indicar nodo y valor cuando se conozcan.
- Cada variante fija su propio modo de variables para que Device seleccione explícitamente el breakpoint. Heredar el modo del frame es otra estrategia compatible también con cuatro variantes; la herencia no determina por sí sola cuántas estructuras necesita el componente. La elección actual es coherente si se conserva la correspondencia entre Device y los modos de ambas colecciones.

## Preguntas para el revisor
1. ¿Falta alguna propiedad o variante que haga falta para mantener el Footer?
2. ¿La decisión de fijar el modo por variante es correcta frente a heredar el modo del frame?
