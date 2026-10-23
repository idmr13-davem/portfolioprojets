# Local Home variants

Open the comparison hub at http://127.0.0.1:3456/variants/index.html while the local server is running.

| Version | Local path | Composition |
| --- | --- | --- |
| Editorial | `/variants/editorial.html` | Broad introduction and compact case index; alternating image/copy project sections. |
| Work first | `/variants/gallery.html` | Compact opening, prominent first project, then a two-column work archive. |
| Profile | `/variants/profile.html` | Portrait and persistent identity beside a work stream on wide screens. |

These are alternative Home compositions. They link to the existing About, case-study, article, and CV pages. They do not create alternate inner pages or change the production Home. Three cases are shown: Registro ML, Cuentas para menores en México, and Motion Level. The active minors project does not claim production outcomes. Country switch is omitted.

All three load `css/tokens/figma.css` and `css/components.css`. `variants/variants.css` holds composition and responsive behavior; `variants/variants.js` handles language, resume selection, and one-time reveal motion. English is the default; a previously saved portfolio language is honored. EN/ES controls update text, alternative text, and resume links. Comparison links stay in normal flow.

At 1100 px and below, the profile stops sticking. At 767 px and below, the compositions become a single stream, editorial media precedes copy, and navigation wraps. Reduced motion removes reveal animations and interaction transforms.

Review evidence lives in `.impeccable/review/variants/`: each composition has 1440, 768, and 390 px screenshots and a Spanish 390 px capture. The hub has desktop and mobile comparison captures. Browser screenshots document the rendered implementation; they are not generated artwork. Existing portfolio assets were reused.

TasteSkill inspection accepted the approved long article headlines, canonical small type, and compact profile focal point. Gallery still-page/moving-element and profile still-page/long-pin warnings are composition-specific allowances, not global design rules. The Impeccable Inter warning is accepted because the user pinned the existing typography. Source authority and visual-system extraction are recorded in `DESIGN.md`; no canonical token was changed by this documentation pass.
