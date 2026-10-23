---
name: David Montealegre portfolio
description: Extracted incumbent Figma system; local Home compositions preserve its identity.
colors:
  background-deep: "rgba(20, 25, 30, 1)"
  background-primary: "rgba(23, 27, 31, 1)"
  surface-main: "rgba(10, 35, 35, 1)"
  surface-inverse: "rgba(220, 250, 250, 1)"
  surface-accent: "rgba(30, 210, 210, 1)"
  text-primary: "rgba(250, 250, 250, 1)"
  text-secondary: "rgba(250, 250, 250, 0.75)"
  text-accent-primary: "rgba(30, 210, 210, 1)"
  text-static-inverse: "rgba(20, 25, 30, 1)"
  interactive-primary-idle: "rgba(30, 210, 210, 1)"
  interactive-primary-hover: "rgba(150, 210, 210, 1)"
  interactive-primary-clic: "rgba(30, 160, 160, 1)"
  interactive-secondary-idle: "rgba(23, 27, 31, 1)"
  interactive-secondary-hover: "rgba(10, 35, 35, 1)"
  interactive-secondary-clic: "rgba(20, 25, 30, 1)"
  stroke-primary: "rgba(190, 210, 210, 0.5)"
  stroke-secondary: "rgba(190, 210, 210, 0.25)"
  feedback-positive: "rgba(0, 220, 130, 1)"
  feedback-alert: "rgba(255, 160, 0, 1)"
typography:
  hero:
    fontFamily: "Inter, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: "80px"
  title-xl:
    fontFamily: "Inter, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: "64px"
  title-l:
    fontFamily: "Inter, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: "50px"
  title-m:
    fontFamily: "Inter, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "40px"
  title-s:
    fontFamily: "Inter, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: "32.5px"
  title-xs:
    fontFamily: "Inter, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "25px"
  body-l:
    fontFamily: "Inter, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: "25px"
  body-m:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: "21.6px"
  body-s:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 300
    lineHeight: "16.2px"
  button-m:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: "19px"
  button-s:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "14px"
  caption-m:
    fontFamily: "Inter, sans-serif"
    fontSize: "12.8px"
    fontWeight: 300
    lineHeight: "16px"
rounded:
  none: "0px"
  xs: "8px"
  s: "16px"
  m: "20px"
  l: "32px"
  xl: "40px"
spacing:
  none: "0px"
  micro: "2px"
  nano: "4px"
  xxs: "6px"
  xs: "8px"
  ss: "12px"
  s: "16px"
  m: "24px"
  l: "32px"
  xl: "48px"
  xxl: "64px"
  huge: "80px"
  mega: "120px"
  hero: "160px"
components:
  button-loud:
    backgroundColor: "{colors.interactive-primary-idle}"
    textColor: "{colors.text-static-inverse}"
    typography: "{typography.button-m}"
    rounded: "{rounded.xs}"
    padding: "12px 16px"
  button-mute:
    backgroundColor: "{colors.interactive-secondary-idle}"
    textColor: "{colors.interactive-primary-idle}"
    typography: "{typography.button-m}"
    rounded: "{rounded.xs}"
    padding: "11px 15px"
  pill:
    backgroundColor: "{colors.surface-main}"
    textColor: "{colors.text-primary}"
    typography: "{typography.caption-m}"
    rounded: "{rounded.s}"
    padding: "6px 12px"
---
# Design System: David Montealegre portfolio

## Overview

This is an extraction of the existing system, not a new visual direction. Authority remains `css/tokens/figma.css` (Libreria_Q3-2026, October 9, 2026) and `css/components.css`; regenerate this record when those sources change. Dark surfaces, Inter, teal emphasis, and rounded image containers recur across the portfolio. No new creative metaphor is asserted.

**Key Characteristics:**
- Dark, tonal surfaces with bright teal interaction cues.
- Bold headings paired with light body copy.
- Existing portfolio imagery and shared controls.

## Colors

The frontmatter records default dark-theme values in their canonical RGBA format. Teal carries action and selected-state emphasis; pale text and translucent strokes establish hierarchy. Positive and alert colors belong to feedback, not new brand accents. The existing light-theme overrides remain in the token stylesheet and are not activated by the local comparison pages.

**The Source Authority Rule.** Resolve colors through the existing CSS custom properties; this document does not replace their source.

## Typography

Inter with a sans-serif fallback serves headings, body, and controls. The frontmatter records the reused desktop hierarchy; the canonical stylesheet also contains cover and CV roles, outside the scope of these Home variants. Bold titles and controls contrast with light body text. Variants cap paragraphs at 65 characters and use shorter introduction measures. Their hero tracking adjustment is local composition, not a replacement global token.

The existing small caption/control roles remain part of the incumbent source. Their presence is not a prescription to shrink new reading text.

## Layout

Canonical margins are defined for desktop, tablet, and mobile in the Figma token source. Layouts select those margins according to their own responsive rules; there is no single universal breakpoint map. Existing Home V2 uses changes at 1279, 999, and 767 px. The experimental variants use a 1600 px maximum main width, gutters from the existing spacing scale, and changes at 1600, 1100, and 767 px. See `docs/portfolio-variants.md` for the compositions; these experimental grids are not global tokens.

## Elevation & Depth

Shared controls and the local variants are flat: depth comes from tonal surfaces, fine strokes, image clipping, and spacing. No new shadow token is introduced. Legacy styles contain an isolated tablet shadow; it is not promoted into a reusable elevation scale.

## Shapes

The frontmatter preserves the existing radius vocabulary. Compact controls and fields use the smallest nonzero corner radius; pills and image containers use broader corners. Variants reduce large media corners on mobile using an existing radius step.

## Components

- **Buttons:** shared loud and mute variants provide filled teal and bordered dark treatments. Hover and pressed states resolve through existing interactive tokens. Keyboard focus uses an outlined accent ring with an offset. Disabled shared buttons suppress interaction and lower opacity. Local variants retain shared colors and add a short transform response rather than the canonical hover suffix.
- **Pills:** restrained labels use a tonal fill and thin stroke. Feedback variants use existing accent, positive, or alert tokens. This pattern is not a license to add decorative labels.
- **Fields:** the existing textarea has a transparent background, primary stroke, small rounded corners, and visible accent focus.
- **Navigation:** local variants use text links, a labeled two-option language control, and an in-flow comparison control. They wrap navigation below the logo on mobile. The canonical language control has a different image-based sliding treatment; the variant control does not replace it.
- **Media and articles:** image-first surfaces use existing portfolio assets, rounded clipping, and adjacent title/copy/action groups. Project detail disclosure uses native `details` and `summary`.

**The Motion Purpose Rule.** Respect reduced-motion preferences; new motion uses transform and opacity, and page transitions stay within 500 ms. Longer values present in the canonical token inventory are not approval for longer page transitions.

## Do's and Don'ts

### Do:
- Do reuse canonical token names and shared button states.
- Do preserve Inter, the existing palette, and the spacing and radius scales.
- Do preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- Don't turn an experimental Home composition into a global layout requirement.
- Don't invent replacement tokens or new brand accents for these variants.
- Don't treat isolated legacy overrides or audit allowances as new system rules.
