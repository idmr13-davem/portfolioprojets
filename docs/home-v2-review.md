# Home v2 — local design review

## Direct access to case studies — October 15, 2026

Responsive refinement approved by David: the hero case link uses Caption L (16/20) from 1280px, Caption M (12.8/16) at 768–1279px, and Caption S (10/12.5) below 768px. Sources: tablet `4941:86549`, mobile `4941:86559`. The 10×10px chevron and 4px gap are unchanged. Verified at 1480, 1280, 1279, 1000, 768, 767 and 360px. The earlier 16px implementation described below is superseded for tablet/mobile.

Added David's Figma hero link from `4826:6586` / instance `4941:86544` below the experience list: “Revisa mis casos de estudio” / “Explore my case studies”. The native anchor points to `#work`, using the existing EN/ES translation, Caption L typography, accent color, 4px gap and exact 10×10px Figma chevron exported to `assets/Home/v2/hero-case-chevron.svg`. The section accepts focus on fragment navigation. Existing hero copy and motion are preserved; the new link has no animation in the supplied Figma motion context. Verified at 1480, 1000, 768 and 360px, including English translation, asset loading, keyboard Enter, focus on the work section and a 70px desktop header offset. Local only; no publication.

## Video cards without strokes — October 15, 2026

David requested removing the strokes around all four Home video cards at every resolution. Figma Home V2 already has empty stroke arrays on the sixteen responsive video containers and the four motion-reference containers. The site now uses `border:0` on `.v2-project-visual`, with obsolete responsive border-color declarations removed. Card layout and video sizing remain governed by the existing rules. Browser checks confirmed zero border width on all four cards at 1920, 1480, 1280, 1000, 768 and 360px, with each video still 420px tall. Local implementation only; no publication.

Review branch: `codex/home-v2-review`. Preview: `http://127.0.0.1:3456`.

## Sources

- [Desktop](https://www.figma.com/design/Nodyl6xcEeEwbhi0OBGFnB/PortafolioPersonal_Q1-2026?node-id=4696-13432), [desktop small](https://www.figma.com/design/Nodyl6xcEeEwbhi0OBGFnB/PortafolioPersonal_Q1-2026?node-id=4627-2581), [tablet](https://www.figma.com/design/Nodyl6xcEeEwbhi0OBGFnB/PortafolioPersonal_Q1-2026?node-id=4717-15168), [mobile](https://www.figma.com/design/Nodyl6xcEeEwbhi0OBGFnB/PortafolioPersonal_Q1-2026?node-id=4644-9440).
- [Library](https://www.figma.com/design/sG9CjBVuHsUIb9K1mx3klT/Libreria_Q3-2026?node-id=15-485). Canonical export: `css/tokens/figma-library.json`; runtime variables: `css/tokens/figma.css`. Colors include both source themes; the portfolio uses dark mode. Legacy aliases retain existing consumers. Shared components: `css/components.css`; inspect them at `/components.html`.
- Motion sources: hero `4721:3418`, selected work `4727:4279`, About `4727:4713`, articles `4727:4977`, language toggle `4727:5428`, scroll arrow `4730:5533`, menu `4730:5657` / `4730:6030`.

## Scope and intentional differences

David explicitly approved Country switch as a fourth case on October 9, 2026, replacing the previous three-case limit for this Home. The Home preserves the alternating desktop/tablet layout and switches to visual-first stacked cards on mobile. Header switches to the full-screen menu below 1000px; section layout switches below 768px; desktop margins apply from 1280px.

Copy uses natural English, contextualizes Mercado Libre for global readers, and describes results qualitatively. Accounts for minors in Mexico remains active, without final production claims. Its case-study page is not restored. Country switch and the minors card open an accessible pending-content dialog instead of creating unsupported pages. Existing Registro ML and Motion Level pages remain local review destinations; their content and security architecture were not redesigned in this change.

The source videos supplied locally in `assets/Videos/` and their generated poster frames are ignored by Git. They are needed for this local preview and must not be included in a public deployment without responsible-role validation and server-side protected delivery. The existing tracked Motion Level video is reused.

The application currently remains a static site. This branch does not implement OTP authentication. It must not be published as a protected-case solution: browser gating is insufficient, and the existing open case-study routes and assets require a separate server authentication implementation and publication audit.

## Interactions

- Fixed navigation scrolls to the corresponding section; scroll hint disappears after scrolling.
- Hero character opacity follows the Figma HOLD animation. Other entrances retain the source keyframe timing and easing. Sections play once on first entry, and reset when returning from an internal page.
- Menu enters from above with the specified 500ms translation/opacity. Burger width changes are expressed as transforms. Menu supports scroll locking, Escape, focus cycling, and inert closed content.
- Language selection uses the source 300ms, 60px pill translation; EN is the initial default, with the existing persisted preference retained. CV destination follows the active language. ADPlist links to the provided mentor profile.
- Videos play once when at least half visible, retain the last frame, pause outside the viewport, and restart after leaving and re-entering. Playback failures expose a manual play control. Reduced motion disables autoplay and decorative motion, retaining manual preview playback.
- Articles support arrows, touch scrolling, snapping, and keyboard arrow navigation.

## Validation

Chrome review covered 1920, 1480, 1280, 1000, 768, and 360px widths. No horizontal page overflow, failed image loads, or JavaScript errors were found. All four local videos decode. Language/CV switching, carousel navigation, pending-content dialog, menu/Escape, reduced-motion behavior, and video replay after viewport re-entry were checked. JavaScript syntax and whitespace checks passed.

Unrelated article edits, document drafts, and previously deleted Home images were present before this task and remain preserved.

## Component and alignment revision

The updated Units section (`sG9CjBVuHsUIb9K1mx3klT`, `15:1492`) was read on October 9, 2026. Text/arrow buttons, links, contact buttons, pills, language states, textarea and all 45 icon slots were refreshed from their individual component contexts. The gallery now uses the same `data-preview-state` selectors as production hover/click styles; it does not maintain separate preview colors.

Alternating project labels and case buttons inherit the text column alignment, including the right edge for Motion Level and Country switch. Carousel arrows use one current Figma asset per state; the old overlapping pseudo-element is removed. Unavailable directions retain their idle visual with reduced opacity and cannot enter hover/click. Button geometry stays 36 × 36px in all carousel states. Horizontal clipping prevents entrance transforms from temporarily widening the mobile document.

Validation checked column alignment at 1920, 1480, 1280, 1000 and 768px, real pointer idle/hover/mouse-down carousel styles, forward/backward scrolling and disabled edges, all gallery image loads, 51 state previews, 34 colors and 45 icons.

## Accessibility and alternative-text notes

The new annotations on Home node `4696:13432` were read on October 9, 2026. Their H1/H2/H3/H4 structure is represented with native headings. Article titles use H4 as annotated; an invisible H3 groups the article selection without changing the layout. Animated hero characters are hidden from assistive technology, while the H1 exposes its complete phrase as one accessible name.

The logo and scroll hint are native buttons for scrolling within the Home, supporting Enter/Space and focus transfer. External destinations, downloads and case-study destinations retain native link semantics. Repeated case and article links have distinct, contextual names. Contact and language controls have explicit names, and the current language uses `aria-pressed`. Menu open/close labels follow the active language. Decorative control icons are ignored.

The four videos expose the annotated descriptions through accessible names and fallback text (HTML video has no `alt` attribute): unified sign-up entry, easing tests, account creation for minors in Mexico, and account switching between Argentina and Brazil. Article image `alt` values describe the Mercado Libre offices, Mazda driver interface and guitar, replacing repeated article titles. Per the same annotations, these article images are ignored in the accessibility tree with `aria-hidden`, while their alt descriptions remain in the HTML. English and Spanish descriptions switch together with the page language. No claim about search indexing is implied.

Validation checked the browser accessibility tree, heading levels, absence of ignored images from that tree, bilingual video descriptions and image alts, keyboard scrolling/focus, and localized menu states. Visual layout and media files are preserved. No publication was performed.


## Home final revision — October 13, 2026

Source: Home V2 section `4564:2179`, desktop `4696:13432`, tablet `4627:2581` / `4717:15168`, mobile `4644:9440`, and mobile drawer `4730:7057`.

The local Home now follows the order Intro → About me → Case studies → Personal blog → Contact. The hero introduces David's full name, freelance practice, design engineering direction, mentoring and personal interests. About includes the updated personal narrative, a resume action, a blog action and a link to the cases. Article links use the secondary button. The contact block uses the revised closing narrative.

Home-specific text roles now use Title XL for the desktop hero, Title L for desktop case headings, Title S for outcome labels, Body L for desktop copy and Title M for desktop article headings. Tablet and mobile follow their source frames. Media columns use the twelve-column desktop and eight-column tablet proportions. All four preview videos retain a fixed height of 420px at every breakpoint, with their source proportions preserved. The portrait and article images were checked against the current Figma exports.

The exported 10 × 533px progress track stays fixed on desktop and tablet and appears within the mobile drawer. Its active stop and marker follow actual page scrolling, including individual cases and the final contact stop. The contact bar has email, LinkedIn, WhatsApp and scheduling actions. Scheduling uses the existing ADPlist profile, explicitly confirmed by David. Idle, hover and keyboard focus states preserve the icon geometry; underline and icon transitions use transform and opacity. Tablet/mobile use native small icon exports.

Validation: six reference widths plus intermediate widths from 360px to 1920px, both languages, image loading, 420px video geometry, no horizontal overflow, article carousel controls, case availability dialog, section navigation, drawer scroll links and keyboard focus trapping. Reduced-motion mode disables transitions and automatic video playback. No browser runtime errors were found.

Content constraints remain: qualitative results in Git, no company comparisons, and no invented production outcomes for Accounts for minors in Mexico. The existing fourth local card remains under the prior authorization recorded in AGENTS.md. This is a local implementation; publication and protected case access remain separate work.


### Compact desktop header — October 13, 2026

Updated from node `4696:13433`: fixed 60px height, native 59 × 52px logo export, 64px desktop link gaps and 120 × 28px language selector. The bottom divider is removed. The hero retains an 80px gap beneath the header, and section scroll offsets follow the compact header. Smaller desktop widths retain a 32px link gap to fit the content columns. Mobile header and drawer retain their existing responsive layout. New header assets are local; language state and keyboard activation remain shared.


### Final case-card content — October 13, 2026

David explicitly revoked the qualitative-only Git restriction. All four cards now use the final Figma titles, roles, full contributions and complete outcomes, including the supplied figures, in versionable HTML and English/Spanish translations. Outcome paragraphs retain the exact accent-versus-primary text segmentation from nodes `4696:13463`, `4696:13473`, `4696:13487` and `4696:13497`. The minors card now uses the authored outcome rather than replacing it with a status paragraph. These source claims were copied from the approved design, not independently measured or extrapolated. This entry supersedes the earlier qualitative-only content notes; it does not represent a deployment or alter case-access controls.


### Scroll indicator continuity — October 13, 2026

Fixed mixed coordinate systems: nested case cards returned container-relative `offsetTop` values, while page sections returned document-relative values. Progress now derives every stop from its bounding rectangle plus the page scroll offset. Activation and interpolation share those document coordinates, eliminating clamped plateaus between cases. The final interval uses the reachable page bottom so a short contact section does not cause a freeze or final jump. Font loading, responsive layout, language changes and content reflow refresh the stops. Both the fixed and drawer indicators share the same position.


### Hero title tokens — October 13, 2026

Updated from desktop `4826:6586`, tablet `4627:2582` and mobile `4644:9441`: the Home H1 uses Title L (40/50) at desktop widths of 1280px and above, Title M (32/40) at tablet widths of 768–1279px, and Title S (26/32.5) below 768px. Existing canonical tokens are reused; this changes the H1 role assignment without changing shared token values or other headings. Inter Bold, zero letter spacing and the source accent runs are retained.


### Proximity label interaction — October 13, 2026

Matched the second supplied reference video and Figma motion node `4824:5556`. Labels no longer remain visible. The native opacity keyframes share a paused 2500ms timeline, sought from the marker's actual position across the 512px travel. Each label fades in as the marker approaches, peaks beside its stop and fades out as it leaves; reverse scrolling seeks the same timeline backward. Both fixed and drawer indicators share this state. Keyboard focus reveals the focused destination. Reduced motion uses immediate nearby-label visibility without a fade.


### Secondary buttons — October 13, 2026

Updated the shared `.btn--mute` text-button component from instance `4817:3042` and its current library variant set. Both text sizes now have a 1px Stroke/Secondary border in Idle, Hover and Clic, matching the library's text and arrow variants. Padding accounts for the inside stroke so outer button geometry remains unchanged. Shared stylesheet cache versions are refreshed across all consumers, including Home, About, case studies, articles and component previews.


### Remove section scroll hints — October 13, 2026

Removed the hero and About scroll-hint buttons at all resolutions, together with their unused styles and hero scroll-state lookup. The fixed/drawer progress indicator and logo section navigation retain their existing behavior.


### Header text tokens — October 13, 2026

Header nodes `4776:2781` and `4696:13433` now use Button S (Inter Bold 12/14) for horizontal navigation, with the source's 80px link gap. The tablet-small/mobile drawer frames `4730:5657` and `4730:7057` retain Button M (Inter Bold 16/19), now expressed through shared semantic tokens instead of literal values. This applies to every Home breakpoint without changing global token values or internal-page header roles.


### Header height and blog title scale — October 13, 2026

Home header height is now 70px, following library component `sG9CjBVuHsUIb9K1mx3klT / 15:737`. Desktop logo and controls remain centered. Mobile/tablet-small retain their logo and burger while matching the new height. Hero clearance, section scroll offsets, drawer inset and indicator placement follow the revised header geometry.

Article-card titles now use Title S (26/32.5) at desktop widths ≥1280px and Title XS (20/25) on tablet widths 768–1279px, from `4696:13517` and `4627:2653`. Mobile retains its existing Title XS. Section headings and article-image geometry are unchanged.


### Spanish language flag — October 13, 2026

Replaced both ES-language flag states with the exact Colombia assets from library nodes `50:1358` and `50:1380`. The inactive header already showed Colombia, while selecting ES still loaded the previous flag; selected, unselected, header and shared drawer states now use the same current source. SVGs retain their native 60 × 30px geometry. The language remains Spanish (`es`), with country imagery used only for the visual selector. Asset and shared stylesheet/script cache versions were refreshed.


### Body typography weight — October 13, 2026

Body L, M and S now use Inter Light (300), as specified by David's updated Figma styles. Shared tokens include explicit weight values for all three body sizes; the legacy body-weight alias follows Body M. Direct Regular declarations in Home copy and the shared V2 case shell now use these weight tokens. Font sizes, line heights, headings, buttons and caption roles retain their existing definitions. Shared stylesheet cache versions were refreshed across consumers.

### Tablet footer typography — October 13, 2026

Home footer copyright and creation credit use Caption M (Inter Regular 12.8/16) on tablet widths 768–1279px, matching Figma `4711:14356`. Desktop and mobile retain their existing typography. Footer spacing and the 20 × 19px Codex icon retain their existing geometry.

### Responsive header library revision — October 13, 2026

All four Home header variants now follow library `15:736` and portfolio instances `4696:13433`, `4776:2781`, `4843:3298`, `4843:3407`. The header remains 70px tall, with 16px vertical padding, horizontal margins of 218px desktop, 80px for both tablets and 16px mobile. The native 59 × 52px logo is shared across breakpoints; tablet-small/mobile use the exact 20 × 17px burger asset in its 28px control. Existing drawer close interaction, navigation and language switching remain functional.

### Drawer link hovers and separators — October 13, 2026

Tablet and mobile drawer section links now use the desktop hover color token, with no inherited full-row background overlay. Removed the separators above and below the drawer contact section while preserving its spacing. Home content sections already have no section dividers in the final stylesheet.

### Tablet header navigation spacing — October 13, 2026

Updated the horizontal Home header navigation to Space XXL (64px) at 1000–1279px, following corrected instance `4776:2781`. Desktop retains Space Huge (80px).

### Button S for tablet and mobile — October 15, 2026

David updated Home frames `4627:2581` (tablet 1000–1279), `4717:15168` (tablet 768–999) and `4644:9440` (mobile). Text CTAs now use semantic Button S tokens (`--text-btn-s` / `--lh-btn-s`, Inter Bold 12/14) below 1280px, including CV/blog actions, case links, article links, preview buttons and drawer navigation. Existing contact text uses the same tokens rather than literal sizes. This updates typography only; component padding and assets are retained. Desktop CTA typography stays Button M. Computed sizes verified across 27 controls at 1440, 1280, 1279, 1024, 999, 768, 767, 390 and 320px.
