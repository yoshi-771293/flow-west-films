/* global React */
const { useState, useEffect } = React;

// ============================================
// FWF Lion Logo — winged-lion brand marks
//   variant="lion"   → winged-lion emblem only (compact mark, nav/mobile)
//   variant="lockup" → full horizontal "Flow West Films" wordmark + lion
//   variant="emblem" → vertical lion + "FWF" monogram crest
// ============================================
const LOGO_SRC = {
  lion:   "assets/fwf-lion.png",
  lockup: "assets/fwf-lockup.png",
  emblem: "assets/fwf-emblem.png",
};
function Logo({ size = 32, variant = "lion", glow = false, style = {} }) {
  return (
    <img
      src={LOGO_SRC[variant] || LOGO_SRC.lion}
      alt="Flow West Films"
      style={{
        height: size,
        width: "auto",
        display: "block",
        filter: glow ? "drop-shadow(0 0 22px rgba(255,45,120,0.35)) drop-shadow(0 0 44px rgba(155,48,255,0.22))" : "none",
        ...style,
      }}
    />
  );
}

// ============================================
// Crosshair markers — Vercel-style detail
// ============================================
function Crosshairs() {
  return (
    <>
      <div className="fwf-crosshair" style={{ top: -7, left: -7 }} />
      <div className="fwf-crosshair" style={{ top: -7, right: -7 }} />
      <div className="fwf-crosshair" style={{ bottom: -7, left: -7 }} />
      <div className="fwf-crosshair" style={{ bottom: -7, right: -7 }} />
    </>
  );
}

// ============================================
// Inline icons (lucide-style monoline)
// ============================================
const Icon = ({ children, size = 20, color = "currentColor", stroke = 1.5 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
  >
    {children}
  </svg>
);

const Icons = {
  ArrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>,
  ArrowDown: (p) => <Icon {...p}><path d="M12 5v14M5 12l7 7 7-7"/></Icon>,
  Calendar:  (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Icon>,
  Play:      (p) => <Icon {...p}><polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/></Icon>,
  Film:      (p) => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></Icon>,
  Zap:       (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>,
  TrendUp:   (p) => <Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>,
  Star:      (p) => <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>,
  Check:     (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>,
  Plus:      (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Minus:     (p) => <Icon {...p}><path d="M5 12h14"/></Icon>,
  Menu:      (p) => <Icon {...p}><path d="M3 6h18M3 12h18M3 18h18"/></Icon>,
  X:         (p) => <Icon {...p}><path d="M18 6L6 18M6 6l12 12"/></Icon>,
  Phone:     (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>,
  Mail:      (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></Icon>,
  Instagram: (p) => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></Icon>,
  Linkedin:  (p) => <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Icon>,
  Imdb:      (p) => <Icon {...p}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M5 9v6M8 9v6l2-3-2-3M13 9v6h2v-6M18 9v6h2v-3"/></Icon>,
  Brain:     (p) => <Icon {...p}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></Icon>,
  Aperture:  (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></Icon>,
  Target:    (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>,
  Sparkles:  (p) => <Icon {...p}><path d="M12 2l1.8 5.5L19 9.5l-5.2 2L12 17l-1.8-5.5L5 9.5l5.2-2L12 2zM19 14l.9 2.5L22 17.5l-2.1 1L19 21l-.9-2.5L16 17.5l2.1-1L19 14zM5 14l.9 2.5L8 17.5l-2.1 1L5 21l-.9-2.5L2 17.5l2.1-1L5 14z"/></Icon>,
  ExternalLink: (p) => <Icon {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>,
  BarChart:  (p) => <Icon {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Icon>,
  Repeat:    (p) => <Icon {...p}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></Icon>,
  FileText:  (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Icon>,
};

// ============================================
// Router (hash-based)
// ============================================
function useRoute() {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace("#/", "").replace("#", "");
    return h || "home";
  });
  useEffect(() => {
    const handler = () => {
      const h = window.location.hash.replace("#/", "").replace("#", "");
      setRoute(h || "home");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return [route, (r) => { window.location.hash = "/" + r; }];
}

function Link({ to, children, className, onClick, ...rest }) {
  return (
    <a
      href={"#/" + to}
      className={className}
      onClick={(e) => {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (onClick) onClick(e);
      }}
      {...rest}
    >{children}</a>
  );
}

// ============================================
// Nav
// ============================================
function Nav({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMobile(false); };
    if (mobile) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  const links = [
    { to: "home", label: "Home" },
    { to: "projects", label: "Projects" },
    { to: "pricing", label: "Pricing" },
    { to: "about", label: "About" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={"fwf-nav " + (scrolled ? "fwf-nav-scrolled" : "")}>
        <div className="fwf-nav-inner">
          <Link to="home" className="fwf-nav-logo">
            <Logo size={42} />
            <span className="fwf-nav-wordmark">Flow West Films</span>
          </Link>
          <div className="fwf-nav-links fwf-nav-links-center">
            {links.map((l) => l.external ? (
              <a key={l.href} href={l.href} className="fwf-nav-link">{l.label}</a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={"fwf-nav-link " + (route === l.to ? "fwf-nav-link-active" : "")}
              >{l.label}</Link>
            ))}
          </div>
          <div className="fwf-nav-links">
            <a
              href="/audit/"
              className="fwf-btn fwf-btn-sm fwf-nav-cta-desktop"
              style={{ borderWidth: "1.5px", borderStyle: "solid", borderColor: "#a855f7", background: "transparent", color: "rgba(255,255,255,0.9)", transition: "box-shadow 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ff2d78";
                e.currentTarget.style.boxShadow = "0 0 0 1px #ff2d78, 0 0 16px rgba(255,45,120,0.4)";
                const s = e.currentTarget.querySelector("span");
                if (s) s.style.color = "#ff2d78";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#a855f7";
                e.currentTarget.style.boxShadow = "";
                const s = e.currentTarget.querySelector("span");
                if (s) s.style.color = "#a855f7";
              }}
            >
              <span style={{ color: "#a855f7", transition: "color 0.2s" }}>Free</span>{" "}Audit
            </a>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary fwf-btn-sm fwf-nav-cta-desktop">
              <Icons.Calendar size={14} />
              Book a call
            </a>
            <button className="fwf-mobile-btn" onClick={() => setMobile(true)}>
              <Icons.Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {mobile && (
        <div className="fwf-mobile-overlay">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <Logo size={40} />
            <button className="fwf-mobile-btn" onClick={() => setMobile(false)}>
              <Icons.X size={20} />
            </button>
          </div>
          {links.map((l) => l.external ? (
            <a key={l.href} href={l.href} onClick={() => setMobile(false)}>{l.label}</a>
          ) : (
            <Link key={l.to} to={l.to} onClick={() => setMobile(false)}>{l.label}</Link>
          ))}
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="/audit/"
              className="fwf-btn"
              style={{ border: "1.5px solid #a855f7", background: "transparent", color: "rgba(255,255,255,0.9)" }}
              onClick={() => setMobile(false)}
            >
              <span style={{ color: "#a855f7" }}>Free</span>{" "}Audit →
            </a>
            <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary" onClick={() => setMobile(false)}>
              <Icons.Calendar size={14} /> Book a strategy call
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// Footer
// ============================================
function Footer() {
  return (
    <footer className="fwf-footer">
      <div className="fwf-container">
        <div className="fwf-footer-grid">
          <div className="fwf-footer-col">
            <div style={{ marginBottom: 22 }}>
              <Logo variant="lockup" size={64} />
            </div>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 320 }}>
              Premium ad creative & cinematic film production for B2C brands.
            </p>
          </div>

          <div className="fwf-footer-col">
            <h4>Navigate</h4>
            <Link to="home">Home</Link>
            <Link to="projects">Projects</Link>
            <Link to="pricing">Pricing</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
            <a href="/audit/">Audit</a>
            <Link to="impressum" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--fwf-hairline)" }}>Impressum</Link>
            <Link to="datenschutz">Datenschutz</Link>
          </div>

          <div className="fwf-footer-col">
            <h4>Contact</h4>
            <a href="tel:+4915737918515">+49 157 37918515</a>
            <a href="mailto:info@flowwestfilms.de">info@flowwestfilms.de</a>
            <div style={{ color: "var(--fwf-text-mute)", fontSize: 14, padding: "5px 0" }}>Stuttgart, Germany</div>
          </div>

          <div className="fwf-footer-col">
            <h4>Follow</h4>
            <a href="https://instagram.com/flowwestfilms" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com/in/florian-kotulla/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://imdb.com/name/nm6945443/" target="_blank" rel="noreferrer">IMDb</a>
          </div>
        </div>

        <div className="fwf-footer-bar">
          <div>© 2026 Flow West Films · Stuttgart, Germany</div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link to="impressum" style={{ color: "var(--fwf-text-faint)", fontSize: 12, fontFamily: "var(--fwf-mono)", letterSpacing: "0.12em", textDecoration: "none" }}>Impressum</Link>
            <Link to="datenschutz" style={{ color: "var(--fwf-text-faint)", fontSize: 12, fontFamily: "var(--fwf-mono)", letterSpacing: "0.12em", textDecoration: "none" }}>Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// Final CTA — reused on every page
// ============================================
function FinalCTA({ headline, sub }) {
  return (
    <section className="fwf-section-lg" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, transparent, rgba(255,45,120,0.04) 60%, transparent)" }}>
      <div className="fwf-grid-bg" />
      {/* radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 60% at 50% 60%, rgba(255,45,120,0.18), transparent 70%)"
      }} />
      <div className="fwf-container" style={{ position: "relative", textAlign: "center" }}>
        <div className="fwf-eyebrow" style={{ color: "var(--fwf-pink)", marginBottom: 24 }}>
          → Let's talk
        </div>
        <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 6vw, 84px)", margin: "0 0 24px 0", textWrap: "balance" }}>
          {headline || (<>Ready to scale with <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>premium creative?</em></>)}
        </h2>
        <p style={{ color: "var(--fwf-text-mute)", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.5 }}>
          {sub || "Flow West Films combines cinematic production, ad creative and performance thinking into one external premium team."}
        </p>
        <a href="https://calendly.com/flowwestfilms-appointment/30min" target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary fwf-pulse">
          <Icons.Calendar size={14} />
          Book a strategy call
          <Icons.ArrowRight size={14} />
        </a>
        <div style={{ marginTop: 24 }}>
          <span style={{ color: "var(--fwf-text-faint)", fontFamily: "var(--fwf-mono)", fontSize: 13, letterSpacing: "0.1em" }}>
            Not ready yet?
          </span>
          {" "}
          <a href="/audit/" style={{ color: "var(--fwf-pink)", fontFamily: "var(--fwf-mono)", fontSize: 13, textDecoration: "none", letterSpacing: "0.1em" }}>
            Start with a free brand audit →
          </a>
        </div>
        <div style={{ marginTop: 40, fontFamily: "var(--fwf-mono)", fontSize: 11, letterSpacing: "0.22em", color: "var(--fwf-text-faint)" }}>
          FLOWWESTFILMS.DE
        </div>
      </div>
    </section>
  );
}

// ============================================
// Trust marquee (shared)
// ============================================
function TrustMarquee() {
  // Clients with real logo files use an img; others render as styled wordmarks.
  // All logo images get filter:brightness(0)invert(1) so they appear white on the dark bg.
  // viral_house.svg is already designed for dark backgrounds (white+red) so no filter.
  // h: logo display height in px (default 26). Use smaller values for very wide wordmarks.
  const clients = [
    { name: "Porsche",           logo: "assets/logos/porsche.svg",       filter: true,  h: 11 },
    { name: "Radisson Blu",      logo: "assets/logos/radisson_blu.svg",  filter: true,  h: 28 },
    { name: "Thomas Sabo",       logo: "assets/logos/thomas_sabo.png",   filter: true,  h: 46 },
    { name: "Swarovski",         logo: "assets/logos/swarovski.svg",     filter: true,  h: 18 },
    { name: "viral house",       logo: "assets/logos/viral_house.svg",   filter: false, h: 22 },
    { name: "Schmolke Carbon" },
    { name: "Hatz Beer" },
    { name: "Liqes" },
    { name: "Alienwork" },
    { name: "Pane Vino" },
    { name: "EasyFoil" },
    { name: "Zenroots" },
    { name: "Palazzo Stuttgart" },
  ];
  const items = [...clients, ...clients];

  return (
    <div style={{ borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", padding: "40px 0", background: "#080808" }}>
      <div className="fwf-container" style={{ marginBottom: 22 }}>
        <div className="fwf-label" style={{ textAlign: "center" }}>— Trusted by —</div>
      </div>
      <div className="fwf-marquee">
        <div className="fwf-marquee-track">
          {items.map((c, i) => (
            <span key={i} className="fwf-marquee-item" style={{ display: "inline-flex", alignItems: "center" }}>
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{
                    height: c.h || 26,
                    width: "auto",
                    display: "block",
                    opacity: 0.72,
                    filter: c.filter ? "brightness(0) invert(1)" : "none",
                  }}
                />
              ) : (
                <span style={{
                  fontFamily: "var(--fwf-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  whiteSpace: "nowrap",
                }}>{c.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// TypewriterWord — cycles words letter by letter
// ============================================
function TypewriterWord({ words, style, className }) {
  const [text, setText] = useState('');
  const [widx, setWidx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[widx % words.length];
    let t;
    if (!deleting) {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 88);
      } else {
        t = setTimeout(() => setDeleting(true), 2100);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 50);
      } else {
        setDeleting(false);
        setWidx(i => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, widx, words]);

  return (
    <span className={className || "fwf-display-italic"} style={style}>
      {text || ' '}
      <span className="fwf-cursor" />
    </span>
  );
}

// ============================================
// ReassureBlock — "never done X? we'll guide you" callout. Used by the
// funnel and performance sections to defuse the two most common blockers.
// ============================================
function ReassureBlock({ question, answer, points, accent }) {
  return (
    <div className={"fwf-card fwf-card-" + accent} style={{ padding: 32 }}>
      <h3 style={{ fontSize: 19, margin: "0 0 10px 0", fontWeight: 500, lineHeight: 1.35 }}>{question}</h3>
      <p style={{ color: "var(--fwf-" + accent + ")", fontSize: 15, margin: "0 0 22px 0", fontWeight: 500 }}>{answer}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {points.map((p, i) => (
          <li key={i} style={{ display: "flex", gap: 12, padding: "7px 0", fontSize: 14.5, color: "var(--fwf-text-mute)", lineHeight: 1.55 }}>
            <span style={{ color: "var(--fwf-" + accent + ")", flexShrink: 0, marginTop: 3 }}>
              <Icons.Check size={15} stroke={2} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// FunnelSection — TOFU / MOFU / BOFU explainer + funnel reassurance.
// Shared between Home and Pricing.
// ============================================
function FunnelSection({ cta = true }) {
  const stages = [
    {
      k: "TOFU", full: "Top of Funnel", c: "purple", t: "Get discovered",
      d: "Cold audiences who've never heard of you. Story-led creative that stops the scroll, earns attention, and makes the brand stick.",
    },
    {
      k: "MOFU", full: "Middle of Funnel", c: "pink", t: "Earn the trust",
      d: "People who know you but aren't ready yet. Retargeting, testimonials and proof that answer the objections before they're spoken out loud.",
    },
    {
      k: "BOFU", full: "Bottom of Funnel", c: "green", t: "Convert",
      d: "People ready to act. Direct-response creative and a clear offer, pointed straight at the page or booking flow where they actually convert.",
    },
  ];

  return (
    <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
      <div className="fwf-container">
        <div className="fwf-section-label">
          <span className="fwf-section-label-line" />
          <span className="fwf-eyebrow">The Funnel</span>
        </div>
        <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 24px 0", maxWidth: 780, textWrap: "balance" }}>
          One video doesn't sell. <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>A funnel does.</em>
        </h2>
        <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, margin: "0 0 56px 0", maxWidth: 640 }}>
          Nobody goes from never hearing of you to buying in a single ad. So we don't build single ads — we build the whole path, and every asset knows exactly which job it's doing.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", marginBottom: 56 }} className="fwf-pillars">
          {stages.map((s, i, arr) => (
            <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
              <div className="fwf-display" style={{ color: "var(--fwf-" + s.c + ")", fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 6 }}>
                {s.k}
              </div>
              <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 12, color: "var(--fwf-text-faint)", marginBottom: 18 }}>
                ({s.full})
              </div>
              <h3 style={{ fontSize: 17, margin: "0 0 12px 0", fontWeight: 500 }}>{s.t}</h3>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>

        <ReassureBlock
          accent="purple"
          question="Never built a funnel or a sales page before?"
          answer="No problem — we guide you through it."
          points={[
            "We map the full funnel with you. You don't need to arrive with one.",
            "Every asset gets a clear job: attract, convince, or convert.",
            "We tell you what each stage needs before anything gets produced.",
            "If a landing or sales page is required, we scope and build it with you.",
          ]}
        />

        {cta && (
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <span style={{ color: "var(--fwf-text-mute)", fontSize: 14 }}>See it in action:</span>
            <Link
              to="pricing"
              className="fwf-badge fwf-badge-link fwf-badge-pink"
              style={{ padding: "10px 20px", fontSize: 12.5, borderRadius: 100, textDecoration: "none" }}
            >
              Growth Retainer
            </Link>
            <Link
              to="pricing"
              className="fwf-badge fwf-badge-link fwf-badge-green"
              style={{ padding: "10px 20px", fontSize: 12.5, borderRadius: 100, textDecoration: "none" }}
            >
              Premium Partner
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// GrowthEngineSection — "how we scale" explainer, shared between Home
// (below Recent Productions) and Pricing (below offers + audit bridge)
// ============================================
function GrowthEngineSection({ cta = true }) {
  const principles = [
    {
      i: <Icons.Target size={22} />, c: "pink", t: "We start with your numbers",
      d: "Before a single euro goes into media, we agree on the exact metrics that define success for your business — CTR, ROAS, CPA, whichever actually matters to you. Every decision after that gets measured against those targets.",
    },
    {
      i: <Icons.TrendUp size={22} />, c: "pink", t: "Scaling, done right",
      d: "We don't inflate budgets on a hunch. Once a creative concept proves itself, we duplicate what's working into new audience campaigns — scaling the exact thing driving results, not diluting it.",
    },
  ];

  const collab = [
    { i: <Icons.Calendar size={22} />, t: "Onboarding (2–3 Days)", d: "A fast, focused setup to get strategy, access, and tracking aligned — no weeks-long ramp-up.", c: "purple" },
    { i: <Icons.Phone size={22} />, t: "Weekly Performance Calls", d: "A standing sync with your dedicated Performance Marketing Manager to review what's working and answer questions in real time.", c: "green" },
    { i: <Icons.FileText size={22} />, t: "Monthly Reporting", d: "A full report on performance and insights every month, so you always know exactly where your budget is going and why.", c: "orange" },
  ];

  return (
    <section className="fwf-section" style={{ borderTop: "1px solid var(--fwf-hairline)" }}>
      <div className="fwf-container">
        <div className="fwf-section-label">
          <span className="fwf-section-label-line" />
          <span className="fwf-eyebrow">Performance Marketing</span>
        </div>
        <h2 className="fwf-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 24px 0", maxWidth: 780, textWrap: "balance" }}>
          Creative built to become <em className="fwf-display-italic" style={{ color: "var(--fwf-pink)" }}>your growth engine.</em>
        </h2>
        <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, margin: "0 0 28px 0", maxWidth: 640 }}>
          This isn't creative for creative's sake. Every asset we make is built to move a number that matters to your business — leads, brand awareness, sales, or the applicants walking through your door. Once a concept works, we don't guess why. We scale it, deliberately.
        </p>

        <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 10, padding: "10px 18px", borderRadius: 100, border: "1px solid rgba(255,45,120,0.28)", background: "rgba(255,45,120,0.06)", marginBottom: 56 }}>
          <span style={{ color: "var(--fwf-pink)", flexShrink: 0, marginTop: 1 }}><Icons.Check size={15} stroke={2} /></span>
          <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.88)" }}>
            Included in the Growth Retainer and Premium Partner — the two offers where we run your paid media.
          </span>
        </div>

        <div style={{ borderTop: "1px solid var(--fwf-hairline)", marginBottom: 64 }}>
          {principles.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "32px 0", borderBottom: "1px solid var(--fwf-hairline)" }}>
              <div style={{ color: "var(--fwf-" + p.c + ")", flexShrink: 0 }}>{p.i}</div>
              <div>
                <h3 style={{ fontSize: 18, margin: "0 0 8px 0", fontWeight: 500 }}>{p.t}</h3>
                <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <span className="fwf-eyebrow" style={{ display: "block", marginBottom: 24 }}>Where We Scale</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginBottom: 64 }} className="fwf-grid-collapse">
          <div className="fwf-card fwf-card-green" style={{ padding: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <img src="assets/logos/meta-neon.png" alt="Meta" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
              <img src="assets/logos/tiktok-neon.png" alt="TikTok" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
              <img src="assets/logos/linkedin-neon.png" alt="LinkedIn" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
            </div>
            <h3 style={{ fontSize: 18, margin: "0 0 10px 0", fontWeight: 500 }}>Paid Social</h3>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Most of our clients start on Meta — but we scale wherever your audience actually is: TikTok and LinkedIn too.
            </p>
          </div>
          <div className="fwf-card fwf-card-purple" style={{ padding: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <img src="assets/logos/google-neon.png" alt="Google" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
              <img src="assets/logos/youtube-neon.png" alt="YouTube" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
            </div>
            <h3 style={{ fontSize: 18, margin: "0 0 10px 0", fontWeight: 500 }}>Search & YouTube</h3>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Google and YouTube Ads run on intent, not interest — a different engine than Meta. A strong option if you'd rather not lean hard into paid social.
            </p>
          </div>
          <div className="fwf-card fwf-card-orange" style={{ padding: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <img src="assets/logos/openai-neon.png" alt="OpenAI" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
              <img src="assets/logos/claude-neon.png" alt="Claude" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
              <img src="assets/logos/gemini-neon.png" alt="Gemini" style={{ height: 22, width: "auto", mixBlendMode: "screen" }} />
            </div>
            <h3 style={{ fontSize: 18, margin: "0 0 10px 0", fontWeight: 500 }}>AI Visibility</h3>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Buyers increasingly start their search inside an AI. We optimize your brand to be found in ChatGPT, Claude, and Gemini — not just in Google.
            </p>
          </div>
        </div>

        <span className="fwf-eyebrow" style={{ display: "block", marginBottom: 24 }}>Onboarding & Collaboration</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--fwf-hairline)", borderBottom: "1px solid var(--fwf-hairline)", marginBottom: 64 }} className="fwf-pillars">
          {collab.map((w, i, arr) => (
            <div key={i} style={{ padding: "40px 32px", borderRight: i < arr.length - 1 ? "1px solid var(--fwf-hairline)" : "none" }}>
              <div style={{ color: "var(--fwf-" + w.c + ")", marginBottom: 24 }}>{w.i}</div>
              <h3 style={{ fontSize: 17, margin: "0 0 12px 0", fontWeight: 500 }}>{w.t}</h3>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{w.d}</p>
            </div>
          ))}
        </div>

        <span className="fwf-eyebrow" style={{ display: "block", marginBottom: 24 }}>Analytics & Smart Optimization</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="fwf-grid-collapse">
          <div className="fwf-card fwf-card-pink" style={{ padding: 32 }}>
            <div style={{ color: "var(--fwf-pink)", marginBottom: 20 }}><Icons.BarChart size={24} /></div>
            <h3 style={{ fontSize: 18, margin: "0 0 10px 0", fontWeight: 500 }}>Live Analytics Tool</h3>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Your own live dashboard — real-time CTR, ROAS, and CPA, no waiting for a report to know how a campaign is doing.
            </p>
          </div>
          <div className="fwf-card fwf-card-purple" style={{ padding: 32 }}>
            <div style={{ color: "var(--fwf-purple)", marginBottom: 20 }}><Icons.Repeat size={24} /></div>
            <h3 style={{ fontSize: 18, margin: "0 0 10px 0", fontWeight: 500 }}>CRM & Meta Feedback Loop</h3>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Every lead flows straight into your CRM. Whoever handles sales on your side — founder or team — flags which leads were actually qualified and sends that back. We feed it into Meta, training the algorithm to chase quality leads instead of raw volume.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <ReassureBlock
            accent="green"
            question="Only ever done organic? Never run paid social?"
            answer="No problem — we guide you through it."
            points={[
              "We handle the setup end to end: ad account, tracking, audiences.",
              "Your organic work isn't wasted — what already performs organically is usually the first thing we test as paid.",
              "We start on a defined test budget against agreed targets, then scale only what earns it.",
              "Weekly calls mean you learn the system while we run it. No black box.",
            ]}
          />
        </div>

        {cta && (
          <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--fwf-hairline)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 420 }}>
              This is what the Growth Retainer and Premium Partner are built around.
            </p>
            <Link to="pricing" className="fwf-btn fwf-btn-primary">
              Check out the Growth Retainer & Premium Partner <Icons.ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// BunnyPlayer — plays a Bunny Stream video via hls.js pointed straight at the
// HLS manifest, forcing the top bitrate rendition immediately so playback
// starts at max resolution instead of ramping up through Bunny's default ABR.
// Falls back to native HLS (Safari) when hls.js isn't supported.
// ============================================
const BUNNY_PULL_ZONE = "vz-fd89cb27-622.b-cdn.net";
function BunnyPlayer({ src, poster, style, className, muted = true, loop = false, controls = true }) {
  const videoRef = React.useRef(null);
  const guid = src && src.includes("/embed/684848/") ? src.split("/embed/684848/")[1]?.split("?")[0] : null;

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !guid) return;
    const manifestUrl = `https://${BUNNY_PULL_ZONE}/${guid}/playlist.m3u8`;
    let hls;
    // Forcing currentLevel triggers hls.js to flush/reload the buffer, which can abort
    // a play() call issued in the same tick — so play from the video's own "canplay"
    // event instead of right after the level switch.
    video.addEventListener("canplay", () => video.play().catch(() => {}), { once: true });
    if (window.Hls && window.Hls.isSupported()) {
      hls = new window.Hls({ capLevelToPlayerSize: false, startLevel: -1 });
      hls.loadSource(manifestUrl);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, (evt, data) => {
        hls.currentLevel = data.levels.length - 1; // skip ABR ramp-up, force top quality now
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = manifestUrl;
    }
    return () => { if (hls) hls.destroy(); };
  }, [guid]);

  if (!guid) return null;

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      style={style}
      controls={controls}
      autoPlay
      muted={muted}
      loop={loop}
      playsInline
    />
  );
}

// ============================================
// VideoModal — full-screen video lightbox
// ============================================
function VideoModal({ src, onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const isBunny = src && src.includes("mediadelivery.net");

  // Detect embed URL (Vimeo / YouTube) vs Bunny (own HLS player) vs local mp4
  const isEmbed = src && (src.includes("vimeo.com") || src.includes("youtube.com") || src.includes("youtu.be"));
  let embedSrc = src;

  if (isEmbed && src.includes("vimeo.com") && !src.includes("player.vimeo.com")) {
    const id = src.split("/").filter(Boolean).pop().split("?")[0];
    embedSrc = "https://player.vimeo.com/video/" + id + "?autoplay=1&title=0&byline=0&portrait=0";
  }
  if (isEmbed && (src.includes("youtube.com/watch") || src.includes("youtu.be") || src.includes("youtube.com/shorts"))) {
    const id = src.includes("/shorts/") ? src.split("/shorts/")[1].split(/[?&/]/)[0]
             : src.includes("youtu.be") ? src.split("/").pop().split("?")[0]
             : new URL(src).searchParams.get("v");
    embedSrc = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
  }

  return (
    <div className="fwf-video-modal-backdrop" onClick={onClose}>
      <div className="fwf-video-modal-inner" onClick={e => e.stopPropagation()}>
        <button className="fwf-video-modal-close" onClick={onClose}>
          <Icons.X size={12} /> Close
        </button>
        {isBunny ? (
          <BunnyPlayer
            className="fwf-video-modal-video"
            src={src}
            style={{ aspectRatio: "16/9" }}
          />
        ) : isEmbed ? (
          <iframe
            className="fwf-video-modal-video"
            src={embedSrc}
            style={{ aspectRatio: "16/9", border: "none" }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            className="fwf-video-modal-video"
            src={src}
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
    </div>
  );
}

// Expose for other files
Object.assign(window, { Logo, Crosshairs, Icons, useRoute, Link, Nav, Footer, FinalCTA, TrustMarquee, TypewriterWord, VideoModal, BunnyPlayer, GrowthEngineSection, FunnelSection });
