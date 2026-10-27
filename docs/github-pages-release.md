> **Estado actual (27-oct-2026): la V3 reemplazó a esta V2 en producción.** `main` está en `78f919e` y su árbol es `releases/github-pages-v3/`, generado por `scripts/prepare-github-pages-v3.py`. Proceso y validación en `docs/v3-release-plan.md`. Lo que sigue documenta la entrega V2 histórica.

# Entrega estática V2 para GitHub Pages

La versión independiente está en `releases/github-pages/`; el ZIP en `releases/portfolio-v2-github-pages.zip`. Se prepara desde los archivos actuales de trabajo con `python3 scripts/prepare-github-pages.py`. La carpeta `releases/` está excluida de Git para evitar duplicar medios en el repositorio de trabajo.

## Contenido de la entrega

- Solo Registro ML, Motion Level y Cuentas para menores en México en Home, navegación y páginas internas.
- Switch excluido físicamente: página, scripts propios, estilos propios, imágenes, videos, poster de Home, tarjeta, traducciones y referencias analíticas.
- Cuentas para menores enlazado públicamente, sin el gate local ni diálogo de caso pendiente.
- Copy aprobado de Registro ML y Motion Level incorporado en sus configuraciones bilingües; sin solicitudes a review-copy.json ni dependencia de loopback.
- Navegación de progreso adaptada a siete destinos; menú responsive y animación de opacidad conservados.
- SEO de los tres casos públicos habilitado con canonical y sitemap. Analítica incorporada con las mismas reglas de consentimiento y dominio de producción.
- Solo dependencias necesarias y recursos compartidos generados dinámicamente; sin configuración personal, historial Git, documentos internos ni servidor local.
- `CNAME` conserva davidmontealegreux.com. `.nojekyll` permite servir los archivos estáticos directamente.

La página About aún referencia tres imágenes eliminadas de la copia de trabajo. Para que la entrega sea autónoma, el empaquetador recupera los bytes de esas imágenes del commit existente, solo en la carpeta de entrega; no restaura ni altera las eliminaciones originales.

## Cómo usarla

1. Descomprimir el ZIP o abrir `releases/github-pages/`.
2. Reemplazar los archivos de la raíz de la rama de publicación por el contenido de esa carpeta, manteniendo el historial Git del repositorio. No copiar la carpeta de trabajo completa ni añadir el ZIP como si fuera el sitio.
3. Confirmar que `index.html`, `CNAME` y `.nojekyll` están en la raíz.
4. En Settings → Pages, usar la rama de publicación y la carpeta `/ (root)`.

La entrega está destinada al dominio personalizado actual. No se adaptó para publicarse bajo una subruta de repositorio sin ese dominio.

Guía de GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Verificaciones

- Inventario: 223 archivos, unos 104 MB sin comprimir; ZIP de unos 102 MB. Recursos individuales por debajo de 100 MiB.
- Enlaces locales, recursos HTML/CSS y anchors internos completos; sin referencias del caso excluido en el código distribuido.
- Sintaxis válida en todos los JavaScript; integridad del ZIP correcta.
- Home en inglés por defecto y cambio a español; tres CTAs visibles en un hostname distinto de localhost.
- Menú móvil con siete destinos y tres casos.
- Tres casos verificados en navegador a 390px; Home verificada a 390px y 1280px. Sin overflow al finalizar las animaciones ni errores de consola observados. No se repitió toda la matriz histórica de breakpoints.
- Los cuatro videos de Cuentas para menores alcanzaron estado de reproducción disponible sin errores; imágenes verificadas en los tres casos sin roturas observadas.
- No se comprobó recepción real de GA4 ni el alojamiento de producción. No se hizo commit, push o despliegue de esta entrega.

## Publicación completada — 15 de octubre de 2026

David autorizó publicar esta entrega. GitHub CLI 2.102.0 quedó instalado y autenticado como idmr13-davem; Git usa su integración de credenciales. No se guardaron tokens en el proyecto.

- Publicado en main: `07a05b6`; corrección posterior de URLs: `c8f0e0e352c8cf4d2410acc619693d6ee820365e`.
- Dominio: https://davidmontealegreux.com/
- Despliegue final exitoso: https://github.com/idmr13-davem/portfolioprojets/actions/runs/38777176784
- La rama de trabajo con Switch permanece independiente; solo se publicó el árbol de entrega de 223 archivos.
- GitHub Pages sirvió los tres HTML públicos y el manifiesto. Se comprobó respuesta 404 para siete rutas de Switch, incluidos HTML, configuración, hero, videos y poster.
- Se corrigieron cinco referencias de cuatro videos con tildes: macOS toleraba URLs con Unicode descompuesto, mientras GitHub Pages requería los nombres compuestos presentes en Git. Los videos de Registro ML y Cuentas para menores se verificaron por sus URLs exactas con respuesta 200. La preparación de futuras entregas incorpora esta normalización.
- El ZIP y la carpeta de entrega incluyen esa corrección. No se convirtió ni recodificó ningún video.
- Peso de los archivos publicados: 104.252.780 bytes; 14 MOV suman 66.830.391 bytes (64,1%). Desglose local en releases/video-weight-report.md.
