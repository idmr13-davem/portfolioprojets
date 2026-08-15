# Architecture and growth guide

This document records how the portfolio should evolve as more case studies, articles, languages, and interactions are added. It is guidance for future work, not a request to refactor the current site immediately.

## Current architectural position

The current plain HTML, CSS, and JavaScript architecture is appropriate for the size and behavior of the portfolio. Keep it while global changes remain predictable, pages can be tested without broad regressions, and publishing content does not require excessive manual repetition.

The intended responsibilities are:

- `css/styles.css`: design tokens and genuinely global site patterns such as navigation, buttons, language controls, contact, footer, and shared responsive behavior.
- `css/case-study.css`: the reusable case-study layout and content patterns shared by all projects.
- `css/article.css`: the reusable editorial/article system.
- `css/about.css`: behavior and presentation unique to About.
- `js/main.js`: shared site interactions and state.
- `js/i18n.js`: the current small-site translation layer.
- Each HTML file: semantic structure and content specific to that page.

## CSS strategy for case studies

### Keep shared rules shared

A rule belongs in `case-study.css` when it represents a pattern that should evolve consistently across case studies, for example:

- Hero structure and project metadata.
- Content containers and section spacing.
- Typography hierarchy.
- Evidence figures and captions.
- Objective, result, timeline, roadmap, and accordion patterns.
- Shared responsive transitions between desktop, tablet, and mobile.

Before adding a project override, ask whether the difference is a real content/layout requirement or merely a one-off correction to match a screenshot. Prefer improving the shared rule when all cases should behave the same way.

### Scope project-specific rules

Rules that only make sense for one project must be scoped under its page class, such as:

```css
.case-study-registro-ml { ... }
.case-study-motion-level { ... }
```

Never use an unscoped override for a single case. A project-specific rule must not change shared navigation, contact, footer, language controls, or another case study.

### When to create a separate CSS file per case

Do not split files only because `case-study.css` is long. Create a project stylesheet such as `css/case-studies/motion-design-system.css` when at least one of these conditions is true:

1. The project has a substantial visual system or interaction that no other case uses.
2. Its scoped overrides are spread across several distant sections of `case-study.css`, making the cascade difficult to follow.
3. A change for that project has already caused, or is likely to cause, a regression in another case.
4. Most work on the project requires navigating past a large amount of unrelated CSS.
5. The project-specific block is large enough to have multiple responsibilities of its own, such as a custom hero, unique evidence component, and special responsive behavior.

When separating, preserve this loading order:

```html
<link rel="stylesheet" href="../css/styles.css" />
<link rel="stylesheet" href="../css/case-study.css" />
<link rel="stylesheet" href="../css/case-studies/project-name.css" />
```

The project file may extend shared patterns but should not copy their full implementation. Move only rules with a single project consumer. Do the extraction incrementally while working on that case, then visually validate all public case studies.

### CSS maintenance rules

- Use the existing semantic tokens before adding literal colors, spacing, typography, or radius values.
- Create a new token only when it expresses a reusable design decision, not for every numeric value.
- Let parent `gap` control recurring vertical rhythm; avoid stacking child margins that duplicate it.
- Prefer Grid, Flexbox, normal flow, `max-width`, and fluid sizing over screenshot-specific fixed coordinates.
- Add a breakpoint because content stops working, not solely because a device preset exists.
- Keep the established boundaries aligned where possible: mobile up to `767px`, tablet from `768px` to `1024px`, intermediate desktop up to `1499px`, and large desktop from `1500px`.
- Use `!important` only when an explicit cascade constraint justifies it. Repeated use to defeat earlier rules is a signal to reorganize that area.
- Place responsive rules close to the component or within a clearly named section so the final cascade can be understood without searching the whole file.
- Do not add a final override block as the default solution. First find the rule that should own the behavior.

## Adding a new case study

Use the following sequence:

1. Define the story and content outline before writing layout code.
2. Reuse the existing case-study HTML and CSS patterns for hero, metadata, sections, evidence, captions, contact, and footer.
3. Add only the new semantic blocks the content genuinely requires.
4. If a new block will appear in a second case soon, name and implement it as a shared case-study pattern. Otherwise keep it explicitly scoped to the new project.
5. Add English and Spanish content in the same work cycle so one language does not become a partial copy.
6. Add the Home card, sitemap entry, metadata, assets, and cache-version updates deliberately.
7. Validate wide desktop, laptop, tablet, mobile, and widths immediately around breakpoints.
8. Check keyboard interaction, visible focus, reduced motion, overflow, console errors, missing assets, and both languages before publishing.

Avoid copying an existing case and leaving unused sections, selectors, translations, or assets behind. The confidential `Menores` case must remain excluded from `main` until David explicitly confirms that it can be restored after launch.

## Growth thresholds

### More pages and case studies

The current explicit HTML remains reasonable while the number of public pages is small and global elements change infrequently. Consider build-time templates or a small static-site generator when one or more of these become recurring problems:

- A global header, footer, metadata, or navigation change must be repeated across roughly 8–10 pages.
- Pages begin drifting because shared markup was updated inconsistently.
- Publishing a case requires copying and cleaning a large page instead of composing known content blocks.
- The portfolio reaches roughly 8–10 case studies or 15–20 content pages and additions become frequent.

Choose the smallest build-time solution that removes the demonstrated repetition. Do not introduce React, client-side routing, or global state management merely because page count increases.

### More articles

When articles become frequent, separate article content and metadata from the shared page shell. A simple data/content format and static generation is preferable to manually duplicating title, date, reading time, language, tags, social metadata, and related-card markup.

Consider this when there are approximately 5–8 published articles or when edits to the editorial shell regularly require touching multiple HTML files.

### Internationalization

The current DOM-based translation layer is acceptable for the present site. Reconsider it when:

- Translation entries become difficult to map to their source page.
- New copy is repeatedly published in only one language by mistake.
- SEO requires independently indexable English and Spanish URLs, canonical links, and `hreflang`.
- Long-form articles and case studies make runtime text replacement fragile.

At that point, prefer language-specific pages generated from shared structured content. Avoid adding a heavy client-side i18n library unless the site has truly dynamic application behavior.

### Assets and performance

As the portfolio grows, each new case must have an asset budget. Before publishing:

- Export images at the largest displayed dimensions, not their source-design dimensions.
- Prefer WebP or AVIF for photographic/raster content when visual quality is preserved.
- Provide poster images for videos and avoid eager loading media that is below the fold.
- Use lazy loading for non-critical images.
- Remove duplicate exports, `.DS_Store` files, and assets no public page references.
- Measure the actual page rather than optimizing solely for a perfect benchmark score.

Optimize shared and above-the-fold assets first because they affect every visit.

### JavaScript and interactions

Keep interaction code native and class/state driven. Split `main.js` by responsibility only when unrelated features make it hard to understand or safely modify, or when page-specific scripts are being initialized on pages that do not use them.

Prefer:

```text
JavaScript updates logical state or a class
-> CSS renders the state
```

Do not add a framework for accordions, menus, carousels, language toggles, or other isolated interactions that the platform and small modules already handle well.

### Content management

A CMS becomes worthwhile only if content publishing is frequent, non-technical editing is required, or structured content is reused across several destinations. Until then, a documented content template or small static generator has a lower maintenance cost.

## What should remain global

The following should continue to have one source of truth:

- Design tokens.
- Global typography and layout primitives.
- Buttons and arrow states.
- Header, navigation, language control, contact, and footer behavior.
- Shared accessibility and reduced-motion behavior.
- Case-study typography, spacing, metadata, evidence, and caption standards.
- Article structure and editorial typography.

If the same conceptual component gains multiple slightly different implementations, reconcile the shared decision before creating another variant.

## What should remain local

Keep local:

- Unique project artwork and media composition.
- A content block used by only one story with no known second consumer.
- Project-specific responsive behavior that follows from unique evidence or media.
- Editorial exceptions that are meaningful to one article rather than part of the article system.

Explicit local code is preferable to a universal component with many switches.

## Review checkpoint after each major addition

After adding a case study, article family, language strategy, or substantial interaction, review:

1. How many files must change for the next equivalent addition?
2. Did any shared pattern get copied instead of reused?
3. Did project-specific CSS leak outside its page scope?
4. Are breakpoint rules expressing content behavior or patching individual screenshots?
5. Can both languages, metadata, navigation, and sitemap be updated predictably?
6. Did asset weight or loading behavior materially worsen?
7. Can another person understand where a change belongs?

Refactor only the area that has demonstrated maintenance cost. Preserve working behavior and validate related pages after every extraction.

## Decisions to postpone

Do not introduce these without a concrete current need:

- React, Next.js, or another application framework.
- Client-side routing.
- Global state management.
- A large design-system package beyond the existing tokens and shared patterns.
- A CMS for occasional manually maintained content.
- A full CSS rewrite solely to improve file organization.

The target is not maximum abstraction. It is a portfolio that stays coherent, accessible, responsive, fast, and inexpensive to change.
