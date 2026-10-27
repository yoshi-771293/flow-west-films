// Write sitemap.xml with an accurate <lastmod> per URL: the date of the last git
// commit that changed that page's own source (its component, config block or data
// entry), or today if that source has uncommitted changes.
// Usage: node sitemap.mjs <siteDir>
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const SITE = path.resolve(process.argv[2]);
const ORIGIN = "https://flowwestfilms.de";
const TODAY = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" }); // YYYY-MM-DD
const git = (...args) => execFileSync("git", args, { cwd: SITE, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

// A source is a whole file/dir, a top-level declaration (function/const NAME), or the
// "  {"..."  }," object literal in a data array/map that has `marker` as one of its lines.
const file = (f) => ({ f });
const decl = (f, name) => ({ f, start: new RegExp("^(?:function|const) " + name + "\\b"), end: /^[}\]]/ });
const block = (f, marker) => ({ f, marker });

function lineRange(text, src) {
  const lines = text.split("\n");
  let s = -1, e = -1;
  if (src.start) {
    s = lines.findIndex((l) => src.start.test(l));
    if (s >= 0) e = lines.findIndex((l, i) => i > s && src.end.test(l));
  } else {
    const m = lines.findIndex((l) => l.trim() === src.marker || l.trim() === src.marker + ",");
    if (m >= 0) {
      for (s = m; s >= 0 && !/^ {2}(?:"[^"]+": )?\{\s*$/.test(lines[s]); s--);
      // stop before the closing "}," so adding a comma when an entry is appended doesn't count
      e = lines.findIndex((l, i) => i > m && /^ {2}\},?\s*$/.test(l)) - 1;
    }
  }
  return s >= 0 && e >= s ? [s + 1, e + 1] : null; // 1-based, inclusive
}

function sourceDate(src) {
  if (!src.start && !src.marker) {
    const dirty = git("status", "--porcelain", "--", src.f);
    return dirty ? TODAY : git("log", "-1", "--format=%cs", "--", src.f);
  }
  const work = fs.readFileSync(path.join(SITE, src.f), "utf8");
  let head = "";
  try { head = git("show", "HEAD:" + src.f); } catch {}
  const w = lineRange(work, src), h = head ? lineRange(head, src) : null;
  if (!w) throw new Error("sitemap: source not found: " + src.f + " " + (src.marker || src.start));
  const slice = (t, [a, b]) => t.split("\n").slice(a - 1, b).join("\n");
  if (!h || slice(work, w) !== slice(head, h)) return TODAY; // new or changed, not committed yet
  return git("log", "-1", "--format=%cs", "--no-patch", "-L", h[0] + "," + h[1] + ":" + src.f);
}

const load = (f) => { const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(SITE, f), "utf8"), sb); return sb.window; };
const posts = load("blog-data.js").FWF_POSTS || [];
const projects = load("projects-data.js").FWF_PROJECTS || [];

// [path, priority, sources]
const PAGES = [
  ["/", "1.0", [file("home.jsx")]],
  ["/services", "0.9", [decl("pages.jsx", "PricingPage"), decl("pages.jsx", "FAQ"), decl("home.jsx", "OfferCard"), decl("home.jsx", "OFFERS")]],
  ["/social-media-ads", "0.9", [decl("pages.jsx", "MetaAdsPage")]],
  ["/search-ads", "0.9", [decl("pages.jsx", "GoogleAdsPage")]],
  ["/full-service", "0.9", [decl("pages.jsx", "FullServicePage")]],
  ["/ki-videoproduktion", "0.9", [decl("pages.jsx", "AiVideoPage")]],
  ["/werbefilm-stuttgart", "0.9", [block("pages.jsx", '"werbefilm-stuttgart": {')]],
  ["/imagefilm-stuttgart", "0.9", [block("pages.jsx", '"imagefilm-stuttgart": {')]],
  ["/produktvideo-stuttgart", "0.9", [block("pages.jsx", '"produktvideo-stuttgart": {')]],
  ["/ai-visibility-agentur", "0.9", [decl("pages.jsx", "AiVisibilityPage")]],
  ["/audit/", "0.8", [file("audit")]],
  ["/projects", "0.8", [decl("pages.jsx", "ProjectsLabPage"), decl("pages.jsx", "ProjectIndex"), file("projects-data.js")]],
  ["/about", "0.7", [decl("pages.jsx", "AboutPage")]],
  ["/contact", "0.7", [decl("pages.jsx", "ContactPage")]],
  ["/impressum", "0.3", [decl("pages.jsx", "ImpressumPage")]],
  ["/datenschutz", "0.3", [decl("pages.jsx", "DatenschutzPage")]],
  ["/blog", "0.8", [decl("blog.jsx", "BlogIndexPage"), file("blog-data.js")]],
  ...posts.map((p) => ["/blog/" + p.slug, "0.7", [block("blog-data.js", 'slug: "' + p.slug + '"')]]),
  ...projects.map((p) => ["/projects/" + p.slug, "0.6", [decl("pages.jsx", "ProjectWatchPage"), block("projects-data.js", 'slug: "' + p.slug + '"')]]),
];

const seen = new Set();
const urls = PAGES.map(([loc, priority, sources]) => {
  if (seen.has(loc)) throw new Error("sitemap: duplicate " + loc);
  seen.add(loc);
  const lastmod = sources.map(sourceDate).filter(Boolean).sort().pop();
  return `  <url>\n    <loc>${ORIGIN}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n    <changefreq>monthly</changefreq>\n  </url>`;
});
fs.writeFileSync(path.join(SITE, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
console.log("sitemap.xml:", urls.length, "URLs");
