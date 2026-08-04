/* ============================================================================
 * Flow West Films — German language overlay controller (zero-touch)
 * ----------------------------------------------------------------------------
 * Translates the live English DOM into German by matching each text node /
 * text-bearing attribute against window.FWF_TRANSLATIONS.de. Re-applies after
 * every React render via MutationObserver. Restores English from a per-node
 * cache when toggled back. Does NOT read or modify any existing component code.
 *
 * Strings absent from the map (typewriter words, dynamic text) are left alone.
 * ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "fwf-lang";
  var DEFAULT_LANG = (function() {
    var nl = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return nl.startsWith("de") ? "de" : "en";
  })();
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];

  // App-specific config (main site).
  var CONFIG = {
    btnClass: "fwf-btn fwf-btn-ghost fwf-btn-sm",
    // Where to inject the toggle: first child of the nav's right-hand group.
    findInsertPoint: function () {
      var inner = document.querySelector(".fwf-nav-inner");
      if (!inner) return null;
      var groups = inner.querySelectorAll(".fwf-nav-links");
      var group = groups.length ? groups[groups.length - 1] : inner;
      return { parent: group, before: group.firstChild };
    },
    rootSel: "#root",
  };

  var lang = readLang();
  var textOriginals = new WeakMap();   // textNode -> original English nodeValue
  var attrOriginals = new WeakMap();   // element  -> { attrName: originalValue }
  var observer = null;
  var applying = false;
  var scheduled = false;
  var revealed = false;

  function readLang() {
    var s = null;
    try { s = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return (s === "de" || s === "en") ? s : DEFAULT_LANG;
  }
  function saveLang(l) { try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {} }

  function dict() {
    var t = window.FWF_TRANSLATIONS;
    return (t && t.de) ? t.de : {};
  }
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  // ---- text nodes ---------------------------------------------------------
  function doTextNode(node, d) {
    var raw = node.nodeValue;
    if (raw == null) return;
    // Restore first, before any early-return on the CURRENT text. A DE value
    // of "" (a deliberately blanked connector word) leaves the node holding
    // only whitespace; norm()'ing that current value produces an empty key,
    // which used to trigger an early return before this restore ever ran --
    // permanently losing the English original on the next EN switch.
    if (lang !== "de") {
      if (textOriginals.has(node)) {
        var orig = textOriginals.get(node);
        if (node.nodeValue !== orig) node.nodeValue = orig;
      }
      return;
    }
    if (!raw) return;
    var key = norm(raw);
    if (!key) return;
    var de = d[key];
    if (de == null) return;
    if (!textOriginals.has(node)) textOriginals.set(node, raw);
    var lead = raw.match(/^\s*/)[0];
    var trail = raw.match(/\s*$/)[0];
    var next = lead + de + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  // ---- attributes ---------------------------------------------------------
  function doAttrs(el, d) {
    if (!el || el.nodeType !== 1 || !el.hasAttribute) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var raw = el.getAttribute(a);
      var key = norm(raw || "");
      if (!key) continue;
      var store = attrOriginals.get(el);
      if (lang === "de") {
        var de = d[key];
        if (de == null) continue;
        if (!store) { store = {}; attrOriginals.set(el, store); }
        if (store[a] == null) store[a] = raw;
        if (el.getAttribute(a) !== de) el.setAttribute(a, de);
      } else if (store && store[a] != null) {
        if (el.getAttribute(a) !== store[a]) el.setAttribute(a, store[a]);
      }
    }
  }

  function walk(root, d) {
    if (!root) return;
    if (root.nodeType === 3) { doTextNode(root, d); return; }
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, batch = [];
    while ((n = tw.nextNode())) batch.push(n);
    for (var i = 0; i < batch.length; i++) doTextNode(batch[i], d);
    if (root.querySelectorAll) {
      var els = root.querySelectorAll("[placeholder],[aria-label],[title],[alt]");
      for (var j = 0; j < els.length; j++) doAttrs(els[j], d);
    }
    doAttrs(root, d);
  }

  function applyAll() {
    var d = dict();
    applying = true;
    if (observer) observer.disconnect();
    try {
      walk(document.body, d);
      ensureButton();
      renderButton();
      document.documentElement.setAttribute("data-lang", lang);
    } finally {
      connect();
      applying = false;
    }
    maybeReveal();
  }

  function connect() {
    if (!observer) return;
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS,
    });
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    (window.requestAnimationFrame || window.setTimeout)(function () {
      scheduled = false;
      applyAll();
    }, 16);
  }

  // ---- toggle button ------------------------------------------------------
  function ensureButton() {
    if (document.getElementById("fwf-lang-toggle")) return;
    var pt = CONFIG.findInsertPoint();
    if (!pt || !pt.parent) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "fwf-lang-toggle";
    btn.className = CONFIG.btnClass;
    btn.setAttribute("aria-label", "Sprache umschalten — switch language");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      setLanguage(lang === "de" ? "en" : "de");
    });
    pt.parent.insertBefore(btn, pt.before || null);
  }

  function renderButton() {
    var btn = document.getElementById("fwf-lang-toggle");
    if (!btn) return;
    var de = lang === "de";
    btn.innerHTML =
      '<span class="fwf-lang-seg ' + (de ? "fwf-lang-on" : "fwf-lang-off") + '">DE</span>' +
      '<span class="fwf-lang-sep">·</span>' +
      '<span class="fwf-lang-seg ' + (de ? "fwf-lang-off" : "fwf-lang-on") + '">EN</span>';
  }

  // ---- anti-flash reveal --------------------------------------------------
  function appReady() {
    var root = document.querySelector(CONFIG.rootSel);
    return !!(root && root.firstElementChild);
  }
  function reveal() {
    if (revealed) return;
    revealed = true;
    var de = document.documentElement;
    if (de) de.classList.remove("fwf-i18n-boot");
  }
  function maybeReveal() {
    if (lang !== "de") { reveal(); return; }
    if (appReady()) reveal();
  }

  // ---- public API ---------------------------------------------------------
  function setLanguage(l) {
    if (l !== "de" && l !== "en") return;
    lang = l;
    saveLang(l);
    applyAll();
    try { window.dispatchEvent(new CustomEvent("fwf-lang-change", { detail: { lang: l } })); } catch(e) {}
  }
  window.FWF_setLanguage = setLanguage;
  window.FWF_getLanguage = function () { return lang; };

  // ---- styles (scoped, additive — styles.css untouched) -------------------
  function injectStyle() {
    if (document.getElementById("fwf-i18n-style")) return;
    var s = document.createElement("style");
    s.id = "fwf-i18n-style";
    s.textContent =
      "#fwf-lang-toggle{display:inline-flex;align-items:center;gap:5px;line-height:1;}" +
      ".fwf-lang-seg{transition:opacity .15s ease;font-variant-numeric:tabular-nums;display:inline-block;min-width:1.8em;text-align:center;}" +
      ".fwf-lang-on{opacity:1;}" +
      ".fwf-lang-off{opacity:.4;}" +
      ".fwf-lang-sep{opacity:.35;}" +
      "html[data-lang='de'] .fwf-hero-h1{font-size:clamp(38px,6.5vw,88px)!important;}";
    (document.head || document.documentElement).appendChild(s);
  }

  // ---- boot ---------------------------------------------------------------
  function boot() {
    injectStyle();
    observer = new MutationObserver(function () { if (!applying) schedule(); });
    applyAll();
    connect();
    // Safety: never leave content hidden if something goes wrong.
    setTimeout(reveal, 1500);
  }

  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
