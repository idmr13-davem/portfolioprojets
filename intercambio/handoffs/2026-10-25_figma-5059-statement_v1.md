# Handoff: figma-5059-statement v1

## Objetivo
Revisar que la propuesta V3 "Statement" (`v3/statement/`) implemente fielmente la actualización de Figma **Home · Desktop XL · 1600** (archivo `Nodyl6xcEeEwbhi0OBGFnB`, nodo `5059:155`; caso `5059:183`), siguiendo la skill **Pixel Perfect** (`.agents/skills/pixel-perfect/`, con `references/checklist.md`).

## Contexto y restricciones
- Branch local `exploration/v3-propuestas`. Sin commit, push ni despliegue.
- Leer `CLAUDE.md`, `AGENTS.md`, `docs/protocolo-de-revision.md`, `docs/decisiones.md` y la skill.
- `.agents/` es de solo lectura en tu sandbox: propón ahí los parches con el diff exacto.
- Fuera de alcance: los archivos `intercambio/*figma-caso1-responsive*` e `intercambio/evidencia/` son de otra tarea; no los toques ni los evalúes.
- Retícula: 12 columnas; margen 28 px y gutter 32 px a 1600 (`--margin` y `--gutter` en `v3/shared/base.css`).

## Referencia de Figma (variables a 1600 px)
- Heading 88/83,6 Bold, −3,08; Case title 48/48; Impact 30,4/38 Light; Body y About 19 Light (About con interlineado 30,4); Button 19/28,5 Bold.
- Row title 19/22,8 Bold; Row meta 15/22,5 Light; Prompt 28/33,6 Regular; Input 17/25,5 Light.
- Footer line 80/76 Bold, −3,2; Footer name 400/320 Bold, −24, color `Brand logo/Main-25pct`.
- Espaciado:
  - `content-inset` 290,67 (columnas 3–10); `section` 220; `section-half` 110; Mega 120; L 32; XL 40.
  - `case/media` 887,33 × 665,48 (7 columnas, 4:3); `copy-width` 493,34 (4 columnas).
  - `case/summary-gap` 37,1 y `case/role-gap` 32,6.
  - `blog/thumbnail` y `blog/meta-width` 99,33 (1 columna); `contact-top` 198; `footer-top` 128.
- Capturas de Figma por sección: `.pixel-perfect/figma-ref/{hero,facts,case,blog,contact,footer,header}.png`.

## Qué se hizo
1. **Sobre mí (5061:424)**:
   - Titular `h2` en columnas 3–10 con `--step-head`. Texto EN de Figma "Beyond design, my interests include:"; en ES, traducción propia "Además del diseño, mis intereses incluyen:", pendiente de validar por David.
   - Intereses como lista en minúscula en columnas 3–6, con "and"/"y" antes del último.
   - Cierre y enlace a la hoja de vida en columnas 7–10, en `--text-accent-primary` subrayado. Padding vertical `--space-mega` y separación `--space-l`.
   - Se omite la primera oración del contenido ("I'm a graphic and product designer…"), como en Figma, porque repite las cifras.
2. **Blog**: columnas 3–10; filas en `subgrid` con miniatura en 1 columna, texto en 6 y tiempo de lectura en 1. Padding vertical de media sección.
3. **Contacto**: columnas 3–10; frase, campo y nota en una línea. Se eliminó la lista de datos de contacto.
4. **Pie de página**:
   - Alto según Figma (sin 100svh), padding superior de 8rem.
   - "Could we work together?" con los cuatro canales (email, LinkedIn, WhatsApp, ADPlist) como botones `.a-btn--dark` con separación `--space-l`.
   - Fila legal y "Montealegre" absoluto detrás (25vw, `--brand-logo-main-25pct`). Se eliminó la columna de enlaces.
5. **Casos**: margen extra antes de la descripción (37,1 px) y del rol (32,6 px). Contenedor del video plano `--surface-main` con `--radius-xl`, sin velo, anillo, degradado ni zoom en hover (pedido explícito de David). Se mantiene `mix-blend-mode: lighten`, porque los pósters traen incorporado el fondo oscuro de la V2.
6. **Header**: se mantiene el logo productivo, aunque el header de Figma no lo muestra, porque David lo pidió antes.
7. **Skill Pixel Perfect**: en una fila de botones solo se mide el primero contra la retícula; el borde derecho de los botones no entra en `near-miss`. Están actualizados `SKILL.md` y `audit.mjs`.
8. Cache busting `?v=20261025-figma-5059c`.

## Archivos a revisar
- `v3/statement/styles.css` (bloque final "Figma update: Home · Desktop XL" y "Case media as in Figma")
- `v3/statement/app.js` (`home()`, `footer()`, `copy.aboutHeading`)
- `v3/build-pages.mjs`
- `.agents/skills/pixel-perfect/scripts/audit.mjs`, `SKILL.md`
- Evidencia:
  - `.pixel-perfect/figma-5059/`: 9 URLs EN/ES × 1600/1440/1024/900/768/390/320. Resultado: **0 altos, 0 medios, 32 `inset` bajos**.
  - `.pixel-perfect/figma-ref/`: Figma frente a implementación; `mine-*-1600-en.jpg` y `mine-*-390-es.jpg`.

## Cómo verificar
1. `node --check` de `v3/statement/app.js`, `v3/build-pages.mjs` y `audit.mjs`.
2. Comparar cada `mine-*-1600-en.jpg` con su captura de Figma y calcular posiciones de columnas desde el CSS: a 1600, columna = (1600 − 56 − 352) / 12 = 99,33; inicio de columna n = 28 + (n − 1) × 131,33.
3. Si el sandbox lo permite: `node server.js` y la auditoría de `SKILL.md`. Si no, `report.json`.
4. Revisar el footer a 768–1023 y en móvil (botones que se envuelven, nombre detrás) y el contraste de `.a-btn--dark` (texto `--text-primary` sobre `--text-inverse`).

## Supuestos y limitaciones
- Figma solo define Desktop XL (1600); tablet y móvil son adaptación propia siguiendo la checklist.
- Chrome sin interfaz no compone el `mix-blend-mode` del video; en el navegador real se verificó un fondo #0a2323 con radio de 40 px.
- La hoja de vida solo queda en el enlace de "Sobre mí", en el idioma activo.

## Preguntas para el revisor
1. ¿Alguna diferencia de tamaño, espaciado o columna frente a Figma que la medición no capture?
2. ¿La regla de grupos de botones del script es correcta y no oculta desalineaciones reales (por ejemplo, botones apilados en móvil)?
3. ¿Accesibilidad del pie: orden de lectura, nombre gigante `aria-hidden`, foco visible en los botones oscuros?
