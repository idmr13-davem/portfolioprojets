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

The desktop experience currently includes:

- A redesigned Home with fixed navigation, an animated hero scroll indicator, and a new About me section.
- Exclusive project accordions: the first item opens by default and only one item can remain open at a time.
- Matching idle, hover, open, and open-hover states with reduced-motion support.
- A 24px content gap between image and copy in both About me and My articles.
- Localized English and Spanish content, including language-specific CV links.
- A shared closing contact section across Home, About, and both case studies, with email, LinkedIn, and WhatsApp actions.
- A simplified copyright-only footer across pages.
- The Registro Mercado Libre “Our compounding changes” section converted from scroll disclosure to exclusive accordions.
- Header contact buttons that navigate to the closing contact section on the current page.

The Home mobile experience is implemented from the Figma mobile design. Internal pages still use the temporary under-construction mobile view.

© 2026 David Montealegre. All rights reserved.
