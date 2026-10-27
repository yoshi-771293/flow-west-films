// Assemble crawlable HTML per route from _template.html + prerender snapshots.
// Usage: node build.mjs <siteDir> <snapDir> <outDir>
// _template.html is the source of truth for <head>; index.html is GENERATED (home page).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

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

// Route-specific schema (in addition to the org graph on every page).
const faq = (pairs) => ({ "@type": "FAQPage", mainEntity: pairs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
const EXTRA = {
  "ki-videoproduktion": [
    {
      "@type": "Service",
      name: "KI-Videoproduktion",
      alternateName: ["AI Video Production", "KI-Werbefilm", "AI Werbefilm", "KI UGC Videos", "AI Influencer Video"],
      serviceType: "KI-Videoproduktion",
      provider: { "@id": ORIGIN + "/#business" },
      areaServed: ["Stuttgart", "Deutschland", "Österreich", "Schweiz"],
      url: ORIGIN + "/ki-videoproduktion",
      description: "Cinematische KI-Werbefilme, Produktfilme, UGC- und AI-Influencer-Videos, hybride Produktionen und laufende Ad Creatives — inszeniert von Filmemachern, nicht nur generiert.",
    },
    faq([
      ["Was ist KI-Videoproduktion?", "Filme mit generativer KI produzieren — statt oder zusätzlich zu einem Kamerateam. Szenen, Produkte und Locations entstehen Shot für Shot und werden dann geschnitten, gegradet und vertont."],
      ["Was kostet ein KI-Werbefilm?", "Das hängt von Länge, Anzahl der Szenen und Varianten ab. In der Regel liegt es deutlich unter einem vergleichbaren Realdreh, weil Set, Crew und Reisen wegfallen. Flow West Films erstellt nach einem 30-minütigen Call ein Festpreisangebot."],
      ["Wie lange dauert ein KI-Werbefilm?", "Ein einzelnes KI-Ad-Creative dauert meist wenige Tage, ein vollständiger Werbefilm mit Skript, Look Development und Korrekturschleifen meist ein bis zwei Wochen."],
      ["Kann man KI mit echtem Footage kombinieren?", "Ja. Flow West Films dreht, was echt sein muss — Menschen, Produkt, Räume — und nutzt KI für alles, was teuer, gefährlich oder unmöglich zu drehen wäre."],
      ["Wo sitzt Flow West Films?", "In Stuttgart. KI-Produktion läuft komplett remote für Marken in ganz Deutschland, Österreich und der Schweiz."],
      ["Was sind UGC- und AI-Influencer-Videos?", "Vertikale Videos, die sich im Feed natürlich anfühlen — eine Person spricht in die Kamera, zeigt oder bewertet ein Produkt. Statt Creator zu buchen und Produkte zu versenden, generieren und inszenieren wir die Performance mit KI — Sie erhalten schnell viele Varianten. KI-generierte Inhalte kennzeichnen wir dort, wo die Plattformen es verlangen."],
      ["Übernehmen Sie auch das Media Buying?", "Bei diesem Angebot nicht. Wir liefern das Creative, Sie setzen es in Ihrem eigenen Media Buying oder bei Ihrer Agentur ein. Wenn Sie ein Team für beides wollen, ist das unser Full Service."],
      ["Wie sieht es mit den Nutzungsrechten aus?", "Volle Nutzungsrechte für Paid, Organic, Sales und interne Nutzung — wie bei allem, das wir produzieren."],
    ]),
  ],
};

// Blog: posts come from blog-data.js -> BlogPosting + FAQPage schema per post, Blog schema on /blog.
{
  const sb = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(SITE, "blog-data.js"), "utf8"), sb);
  const posts = sb.window.FWF_POSTS || [];
  EXTRA["blog"] = [{
    "@type": "Blog", "@id": ORIGIN + "/blog#blog", url: ORIGIN + "/blog", name: "Flow West Films Blog", inLanguage: "de-DE",
    publisher: { "@id": ORIGIN + "/#business" },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: ORIGIN + "/blog/" + p.slug, datePublished: p.date })),
  }];
  for (const p of posts) {
    EXTRA["blog/" + p.slug] = [
      {
        "@type": "BlogPosting", headline: p.title, description: p.metaDesc, inLanguage: "de-DE",
        datePublished: p.date, dateModified: p.date,
        mainEntityOfPage: ORIGIN + "/blog/" + p.slug,
        author: { "@id": ORIGIN + "/#founder" }, publisher: { "@id": ORIGIN + "/#business" },
      },
      faq(p.faq),
    ];
  }
}

// Project watch pages: exactly one VideoObject per /projects/<slug> (German, like the page).
{
  const sb = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(SITE, "i18n/translations.js"), "utf8"), sb);
  vm.runInNewContext(fs.readFileSync(path.join(SITE, "projects-data.js"), "utf8"), sb);
  const W = sb.window;
  const de = (W.FWF_TRANSLATIONS || {}).de || {};
  const abs = (u) => (/^https?:/.test(u) ? u : ORIGIN + "/" + u.replace(/^\//, ""));
  const iso = (secs) => "PT" + (secs >= 60 ? Math.floor(secs / 60) + "M" : "") + (secs % 60) + "S";
  const missing = [];
  for (const p of W.FWF_PROJECTS) {
    const key = p.client + "·" + p.title;
    const meta = W.FWF_VIDEO_META[key] || {};
    const added = W.FWF_VIDEO_ADDED[key];
    const url = ORIGIN + "/projects/" + p.slug;
    const v = {
      "@type": "VideoObject", "@id": url + "#video",
      name: W.FWF_WATCH.title(p, "de"),
      description: de[p.desc] || p.desc,
      thumbnailUrl: p.thumb ? abs(p.thumb) : undefined,
      uploadDate: added ? added + "T12:00:00+02:00" : undefined,
      duration: meta.secs ? iso(meta.secs) : undefined,
      inLanguage: "de-DE",
      mainEntityOfPage: url,
      publisher: { "@id": ORIGIN + "/#business" },
    };
    const bunny = (p.video || "").match(/\/embed\/684848\/([0-9a-f-]{36})/);
    const yt = (p.video || "").match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    if (bunny) { v.contentUrl = "https://vz-fd89cb27-622.b-cdn.net/" + bunny[1] + "/playlist.m3u8"; v.embedUrl = "https://iframe.mediadelivery.net/embed/684848/" + bunny[1]; }
    else if (yt) v.embedUrl = "https://www.youtube.com/embed/" + yt[1];
    else v.contentUrl = abs(p.video);
    if (!v.thumbnailUrl || !v.uploadDate) missing.push(p.slug + (v.thumbnailUrl ? "" : " (no thumbnail)") + (v.uploadDate ? "" : " (no upload date)"));
    EXTRA["projects/" + p.slug] = [v];
  }
  if (missing.length) console.warn("VideoObject incomplete:", missing.join(", "));
}

fs.mkdirSync(path.join(OUT, "_pre"), { recursive: true });
for (const f of fs.readdirSync(SNAP).filter((f) => f.endsWith(".json"))) {
  const route = f.replace(".json", "").replace(/__/g, "/");
  const s = JSON.parse(fs.readFileSync(path.join(SNAP, f), "utf8"));
  const url = ORIGIN + (route === "home" ? "/" : "/" + route);
  let html = tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(s.desc)}" />\n  <link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(s.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(s.desc)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace("<!-- Fonts -->", `<script type="application/ld+json">${JSON.stringify(EXTRA[route] ? { ...ORG, "@graph": [...ORG["@graph"], ...EXTRA[route]] } : ORG)}</script>\n\n  <!-- Fonts -->`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${s.body}</div>`);
  const dest = route === "home" ? path.join(OUT, "index.html") : path.join(OUT, "_pre", route.replace(/\//g, "__") + ".html");
  fs.writeFileSync(dest, html);
  console.log(route.padEnd(24), (html.length / 1024).toFixed(0) + "KB", "->", path.relative(OUT, dest));
}
