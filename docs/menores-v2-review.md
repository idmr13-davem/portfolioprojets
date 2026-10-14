# Cuentas para menores en México — V2

Implementación local del 14 de octubre de 2026, en `codex/home-v2-review`. Sin commit, push o despliegue.

## Referencias

Figma `Nodyl6xcEeEwbhi0OBGFnB`, sección `4875:14913`:
- Desktop: `4875:14914`.
- Tablet horizontal: `4899:4076`.
- Tablet pequeña: `4899:5291`.
- Mobile: `4899:5693`.
- Menús: `4899:5605`, `4899:6211`.
- Motion por sección: `4899:3416`, `4899:3492`, `4899:3598`, `4899:3702`, `4899:3803`, `4899:3806`.

## Archivos

- `work/menores-mexico.html` y `js/menores-v2.js`: página y contenido aprobado bilingüe, excluidos de Git para esta revisión del caso activo.
- `css/menores-v2.css`: composición responsive sobre el shell existente de casos.
- `css/menores-v2-motion.css`: keyframes de Figma factorizadas, una entrada por sección.
- `js/menores-v2-media.js`: controles de video, metadatos verificados y actualización del SEO por idioma.
- `assets/Menores/v2/`: hero, variantes WebP sin pérdida, vectores y miniaturas. Local e ignorado.
- `assets/Videos/Menores/`: cuatro originales MOV locales, ya ignorados.

Reutiliza `registro-v2.css`, `registro-v2-menu.css`, `case-study-v2.js`, tokens canónicos, toggle, acciones de contacto y footer. El runtime compartido permite omitir el fetch de review-copy cuando el caso lleva su contenido aprobado directamente. Las actualizaciones conservan la configuración de Registro ML y Motion Level.

## Composición e interacción

Header 70px, logo nativo 59×52, márgenes 218/80/16 y breakpoints 1280/1000/768. Hero Title XL/L/M y secciones Title L/M/S. Se conserva el recorte mobile del hero a 400px. El nombre usa la terminología controlada «Cuentas para menores en México»; errores de escritura de las etiquetas de video se corrigen sin cambiar su sentido.

Diagrama de cuatro pasos: dos columnas desde 1000px, vertical debajo. Conectores originales de Figma a tamaño nativo. Galería de dos filas desde 768px y cuatro videos verticales en mobile. Videos de 188/188/188/189 × 420px, con el recorte FILL de la fuente.

Menú: anchors internos, Escape, retorno de foco, bloqueo de scroll y main/footer inertes mientras está abierto. Navegación de hasta 500ms. Idioma EN por defecto, preferencia compartida y parámetros `?lang=en/es`.

Playback: secuencia silenciosa de un único video activo, según las anotaciones de `4899:3702`: primero al llegar a la sección, segundo a los 20s, tercero a los 31s y cuarto a los 40s. Sin loops individuales ni reproducción simultánea. La timeline se suspende durante pausa manual, buffering, salida de pantalla o al ocultar la pestaña. Reduced motion desactiva la reproducción automática y permite controles manuales exclusivos. Botón accesible de pausa/play visible en hover o foco; siempre visible en pantallas táctiles. Los controles nativos permanecen como fallback sin JavaScript.

Motion: se usan los snippets de las seis referencias de Figma. Se conserva el stagger, las direcciones y las curvas; se limita a 500ms cada traslación de 600ms para cumplir AGENTS.md. Una entrada por sección, sin loops de lectura, con alternativa sin animación. El burger usa transform en lugar de animar ancho.

## Videos y SEO

Los hashes SHA-1 de los cuatro MOV locales coinciden exactamente con los videoHash de sus capas en Figma. Sus duraciones reales son aproximadamente 20.878, 12.685, 9.680 y 7.347 segundos. No hay pistas de audio; no se requieren subtítulos de voz. Se incluyen captions, resúmenes HTML y una disclosure «Leer los recorridos».

Las miniaturas proceden del primer frame de cada video. VideoObject usa duración verificada, fecha real de creación del archivo, nombre, descripción y URLs locales. No se inventa uploadDate: la fecha de publicación se establecerá cuando exista una entrega autenticada autorizada. Metadatos de descripción, Open Graph y Twitter se sincronizan con EN/ES.

El caso sigue activo. La expectativa de lanzamiento de Figma conserva su carácter de objetivo y se añade una nota explícita: no son resultados medidos de producción. No se extrapolan resultados.

## Publicación

Esta revisión es local y no implementa OTP ni sesiones. `noindex` y el enlace de Home condicionado a localhost no son autenticación. La página, su copy y su evidencia permanecen fuera del repositorio publicable; el servidor de revisión escucha únicamente en loopback. No se agrega el caso al sitemap público.

Antes de cualquier publicación debe existir autorización del contenido y autenticación real del lado del servidor que proteja HTML, imágenes, videos, documentos y endpoints. La exclusión actual evita incorporarlos al siguiente commit por accidente; no sustituye esa implementación.

## QA

Chrome: 1480, 1280, 1000, 999, 768, 767, 360 y 320px, sin overflow horizontal. Verificados geometría de videos, carga de assets, H1 único, menú/Escape/anchors, EN/ES, resúmenes, controles play/pause, avance del video, pausa fuera de pantalla, movimiento normal y reduced motion. Verificados cuatro VideoObject y link local de la Home.

El servidor local añade MIME para WebP/MOV/MP4/JSON/VTT y respuestas de rango 206/416 para seek de videos, preservando la página 404. Se verificó un rango real sobre el video adulto.

Preview: `http://localhost:3456/work/menores-mexico.html?lang=es`. Prototipo para grabar: `http://127.0.0.1:4173/`.


### Ajuste de playback según Dev Mode

Se eliminó el autoplay independiente para este caso mediante `config.mediaPlayback = "sequence"`. El controlador propio inicia los clips a 0/20/31/40 segundos, con un único video activo y sin loops individuales. Si el siguiente clip está fuera de pantalla, espera hasta que sea visible; no reproduce contenido invisible. Una pausa manual se conserva al salir y regresar a la galería.

QA en tiempo real: cambios observados a 20.017s, 31.099s y 40.132s; el cuarto video se detiene al finalizar. Verificados exclusividad, selección manual, pausa fuera de pantalla y reduced motion en desktop y mobile. Los casos que no declaran la secuencia conservan su playback anterior.
