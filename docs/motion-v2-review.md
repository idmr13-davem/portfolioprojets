# Motion Level V2 — local review

Implemented in the existing `codex/home-v2-review` checkout at `/work/motion-design-system.html`, using the same V2 shell, canonical Figma tokens, controls, menu and bilingual navigation as Registro ML. Preview: `http://127.0.0.1:3456/work/motion-design-system.html?lang=en` (Spanish: `?lang=es`). No publication is included.

## Design and implementation

Figma file `Nodyl6xcEeEwbhi0OBGFnB`, section `4791:5261`. Layouts: desktop `4793:5268`, 1000px `4805:20325`, 768px `4805:20726`, 360px `4805:21226`. Reveal references: hero `4803:18915`, context `4803:19311`, roadmap `4803:19465`, initial focus `4803:19570`, benchmark `4803:19639`, internal examples `4805:19705`, properties `4805:19816`, shared criteria `4805:20059`, axes `4805:20172`, outcomes `4805:20289`.

All 48 animated nodes are mapped to their matching content. Repeated native CSS tracks share keyframes; the Figma timings and Bézier easing are retained. Demonstration loops become once-per-section reveals, following Registro ML. Only transform and opacity animate. Reduced motion renders the content without reveals or menu animation. Both V2 cases keep the header fixed at every resolution (120px on desktop, 84px below 1000px). Main content reserves that height, and native anchor offsets include it. Anchor navigation remains bounded to 500ms and accounts for the fixed header.

`css/motion-v2.css` owns the new case layout; `css/motion-v2-reveal.css` owns its reveal tracks. Existing `registro-v2.css`, `registro-v2-menu.css`, `components.css` and canonical tokens supply the shared shell. The navigation, language and reveal lifecycle now lives in `js/case-study-v2.js`, with separate copy/configuration files for Registro ML and Motion Level. Initial drawer focus waits for the opening transition; Escape, background inert state, scroll lock and focus wrapping remain shared.

Hero videos are fluid: three on desktop/1000px, two at 768–999px, one on mobile. The mobile hero video is 232–300px wide. Property examples use four columns on desktop/tablet and two on mobile. Research artwork uses separate desktop and mobile Figma assets.

## Original media and playback

The 18 hero, internal and property videos were exported through the native FigJam **Export video** command from source file `iJfTlOK1hDHgROP9iCp46E`. Their SHA-1 hashes match the Figma media hashes. The two existing expression videos also match their Figma hashes. The original sources and posters remain in local ignored asset directories.

`js/motion-v2-media.js` implements the Dev Mode annotations:

- Internal examples: first video at 0s, second at 10s, third at 17s; repeat after the third finishes.
- Property columns: starts at 0s, 2s, 4s and 6s on an 8-second cycle. Each column plays its three examples together during the first second and then pauses. A source longer than one second uses the playback rate required to finish in that second.
- Expressivity: both videos start together on one shared clock. The shorter video holds its final frame until the longer video finishes; both restart together, preserving the complete examples.
- Hero: muted inline playback, one video at a time from left to right. Each visible video plays once and holds its final frame. Scrolling away or hiding the tab pauses the active video; returning resumes without replaying completed videos. Hidden responsive slots do not play. Only the explicit replay control resets the sequence.
- Videos pause outside the viewport and in hidden tabs. The shared clock stops while paused. On mobile, scrolling to an internal example starts that visible row's phase.
- Reduced motion disables automatic playback; explicit play/replay remains available. Each group uses the existing library Mute Small buttons for keyboard-accessible pause and replay controls, shown on hover/focus and persistently for touch or reduced motion.
- Only the hero requests metadata initially. Other video sources load when their media becomes visible.

## Content and publication boundary

Tracked HTML and bilingual configuration contain qualitative, sanitized copy. Exact review text and Figma artwork are in the ignored `assets/Motion DS/v2/` directory. Exact copy is requested only on loopback hosts, matching Registro ML's existing local review convention. This is a local prototype arrangement, **not authentication**.

The case is noindex and removed from the public sitemap. Public canonical/hreflang and structured data remain a separate publication task. Before publication, employer validation and real server-side OTP authentication must protect the complete case, associated assets and endpoints; browser-only checks are insufficient.

## Verification

- Responsive layouts inspected from 360 to 1920px, including the 767/768, 999/1000 and 1279/1280 boundaries: no horizontal overflow.
- EN/ES copy, project dates, metadata and equivalent query URLs checked.
- All visible image exports and all 20 video sources checked; no missing or zero-byte assets and no browser media errors.
- Native reveal end states verified (opacity 1 and final transforms) and paired expressivity playback checked in the browser. Offscreen hero playback pauses.
- Drawer keyboard wrapping, Escape, inert background and scroll locking verified.
- Registro ML checked at 1480, 1000, 768 and 360px after extracting the shared runtime: no overflow, missing images or console errors; language switching and drawer behavior remain functional.
- A deterministic playback check passed for internal sequencing, column sequencing, one-second playback, paired playback, manual pause, offscreen pause, hidden tabs and reduced motion.
- JavaScript syntax, HTML IDs/anchors, motion-node coverage, local asset paths and Git whitespace checks passed.

Reduced-motion behavior was verified through CSS and a simulated preference change in the playback check; a separate browser preference emulation was unavailable. Browser text can wrap differently from Figma, so responsive sections use natural content height.

## October 13, 2026 — responsive design revision

Compared section `4791:5261`, desktop `4793:5268`, tablets `4805:20325` / `4805:20726`, mobile `4805:21226` and menus `4805:21237` / `4805:21934` with the local V2. The final overrides in `motion-v2-final.css` reuse the verified case shell and remain scoped to Motion Level.

- Header: 70px, native 59 × 52px Motion logo, 218/80/16px margins, internal section links, Button S labels, 80px desktop and 64px tablet gaps. Drawers follow the supplied 70px offset, 51px link rows and Caption S footer.
- Desktop typography: Body L 18/25 Light and H2 Title L 40/50; tablet Body M and Title M; mobile Body S and Title S. Motion subheadings retain Title XS. Title now reads “Motion design system — Motion Level” in the order shown by Figma.
- Colors: deep page background, inverse surface in the hero, current text and stroke tokens. Native hero border follows each breakpoint. Removed the hero and summary dividers, retaining the gallery separators shown in the source.
- Media: internal references are 420px high (the third mobile reference follows the native 418.196px geometry). Expressivity references use 420px / 418.15px in desktop/tablet and two stacked 420px references in mobile. Property demos remain 120 × 120px. Hero media retains fluid aspect-ratio sizing and the native responsive video count.
- Contact: four shared Home actions including the confirmed ADPlist link, current closing copy and responsive layout.
- Existing motion playback, pause/replay controls, offscreen pause and reduced-motion behavior remain available. Retrieved menu motion matches the existing 500ms transform/opacity interactions.


### Collective criteria layout correction

Updated `4796:5955`, `4805:20570` and `4805:20844`: desktop and both tablet variants now stack expressivity explanation, full-width video comparison, then frequency explanation. Removed the narrow frequency side column. The introduction-to-content gap is 48px and the inner sequence uses 24px gaps; desktop subheading gaps are 12px, tablet 10px. The center divider spans the 480px comparison panel. Both tablet references are 187 × 420px; desktop retains the source’s 186 × 418.15px second reference. Mobile retains its existing stacked video layout.
