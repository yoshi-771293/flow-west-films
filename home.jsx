/* global React, Icons, Link, Crosshairs, Logo, FinalCTA, TrustMarquee, TypewriterWord, VideoModal */
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
        <Link to="pricing" className={btnCls} style={btnStyle}>
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
    tagline: "Volume creative that doesn't sacrifice the bar.",
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
    tagline: "Performance + Video.",
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
    try { return localStorage.getItem("fwf-lang") || "de"; } catch(e) { return "de"; }
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
function OpeningFilm() {
  const [muted, setMuted] = useState_h(true);
  const videoRef = useRef_h(null);

  useEffect_h(function() {
    var video = videoRef.current;
    if (!video) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          video.play().catch(function() {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(video);
    return function() { observer.disconnect(); };
  }, []);

  function toggleMute() {
    var video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return React.createElement("section", { style: { position: "relative", width: "100%", overflow: "hidden", background: "#0a0a0a", lineHeight: 0 } },
    React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" } }),
    React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" } }),
    React.createElement("video", {
      ref: videoRef,
      src: "assets/videos/opening_eden.mp4",
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
            "We make brands", React.createElement("br"),
            "impossible to ",
            React.createElement("em", { className: "fwf-display-italic", style: { background: "linear-gradient(90deg, var(--fwf-pink), var(--fwf-purple))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(255,45,120,0.35))" } }, "ignore.")
          ),

          React.createElement("p", { className: "fwf-fade-up fwf-d3", style: { color: "rgba(255,255,255,0.7)", fontSize: "clamp(17px, 1.6vw, 21px)", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.5 } },
            "Premium ad creative & cinematic film production for B2C brands that want to scale."
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
            React.createElement("span", null, "Strategy First"),
            React.createElement("span", null, "Performance Focused")
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
                "Most agencies deliver content.", React.createElement("br"),
                React.createElement("span", { style: { color: "var(--fwf-pink)" } },
                  "We deliver ",
                  React.createElement(LangTypewriterWord, {
                    wordsEN: ["conversion.", "clarity.", "growth.", "impact."],
                    wordsDE: ["Conversions.", "Klarheit.", "Wachstum.", "Wirkung."],
                    className: "fwf-display-italic",
                    style: { color: "var(--fwf-pink)" }
                  })
                )
              ),
              React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 18, lineHeight: 1.6, margin: 0, maxWidth: 540 } },
                "Flow West Films combines cinematic production, performance-driven ad creative, and strategic thinking — into one external premium team."
              )
            ),

            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
              [
                { num: "50+", label: "Projects delivered", c: "pink" },
                { num: "B2C", label: "Brand focus", c: "purple" },
                { num: "DE",  label: "Stuttgart & remote", c: "green" },
                { num: "#1",  label: "Strategy-first", c: "orange" },
              ].map((s, i) =>
                React.createElement("div", { key: i, className: "fwf-stat" },
                  React.createElement("div", { className: "fwf-stat-num", style: { color: "var(--fwf-" + s.c + ")", marginBottom: 12 } }, s.num),
                  React.createElement("div", { className: "fwf-label", style: { letterSpacing: "0.14em" } }, s.label)
                )
              )
            )
          ),
          React.createElement("div", { style: { marginTop: 48, paddingTop: 40, borderTop: "1px solid var(--fwf-hairline)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32 } },
            React.createElement("p", { className: "fwf-display", style: { color: "#fff", fontSize: "clamp(32px, 4vw, 56px)", margin: 0, lineHeight: 1.2, maxWidth: 780 } },
              "Not sure where to start? Our free 7-minute brand audit tells you exactly where your gaps are."
            ),
            React.createElement("a", { href: "/audit/", className: "fwf-btn fwf-btn-ghost" }, "Get your free audit →")
          )
        )
      ),

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
              client: "WGV Versicherung", title: "Ad Creative", tag: "Ad Creative",
              desc: "Ad creative for WGV Versicherung — a small mishap can quickly turn into real damage, and someone has to answer for it. Their private liability insurance has you covered.",
              colors: ["#2d6cdf", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/6c5e6dd1-cb8e-4031-ba05-e233a28bb5c1/thumbnail_d8e174d4.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/6c5e6dd1-cb8e-4031-ba05-e233a28bb5c1?token=dd6c824357b5106c675b3fa00ab52be2902b7100a012a6fa08b3791ef547b994&expires=1785488747&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/6c5e6dd1-cb8e-4031-ba05-e233a28bb5c1?token=dd6c824357b5106c675b3fa00ab52be2902b7100a012a6fa08b3791ef547b994&expires=1785488747&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); },
              featured: true
            }),
            React.createElement(ProjectThumb, {
              client: "Alienwork", title: "Skeleton Automatic Watch", tag: "Product",
              desc: "Full-length product film for the IK Automatic Watch reveal.",
              colors: ["#00ff88", "#0a0a0a"],
              thumb: "https://vz-fd89cb27-622.b-cdn.net/9dc085af-2c2d-4f8c-acfd-d8ae5863c109/thumbnail_14fae6d7.jpg",
              video: "https://iframe.mediadelivery.net/embed/684848/9dc085af-2c2d-4f8c-acfd-d8ae5863c109?token=fdbabff47bdc0de76002f4a763a8932ce5b0095383825d078eb92e7148eaa636&expires=1785494800&autoplay=true&loop=false&muted=true&preload=true&responsive=true",
              onPlay: function() { setActiveVideo("https://iframe.mediadelivery.net/embed/684848/9dc085af-2c2d-4f8c-acfd-d8ae5863c109?token=fdbabff47bdc0de76002f4a763a8932ce5b0095383825d078eb92e7148eaa636&expires=1785494800&autoplay=true&loop=false&muted=true&preload=true&responsive=true"); }
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

      /* WHY FWF */
      React.createElement("section", { className: "fwf-section", style: { borderTop: "1px solid var(--fwf-hairline)" } },
        React.createElement("div", { className: "fwf-container" },
          React.createElement("div", { className: "fwf-section-label" },
            React.createElement("span", { className: "fwf-section-label-line" }),
            React.createElement("span", { className: "fwf-eyebrow" }, "Why FWF")
          ),
          React.createElement("h2", { className: "fwf-display", style: { fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 64px 0", maxWidth: 780, textWrap: "balance" } },
            "Not just video production —", React.createElement("br"),
            React.createElement("em", { className: "fwf-display-italic", style: { color: "var(--fwf-pink)" } }, "your external creative department.")
          ),

          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)" }, className: "fwf-why-grid" },
            [
              { i: React.createElement(Icons.Brain, { size: 22 }), t: "Strategic Storytelling", d: "We don't just shoot. We think conversion-first.", c: "pink" },
              { i: React.createElement(Icons.Aperture, { size: 22 }), t: "Film That Gets Remembered", d: "4K production built to stay in the mind.", c: "purple" },
              { i: React.createElement(Icons.Zap, { size: 22 }), t: "Speed & Efficiency", d: "Fast turnaround without sacrificing quality.", c: "green" },
              { i: React.createElement(Icons.Target, { size: 22 }), t: "Performance Focus", d: "Every frame built to drive action.", c: "orange" },
            ].map((w, i, arr) =>
              React.createElement("div", { key: i, style: { padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none", position: "relative" } },
                React.createElement("div", { style: { color: "var(--fwf-" + w.c + ")", marginBottom: 24 } }, w.i),
                React.createElement("h3", { style: { fontSize: 18, margin: "0 0 12px 0", fontWeight: 500 } }, w.t),
                React.createElement("p", { style: { color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 } }, w.d)
              )
            )
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
