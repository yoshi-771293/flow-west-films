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
        head: ["Thanks for ", "finishing", " the audit."],
        sub: "Most brands never do. You just did — and that's exactly the mindset that scales.",
        cta: "Get my result →",
      },
      s2: {
        eyebrow: "ONE LAST STEP",
        head: ["Where should we ", "send", " it?"],
        sub: "Your score and the full breakdown — straight to your inbox.",
        nameLabel: "Name", namePh: "Jane Doe",
        companyLabel: "Company", companyPh: "Acme GmbH",
        emailLabel: "Email", emailPh: "you@company.com",
        phoneLabel: "Phone (optional)", phonePh: "+49 …",
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
        head: ["Danke fürs ", "Durchziehen", "."],
        sub: "Die meisten Marken trauen sich das nie. Sie schon — und genau dieses Mindset skaliert.",
        cta: "Ergebnis sichern →",
      },
      s2: {
        eyebrow: "NUR NOCH EIN SCHRITT",
        head: ["Wohin dürfen wir's ", "schicken", "?"],
        sub: "Ihr Score und die komplette Auswertung — direkt in Ihr Postfach.",
        nameLabel: "Name", namePh: "Max Mustermann",
        companyLabel: "Firma", companyPh: "Acme GmbH",
        emailLabel: "E-Mail", emailPh: "sie@firma.de",
        phoneLabel: "Telefon (optional)", phonePh: "+49 …",
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

  var CALENDLY = "https://calendly.com/flowwestfilms-appointment/30min";
  var SITE = "https://flowwestfilms.de";

  // Results-page header copy — bigger headline, brand voice, one italic moment,
  // a little dry wit. Tells them: you're done, read it, then book a call.
  var RESULTS_COPY = {
    en: {
      head: ["You made it. Here's the ", "verdict", "."],
      sub: "Seven dimensions, scored without mercy. Read it top to bottom — then book a call before you overthink it.",
      ctaPrimary: "Book a call →",
      ctaSecondary: "Back to site",
    },
    de: {
      head: ["Geschafft. Hier das ", "Urteil", "."],
      sub: "Sieben Dimensionen, gnadenlos bewertet. Lesen Sie alles — und buchen Sie einen Call, bevor Sie zu lange grübeln.",
      ctaPrimary: "Call buchen →",
      ctaSecondary: "Zur Website",
    },
  };

  // brand button (matches .fwf-btn-primary / -ghost on the main site: pill,
  // dark fill, 1px accent border, mono uppercase, soft glow)
  function brandBtnCss(primary) {
    return "display:inline-flex;align-items:center;justify-content:center;gap:10px;" +
      "padding:14px 26px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;" +
      "letter-spacing:0.18em;text-transform:uppercase;border-radius:999px;text-decoration:none;white-space:nowrap;" +
      (primary
        ? "background:#0A0A0A;color:#fff;border:1px solid #FF2D78;box-shadow:0 0 24px rgba(255,45,120,0.18);"
        : "background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.18);");
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
      "#fwf-thanks .fwf-tk-sub{font-family:'Syne',system-ui,sans-serif;font-size:15px;line-height:1.6;color:#8A8A8A;max-width:360px;margin-bottom:22px;}",
      "#fwf-thanks .fwf-tk-field{margin-bottom:14px;}",
      "#fwf-thanks .fwf-tk-flabel{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin-bottom:7px;}",
      "#fwf-thanks input{width:100%;background:#000;border:1px solid #262626;border-radius:9px;padding:13px 15px;color:#fff;font-family:'Syne',system-ui,sans-serif;font-size:15px;transition:border-color .18s,box-shadow .18s;}",
      "#fwf-thanks input::placeholder{color:#4a4a4a;}",
      "#fwf-thanks input:focus{outline:none;border-color:#FF2D78;box-shadow:0 0 0 1px rgba(255,45,120,0.35);}",
      "#fwf-thanks input.valid{border-color:#00FF88;box-shadow:0 0 0 1px rgba(0,255,136,0.3);}",
      "#fwf-thanks input.invalid{border-color:#FF6420;box-shadow:0 0 0 1px rgba(255,100,32,0.3);}",
      "#fwf-thanks .fwf-tk-msg{font-family:'Syne',system-ui,sans-serif;font-size:13px;min-height:16px;margin:2px 0 16px;color:#FF6420;}",
      // matches the site's .fwf-btn-primary: pill, dark fill, pink border, glow
      "#fwf-thanks .fwf-tk-cta{width:100%;padding:15px;border-radius:999px;border:1px solid #FF2D78;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;background:#0A0A0A;color:#fff;box-shadow:0 0 24px rgba(255,45,120,0.18);transition:background .2s,box-shadow .2s,transform .12s,opacity .18s,border-color .2s;display:flex;align-items:center;justify-content:center;gap:9px;}",
      "#fwf-thanks .fwf-tk-cta:hover:not(:disabled){background:#FF2D78;color:#fff;box-shadow:0 0 0 4px rgba(255,45,120,0.18),0 0 36px rgba(255,45,120,0.45);transform:translateY(-1px);}",
      "#fwf-thanks .fwf-tk-cta:active{transform:scale(.985);}",
      "#fwf-thanks .fwf-tk-cta:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;border-color:#3a2330;}",
      "#fwf-thanks .fwf-tk-foot{display:flex;align-items:center;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid #1a1a1a;}",
      "#fwf-thanks .fwf-tk-foot span{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5A5A5A;}",
      "#fwf-thanks .fwf-tk-spin{width:13px;height:13px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:fwftkspin .6s linear infinite;}",
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
      function field(id, label, type, ph, autocomplete) {
        return '<div class="fwf-tk-field">' +
          '<label class="fwf-tk-flabel" for="' + id + '">' + label + '</label>' +
          '<input id="' + id + '" type="' + type + '" autocomplete="' + autocomplete + '" spellcheck="false" placeholder="' + ph + '">' +
          '</div>';
      }
      return mark + eyebrow(c.s2) + head(c.s2) +
        '<p class="fwf-tk-sub" data-tk="sub">' + c.s2.sub + '</p>' +
        field("fwf-tk-name", c.s2.nameLabel, "text", c.s2.namePh, "name") +
        field("fwf-tk-company", c.s2.companyLabel, "text", c.s2.companyPh, "organization") +
        field("fwf-tk-email", c.s2.emailLabel, "email", c.s2.emailPh, "email") +
        '<div class="fwf-tk-msg" id="fwf-tk-emailmsg"></div>' +
        field("fwf-tk-phone", c.s2.phoneLabel, "tel", c.s2.phonePh, "tel") +
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
    if (n !== 2) return;
    var nameEl = step.querySelector("#fwf-tk-name");
    var companyEl = step.querySelector("#fwf-tk-company");
    var emailEl = step.querySelector("#fwf-tk-email");
    var msg = step.querySelector("#fwf-tk-emailmsg");
    var btn = step.querySelector('[data-act="send"]');

    function revalidate() {
      var c = lang() === "en" ? COPY.en : COPY.de;
      var nameOk = !!nameEl.value.trim();
      var companyOk = !!companyEl.value.trim();
      var ev = emailEl.value.trim();
      emailEl.classList.remove("valid", "invalid");
      var emailOk = false;
      if (!ev) { msg.textContent = ""; }
      else {
        var r = validateEmail(ev);
        if (r.ok) { emailEl.classList.add("valid"); msg.textContent = ""; emailOk = true; }
        else { emailEl.classList.add("invalid"); msg.textContent = r.disp ? c.s2.errDisp : c.s2.errInvalid; }
      }
      btn.disabled = !(nameOk && companyOk && emailOk);
    }

    [nameEl, companyEl, emailEl].forEach(function (el) { el.addEventListener("input", revalidate); });
    step.querySelectorAll("input").forEach(function (el) {
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" && !btn.disabled) btn.click(); });
    });
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

  // Read the dimension rows as the user actually sees them: displayed name +
  // label (already in the right language) + score. Order is 1→7 regardless.
  function readDimensions() {
    var out = [];
    document.querySelectorAll("#root main .py-3").forEach(function (row) {
      var spans = row.querySelectorAll("span");
      if (!spans.length) return;
      var score = null;
      spans.forEach(function (sp) {
        var m = (sp.textContent || "").trim().match(/^(\d+)\s*\/\s*10$/);
        if (m) score = parseInt(m[1], 10);
      });
      if (score === null) return;
      var name = (spans[0].textContent || "").trim();
      var label = "";
      for (var i = 1; i < spans.length; i++) {
        var t = (spans[i].textContent || "").trim();
        if (t && t !== name && !/^\d+\s*\/\s*10$/.test(t)) { label = t; break; }
      }
      out.push({ name: name, label: label, score: score });
    });
    return out;
  }

  // The "what we'd do about it" recommendation, lifted from the rendered page
  // (keyed off the headline's inline font-size so it survives i18n).
  function readRecommendation(root) {
    if (!root) return null;
    var headEl = null, divs = root.querySelectorAll("div");
    for (var i = 0; i < divs.length; i++) {
      if (/clamp\(\s*26px/.test(divs[i].getAttribute("style") || "")) { headEl = divs[i]; break; }
    }
    if (!headEl) return null;
    var head = (headEl.textContent || "").trim();
    if (!head) return null;
    var body = "", nx = headEl.nextElementSibling;
    while (nx) { if (nx.tagName === "P") { body = (nx.textContent || "").trim(); break; } nx = nx.nextElementSibling; }
    return { headline: head, body: body };
  }

  function buildAuditPayload() {
    var l = lang();
    var dims = readDimensions();
    var total = 0; dims.forEach(function (d) { total += d.score; });
    var max = (dims.length || 7) * 10;
    var pct = max ? Math.round((total / max) * 100) : 0;

    // English-named copy for the text fallback (sections), mapped by order
    var named = dims.map(function (d, i) { return { name: DIM_NAMES[i + 1] || d.name, score: d.score }; });
    var sortedDesc = named.slice().sort(function (a, b) { return b.score - a.score; });
    var strengths = sortedDesc.filter(function (d) { return d.score >= 7; });
    var gaps = sortedDesc.slice().reverse().slice(0, 3);
    var labelTxt = pct >= 80 ? "Strong — well-positioned for scale"
                 : pct >= 60 ? "Developing — clear growth gaps identified"
                 : pct >= 40 ? "Early stage — significant gaps across key areas"
                 :             "Critical — foundational work needed before scaling";
    var steps = [];
    if (gaps[0]) steps.push("Close the gap in " + gaps[0].name + " — it's your biggest drag on performance.");
    if (gaps[1] && gaps[1].score < 6) steps.push("Develop " + gaps[1].name + " systematically — inconsistency here compounds.");
    steps.push("Book a strategy call to map the path from your current score to scale.");

    var root = document.querySelector("#root main");
    var h1 = root && root.querySelector("h1");

    return {
      lang: l,
      date: new Date().toLocaleDateString(l === "de" ? "de-DE" : "en-GB"),
      headline: h1 ? (h1.textContent || "").trim() : "",
      score: total + " / " + max,
      scorePct: pct,
      dimensions: dims,
      recommendation: readRecommendation(root),
      // text fallback in case the rich fields are ever missing server-side
      sections: [
        { title: "Overall Score", body: total + " / " + max + ". " + labelTxt + "." },
        { title: "What's working", body: strengths.length ? strengths.map(function (d) { return d.name + " (" + d.score + "/10)"; }).join(", ") + " — protect these." : "Each dimension is an opportunity. None are too far gone to fix." },
        { title: "Biggest gaps", body: gaps.map(function (d) { return d.name + ": " + d.score + "/10"; }).join("\n") },
        { title: "Next steps", body: steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n") },
      ],
    };
  }

  function doSend() {
    var step = popupEl.querySelector('.fwf-tk-step[data-step="2"]');
    var btn = step.querySelector('[data-act="send"]');
    var c = lang() === "en" ? COPY.en : COPY.de;

    var name = (step.querySelector("#fwf-tk-name").value || "").trim();
    var company = (step.querySelector("#fwf-tk-company").value || "").trim();
    var email = (step.querySelector("#fwf-tk-email").value || "").trim().toLowerCase();
    var phone = (step.querySelector("#fwf-tk-phone").value || "").trim();
    // required: name + company + valid email
    if (!name || !company || validateEmail(email).ok !== true) return;

    btn.disabled = true;
    btn.innerHTML = '<span class="fwf-tk-spin"></span>' + c.s2.sending;

    // results shouldn't be held hostage to a transient server error: valid
    // details are the gate, so advance either way — but still attempt the send.
    var done = false;
    function advance() { if (done) return; done = true; goStep(3); scheduleAutoReveal(); }

    var payload;
    try { payload = buildAuditPayload(); } catch (e) { payload = { lang: lang(), date: "", score: "", sections: [] }; }

    fetch("/api/send-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, name: name, company: company, phone: phone, audit: payload }),
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
      try { customizeResults(); } catch (e) {}   // rewrite the header + add the CTA first
      try { scan(g, window.ScrollTrigger); } catch (e) {}  // then animate the rest in
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

  // Rewrite the results headline + intro in brand voice (bigger, with wit), make
  // it bulletproof-visible (the motion layer skips it), and drop a brand-style
  // "Book a call" CTA at the end. Re-applies on language toggle.
  function customizeResults() {
    var root = document.querySelector("#root main");
    if (!root) return;
    var c = lang() === "en" ? RESULTS_COPY.en : RESULTS_COPY.de;

    var h1 = root.querySelector("h1");
    if (h1) {
      h1.setAttribute("data-fwf-fx", "1"); // keep the generic motion layer off it
      h1.style.fontSize = "clamp(56px, 9.5vw, 112px)";
      h1.style.opacity = "1";
      h1.style.clipPath = "none";
      h1.style.transform = "none";
      h1.innerHTML = esc(c.head[0]) +
        '<em style="font-style:italic;color:#FF2D78;">' + esc(c.head[1]) + "</em>" +
        esc(c.head[2]);
      var sub = h1.nextElementSibling;
      if (sub && sub.tagName === "P") {
        sub.setAttribute("data-fwf-fx", "1");
        sub.style.opacity = "1";
        sub.textContent = c.sub;
      }
    }

    if (!document.getElementById("fwf-results-cta")) {
      var section = root.querySelector("section") || root;
      var wrap = section.querySelector(".wrap") || section;
      var cta = document.createElement("div");
      cta.id = "fwf-results-cta";
      cta.setAttribute("data-fwf-fx", "1");
      cta.style.cssText = "margin:52px 0 8px;display:flex;gap:12px;flex-wrap:wrap;opacity:1;";
      cta.innerHTML =
        '<a href="' + CALENDLY + '" style="' + brandBtnCss(true) + '">' + esc(c.ctaPrimary) + "</a>" +
        '<a href="' + SITE + '" style="' + brandBtnCss(false) + '">' + esc(c.ctaSecondary) + "</a>";
      wrap.appendChild(cta);
    }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

    // keep the rewritten results header in the right language on a DE/EN toggle
    window.addEventListener("fwf-lang-change", function () {
      if (resultsRevealed && document.querySelector("#root main .score-bar-track")) {
        var existing = document.getElementById("fwf-results-cta");
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        try { customizeResults(); } catch (e) {}
      }
    });

    // Last-resort safety net: if anything primed never got revealed — whether
    // it's stuck at opacity 0 OR stranded behind a clip-path mask — hard-show it
    // so copy is NEVER permanently hidden on the live page.
    setInterval(function () {
      if (REDUCE) return;
      document.querySelectorAll('[data-fwf-fx]').forEach(function (el) {
        var s = getComputedStyle(el);
        var op = parseFloat(s.opacity);
        var cp = s.clipPath || s.webkitClipPath || "";
        var clipped = cp.indexOf("inset(") === 0 && /inset\(\s*([5-9]\d|\d{3})/.test(cp);
        if ((op < 0.02 || clipped) && el.getBoundingClientRect().top < (window.innerHeight || 800) + 200) {
          if (io) io.unobserve(el);
          el.style.opacity = "1";
          el.style.clipPath = "none";
          el.style.transform = "none";
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
