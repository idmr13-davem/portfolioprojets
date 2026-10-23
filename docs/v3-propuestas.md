# Propuestas V3 — exploración local

Fecha: 23 de octubre de 2026. Branch: `exploration/v3-propuestas` (local, sin push). Índice: `v3/index.html` (servir con `node server.js` y abrir `http://localhost:3456/v3/`).

## Alcance

Tres sitios completos e independientes, sin atarse al design system actual, construidos con Taste Skill (direcciones, inspector) e Impeccable (detector y crítica). Cada propuesta conserva:

1. Navegación: Home (wordmark), Casos de estudio, Blog y Contacto.
2. Pantallas: Error 404 y sitio en construcción (`articles/page-under-work.html`).
3. Traducción EN/ES con la misma lógica de producción: inglés por defecto, `?lang=` gana, luego `portfolio-language` en `localStorage`, que cada cambio actualiza.
4. Enlaces: email `idmr13@gmail.com`, LinkedIn, WhatsApp y ADPlist.
5. Hoja de vida en inglés y español (`assets/CV/DavidMontealegre-CV-EN.pdf`, `DavidMontealegre-HV-ES.pdf`).

## Estructura

- `v3/shared/content.js`: contenido bilingüe extraído del sitio publicado (`releases/github-pages`, 15-oct-2026): Home, tres casos públicos, dos artículos, 404 y en construcción. Switch no se incluye. Solo se completó la copia del enlace del hero ("Explore my case studies" / "Revisa mis casos de estudio"), que no se renderiza en la release.
- `v3/shared/site.js`: idioma, rutas de assets, revelado al hacer scroll, reproducción de videos solo visibles y helpers de marcado.
- `v3/shared/base.css`: base neutral adaptada de Taste Skill.
- `v3/build-pages.mjs`: genera los HTML de cada propuesta (`node v3/build-pages.mjs`).
- `v3/<propuesta>/app.js` y `styles.css`: composición, plantillas y estilos propios.

Las páginas se renderizan con JavaScript (exploración); un V3 real debería servir HTML estático por página para SEO.

## Direcciones (Taste Skill, sector personal-portfolio)

| Propuesta | Dirección | Tipo | Color | Idea | Elemento interactivo |
|---|---|---|---|---|---|
| A · Statement | Type and nothing else (seed 417002859) | Cabinet Grotesk | Oliva sobre hueso | Los resultados medidos de David son la tipografía display | Carrera 3:25 vs 0:52 del registro de Mercado Libre, a 10× |
| B · Stage | The split stage | Besley + Libre Franklin | Azul marino y rosa | Las pantallas que diseñó son el escenario fijo | El escenario reproduce el flujo del caso o sección en lectura |
| C · Poster | The pinned poster | Chivo | Carmín | "Monte / alegre" (montaña alegre) dividido a dos esquinas | Escala de Motion Level que anima según expresividad |

Referencias de calidad pedidas: apple.com/co (A), nu.com.co (B), tasteskill.dev (C).

## Verificación

- `inspect.mjs` de Taste Skill: 0 FAIL en Home y una página de caso de cada propuesta. Advertencias aceptadas: número de tamaños tipográficos; en B, menos imágenes visibles a la vez porque los videos se concentran en el escenario.
- QA funcional con Chrome headless a 1440 y 390 px en las 24 páginas: render completo, sin desbordamiento horizontal, sin imágenes rotas, sin errores de JavaScript, 4/4 enlaces de contacto y cambio de idioma con persistencia en `portfolio-language`.

## Pendiente

- Decidir qué dirección iterar para V3.
- Si se elige una: pasar a HTML estático, SEO por página, analítica con consentimiento y revisar las fuentes externas (Fontshare/Google Fonts).
