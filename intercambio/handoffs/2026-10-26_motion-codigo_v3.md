# Handoff: motion-codigo v3

## Objetivo
David pidió que, en el caso 2 (Motion Level), los 12 videos de muestras de "What should we define?" (Escala, Posición, Opacidad y Rotación) se reproduzcan una sola vez y en orden: fila 1 de izquierda a derecha, luego la fila 2, la 3 y la 4.

Al terminar el último video, ninguno vuelve a reproducirse, salvo que la persona salga de la sección haciendo scroll y vuelva a entrar.

## Contexto y restricciones
- Antes, los videos tenían `loop` y `data-autoplay`, y el observador compartido de `v3/shared/site.js` los reproducía en bucle mientras estaban visibles.
- `site.js` lo comparten Stage y Poster, así que no se tocó. El cambio vive en `v3/statement/app.js`.
- Se respeta reduced motion: si está activo, no hay reproducción automática, igual que en el resto del sitio.
- Sin commit.

## Qué se hizo
`v3/statement/app.js`:
1. `gridSection` renderiza los videos de `groups` con `autoplay: false`. Así no llevan `data-autoplay` y el observador compartido los ignora.
2. Nueva función `sequenceSamples()`, que se llama al inicio de `wire()` en cada render y desconecta el observador anterior al cambiar de idioma:
   - quita `loop` a los 12 clips;
   - observa `.cs-groups` (umbral 0.1). En cada cruce de visibilidad incrementa `run`, pausa los clips y los vuelve a `currentTime = 0`;
   - al entrar, reproduce el clip 0, y el `ended` de cada clip (con `{ once: true }`) reproduce el siguiente;
   - si `run` cambió (la persona salió de la sección), la cadena anterior se detiene.
3. El botón Play/Pausa de cada muestra sigue funcionando manualmente. Sin `loop`, una reproducción manual también se detiene al final.
4. Caché: `app.js?v=20261026-motion-samples` en los 8 HTML de Statement y en el generador.

## Evidencia
`intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs` (Chrome headless vía el cliente CDP de taste-skill, `--autoplay-policy=no-user-gesture-required`). Uso: `node seq-test.mjs <ancho>`.

Resultado a 1600 y a 390:
- Primera pasada: `p0 e0 p1 e1 … p11 e11` (12 clips en orden, cada uno empieza al terminar el anterior; unos 11 s en total).
- Después de `e11`: 0 videos reproduciéndose.
- Al salir y volver a entrar: la secuencia reinicia en `p0` y sigue en orden.

El panel del navegador integrado no sirve para esta prueba: con el panel oculto, `IntersectionObserver` no dispara.

## Archivos a revisar
- `v3/statement/app.js` (`gridSection`, `sequenceSamples`, `wire`)

## Cómo verificar
1. Ejecuta `seq-test.mjs` con 1600 y 390 (requiere el servidor en 127.0.0.1:3456).
2. Confirma que los otros videos de Motion (hero, ejemplos y expresividad) siguen en bucle con el observador compartido, y que Registro y Menores no cambian.
3. Cambiar de idioma con la sección visible no debe dejar dos secuencias en paralelo.

## Supuestos y limitaciones
- En mobile, los grupos van en 2 columnas (Escala | Posición, luego Opacidad | Rotación), pero el orden sigue siendo el del DOM: los tres clips de Escala, luego los de Posición, Opacidad y Rotación. Ese es el orden por filas de desktop que pidió David.
- Si la reproducción automática falla (política del navegador), la cadena se detiene en ese clip.

## Preguntas para el revisor
1. ¿Hay alguna condición de carrera entre los listeners `ended` de una secuencia anterior y la nueva?
2. ¿Conviene que el reinicio requiera salir por completo de la sección (umbral 0.1), o prefieres otro umbral?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo (motion-codigo v2) | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Comentarios de 12 columnas (baja) | Aceptado | Corrección de Codex conservada. |
| 2. Diferencias de texto a 390 (media) | Aceptado sin cambios | Siguen documentadas. |
| 3. Cifras desactualizadas del handoff (baja) | Aceptado | Este handoff no las usa. |
