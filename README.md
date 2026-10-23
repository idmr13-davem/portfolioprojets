# davidmontealegreux.com

Public source for David Montealegre's product design portfolio.

## Local preview

The site is built with plain HTML, CSS, and JavaScript and requires no build step. Serve this directory locally:

- `node server.js` — http://localhost:3456 (supports range requests for video playback), or
- `./serve.sh` — Python static server on the same port.

## Deployment

Hosted on GitHub Pages from `main` (`idmr13-davem/portfolioprojets`) with the custom domain `davidmontealegreux.com`.

Releases are not published from the working folder. `python3 scripts/prepare-github-pages.py` builds a self-contained tree in `releases/github-pages/` (plus a ZIP) that excludes protected work, private evidence, internal docs, and local tooling. `releases/` is ignored by Git. See [`docs/github-pages-release.md`](docs/github-pages-release.md).

## Architecture and growth

The project intentionally uses plain HTML, CSS, and JavaScript while that remains proportional to its size. CSS ownership, case-study separation criteria, publishing checks, and thresholds for introducing templates, structured content, or other tooling are documented in [`docs/architecture-and-growth.md`](docs/architecture-and-growth.md).

## Content

The public V2 site (published October 15, 2026) contains three case studies:

- Registro Mercado Libre
- Motion Level Design System
- Accounts for minors in Mexico

A fourth case, Switching accounts across countries (`work/cambio-cuentas-paises.html`), exists only in the local working branch. It remains protected and is physically excluded from the published release.

The site also includes About, two articles, and status pages. Internal strategy, drafts, source research, unapproved metrics, and compliance notes are maintained in a separate private repository.

## Current implementation (V2)

- Home V2 with fixed navigation, hero, selected-work cards with bilingual roles, contributions, and outcomes copied from Figma, About, articles carousel, contact, and footer.
- Case studies with per-page V2 stylesheets and controllers (`css/*-v2*.css`, `js/*-v2.js`), responsive across Desktop, Tablet, and Mobile, with video evidence and reduced-motion support.
- Two articles: “Por qué Mercado Libre fue el primer lugar del que no quise irme?” and “Lo que mi pasión por los autos me enseñó sobre diseñar experiencias”, each in English and Spanish.
- Figma-aligned tokens (`css/tokens/figma.css`, `css/styles.css`) and shared controls (`css/components.css`).
- English by default with Spanish available (`js/i18n.js` and per-page bilingual configuration), including language-specific CV links.
- Consent-based GA4 analytics (`js/analytics.js`): nothing loads before explicit opt-in, and only listed public paths are measured. See [`docs/analytics.md`](docs/analytics.md).
- Per-page review notes for V2 in `docs/*-v2-review.md`.

## Next backlog

- Verify real GA4 ingestion on production.
- Improve video and asset performance (MOV files are about 64% of the published weight).
- Improve SEO and social sharing metadata.
- Review and polish article content in Spanish and English.
- Define a faster case-study publishing framework for future projects such as Familia de Empresas and Ropstar.

© 2026 David Montealegre. All rights reserved.
