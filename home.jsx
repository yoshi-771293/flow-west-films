/* global React, Icons, Link, Crosshairs, Logo, CtaButtons, FinalCTA, SprintPackages, TrustMarquee, TypewriterWord, VideoModal, VideoSchema */
const { useState: useState_h, useEffect: useEffect_h, useRef: useRef_h } = React;

// ============================================
// Offer card (used on Home + Pricing)
// ============================================
function OfferCard({ icon, title, badge, badgeColor, highlight, tagline, stat, bullets, accent, expanded, serviceLink }) {
  const btnCls = `fwf-btn fwf-btn-sm fwf-btn-accent fwf-btn-accent-${accent}`;
  const btnStyle = { alignSelf: "flex-start" };

  return (
    <div className={"fwf-card fwf-card-" + accent} style={{ padding: 32, height: "100%", minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
      <Crosshairs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: "rgba(" + (accent === "pink" ? "255,45,120" : accent === "purple" ? "155,48,255" : accent === "green" ? "0,255,136" : "255,100,32") + ", 0.08)",
          border: "1px solid rgba(" + (accent === "pink" ? "255,45,120" : accent === "purple" ? "155,48,255" : accent === "green" ? "0,255,136" : "255,100,32") + ", 0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--fwf-" + accent + ")"
        }}>
          {icon}
        </div>
        <span className={"fwf-badge " + (highlight ? "fwf-badge-highlight" : "fwf-badge-" + badgeColor)}>{badge}</span>
      </div>

      {stat && (
        <div className="fwf-display" style={{ color: "rgb(" + (accent === "pink" ? "255,45,120" : accent === "purple" ? "155,48,255" : accent === "green" ? "0,255,136" : "255,100,32") + ")", fontSize: stat.length > 18 ? (expanded ? 30 : 26) : (expanded ? 48 : 40), fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 6px 0" }}>
          {stat}
        </div>
      )}
      <h3 className="fwf-display" style={{ fontSize: expanded ? 44 : 36, margin: "0 0 10px 0", letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ color: "var(--fwf-text-mute)", margin: "0 0 24px 0", fontSize: 15, fontStyle: "italic", lineHeight: 1.5 }}>
        {tagline}
      </p>

      <hr className="fwf-hr" style={{ margin: "0 0 20px 0" }} />

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", flex: 1 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 12, padding: "8px 0", fontSize: 14.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
            <span style={{ color: "var(--fwf-" + accent + ")", flexShrink: 0, marginTop: 2 }}>
              <Icons.Check size={16} stroke={2} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {expanded && serviceLink && (
        <Link to={serviceLink.to} className="fwf-btn-bare" style={{ alignSelf: "flex-start", fontSize: 13, margin: "-8px 0 22px 0", color: "var(--fwf-text-mute)" }}>
          {serviceLink.label}
        </Link>
      )}

      {expanded ? (
        <a href={funnelHref()} target="_blank" rel="noreferrer" className={btnCls} style={btnStyle}>
          <Icons.Calendar size={14} />
          Book a call
        </a>
      ) : (
        <Link to="services" className={btnCls} style={btnStyle}>
          Learn more
          <Icons.ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

// ============================================
// Offer data (single source of truth)
// ============================================
const OFFERS = [
  {
    title: "Launch Film",
    icon: React.createElement(Icons.Film, { size: 22 }),
    badge: "Signature",
    badgeColor: "purple",
    accent: "purple",
    stat: "3 films / 1 shoot",
    serviceLink: { to: "werbefilm-stuttgart", label: "See ad films →" },
    tagline: "Your story told right.",
    bullets: [
      "Strategy + positioning workshop (2 sessions)",
      "Concept development + script",
      "Full cinematic production (1–3 shoot days)",
      "Hero edit + cutdowns (60s, 30s)",
      "Behind-the-scenes content package",
      "Usage rights: paid, organic, sales, internal",
    ],
  },
  {
    title: "Creative Sprint",
    icon: React.createElement(Icons.Zap, { size: 22 }),
    badge: "Fastest",
    badgeColor: "orange",
    accent: "orange",
    stat: "30 creatives / month",
    serviceLink: { to: "ki-videoproduktion", label: "See AI video production →" },
    tagline: "Never run out of creative to test.",
    bullets: [
      "2 ad concepts per month — hooks, scripts + CTAs",
      "5 finished video creatives per concept (10 videos/month)",
      "20 static creatives per month (10 per concept)",
      "Prefer UGC? Swap in UGC-style videos at the same volume",
      "Creative-only retainer — pairs with your own media buying",
    ],
  },
  {
    title: "Growth Retainer",
    icon: React.createElement(Icons.TrendUp, { size: 22 }),
    badge: "Most Popular",
    badgeColor: "pink",
    highlight: true,
    accent: "pink",
    stat: "Creative + Performance Marketing",
    serviceLink: { to: "full-service", label: "See full service →" },
    tagline: "The whole engine, handled.",
    bullets: [
      "Everything in Creative Sprint — monthly concepts, hooks, scripts",
      "2 ad concepts per month with 5 finished creatives per concept",
      "Full Meta Ads management — strategy, setup, audiences, scaling",
      "Structured creative testing tied directly to production",
      "Performance reporting + monthly review and roadmap",
      "Minimum 4–6 month commitment — long enough to compound",
    ],
  },
  {
    title: "Premium Partner",
    icon: React.createElement(Icons.Star, { size: 22 }),
    badge: "Partnership",
    badgeColor: "green",
    accent: "green",
    stat: "Bespoke / Founder-led",
    tagline: "Whatever moves the needle.",
    bullets: [
      "Concept creation + creative direction across all channels",
      "Full performance marketing — creative and Paid Social as one system",
      "Founder-led strategy and hands-on execution",
      "Website builds, AI workflows, and custom systems",
      "Bespoke scope, priced to the relationship — not a fixed package",
    ],
  },
];

// ============================================
// Language-aware typewriter (position section)
// ============================================
function LangTypewriterWord({ wordsEN, wordsDE, style, className }) {
  const [lang, setLang] = useState_h(function() {
    // Mirror i18n.js's own resolution. Hardcoding "de" here desynced from
    // i18n.js, which falls back to navigator.language when nothing is stored --
    // so a first-time visitor on a non-German browser got English body copy
    // with German typewriter words ("Where exactly are you losing Umsatz?").
    if (window.FWF_getLanguage) return window.FWF_getLanguage();
    try {
      var s = localStorage.getItem("fwf-lang");
      if (s === "de" || s === "en") return s;
    } catch (e) {}
    return (navigator.language || "").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  });
  useEffect_h(function() {
    var handler = function(e) { setLang(e.detail.lang); };
    window.addEventListener("fwf-lang-change", handler);
    return function() { window.removeEventListener("fwf-lang-change", handler); };
  }, []);
  var words = lang === "de" ? wordsDE : wordsEN;
  return React.createElement(TypewriterWord, { words: words, style: style, className: className });
}

// ============================================
// Opening Film — scroll-triggered with unmute
// ============================================
// Opening film now streams from Bunny instead of a ~35MB local mp4 served off
// the origin. Uses the HLS manifest directly rather than a player.mediadelivery
// embed, which 403s — and keeps a real <video> element so the scroll-trigger
// and the sound toggle below still work.
const INTRO_ZONE = "vz-fd89cb27-622.b-cdn.net";
const INTRO_GUID = "1d3be5d7-6082-4751-bae3-eccbb89fe876";

function OpeningFilm() {
  const [muted, setMuted] = useState_h(true);
  const videoRef = useRef_h(null);
  const wantSound = useRef_h(true); // sound is the default; a manual mute clears it

  useEffect_h(function() {
    var video = videoRef.current;
    if (!video) return;
    var manifest = "https://" + INTRO_ZONE + "/" + INTRO_GUID + "/playlist.m3u8";
    var visible = false;
    var hls;

    // Sound-on is the intent, but browsers reject play() on an unmuted video
    // until the visitor has interacted with the page. So: attempt unmuted, and
    // on rejection fall back to muted and play anyway — the film always runs
    // rather than freezing on the poster. unlockSound() below then turns sound
    // on at the first real gesture.
    function tryPlay() {
      if (!visible) return;
      if (wantSound.current) video.muted = false;
      var p = video.play();
      if (!p || !p.catch) return;
      p.then(function() { setMuted(video.muted); }).catch(function() {
        video.muted = true;
        setMuted(true);
        video.play().catch(function() {});
      });
    }

    var unlocked = false;
    var GESTURES = ["pointerdown", "keydown", "touchstart"];
    function unlockSound() {
      if (unlocked) return;
      unlocked = true;
      GESTURES.forEach(function(evt) { document.removeEventListener(evt, unlockSound); });
      if (!wantSound.current) return; // they already hit mute — respect it
      video.muted = false;
      setMuted(false);
      if (visible) video.play().catch(function() {});
    }
    GESTURES.forEach(function(evt) { document.addEventListener(evt, unlockSound, { passive: true }); });
    // play() fires off "canplay" — also covers the case where the section is
    // already in view at load, before the manifest has parsed.
    video.addEventListener("canplay", tryPlay);

    if (window.Hls && window.Hls.isSupported()) {
      // Real adaptive bitrate, like YouTube: start on whatever level hls.js's bandwidth
      // estimate picks (startLevel: -1 = auto), capped to the player's actual rendered
      // size, then let ABR ramp up on its own — no forced jump to max quality.
      hls = new window.Hls({ capLevelToPlayerSize: true, startLevel: -1 });
      hls.loadSource(manifest);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = manifest; // Safari plays HLS natively
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        visible = entry.isIntersecting;
        if (visible) tryPlay(); else video.pause();
      });
    }, { threshold: 0.25 });
    observer.observe(video);

    return function() {
      observer.disconnect();
      video.removeEventListener("canplay", tryPlay);
      GESTURES.forEach(function(evt) { document.removeEventListener(evt, unlockSound); });
      if (hls) hls.destroy();
    };
  }, []);

  function toggleMute() {
    var video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    // Remember the choice so the gesture-unlock doesn't override a deliberate mute.
    wantSound.current = !video.muted;
    setMuted(video.muted);
  }

  return React.createElement("section", { style: { position: "relative", width: "100%", overflow: "hidden", background: "#0a0a0a", lineHeight: 0 } },
    React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" } }),
    React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" } }),
    React.createElement("video", {
      ref: videoRef,
      poster: "https://" + INTRO_ZONE + "/" + INTRO_GUID + "/thumbnail.jpg",
      muted: true,
      playsInline: true,
      loop: false,
      preload: "metadata",
      style: { width: "100%", display: "block", objectFit: "cover", maxHeight: "100vh" }
    }),
    React.createElement("button", {
      onClick: toggleMute,
      "aria-label": muted ? "Sound einschalten" : "Sound ausschalten",
      style: {
        position: "absolute", bottom: 24, right: 24, zIndex: 3,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4,
        color: "rgba(255,255,255,0.85)", fontFamily: "var(--fwf-mono)",
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        padding: "8px 14px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6
      }
    }, muted ? "♪ Sound" : "✕ Mute")
  );
}

// ============================================
// HOME
// ============================================
// "What we do": real <a href> links from the homepage (Google's most-crawled page) to every service page.
const VERTICAL_SPOTLIGHT = [
  {
    client: "WGV Versicherung", title: "Vertical Cut", tag: "Ad Creative", local: false,
    desc: "Vertical cut of the WGV Versicherung liability spot — reframed and upscaled for Reels and Stories, where the mishap has to land in the first two seconds.",
    thumb: "https://vz-fd89cb27-622.b-cdn.net/24acd352-29ff-4e05-917b-ff5716af6bbf/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/24acd352-29ff-4e05-917b-ff5716af6bbf?token=4cf8658e705771dd73a89ea979eb51ce1531bcb703b1105690c699a43ee4b271&expires=1787850076&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Voyah", title: "360° Tunnel Loop", tag: "Ad Creative", local: false,
    desc: "Ad creative for Voyah — an SUV runs a full 360-degree loop through a tunnel, pure stunt spectacle built to stop the scroll.",
    thumb: "https://vz-fd89cb27-622.b-cdn.net/637af620-778f-4a9b-83b6-7941d535a772/thumbnail_393fe05d.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/637af620-778f-4a9b-83b6-7941d535a772?token=613086822587d8be60269286e3b8c68f91c1e8aa67596a8ee013e0280f9026f3&expires=1787759279&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Streetside Classics", title: "Showroom Reel", tag: "Ad Creative", local: false,
    desc: "A reel for Streetside Classics — a classic car dealership in Dallas, Texas, showcasing oldtimers and other collector cars on the showroom floor.",
    thumb: "https://vz-fd89cb27-622.b-cdn.net/17a28273-f384-4e59-8b80-246b438b39d7/thumbnail_185b77d1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/17a28273-f384-4e59-8b80-246b438b39d7?token=95aa1ae35aece2cb912db29a8e60c714a77ad12e8cd53cbb99eedc33ff2fd243&expires=1787759058&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  }
];

// Videos shown on the homepage, for the invisible video schema.
function HOME_VIDEOS() {
  const intro = {
    client: "Flow West Films", title: "Brand Film",
    desc: "Flow West Films brand film: cinematic ad creative and performance marketing for e-commerce and B2C brands.",
    thumb: "https://" + INTRO_ZONE + "/" + INTRO_GUID + "/thumbnail.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/" + INTRO_GUID,
  };
  const all = window.ALL_PROJECTS || [];
  const pick = (c, t) => all.find((p) => p.client === c && p.title === t);
  const featured = [pick("Porsche", "For the Chosen"), pick("Wilson", "Match Point"), pick("KFC", "The Good, the Bad, and the Sauce")].filter(Boolean);
  return [intro].concat(featured, VERTICAL_SPOTLIGHT);
}

// Platform marks for the hero strip (simple-icons, CC0, inlined; fill follows the text colour).
const PLATFORM_LOGOS = [{"name": "Meta", "d": "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"}, {"name": "TikTok", "d": "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"}, {"name": "YouTube", "d": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"}];
function PlatformLogos() {
  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 28, color: "rgba(255,255,255,0.88)" } },
    PLATFORM_LOGOS.map(function(l) {
      return React.createElement("svg", { key: l.name, viewBox: "0 0 24 24", width: 30, height: 30, role: "img", "aria-label": l.name, fill: "currentColor" },
        React.createElement("title", null, l.name),
        React.createElement("path", { d: l.d })
      );
    })
  );
}

// Homepage FAQ. Text lives in faq-data.js (the prerender reads it too, for the FAQPage
// schema); <details> keeps every answer in the HTML for crawlers.
function HomeFAQ() {
  var lang = (window.FWF_getLanguage && window.FWF_getLanguage()) === "en" ? "en" : "de";
  var items = (window.FWF_HOME_FAQ || {})[lang] || [];
  return React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
    React.createElement("div", { className: "fwf-container" },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }, className: "fwf-grid-collapse" },
        React.createElement("div", null,
          React.createElement("div", { className: "fwf-section-label" },
            React.createElement("span", { className: "fwf-section-label-line" }),
            React.createElement("span", { className: "fwf-eyebrow" }, lang === "en" ? "Questions" : "Fragen")
          ),
          React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 60px)", margin: 0, lineHeight: 1, textWrap: "balance" } },
            lang === "en" ? "What you should know " : "Was Sie vorher ",
            React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, lang === "en" ? "first." : "wissen sollten.")
          )
        ),
        React.createElement("div", { className: "fwf-faq" },
          items.map(function(it) {
            return React.createElement("details", { key: it[0] },
              React.createElement("summary", null, it[0]),
              React.createElement("p", null, it[1])
            );
          })
        )
      )
    )
  );
}

function HomePage() {
  const [activeVideo, setActiveVideo] = useState_h(null);

  return (
    React.createElement("main", null,

      /* Invisible video schema for Google (renders nothing) */
      React.createElement(VideoSchema, { items: HOME_VIDEOS() }),

      /* HERO */
      React.createElement("section", { style: { position: "relative", paddingTop: 160, paddingBottom: 120, overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" } },
        React.createElement("div", { className: "fwf-grid-bg" }),
        React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 20% 30%, rgba(255,45,120,0.16), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(155,48,255,0.14), transparent 60%), radial-gradient(ellipse 40% 40% at 60% 20%, rgba(0,255,136,0.08), transparent 60%)" } }),

        React.createElement("div", { className: "fwf-container", style: { position: "relative", textAlign: "center" } },

          React.createElement("div", { className: "fwf-fade-up", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 32 } },
            React.createElement(Logo, { variant: "lion", glow: true, size: "clamp(88px, 13vw, 150px)" }),
            React.createElement("span", { style: { fontFamily: "var(--fwf-mono)", fontSize: "clamp(13px, 1.25vw, 16px)", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)", paddingLeft: "0.42em" } }, "Flow West Films")
          ),

          React.createElement("h1", { className: "fwf-display fwf-fade-up fwf-d2 fwf-hero-h1", style: { fontSize: "clamp(56px, 10vw, 140px)", margin: "0 0 28px 0", lineHeight: 0.92, textWrap: "balance" } },
            "Same budget.", React.createElement("br"),
            React.createElement("em", { className: "fwf-display-italic", style: { background: "linear-gradient(90deg, var(--fwf-pink), var(--fwf-purple))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(255,45,120,0.35))" } }, "More revenue.")
          ),

          React.createElement("p", { className: "fwf-fade-up fwf-d3", style: { color: "rgba(255,255,255,0.7)", fontSize: "clamp(17px, 1.6vw, 21px)", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.5 } },
            "For coaches, consultants, agencies and e-commerce brands running Meta ads: when your ads get tired, especially in Q4, one shoot day gives you 10, 20 or 50 new ad videos. First videos 7 working days after the shoot."
          ),

          React.createElement("div", { className: "fwf-fade-up fwf-d4", style: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 } },
            React.createElement(CtaButtons, { slug: "home-hero" }),
            React.createElement("a", {
              href: "#work",
              className: "fwf-btn fwf-btn-ghost",
              onClick: function(e) {
                e.preventDefault();
                var el = document.getElementById("work");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }, "See our work ", React.createElement(Icons.ArrowDown, { size: 14 }))
          ),

          React.createElement("div", { className: "fwf-fade-up fwf-d5", style: { display: "flex", justifyContent: "center", alignItems: "center", gap: "32px 64px", flexWrap: "wrap" } },
            React.createElement("div", { style: { textAlign: "center" } },
              React.createElement("div", { className: "fwf-display", style: { fontSize: "clamp(44px, 5.2vw, 64px)", lineHeight: 1, letterSpacing: "0.02em", color: "var(--fwf-pink)", textShadow: "0 0 28px rgba(255,45,120,0.6)" } }, "10 · 20 · 50"),
              React.createElement("div", { className: "fwf-label", style: { marginTop: 10 } }, "Ad videos")
            ),
            React.createElement(PlatformLogos),
            React.createElement("div", { style: { maxWidth: 260, textAlign: "center", fontFamily: "var(--fwf-mono)", fontSize: 14, lineHeight: 1.6, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, color: "rgba(255,255,255,0.95)" } },
              "First videos 7 working days after the shoot"
            )
          )
        )
      ),

      /* OPENING FILM — cinematic brand intro (homepage only) */
      React.createElement(OpeningFilm),

      /* TRUST MARQUEE */
      React.createElement(TrustMarquee),

      /* POSITION / HOOK with typewriter */
      React.createElement("section", { className: "fwf-section" },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center" }, className: "fwf-grid-collapse" },
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "The position")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5.5vw, 76px)", margin: "0 0 28px 0", textWrap: "balance" } },
                "You didn't come here for content.", React.createElement("br"),
                React.createElement("span", { style: { color: "var(--fwf-pink)" } },
                  "You came for ",
                  React.createElement(LangTypewriterWord, {
                    wordsEN: ["conversions.", "clarity.", "growth.", "revenue."],
                    wordsDE: ["Conversions.", "Klarheit.", "Wachstum.", "Umsatz."],
                    className: "fwf-display-italic",
                    style: { color: "var(--fwf-pink)" }
                  })
                )
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 18, lineHeight: 1.6, margin: 0, maxWidth: 540 } },
                "Your ad spend should come back as customers who buy again — not as impressions you can't bank. Production, ad creative and media buying all sit with one team, so nothing gets lost between the shoot and the spend."
              )
            ),

            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
              [
                { num: "50+", label: "Projects delivered", c: "pink" },
                { num: "14× ROAS", label: "With Weinzeit, for example", c: "purple" },
                { num: "DE",  label: "Stuttgart & remote", c: "green" },
                { num: "Meta Ads", label: "Coaches, consultants, agencies & e-commerce", c: "orange" },
              ].map((s, i) =>
                React.createElement("div", { key: i, className: "fwf-stat" },
                  React.createElement("div", { className: "fwf-stat-num", style: { color: "var(--fwf-" + s.c + ")", marginBottom: 12, fontSize: s.num.length > 8 ? 28 : 56 } }, s.num),
                  React.createElement("div", { className: "fwf-label", style: { letterSpacing: "0.14em" } }, s.label)
                )
              )
            )
          )
        )
      ),

      /* THE OFFER — one product, the AI Creative Sprint, right after the position.
         The other services live on /services and in the footer (crawlable links). */
      React.createElement("section", { className: "fwf-section", id: "sprint", style: { borderTop: "1px solid var(--fwf-hairline)", position: "relative" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { className: "fwf-section-label" },
            React.createElement("span", { className: "fwf-section-label-line" }),
            React.createElement("span", { className: "fwf-eyebrow" }, "The offer")
          ),
          React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 20px 0", maxWidth: 900, textWrap: "balance" } },
            "The AI Creative Sprint. ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "As many ads as your account can test.")
          ),
          React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 18, lineHeight: 1.6, maxWidth: 620, margin: "0 0 24px 0" } },
            "Your part: one kickoff call and one shoot day. Hooks, scripts, editing and finished files are on us."
          ),
          React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 } },
            ["UGC style", "Ad creatives", "YouTube ads", "Vertical 9:16", "Horizontal 16:9"].map(function(f) {
              return React.createElement("span", { key: f, className: "fwf-badge fwf-badge-pink" }, f);
            })
          ),
          React.createElement(SprintPackages, { slug: "home" }),
          React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 15, margin: "28px 0 0 0" } },
            "Want us to run your ads as well? ",
            React.createElement(Link, { to: "services", style: { color: "var(--fwf-pink)", textDecoration: "none" } }, "Growth Retainer & Premium Partner →")
          )
        )
      ),

      /* PORTFOLIO PREVIEW — horizontal work. Placed right after the pitch, ahead of
         the proof/system sections, so real work backs up the claim early. */
      React.createElement("section", { className: "fwf-section", id: "work", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 } },
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "Featured work")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(36px, 4.4vw, 58px)", margin: "0 0 16px 0", lineHeight: 1.05, textWrap: "balance" } },
                "Three ad creatives, ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "reframed for the horizontal screen.")
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 540 } },
                "Flow West Films is a cinematic creative studio making ad creatives for brands that run Meta ads. Concept, shoot, edit and testing from one team."
              )
            ),
            React.createElement(Link, { to: "projects", className: "fwf-btn-bare" },
              "View all projects ", React.createElement(Icons.ArrowRight, { size: 12 })
            )
          ),

          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }, className: "fwf-featured-grid" },
            React.createElement(ProjectThumb, {
              client: "Porsche", title: "For the Chosen", tag: "Ad Creative",
              desc: "A cinematic spec ad for Porsche — an unmarked invitation, a wax seal broken, and a private collection left behind for the one car she's spent years earning the right to own. Exclusivity that isn't announced, just known.",
              colors: ["#d5001c", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/b383f508-762e-42a1-b709-ff858d7921a2/thumbnail_87ef2a1d.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/b383f508-762e-42a1-b709-ff858d7921a2?token=d915599a8dd079ce344fbc0915f219e0d8d93857668e8c56d43ec84aa535c074&expires=1788083004&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/b383f508-762e-42a1-b709-ff858d7921a2?token=d915599a8dd079ce344fbc0915f219e0d8d93857668e8c56d43ec84aa535c074&expires=1788083004&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); }
            }),
            React.createElement(ProjectThumb, {
              client: "Wilson", title: "Match Point", tag: "Ad Creative",
              desc: "A cinematic spec ad for Wilson — full commitment on the serve, the power and precision built into the racket captured in one frame. Powered by AI, curated by creators.",
              colors: ["#c8102e", "#0a0a0a"],
              thumb: "https://i.ytimg.com/vi/nYRfEo-6-Bk/maxresdefault.jpg",
              video: "https://youtu.be/nYRfEo-6-Bk",
              onPlay: function() { setActiveVideo("https://youtu.be/nYRfEo-6-Bk"); }
            }),
            React.createElement(ProjectThumb, {
              client: "KFC", title: "The Good, the Bad, and the Sauce", tag: "Ad Creative",
              desc: "A cinematic spec ad for KFC — a gunslinger walks into a dusty frontier town for a quick draw, the fastest hand in the West going up against the world's fastest fried chicken. Powered by AI, curated by creators.",
              colors: ["#e4002b", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/14596e22-5c8c-42fc-a21e-d7fa4d3033ad/thumbnail_826e1ce9.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/14596e22-5c8c-42fc-a21e-d7fa4d3033ad?token=1763c69c0da5664b10e9295242ee0f09573d7e10378dc0e927b226e2d2fb013c&expires=1787907555&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/14596e22-5c8c-42fc-a21e-d7fa4d3033ad?token=1763c69c0da5664b10e9295242ee0f09573d7e10378dc0e927b226e2d2fb013c&expires=1787907555&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); }
            })
          )
        )
      ),

      /* LATEST WORK — vertical feed ads (WGV / Voyah / Streetside Classics), the format Meta-ads buyers run. */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)", position: "relative", overflow: "hidden" } },
        React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 45% 55% at 85% 50%, rgba(45,108,223,0.14), transparent 60%)" } }),
        React.createElement("div", { className: "fwf-container", style: { position: "relative" }, id: "fwf-wgv-vertical" },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 24 } },
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "Latest work")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(36px, 4.4vw, 58px)", margin: "0 0 16px 0", lineHeight: 1.05, textWrap: "balance" } },
                "Three cuts, ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-purple)" } }, "reframed for the social media feed.")
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, maxWidth: 480, margin: 0 } },
                "Vertical work from WGV, Voyah, and Streetside Classics — built for Reels, Stories, and Shorts, where the hook has to land in the first two seconds."
              )
            ),
            React.createElement(Link, { to: "projects", className: "fwf-btn-bare" },
              "View all projects ", React.createElement(Icons.ArrowRight, { size: 12 })
            )
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }, className: "fwf-vertical-grid" },
            VERTICAL_SPOTLIGHT.map(function(v, i) {
              return React.createElement("div", { key: i },
                React.createElement("div", {
                  className: "fwf-card fwf-card-pink",
                  style: { position: "relative", aspectRatio: "9/16", overflow: "hidden", cursor: "pointer", padding: 0, marginBottom: 14 },
                  onClick: function() { setActiveVideo(v.video); }
                },
                  v.local
                    ? React.createElement("video", {
                        src: v.video, poster: v.thumb,
                        autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata",
                        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
                      })
                    : React.createElement("img", { src: v.thumb, alt: v.title, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
                  React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.65))" } }),
                  React.createElement("div", { className: "fwf-play" }, React.createElement(Icons.Play, { size: 18 })),
                  React.createElement("div", { style: { position: "absolute", top: 14, left: 14 } },
                    React.createElement("span", { className: "fwf-badge fwf-badge-pink", style: { background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" } }, v.tag)
                  )
                ),
                React.createElement("div", { className: "fwf-label", style: { marginBottom: 6 } }, v.client),
                React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 13.5, lineHeight: 1.5, margin: 0 } }, v.desc)
              );
            })
          )
        )
      ),

      /* CLIENTS — Nike, XPRIZE, Eibl, Schmolke, Radisson Blu: who we work with, stated plainly. */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { className: "fwf-section-label" },
            React.createElement("span", { className: "fwf-section-label-line" }),
            React.createElement("span", { className: "fwf-eyebrow" }, "Clients")
          ),
          React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" } },
            "Who we ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "work with.")
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }, className: "fwf-grid-collapse" },
            [
              {
                i: React.createElement(Icons.Star, { size: 22 }), c: "pink", t: "Nike",
                d: "A campaign now in consideration for industry awards. The standard your creative gets held to is a global one, not a local one.",
              },
              {
                i: React.createElement(Icons.Film, { size: 22 }), c: "purple", t: "FutureVision XPRIZE",
                d: "A film competing for a top-10 placement in the XPRIZE competition — storytelling at a level most ad shops never attempt.",
              },
              {
                i: React.createElement(Icons.TrendUp, { size: 22 }), c: "green", t: "Eibl GmbH",
                d: "Ad creative and paid social for ImmoVersteigerung — helping them grow across social media and performance marketing.",
              },
              {
                i: React.createElement(Icons.TrendUp, { size: 22 }), c: "orange", t: "Schmolke Carbon",
                d: "A racing bike manufacturer in Konstanz, Germany, known for premium carbon race components.",
              },
              {
                i: React.createElement(Icons.BarChart, { size: 22 }), c: "pink", t: "850K organic views, one post, zero ad spend",
                d: "Organic reach for Radisson Blu, created with agency partner Viral House — story-first content that replaced typical ad formats and took off on its own.",
              },
              /* Sixth slot intentionally empty — Flow to decide what goes here. */
            ].map((p, i) =>
              React.createElement("div", { key: i, className: "fwf-card fwf-card-" + p.c, style: { padding: 28 } },
                React.createElement("div", { style: { color: "var(--fwf-" + p.c + ")", marginBottom: 18 } }, p.i),
                React.createElement("h3", { style: { fontSize: 19, margin: "0 0 10px 0", fontWeight: 500 } }, p.t),
                React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 } }, p.d)
              )
            )
          )
        )
      ),

      /* FOUNDER — short version of the founder story on the funnel (start.flowwestfilms.de). */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 64, alignItems: "center" }, className: "fwf-grid-collapse" },
            React.createElement("div", {
              role: "img",
              "aria-label": "Florian Kotulla, founder of Flow West Films",
              style: { aspectRatio: "4/5", border: "1px solid var(--fwf-hairline)", background: "url(assets/founder.jpg?v=2) center/cover no-repeat" }
            }),
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "The founder")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 12px 0", lineHeight: 1 } }, "Florian Kotulla."),
              React.createElement("p", { className: "fwf-label", style: { color: "var(--fwf-pink)", margin: "0 0 28px 0" } },
                "Founder and creative director. Over 50 productions since 2018."
              ),
              React.createElement("p", { style: { color: "#fff", fontSize: 19, lineHeight: 1.65, margin: "0 0 20px 0", maxWidth: 620 } },
                "“I worked as a freelancer for many agencies for a long time and kept seeing the same thing: big promises, beautiful videos, and nothing changed for the client. That's why I founded Flow West Films: my videos should actually do something for you.”"
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 17, lineHeight: 1.65, margin: "0 0 24px 0", maxWidth: 620 } },
                "You don't talk to an account manager, you talk to me. The filmmaker who shoots your ad creative sits at the table with you."
              ),
              React.createElement("div", { className: "fwf-label" }, "Flow West Films · Stuttgart"),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 } },
                React.createElement(CtaButtons, { slug: "home-founder" })
              )
            )
          )
        )
      ),

      React.createElement(HomeFAQ),

      React.createElement(FinalCTA, {
        headline: React.createElement(React.Fragment, null, "Where do ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "your ads stand?")),
        sub: "Free, no obligation, about 90 seconds. Then you see your score, your biggest lever and whether a sprint fits you."
      }),

      activeVideo && React.createElement(VideoModal, { src: activeVideo, onClose: function() { setActiveVideo(null); } })
    )
  );
}

// ============================================
// Project thumb (Home featured grid)
// ============================================
function ProjectThumb({ client, title, tag, desc, colors, featured, thumb, video, onPlay }) {
  return (
    React.createElement("div", { className: "fwf-card fwf-card-pink", style: { overflow: "hidden", display: "flex", flexDirection: "column", padding: 0 } },
      React.createElement("div", {
        style: { position: "relative", aspectRatio: "16/9", background: "#0a0a0a", overflow: "hidden", cursor: video ? "pointer" : "default" },
        onClick: video && onPlay ? onPlay : undefined
      },
        thumb
          ? React.createElement("img", { src: thumb, alt: title, className: "fwf-proj-thumb-img" })
          : React.createElement(React.Fragment, null,
              React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(135deg, " + colors[0] + "30, " + colors[1] + "90), #0a0a0a" } }),
              React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 40%, " + colors[0] + "40, transparent 50%), radial-gradient(circle at 70% 80%, " + colors[1] + "40, transparent 50%)", mixBlendMode: "screen" } }),
              React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")", mixBlendMode: "overlay" } })
            ),
        React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7))" } }),
        video && React.createElement("div", { className: "fwf-play" }, React.createElement(Icons.Play, { size: 20 })),
        React.createElement("div", { style: { position: "absolute", top: 16, left: 16 } },
          React.createElement("span", { className: "fwf-badge fwf-badge-pink", style: { background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" } }, tag)
        )
      ),
      React.createElement("div", { style: { padding: 24 } },
        React.createElement("div", { className: "fwf-label", style: { marginBottom: 8 } }, client),
        React.createElement("h3", { className: "fwf-display", style: { fontSize: 26, margin: "0 0 10px 0", letterSpacing: "-0.01em" } }, title),
        React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 } }, desc)
      )
    )
  );
}

Object.assign(window, { HomePage, OfferCard, OFFERS, ProjectThumb });
