/* global React, Icons, Link, Crosshairs, Logo, FinalCTA, TrustMarquee, TypewriterWord, VideoModal, GrowthEngineSection, WhyFwfSection */
const { useState: useState_h, useEffect: useEffect_h, useRef: useRef_h } = React;

// ============================================
// Offer card (used on Home + Pricing)
// ============================================
function OfferCard({ icon, title, badge, badgeColor, highlight, tagline, stat, bullets, accent, expanded }) {
  const btnCls = `fwf-btn fwf-btn-sm fwf-btn-accent fwf-btn-accent-${accent}`;
  const btnStyle = { alignSelf: "flex-start" };

  return (
    <div className={"fwf-card fwf-card-" + accent} style={{ padding: 32, height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
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
        <div className="fwf-display" style={{ color: "rgb(" + (accent === "pink" ? "255,45,120" : accent === "purple" ? "155,48,255" : accent === "green" ? "0,255,136" : "255,100,32") + ")", fontSize: stat.length > 24 ? (expanded ? 30 : 26) : (expanded ? 48 : 40), fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 6px 0" }}>
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

      {expanded ? (
        <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className={btnCls} style={btnStyle}>
          Book a call to discuss
          <Icons.ArrowRight size={12} />
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
    // Forcing currentLevel below flushes the buffer, which can abort an
    // in-flight play() — so play off "canplay" rather than immediately after
    // the level switch. Also covers the case where the section is already in
    // view at load, before the manifest has parsed.
    video.addEventListener("canplay", tryPlay);

    if (window.Hls && window.Hls.isSupported()) {
      hls = new window.Hls({ capLevelToPlayerSize: false, startLevel: -1 });
      hls.loadSource(manifest);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, function(evt, data) {
        hls.currentLevel = data.levels.length - 1; // skip ABR ramp-up, top quality now
      });
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
const VERTICAL_SPOTLIGHT = [
  {
    client: "WGV Versicherung", title: "Vertical Cut", tag: "Ad Creative", local: true,
    desc: "Vertical cut of the WGV Versicherung liability spot — reframed and upscaled for Reels and Stories, where the mishap has to land in the first two seconds.",
    thumb: "/assets/thumbs/wgv_vertical.jpg",
    video: "/assets/videos/wgv_vertical_haftpflicht.mp4"
  },
  {
    client: "Voyah", title: "360° Tunnel Loop", tag: "Ad Creative", local: false,
    desc: "Ad creative for Voyah — an SUV runs a full 360-degree loop through a tunnel, pure stunt spectacle built to stop the scroll.",
    thumb: "https://vz-fd89cb27-622.b-cdn.net/637af620-778f-4a9b-83b6-7941d535a772/thumbnail_393fe05d.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/637af620-778f-4a9b-83b6-7941d535a772?token=613086822587d8be60269286e3b8c68f91c1e8aa67596a8ee013e0280f9026f3&expires=1787759279&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  },
  {
    client: "Streetside Classics", title: "Showroom Reel", tag: "Reel", local: false,
    desc: "A reel for Streetside Classics — a classic car dealership in Dallas, Texas, showcasing oldtimers and other collector cars on the showroom floor.",
    thumb: "https://vz-fd89cb27-622.b-cdn.net/17a28273-f384-4e59-8b80-246b438b39d7/thumbnail_185b77d1.jpg",
    video: "https://iframe.mediadelivery.net/embed/684848/17a28273-f384-4e59-8b80-246b438b39d7?token=95aa1ae35aece2cb912db29a8e60c714a77ad12e8cd53cbb99eedc33ff2fd243&expires=1787759058&autoplay=true&loop=false&muted=true&preload=true&responsive=true"
  }
];

function HomePage() {
  const [activeVideo, setActiveVideo] = useState_h(null);

  return (
    React.createElement("main", null,

      /* HERO */
      React.createElement("section", { style: { position: "relative", paddingTop: 160, paddingBottom: 120, overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" } },
        React.createElement("div", { className: "fwf-grid-bg" }),
        React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 20% 30%, rgba(255,45,120,0.16), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(155,48,255,0.14), transparent 60%), radial-gradient(ellipse 40% 40% at 60% 20%, rgba(0,255,136,0.08), transparent 60%)" } }),

        React.createElement("div", { className: "fwf-container", style: { position: "relative", textAlign: "center" } },

          React.createElement("div", { className: "fwf-fade-up", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 32 } },
            React.createElement(Logo, { variant: "lion", glow: true, size: "clamp(88px, 13vw, 150px)" }),
            React.createElement("span", { style: { fontFamily: "var(--fwf-mono)", fontSize: "clamp(13px, 1.25vw, 16px)", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)", paddingLeft: "0.42em" } }, "Flow West Films")
          ),

          React.createElement("div", { className: "fwf-fade-up fwf-d1", style: { display: "inline-flex", alignItems: "center", gap: 12, padding: "11px 20px", borderRadius: 999, border: "1px solid var(--fwf-hairline-strong)", background: "rgba(255,255,255,0.03)", fontFamily: "var(--fwf-mono)", fontSize: 13.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.92)", marginBottom: 36 } },
            React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--fwf-green)", boxShadow: "0 0 8px var(--fwf-green)" } }),
            "Studio · Stuttgart · Now booking Q3 2026"
          ),

          React.createElement("h1", { className: "fwf-display fwf-fade-up fwf-d2 fwf-hero-h1", style: { fontSize: "clamp(56px, 10vw, 140px)", margin: "0 0 28px 0", lineHeight: 0.92, textWrap: "balance" } },
            "We turn ad spend", React.createElement("br"),
            "into ",
            React.createElement("em", { className: "fwf-display-italic", style: { background: "linear-gradient(90deg, var(--fwf-pink), var(--fwf-purple))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(255,45,120,0.35))" } }, "repeat customers.")
          ),

          React.createElement("p", { className: "fwf-fade-up fwf-d3", style: { color: "rgba(255,255,255,0.7)", fontSize: "clamp(17px, 1.6vw, 21px)", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.5 } },
            "Cinematic ad creative and performance marketing for e-commerce and B2C brands — built to earn the second purchase, not just the first click."
          ),

          React.createElement("div", { className: "fwf-fade-up fwf-d4", style: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 } },
            React.createElement("a", { href: "/audit/", className: "fwf-btn fwf-btn-ghost" }, "Get your free audit →"),
            React.createElement("a", { href: "https://calendly.com/flowwestfilms-appointment/30min", target: "_blank", rel: "noreferrer", className: "fwf-btn fwf-btn-primary fwf-pulse" },
              React.createElement(Icons.Calendar, { size: 14 }), " Book a strategy call"
            ),
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

          React.createElement("div", { className: "fwf-fade-up fwf-d5", style: { display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fwf-text-mute)" } },
            React.createElement("span", null, "4K Production"),
            React.createElement("span", null, "E-commerce & B2C"),
            React.createElement("span", null, "Built for Repeat Sales")
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
                { num: "E-Commerce & B2C", label: "Where we focus", c: "orange" },
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

      /* REAL PROOF — credibility (Nike, XPRIZE) standing next to performance (ROAS),
         kept as distinct proof points rather than blended into one soft average. */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { className: "fwf-section-label" },
            React.createElement("span", { className: "fwf-section-label-line" }),
            React.createElement("span", { className: "fwf-eyebrow" }, "Real proof")
          ),
          React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 56px 0", maxWidth: 780, textWrap: "balance" } },
            "You're not the ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "test case.")
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }, className: "fwf-grid-collapse" },
            [
              {
                i: React.createElement(Icons.Star, { size: 22 }), c: "pink", t: "Nike",
                d: "A campaign now in consideration for industry awards. The standard your creative gets held to is a global one, not a local one.",
              },
              {
                i: React.createElement(Icons.Sparkles, { size: 22 }), c: "purple", t: "XPRIZE",
                d: "A film competing for a top-10 placement in the XPRIZE competition — storytelling at a level most ad shops never attempt.",
              },
              {
                i: React.createElement(Icons.TrendUp, { size: 22 }), c: "green", t: "Eibl GmbH",
                d: "Ad creative and paid social for ImmoVersteigerung. Part of the DACH D2C work scaled from 2× to 6.2× ROAS.",
              },
              {
                i: React.createElement(Icons.TrendUp, { size: 22 }), c: "orange", t: "Schmolke Carbon",
                d: "Premium carbon race components. Part of the same DACH D2C work scaled from 2× to 6.2× ROAS.",
              },
              {
                i: React.createElement(Icons.BarChart, { size: 22 }), c: "pink", t: "850K organic views",
                d: "Reach earned for local brand partners by replacing typical ad formats with cinematic, story-first content.",
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

      React.createElement(WhyFwfSection),

      /* AUDIT CTA */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container", style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 } },
          React.createElement("h3", { className: "fwf-display", style: { color: "var(--fwf-pink)", fontSize: "clamp(22px, 2.6vw, 30px)", margin: 0, fontWeight: 500 } },
            "Where exactly are you losing ",
            React.createElement(LangTypewriterWord, {
              wordsEN: ["leads?", "revenue?", "momentum?"],
              wordsDE: ["Leads?", "Umsatz?", "Momentum?"],
              className: "fwf-display-italic",
              style: { color: "var(--fwf-pink)" }
            })
          ),
          React.createElement("p", { className: "fwf-display", style: { color: "#fff", fontSize: "clamp(32px, 4vw, 56px)", margin: 0, lineHeight: 1.2, maxWidth: 780 } },
            "Not sure where to start? Our free 7-minute brand audit tells you exactly where your gaps are."
          ),
          React.createElement("a", { href: "/audit/", className: "fwf-btn fwf-btn-ghost" }, "Get your free audit →")
        )
      ),

      /* PORTFOLIO PREVIEW */
      React.createElement("section", { className: "fwf-section", id: "work", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 } },
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "Featured work")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 16px 0" } },
                "Recent ", React.createElement("em", { className: "fwf-display-italic" }, "productions.")
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 540 } },
                "Flow West Films is a cinematic creative studio crafting ad creatives and content for B2C brands that want to scale. Concept, creation, performance marketing, and analytics — all included."
              )
            ),
            React.createElement(Link, { to: "projects", className: "fwf-btn-bare" },
              "View all projects ", React.createElement(Icons.ArrowRight, { size: 12 })
            )
          ),

          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16 }, className: "fwf-featured-grid" },
            React.createElement(ProjectThumb, {
              client: "Nike", title: "Ad Creative", tag: "Ad Creative",
              desc: "A cinematic spec ad for Nike — why athletes train through exhaustion and long odds, when giving up would be so much easier. Because you might win.",
              colors: ["#ff6420", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2/thumbnail.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2?token=d0e0018c7cdda6c2ee22db1f774b1ac7ab06e2a6006449e03ca40e7c5006c321&expires=1785493212&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/d1b5fb3e-5c0b-435b-a9ec-9c1394f577d2?token=d0e0018c7cdda6c2ee22db1f774b1ac7ab06e2a6006449e03ca40e7c5006c321&expires=1785493212&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); },
              featured: true
            }),
            React.createElement(ProjectThumb, {
              client: "Wilson", title: "Spec Ad", tag: "AI Ad Creative",
              desc: "A cinematic spec ad for Wilson — full commitment on the serve, the power and precision built into the racket captured in one frame. Powered by AI, curated by creators.",
              colors: ["#c8102e", "#0a0a0a"],
              thumb: "https://i.ytimg.com/vi/nYRfEo-6-Bk/maxresdefault.jpg",
              video: "https://youtu.be/nYRfEo-6-Bk",
              onPlay: function() { setActiveVideo("https://youtu.be/nYRfEo-6-Bk"); }
            }),
            React.createElement(ProjectThumb, {
              client: "Nord VPN", title: "Ad Creative", tag: "Ad Creative",
              desc: "A spec commercial for Nord VPN — a young man feels watched everywhere, even by his own pets, until Nord VPN lets him relax, browse, and work in peace again.",
              colors: ["#4687ff", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/6f0f6301-6d12-42d9-a724-f29ec39a5f75/thumbnail.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/6f0f6301-6d12-42d9-a724-f29ec39a5f75?token=7a08a8999d42fb1837ed547d71935fac5de1a46658a4109acaf5ae63060cedc6&expires=1785488470&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/6f0f6301-6d12-42d9-a724-f29ec39a5f75?token=7a08a8999d42fb1837ed547d71935fac5de1a46658a4109acaf5ae63060cedc6&expires=1785488470&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); }
            })
          )
        )
      ),

      React.createElement(GrowthEngineSection, { compact: true }),

      /* 4 OFFERS */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)", position: "relative" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 } },
            React.createElement("div", null,
              React.createElement("div", { className: "fwf-section-label" },
                React.createElement("span", { className: "fwf-section-label-line" }),
                React.createElement("span", { className: "fwf-eyebrow" }, "Four ways to work with us")
              ),
              React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: 0, textWrap: "balance" } },
                "Choose your ", React.createElement("em", { className: "fwf-display-italic" }, "altitude.")
              )
            ),
            React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 15, maxWidth: 360, margin: 0, lineHeight: 1.55 } },
              "Four offers — from a one-time anchor film to a founder-led bespoke partnership. Pricing is discussed on your call."
            )
          ),
          React.createElement("div", { className: "fwf-offers-grid" },
            OFFERS.map((o, i) => React.createElement(OfferCard, Object.assign({ key: i }, o)))
          )
        )
      ),

      /* VERTICAL SPOTLIGHT — WGV / Voyah / Streetside Classics */
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
                "Three cuts, ", React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-purple)" } }, "reframed for the feed.")
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

      React.createElement(FinalCTA),

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
        style: { position: "relative", aspectRatio: featured ? "16/10" : "4/3", background: "#0a0a0a", overflow: "hidden", cursor: video ? "pointer" : "default" },
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
        React.createElement("h3", { className: "fwf-display", style: { fontSize: featured ? 32 : 24, margin: "0 0 10px 0", letterSpacing: "-0.01em" } }, title),
        React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 } }, desc)
      )
    )
  );
}

Object.assign(window, { HomePage, OfferCard, OFFERS, ProjectThumb });
