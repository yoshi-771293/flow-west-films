/* global React, ReactDOM, useRoute, Nav, Footer, HomePage, ProjectsPage, PricingPage, AboutPage, ContactPage, ImpressumPage, DatenschutzPage, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle */
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
// App
// ============================================
function App() {
  const [route] = useRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

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
    case "projects":    Page = ProjectsPage;    break;
    case "pricing":     Page = PricingPage;     break;
    case "about":       Page = AboutPage;       break;
    case "contact":     Page = ContactPage;     break;
    case "impressum":   Page = ImpressumPage;   break;
    case "datenschutz": Page = DatenschutzPage; break;
    default:            Page = HomePage;
  }

  // Map routes to screen labels
  const labels = {
    home:        "01 Home",
    projects:    "02 Projects",
    pricing:     "03 Pricing",
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
