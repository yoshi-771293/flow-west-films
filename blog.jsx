/* global React, Icons, Link, useRoute, CtaButtons */
/* Blog pages — content lives in blog-data.js (window.FWF_POSTS). */
const BLOG_MAX = 720;

function blogPosts() { return window.FWF_POSTS || []; }
function blogLang() { return (window.FWF_getLanguage && window.FWF_getLanguage()) === "en" ? "en" : "de"; }
function blogFmtDate(iso, lang) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
// UI strings per language. Post text itself comes from post.en (when present) in English mode.
const BLOG_UI = {
  de: {
    indexH1: "Wissen aus der Produktion",
    indexP: "Was KI-Werbefilme kosten, wie ein Spot entsteht und warum so viel KI-Werbung billig aussieht. Direkt aus der Arbeit bei Flow West Films.",
    readMin: "Min. Lesezeit", shortAnswer: "Kurzantwort", faq: "Häufige Fragen", more: "Weiterlesen",
    ctaLink: "Mehr zu KI-Videoproduktion bei Flow West Films →", germanOnly: "", germanOnlyNote: "",
  },
  en: {
    indexH1: "Insights from production",
    indexP: "What AI commercials cost, how a spot comes together and why so much AI advertising looks cheap. Straight from the work at Flow West Films.",
    readMin: "min read", shortAnswer: "Short answer", faq: "Frequently asked questions", more: "Keep reading",
    ctaLink: "More about AI video production at Flow West Films →", germanOnly: "in German", germanOnlyNote: "This article is currently only available in German.",
  },
};
// The post as shown in the active language: English fields override the German ones when they exist.
function blogLoc(post, lang) { return lang === "en" && post.en ? Object.assign({}, post, post.en) : post; }

// A paragraph is a string, or an array of strings and inline links ({ to, text }).
function blogInline(p) {
  if (!Array.isArray(p)) return p;
  return p.map((seg, i) => (typeof seg === "string" ? seg : <Link key={i} to={seg.to} style={{ color: "var(--fwf-purple)" }}>{seg.text}</Link>));
}

function BlogBlocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fwf-text-mute)", margin: "0 0 20px 0" }}>{blogInline(b.p)}</p>;
    const List = b.ol ? "ol" : "ul";
    const items = b.ol || b.ul;
    return (
      <List key={i} style={{ margin: "0 0 24px 0", paddingLeft: 22, color: "var(--fwf-text-mute)", fontSize: 18, lineHeight: 1.7 }}>
        {items.map((it, j) => <li key={j} style={{ marginBottom: 12 }}>{it}</li>)}
      </List>
    );
  });
}

function BlogIndexPage() {
  const lang = blogLang();
  const U = BLOG_UI[lang];
  const L = (p) => blogLoc(p, lang);
  // Newest first; posts sharing a date keep "added later = newer" (blog-data.js appends new posts at the end).
  const posts = blogPosts().map((p, i) => [p, i]).sort((a, b) => b[0].date.localeCompare(a[0].date) || b[1] - a[1]).map(([p]) => p);
  return (
    <main>
      <section style={{ position: "relative", paddingTop: 180, paddingBottom: 60, overflow: "hidden" }}>
        <div className="fwf-grid-bg" />
        <div className="fwf-container" style={{ position: "relative" }}>
          <div className="fwf-section-label fwf-fade-up fwf-d1">
            <span className="fwf-section-label-line" />
            <span className="fwf-eyebrow">Blog</span>
          </div>
          <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(40px, 6vw, 80px)", margin: "0 0 24px 0", lineHeight: 1.02, maxWidth: 900, textWrap: "balance" }}>
            {U.indexH1}
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 20, lineHeight: 1.55, maxWidth: 640, margin: 0 }}>
            {U.indexP}
          </p>
        </div>
      </section>
      <section style={{ paddingBottom: 120 }}>
        <div className="fwf-container" style={{ display: "grid", gap: 20, maxWidth: 900 }}>
          {posts.map((p) => (
            <Link key={p.slug} to={"blog/" + p.slug} className="fwf-card fwf-card-purple" style={{ padding: 32, display: "block", textDecoration: "none", color: "inherit" }}>
              <div className="fwf-eyebrow" style={{ marginBottom: 12 }}>{L(p).eyebrow} · {blogFmtDate(p.date, lang)} · {p.readMin} {U.readMin}{lang === "en" && !p.en ? " · " + U.germanOnly : ""}</div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(24px, 3vw, 34px)", margin: "0 0 12px 0", lineHeight: 1.15 }}>{L(p).title}</h2>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, margin: 0 }}>{L(p).metaDesc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function BlogPostPage() {
  const [route] = useRoute();
  const slug = route.replace(/^blog\//, "");
  const posts = blogPosts();
  const raw = posts.find((p) => p.slug === slug);
  if (!raw) return <BlogIndexPage />;
  const lang = blogLang();
  const U = BLOG_UI[lang];
  const post = blogLoc(raw, lang);
  const L = (p) => blogLoc(p, lang);
  const related = (post.related || []).map((s) => posts.find((p) => p.slug === s)).filter(Boolean);
  return (
    <main>
      <article>
        <section style={{ position: "relative", paddingTop: 170, paddingBottom: 40, overflow: "hidden" }}>
          <div className="fwf-grid-bg" />
          <div className="fwf-container" style={{ position: "relative", maxWidth: BLOG_MAX + 80 }}>
            <div className="fwf-section-label fwf-fade-up fwf-d1">
              <span className="fwf-section-label-line" />
              <Link to="blog" className="fwf-eyebrow" style={{ textDecoration: "none" }}>Blog</Link>
              <span className="fwf-eyebrow">· {post.eyebrow}</span>
            </div>
            <h1 className="fwf-display fwf-fade-up fwf-d2" style={{ fontSize: "clamp(34px, 5vw, 62px)", margin: "0 0 20px 0", lineHeight: 1.05, textWrap: "balance" }}>
              {post.title}
            </h1>
            <div className="fwf-fade-up fwf-d3" style={{ fontFamily: "var(--fwf-mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--fwf-text-faint)", textTransform: "uppercase" }}>
              Florian Kotulla · <time dateTime={post.date}>{blogFmtDate(post.date, lang)}</time> · {post.readMin} {U.readMin}
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 40 }}>
          <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
            {lang === "en" && !raw.en && <p style={{ fontSize: 15, color: "var(--fwf-text-faint)", margin: "0 0 20px 0" }}>{U.germanOnlyNote}</p>}
            <div className="fwf-card fwf-card-pink" style={{ padding: 28, marginBottom: 36 }}>
              <div className="fwf-eyebrow" style={{ color: "var(--fwf-pink)", marginBottom: 10 }}>{U.shortAnswer}</div>
              <p style={{ fontSize: 19, lineHeight: 1.6, margin: 0, color: "var(--fwf-text)" }}>{post.answer}</p>
            </div>
            {(post.intro || []).map((t, i) => (
              <p key={i} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fwf-text-mute)", margin: "0 0 20px 0" }}>{t}</p>
            ))}
            {post.sections.map((s) => (
              <div key={s.h} style={{ marginTop: 44 }}>
                <h2 className="fwf-display" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", margin: "0 0 18px 0", lineHeight: 1.15 }}>{s.h}</h2>
                <BlogBlocks blocks={s.blocks} />
              </div>
            ))}
          </div>
        </section>

        <section style={{ paddingBottom: 40 }}>
          <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
            <h2 className="fwf-display" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", margin: "0 0 24px 0" }}>{U.faq}</h2>
            {post.faq.map(([q, a]) => (
              <div key={q} style={{ marginBottom: 22 }}>
                <h3 style={{ fontSize: 20, margin: "0 0 8px 0", color: "var(--fwf-text)" }}>{q}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--fwf-text-mute)", margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <section style={{ paddingBottom: 60 }}>
        <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
          <div className="fwf-card fwf-card-green" style={{ padding: 36, textAlign: "center" }}>
            <h2 className="fwf-display" style={{ fontSize: "clamp(24px, 3vw, 34px)", margin: "0 0 12px 0" }}>{post.cta.h}</h2>
            <p style={{ color: "var(--fwf-text-mute)", fontSize: 17, margin: "0 0 24px 0" }}>{post.cta.sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <CtaButtons />
            </div>
            <div style={{ marginTop: 20, fontSize: 15 }}>
              <Link to={(post.cta.link || {}).to || "ki-videoproduktion"} style={{ color: "var(--fwf-purple)" }}>{(post.cta.link || {}).label || U.ctaLink}</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ paddingBottom: 120 }}>
          <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
            <div className="fwf-eyebrow" style={{ marginBottom: 16 }}>{U.more}</div>
            <div style={{ display: "grid", gap: 16 }}>
              {related.map((p) => (
                <Link key={p.slug} to={"blog/" + p.slug} className="fwf-card fwf-card-purple" style={{ padding: 24, display: "block", textDecoration: "none", color: "inherit" }}>
                  <div className="fwf-eyebrow" style={{ marginBottom: 8 }}>{L(p).eyebrow}{lang === "en" && !p.en ? " · " + U.germanOnly : ""}</div>
                  <div className="fwf-display" style={{ fontSize: 22, lineHeight: 1.2 }}>{L(p).title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

Object.assign(window, { BlogIndexPage, BlogPostPage });
