/* global React, Icons, Link, useRoute */
/* Blog pages — content lives in blog-data.js (window.FWF_POSTS). */
const BLOG_CALENDLY = "https://calendly.com/flowwestfilms-appointment/30min";
const BLOG_MAX = 720;

function blogPosts() { return window.FWF_POSTS || []; }
function blogFmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function BlogBlocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fwf-text-mute)", margin: "0 0 20px 0" }}>{b.p}</p>;
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
  const posts = blogPosts();
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
            Wissen aus der Produktion
          </h1>
          <p className="fwf-fade-up fwf-d3" style={{ color: "var(--fwf-text-mute)", fontSize: 20, lineHeight: 1.55, maxWidth: 640, margin: 0 }}>
            Was KI-Werbefilme kosten, wie ein Spot entsteht und warum so viel KI-Werbung billig aussieht. Direkt aus der Arbeit bei Flow West Films.
          </p>
        </div>
      </section>
      <section style={{ paddingBottom: 120 }}>
        <div className="fwf-container" style={{ display: "grid", gap: 20, maxWidth: 900 }}>
          {posts.map((p) => (
            <Link key={p.slug} to={"blog/" + p.slug} className="fwf-card fwf-card-purple" style={{ padding: 32, display: "block", textDecoration: "none", color: "inherit" }}>
              <div className="fwf-eyebrow" style={{ marginBottom: 12 }}>{p.eyebrow} · {blogFmtDate(p.date)} · {p.readMin} Min. Lesezeit</div>
              <h2 className="fwf-display" style={{ fontSize: "clamp(24px, 3vw, 34px)", margin: "0 0 12px 0", lineHeight: 1.15 }}>{p.title}</h2>
              <p style={{ color: "var(--fwf-text-mute)", fontSize: 16, lineHeight: 1.6, margin: 0 }}>{p.metaDesc}</p>
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
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <BlogIndexPage />;
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
              Florian Kotulla · <time dateTime={post.date}>{blogFmtDate(post.date)}</time> · {post.readMin} Min. Lesezeit
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 40 }}>
          <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
            <div className="fwf-card fwf-card-pink" style={{ padding: 28, marginBottom: 36 }}>
              <div className="fwf-eyebrow" style={{ color: "var(--fwf-pink)", marginBottom: 10 }}>Kurzantwort</div>
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
            <h2 className="fwf-display" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", margin: "0 0 24px 0" }}>Häufige Fragen</h2>
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
            <a href={BLOG_CALENDLY} target="_blank" rel="noreferrer" className="fwf-btn fwf-btn-primary">
              <Icons.Calendar size={14} />
              Gespräch buchen
              <Icons.ArrowRight size={14} />
            </a>
            <div style={{ marginTop: 20, fontSize: 15 }}>
              <Link to="ki-videoproduktion" style={{ color: "var(--fwf-purple)" }}>Mehr zu KI-Videoproduktion bei Flow West Films →</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ paddingBottom: 120 }}>
          <div className="fwf-container" style={{ maxWidth: BLOG_MAX + 80 }}>
            <div className="fwf-eyebrow" style={{ marginBottom: 16 }}>Weiterlesen</div>
            <div style={{ display: "grid", gap: 16 }}>
              {related.map((p) => (
                <Link key={p.slug} to={"blog/" + p.slug} className="fwf-card fwf-card-purple" style={{ padding: 24, display: "block", textDecoration: "none", color: "inherit" }}>
                  <div className="fwf-eyebrow" style={{ marginBottom: 8 }}>{p.eyebrow}</div>
                  <div className="fwf-display" style={{ fontSize: 22, lineHeight: 1.2 }}>{p.title}</div>
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
