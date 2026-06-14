/* ============================================================================
 * Flow West Films — Audit motion layer  (GSAP + ScrollTrigger)
 *
 * The audit is a pre-compiled React bundle, so this rides on top via a
 * MutationObserver — exactly like the i18n overlay and the send-audit bridge.
 * It does two things:
 *
 *   1. CINEMATIC MOTION — eyebrow lines draw in, headlines wipe up out of a
 *      mask, stats and option cards pop, paragraphs blend in from blur, and
 *      section glows drift in parallax. First-screen content animates on load;
 *      everything below reveals on scroll.
 *
 *   2. COMPLETION POPUP — the instant the results screen mounts (detected by
 *      the language-independent `.score-bar-track`), a brand-voice thank-you
 *      modal fades in over the page. Bilingual, driven by the same `fwf-lang`
 *      the rest of the app uses.
 *
 * Reduced-motion users get all content, statically, and still see the popup.
 * ========================================================================== */
(function () {
  "use strict";

  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- bilingual copy for the popup (brand voice: short, sharp, one italic) ----
  var COPY = {
    en: {
      eyebrow: "AUDIT COMPLETE",
      head: ["Thanks for being ", "straight", " with us."],
      sub: "Most brands won't. You did — and that's exactly the mindset that scales. Your score is locked in below.",
      cta: "See my score ↓",
      foot: "No spam. Just the audit. · flowwestfilms.de",
      close: "Close",
    },
    de: {
      eyebrow: "ANALYSE ABGESCHLOSSEN",
      head: ["Danke für die ", "Ehrlichkeit", "."],
      sub: "Die meisten Marken trauen sich das nicht. Sie schon — und genau dieses Mindset skaliert. Ihr Score steht unten bereit.",
      cta: "Score ansehen ↓",
      foot: "Kein Spam. Nur die Analyse. · flowwestfilms.de",
      close: "Schließen",
    },
  };

  function lang() {
    try { if (window.FWF_getLanguage) return window.FWF_getLanguage(); } catch (e) {}
    try { var s = localStorage.getItem("fwf-lang"); if (s === "en" || s === "de") return s; } catch (e) {}
    return "de";
  }

  // ===========================================================================
  // POPUP
  // ===========================================================================
  var popupEl = null, popupShown = false;

  function injectStyle() {
    if (document.getElementById("fwf-fx-style")) return;
    var s = document.createElement("style");
    s.id = "fwf-fx-style";
    s.textContent = [
      "#fwf-thanks{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;}",
      "#fwf-thanks.on{display:flex;}",
      "#fwf-thanks .fwf-tk-veil{position:absolute;inset:0;background:rgba(4,4,5,0.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;}",
      "#fwf-thanks .fwf-tk-card{position:relative;width:100%;max-width:460px;background:#0A0A0A;border:1px solid #1f1f1f;border-radius:16px;overflow:hidden;opacity:0;}",
      "#fwf-thanks .fwf-tk-line{position:absolute;top:0;left:0;right:0;height:1px;transform:scaleX(0);transform-origin:left center;background:linear-gradient(90deg,transparent,#FF2D78 45%,#9B30FF 75%,transparent);}",
      "#fwf-thanks .fwf-tk-top{padding:34px 34px 26px;}",
      "#fwf-thanks .fwf-tk-mark{display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;}",
      "#fwf-thanks .fwf-tk-badge{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13px;letter-spacing:0.04em;color:#fff;border:1px solid #2a2a2a;border-radius:5px;padding:4px 8px;}",
      "#fwf-thanks .fwf-tk-name{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5A;}",
      "#fwf-thanks .fwf-tk-eyebrow{display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin-bottom:16px;}",
      "#fwf-thanks .fwf-tk-dot{width:7px;height:7px;border-radius:50%;background:#00FF88;box-shadow:0 0 8px rgba(0,255,136,0.8);}",
      "#fwf-thanks h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:46px;font-weight:500;line-height:0.98;letter-spacing:-0.02em;margin:0 0 16px;color:#fff;}",
      "#fwf-thanks h2 em{font-style:italic;font-weight:500;color:#FF2D78;}",
      "#fwf-thanks .fwf-tk-sub{font-family:'Syne',system-ui,sans-serif;font-size:15px;line-height:1.6;color:#8A8A8A;max-width:360px;}",
      "#fwf-thanks .fwf-tk-body{padding:4px 34px 30px;}",
      "#fwf-thanks .fwf-tk-cta{width:100%;padding:15px;border-radius:9px;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;background:#FF2D78;color:#000;transition:background .18s,box-shadow .18s,transform .12s;}",
      "#fwf-thanks .fwf-tk-cta:hover{background:#ff4a8c;box-shadow:0 0 22px rgba(255,45,120,0.45);}",
      "#fwf-thanks .fwf-tk-cta:active{transform:scale(.985);}",
      "#fwf-thanks .fwf-tk-foot{display:flex;align-items:center;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid #1a1a1a;}",
      "#fwf-thanks .fwf-tk-foot span{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5A5A5A;}",
      "#fwf-thanks .fwf-tk-x{position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:7px;border:1px solid #2a2a2a;background:transparent;color:#8A8A8A;cursor:pointer;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;transition:border-color .18s,color .18s;}",
      "#fwf-thanks .fwf-tk-x:hover{border-color:#8A8A8A;color:#fff;}",
      "@media (max-width:520px){#fwf-thanks h2{font-size:38px;}}",
    ].join("");
    (document.head || document.documentElement).appendChild(s);
  }

  function buildPopup() {
    if (popupEl) return popupEl;
    injectStyle();
    var c = lang() === "en" ? COPY.en : COPY.de;
    var wrap = document.createElement("div");
    wrap.id = "fwf-thanks";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML =
      '<div class="fwf-tk-veil"></div>' +
      '<div class="fwf-tk-card" role="document">' +
        '<span class="fwf-tk-line"></span>' +
        '<button class="fwf-tk-x" type="button" aria-label="' + c.close + '">✕</button>' +
        '<div class="fwf-tk-top">' +
          '<div class="fwf-tk-mark"><span class="fwf-tk-badge">FWF</span><span class="fwf-tk-name">Flow West Films</span></div>' +
          '<div class="fwf-tk-eyebrow"><span class="fwf-tk-dot"></span><span data-tk="eyebrow">' + c.eyebrow + '</span></div>' +
          '<h2 data-tk="head"><span>' + c.head[0] + '</span><em>' + c.head[1] + '</em><span>' + c.head[2] + '</span></h2>' +
          '<p class="fwf-tk-sub" data-tk="sub">' + c.sub + '</p>' +
        '</div>' +
        '<div class="fwf-tk-body">' +
          '<button class="fwf-tk-cta" type="button" data-tk="cta">' + c.cta + '</button>' +
          '<div class="fwf-tk-foot"><span data-tk="foot">' + c.foot + '</span></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    popupEl = wrap;

    function close() { hidePopup(); }
    wrap.querySelector(".fwf-tk-x").addEventListener("click", close);
    wrap.querySelector(".fwf-tk-cta").addEventListener("click", function () {
      hidePopup();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    wrap.querySelector(".fwf-tk-veil").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && wrap.classList.contains("on")) close();
    });

    // keep popup language in sync if the user flips DE/EN while it's open
    window.addEventListener("fwf-lang-change", function () {
      var cc = lang() === "en" ? COPY.en : COPY.de;
      var q = function (s) { return wrap.querySelector(s); };
      q('[data-tk="eyebrow"]').textContent = cc.eyebrow;
      q('[data-tk="head"]').innerHTML = "<span>" + cc.head[0] + "</span><em>" + cc.head[1] + "</em><span>" + cc.head[2] + "</span>";
      q('[data-tk="sub"]').textContent = cc.sub;
      q('[data-tk="cta"]').textContent = cc.cta;
      q('[data-tk="foot"]').textContent = cc.foot;
    });

    return wrap;
  }

  function showPopup() {
    var wrap = buildPopup();
    wrap.classList.add("on");
    var veil = wrap.querySelector(".fwf-tk-veil");
    var card = wrap.querySelector(".fwf-tk-card");
    var line = wrap.querySelector(".fwf-tk-line");
    if (REDUCE || !window.gsap) {
      veil.style.opacity = 1; card.style.opacity = 1; line.style.transform = "scaleX(1)";
      return;
    }
    var g = window.gsap;
    var tl = g.timeline();
    tl.to(veil, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .fromTo(card, { opacity: 0, y: 26, scale: 0.96, filter: "blur(8px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power4.out", clearProps: "filter" }, "-=0.2")
      .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
      .fromTo(card.querySelectorAll(".fwf-tk-eyebrow, h2 span, h2 em, .fwf-tk-sub, .fwf-tk-cta, .fwf-tk-foot"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, "-=0.6");
  }

  function hidePopup() {
    if (!popupEl) return;
    if (REDUCE || !window.gsap) { popupEl.classList.remove("on"); return; }
    window.gsap.to(popupEl, {
      opacity: 0, duration: 0.35, ease: "power2.in",
      onComplete: function () { popupEl.classList.remove("on"); popupEl.style.opacity = ""; },
    });
  }

  // ===========================================================================
  // MOTION
  //
  // Reveals run on IntersectionObserver (NOT ScrollTrigger) on purpose: IO
  // fires on the main thread regardless of requestAnimationFrame, so content
  // can never get stranded at opacity:0 if rAF stalls (background tab, etc.).
  // GSAP still drives every tween. ScrollTrigger is used only for the cosmetic
  // glow parallax — if that ever fails the page just loses a little drift.
  // ===========================================================================
  var GENERIC = [
    ".eyebrow", "h1", "h2", "h3", "p",
    ".btn", ".dim-block", ".progress-track",
    "section > div > div > button", "form",
  ].join(",");

  var io = null;

  function visible(el) {
    return el.offsetParent !== null;
  }

  function dedupe(els) {
    var accepted = [];
    return els.filter(function (el) {
      for (var i = 0; i < accepted.length; i++) {
        if (accepted[i].contains(el)) return false;
      }
      accepted.push(el);
      return true;
    });
  }

  function classify(el) {
    if (el.classList.contains("eyebrow")) return "eyebrow";
    var tag = el.tagName.toLowerCase();
    if (tag === "h1" || tag === "h2" || tag === "h3") return "head";
    return "generic";
  }

  // Set the hidden "before" state immediately so nothing flashes in unstyled.
  function prime(g, el, kind) {
    if (kind === "head") {
      g.set(el, { clipPath: "inset(102% 0% -8% 0%)", y: 34, opacity: 1 });
    } else if (kind === "eyebrow") {
      g.set(el, { opacity: 0 });
      var line = el.querySelector(".sep");
      if (line) g.set(line, { scaleX: 0, transformOrigin: "left center" });
    } else {
      g.set(el, { opacity: 0, y: 26, filter: "blur(7px)" });
    }
  }

  function revealEl(g, el, kind, delay) {
    if (kind === "head") {
      g.to(el, { clipPath: "inset(-8% 0% -8% 0%)", y: 0, duration: 1.0, delay: delay,
        ease: "power4.out", clearProps: "clipPath,transform" });
    } else if (kind === "eyebrow") {
      var line = el.querySelector(".sep");
      if (line) g.to(line, { scaleX: 1, duration: 0.8, delay: delay, ease: "power3.inOut" });
      g.fromTo(el, { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, delay: delay + (line ? 0.2 : 0), ease: "power3.out", clearProps: "transform" });
    } else {
      g.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, delay: delay,
        ease: "power3.out", clearProps: "filter,transform" });
    }
  }

  function glowParallax(g, ST, main) {
    if (!ST) return;
    main.querySelectorAll('[style*="radial-gradient"]').forEach(function (glow) {
      if (glow.getAttribute("data-fwf-glow")) return;
      glow.setAttribute("data-fwf-glow", "1");
      g.fromTo(glow, { y: -40 }, { y: 40, ease: "none",
        scrollTrigger: { trigger: glow.parentElement || glow, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  function ensureIO(g) {
    if (io) return io;
    io = new IntersectionObserver(function (entries) {
      // Stagger everything that crosses in together (initial load batch / a new
      // screen mounting) top-to-bottom so it reads as one choreographed wave.
      var shown = entries.filter(function (e) { return e.isIntersecting; });
      if (!shown.length) return;
      shown.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      shown.forEach(function (e, i) {
        var el = e.target;
        io.unobserve(el);
        revealEl(g, el, el.__fwfKind || "generic", Math.min(i * 0.06, 0.5));
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });
    return io;
  }

  function scan(g, ST) {
    var root = document.getElementById("root");
    if (!root) return;
    var main = root.querySelector("main") || root;

    // popup trigger: results screen detected (language-independent class)
    var atResults = !!main.querySelector(".score-bar-track");
    if (atResults && !popupShown) { popupShown = true; showPopup(); }
    if (!atResults && popupShown) { popupShown = false; hidePopup(); }

    if (REDUCE || !g) return;

    glowParallax(g, ST, main);

    var raw = [];
    Array.prototype.push.apply(raw, main.querySelectorAll(GENERIC));
    var fresh = dedupe(raw.filter(function (el) {
      return visible(el) && !el.getAttribute("data-fwf-fx");
    }));
    if (!fresh.length) return;

    var observer = ensureIO(g);
    fresh.forEach(function (el) {
      el.setAttribute("data-fwf-fx", "1");
      var kind = classify(el);
      el.__fwfKind = kind;
      prime(g, el, kind);
      observer.observe(el);
    });
  }

  // ===========================================================================
  // BOOT
  // ===========================================================================
  function start() {
    var g = window.gsap, ST = window.ScrollTrigger;
    if (g && ST) g.registerPlugin(ST);

    var pending = false;
    function tick() {
      pending = false;
      try { scan(g, ST); } catch (e) { /* never break the page */ }
    }
    function schedule() {
      if (pending) return;
      pending = true;
      var done = false;
      function run() { if (done) return; done = true; tick(); }
      // rAF is smooth when visible; the setTimeout still fires when the tab is
      // hidden (rAF pauses then) so the popup + priming never stall.
      requestAnimationFrame(run);
      setTimeout(run, 120);
    }

    var obs = new MutationObserver(schedule);
    var root = document.getElementById("root");
    if (root) obs.observe(root, { childList: true, subtree: true });
    schedule();

    // Last-resort safety net: if anything primed never got revealed (e.g. an
    // element that never quite reaches the IO threshold), force it visible so
    // copy is NEVER permanently hidden on the live page.
    setInterval(function () {
      if (REDUCE || !g) return;
      document.querySelectorAll('[data-fwf-fx]').forEach(function (el) {
        var op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.02 && el.getBoundingClientRect().top < (window.innerHeight || 800)) {
          if (io) io.unobserve(el);
          revealEl(g, el, el.__fwfKind || "generic", 0);
        }
      });
    }, 1500);
  }

  function waitForGsap(tries) {
    if (window.gsap && window.ScrollTrigger) { start(); return; }
    if (tries <= 0) { start(); return; } // popup still works without gsap
    setTimeout(function () { waitForGsap(tries - 1); }, 60);
  }

  if (document.body) waitForGsap(40);
  else document.addEventListener("DOMContentLoaded", function () { waitForGsap(40); });
})();
