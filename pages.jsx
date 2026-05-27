/* global React, Icons, Link, Crosshairs, FinalCTA, OfferCard, OFFERS, ProjectThumb, TypewriterWord, VideoModal */
const { useState: useStateP } = React;

// ============================================
// All projects data (with real video/thumb where available)
// ============================================
const ALL_PROJECTS = [
  {
    client: "Radisson Blu", title: "Brand Reel", tag: "Social Media", cat: "social",
    desc: "A cinematic nighttime reel capturing the Stuttgart property's premium atmosphere.",
    colors: ["#ff2d78", "#0a0a0a"],
    thumb: "assets/thumbs/rad_blu.jpg", video: "assets/videos/rad_blu.mp4"
  },
  {
    client: "Radisson Blu", title: "Christmas Reel", tag: "Social Media", cat: "social",
    desc: "Seasonal cinematic reel for the Radisson Blu Stuttgart property.",
    colors: ["#9b30ff", "#ff2d78"]
  },
  {
    client: "Radisson Blu", title: "Valentine's Reel", tag: "Social Media", cat: "social",
    desc: "Romantic atmosphere film for a Valentine's Day campaign.",
    colors: ["#ff2d78", "#0a0a0a"]
  },
  {
    client: "Palazzo Stuttgart", title: "Event Film", tag: "Event", cat: "event",
    desc: "Live event coverage for the Palazzo Stuttgart dinner show.",
    colors: ["#c9a96e", "#0a0a0a"]
  },
  {
    client: "Schmolke Carbon", title: "Racing Handlebar Ad", tag: "Ad Creative", cat: "ad",
    desc: "Performance ad creative for a premium carbon component brand.",
    colors: ["#9b30ff", "#0a0a0a"]
  },
  {
    client: "App Liqes", title: "Brand Film", tag: "Brand Film", cat: "image",
    desc: "A 60-second narrative brand film for a B2B SaaS launch.",
    colors: ["#00ff88", "#0a0a0a"]
  },
  {
    client: "App Liqes", title: "30-Second Ad", tag: "Ad Creative", cat: "ad",
    desc: "Short-form ad creative for performance campaigns.",
    colors: ["#00ff88", "#9b30ff"]
  },
  {
    client: "Hatz Beer", title: "Product Ad", tag: "Ad Creative", cat: "ad",
    desc: "Macro product ad for Hatz — Echt Badisch Gut. Clean, premium, craveable.",
    colors: ["#ff6420", "#c9a96e"],
    thumb: "assets/thumbs/golden_brew.jpg", video: "assets/videos/golden_brew.mp4"
  },
  {
    client: "Pane Vino", title: "Founder Story", tag: "Brand Film", cat: "image",
    desc: "An intimate documentary portrait of the owner at the Santa Lucia wine bar.",
    colors: ["#c9a96e", "#ff2d78"],
    thumb: "assets/thumbs/pane_vino.jpg"
  },
  {
    client: "Alienwatch", title: "Skeleton Watch", tag: "Product", cat: "ad",
    desc: "Macro product film for a skeleton watch reveal.",
    colors: ["#00ff88", "#0a0a0a"]
  },
  {
    client: "Swarovski", title: "Product Reel", tag: "Product", cat: "ad",
    desc: "Luxury product reel for a Swarovski jewellery line.",
    colors: ["#ff2d78", "#c9a96e"]
  },
  {
    client: "Zenroots", title: "Event Film", tag: "Event", cat: "event",
    desc: "Brand event film for a wellness retreat in the Black Forest.",
    colors: ["#00ff88", "#0a0a0a"]
  },
  {
    client: "EasyFoil", title: "Product Video", tag: "Brand Film", cat: "image",
    desc: "Top-down product video for a hydrofoil brand.",
    colors: ["#9b30ff", "#ff6420"]
  },
  {
    client: "CW Architectural Art", title: "Founder Interview", tag: "Brand Film", cat: "image",
    desc: "An intimate interview-led portrait for a luxury interior brand.",
    colors: ["#c9a96e", "#0a0a0a"]
  },
  {
    client: "Stuttgart Bierfest", title: "Event Reel", tag: "Event", cat: "event",
    desc: "Warm, immersive event film capturing the craft and atmosphere of the festival floor.",
    colors: ["#c9a96e", "#ff6420"],
    thumb: "assets/thumbs/bierfest.jpg", video: "assets/videos/bierfest.mp4"
  },
  {
    client: "aonenine", title: "SHOPS — Music Video", tag: "Music Video", cat: "music",
    desc: "Directed music video for aonenine & DTOXiD. Shot on location in the UK.",
    colors: ["#9b30ff", "#ff2d78"],
    thumb: "assets/thumbs/shops_mv.jpg", video: "assets/videos/shops_mv.mp4"
  },
  {
    client: "FWF Films", title: "fr_fr — Short Film", tag: "Short Film", cat: "music",
    desc: "A visually intense short film shot through practical light and lens flare.",
    colors: ["#ff6420", "#ff2d78"],
    thumb: "assets/thumbs/fr_fr.jpg"
  },
  {
    client: "Sakura", title: "Spring Reel", tag: "Social Media", cat: "social",
    desc: "A dreamy outdoor reel framing cherry blossoms and flowing fashion — spring campaign.",
    colors: ["#ff2d78", "#9b30ff"],
  },
  {
    client: "Studio Sessions", title: "Behind the Lens", tag: "BTS", cat: "social",
    desc: "Behind-the-scenes footage of a food & lifestyle commercial shoot.",
    colors: ["#ff6420", "#c9a96e"],
    thumb: "assets/thumbs/inside_crew.jpg", video: "assets/videos/inside_crew.mp4"
  },
  {
    client: "Gloria", title: "Brand Ad", tag: "Ad Creative", cat: "ad",
    desc: "Performance ad creative with on-screen subtitles, built for social feed placement.",
    colors: ["#00ff88", "#0a0a0a"],
    thumb: "assets/thumbs/gloria_ad.jpg", video: "assets/videos/gloria_ad.mp4"
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ad", label: "Ad Creative" },
  { id: "image", label: "Brand Film" },
  { id: "social", label: "Social Media" },
  { id: "event", label: "Event" },
  { id: "music", label: "Music Video" },
];

// ============================================
// PROJECTS PAGE
// ============================================
function ProjectsPage() {
  const [filter, setFilter] = useStateP("all");
  const [activeVideo, setActiveVideo] = useStateP(null);
  const visible = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 60, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 40% 40% at 50% 30%, rgba(155,48,255,0.16), transparent 60%)"
        }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Portfolio · 50+ projects · 2018 — present</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 24px 0", lineHeight: 0.95, textWrap: "balance" }}>
            Selected <em className="fwf-display-italic" style={{ color: "var(--fwf-purple)" }}>work.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 19, maxWidth: 560, margin: 0, lineHeight: 1.5 }}>
            Films, reels, ads, and brand productions delivered for B2B brands across hospitality, sports, and consumer goods.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <section style={{ position: "sticky", top: 72, zIndex: 10, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", padding: "20px 0" }}>
        <div className="fwf-container">
          <div className="fwf-scroll-x" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={"fwf-tab " + (filter === f.id ? "fwf-tab-active" : "")}
              >
                {f.label}
                <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}>
                  {f.id === "all" ? ALL_PROJECTS.length : ALL_PROJECTS.filter(p => p.cat === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 0 120px" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="fwf-proj-grid">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.client + p.title}
                {...p}
                index={i}
                onPlay={p.video ? () => setActiveVideo(p.video) : null}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={<>Seen enough? <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>Let's talk.</em></>}
        sub="Tell us about your brand. We'll tell you what we'd do."
      />

      {activeVideo && <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />}
    </main>
  );
}

function ProjectCard({ client, title, tag, desc, colors, thumb, video, index, onPlay }) {
  return (
    <div
      className="fwf-card fwf-card-pink"
      style={{
        padding: 0, overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "fwfFadeUp 600ms " + (index * 50) + "ms cubic-bezier(0.4,0,0.2,1) backwards",
        cursor: video ? "pointer" : "default",
      }}
      onClick={video && onPlay ? onPlay : undefined}
    >
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        background: thumb ? "#0a0a0a" : "linear-gradient(135deg, " + colors[0] + "40, " + colors[1] + " 90%), #0a0a0a",
        overflow: "hidden",
      }}>
        {thumb
          ? <img src={thumb} alt={title} className="fwf-proj-thumb-img" />
          : <>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 40%, " + colors[0] + "50, transparent 55%), radial-gradient(circle at 70% 80%, " + colors[1] + "60, transparent 55%)", mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")", mixBlendMode: "overlay", opacity: 0.6 }} />
            </>
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7))" }} />
        <div className="fwf-play"><Icons.Play size={18} /></div>
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="fwf-badge fwf-badge-pink" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>{tag}</span>
        </div>
      </div>
      <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="fwf-label" style={{ marginBottom: 6, fontSize: 10 }}>{client}</div>
        <h3 className="fwf-display" style={{ fontSize: 26, margin: "0 0 10px 0", letterSpacing: "-0.01em" }}>{title}</h3>
        <p style={{ color: "var(--fwf-text-mute)", fontSize: 13.5, lineHeight: 1.55, margin: "0 0 18px 0", flex: 1 }}>{desc}</p>
        {!video && (
          <a href="#" className="fwf-btn-bare" style={{ alignSelf: "flex-start" }} onClick={e => e.preventDefault()}>
            Coming soon <Icons.ArrowRight size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================
// PRICING PAGE
// ============================================
function PricingPage() {
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 50% 30%, rgba(255,45,120,0.18), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative", textAlign: "center" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1" style={{ justifyContent: "center" }}>
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">No hidden fees · no lock-ins</span>
            <span className="fwf-section-label-line" />
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 28px 0", lineHeight: 0.95, textWrap: "balance" }}>
            Four ways to <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>work with us.</em>
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 19, maxWidth: 620, margin: "0 auto", lineHeight: 1.5 }}>
            No hidden fees. No lock-ins. Just results. <span style={{ color: "#fff" }}>Pricing is discussed on your strategy call</span> — because every brand starts in a different place.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 0 120px" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="fwf-offers-grid">
            {OFFERS.map((o, i) => (
              <OfferCard key={i} {...o} expanded />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80 }} className="fwf-grid-collapse">
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">FAQ</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 60px)", margin: 0, lineHeight: 1, textWrap: "balance" }}>
                Things people <em className="fwf-display-italic">ask.</em>
              </h2>
            </div>
            <FAQ />
          </div>
        </div>
      </section>

      <FinalCTA
        headline={<>Not sure which offer is <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>right for you?</em></>}
        sub="Let's figure it out together. 30 minutes, no pressure."
      />
    </main>
  );
}

function FAQ() {
  const items = [
    { q: "Do you work with brands outside Germany?", a: "Yes — we work remotely with B2B brands across Europe and beyond. Production travel is built into the quote when needed." },
    { q: "How long does a project take?", a: "Launch Films typically run 1–2 weeks from kickoff to delivery. The Growth Retainer is ongoing with a 4–6 month minimum so we can actually learn what works." },
    { q: "Why no prices on the website?", a: "Every project is different. We price based on your goals, scope, and timeline — not a menu. That's how we keep quality up and clients honest about what they actually need." },
    { q: "Can I start with just one project?", a: "Absolutely. The Ad Creative Sprint is designed for exactly that. Most retainer clients start with a sprint, see the results, and continue from there." },
    { q: "Who's on the team?", a: "Florian Kotulla leads creative and strategy. We bring in a vetted bench of DPs, editors, motion designers, and media buyers depending on the project scope." },
  ];
  const [open, setOpen] = useStateP(0);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--fwf-hairline)" }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%", textAlign: "left", padding: "24px 0",
              background: "none", border: "none", color: "#fff",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              cursor: "pointer", fontFamily: "var(--fwf-body)"
            }}>
            <span style={{ fontSize: 20, fontWeight: 500 }}>{it.q}</span>
            <span style={{ color: open === i ? "var(--fwf-pink)" : "var(--fwf-text-mute)", flexShrink: 0 }}>
              {open === i ? <Icons.Minus size={20}/> : <Icons.Plus size={20}/>}
            </span>
          </button>
          {open === i && (
            <div style={{ paddingBottom: 24, color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, maxWidth: 640, animation: "fwfFadeUp 300ms ease" }}>
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 80, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(0,255,136,0.10), transparent 60%)" }} />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">About · Studio philosophy</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(48px, 7.5vw, 110px)", margin: "0 0 28px 0", lineHeight: 0.95, maxWidth: 1100, textWrap: "balance" }}>
            We believe great brands deserve <em className="fwf-display-italic" style={{ color: "var(--fwf-green)" }}>great creative.</em>
          </h1>
        </div>
      </section>

      {/* Founder block */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64, alignItems: "center" }} className="fwf-grid-collapse">
            <div style={{ position: "relative" }}>
              <Crosshairs />
              <div style={{
                aspectRatio: "3/4",
                background: "url(assets/founder.jpg) center/cover no-repeat",
                borderRadius: 8,
                border: "1px solid var(--fwf-hairline-strong)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7))" }} />
                <div style={{
                  position: "absolute", left: 20, bottom: 20,
                  fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#fff",
                  borderLeft: "2px solid var(--fwf-pink)", paddingLeft: 12
                }}>
                  Florian Kotulla<br/>
                  <span style={{ color: "var(--fwf-text-mute)", fontSize: 10 }}>Founder & Creative Director</span>
                </div>
              </div>
            </div>

            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">The Founder</span>
              </div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: "0 0 28px 0", lineHeight: 1.05, textWrap: "balance" }}>
                Filmmaker. Creative director. <em className="fwf-display-italic">Performance thinker.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.65, margin: "0 0 18px 0" }}>
                Flow West Films was founded by <strong style={{ color: "#fff", fontWeight: 500 }}>Florian Kotulla</strong> — filmmaker, creative director, and performance marketing thinker. Based in Stuttgart, the studio combines cinematic storytelling with ad strategy to help B2B brands grow.
              </p>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.65, margin: "0 0 32px 0" }}>
                Florian has shot for hospitality groups, sports brands, watchmakers, and SaaS companies — with credits on IMDb across narrative film and commercial work.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://imdb.com/name/nm6945443/" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-ghost fwf-btn-sm">
                  IMDb credits <Icons.ExternalLink size={12}/>
                </a>
                <a href="https://linkedin.com/in/florian-kotulla/" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-ghost fwf-btn-sm">
                  LinkedIn <Icons.ExternalLink size={12}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 pillars */}
      <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
        <div className="fwf-container">
          <div className="fwf-section-label">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Operating system</span>
          </div>
          <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 72px)", margin: "0 0 80px 0", maxWidth: 800, textWrap: "balance" }}>
            Four pillars. <em className="fwf-display-italic">One outcome.</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="fwf-pillars">
            {[
              { n: "01", t: "Strategy", d: "We start where most agencies finish: with the funnel, the audience, the proof of why this exists.", c: "pink" },
              { n: "02", t: "Craft", d: "6K cinema cameras, considered lighting, restraint in the edit. Cinematic doesn't mean noisy.", c: "purple" },
              { n: "03", t: "Speed", d: "Tight pre-production, ruthless on timelines. You'll never wonder where your edit is.", c: "green" },
              { n: "04", t: "Results", d: "Every frame is built to drive an action. We measure performance like a media buyer, not an artist.", c: "orange" },
            ].map((p, i) => (
              <div key={i} className={"fwf-card fwf-card-" + p.c} style={{ padding: 28, position: "relative", minHeight: 280 }}>
                <Crosshairs />
                <div className="fwf-mono" style={{ color: "var(--fwf-" + p.c + ")", fontSize: 14, letterSpacing: "0.2em", marginBottom: 24 }}>{p.n}</div>
                <h3 className="fwf-display" style={{ fontSize: 40, margin: "0 0 16px 0" }}>{p.t}.</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client strip */}
      <section style={{ borderTop: "1px solid var(--fwf-hairline)", padding: "60px 0", background: "#080808" }}>
        <div className="fwf-container">
          <div className="fwf-label" style={{ textAlign: "center", marginBottom: 36 }}>— Partial client list —</div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 56px" }}>
            {["Radisson Blu", "Palazzo Stuttgart", "Schmolke Carbon", "App Liqes", "Zenroots", "Swarovski", "Alienwatch", "Hatz Beer", "Pane Vino", "EasyFoil", "CW Architectural Art"].map((c, i) => (
              <span key={i} className="fwf-display" style={{ fontSize: 24, color: "rgba(255,255,255,0.55)", letterSpacing: "-0.01em" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

// ============================================
// CONTACT PAGE
// ============================================
function ContactPage() {
  const [form, setForm] = useStateP({ name: "", company: "", email: "", interest: "Not sure yet", message: "" });
  const [submitted, setSubmitted] = useStateP(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 100, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(255,45,120,0.14), transparent 60%)" }} />

        <div className="fwf-container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "stretch" }} className="fwf-grid-collapse">
            {/* Left — founder photo */}
            <div style={{ position: "relative", minHeight: 600 }} className="fwf-contact-photo">
              <Crosshairs />
              <div style={{
                position: "absolute", inset: 0,
                background: "url(assets/founder.jpg) center 20%/cover no-repeat",
                borderRadius: 8,
                border: "1px solid var(--fwf-hairline-strong)",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))" }} />
                <div style={{
                  position: "absolute", top: 24, left: 24,
                  fontFamily: "var(--fwf-mono)", fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "var(--fwf-text-mute)",
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fwf-green)", boxShadow: "0 0 8px var(--fwf-green)" }} />
                  Available · Q3 2026
                </div>
                <div style={{ position: "absolute", left: 28, bottom: 28, right: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="fwf-eyebrow" style={{ color: "var(--fwf-pink)" }}>Florian Kotulla</div>
                  <div className="fwf-display" style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.01em" }}>
                    Founder & Creative Director
                  </div>
                  <div style={{ color: "var(--fwf-text-mute)", fontSize: 14, marginTop: 6 }}>
                    Stuttgart · Available remotely across Europe
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form + CTA */}
            <div>
              <div className="fwf-section-label">
                <span className="fwf-section-label-line" />
                <span className="fwf-eyebrow">Get in touch</span>
              </div>
              <h1 className="fwf-display" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", margin: "0 0 24px 0", lineHeight: 0.95, textWrap: "balance" }}>
                Let's build something{" "}
                <TypewriterWord
                  words={["exceptional.", "unique.", "unforgettable.", "remarkable."]}
                  className="fwf-display-italic"
                  style={{ color: "var(--fwf-pink)" }}
                />
              </h1>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 17, lineHeight: 1.6, margin: "0 0 32px 0", maxWidth: 540 }}>
                We work with B2B brands who are serious about scaling with premium creative. Book a 30-minute strategy call and let's see if we're a fit.
              </p>

              <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary fwf-pulse" style={{ marginBottom: 8 }}>
                <Icons.Calendar size={14}/>
                Book a strategy call
                <Icons.ArrowRight size={14}/>
              </a>

              <div className="fwf-divider-dot">— or send a message —</div>

              {submitted ? (
                <div style={{
                  padding: 32, border: "1px solid rgba(0,255,136,0.4)",
                  borderRadius: 12, background: "rgba(0,255,136,0.05)",
                  textAlign: "center"
                }}>
                  <div style={{ color: "var(--fwf-green)", marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <Icons.Check size={32} />
                  </div>
                  <h3 className="fwf-display" style={{ fontSize: 28, margin: "0 0 8px 0" }}>Message received.</h3>
                  <p style={{ color: "var(--fwf-text-mute)", margin: 0, fontSize: 15 }}>
                    Florian will get back to you within 24 hours. Usually faster.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="fwf-form-row">
                    <div>
                      <label className="fwf-label-form">Name</label>
                      <input className="fwf-input" type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="fwf-label-form">Company</label>
                      <input className="fwf-input" type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="fwf-label-form">Email</label>
                    <input className="fwf-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="fwf-label-form">What are you looking for?</label>
                    <select className="fwf-select" value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}>
                      <option>Launch Film</option>
                      <option>Ad Creative Sprint</option>
                      <option>Growth Retainer</option>
                      <option>Premium Partner</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="fwf-label-form">Tell us more (optional)</label>
                    <textarea className="fwf-textarea" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="fwf-btn fwf-btn-primary" style={{ justifyContent: "center", marginTop: 8 }}>
                    Send message
                    <Icons.ArrowRight size={14}/>
                  </button>
                </form>
              )}

              <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center" }}>
                <a href="tel:+4915737918515" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Phone size={14}/> +49 157 37918515
                </a>
                <a href="https://instagram.com/flowwestfilms" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Instagram size={14}/> @flowwestfilms
                </a>
                <a href="https://linkedin.com/in/florian-kotulla/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fwf-text-mute)", textDecoration: "none", fontSize: 14, fontFamily: "var(--fwf-mono)" }}>
                  <Icons.Linkedin size={14}/> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ProjectsPage, PricingPage, AboutPage, ContactPage });
