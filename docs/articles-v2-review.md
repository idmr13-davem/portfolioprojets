# Artículos V2 — 14 de octubre de 2026

Implementación local de las dos referencias finales de Figma, sin commit, push o despliegue.

## Fuente y alcance

- Archivo `Nodyl6xcEeEwbhi0OBGFnB`.
- Mercado Libre: sección `4854:12105`, desktop `4854:12712`, tablet `4854:12929`, mobile `4863:13661`.
- Automotive: sección `4863:13884`, desktop `4863:13887`, tablet `4863:13955`, mobile `4863:14023`.
- La página automotive se crea en `articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html`; su enlace de Home deja de apuntar a construcción.
- Se conserva la URL existente del artículo Mercado Libre.

## Implementación

`css/article.css` usa los tokens canónicos de `css/tokens/figma.css`, sin alterar sus valores. Header de 70px, logo de 59×52px, márgenes 218/80/16, Title L/M/S y Body L/M/S. Mercado Libre conserva gaps de 48px en las tres variantes; automotive usa 48/32/24px. Las imágenes responsive provienen de Figma y se guardan en `assets/Articles/v2/`; nunca se usan los screenshots como assets.

El header simplificado reutiliza el selector compartido. `js/article-v2.js` expone un grupo de radios con nombres English/Español, selección real, un solo tab stop y flechas/Home/End. Foco visible, salto al contenido, H1/H2, listas semánticas, fechas `<time>` y alt descriptivos aprobados; los iconos de metadata son decorativos. La antigua regla que oculta páginas internas a ≤768px se neutraliza solo para estos artículos.

Se reutilizan los cuatro enlaces V2 de contacto y el footer Codex. El inicializador de contacto de `main.js` respeta el contenido propio de `.article-v2`. Las traducciones de automotive se incorporan al mecanismo existente. `?lang=en/es` permite enlaces de idioma; la preferencia continúa compartida.

SEO: descripción, canonical, alternates, Open Graph, Twitter y BlogPosting con fechas de publicación originales (1 de agosto / 6 de septiembre de 2026). Título, descripción, locale y datos estructurados se sincronizan al cambiar idioma. El HTML inicial está en inglés. Los alternates siguen usando la traducción del navegador propia de esta arquitectura estática; no se agregó renderizado de idiomas en servidor. Se agrega el nuevo artículo al sitemap local.

Motion: Figma devuelve una entrada escalonada para Mercado Libre y ningún nodo animado para automotive. La entrada se ejecuta una vez, con la opacidad de 400ms y offsets nativos; las traslaciones de 600ms se limitan a 500ms según AGENTS.md. Solo transform/opacity, y sin animación con reduced motion. La repetición del preview de Figma no se traslada a la lectura del artículo.

Corrección editorial mínima: la etiqueta «Producct design» de Figma se presenta como «Product design». El texto español mantiene el contenido aprobado y el inglés conserva una redacción natural.

## Validación

Revisión visual y de geometría a 1480, 1280, 1000, 768, 767, 360 y 320px. Comprobación de carga de todas las imágenes, ausencia de overflow y contenido visible, cuatro enlaces finales, idioma EN/ES y cambio con flechas conservando foco y estado checked. Se revisan también reduced motion, salto al contenido y datos SEO.

No se tocaron los cambios previos de Registro ML, Motion Level, páginas de estado, borradores ni eliminaciones de assets. La publicación y autenticación de los casos siguen siendo tareas separadas.
