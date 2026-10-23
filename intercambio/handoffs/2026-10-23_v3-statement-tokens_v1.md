# Handoff: v3-statement-tokens v1

## Objetivo
Revisar los detalles de diseño de la propuesta V3 "Statement" (`v3/statement/`) después de aplicar los tokens del design system del portafolio (`css/tokens/figma.css`, tema oscuro por defecto). Pedido de David: aplicar los tokens del DS **excepto los tamaños tipográficos**, que deben conservar la jerarquía de la propuesta; foco principal en reemplazar el color por la paleta ya definida.

## Contexto y restricciones
- Branch local `exploration/v3-propuestas`. Exploración: no se publica, no hacer commit, push ni despliegue.
- Leer `CLAUDE.md` y `AGENTS.md` (reglas del proyecto) y `docs/v3-propuestas.md` (alcance de V3).
- La propuesta se renderiza con JS: `v3/statement/app.js` arma cada página desde `v3/shared/content.js` (contenido bilingüe publicado; no modificar copy). `v3/shared/site.js` y `v3/shared/base.css` son compartidos por las tres propuestas: si se tocan, no romper `v3/stage/` ni `v3/poster/`.
- Inter es obligatoria (familia del DS); un detector que marque "overused font" no es un hallazgo.
- No cambiar `font-size`, `line-height` ni `letter-spacing` de la propuesta (son la jerarquía que David quiere conservar).

## Qué se hizo
- `v3/build-pages.mjs`: Statement carga Inter (300/400/700) y `css/tokens/figma.css`; se regeneraron los HTML.
- `v3/statement/styles.css`: roles de color mapeados a tokens del DS:
  - `--bg` → `--background-primary`; `--surface` → `--background-deep`; `--input` → `--background-secondary`
  - `--ink` → `--text-primary`; `--muted` → `--text-secondary`
  - `--accent` / hover / press → `--interactive-primary-idle` / `-hover` / `-clic`; `--accent-ink` → `--text-static-inverse`
  - `--field` (bandas: cifras, blog, resultados del caso, eje de Motion Level) → `--surface-main`
  - `--inverse` / `--inverse-ink` (footer) → `--surface-inverse` / `--text-inverse`
  - `--highlight` (resaltados del About, barras de la carrera) → `--surface-accent`
  - Pesos 800 → 700 (títulos Inter Bold) y 500 → 400; body con `--body-l-font-weight` (300).
  - Radios de botones y campo → `--radius-xs`.
- Eliminados todos los hex sueltos de `v3/statement/styles.css`.
- Commit base de comparación: `e2f4fa6`.

## Archivos a revisar
- `v3/statement/styles.css` (principal)
- `v3/statement/app.js` (plantillas y clases)
- `v3/build-pages.mjs` (carga de fuentes y tokens)
- `css/tokens/figma.css` (solo lectura: fuente de verdad)
- `v3/shared/base.css` (solo si un problema viene de ahí)

## Cómo verificar
1. Servidor local ya activo en `http://127.0.0.1:3456` (si no responde: `node server.js` en segundo plano).
2. Páginas: `/v3/statement/index.html`, `/v3/statement/work/registro-ml.html`, `/v3/statement/work/motion-design-system.html`, `/v3/statement/work/menores-mexico.html`, `/v3/statement/articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html`, `/v3/statement/404.html`, `/v3/statement/articles/page-under-work.html`; probar también con `?lang=es`.
3. Inspector visual (1440/768/390, capturas en `.taste-skill/inspect/`):
   `node .agents/skills/taste-skill/scripts/inspect.mjs http://127.0.0.1:3456/v3/statement/index.html`
4. Detector de contraste/antipatrones:
   `.claude/skills/impeccable/scripts/impeccable detect http://127.0.0.1:3456/v3/statement/index.html http://127.0.0.1:3456/v3/statement/work/motion-design-system.html`
5. Comprobar con `grep -nE "#[0-9a-fA-F]{3,6}\b|rgba?\(" v3/statement/styles.css` que no quedan colores fuera de tokens.

## Supuestos y limitaciones
- Se usó el tema oscuro (por defecto en `figma.css`) porque es el que usa el sitio publicado; el tema `[data-theme="light"]` no se activa.
- `--surface-accent` (turquesa) se usa en acción, resaltados del About y barras de la carrera: es el acento en más de un lugar a propósito; decidir si es excesivo.
- El footer invertido (`--surface-inverse`) es la única superficie clara.
- Avisos conocidos y aceptados del inspector: número de tamaños tipográficos y dos statements de 4 líneas a 1440px (tamaños fuera de alcance). El detector marca un `mark` que "desborda" en el About: es un resaltado inline partido entre las dos columnas CSS.

## Preguntas para el revisor
1. ¿Algún uso de token es semánticamente incorrecto (p. ej. `--text-static-inverse` vs `--text-inverse`, `--background-deep` vs `--surface-main`)?
2. ¿Contraste AA en todos los pares texto/fondo, incluidos estados hover, foco, `aria-pressed` del selector de idioma, placeholder y footer claro?
3. ¿Quedan detalles visuales rotos o inconsistentes tras el cambio a fondo oscuro (bordes de video, posters, chips, menú móvil)?
