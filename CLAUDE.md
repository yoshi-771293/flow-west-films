# flowwestfilms.de — rules for editing

## SEO prerender (do not skip)
The site is a no-build React app (Babel in the browser). Crawlers and AI bots
(Googlebot's first pass, GPTBot, ClaudeBot, PerplexityBot) do not run that JS,
so every route is shipped as prerendered static HTML:

- `_template.html` — the real source for `<head>` and script tags. Edit THIS, not index.html.
- `index.html`, `_pre/*.html` and `sitemap.xml` — GENERATED. Never edit by hand.
- `vercel.json` rewrites each route to `/_pre/<route>.html`.

After ANY change to page content, copy, routes or `_template.html`, regenerate before pushing:

    cd scripts/seo-prerender && npm install && npm run build

(Uses the installed Google Chrome.) Then commit the regenerated files with the change.

## New routes
Add the route in four places: app.jsx (switch + ROUTE_META), vercel.json rewrite
to `/_pre/<route>.html`, `ROUTES` in scripts/seo-prerender/prerender.mjs, and `PAGES` in
scripts/seo-prerender/sitemap.mjs (with the source the page's `<lastmod>` comes from).
sitemap.xml is written by the build: lastmod = last git commit touching that page's source.

## Blog
Posts live in `blog-data.js` (one object per post) and render via `blog.jsx` at `/blog/<slug>`.
`scripts/seo-prerender` reads `blog-data.js`, so routes and schema (BlogPosting + FAQPage) follow automatically.
For each new post also add a rewrite in vercel.json (`/blog/<slug>` -> `/_pre/blog__<slug>.html`). Then rebuild (the sitemap entry is generated).
Voice: German, "Du", short declarative sentences. Price ranges are fine in posts; the site pages stay price-free.

## Projects / videos
All project videos live in `projects-data.js` (window.FWF_PROJECTS, plus upload dates and
running times). Each one gets a watch page at `/projects/<slug>` (one video per page, so Google
can index it) with a VideoObject built in scripts/seo-prerender/build.mjs. Routes, rewrite
(`/projects/:slug`) and sitemap entries follow automatically. Keep slugs stable; for a new video
add its upload date to FWF_VIDEO_ADDED and its size/running time to FWF_VIDEO_META.
