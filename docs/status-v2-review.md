# Status pages V2 — October 13, 2026

Implemented Figma section `4851:5914`: construction frames `4851:9119`, `4851:9137`, `4851:9129` and 404 frames `4854:10484`, `4854:10592`, `4854:10539`.

Both pages use the native grayscale illustrations, a 70px header with a 59 × 52px logo, deep background, centered content, shared primary button and Codex footer. Titles use Hero 72/80 desktop, XL 56/64 tablet and L 40/50 mobile. Body uses M 16/21.6 Light. Main top/bottom padding follows 120px desktop, 48px tablet and 80px mobile. Footer uses Caption L desktop, Caption M tablet and Caption S mobile.

The native 160 × 125px construction illustration is exported as one asset, preserving its masks and vector composition. The 432.413 × 94.605px disconnected-cable SVG keeps its native size and is clipped at the mobile viewport edges as in Figma.

Reused the native motion snippets for illustration, title and message, with one entrance per visit instead of the design demonstration loop; only transform and opacity animate. Reduced-motion preference displays content immediately. Language follows the Home preference or explicit `lang` parameter, and return links retain that language. Root-relative 404 resources support missing URLs at any depth.

Verified both languages at 1366×768, 1024×600, 768×800 and 360×800: visible header/main/footer, correct title tokens, loaded local artwork, footer at the viewport bottom, no horizontal overflow, and valid Home destinations. JavaScript syntax and whitespace checks pass.

## Status-page regression fix

The local server previously returned a generic “Not found” body for missing routes even though `/404.html` existed. Missing paths now return the designed 404 document with HTTP 404 and an HTML content type; root-relative assets work for nested missing URLs.

The construction/404 body and return button no longer start at opacity zero. Their translation entrance remains, while the explanatory text is visible immediately. Refreshed the motion stylesheet cache version on both pages and restarted the local server. Verified visibility during initial load and the real 404 response from missing root and nested URLs.

The user's Chrome tab exposed a separate inherited language-entrance rule that set paragraph/button opacity to zero when `html` lacked `language-entered`. The status pages now declare that class in their static HTML so fallback copy remains visible before or without JavaScript. Earlier reduced-motion checks bypassed this global rule; normal-motion regression checks now inspect the paragraph and button themselves.

Restored the native message opacity track after isolating the language gate: body/button remain hidden through 400ms, fade in over the next 400ms, and finish their translation at 1000ms. Illustration and title retain their earlier staggered tracks. All three run once on load; reduced motion reveals the content immediately. The `language-entered` fix prevents the paragraph/button themselves from remaining hidden after their parent finishes animating.
