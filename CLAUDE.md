# flowwestfilms.de — rules for editing

## SEO prerender (do not skip)
The site is a no-build React app (Babel in the browser). Crawlers and AI bots
(Googlebot's first pass, GPTBot, ClaudeBot, PerplexityBot) do not run that JS,
so every route is shipped as prerendered static HTML:

- `_template.html` — the real source for `<head>` and script tags. Edit THIS, not index.html.
- `index.html` and `_pre/*.html` — GENERATED. Never edit by hand.
- `vercel.json` rewrites each route to `/_pre/<route>.html`.

After ANY change to page content, copy, routes or `_template.html`, regenerate before pushing:

    cd scripts/seo-prerender && npm install && npm run build

(Uses the installed Google Chrome.) Then commit the regenerated files with the change.

## New routes
Add the route in four places: app.jsx (switch + ROUTE_META), vercel.json rewrite
to `/_pre/<route>.html`, `ROUTES` in scripts/seo-prerender/prerender.mjs, and sitemap.xml.
