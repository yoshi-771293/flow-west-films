/* global React, ReactDOM, useRoute, Nav, Footer, HomePage, ProjectsPage, ProjectsLabPage, PricingPage, AboutPage, ContactPage, ImpressumPage, DatenschutzPage, MetaAdsPage, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle */
const { useState: useStateA, useEffect: useEffectA } = React;

// ============================================
// Tweak defaults
// ============================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#ff2d78",
  "secondaryAccent": "#9b30ff",
  "displayFont": "Cormorant Garamond",
  "bodyFont": "Syne",
  "showGrid": true,
  "gridDensity": "normal"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  ["#ff2d78", "#9b30ff"],
  ["#9b30ff", "#00ff88"],
  ["#00ff88", "#ff6420"],
  ["#ff6420", "#ff2d78"],
  ["#c9a96e", "#9b30ff"],
];

const DISPLAY_FONTS = ["Cormorant Garamond", "Playfair Display", "Fraunces"];
const BODY_FONTS = ["Syne", "Outfit", "Inter"];

// ============================================
// Per-route SEO metadata (DE + EN)
// Keep in sync with the route switch below and the rewrites in vercel.json.
// ============================================
const ROUTE_META = {
  home: {
    de: { title: "Flow West Films — Premium Ad Creative & Cinematic Production", desc: "Premium Ad Creative & cinematische Filmproduktion für Mittelstandsmarken, die skalieren wollen. Studio in Stuttgart." },
    en: { title: "Flow West Films — Premium Ad Creative & Cinematic Production", desc: "Premium ad creative & cinematic film production for B2C brands that want to scale. Studio in Stuttgart." },
  },
  projects: {
    de: { title: "Projekte — Flow West Films", desc: "Ausgewählte Arbeiten: Ad Creatives, Brand Films, Reels und Produktionen für Marken aus Hospitality, Sport und Consumer Goods." },
    en: { title: "Projects — Flow West Films", desc: "Selected work: ad creatives, brand films, reels and productions for brands across hospitality, sport and consumer goods." },
  },
  "projects-classic": {
    de: { title: "Projekte — Flow West Films", desc: "Ausgewählte Arbeiten: Ad Creatives, Brand Films, Reels und Produktionen für Marken aus Hospitality, Sport und Consumer Goods." },
    en: { title: "Projects — Flow West Films", desc: "Selected work: ad creatives, brand films, reels and productions for brands across hospitality, sport and consumer goods." },
  },
  pricing: {
    de: { title: "Preise & Angebote — Flow West Films", desc: "Vier Wege der Zusammenarbeit: Launch Film, Creative Sprint, Growth Retainer und Premium Partner. Keine versteckten Kosten, keine Knebelverträge." },
    en: { title: "Pricing & Offers — Flow West Films", desc: "Four ways to work with us: Launch Film, Creative Sprint, Growth Retainer and Premium Partner. No hidden fees, no lock-ins." },
  },
  "meta-ads-agentur": {
    de: { title: "Meta Ads Agentur Stuttgart — Flow West Films", desc: "Volles Meta-Ads-Management: Strategie, Creative, Audiences und Scaling — geführt vom selben Team, das auch den Film dreht." },
    en: { title: "Meta Ads Agency Stuttgart — Flow West Films", desc: "Full Meta Ads management: strategy, creative, audiences and scaling — run by the same team that shoots the film." },
  },
  about: {
    de: { title: "Über uns — Flow West Films", desc: "Gegründet von Florian Kotulla in Stuttgart. Filmemacher, Creative Director und Performance-Marketing-Denker in einer Person." },
    en: { title: "About — Flow West Films", desc: "Founded by Florian Kotulla in Stuttgart. Filmmaker, creative director and performance marketing thinker in one." },
  },
  contact: {
    de: { title: "Kontakt — Flow West Films", desc: "Erzählen Sie uns von Ihrer Marke. 30-minütiges Strategiegespräch, kein Druck. Stuttgart und remote in ganz Europa." },
    en: { title: "Contact — Flow West Films", desc: "Tell us about your brand. A 30-minute strategy call, no pressure. Stuttgart and remote across Europe." },
  },
  impressum: {
    de: { title: "Impressum — Flow West Films", desc: "Impressum und Anbieterkennzeichnung der Flow West Films, Stuttgart." },
    en: { title: "Impressum — Flow West Films", desc: "Legal notice and provider identification for Flow West Films, Stuttgart." },
  },
  datenschutz: {
    de: { title: "Datenschutz — Flow West Films", desc: "Datenschutzerklärung der Flow West Films nach DSGVO." },
    en: { title: "Privacy Policy — Flow West Films", desc: "Flow West Films privacy policy under GDPR." },
  },
};

// ============================================
// App
// ============================================
function App() {
  const [route] = useRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  window.useMobileFX(route); // mobile-only scroll animations (fx.js); no-op on desktop

  // bump on language toggle so route meta re-renders in the active language
  const [langTick, setLangTick] = useStateA(0);
  useEffectA(() => {
    const onLang = () => setLangTick((n) => n + 1);
    window.addEventListener("fwf-lang-change", onLang);
    return () => window.removeEventListener("fwf-lang-change", onLang);
  }, []);

  // Apply tweaks to CSS vars
  useEffectA(() => {
    const root = document.documentElement;
    const [primary, secondary] = Array.isArray(tweaks.accentColor) ? tweaks.accentColor : [tweaks.accentColor, tweaks.secondaryAccent];
    root.style.setProperty("--fwf-pink", primary);
    root.style.setProperty("--fwf-purple", secondary);
    root.style.setProperty("--fwf-display", `"${tweaks.displayFont}", Georgia, serif`);
    root.style.setProperty("--fwf-body", `"${tweaks.bodyFont}", -apple-system, sans-serif`);
    root.style.setProperty("--fwf-grid-color", tweaks.showGrid ? (tweaks.gridDensity === "dense" ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.045)") : "transparent");
    root.style.setProperty("--fwf-grid-size", tweaks.gridDensity === "dense" ? "60px" : tweaks.gridDensity === "sparse" ? "120px" : "80px");
  }, [tweaks]);

  let Page;
  switch (route) {
    case "projects":    Page = ProjectsLabPage; break;
    case "projects-classic": Page = ProjectsPage; break;
    case "projects-lab": Page = ProjectsLabPage; break;
    case "pricing":     Page = PricingPage;     break;
    case "meta-ads-agentur": Page = MetaAdsPage; break;
    case "about":       Page = AboutPage;       break;
    case "contact":     Page = ContactPage;     break;
    case "impressum":   Page = ImpressumPage;   break;
    case "datenschutz": Page = DatenschutzPage; break;
    default:            Page = HomePage;
  }

  // Per-route <title> + meta description. Without this every real URL would
  // share one title and Google would treat them as near-duplicates, which
  // defeats the point of having separate paths at all.
  useEffectA(() => {
    const lang = (window.FWF_getLanguage && window.FWF_getLanguage()) || "de";
    const meta = (ROUTE_META[route] || ROUTE_META.home)[lang === "de" ? "de" : "en"];
    document.title = meta.title;
    const set = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    set('meta[name="description"]', "content", meta.desc);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.desc);
    set('meta[property="og:url"]', "content", "https://flowwestfilms.de" + (route === "home" ? "/" : "/" + route));
    // canonical keeps duplicate/param variants from splitting ranking signals
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", "https://flowwestfilms.de" + (route === "home" ? "/" : "/" + route));
    document.documentElement.setAttribute("lang", lang === "de" ? "de" : "en");
  }, [route, langTick]);

  // Map routes to screen labels
  const labels = {
    home:        "01 Home",
    projects:    "02 Projects",
    "projects-classic": "02 Projects · Classic",
    "projects-lab": "02 Projects",
    pricing:     "03 Pricing",
    "meta-ads-agentur": "03 Pricing · Meta Ads",
    about:       "04 About",
    contact:     "05 Contact",
    impressum:   "Legal · Impressum",
    datenschutz: "Legal · Datenschutz",
  };

  return (
    <div id="app" data-screen-label={labels[route] || labels.home}>
      <Nav route={route} />
      <div key={route} style={{ animation: "fwfFadeUp 500ms cubic-bezier(0.4,0,0.2,1)" }}>
        <Page />
      </div>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent palette">
          <TweakColor
            label="Neon pair"
            value={[tweaks.accentColor, tweaks.secondaryAccent]}
            options={ACCENT_OPTIONS}
            onChange={(pair) => setTweak({ accentColor: pair[0], secondaryAccent: pair[1] })}
          />
        </TweakSection>

        <TweakSection label="Typography">
          <TweakRadio
            label="Display"
            value={tweaks.displayFont}
            options={DISPLAY_FONTS}
            onChange={(v) => setTweak("displayFont", v)}
          />
          <TweakRadio
            label="Body"
            value={tweaks.bodyFont}
            options={BODY_FONTS}
            onChange={(v) => setTweak("bodyFont", v)}
          />
        </TweakSection>

        <TweakSection label="Grid background">
          <TweakToggle
            label="Show grid"
            value={tweaks.showGrid}
            onChange={(v) => setTweak("showGrid", v)}
          />
          <TweakRadio
            label="Density"
            value={tweaks.gridDensity}
            options={["sparse", "normal", "dense"]}
            onChange={(v) => setTweak("gridDensity", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
