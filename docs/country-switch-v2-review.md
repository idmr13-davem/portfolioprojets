# Cambio de cuentas entre países — V2 local

Implementado el 14 de octubre de 2026 para evaluación local en `codex/home-v2-review`. Sin commit, push ni despliegue.

## Fuente y composición

Figma `Nodyl6xcEeEwbhi0OBGFnB`, sección `4901:6434`:

- Desktop `4901:6438` (1480px), tablet `4903:69019` (1000px), tablet pequeña `4903:69324` (768px) y mobile `4903:69577` (360px).
- Referencias de motion: `4903:67904`, `4903:68005`, `4903:68101`, `4903:68171`, `4903:68260`.
- Dev Mode de playback: `4903:68101` y `4903:68171`.

Página: `work/cambio-cuentas-paises.html`. Traducciones y metadatos reales de video: `js/country-v2.js`. Presentación y motion: `css/country-v2.css`, `css/country-v2-motion.css`. Controlador: `js/country-v2-media.js`.

Se reutilizan los tokens canónicos, el shell `registro-v2.css`, el menú, los componentes finales de Registro ML mediante la clase optativa `case-shell-v2`, el contacto/footer y `case-study-v2.js`. La nueva clase no cambia el estilo de Registro ML. El runtime compartido reconoce el nuevo caso para mantener el toggle EN/ES. `case-spacing-v2.css` añade el caso a la escala 48/32/24; el hero mobile conserva su excepción de 32px arriba y abajo, indicada en esta fuente.

Header 70px; márgenes 218/80/16; breakpoints 1280/1000/768. Hero desktop/tablet con proporción 2000:980; mobile con recorte a 456px. Comparación: dos videos 189×420 en panel de 460px. Variantes: tres videos 188×420 en panel de 560px. En mobile ambos paneles se apilan, con 24px de padding y 48px entre figuras. Separadores originales de Figma a dimensiones nativas, sin redibujar los vectores.

## Reproducción y motion

Los cinco archivos de `assets/Videos/Switch/` coinciden por SHA-1 con los videoHash de las cinco capas de Figma:

| Video | Duración real | SHA-1 |
|---|---:|---|
| Switch productivo.mov | 6.376667s | 5f8aca71f23e1740b0729bd8bd9c2c3a2e49ef80 |
| Nuevo Switch.mov | 5.518333s | 65b7877db37a23f350069aa3948c24feeb054ddb |
| Happy path con SL.mov.mp4 | 9.868333s | 6dee418e3c809daa8a21f64aa7d3341e9443363a |
| CDU error.mov.mp4 | 11.931667s | d1ef6f9bcb0028e720f39cc75c14d9c902459a25 |
| Paso a 2FA.mov.mp4 | 8.511667s | f5c6fdc428a9154e6eb8c7e8a7504f1a0c0c73aa |

La comparación reproduce los dos clips juntos. Las variantes comienzan a los 0/9/20s, con un único video activo y sin loops individuales. La timeline se suspende con pausa, buffering, salida de pantalla o pestaña oculta. En mobile espera a que el clip activo esté visible. La selección manual de otro clip conserva la exclusividad.

Movimiento reducido desactiva el autoplay y las entradas; permite reproducción manual. Controles accesibles visibles en hover/foco y siempre en touch o movimiento reducido. Sin JavaScript se conservan los controles nativos.

Los 20 anchors de motion corresponden a las cinco referencias animadas. Se factorizan los snippets idénticos y se conservan curvas, direcciones y stagger. Las entradas se ejecutan una vez por sección, como en los casos anteriores. La traslación de 600ms se limita a 500ms siguiendo la guía del proyecto, sin alterar el escalonamiento ni la opacidad. La animación duplicada del hero dentro del frame responsive comparte la misma entrada del hero de referencia.

## Accesibilidad, SEO y contenido

H1 único, H2 para secciones, captions como HTML, videos con `aria-labelledby` y `aria-describedby`, resúmenes de los recorridos en disclosures. No hay pistas de audio en los originales; no se inventan subtítulos de voz. Los enlaces internos apuntan a H2, desplazan y llevan el foco sin ocultarlo bajo el header. El menú conserva Escape, retorno de foco, background inert y foco contenido. El toggle usa enlaces con hreflang, aria-current, nombres de idioma y banderas decorativas.

EN por defecto y ES con preferencia compartida. Metadatos, Open Graph, Twitter y seis entradas estructuradas (CreativeWork + cinco VideoObject) se sincronizan por idioma. Las duraciones y fechas de creación salen de los archivos reales; no se inventa una fecha de publicación. Hero WebP con srcset/sizes, dimensiones explícitas y prioridad alta; miniaturas WebP del primer frame de los videos, con carga de video `preload="none"`.

Se conserva el 2% como contexto y los 200k como alcance esperado. El resultado aclara que el cambio aún no estaba implementado cuando David salió del proyecto. No se presenta como impacto medido.

## Privacidad y acceso local

La Home usa un único CTA del caso en localhost, mediante el mecanismo `data-local-case` ya existente. La página, el contenido/configuración y los assets nuevos están excluidos de Git, y los videos ya estaban ignorados. No se agrega una ruta al sitemap público. La página tiene noindex y se sirve en loopback.

Esta entrega no añade autenticación: la evaluación es local. Para publicar se necesitan validación del contenido y autenticación real del servidor que proteja HTML, contenido y todos los recursos, según AGENTS.md.

## QA

Chrome a 1480, 1280, 1000, 999, 768, 767, 360 y 320px: sin overflow, dimensiones de los cinco videos correctas, imágenes cargadas, idiomas/SEO coherentes, menú y navegación por teclado, reduced motion y fallback sin JS. Revisión visual de los cuatro frames principales y auditoría de assets locales y los 20 anchors de motion.

Prueba real de playback: comparación simultánea; secuencia con cambios a 9.063s y 20.099s; exclusividad y fin sin loop. Comprobados controles manuales, pausa fuera de pantalla y reduced motion en mobile. Sin errores de script.

Preview: `http://localhost:3456/work/cambio-cuentas-paises.html?lang=es`.


### Corrección de visibilidad del texto

Se añadió `language-entered` al elemento HTML, igual que en los demás casos V2. Sin esa clase, la entrada global de idioma de `styles.css` dejaba los párrafos y captions con opacidad cero cuando había motion activo. La revisión inicial con reduced motion no detectó ese conflicto; la comprobación de entradas tampoco inspeccionaba los párrafos descendientes. La verificación adicional recorre todos los grupos con animación activa y comprueba la visibilidad efectiva de títulos, párrafos, listas y captions, incluidos sus ancestros, en EN/ES y las cuatro resoluciones.
