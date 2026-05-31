# German Language Overlay — Design Spec

**Date:** 2026-05-31
**Status:** Approved (user green-lit, proceeding to implementation)

## Goal

Add a German overlay on top of the existing English Flow West Films site (main
site + `/audit` sub-app). German is the default for all visitors. A single
`DE · EN` toggle swaps languages instantly, no reload, persisted in
`localStorage`. The existing English site is not modified (one sanctioned
content correction excepted — see below).

## Chosen approach: zero-touch English→German text map

The site is React (main site = React + Babel Standalone at runtime; audit =
Vite/React). React re-renders and remounts pages on navigation, so a one-shot
DOM text swap would be clobbered. Instead:

- A **phrase map** keys each English string to its German equivalent.
- A **controller** (plain JS, separate file) walks text nodes + a small set of
  text-bearing attributes (placeholder, aria-label, title, alt), swapping any
  node whose trimmed text is a key in the map. Originals are cached in a
  `WeakMap` so toggling back to English restores exactly.
- A **MutationObserver** re-applies after every React render / navigation
  (debounced via rAF; observer disconnected during our own writes to avoid
  loops).
- **No existing component file is edited.** Strings not in the map (typewriter
  words, dynamic text) are left alone automatically — this is how animated text
  is excluded.

Rejected alternative: `data-i18n` attributes on every element. Rejected because
it requires editing every component file (more invasive, contradicts the core
rule, easy to miss elements or tag an animated one).

## Language detection / persistence

- `localStorage["fwf-lang"]`: `"de"` | `"en"`. If absent → default `"de"`.
- `setLanguage(lang)`: persist, then apply (DE) or restore (EN) across document,
  update toggle UI. No reload.
- Anti-flash: in DE mode, hold content hidden ~1 frame until first translation
  pass completes; safety timeout (~1500ms) reveals regardless.

## Toggle button

Single segmented `DE · EN` control injected by the controller into the top nav
(right side, by the primary CTA). Built from existing button/nav classes — no
new visual style. Active language highlighted; click opposite half to switch.
Re-injected if React redraws the nav. Present on every page incl. audit +
results. (Any minor highlight styling injected as a scoped `fwf-lang-*` `<style>`
block by the controller — `styles.css` untouched.)

## Files

### Main site (`/Sites/flow-west-films/`)
- **NEW** `i18n/translations.js` — German map (body, nav, CTAs, offers, footer,
  FAQ, about, contact, attributes).
- **NEW** `i18n/i18n.js` — controller.
- **EDIT** `index.html` — +2 `<script>` tags + tiny inline anti-flash style. No
  existing line changed.
- **EDIT** `home.jsx` — sanctioned content fix only: Launch Film bullet
  `"Hero edit + cutdowns (60s, 30s, 15s, 6s)"` → `"Hero edit + cutdowns
  (60s, 30s)"`. (Other 5 bullets already match the corrected list.)
- UNTOUCHED: `shared.jsx`, `pages.jsx`, `app.jsx`, `tweaks-panel.jsx`,
  `styles.css`.

### Audit app (`/Documents/Claude/Projects/audit_feaure_landing_page/`)
- **NEW** `public/i18n/translations.js` — German for 21 questions, ~60 options,
  7 dimension labels + insights, UI labels, 8 result states.
- **NEW** `public/i18n/i18n.js` — controller (audit nav selector).
- **EDIT** `index.html` — +2 `<script>` tags. No existing line changed.
- UNTOUCHED: all `src/**`. Then `npm run build` → copy `dist` into main site
  `audit/` (built bundle files update — expected).

## Translation rules

- **Kept in English (both langs):** Storytelling, Content, Performance,
  Branding, Retargeting, Ad Creative, Reel, Briefing, Targeting, Funnel + similar
  industry-standard terms.
- **Never translated:** offer names (Launch Film, Creative Sprint, Growth
  Retainer, Premium Partner); "Flow West Films".
- **"Book a Call" → "Jetzt anfragen"** everywhere (arrows preserved). The two
  special audit-state CTAs keep extra meaning (translated fully).
- Hochdeutsch; professional/direct; reads as written-in-German. 8 result states
  use the user-supplied copy.
- Defaults: nav Home→Start, Projects→Projekte, Pricing→Preise, About→Über uns,
  Contact→Kontakt. Badges Most Popular→Beliebteste, Fastest→Am schnellsten,
  Partnership→Partnerschaft, Signature→stays "Signature".
- Impressum & Datenschutz already German → stay German in both modes.

## Known risk

Audit dimension-insight text (`scoring.js`) may be assembled from fragments. If
a string isn't a clean whole phrase, the text-map can't catch it; translate
whole phrases, handle assembled fragments explicitly, and report anything that
can't be cleanly mapped.

## Verification

- Local preview (python http.server) for main site; Vite preview/built copy for
  audit.
- Confirm: DE default on first load; toggle swaps instantly both ways;
  persistence across navigation + reload; typewriter spots never altered; CTAs
  all "Jetzt anfragen"; offer names + company name intact; button present on
  every page incl. audit + results; English fully restored on EN.
