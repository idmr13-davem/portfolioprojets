# Revisión: pixel-perfect-statement v1

## Veredicto

Requiere cambios

## Resumen

La alineación de Statement mejora de forma verificable, pero el cero de hallazgos altos/medios no acredita una revisión completa: el auditor omite elementos internos y tiene excepciones demasiado amplias. Corregí la retícula de los metadatos de los tres casos; las mejoras del instrumento quedan propuestas porque exceden las correcciones de alineación autorizadas.

Revisé las 32 capturas con retícula de `.pixel-perfect/after/`, los informes y el código. El sandbox bloqueó servidor y Chrome; la corrección se verificó mediante cálculo y revisión de la cascada, sin nuevas mediciones de navegador. Las capturas existentes son anteriores a esta corrección.

Solo se modificaron reglas de alineación y sus referencias de caché. Se conservaron copy, colores, tipografía y motion. No se modificaron Stage, Poster ni los archivos de runtime/base compartidos. Sin commit, push ni despliegue.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/statement/styles.css:182` | **Corregido:** los metadatos de los casos no compartían las columnas de la página cuando actuaba el máximo de 18rem. | A 1440 px, sus inicios eran 28 / 344,8 / 661,6 px; ahora son 28 / 498,933 / 969,867 px, columnas 1/5/9. Las capturas de los tres casos muestran la distribución anterior. | Mantener cuatro columnas por campo y confirmar visualmente EN/ES. A 768 px la distribución se conserva; en móvil siguen apilados. |
| 2 | alta | `.agents/skills/pixel-perfect/scripts/audit.mjs:54` | **Pendiente:** cobertura insuficiente para afirmar que se midieron todas las alineaciones. | El selector omite `dt`, `dd`, `figcaption`, `output`, `li` y los `span` de ledger/blog. El `dl` exterior puede estar alineado aunque sus campos no lo estén: el hallazgo 1 no aparece en el informe. | Incorporar elementos internos de layout o marcarlos con `data-grid-check`; conservar la deduplicación de cajas. Verificar también menú abierto y preview del ledger, ausentes en las capturas. |
| 3 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:99` | **Pendiente:** coincidir por un solo borde o estar centrado descarta toda comprobación de retícula. | `fullBleed`, `centred`, `onStart` u `onEnd` bastan por separado. Una imagen que empieza correctamente pero termina entre columnas obtiene el mismo resultado que una caja que ocupa columnas completas. | Distinguir alineación de texto por un borde de ocupación completa de columnas en medios/contenedores; documentar excepciones centradas. No forzar ambos bordes para todos los textos. |
| 4 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:107` | **Pendiente:** `inset` no demuestra que el desplazamiento provenga del padding. | Basta un ancestro con fondo y un borde alineado; no se contrastan sus límites interiores ni el padding con la posición del elemento. Un desplazamiento accidental dentro de una tarjeta puede degradarse a bajo. | Contrastar con la caja de contenido y el padding del componente; mantener como excepciones revisadas los rellenos de pasos de Menores y del eje de Motion. |
| 5 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:93`, `.agents/skills/pixel-perfect/scripts/audit.mjs:127` | **Pendiente:** detección parcial de desbordes y recortes. | `overflow` solo compara el borde derecho. `clipped` revisa el límite inferior del primer ancestro con overflow oculto, solo para texto ≥28 px y con altura del ancestro <3em; no detecta recortes laterales/superiores ni todos los ancestros. | Revisar ambos bordes del viewport y cada eje de recorte relevante; tratar el margen estimado de 0,06em como heurística, no como medición del contorno de la letra. |
| 6 | baja | `.agents/skills/pixel-perfect/scripts/audit.mjs:117` | **Pendiente:** `near-miss` compara bordes izquierdos de toda la página sin contexto. | Ordena únicamente por X; puede relacionar secciones lejanas y no compara bordes derechos. | Agrupar por contexto de alineación y comprobar también extremos derechos. No ajustar automáticamente una posición por esta señal aislada. |
| 7 | baja | `v3/statement/styles.css:243`, `.agents/skills/pixel-perfect/SKILL.md:67` | **Propuestas:** documentar la excepción editorial y reparar la referencia de continuidad de la skill. | El cuerpo de ambos artículos mantiene 42rem centrados: a 1440 px empieza en X=384, a 2,8 px de la columna 4. El detector lo acepta por centrado. La skill remite a `revision-con-codex`, no disponible en el catálogo de esta sesión. | Mantener por ahora el ancho de lectura; decidir explícitamente si debe seguir una retícula editorial propia. Referenciar el protocolo y la plantilla existentes como alternativa al handoff. No aplicado por requerir una decisión de diseño o cambios de documentación. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:182` | Retícula de 12 columnas con `minmax(0, 1fr)` y cuatro columnas por grupo de metadatos. | Alinear rol, periodo y estado con las columnas 1/5/9 de los tres casos. |
| 2 | `v3/statement/styles.css:307` | Restablecido `grid-column: 1 / -1` para los metadatos en móvil. | Conservar el apilado y evitar columnas implícitas al heredar `span 4`. |
| 3 | `v3/build-pages.mjs:52`; los ocho HTML de `v3/statement/` | Referencia a `styles.css?v=20261023-grid-meta`, condicionada a Statement en el generador. | Cumplir el cache busting de CLAUDE.md y conservarlo al regenerar. Stage y Poster producen exactamente sus archivos actuales. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, plantilla, handoff, `docs/v3-propuestas.md`, skill, auditor, CSS, plantillas de Statement y runtime/base compartidos. Rama comprobada: `exploration/v3-propuestas`.
- Ejecutado `node server.js`: falla con **listen EPERM 127.0.0.1:3456**.
- Ejecutado el comando del handoff: `node .agents/skills/pixel-perfect/scripts/audit.mjs http://127.0.0.1:3456/v3/statement/index.html --out .pixel-perfect/codex`. Falla con **Chrome exited early, code null**. No produjo informes ni capturas; no se interpreta como cero hallazgos.
- Inspeccionadas las 32 capturas existentes: Home, tres casos, dos artículos, under-work y 404, a 1440/1024/768/390 px. Comparados los JSON de antes/después: **10 altos, 272 medios, 43 bajos → 0 altos, 0 medios, 21 bajos**. Son resultados de la ejecución previa, no una certificación posterior a las correcciones.
- Calculada la retícula desde CSS, con raíz de 16 px: `C = (W − 2M − 11G) / 12`; inicio de columna `n = M + (n−1)(C+G)`. El margen de Statement sobrescribe el de `base.css`.

| Ancho | Margen M | Gutter G | Columna C | Inicios de metadatos corregidos, columnas 1/5/9 |
|---|---:|---:|---:|---|
| 768 | 16 | 16 | 46,667 | 16 / 266,667 / 517,333 |
| 1023 | 20,46 | 20,46 | 63,085 | 20,46 / 354,64 / 688,82 |
| 1024 | 20,48 | 20,48 | 63,147 | 20,48 / 354,987 / 689,493 |
| 1280 | 25,6 | 25,6 | 78,933 | 25,6 / 443,733 / 861,867 |
| 1440 | 28 | 28,8 | 88,933 | 28 / 498,933 / 969,867 |
| 1500 | 28 | 30 | 92,833 | 28 / 519,333 / 1010,667 |

- Revisada la cascada de `subgrid` en 768–1023 px: ledger ocupa 12 columnas y reparte 5/4/3; blog reparte 2/8/2; contacto reparte 4/8. Los overrides finales móviles restablecen las posiciones de ledger, contacto y carrera; el blog coloca texto y valor desde la columna 5. Sin columnas implícitas evidentes por esas asignaciones. Esto verifica las reglas, no los tamaños intrínsecos en ejecución.
- Comprobadas las alineaciones declaradas: retrato y “10” parten de columna 1; lista y “5”, de columna 5; About inicia su segunda columna en la 7; hero de Motion reparte 4/4/4; enlaces del footer móvil parten de columnas 1/7. La carrera descuenta una columna y gutter por lado y reparte sus diez columnas interiores en 2/7/1.
- `data-grid-ignore` y `--ignore` se respetan en los elementos de alineación, near-miss y clipping. El chequeo global `page-overflow` sigue incluyendo cualquier desborde del documento; la excepción de un elemento no suprime esa señal global. Los botones superpuestos, navegación y nombre recortado del footer son excepciones defendibles.
- Ejecutado el `node --check` combinado del handoff y, además, cada archivo por separado, porque el comando combinado no comprueba los tres scripts. Pasan auditor, `app.js`, `site.js` y generador.
- Ejecutado el generador en VM con escritura interceptada: **24 shells coinciden** con los archivos actuales; no se regeneraron otros archivos. Verificado por comparación de declaraciones que tipografía, colores y motion del CSS permanecen idénticos. `git diff --check` pasa.
- Las cinco eliminaciones de imágenes presentes al inicio no se tocaron. Solo se creó este archivo de revisión.

Queda pendiente una ejecución real posterior de las ocho rutas en EN/ES, incluyendo menú abierto y preview, y validación adicional a 360, 1280 y ≥1500 px. No se certifica ausencia global de overflow ni precisión óptica de cada glifo a partir de capturas reducidas.