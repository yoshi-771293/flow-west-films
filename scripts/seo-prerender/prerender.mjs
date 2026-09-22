// Prerender flowwestfilms.de routes into static HTML so crawlers (Google, GPTBot,
// ClaudeBot, PerplexityBot) get real content instead of an empty JS shell.
// Usage: node prerender.mjs <siteDir> <outDir>
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const SITE = path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3]);
const NM = path.resolve(path.dirname(new URL(import.meta.url).pathname), "node_modules");
const ORIGIN = "https://flowwestfilms.de";

const ROUTES = [
  "home", "projects", "services", "social-media-ads", "search-ads", "content",
  "full-service", "ai-visibility-agentur", "about", "contact", "impressum", "datenschutz",
];

const CDN = {
  "react@18.3.1/umd/react.production.min.js": "react/umd/react.production.min.js",
  "react-dom@18.3.1/umd/react-dom.production.min.js": "react-dom/umd/react-dom.production.min.js",
  "@babel/standalone@7.29.0/babel.min.js": "@babel/standalone/babel.min.js",
  "three@0.128.0/build/three.min.js": "three/build/three.min.js",
  "gsap@3.12.5/dist/gsap.min.js": "gsap/dist/gsap.min.js",
  "gsap@3.12.5/dist/ScrollTrigger.min.js": "gsap/dist/ScrollTrigger.min.js",
  "@studio-freight/lenis@1.0.42/dist/lenis.min.js": "@studio-freight/lenis/dist/lenis.min.js",
  "hls.js@1.5.17/dist/hls.min.js": "hls.js/dist/hls.min.js",
};

// Files the device bridge couldn't copy — stubbed; they carry no crawlable content.
const STUBS = {
  "fx.js": "window.useMobileFX = function(){};",
  "tweaks-panel.jsx": `
    function useTweaks(d){ const [t,s]=React.useState(d); return [t,(k,v)=>s(p=>typeof k==='object'?{...p,...k}:{...p,[k]:v})]; }
    function TweaksPanel(){ return null; } function TweakSection(){ return null; }
    function TweakColor(){ return null; } function TweakRadio(){ return null; } function TweakToggle(){ return null; }
    Object.assign(window,{useTweaks,TweaksPanel,TweakSection,TweakColor,TweakRadio,TweakToggle});`,
};

const type = (p) => ({ ".js": "application/javascript", ".jsx": "application/javascript", ".css": "text/css", ".html": "text/html", ".png": "image/png", ".json": "application/json" }[path.extname(p)] || "application/octet-stream");

const CLOUD_CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH }
  : fs.existsSync(CLOUD_CHROME) ? { executablePath: CLOUD_CHROME }
  : { channel: "chrome" } // uses the installed Google Chrome on a Mac
);
const ctx = await browser.newContext({ locale: "de-DE", viewport: { width: 1440, height: 900 } });

await ctx.route("**/*", async (r) => {
  const u = new URL(r.request().url());
  if (u.hostname === "unpkg.com") {
    const key = u.pathname.slice(1);
    if (CDN[key]) return r.fulfill({ path: path.join(NM, CDN[key]), contentType: "application/javascript" });
    return r.abort();
  }
  if (u.origin === ORIGIN) {
    const p = decodeURIComponent(u.pathname);
    if (p.startsWith("/_vercel")) return r.fulfill({ body: "", contentType: "application/javascript" });
    const rel = p.replace(/^\//, "");
    if (STUBS[rel] && !fs.existsSync(path.join(SITE, rel))) return r.fulfill({ body: STUBS[rel], contentType: "application/javascript" });
    const f = path.join(SITE, rel);
    if (rel && fs.existsSync(f) && fs.statSync(f).isFile()) return r.fulfill({ path: f, contentType: type(f) });
    if (/\.(png|jpe?g|webp|mp4|svg|gif|woff2?)$/i.test(rel)) return r.fulfill({ status: 204, body: "" });
    return r.fulfill({ path: path.join(SITE, fs.existsSync(path.join(SITE, "_template.html")) ? "_template.html" : "index.html"), contentType: "text/html" }); // SPA fallback (unrendered template)
  }
  return r.abort(); // fonts, video CDN, analytics — not needed for content
});

fs.mkdirSync(OUT, { recursive: true });
for (const route of ROUTES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(ORIGIN + (route === "home" ? "/" : "/" + route), { waitUntil: "load" });
  await page.waitForSelector("#root #app", { timeout: 20000 });
  await page.waitForTimeout(2500); // let the DE i18n overlay + effects settle
  const html = await page.evaluate(() => {
    const root = document.getElementById("root");
    // reveal-on-scroll content must be visible in the snapshot
    root.querySelectorAll("[style*='opacity: 0']").forEach((el) => (el.style.opacity = ""));
    root.querySelectorAll("video").forEach((v) => v.removeAttribute("src"));
    return {
      title: document.title,
      desc: document.querySelector('meta[name="description"]').content,
      canonical: (document.querySelector('link[rel="canonical"]') || {}).href || "",
      body: root.innerHTML,
      text: root.innerText.length,
    };
  });
  fs.writeFileSync(path.join(OUT, route + ".json"), JSON.stringify(html));
  console.log(route.padEnd(24), "chars:", String(html.text).padStart(6), "|", html.title, errors.length ? "| ERR " + errors[0] : "");
  await page.close();
}
await browser.close();
