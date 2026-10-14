# Registro ML v2 — local review

Implemented in the existing `codex/home-v2-review` checkout at `/work/registro-ml.html`, served by the existing loopback server on port 3456. No deployment or publication is included.

## Design source

Figma file `Nodyl6xcEeEwbhi0OBGFnB`, section `4745:7142`. Layouts: desktop `4745:7146`, 1000px `4776:2596`, 768px `4776:2812`, 360px `4776:3436`. Motion: hero `4774:2895`, context `4776:4463`, agnostic `4776:4611`, form `4776:4843`, Google `4776:4974`, unification `4776:4704`, outcomes `4776:4814`. Drawer references: `4776:3095` and `4776:3713`.

Uses the canonical private-library variables in `css/tokens/figma.css` and existing controls in `css/components.css`. Layout and interaction rules are scoped to `.registro-v2`; unrelated pages retain their existing behavior. Old global mobile concealment and language entrance rules are bypassed for this page.

Native motion timings and easing are retained, including the different right-hand entry in the Google and unification comparisons. Identical tracks share keyframes. Figma demonstration loops become once-per-section entrances for readable content. Only transform and opacity animate. Anchor navigation lasts at most 500ms. Reduced-motion rules remove entrance and drawer animation.

## Content and source limitations

Exact review copy and Figma artwork are in the ignored local directory `assets/Registro ML/v2/`. The HTML and tracked bilingual copy contain qualitative outcomes. Exact copy is requested only on loopback hosts. This arrangement is for local review, and does not implement authentication. Production publication still requires the server-side protection and content approval described in project rules.

The comparison exports are poster frames from the original walkthrough videos. Their opening frame shows Mercado Libre Home before entering sign-up. Comparisons use the five original local MOV files under the already ignored `assets/Videos/Registro/` directory. Playback is muted, inline and looping while at least half the video is visible; offscreen videos pause. Native controls allow manual playback and pause, including when autoplay is blocked. Reduced motion disables automatic playback. Hidden tabs pause active videos and resume those still visible. The mobile page footer stacks to avoid clipping.

Code Connect mappings could not be retrieved with the available Figma access; implementation reuses the existing canonical tokens and controls. The language-toggle motion reference `4727:5428` could not be resolved; the current shared library toggle remains in use.

The full case is marked noindex and removed from the public sitemap. Public preview URLs, reciprocal hreflang, canonical URLs, sharing artwork and structured data should be applied to approved public previews when that publication work is authorized.

## Verification

- Spanish layout inspected at 1920, 1480, 1280, 1024, 1000, 999, 768, 767, 390 and 360px: no horizontal overflow.
- English checked at 1480, 1000, 768 and 360px; language, metadata and current section remain synchronized.
- Drawer opening, Escape closing, forward/backward focus wrapping, background inert state and scroll lock verified.
- Anchor arrival and completed motion styles verified; loaded images have no failures; browser reported no console warnings/errors.
- HTML audit: one H1, unique IDs, valid anchors and local assets, all 33 animated nodes mapped. JavaScript syntax and whitespace checks pass.
- Reduced-motion handling audited in CSS and JavaScript; browser emulation was not available for a separate runtime test.

Browser text wrapping can differ slightly from Figma. Responsive content keeps natural height rather than clipping paragraphs to fixed frame heights.

## October 13 design revision

Compared desktop `4745:7146`, tablets `4776:2596` / `4776:2812`, mobile `4776:3436` and menus `4776:3095` / `4776:3713` with the local case. Added `registro-v2-final.css`, scoped to `.registro-ml-v2` so Motion Level retains its existing layout.

- Header: 70px with native 59 × 52px library logo, margins 218/80/16px, Button S desktop navigation and 28px responsive menu control. The corrected desktop and tablet headers (`4838:11313` / `4843:3577`) and drawers navigate the five case sections. Header gaps are 80px desktop and 64px tablet. Cross-page links preserve their destination instead of being intercepted as local anchors.
- Typography: desktop Body L / H2 Title L / H3 Title M, tablet Body M / H2 Title M / H3 Title S, mobile Body S / H2 Title S / H3 Title XS. Body uses Light. Footer roles match each supplied frame, including Caption S in drawers and mobile.
- Walkthroughs: all eight video slots are 420px high, widths 187/188px on desktop/tablet and 187px mobile. Comparison containers adapt to captions and stacked mobile videos without clipping.
- Removed hero and summary dividers and section borders; comparison center separators remain on desktop/tablet as shown in Figma and disappear on mobile. Desktop hero image loses its stroke; tablet/mobile retain the source stroke.
- Menus: 70px header offset, 24px content inset plus the source’s 7px centering offset, 51px link rows, language selector and small footer at the bottom. Existing 500ms transform/opacity motion and reduced-motion handling match the fetched motion contexts.
- Closing section: four contact actions reuse the Home assets and ADPlist destination, with the updated Figma closing copy and responsive contact layout.
