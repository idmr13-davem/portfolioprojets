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

| Grupo | Origen | Peso aprox. |
|---|---|---|
| Shells HTML (11 páginas) | generados por `v3/build-pages.mjs` en modo release | <0,1 MB |
| JS y CSS de Statement | `v3/statement/app.js`, `styles.css`, `v3/shared/content.js`, `site.js`, `base.css` | 0,3 MB |
| Dependencias de raíz | `css/tokens/figma.css`, `css/analytics.css`, `js/analytics.js`, `assets/Favicon/favicon.ico`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` (regenerado) | <1 MB |
| Assets referenciados | 138 archivos sacados de `content.js` y `app.js` | 122 MB hoy; ~60–70 MB tras optimizar los videos (estimado, sin medir) |

No entran: `intercambio/`, `.pixel-perfect/`, `releases/`, `.impeccable/`, `.agents/`, `.taste-skill/`, `docs/`, `variants/`, `plantillas/`, `research/`, `server.js`, `serve.sh`, las páginas V2 ni los assets fuente de Ropstar/Winefast (`Hero/`, `Img hero/`, PNG sueltos de `v3/`).

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

### 3. Shells para producción
Las páginas actuales viven en `/v3/statement/` con rutas `../../` y `noindex`. Hay que añadir un modo release a `v3/build-pages.mjs` (o un script nuevo) que:
- Escriba solo Statement en la raíz de la release: `index.html`, `404.html`, `work/*.html` (6), `articles/*.html` (3).
- Ponga `data-root` igual a `data-base` (así `asset()` resuelve desde la raíz) y sirva `app.js`, `styles.css` y `shared/` desde una carpeta fija (por ejemplo `/v3/`).
- Cambie `noindex` por `index, follow`, salvo en 404 y en construcción.
- Añada por página: `<link rel="canonical">`, `meta description`, Open Graph y Twitter card con imagen.
- Mantenga los `?v=` de caché.

Límite conocido: el contenido se dibuja con JavaScript. Los buscadores modernos lo leen, pero un HTML estático por página sería mejor para SEO. Queda como mejora posterior, no bloquea.

### 4. Rutas que cambian
- La V3 no tiene `about.html`. Publicar una página `about.html` mínima que redirija a `index.html#about` (meta refresh + enlace), porque la URL está en el sitemap actual y quizá en enlaces externos.
- `work/cambio-cuentas-paises.html` pasa de 404 a página pública.
- Nuevas: `work/ropstar.html`, `work/winefast.html`.
- Regenerar `sitemap.xml` con las 9 URLs indexables.

### 5. Analítica
- En `js/analytics.js`, añadir a `publicPaths` las seis páginas de caso. Añadir Ropstar y Winefast a `casePaths` y cambiar `site_version` a `'v3'`.
- Comprobar que los enlaces internos de la V3 (`#work`, `#craft`, `#contact`) caigan en el mapa de secciones o añadirlos.
- Mantener el consentimiento: no se pide nada a Google antes de que la persona acepte. El banner ya se carga en Statement.

### 6. Script de release
Crear `scripts/prepare-github-pages-v3.py`, con `prepare-github-pages.py` como base:
- Salida en `releases/github-pages-v3/` + ZIP + `release-manifest.json`, con la misma salvaguarda `.portfolio-generated`.
- Lista blanca: shells generados en el paso 3 + dependencias de raíz + assets referenciados por `content.js`/`app.js` (resueltos en NFC, como hizo el fix `c8f0e0e`).
- Fallar si falta un archivo o si entra algo de `intercambio/`, `.pixel-perfect/`, `stage/`, `poster/` o un archivo fuente PNG.
- Sin la regla `PRIVATE` de Switch.

### 7. Validación
- Servir la release (no la carpeta de trabajo) con `node server.js` apuntando a `releases/github-pages-v3/`.
- Probar a 360, 390, 768, 1280 y ≥1500, en EN y ES, las 11 páginas: sin desbordamiento horizontal, sin errores de consola, sin 404 de red, videos que cargan y reproducen (Chrome y Safari) y foco visible.
- Comprobar `?lang=`, la persistencia de `portfolio-language`, los enlaces de CV y contacto, la redirección de `about.html` y el banner de analítica.

### 8. Publicación (solo con OK explícito de David)
- Revisar el manifest y el peso total.
- Reemplazar el árbol de `main` por el contenido de `releases/github-pages-v3/`, sin superponerlo, para que no sobrevivan archivos viejos de la V2.
- Commit, push y verificación en `https://davidmontealegreux.com/`: las 11 páginas, los videos y la ingesta real de GA4.
- Registrar el estado publicado en `AGENTS.md` y en `docs/github-pages-release.md`.

## Higiene de Git en la rama de trabajo (aparte de la release)
- `intercambio/evidencia/` pesa 221 MB y ya tiene 20 MB versionados. Propuesta: ignorar `intercambio/evidencia/` y sacar del índice lo versionado (`git rm --cached`, sin borrar archivos), dejando `handoffs/` y `revisiones/`.
- Antes del commit de la V3, añadir `assets/Ropstar/v3/case|home` y `assets/Winefast/V3/case|home`, pero no `Ropstar/Hero/`, `Winefast/Img hero/` ni los PNG sueltos (unos 15 MB). Hacen falta reglas de `.gitignore` para esos fuentes.
