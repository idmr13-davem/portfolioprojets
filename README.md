# davidmontealegreux.com

Public source for David Montealegre's product design portfolio.

## Local preview

Run a static web server from this directory and open `index.html`. The site is built with plain HTML, CSS, and JavaScript and requires no build step.

## Deployment

This repository is intended for GitHub Pages and the custom domain `davidmontealegreux.com`.

## Content

The public site contains exactly two case studies:

- Registro Mercado Libre
- Motion Level Design System

Internal strategy, drafts, source research, unapproved metrics, and compliance notes are maintained in a separate private repository.

## Current implementation

The current public experience includes:

- A redesigned Home with fixed navigation, an animated hero scroll indicator, selected work, About me, articles, and contact sections.
- Responsive mobile layouts for Home, the two public case studies, and the first article page.
- A mobile burger menu with language toggle, contact CTA, footer, and scroll locking.
- The first article page, “Por qué Mercado Libre fue el primer lugar del que no quise irme?”, implemented from the Figma editorial design.
- Figma-aligned typography, color, spacing, margin, and border-radius tokens in `css/styles.css`.
- Exclusive project accordions: the first item opens by default and only one item can remain open at a time.
- Matching idle, hover, open, and open-hover states with reduced-motion support.
- Localized English and Spanish content, including language-specific CV links.
- A shared closing contact section across Home, About, the article, and both case studies, with email, LinkedIn, and WhatsApp actions.
- A simplified copyright-only footer across pages.
- The Registro Mercado Libre “Our compounding changes” section converted from scroll disclosure to exclusive accordions.
- Header contact buttons that navigate to the closing contact section on the current page.

## Next backlog

- Run visual QA across desktop and mobile for Home, both case studies, and the first article.
- Review and polish article/readings content in Spanish and English.
- Improve SEO and social sharing metadata.
- Optimize image and video performance.
- Define a faster case-study publishing framework for future projects such as Familia de Empresas and Ropstar.

© 2026 David Montealegre. All rights reserved.
