# Revisión: switch-sequence v1

## Veredicto

Aprobado con observaciones

## Resumen

La implementación cumple la reproducción automática de las tres variantes en orden: cada clip termina antes de iniciar el siguiente, el último no reinicia y salir del bloque permite comenzar una nueva secuencia al regresar.

Se reutiliza el controlador de Motion sin duplicar su lógica. La limpieza desconecta observadores y elimina listeners al cambiar de idioma. Las variantes quedan fuera del autoplay compartido; los dos videos comparativos conservan su configuración de autoplay en bucle.

No encontré problemas bloqueantes. Las observaciones siguientes requieren decidir comportamiento, por lo que no las modifiqué. La revisión se limita al handoff; los cambios paralelos de pantallas de estado, consentimiento y estilos quedan fuera del alcance.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `v3/statement/app.js:271` | Un Play manual sobre el clip automático actual conserva la secuencia. La afirmación del handoff «un Play manual toma el control» tiene esta excepción, heredada de Motion. | `takeOver` ignora el video cuyo índice coincide con `current`. Una comprobación aislada confirmó que pausar y reanudar el primer clip permite iniciar automáticamente el segundo al terminar. La prueba Chrome guardada solo cubre tomar control desde otro clip. | Precisar que reproducir **otro** clip cancela la cadena. Si se quiere que cualquier Play manual la cancele, distinguir la interacción del botón del evento automático `play` y verificar ambos casos. |
| 2 | baja | `v3/statement/app.js:260` | En tablet y mobile la secuencia puede completar los videos inferiores antes de que la persona llegue a ellos. Es una limitación declarada en el handoff. | El observador vigila el contenedor completo y `play(i + 1, id)` avanza sin comprobar la visibilidad del siguiente video. Los estilos apilan las variantes por debajo de 1024 px. | Mantener el comportamiento si se acepta esta limitación. Si cada variante debe verse durante su reproducción, proponer que el siguiente clip espere a entrar en pantalla; supone cambiar la interacción y requiere validación específica. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | Ninguno. | No se identificaron correcciones inequívocas de bajo riesgo. Las observaciones requieren definir el comportamiento esperado. |

## Verificación ejecutada

- Leídos el handoff, sus referencias, los helpers de `v3/shared/site.js`, los estilos pertinentes y el diff del alcance.
- Revisadas las salidas existentes: Switch **6/6 PASS a 1600** y **6/6 PASS a 390**; regresión Motion **6/6 PASS a 1600**. No se relanzaron Chrome, servidores ni auditorías visuales.
- Sintaxis comprobada con `node --check` en `app.js`, `content.js` y `build-pages.mjs`.
- Renderizado aislado en Node/VM para EN y ES: tres variantes con `data-sequence` y sin `data-autoplay`; dos comparativos con `data-autoplay` y `loop`.
- Comprobadas las versiones de caché en las **27 páginas**, las **9 referencias al app de Statement** y el generador.
- Confirmada la existencia de los tres videos y sus posters.
- Ejecutadas **9/9 comprobaciones del controlador** existente, adaptando en memoria el selector y el delimitador al código actual: orden, reinicio, control manual desde otro clip, eventos pendientes, limpieza y alternativas sin movimiento automático.
- Reproducida en Node/VM la excepción de pausa y reanudación del clip actual. Estas comprobaciones no certifican decodificación ni políticas reales de autoplay.
- No se modificaron archivos ni se hizo commit.