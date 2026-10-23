# Portfolio analytics

## Footer, copy and entrance motion — October 15

Latest Figma `4935:82144` revision supersedes the disclosure behavior below: the footer now reads “Uso cookies para entender qué páginas y proyectos generan más interés. Puedes cambiar tus preferencias en cualquier momento.” with the inline preference link (EN equivalent). The strip is appended inside the existing page footer where available, with a top stroke and Caption S on tablet/mobile. Updated Home footer credit/icon sizing follows the current tablet/mobile Footer reference in frames `4627:2581` / `4644:9440`. No new assets; existing Codex SVG reused.

The banner now says “Ayúdame a mejorar mi portafolio” / “Este sitio web usa cookies para medir las vistas, los clics y cómo las personas encuentran este sitio. Puedes navegar sin aceptar.” (EN equivalent). Reopening uses the same compact banner without expanding the old disclosure. Merely opening it does not change consent.

Motion source: `4938:84736` desktop, `4941:86343` and `4941:86363` tablets, `4938:84718` mobile. The generated keyframe values/easings are retained: opacity 0→1 over 400ms using cubic-bezier(.5,0,.5,1), offset 40px→0 over 600ms using cubic-bezier(.05,.7,.1,1). Horizontal entrance from the right above mobile; vertical entrance from below on mobile. Source timeline lengths are 1s desktop/mobile and 2.5s tablets, including the final hold. Preview loops are applied once per actual banner opening, rather than repeatedly reappearing during reading. No invented exit animation. Only transform/opacity animate; reduced-motion disables both. CSS visibility restarts the entrance on reopening.

Local Chrome checks passed at 0/200/400/600/3000ms for all four resolutions, including final held visibility, single iteration, reduced motion, footer reopening, consent rejection/acceptance/withdrawal and no Google collection before consent. Google collection was intercepted, not sent to the live property. No deploy was performed.

## Current consent design — October 15, Figma 4935:82144

This revision supersedes the earlier typography and fixed mobile-width notes below. Implemented from high-fidelity panels `4938:84736`, `4938:84727`, `4938:84709`, `4938:84718`: 500px panel above mobile, 95vw capped at 500px on mobile, secondary background, no border, Radius S 16px, 32px padding, 12px vertical gap, Title XS 20/25, Body S 12/16.2 and Button S 12/14 across resolutions. Buttons share the row with a 16px gap and a 38px height. Desktop/tablet offsets are 20px; mobile offsets are 2.5vw (9px at the 360px reference). Below 360px, padding reduces to 16px to prevent overflow.

The initial panel follows the new title/body/two-button composition with “Reject cookies / Accept cookies” and Spanish “Rechazar cookies / Aceptar cookies”. Detailed disclosure remains available by reopening Privacy settings, which reveals and expands the existing details. Consent, withdrawal and event behavior are unchanged. QA checks geometry, typography and consent lifecycle with Google collection intercepted; real ingestion remains a post-deployment check.

Implemented locally on October 14, 2026. Not deployed or verified against the live GA4 property.

Consent visual update on October 15: reuses the existing `btn btn--loud`, `btn btn--mute` and `text-link` components, verified against Libreria_Q3-2026 Units `15:806`, `15:810`, `15:1002`. The panel composes existing surface/stroke/radius/spacing and Title XS/Body M/Caption M tokens. No new library modal was found in the focused search; the panel remains a non-blocking region. Desktop actions share a row; mobile actions stack at full width. Consent behavior is unchanged. Local Chrome QA passed for computed button styles, EN/ES, mobile expanded details and consent lifecycle.

Responsive typography correction, October 15: desktop >=1280 uses Title S 26/32.5, Body L 18/25 and Button M 16/19; tablet 768–1279 uses Title XS 20/25, Body M 16/21.6 and Button S 12/14; mobile <768 uses Title XS 20/25, Body S 12/16.2 and Button S 12/14. Disclosure copy/links use Caption M 12.8/16 above mobile and Caption S 10/12.5 on mobile. Summary and privacy-settings control follow the corresponding button scale. Existing semantic tokens are reused. Computed font sizes/line heights and panel bounds passed at 1440, 1280, 1279, 1024, 768, 767, 390 and 320px.

Mobile action layout updated at David's request on October 15: replaces the stacked layout above with two fixed-width 120px buttons in one horizontal row, 8px apart. Panels below 360px use 16px padding to retain the row without overflow. Geometry and text bounds verified through 320px.

- Measurement ID: `G-45WX56R7RB` (public configuration, not a secret).
- Shared entry point: `js/analytics.js`, loaded once per public HTML document with `defer`.
- Basic consent: no Google script/request until explicit opt-in. Advertising consent and Google signals remain disabled.
- Consent choice: `portfolio-analytics-consent-v1` in localStorage, valid for 180 days; rejection and acceptance have equal controls. Storage failure falls back to consent for the current page only. Privacy settings at the bottom reopen the notice; withdrawal disables GA, removes first-party GA cookies and reloads to unload Google's code. Other open tabs observe storage changes.
- EN/ES copy follows the document language, including subsequent language changes.
- Production collection requires HTTPS and the exact apex or www domain. localhost and previews show the consent UI but never load GA4.
- Only explicitly listed public paths are measured. Case-study routes, component previews and unknown/404 paths are excluded; protected-case analytics awaits server authentication and content authorization.
- One explicit page_view per document after acceptance. Known public paths, campaign-only query vocabulary and origin-only referrers avoid forwarding arbitrary URL data. Campaign values must use letters, numbers, underscores or hyphens, start with a letter and be at most 80 characters. Never put personal data in campaign names.
- `site_version=v2` is sent. Register the custom dimension in GA4 if needed for reports.

## Required GA4 configuration before deployment

**Keep Enhanced measurement off for this initial release.** David disabled it on October 14 and the unchecked switch was verified in the account. Its automatic outbound/form/search/history events can collect parameters outside this module's controlled payloads. The Web module cannot change that property setting.

## Interaction events implemented October 14

| Event | Controlled parameters | Meaning |
|---|---|---|
| `case_select` | `case_id`, `destination_status` | Project CTA activation, not successful case access. Status is `case_link` or `pending` (unavailable case dialog). |
| `contact_click` | `contact_method` | Email, WhatsApp or LinkedIn action; not a received message. |
| `schedule_click` | `contact_method=adplist` | Open scheduling profile; not a confirmed booking. |
| `cv_open` | `cv_language` | Activate the EN/ES PDF link; not proof of download completion. |
| `navigation_click` | `section_id` | Activate a known section link; not proof the section was read. |
| `article_select` | `article_id` | Activate a known article link. |

All interactions include `placement`, `content_language`, `page_path`, `site_version`. Language reflects the site's EN/ES choice; CV language follows the actual PDF URL. Placement values include hero/footer/drawer/header/project_card/about/articles/navigation/content. Case IDs are `registro_ml`, `motion_level`, `accounts_minors_mexico`, `country_switch`, matching existing V2 cards without changing editorial scope.

One delegated capture handler records clicks (including keyboard activation) and middle-button activations without cancelling or delaying navigation. Hidden/inert/disabled controls and privacy-notice links are excluded. No interactions before opt-in are queued or replayed after acceptance. Event parameters do not include raw hrefs, anchor text, personal names, email addresses, phone numbers, message bodies or PDF paths. Same production/public-path/consent guards apply as for page views.

No `case_open`, `meeting_booked` or `generate_lead` is fabricated. Case interior analytics requires real server authentication; confirmed meetings require provider integration. Video/scroll/section-view measurement is not included.

Nine event-scoped custom dimensions were created and verified in GA4 property `559067098` on October 14: Proyecto (`case_id`), Canal de contacto (`contact_method`), Ubicación del enlace (`placement`), Idioma del contenido (`content_language`), Idioma del CV (`cv_language`), Estado del destino (`destination_status`), Sección de navegación (`section_id`), Artículo (`article_id`) and Versión del sitio (`site_version`).

`contact_click` and `schedule_click` were created using the **code** method and marked as key events in GA4, without URL-based event duplication. They represent contact/scheduling **intent**, not qualified leads or booked meetings. Existing default purchase/lead key events were left as found; this code does not emit them. No advertising integrations or monetary conversion values were configured. Internal/developer filters and privacy/retention settings still need review before launch.

## Verification

Interaction QA passed in local Chrome with Google intercepted: 13 controlled interactions covering all four project cards (including pending destinations), three contact methods, ADPlist, EN/ES PDF links, section navigation, article selection and a dynamically inserted contact link. Nested element clicks emitted one event, payloads excluded email/phone/link labels/URL secrets, and rejected consent and localhost emitted no interactions. No JavaScript errors were observed. These tests validate queued commands; real Google ingestion is still pending deployment.

Local Chrome QA passed on October 14, 2026 with Google endpoints intercepted: no requests before consent or after rejection; a single script/page_view after acceptance; sanitized URL; persistence; cookie clearing and reload on withdrawal; EN/ES; 390px consent panel; privacy controls on a mobile article; localhost exclusion; five public documents; 404/case exclusion. No page JavaScript errors were observed. Live Google library behavior and GA4 ingestion still require production verification after the configuration step above.

Use a browser with Google endpoints intercepted for local QA. Map the production origin to local files in the test harness to exercise the hostname guard without changing DNS or sending test traffic to GA4. Check unknown/rejected consent sends no Google requests; acceptance requests gtag exactly once; a single sanitized page_view is queued; repeat acceptance does not duplicate it; local/preview and case URLs never load it; language switching and narrow screens remain usable; withdrawal clears cookies and prevents later loading. Such checks validate the integration locally, not GA4 ingestion.

After deployment, accept analytics on the real domain and confirm receipt in Realtime/DebugView. The Google installation test can report missing measurement before deployment or without consent. Do not bypass consent merely to satisfy that test.

The private project strategy contains the full UTM, opportunity tracking and launch plan. This implementation does not publish cases, change DNS or deploy the portfolio.
