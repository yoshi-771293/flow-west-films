/* global React */
const { useState, useEffect, useRef } = React;

// ============================================
// FWF Lion Logo (uses real PNG)
// ============================================
function Logo({ size = 32 }) {
  return (
    <img
      src="assets/fwf-logo.png"
      alt="Flow West Films"
      style={{ height: size, width: "auto", display: "block" }}
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
      onClick={(e) => { if (onClick) onClick(e); }}
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
            <Logo size={34} />
            <span className="fwf-nav-wordmark">Flow West Films</span>
          </Link>
          <div className="fwf-nav-links fwf-nav-links-center">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={"fwf-nav-link " + (route === l.to ? "fwf-nav-link-active" : "")}
              >{l.label}</Link>
            ))}
          </div>
          <div className="fwf-nav-links">
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
            <Logo size={34} />
            <button className="fwf-mobile-btn" onClick={() => setMobile(false)}>
              <Icons.X size={20} />
            </button>
          </div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobile(false)}>{l.label}</Link>
          ))}
          <div style={{ marginTop: 36 }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <Logo size={40} />
              <div>
                <div style={{ fontFamily: "var(--fwf-mono)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase" }}>Flow West Films</div>
              </div>
            </div>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 320 }}>
              Premium ad creative & cinematic film production for B2B brands.
            </p>
          </div>

          <div className="fwf-footer-col">
            <h4>Navigate</h4>
            <Link to="home">Home</Link>
            <Link to="projects">Projects</Link>
            <Link to="pricing">Pricing</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
          </div>

          <div className="fwf-footer-col">
            <h4>Contact</h4>
            <a href="tel:+4915737918515">+49 157 37918515</a>
            <a href="mailto:hello@flowwestfilms.de">hello@flowwestfilms.de</a>
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
          <div>flowwestfilms.de</div>
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
    { name: "Alienwatch" },
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

  return (
    <div className="fwf-video-modal-backdrop" onClick={onClose}>
      <div className="fwf-video-modal-inner" onClick={e => e.stopPropagation()}>
        <button className="fwf-video-modal-close" onClick={onClose}>
          <Icons.X size={12} /> Close
        </button>
        <video
          className="fwf-video-modal-video"
          src={src}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}

// Expose for other files
Object.assign(window, { Logo, Crosshairs, Icons, useRoute, Link, Nav, Footer, FinalCTA, TrustMarquee, TypewriterWord, VideoModal });
