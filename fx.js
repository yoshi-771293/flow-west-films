/* global React */
// ============================================
// Mobile motion layer — GSAP + ScrollTrigger (loaded in index.html).
// Phones only: replaces the time-based CSS entrances with scroll-driven
// reveals so below-the-fold content animates when it's actually seen.
// Desktop keeps its existing CSS animations; reduced-motion users get
// static content. Fully reverted on every route change.
// ============================================
(function () {
  var REVEAL_SELECTORS = [
    ".fwf-section-label", "h1", "h2", "h3", "p",
    ".fwf-btn", ".fwf-card", ".fwf-stat",
    ".fwf-offers-grid > *", ".fwf-why-grid > div", ".fwf-pillars > div",
    ".fwf-featured-grid > *", ".fwf-proj-grid > *",
    ".fwf-form-row", ".fwf-footer-col",
  ].join(",");

  function useMobileFX(route) {
    React.useEffect(function () {
      var gsap = window.gsap, ST = window.ScrollTrigger;
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var mobile = window.matchMedia("(max-width: 767px)").matches;
      if (!gsap || !ST || reduce || !mobile) return;
      if (route === "projects-lab") return; // the lab page choreographs its own motion

      var root = document.getElementById("app");
      var main = root && root.querySelector("main");
      var footer = root && root.querySelector("footer");
      if (!main) return;
      gsap.registerPlugin(ST);

      var ctx = gsap.context(function () {
        // 1) Take over from the CSS time-based entrances (inline styles win,
        //    and gsap.context restores everything on revert).
        var cssAnimated = root.querySelectorAll(".fwf-fade-up");
        if (cssAnimated.length) gsap.set(cssAnimated, { animation: "none", opacity: 1 });

        // 2) Collect reveal targets; drop nested matches so nothing fades twice.
        var items = [];
        [main, footer].forEach(function (s) {
          if (s) items.push.apply(items, s.querySelectorAll(REVEAL_SELECTORS));
        });
        items = items.filter(function (el) {
          return !el.closest(".fwf-cin-card") &&     // lab grid animates itself
                 !el.closest(".fwf-marquee-track") && // marquee loops via CSS
                 el.offsetParent !== null;            // skip display:none (desktop-only bits)
        });
        var inSet = new Set(items);
        items = items.filter(function (el) {
          for (var p = el.parentElement; p; p = p.parentElement) if (inSet.has(p)) return false;
          return true;
        });

        // 3) Hero: cinematic load-in — staggered rise with a soft focus pull.
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
          if (glow) { // glow drifts slower than the page — subtle depth
            gsap.to(glow, { y: 70, ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
          }
        }

        // 4) Everything else fades up as it scrolls into view.
        if (rest.length) {
          gsap.set(rest, { opacity: 0, y: 26 });
          ST.batch(rest, {
            start: "top 92%",
            once: true,
            onEnter: function (els) {
              if (!els || !els.length) return;
              gsap.to(els, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.08, overwrite: true });
            },
          });
        }

        // 5) Project thumbnails settle from a gentle over-zoom.
        var thumbs = main.querySelectorAll(".fwf-proj-thumb-img");
        if (thumbs.length) {
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

        // 6) Stat numbers count up the first time they appear.
        main.querySelectorAll(".fwf-stat-num").forEach(function (el) {
          var m = (el.textContent || "").match(/^([^\d]*)(\d+)(.*)$/);
          if (!m) return;
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

        ST.refresh();
      });

      return function () { ctx.revert(); };
    }, [route]);
  }

  window.useMobileFX = useMobileFX;
})();
