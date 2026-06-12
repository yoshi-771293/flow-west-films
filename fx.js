/* global React */
// ============================================
// Site motion layer — GSAP + ScrollTrigger (loaded in index.html).
//
// Mobile (≤767px): replaces the time-based CSS entrances with scroll-driven
// reveals so below-the-fold content animates when it's actually seen.
//
// Desktop (≥768px): keeps the existing CSS hero entrances and layers a
// cinematic scroll language on top — masked heading wipes, drawing eyebrow
// lines, 3D card settles, founder-photo reveals, glow parallax, and
// magnetic CTAs.
//
// Reduced-motion users get static content. Everything reverts on route change.
// ============================================
(function () {
  var GENERIC_SELECTORS = [
    ".fwf-section-label", "h1", "h2", "h3", "p",
    ".fwf-btn", ".fwf-card", ".fwf-stat",
    ".fwf-offers-grid > *", ".fwf-why-grid > div", ".fwf-pillars > div",
    ".fwf-featured-grid > *", ".fwf-proj-grid > *",
    ".fwf-form-row", ".fwf-footer-col",
  ].join(",");

  function visible(el) {
    return el.offsetParent !== null &&
      !el.closest(".fwf-cin-card") &&
      !el.closest(".fwf-marquee-track");
  }

  // Accept elements group-by-group (priority order); drop anything whose
  // ancestor was already accepted so nothing animates twice.
  function dedupe(groups) {
    var accepted = new Set();
    return groups.map(function (arr) {
      return arr.filter(function (el) {
        for (var p = el.parentElement; p; p = p.parentElement) {
          if (accepted.has(p)) return false;
        }
        accepted.add(el);
        return true;
      });
    });
  }

  function batchReveal(gsap, ST, els, fromVars, toVars, start) {
    if (!els.length) return;
    gsap.set(els, fromVars);
    ST.batch(els, {
      start: start || "top 90%",
      once: true,
      onEnter: function (batch) {
        if (!batch || !batch.length) return;
        gsap.to(batch, toVars);
      },
    });
  }

  // Stat numbers count up the first time they appear ("50+", "#1", "4×").
  // Skips letter-embedded digits like "B2B" so they don't tick oddly.
  function setupCounters(gsap, ST, main) {
    main.querySelectorAll(".fwf-stat-num").forEach(function (el) {
      var m = (el.textContent || "").match(/^([^\d]*)(\d+)(.*)$/);
      if (!m || /[A-Za-z]/.test(m[1]) || /[A-Za-z]/.test(m[3])) return;
      var target = +m[2], state = { n: 0 };
      ST.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: function () {
          gsap.to(state, {
            n: target, duration: 1.2, ease: "power2.out",
            onUpdate: function () { el.textContent = m[1] + Math.round(state.n) + m[3]; },
          });
        },
      });
    });
  }

  // Project thumbnails settle from a gentle over-zoom.
  function setupThumbs(gsap, ST, main) {
    var thumbs = main.querySelectorAll(".fwf-proj-thumb-img");
    if (!thumbs.length) return;
    gsap.set(thumbs, { scale: 1.08 });
    ST.batch(thumbs, {
      start: "top 95%",
      once: true,
      onEnter: function (els) {
        if (!els || !els.length) return;
        gsap.to(els, { scale: 1, duration: 1.1, ease: "power2.out", overwrite: true });
      },
    });
  }

  // Magnetic CTAs (desktop only): buttons lean toward the cursor and
  // glide back on leave. Returns a remover for the listeners.
  function setupMagnets(gsap, scopes) {
    var bound = [];
    scopes.forEach(function (scope) {
      if (!scope) return;
      scope.querySelectorAll(".fwf-btn").forEach(function (b) {
        var toX = gsap.quickTo(b, "x", { duration: 0.45, ease: "power3" });
        var toY = gsap.quickTo(b, "y", { duration: 0.45, ease: "power3" });
        function move(e) {
          var r = b.getBoundingClientRect();
          toX((e.clientX - (r.left + r.width / 2)) * 0.22);
          toY((e.clientY - (r.top + r.height / 2)) * 0.36);
        }
        function leave() { toX(0); toY(0); }
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
        bound.push([b, move, leave]);
      });
    });
    return function () {
      bound.forEach(function (h) {
        h[0].removeEventListener("mousemove", h[1]);
        h[0].removeEventListener("mouseleave", h[2]);
      });
    };
  }

  // ---------- mobile profile (phones) ----------
  function mobileFX(gsap, ST, root, main, footer) {
    var cssAnimated = root.querySelectorAll(".fwf-fade-up");
    if (cssAnimated.length) gsap.set(cssAnimated, { animation: "none", opacity: 1 });

    var items = [];
    [main, footer].forEach(function (s) {
      if (s) items.push.apply(items, s.querySelectorAll(GENERIC_SELECTORS));
    });
    items = dedupe([items.filter(visible)])[0];

    var hero = main.querySelector("section");
    var heroItems = items.filter(function (el) { return hero && hero.contains(el); });
    var rest = items.filter(function (el) { return heroItems.indexOf(el) === -1; });

    if (heroItems.length) {
      gsap.fromTo(heroItems,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          stagger: 0.09, delay: 0.1, clearProps: "filter" }
      );
      var glow = hero.querySelector('div[style*="radial-gradient"]');
      if (glow) {
        gsap.to(glow, { y: 70, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      }
    }
    batchReveal(gsap, ST, rest,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.08, overwrite: true },
      "top 92%");

    setupThumbs(gsap, ST, main);
    setupCounters(gsap, ST, main);
  }

  // ---------- desktop profile ----------
  function desktopFX(gsap, ST, root, main, footer) {
    // CSS hero entrances stay — only animate what they don't cover.
    function untouched(el) { return visible(el) && !el.closest(".fwf-fade-up"); }

    var labels = [], headings = [], cards = [], generic = [];
    [main, footer].forEach(function (s) {
      if (!s) return;
      labels.push.apply(labels, s.querySelectorAll(".fwf-section-label"));
      headings.push.apply(headings, s.querySelectorAll("h2, h3"));
      cards.push.apply(cards, s.querySelectorAll(
        ".fwf-card, .fwf-offers-grid > *, .fwf-why-grid > div, .fwf-pillars > div, .fwf-featured-grid > *, .fwf-proj-grid > *, .fwf-stat"
      ));
      generic.push.apply(generic, s.querySelectorAll("p, .fwf-btn, .fwf-form-row, .fwf-footer-col"));
    });
    var d = dedupe([
      cards.filter(untouched),
      labels.filter(untouched),
      headings.filter(untouched),
      generic.filter(untouched),
    ]);
    cards = d[0]; labels = d[1]; headings = d[2]; generic = d[3];

    // Eyebrow rows: the pink line draws in, the label slides after it.
    labels.forEach(function (label) {
      var line = label.querySelector(".fwf-section-label-line");
      var text = label.querySelector(".fwf-eyebrow");
      ST.create({
        trigger: label, start: "top 90%", once: true,
        onEnter: function () {
          if (line) gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "power3.inOut" });
          if (text) gsap.fromTo(text, { opacity: 0, x: -18 },
            { opacity: 1, x: 0, duration: 0.7, delay: 0.25, ease: "power3.out" });
        },
      });
      gsap.set(label, { opacity: 1 });
      if (text) gsap.set(text, { opacity: 0 });
      if (line) gsap.set(line, { scaleX: 0 });
    });

    // Headings rise out of a mask — the flagship "flashy but elegant" move.
    batchReveal(gsap, ST, headings,
      { clipPath: "inset(102% 0% -8% 0%)", y: 44, opacity: 1 },
      { clipPath: "inset(-8% 0% -8% 0%)", y: 0, duration: 1.05, ease: "power4.out", stagger: 0.12, overwrite: true },
      "top 86%");

    // Cards drop in like film frames — slight 3D tilt settling flat.
    batchReveal(gsap, ST, cards,
      { opacity: 0, y: 52, rotateX: 9, transformPerspective: 750, transformOrigin: "center bottom" },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.95, ease: "power3.out", stagger: 0.09, overwrite: true },
      "top 88%");

    // Copy and CTAs: quiet rise.
    batchReveal(gsap, ST, generic,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, overwrite: true },
      "top 90%");

    // Founder portraits sweep open left-to-right.
    var photos = main.querySelectorAll('div[style*="founder"]');
    photos.forEach(function (ph) {
      gsap.set(ph, { clipPath: "inset(0% 100% 0% 0%)" });
      ST.create({
        trigger: ph, start: "top 82%", once: true,
        onEnter: function () {
          gsap.to(ph, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" });
        },
      });
    });

    // Every section glow drifts slower than the page — quiet parallax depth.
    main.querySelectorAll("section").forEach(function (sec) {
      var glow = sec.querySelector(':scope > div[style*="radial-gradient"]');
      if (!glow) return;
      gsap.fromTo(glow, { y: -40 }, { y: 40, ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
    });

    setupThumbs(gsap, ST, main);
    setupCounters(gsap, ST, main);

    return setupMagnets(gsap, [main, footer]);
  }

  function useMobileFX(route) {
    React.useEffect(function () {
      var gsap = window.gsap, ST = window.ScrollTrigger;
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!gsap || !ST || reduce) return;

      var mobile = window.matchMedia("(max-width: 767px)").matches;
      // the immersive sphere page choreographs its own motion
      if (route === "projects-lab" || (!mobile && route === "projects")) return;

      var root = document.getElementById("app");
      var main = root && root.querySelector("main");
      var footer = root && root.querySelector("footer");
      if (!main) return;
      gsap.registerPlugin(ST);

      var removeMagnets = null;
      var ctx = gsap.context(function () {
        if (mobile) mobileFX(gsap, ST, root, main, footer);
        else removeMagnets = desktopFX(gsap, ST, root, main, footer);
        ST.refresh();
      });

      return function () {
        if (removeMagnets) removeMagnets();
        ctx.revert();
      };
    }, [route]);
  }

  window.useMobileFX = useMobileFX;
})();
