# Plan de release V3 (Statement)

Fecha: 27 de octubre de 2026. Rama de trabajo: `exploration/v3-propuestas`. Nada de este plan se ha ejecutado salvo lo marcado como hecho.

## Alcance autorizado

David autorizó el 27-oct-2026 publicar Switch en la V3. La release V3 publica:

- Home, 404 y página en construcción.
- Casos: Registro ML, Motion Level, Accounts for minors in Mexico y Switching accounts across countries.
- Proyectos paralelos: Ropstar y Winefast.
- Artículos: Mercado Libre y autos.

Solo se publica la propuesta **Statement**; `v3/stage/` y `v3/poster/` quedan como exploración local. Los archivos de Switch de la V2 (`work/cambio-cuentas-paises.html`, `js/country-v2*`, `css/country-v2*`, `assets/Country switch/`) no se usan y siguen fuera de Git.

Hecho: alcance en `AGENTS.md` y `CLAUDE.md`; `.gitignore` deja entrar los 14 medios de Switch que usa la V3 (7 imágenes de `assets/Switch países/v3/`, 5 grabaciones de `assets/Videos/Switch/`, `Switch entre países.mov` y `home-v2-poster-4.png`). Los PNG fuente (`Img hero.png`) siguen ignorados.

## Qué entra en la release

Lo genera `python3 scripts/prepare-github-pages-v3.py` en `releases/github-pages-v3/` (+ `releases/portfolio-v3-github-pages.zip`). Primera generación, 27-oct-2026: **173 archivos, 38 MB**.

| Grupo | Origen |
|---|---|
| 12 páginas HTML en la raíz | `node v3/build-pages.mjs --release <dir>`: 11 páginas de Statement + `about.html` |
| Renderizador | `v3/shared/base.css`, `content.js`, `site.js`, `v3/statement/app.js`, `styles.css` (servidos desde `/v3/`) |
| Dependencias de raíz | `css/tokens/figma.css`, `css/analytics.css`, `js/analytics.js` (transformado), `assets/Favicon/favicon.ico`, `CNAME`, `robots.txt`, `.nojekyll` y `sitemap.xml` (generados) |
| Assets | Solo los que referencian el renderizador y las páginas, incluidas las 9 imágenes de `assets/og/` |

El script falla si falta un archivo, si entra un `.mov` o un `Img hero.png`, o si algo viene de `intercambio/`, `releases/`, `docs/`, `variants/`, `plantillas/`, `research/`, carpetas ocultas, `v3/stage/` o `v3/poster/`.

## Pasos

### 1. Contenido de Switch
- Revisar que el texto de `cases.switch` en `v3/shared/content.js` (EN y ES) y sus cifras coincidan con Figma y la fuente aprobada, sin cifras inventadas ni extrapoladas.
- Revisar en el navegador el orden del caso en la Home (`home`) y en el ciclo de "siguiente caso".

### 2. Videos a MP4 optimizado
Los `.mov` ya están en H.264. Pasarlos a `.mp4` sin recomprimir no cambia el peso. `avconvert` de macOS tampoco sirve: probado con `MenoresMLM.mov`, con los presets 1920x1080, HEVC 1920x1080 y 1280x720 salió igual o más pesado (13,0–14,0 MB contra 13,1 MB). Hace falta `ffmpeg`, que no está instalado (`brew install ffmpeg`).

Hecho el 27-oct-2026 (pendiente de aprobación visual de David): `ffmpeg` 9.0.2 instalado con Homebrew. Los 25 videos de la V3 (todos los `.mov` y los `.mp4` de más de 1 MB) tienen un `nombre.web.mp4` junto al original. **94,1 MB → 10,8 MB (−89 %)**, resolución nativa, SSIM ≥ 0,9936 y duración igual a ±0,008 s. Los originales y `content.js` no se tocaron. Script, resultados y página de comparación: `intercambio/evidencia/2026-10-27_videos-mp4/` (`comparar.html`, servido con `node server.js`).

Codificación usada:

```bash
ffmpeg -i in.mov -map 0:v:0 -c:v libx264 -preset slow -crf 26 -profile:v high -pix_fmt yuv420p -vf "fps=60,scale=-2:'min(1600,ih)',tpad=stop_mode=clone:stop_duration=2" -t <duración original> -an -movflags +faststart out.web.mp4
```

- Las grabaciones tienen cuadros de duración variable (hay cuadros que se sostienen hasta 2 s). Sin `fps=60` el MP4 perdía hasta 0,8 s del final. Con la opción de salida `-fps_mode cfr -r 60`, en cambio, las pausas se alargaban (en `Creación de cuenta`, la transición pasaba de 4,55 s a 5,63 s). El filtro `fps=60` más `tpad` y `-t` conserva el tiempo exacto.
- Se mantiene la resolución nativa: a 1600 px de ancho los videos se ven a ~800 px de alto, unos 1600 píxeles reales en Retina. Con un tope de 1200 px el total bajaba a 8,0 MB, pero se perdía nitidez en pantallas grandes.
- `-an`: los videos se reproducen silenciados.
- Comparación cuadro a cuadro en Chrome (12 instantes por video): sin errores de carga. Las diferencias que quedan son de 1–2 cuadros en transiciones rápidas.
- La pantalla pixelada del logo al inicio de `Creación de cuenta` viene de la grabación original, no de la compresión.
- David aprobó la calidad el 27-oct-2026. Hecho:
  - `v3/shared/content.js` apunta a los `.web.mp4` (27 referencias) y ya no nombra ningún `.mov` ni `.mov.mp4`; los MP4 nuevos tienen nombres limpios (`CDU error.web.mp4`).
  - Los 12 clips de Motion de menos de 0,3 MB siguen como `.mp4` originales.
  - `.gitignore` versiona `assets/Videos/**/*.web.mp4`; los originales de Switch siguen locales.
  - Caché: `content.js?v=20261027-videos-mp4`.
  - Comprobado en Chrome: las 38 grabaciones de la Home y de los cuatro casos cargan sin errores.
- El script de release solo copia lo que referencia `content.js`, así que los `.mov` no entran. Los originales de la V2 siguen en Git mientras la V2 publicada los use.

### 3. Páginas para producción — hecho el 27-oct-2026
`node v3/build-pages.mjs --release <dir>` escribe solo Statement en la raíz:
- `data-root` igual a `data-base`; el renderizador se carga desde `v3/`. El 404 usa rutas absolutas (`/`) porque GitHub Pages lo sirve a cualquier profundidad.
- Las 9 páginas indexables llevan `index, follow`, `canonical`, `description`, Open Graph (1200×630, `og:locale` en_US con alternativa es_LA) y `twitter:card`. La 404 y la página en construcción son `noindex`.
- Descripciones: el texto del hero de la Home, `card.summary` de los casos, `lead` de Ropstar y Winefast y `summary` de los artículos, todo en inglés y tomado de `content.js`.
- Las versiones de caché (`?v=`) son las mismas de la exploración y se definen en un solo lugar (`v` en `build-pages.mjs`).
- Imágenes Open Graph: `python3 scripts/make-og-images.py [url del servidor local]` captura con Chrome headless la parte de arriba de cada página (sin el panel de cookies) y la guarda en `assets/og/`. Hay que volver a correrlo cuando cambie un título o un hero.

Límite conocido: el contenido se dibuja con JavaScript. Los buscadores modernos lo leen, pero un HTML estático por página sería mejor para SEO. Queda como mejora posterior, no bloquea.

### 4. Rutas que cambian — hecho
- `about.html` redirige, conservando `?lang=`, a `index.html#about-title`. Lleva `noindex` y `canonical` a la Home.
- `work/cambio-cuentas-paises.html` deja de dar 404; `work/ropstar.html` y `work/winefast.html` son nuevas.
- `sitemap.xml` tiene las 9 URLs indexables.

### 5. Analítica — hecho en la release
El script transforma `js/analytics.js` solo dentro de la release; la copia de trabajo no cambia:
- `publicPaths`: Home, las 6 páginas de caso, los 2 artículos y la página en construcción.
- `casePaths`: se suman `ropstar_ui` y `winefast_concept`.
- Secciones de la Home de la V3: `#main`, `#about-title`, `#work`, `#craft`, `#blog`, `#contact`.
- Ubicación del clic: el menú `#a-menu`, las tarjetas `.a-case` y `.a-craft`, el blog `#blog`.
- `site_version: 'v3'`.
- El consentimiento no cambia: nada se pide a Google antes de aceptar, y solo en el dominio de producción.

### 6. Script de release — hecho
`scripts/prepare-github-pages-v3.py`, con la misma salvaguarda `.portfolio-generated`, manifest con SHA-256 y ZIP. Las rutas se escriben en NFC (fix `c8f0e0e`).

### 7. Validación — hecho en Chrome el 27-oct-2026
Servidor `release-v3` de `.claude/launch.json` (Node, raíz en `releases/github-pages-v3/`, puerto 4567):
- Las 12 páginas a 1600, 1280, 768, 390 y 360: todas se dibujan, sin desbordamiento horizontal ni errores de JavaScript, y todas las imágenes, posters y videos del DOM responden 200.
- Una URL inexistente muestra el 404 con estilos.
- `about.html?lang=es` llega a `/index.html?lang=es#about-title` en español.
- Responden 200: los `srcset` móviles, los dos CV y las imágenes Open Graph.
- `robots.txt` y `CNAME` correctos.

Pendiente: Safari, y la ingesta real de GA4, que solo se puede comprobar en producción.

### 8. Publicación (solo con OK explícito de David)
- Revisar el manifest y el peso total.
- Reemplazar el árbol de `main` por el contenido de `releases/github-pages-v3/`, sin superponerlo, para que no sobrevivan archivos viejos de la V2.
- Commit, push y verificación en `https://davidmontealegreux.com/`: las 11 páginas, los videos y la ingesta real de GA4.
- Registrar el estado publicado en `AGENTS.md` y en `docs/github-pages-release.md`.

## Higiene de Git en la rama de trabajo — hecho el 27-oct-2026
- Desde el 27-oct-2026, `intercambio/evidencia/` ya no entra en Git; las carpetas que ya estaban versionadas se quedan. Los handoffs y las revisiones sí se versionan.
- Los PNG fuente de Figma (`Img hero` y los PNG sueltos de Ropstar y Winefast) quedan fuera; se versionan solo los `.webp` que usa la web.
- Las 5 imágenes borradas de `assets/Home/Imágenes/` siguen sin commit a propósito: `prepare-github-pages.py` (V2) todavía las recupera desde Git.
