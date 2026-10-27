# CLAUDE.md

Guía operativa para Claude Code en el portafolio de David Montealegre (davidmontealegreux.com).
La memoria histórica completa del proyecto vive en `AGENTS.md` y se importa abajo; este archivo resume lo que hay que saber antes de tocar código. Si algo de aquí contradice una nota más reciente de `AGENTS.md`, gana la nota más reciente.

@AGENTS.md

## Qué es

Portafolio personal de diseño de producto dirigido a reclutadores, hiring managers y líderes de diseño (tecnología y automotriz). Inglés por defecto, español disponible. Ver `PRODUCT.md` (propósito y principios) y `DESIGN.md` (sistema visual extraído de Figma).

## Stack y ejecución

- HTML, CSS y JavaScript planos. Sin build, sin framework, sin dependencias npm. No introducir frameworks de forma preventiva (ver `docs/architecture-and-growth.md`).
- Servidor local: `node server.js` (127.0.0.1:3456, soporta range requests para video) o `./serve.sh` (python http.server en 3456).
- Hosting: GitHub Pages desde `main` en `idmr13-davem/portfolioprojets`, dominio `davidmontealegreux.com` (`CNAME`, `.nojekyll`).

## Mapa del repositorio

- `index.html`, `about.html`, `404.html`, `components.html` — páginas raíz.
- `work/` — casos: `registro-ml.html`, `motion-design-system.html`, `menores-mexico.html`, `cambio-cuentas-paises.html` (Switch).
- `articles/` — artículos editoriales y `page-under-work.html`.
- `css/styles.css` (globales), `css/tokens/figma.css` (tokens canónicos), `css/components.css` (controles compartidos), `css/case-study.css`, `css/article.css`, `css/about.css`, y hojas V2 por página (`home-v2*.css`, `registro-v2*.css`, `motion-v2*.css`, `menores-v2*.css`, `country-v2*.css`, `status-v2*.css`, …).
- `js/main.js` (interacciones compartidas, footer), `js/i18n.js` (traducciones EN/ES), controladores V2 por página, `js/analytics.js`.
- `docs/` — revisiones V2 por página, analítica, release, arquitectura. Leer el doc de la página antes de modificarla.
- `scripts/prepare-github-pages.py` — genera la entrega estática en `releases/github-pages/` (+ ZIP). `releases/` está fuera de Git.
- `variants/` — composiciones alternativas locales de la Home.
- Continuidad extendida fuera de este repo: `/Users/dave/Documents/Personal/david-portfolio-project/`.

## Reglas de trabajo

- **Alcance de publicación V3 (27-oct-2026):** David autorizó publicar *Switching accounts across countries* en la V3. Los cuatro casos (Registro ML, Motion Level, Menores, Switch) y los proyectos paralelos Ropstar y Winefast son públicos en la release V3 Statement, sujetos a validación de contenido. Los archivos de Switch de la V2 siguen locales. Plan: `docs/v3-release-plan.md`. (El alcance V2 del 14-oct, con Switch excluido, solo rige para la release V2.)
- **Contenido y cifras:** copiar títulos, roles y resultados numéricos exactamente desde Figma/fuente aprobada, en HTML y en ambas traducciones. Nunca inventar ni extrapolar métricas; no presentar resultados finales de producción para Menores.
- **Sistema de diseño:** usar tokens semánticos alineados con Figma (fuente de verdad), tipografía Inter, breakpoints existentes (mobile ≤767, tablet 768–1023/1024, desktop, ≥1500 escala grande). No hardcodear valores que ya existen como token.
- **CSS:** reglas compartidas en el archivo compartido; reglas de un solo caso siempre bajo su clase de página (`.case-study-…`). No dividir hojas por número de líneas.
- **i18n:** todo texto visible nuevo necesita entrada EN y ES en `js/i18n.js` (o en la configuración bilingüe de la página V2).
- **Cache busting:** al cambiar `styles.css`, `main.js` u otra hoja/script compartido, actualizar el `?v=` en todos los HTML que lo consumen.
- **Motion y accesibilidad:** animar solo `transform` y `opacity`, transiciones ≤500 ms, respetar `prefers-reduced-motion`, foco visible y navegación por teclado.
- **Analítica:** sin identificación de personas; respetar consentimiento. En la copia de trabajo `js/analytics.js` no mide interiores de caso; el script de release añade las rutas de los tres casos públicos. Mantener ambos lados coherentes al cambiar el alcance.
- **Validación:** comprobar en navegador Desktop, Tablet y Mobile (mínimo 360/390, 768, 1280 y ≥1500): sin overflow horizontal ni errores de consola.

## Git y publicación

- Rama de trabajo actual: `codex/home-v2-review`. `main` es la rama publicada. La rama `Menores` es un punto de recuperación histórico.
- No hacer commit, push ni despliegue sin pedido explícito de David. Videos locales (`assets/Videos/`), posters y evidencias privadas no se versionan.
- La publicación se hace con el árbol generado por `scripts/prepare-github-pages.py`, no copiando la carpeta de trabajo completa.
- Registrar decisiones nuevas y duraderas como nota fechada en `AGENTS.md`.
