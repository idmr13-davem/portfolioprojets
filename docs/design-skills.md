# Skills para explorar variantes del portafolio

Instalación local verificada el 15 de octubre de 2026, en `.agents/skills/`.

| Herramienta | Skill | Uso |
| --- | --- | --- |
| [TasteSkill](https://github.com/Leonxlnx/taste-skill) | `design-taste-frontend` | Explorar direcciones visuales diferentes para nuevas versiones. |
| TasteSkill | `redesign-existing-projects` | Auditar y mejorar una página existente. |
| [Impeccable](https://github.com/pbakaus/impeccable) | `impeccable` | Crear variantes y revisar composición, responsive, accesibilidad y acabado. |

TasteSkill se instaló con sus scripts, referencias y bibliotecas. Impeccable ya estaba instalado: se conservaron sus archivos y se verificó su motor (`impeccable-engine 0.1.15`, skill 4.6.0).

Las skills estarán disponibles en el próximo turno; si no aparecen en el selector `$`, abrir un chat nuevo dentro de este proyecto.

## Flujo sugerido

1. Usar TasteSkill para proponer direcciones visuales diferenciadas.
2. Usar Impeccable para desarrollar y revisar cada dirección.
3. Crear las variantes en rutas locales separadas y mantener la versión actual como referencia hasta elegir una.

Las instrucciones del proyecto y el brief específico prevalecen sobre las preferencias estéticas de las skills. Conservar los hechos, métricas autorizadas, idiomas y requisitos de acceso. No inventar resultados. Respetar `prefers-reduced-motion`, animar solo `transform` y `opacity`, y limitar las transiciones de página a 500 ms.

Para una exploración explícita se pueden proponer nuevas composiciones, tipografías y paletas; para un refinamiento se conserva la dirección aprobada en Figma. La instalación no crea variantes ni publica cambios.

## Runtime disponible

Node no está en el PATH de la terminal de esta sesión. Los scripts de TasteSkill pueden ejecutarse con el Node incluido en Codex:

```text
/Users/dave/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
```

Versión verificada: v24.19.0. Impeccable usa su propio motor y respondió correctamente al comando `engine-probe`.
