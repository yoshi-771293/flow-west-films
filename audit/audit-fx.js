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

  // ---- bilingual copy — a 3-step gate (brand voice: short, sharp, one italic) ----
  var COPY = {
    en: {
      foot: "No spam. Just the audit. · flowwestfilms.de",
      s1: {
        eyebrow: "AUDIT COMPLETE",
        head: ["Thanks for being ", "straight", " with us."],
        sub: "Most brands won't. You did — and that's exactly the mindset that scales.",
        cta: "Fill in your email",
      },
      s2: {
        eyebrow: "ONE LAST STEP",
        head: ["Where should we ", "send", " it?"],
        sub: "Your score and the full breakdown — straight to your inbox.",
        label: "Your email",
        ph: "you@company.com",
        cta: "Send it →",
        sending: "Sending",
        errInvalid: "That's not a valid email.",
        errDisp: "Use a real inbox — temporary ones won't reach you.",
      },
      s3: {
        eyebrow: "SENT",
        head: ["Check your ", "inbox", "."],
        sub: "It's on its way. Now — here's exactly where you stand.",
        cta: "See your result →",
      },
    },
    de: {
      foot: "Kein Spam. Nur die Analyse. · flowwestfilms.de",
      s1: {
        eyebrow: "ANALYSE ABGESCHLOSSEN",
        head: ["Danke für die ", "Ehrlichkeit", "."],
        sub: "Die meisten Marken trauen sich das nicht. Sie schon — und genau dieses Mindset skaliert.",
        cta: "E-Mail eingeben",
      },
      s2: {
        eyebrow: "NUR NOCH EIN SCHRITT",
        head: ["Wohin dürfen wir's ", "schicken", "?"],
        sub: "Ihr Score und die komplette Auswertung — direkt in Ihr Postfach.",
        label: "Ihre E-Mail",
        ph: "sie@firma.de",
        cta: "Absenden →",
        sending: "Senden",
        errInvalid: "Das ist keine gültige E-Mail.",
        errDisp: "Bitte ein echtes Postfach — Wegwerf-Adressen erreichen Sie nicht.",
      },
      s3: {
        eyebrow: "GESENDET",
        head: ["Schauen Sie ins ", "Postfach", "."],
        sub: "Sie ist unterwegs. Und jetzt — hier ist Ihr Ergebnis.",
        cta: "Ergebnis ansehen →",
      },
    },
  };

  function lang() {
    try { if (window.FWF_getLanguage) return window.FWF_getLanguage(); } catch (e) {}
    try { var s = localStorage.getItem("fwf-lang"); if (s === "en" || s === "de") return s; } catch (e) {}
    return "de";
  }

  // email validation — mirrors the frontend/server contract
  var DISPOSABLE = {
    "mailinator.com": 1, "tempmail.com": 1, "temp-mail.org": 1, "guerrillamail.com": 1,
    "10minutemail.com": 1, "throwaway.email": 1, "trashmail.com": 1, "yopmail.com": 1,
    "getnada.com": 1, "sharklasers.com": 1, "dispostable.com": 1, "fakeinbox.com": 1,
    "maildrop.cc": 1, "mintemail.com": 1, "mohmal.com": 1, "emailondeck.com": 1,
  };
  function validateEmail(raw) {
    var e = (raw || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, disp: false };
    var dom = e.split("@")[1];
    if (!/\.[a-z]{2,}$/.test(dom)) return { ok: false, disp: false };
    if (DISPOSABLE[dom]) return { ok: false, disp: true };
    return { ok: true };
  }

  // ===========================================================================
  // POPUP — mandatory 3-step gate: thank-you → email → sent → reveal results
  // ===========================================================================
  var popupEl = null, popupShown = false, gateActive = false, resultsRevealed = false;

  function injectStyle() {
    if (document.getElementById("fwf-fx-style")) return;
    var s = document.createElement("style");
    s.id = "fwf-fx-style";
    s.textContent = [
      "#fwf-thanks{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;}",
      "#fwf-thanks.on{display:flex;}",
      // opaque veil — results stay hidden until the email is given
      "#fwf-thanks .fwf-tk-veil{position:absolute;inset:0;background:#0A0A0A;opacity:0;}",
      "#fwf-thanks .fwf-tk-card{position:relative;width:100%;max-width:460px;background:#0A0A0A;border:1px solid #1f1f1f;border-radius:16px;overflow:hidden;opacity:0;}",
      "#fwf-thanks .fwf-tk-line{position:absolute;top:0;left:0;right:0;height:1px;transform:scaleX(0);transform-origin:left center;background:linear-gradient(90deg,transparent,#FF2D78 45%,#9B30FF 75%,transparent);z-index:2;}",
      "#fwf-thanks .fwf-tk-step{padding:34px 34px 30px;}",
      "#fwf-thanks .fwf-tk-step[hidden]{display:none;}",
      "#fwf-thanks .fwf-tk-mark{display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;}",
      "#fwf-thanks .fwf-tk-badge{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13px;letter-spacing:0.04em;color:#fff;border:1px solid #2a2a2a;border-radius:5px;padding:4px 8px;}",
      "#fwf-thanks .fwf-tk-name{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5A;}",
      "#fwf-thanks .fwf-tk-eyebrow{display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin-bottom:16px;}",
      "#fwf-thanks .fwf-tk-dot{width:7px;height:7px;border-radius:50%;background:#00FF88;box-shadow:0 0 8px rgba(0,255,136,0.8);}",
      "#fwf-thanks h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:44px;font-weight:500;line-height:0.98;letter-spacing:-0.02em;margin:0 0 16px;color:#fff;}",
      "#fwf-thanks h2 em{font-style:italic;font-weight:500;color:#FF2D78;}",
      "#fwf-thanks .fwf-tk-sub{font-family:'Syne',system-ui,sans-serif;font-size:15px;line-height:1.6;color:#8A8A8A;max-width:360px;margin-bottom:24px;}",
      "#fwf-thanks .fwf-tk-flabel{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin-bottom:10px;}",
      "#fwf-thanks input[type=email]{width:100%;background:#000;border:1px solid #262626;border-radius:9px;padding:14px 15px;color:#fff;font-family:'Syne',system-ui,sans-serif;font-size:15px;transition:border-color .18s,box-shadow .18s;}",
      "#fwf-thanks input[type=email]::placeholder{color:#4a4a4a;}",
      "#fwf-thanks input[type=email]:focus{outline:none;border-color:#FF2D78;box-shadow:0 0 0 1px rgba(255,45,120,0.35);}",
      "#fwf-thanks input.valid{border-color:#00FF88;box-shadow:0 0 0 1px rgba(0,255,136,0.3);}",
      "#fwf-thanks input.invalid{border-color:#FF6420;box-shadow:0 0 0 1px rgba(255,100,32,0.3);}",
      "#fwf-thanks .fwf-tk-msg{font-family:'Syne',system-ui,sans-serif;font-size:13px;min-height:18px;margin:9px 0 18px;color:#FF6420;}",
      "#fwf-thanks .fwf-tk-cta{width:100%;padding:15px;border-radius:9px;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;background:#FF2D78;color:#000;transition:background .18s,box-shadow .18s,transform .12s,opacity .18s;display:flex;align-items:center;justify-content:center;gap:9px;}",
      "#fwf-thanks .fwf-tk-cta:hover:not(:disabled){background:#ff4a8c;box-shadow:0 0 22px rgba(255,45,120,0.45);}",
      "#fwf-thanks .fwf-tk-cta:active{transform:scale(.985);}",
      "#fwf-thanks .fwf-tk-cta:disabled{opacity:.35;cursor:not-allowed;}",
      "#fwf-thanks .fwf-tk-foot{display:flex;align-items:center;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid #1a1a1a;}",
      "#fwf-thanks .fwf-tk-foot span{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5A5A5A;}",
      "#fwf-thanks .fwf-tk-spin{width:13px;height:13px;border:2px solid rgba(0,0,0,.3);border-top-color:#000;border-radius:50%;animation:fwftkspin .6s linear infinite;}",
      "@keyframes fwftkspin{to{transform:rotate(360deg);}}",
      "@media (max-width:520px){#fwf-thanks h2{font-size:36px;}}",
    ].join("");
    (document.head || document.documentElement).appendChild(s);
  }

  function stepMarkup(step, c) {
    var foot = '<div class="fwf-tk-foot"><span data-tk="foot">' + c.foot + '</span></div>';
    var mark = '<div class="fwf-tk-mark"><span class="fwf-tk-badge">FWF</span><span class="fwf-tk-name">Flow West Films</span></div>';
    function head(s) { return '<h2 data-tk="head"><span>' + s.head[0] + '</span><em>' + s.head[1] + '</em><span>' + s.head[2] + '</span></h2>'; }
    function eyebrow(s) { return '<div class="fwf-tk-eyebrow"><span class="fwf-tk-dot"></span><span data-tk="eyebrow">' + s.eyebrow + '</span></div>'; }
    if (step === 1) {
      return mark + eyebrow(c.s1) + head(c.s1) +
        '<p class="fwf-tk-sub" data-tk="sub">' + c.s1.sub + '</p>' +
        '<button class="fwf-tk-cta" type="button" data-act="to2">' + c.s1.cta + '</button>' + foot;
    }
    if (step === 2) {
      return mark + eyebrow(c.s2) + head(c.s2) +
        '<p class="fwf-tk-sub" data-tk="sub">' + c.s2.sub + '</p>' +
        '<label class="fwf-tk-flabel" for="fwf-tk-email" data-tk="label">' + c.s2.label + '</label>' +
        '<input id="fwf-tk-email" type="email" autocomplete="email" spellcheck="false" placeholder="' + c.s2.ph + '">' +
        '<div class="fwf-tk-msg"></div>' +
        '<button class="fwf-tk-cta" type="button" data-act="send" disabled>' + c.s2.cta + '</button>' + foot;
    }
    return mark + eyebrow(c.s3) + head(c.s3) +
      '<p class="fwf-tk-sub" data-tk="sub">' + c.s3.sub + '</p>' +
      '<button class="fwf-tk-cta" type="button" data-act="reveal">' + c.s3.cta + '</button>' + foot;
  }

  function renderSteps() {
    var c = lang() === "en" ? COPY.en : COPY.de;
    [1, 2, 3].forEach(function (n) {
      popupEl.querySelector('.fwf-tk-step[data-step="' + n + '"]').innerHTML = stepMarkup(n, c);
    });
    wireStep(2);
  }

  function wireStep(n) {
    var step = popupEl.querySelector('.fwf-tk-step[data-step="' + n + '"]');
    if (n === 2) {
      var input = step.querySelector("input");
      var msg = step.querySelector(".fwf-tk-msg");
      var btn = step.querySelector('[data-act="send"]');
      input.addEventListener("input", function () {
        var v = input.value.trim();
        input.classList.remove("valid", "invalid");
        var c = lang() === "en" ? COPY.en : COPY.de;
        if (!v) { msg.textContent = ""; btn.disabled = true; return; }
        var r = validateEmail(v);
        if (r.ok) { input.classList.add("valid"); msg.textContent = ""; btn.disabled = false; }
        else { input.classList.add("invalid"); msg.textContent = r.disp ? c.s2.errDisp : c.s2.errInvalid; btn.disabled = true; }
      });
      input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !btn.disabled) btn.click(); });
    }
  }

  function buildPopup() {
    if (popupEl) return popupEl;
    injectStyle();
    var wrap = document.createElement("div");
    wrap.id = "fwf-thanks";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML =
      '<div class="fwf-tk-veil"></div>' +
      '<div class="fwf-tk-card" role="document">' +
        '<span class="fwf-tk-line"></span>' +
        '<div class="fwf-tk-step" data-step="1"></div>' +
        '<div class="fwf-tk-step" data-step="2" hidden></div>' +
        '<div class="fwf-tk-step" data-step="3" hidden></div>' +
      '</div>';
    document.body.appendChild(wrap);
    popupEl = wrap;
    renderSteps();

    // click delegation across steps
    wrap.addEventListener("click", function (e) {
      var act = e.target && e.target.getAttribute && e.target.getAttribute("data-act");
      if (act === "to2") goStep(2);
      else if (act === "send") doSend();
      else if (act === "reveal") revealResults();
    });

    // language sync (re-render whichever step copy, preserve current step view)
    window.addEventListener("fwf-lang-change", function () {
      var cur = currentStep();
      renderSteps();
      [1, 2, 3].forEach(function (n) {
        popupEl.querySelector('.fwf-tk-step[data-step="' + n + '"]').hidden = (n !== cur);
      });
    });

    return wrap;
  }

  function currentStep() {
    for (var n = 1; n <= 3; n++) {
      if (!popupEl.querySelector('.fwf-tk-step[data-step="' + n + '"]').hidden) return n;
    }
    return 1;
  }

  function goStep(n) {
    var card = popupEl.querySelector(".fwf-tk-card");
    var cur = currentStep();
    var oldStep = popupEl.querySelector('.fwf-tk-step[data-step="' + cur + '"]');
    var newStep = popupEl.querySelector('.fwf-tk-step[data-step="' + n + '"]');
    if (cur === n) return;
    var g = window.gsap;

    // Swap the visible step SYNCHRONOUSLY — the gate must never depend on a
    // rAF-driven tween completing (a tab-switch mid-transition could strand it).
    var h0 = card.offsetHeight;
    oldStep.hidden = true; oldStep.style.opacity = ""; oldStep.style.transform = "";
    newStep.hidden = false;

    if (n === 2) { var inp = newStep.querySelector("input"); if (inp) setTimeout(function () { try { inp.focus(); } catch (e) {} }, REDUCE || !g ? 0 : 380); }
    if (REDUCE || !g) return;

    // animation is pure decoration on top of the already-swapped DOM
    var h1 = card.offsetHeight;
    g.set(card, { height: h0 });
    g.to(card, { height: h1, duration: 0.32, ease: "power3.inOut", clearProps: "height" });
    g.fromTo(newStep, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", clearProps: "transform" });
    g.fromTo(newStep.querySelectorAll(".fwf-tk-eyebrow, h2 span, h2 em, .fwf-tk-sub, .fwf-tk-flabel, input, .fwf-tk-cta, .fwf-tk-foot"),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power3.out", stagger: 0.05, clearProps: "transform" });
  }

  // ---- build the audit payload from the (already-rendered) results DOM ----
  var DIM_NAMES = { 1: "Positioning", 2: "Creative Quality", 3: "Ad Performance", 4: "Creative Testing", 5: "Storytelling", 6: "AI & Content", 7: "Infrastructure" };

  function readDimScores() {
    // Map by ORDER, not by name: the 7 dimension rows always render 1→7, and
    // matching the name would break under i18n (German translates the labels).
    var scores = {}, idx = 0;
    document.querySelectorAll("#root main .py-3").forEach(function (row) {
      var score = null;
      row.querySelectorAll("span").forEach(function (sp) {
        var m = (sp.textContent || "").trim().match(/^(\d+)\s*\/\s*10$/);
        if (m) score = parseInt(m[1], 10);
      });
      if (score !== null) { idx++; if (DIM_NAMES[idx]) scores[idx] = score; }
    });
    return scores;
  }

  function buildAuditPayload() {
    var dims = readDimScores();
    var keys = Object.keys(dims);
    var total = 0; keys.forEach(function (k) { total += dims[k]; });
    var max = (keys.length || 7) * 10;
    var sorted = keys.map(function (k) { return { name: DIM_NAMES[k], score: dims[k] }; }).sort(function (a, b) { return b.score - a.score; });
    var strengths = sorted.filter(function (d) { return d.score >= 7; });
    var gaps = sorted.slice().reverse().slice(0, 3);
    var pct = max ? total / max : 0;
    var label = pct >= 0.8 ? "Strong — well-positioned for scale"
              : pct >= 0.6 ? "Developing — clear growth gaps identified"
              : pct >= 0.4 ? "Early stage — significant gaps across key areas"
              :              "Critical — foundational work needed before scaling";
    var steps = [];
    if (gaps[0]) steps.push("Close the gap in " + gaps[0].name + " — it's your biggest drag on performance.");
    if (gaps[1] && gaps[1].score < 6) steps.push("Develop " + gaps[1].name + " systematically — inconsistency here compounds.");
    steps.push("Book a strategy call to map the path from your current score to scale.");
    return {
      clientName: "Your Business",
      date: new Date().toLocaleDateString("en-GB"),
      score: total + " / " + max,
      sections: [
        { title: "Overall Score", body: total + " / " + max + ". " + label + "." },
        { title: "What's working", body: strengths.length ? strengths.map(function (d) { return d.name + " (" + d.score + "/10)"; }).join(", ") + " — protect these." : "Each dimension is an opportunity. None are too far gone to fix." },
        { title: "Biggest gaps", body: gaps.map(function (d) { return d.name + ": " + d.score + "/10"; }).join("\n") },
        { title: "Next steps", body: steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n") },
      ],
    };
  }

  function doSend() {
    var step = popupEl.querySelector('.fwf-tk-step[data-step="2"]');
    var input = step.querySelector("input");
    var btn = step.querySelector('[data-act="send"]');
    var c = lang() === "en" ? COPY.en : COPY.de;
    if (validateEmail(input.value).ok !== true) return;
    var email = input.value.trim().toLowerCase();
    btn.disabled = true;
    btn.innerHTML = '<span class="fwf-tk-spin"></span>' + c.s2.sending;

    // results shouldn't be held hostage to a transient server error: a valid
    // email is the gate, so advance either way — but still attempt the send.
    var done = false;
    function advance() { if (done) return; done = true; goStep(3); scheduleAutoReveal(); }

    var payload;
    try { payload = buildAuditPayload(); } catch (e) { payload = { clientName: "Your Business", date: new Date().toLocaleDateString("en-GB"), score: "", sections: [] }; }

    fetch("/api/send-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, audit: payload }),
    }).then(function () { advance(); }).catch(function (err) {
      console.error("[fwf] send-audit failed:", err); advance();
    });
    setTimeout(advance, 4000); // safety: never trap the user on a hung request
  }

  var autoRevealT = null;
  function scheduleAutoReveal() {
    clearTimeout(autoRevealT);
    autoRevealT = setTimeout(function () { revealResults(); }, 2800);
  }

  function showPopup() {
    var wrap = buildPopup();
    gateActive = true; resultsRevealed = false;
    // ensure step 1 is the visible step
    [1, 2, 3].forEach(function (n) { wrap.querySelector('.fwf-tk-step[data-step="' + n + '"]').hidden = (n !== 1); });
    wrap.classList.add("on");
    var veil = wrap.querySelector(".fwf-tk-veil");
    var card = wrap.querySelector(".fwf-tk-card");
    var line = wrap.querySelector(".fwf-tk-line");
    var g = window.gsap;
    if (REDUCE || !g) { veil.style.opacity = 1; card.style.opacity = 1; line.style.transform = "scaleX(1)"; return; }
    g.timeline()
      .to(veil, { opacity: 1, duration: 0.45, ease: "power2.out" })
      .fromTo(card, { opacity: 0, y: 26, scale: 0.96, filter: "blur(8px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power4.out", clearProps: "filter" }, "-=0.22")
      .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
      .fromTo(card.querySelectorAll('.fwf-tk-step[data-step="1"] .fwf-tk-eyebrow, .fwf-tk-step[data-step="1"] h2 span, .fwf-tk-step[data-step="1"] h2 em, .fwf-tk-step[data-step="1"] .fwf-tk-sub, .fwf-tk-step[data-step="1"] .fwf-tk-cta, .fwf-tk-step[data-step="1"] .fwf-tk-foot'),
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, clearProps: "transform" }, "-=0.6");
  }

  // dismiss the gate and play the results in
  function revealResults() {
    if (resultsRevealed || !popupEl) return;
    resultsRevealed = true;
    gateActive = false;
    clearTimeout(autoRevealT);
    window.scrollTo({ top: 0, behavior: "auto" });

    var g = window.gsap;
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      popupEl.classList.remove("on");
      popupEl.style.opacity = "";
      hideBundleEmailForm();
      try { scan(g, window.ScrollTrigger); } catch (e) {}  // let the results content animate in
      animateResultBars(g);
    }
    if (REDUCE || !g) { finish(); return; }
    g.to(popupEl, { opacity: 0, duration: 0.5, ease: "power2.inOut", onComplete: finish });
    setTimeout(finish, 700); // guarantee the reveal even if rAF is paused
  }

  // the bundle's own results-page email form is now redundant (we captured it)
  function hideBundleEmailForm() {
    var form = document.querySelector("#root main form");
    if (form) form.style.display = "none";
  }

  // health-bar fills: reset each bar to 0, then sweep to its score, left→right
  function animateResultBars(g) {
    var root = document.querySelector("#root main");
    if (!root) return;
    var bars = [];
    var mainBar = root.querySelector(".score-bar-fill");
    if (mainBar) bars.push(mainBar);
    root.querySelectorAll('[class*="h-[3px]"] > div').forEach(function (d) { bars.push(d); });

    if (REDUCE || !g) return; // bundle already set final widths; leave them

    bars.forEach(function (el, i) {
      var target = el.style.width || getComputedStyle(el).width;
      if (!target || target === "0px" || target === "0%") return;
      el.style.transition = "none";
      g.fromTo(el, { width: "0%" }, { width: target, duration: 1.0, delay: 0.15 + i * 0.08, ease: "power2.out" });
      // safety: if the sweep ever stalls (rAF paused), snap to the real score
      // so a bar is never left empty.
      setTimeout(function () { el.style.width = target; }, 1600 + i * 80);
    });

    // count the headline score up alongside the bars
    var track = root.querySelector(".score-bar-track");
    var numDiv = track && track.previousElementSibling;
    var tnode = numDiv && numDiv.firstChild;
    if (tnode && tnode.nodeType === 3) {
      var tgt = parseInt(tnode.nodeValue, 10);
      if (!isNaN(tgt)) {
        var o = { n: 0 };
        g.to(o, { n: tgt, duration: 1.1, delay: 0.15, ease: "power2.out",
          onUpdate: function () { tnode.nodeValue = Math.round(o.n) + " "; } });
      }
    }
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
    if (!atResults && popupShown) {
      // user went back (e.g. "Retake") — tear the gate down and reset
      popupShown = false; gateActive = false; resultsRevealed = false;
      if (popupEl) popupEl.classList.remove("on");
    }

    if (REDUCE || !g) return;

    // while the gate is up, don't prime/animate the hidden results — the
    // reveal sequence animates them itself once the email is in.
    if (atResults && gateActive && !resultsRevealed) return;

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
