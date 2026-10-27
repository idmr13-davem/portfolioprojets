# Handoff: motion-codigo v4

## Objetivo
Responder a la revisión v3 de la secuencia de muestras de Motion: decidir y aplicar cómo interviene el Play manual (hallazgo 4) y convertir la prueba en una prueba con aserciones (hallazgo 5).

## Contexto y restricciones
- El pedido de David es el mismo de v3: los 12 clips se reproducen una vez, en orden por filas, y se reinicia solo al salir y volver a entrar a la sección.
- Se conservan las correcciones de Codex en v3: umbral 0 con guardia de cambio de estado, `loop` quitado antes de las salidas por reduced motion, y limpieza completa por render.
- Sin commit.

## Qué se hizo
1. `v3/statement/app.js`, `sequenceSamples()`:
   - **Toma de control manual.** Un listener `play` en cada clip comprueba si el clip que empieza no es el `current` de la secuencia. Si es así, invalida la cadena (`run += 1`, `current = -1`, retira el listener `ended`) y pausa los demás clips. Desde ahí la persona controla las muestras hasta salir y volver a entrar.
   - `current` se pone en -1 al reiniciar y al terminar la cadena.
   - Los listeners `play` se retiran en la limpieza.
   - Caché: `app.js?v=20261026-motion-samples-2` en los 8 HTML de Statement y en el generador.
2. `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs`, ahora con aserciones (sale con código 1 si alguna falla). Comprueba:
   - primera pasada exacta `p0 e0 … p11 e11`;
   - 0 clips reproduciéndose al final;
   - segunda pasada completa y exacta al salir y volver a entrar;
   - clic en Play del clip 6 mientras suena el 1: queda un solo clip reproduciéndose;
   - la cadena no continúa después (no aparecen `p2` ni `p7`).

## Resultado (Chrome headless, `--autoplay-policy=no-user-gesture-required`)
```
1600: PASS ×5 (first pass, nothing after, second pass, one clip on manual play, chain stopped — p0 e0 p1 p6 e6)
390:  PASS ×5 (idéntico)
```

## Archivos a revisar
- `v3/statement/app.js` (`sequenceSamples`)
- `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs`
- Revisión anterior: `intercambio/revisiones/2026-10-26_motion-codigo_v3_revision.md` y su evidencia en `revision-codex/`

## Cómo verificar
1. Ejecuta `cd intercambio/evidencia/2026-10-26_motion-samples && node seq-test.mjs 1600 && node seq-test.mjs 390` (servidor en 127.0.0.1:3456). Si tu sandbox no puede lanzar Chrome, revisa la lógica con tus dobles de prueba de v3 y los resultados de arriba.
2. Comprueba que el resto de los videos de Motion, Registro y Menores sigan con el observador compartido.

## Supuestos y limitaciones
- Reduced motion: no hay secuencia automática. Si la persona reproduce dos muestras a mano, pueden sonar a la vez (son silenciosas). Se mantiene así, igual que en el resto del sitio.
- La prueba de idioma no está automatizada. La limpieza por render la cubre la prueba de dobles de Codex en v3.

## Preguntas para el revisor
1. ¿La toma de control manual tiene alguna carrera con el `play()` asíncrono de la propia cadena? (`current` se asigna antes de llamar a `play()`.)

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Reinicio con visibilidad parcial (alta) | Aceptado | Corrección de Codex conservada. La segunda pasada de la prueba la confirma. |
| 2. `loop` con reduced motion (media) | Aceptado | Corrección de Codex conservada. |
| 3. Limpieza al cambiar de idioma (media) | Aceptado | Conservada, y ampliada a los listeners `play`. |
| 4. Play manual rompe la exclusividad (media) | Aceptado con decisión | El Play manual toma el control: la cadena se detiene y los demás clips se pausan hasta volver a entrar. Lo cubren las pruebas 4 y 5. |
| 5. Prueba sin aserciones (baja) | Aceptado | La prueba ahora tiene 5 aserciones por ancho y sale con 1 si alguna falla. |
