// Assemble crawlable HTML per route from _template.html + prerender snapshots.
// Usage: node build.mjs <siteDir> <snapDir> <outDir>
// _template.html is the source of truth for <head>; index.html is GENERATED (home page).
import fs from "node:fs";
import path from "node:path";

const [SITE, SNAP, OUT] = process.argv.slice(2).map((p) => path.resolve(p));
const ORIGIN = "https://flowwestfilms.de";
const tplPath = fs.existsSync(path.join(SITE, "_template.html")) ? path.join(SITE, "_template.html") : path.join(SITE, "index.html");
const tpl = fs.readFileSync(tplPath, "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const ORG = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": ORIGIN + "/#business",
      name: "Flow West Films",
      url: ORIGIN + "/",
      logo: ORIGIN + "/assets/fwf-lockup.png",
      image: ORIGIN + "/assets/fwf-lockup.png",
      description: "Filmproduktion und Ad Creative aus Stuttgart: Werbefilme, Imagefilme, Social Media Ads und Performance Marketing für Mittelstand, E-Commerce und Autohäuser.",
      telephone: "+49 1573 7918515",
      email: "kotullaflorian@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "Neckarstraße 240", postalCode: "70190", addressLocality: "Stuttgart", addressRegion: "Baden-Württemberg", addressCountry: "DE" },
      geo: { "@type": "GeoCoordinates", latitude: 48.7926, longitude: 9.2071 },
      areaServed: [{ "@type": "City", name: "Stuttgart" }, { "@type": "State", name: "Baden-Württemberg" }, { "@type": "Country", name: "Deutschland" }, { "@type": "Country", name: "Österreich" }, { "@type": "Country", name: "Schweiz" }],
      founder: { "@id": ORIGIN + "/#founder" },
      knowsAbout: ["Werbefilm", "Imagefilm", "Videoproduktion", "Ad Creative", "Meta Ads", "Social Media Ads", "Performance Marketing", "KI-Sichtbarkeit", "Autohaus Marketing"],
      sameAs: ["https://www.facebook.com/flowwest/", "https://www.linkedin.com/in/florian-kotulla/"],
    },
    {
      "@type": "Person",
      "@id": ORIGIN + "/#founder",
      name: "Florian Kotulla",
      jobTitle: "Gründer & Creative Director",
      worksFor: { "@id": ORIGIN + "/#business" },
      sameAs: ["https://www.linkedin.com/in/florian-kotulla/"],
    },
    { "@type": "WebSite", "@id": ORIGIN + "/#website", url: ORIGIN + "/", name: "Flow West Films", inLanguage: "de-DE", publisher: { "@id": ORIGIN + "/#business" } },
  ],
};

fs.mkdirSync(path.join(OUT, "_pre"), { recursive: true });
for (const f of fs.readdirSync(SNAP).filter((f) => f.endsWith(".json"))) {
  const route = f.replace(".json", "");
  const s = JSON.parse(fs.readFileSync(path.join(SNAP, f), "utf8"));
  const url = ORIGIN + (route === "home" ? "/" : "/" + route);
  let html = tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(s.desc)}" />\n  <link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(s.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(s.desc)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace("<!-- Fonts -->", `<script type="application/ld+json">${JSON.stringify(ORG)}</script>\n\n  <!-- Fonts -->`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${s.body}</div>`);
  const dest = route === "home" ? path.join(OUT, "index.html") : path.join(OUT, "_pre", route + ".html");
  fs.writeFileSync(dest, html);
  console.log(route.padEnd(24), (html.length / 1024).toFixed(0) + "KB", "->", path.relative(OUT, dest));
}
