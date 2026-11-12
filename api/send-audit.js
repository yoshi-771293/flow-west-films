const { Resend } = require("resend");
const crypto = require("crypto");

const DISPOSABLE = new Set([
  "mailinator.com", "tempmail.com", "temp-mail.org", "guerrillamail.com",
  "10minutemail.com", "throwaway.email", "trashmail.com", "yopmail.com",
  "getnada.com", "sharklasers.com", "dispostable.com", "fakeinbox.com",
  "maildrop.cc", "mintemail.com", "mohmal.com", "emailondeck.com",
]);

function isValidEmail(raw) {
  const email = (raw || "").trim().toLowerCase();
  if (!email) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  const domain = email.split("@")[1];
  if (!/\.[a-z]{2,}$/.test(domain)) return false;
  if (DISPOSABLE.has(domain)) return false;
  return true;
}

// ── Qualification from the audit's contact step (same rules as the funnel on
//    start.flowwestfilms.de, fwf-funnel api/_funnel.js). Keep both in sync. ──
const CALENDLY = "https://calendly.com/flowwestfilms-appointment/30min";
const NOTION = "https://boatneck-lavender-3eb.notion.site/";
const FIT_ALLOWED = {
  industry: ["agentur", "coaching", "dienstleister", "ecommerce", "lokal", "reguliert", "sonstige"],
  ad_spend: ["geplant", "keine", "lt50", "50-100", "100-300", "gt300"],
  budget: ["lt1500", "1500-2500", "2500-5000", "gt5000"],
};
const FIT_QUALIFY = {
  industry: ["agentur", "coaching", "dienstleister", "ecommerce", "lokal", "sonstige"],
  ad_spend: ["geplant", "50-100", "100-300", "gt300"],
  budget: ["1500-2500", "2500-5000", "gt5000"],
};
const FIT_LABELS = {
  industry: { agentur: "Agentur", coaching: "Coaching/Beratung", dienstleister: "Dienstleister", ecommerce: "E-Commerce", lokal: "Autohaus/lokal", reguliert: "Finanzen/Medizin", sonstige: "Sonstiges" },
  ad_spend: { geplant: "keine Ads, Start geplant", keine: "keine Ads, nichts geplant", lt50: "unter 50 €/Tag", "50-100": "50–100 €/Tag", "100-300": "100–300 €/Tag", gt300: "über 300 €/Tag" },
  budget: { lt1500: "unter 1.490 €", "1500-2500": "1.490–2.500 €", "2500-5000": "2.500–5.000 €", gt5000: "über 5.000 €" },
};
const TIER_BY_BUDGET = { "1500-2500": "Minimum (10 Ad-Videos)", "2500-5000": "Scale (20 Ad-Videos)", gt5000: "Partner (50 Ad-Videos/Monat)" };
const BONUS = {
  agentur: ["Das Kunden-Onboarding in 12 Fragen", "416b06902a1e8105840ee9fe3478d4dc"],
  coaching: ["Das Erstgespräch, das verkauft", "416b06902a1e81beb810d929ae0cc021"],
  dienstleister: ["Ihr Angebot auf einer Seite", "416b06902a1e816e93a1e741da9de3fd"],
  ecommerce: ["Hook, Meat, CTA: die Struktur für Produkt-Ads", "416b06902a1e8101b5bff1fcf7b7db39"],
  lokal: ["Der lokale Ad-Funnel", "416b06902a1e811e85cdd10f01bc8693"],
  reguliert: ["Vertrauen statt Versprechen", "416b06902a1e814eb6a8e199f5abea93"],
  sonstige: ["Der einfachste Funnel in fünf Stationen", "416b06902a1e81428ca2ebf6753e2b3d"],
};

// Returns null for old clients that don't send the contact-step picks.
function readFit(raw, name, email) {
  if (!raw || typeof raw !== "object") return null;
  const pick = {};
  for (const k of Object.keys(FIT_ALLOWED)) {
    if (!FIT_ALLOWED[k].includes(raw[k])) return null;
    pick[k] = raw[k];
  }
  const qualified = Object.keys(FIT_QUALIFY).every((k) => FIT_QUALIFY[k].includes(pick[k]));
  const b = BONUS[pick.industry];
  return {
    ...pick,
    qualified,
    tier: qualified ? TIER_BY_BUDGET[pick.budget] : null,
    newsletter: raw.newsletter === true,
    consent: raw.consent === true,
    eventId: typeof raw.event_id === "string" && /^[\w-]{8,64}$/.test(raw.event_id) ? raw.event_id : null,
    page: typeof raw.page === "string" && raw.page.startsWith("https://") ? raw.page.slice(0, 200) : "https://flowwestfilms.de/audit/",
    bonusTitle: b[0],
    bonusUrl: NOTION + b[1],
    bookUrl: `${CALENDLY}?utm_source=website&utm_content=audit-email&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
  };
}

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dimColor(score) {
  return score <= 4 ? "#FF2D78" : score <= 7 ? "#FF6420" : "#00C87A";
}

// email-safe progress bar: a 2-cell table, the filled cell sized by percentage
function barHtml(pct, color) {
  pct = Math.max(0, Math.min(100, Math.round(pct)));
  const filled = pct > 0 ? `<td width="${pct}%" style="background:${color};height:6px;font-size:0;line-height:0;border-radius:3px;">&nbsp;</td>` : "";
  const rest = pct < 100 ? `<td style="background:#1f1f1f;height:6px;font-size:0;line-height:0;">&nbsp;</td>` : "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:3px;overflow:hidden;"><tr>${filled}${rest}</tr></table>`;
}

// text/plain twin of buildEmailHtml — same content, no markup.
function buildEmailText(audit) {
  const {
    lang = "en", date = "", score = "", dimensions = [],
    recommendation = null, sections = [],
    recipientName = "", recipientCompany = "", fit = null,
  } = audit;
  const de = lang === "de";
  const who = [recipientName, recipientCompany].filter(Boolean).join(" · ");
  const out = [];
  out.push(de ? "ANALYSE ABGESCHLOSSEN" : "AUDIT COMPLETE");
  out.push(de ? "Hier stehen Sie." : "Here's where you stand.");
  if (who) out.push((de ? "Erstellt für " : "Prepared for ") + who + (date ? " · " + date : ""));
  out.push("");
  out.push((de ? "GESAMT-SCORE: " : "OVERALL SCORE: ") + (score || "—"));
  out.push("");
  if (dimensions.length) {
    dimensions.forEach((d) => {
      out.push(`  ${d.name} — ${d.score}/10${d.label ? " (" + d.label + ")" : ""}`);
    });
    out.push("");
  } else if (Array.isArray(sections)) {
    sections.forEach((s) => { out.push(s.title.toUpperCase()); out.push(s.body); out.push(""); });
  }
  if (recommendation && recommendation.headline) {
    out.push(de ? "WAS WIR TUN WÜRDEN" : "WHAT WE'D DO ABOUT IT");
    out.push(recommendation.headline);
    if (recommendation.body) out.push(recommendation.body);
    out.push("");
  }
  if (fit) {
    out.push((de ? "IHR BONUS: " : "YOUR BONUS: ") + fit.bonusTitle);
    out.push(fit.bonusUrl);
    out.push("");
  }
  if (!fit) out.push((de ? "Gespräch buchen: " : "Book a call: ") + CALENDLY);
  else if (fit.qualified) out.push((de ? "Jetzt Termin buchen: " : "Book your call: ") + fit.bookUrl);
  out.push("https://flowwestfilms.de");
  out.push("");
  out.push(de ? "Kein Spam. Nur die Analyse." : "No spam. Just the audit.");
  return out.join("\n");
}

function buildEmailHtml(audit) {
  const {
    lang = "en", date = "", score = "", scorePct = 0,
    dimensions = [], recommendation = null, headline = "", sections = [],
    recipientName = "", recipientCompany = "", fit = null,
  } = audit;

  // personalized "prepared for" line — name + company brighter, date muted
  const who = [recipientName, recipientCompany].filter(Boolean).map(esc).join(" · ");
  const preparedLine = who
    ? `<p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:11px;letter-spacing:0.06em;color:#5A5A5A;margin:0;">${lang === "de" ? "Erstellt für " : "Prepared for "}<span style="color:#cfcfcf;">${who}</span>${date ? " &nbsp;·&nbsp; " + esc(date) : ""}</p>`
    : (date ? `<p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:11px;letter-spacing:0.06em;color:#5A5A5A;margin:0;">${esc(date)}</p>` : "");

  const preheader = lang === "de"
    ? `Ihr Score: ${score || "—"}. Die komplette Auswertung über sieben Dimensionen.`
    : `Your score: ${score || "—"}. The full breakdown across seven dimensions.`;

  const L = lang === "de"
    ? { eyebrow: "ANALYSE ABGESCHLOSSEN", defHead: "Hier stehen Sie.", scoreLabel: "Gesamt-Score", recLabel: "Was wir tun würden", ctaPrimary: "Lassen Sie uns reden →", ctaSecondary: "Zur Startseite", foot: "Kein Spam. Nur die Analyse. · flowwestfilms.de" }
    : { eyebrow: "AUDIT COMPLETE", defHead: "Here's where you stand.", scoreLabel: "Overall Score", recLabel: "What we'd do about it", ctaPrimary: "Let's talk →", ctaSecondary: "Visit homepage", foot: "No spam. Just the audit. · flowwestfilms.de" };

  // two buttons at the end — pill-shaped to match the site's .fwf-btn (dark fill,
  // pink border on primary, faint border on secondary, mono uppercase).
  // With the contact-step picks: qualified -> book directly (prefilled);
  // not qualified -> the bonus is the primary action, no booking.
  const de = lang === "de";
  const B = {
    label: de ? "Ihr Bonus · von Florian Kotulla" : "Your bonus · by Florian Kotulla",
    intro: de ? "Holen Sie sich jetzt Ihren Bonus:" : "Grab your bonus now:",
    basis: de
      ? "Basierend auf Alex Hormozis „$100M Offers“ und Robert B. Cialdinis „Influence: Die Psychologie des Überzeugens“."
      : "Based on Alex Hormozi's “$100M Offers” and Robert B. Cialdini's “Influence: The Psychology of Persuasion”. In German.",
    get: de ? "Bonus jetzt holen →" : "Get your bonus →",
    getShort: de ? "Bonus holen" : "Get bonus",
    book: de ? "Jetzt Termin buchen →" : "Book your call →",
  };
  const pillCss = (border, fill) => `display:block;text-align:center;background:${fill};color:#FFFFFF;font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;padding:14px 10px;border:1px solid ${border};border-radius:999px;`;
  let ctas = [[CALENDLY, L.ctaPrimary], ["https://flowwestfilms.de", L.ctaSecondary]];
  if (fit && fit.qualified) ctas = [[fit.bookUrl, B.book], [fit.bonusUrl, B.getShort]];
  else if (fit) ctas = [[fit.bonusUrl, B.get], ["https://flowwestfilms.de", L.ctaSecondary]];
  const ctaRow = `
      <tr><td style="padding:28px 36px 6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="50%" style="padding-right:6px;">
            <a href="${esc(ctas[0][0])}" style="${pillCss("#FF2D78", "#0A0A0A")}">${esc(ctas[0][1])}</a>
          </td>
          <td width="50%" style="padding-left:6px;">
            <a href="${esc(ctas[1][0])}" style="${pillCss("#00C87A", "transparent")}">${esc(ctas[1][1])}</a>
          </td>
        </tr></table>
      </td></tr>`;
  const bonusBlock = fit ? `
      <tr><td style="padding:20px 36px 0;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:20px 0;border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f;">
          <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin:0 0 8px 0;">${esc(B.label)}</p>
          <p style="font-family:'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;color:#FFFFFF;margin:0;line-height:1.65;">${esc(B.intro)} <b>${esc(fit.bonusTitle)}</b>.</p>
          <p style="font-family:'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#8a8a8a;margin:8px 0 12px 0;line-height:1.6;">${esc(B.basis)}</p>
          <a href="${esc(fit.bonusUrl)}" style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#FF2D78;text-decoration:none;">${esc(B.get)}</a>
        </td></tr></table>
      </td></tr>` : "";

  const rich = Array.isArray(dimensions) && dimensions.length > 0;

  // ---- middle block: rich (bars) when we have dimensions, else text sections ----
  let middle;
  if (rich) {
    const dimRows = dimensions.map((d) => {
      const c = dimColor(d.score);
      const label = esc(d.label || "");
      return `
      <tr><td style="padding:14px 0;border-bottom:1px solid #161616;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#cfcfcf;">${esc(d.name)}</td>
          <td align="right" style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.08em;white-space:nowrap;">
            <span style="color:${c};letter-spacing:0.12em;">${label}</span>
            <span style="color:#5A5A5A;">&nbsp;&nbsp;${d.score}/10</span>
          </td>
        </tr></table>
        <div style="margin-top:8px;">${barHtml(d.score * 10, c)}</div>
      </td></tr>`;
    }).join("");

    const recBlock = recommendation && recommendation.headline ? `
      <tr><td style="padding:8px 36px 4px;">
        <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#FF2D78;margin:0 0 12px 0;">${esc(L.recLabel)}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #242424;border-radius:10px;overflow:hidden;">
          <tr><td style="height:1px;background:linear-gradient(90deg,#FF2D78,#9B30FF);font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:24px 26px;">
            <p style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:25px;font-weight:400;line-height:1.1;color:#FFFFFF;margin:0 0 12px 0;">${esc(recommendation.headline)}</p>
            ${recommendation.body ? `<p style="font-family:'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.65;color:#9a9a9a;margin:0;">${esc(recommendation.body)}</p>` : ""}
          </td></tr>
        </table>
      </td></tr>` : "";

    middle = `
      <tr><td style="padding:0 36px;">
        <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin:0 0 14px 0;">${esc(L.scoreLabel)}</p>
      </td></tr>
      <tr><td style="padding:0 36px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:54px;font-weight:400;color:#FFFFFF;line-height:1;">${esc(score)}</td>
        </tr></table>
        <div style="margin:14px 0 30px;">${barHtml(scorePct, "#FF2D78")}</div>
      </td></tr>
      <tr><td style="padding:0 36px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">${dimRows}</table>
      </td></tr>
      ${recBlock}`;
  } else {
    middle = `
      <tr><td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#181818;border:1px solid #2a2a2a;border-radius:8px;">
          <tr><td style="padding:18px 22px;">
            <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5A;margin:0 0 6px 0;">${esc(L.scoreLabel)}</p>
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:400;color:#FFFFFF;margin:0;">${esc(score)}</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 36px;"><table width="100%" cellpadding="0" cellspacing="0">
        ${sections.map((s) => `
        <tr><td style="padding:20px 0;border-bottom:1px solid #1f1f1f;">
          <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin:0 0 8px 0;">${esc(s.title)}</p>
          <p style="font-family:'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;color:#FFFFFF;margin:0;line-height:1.65;">${esc(s.body).replace(/\n/g, "<br>")}</p>
        </td></tr>`).join("")}
      </table></td></tr>`;
  }

  return `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="format-detection" content="telephone=no">
<!-- This email is already dark. Without these, Gmail/Apple Mail dark mode will
     run their own inversion over it and muddy the palette. -->
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${lang === "de" ? "Ihre Analyse ist fertig" : "Your audit is ready"} — Flow West Films</title></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#FFFFFF;">
<!-- Preheader: the inbox preview line. Hidden in the body, then padded so the
     client doesn't pull the eyebrow text in after it. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 0;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#0A0A0A;border:1px solid #1f1f1f;border-radius:12px;overflow:hidden;">

      <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#FF2D78 45%,#9B30FF 75%,transparent);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td style="padding:32px 36px 22px;">
        <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin:0 0 18px 0;">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#00FF88;vertical-align:middle;margin-right:7px;"></span>${esc(L.eyebrow)}
        </p>
        <h1 style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:40px;font-weight:400;line-height:1.02;letter-spacing:-0.02em;color:#FFFFFF;margin:0 0 12px 0;">${esc(headline || L.defHead)}</h1>
        ${preparedLine}
      </td></tr>

      ${middle}

      ${bonusBlock}

      ${ctaRow}

      <tr><td style="padding:26px 36px 32px;border-top:1px solid #1a1a1a;">
        <p style="font-family:'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5A5A5A;margin:0;">${esc(L.foot)}</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, company, phone, audit } = req.body || {};

  if (!email || !isValidEmail(email) || !audit || typeof audit !== "object") {
    return res.status(400).json({ error: "Invalid request: bad email or missing audit" });
  }
  // name + company are required. Phone is required by the form too, but is
  // deliberately NOT hard-rejected here: the client advances the user to the
  // results regardless of this response, so 400-ing a stale cached bundle that
  // still treats phone as optional would silently cost that person their audit
  // email. The form is the gate; this stays lenient.
  if (!name || !String(name).trim() || !company || !String(company).trim()) {
    return res.status(400).json({ error: "Invalid request: name and company are required" });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = String(name).trim().slice(0, 255);
  const cleanCompany = String(company).trim().slice(0, 255);
  const cleanPhone = phone ? String(phone).trim().slice(0, 64) : "";
  // contact-step picks (Bereich, Ad Spend, Budget, newsletter opt-in, consent)
  const fit = readFit(req.body.fit, cleanName, cleanEmail);

  // ── 1. Send via Resend ──────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "Flow West Films <audit@noreply.flowwestfilms.de>",
      to: cleanEmail,
      replyTo: "info@flowwestfilms.de",
      subject: audit.lang === "de" ? "Ihre Analyse ist fertig" : "Your audit is ready",
      html: buildEmailHtml({ ...audit, recipientName: cleanName, recipientCompany: cleanCompany, fit }),
      // A text/plain alternative isn't optional: HTML-only mail scores worse with
      // spam filters and leaves plain-text readers with nothing at all.
      text: buildEmailText({ ...audit, recipientName: cleanName, recipientCompany: cleanCompany, fit }),
    });
  } catch (err) {
    console.error("Resend error:", err?.message || err);
    return res.status(500).json({ error: "Failed to send email" });
  }

  // ── 2. Notify the studio (best-effort) ──────────────────────────────────────
  // The lead's own email has already sent by this point, so a failure here is
  // logged and swallowed — a broken notification must never cost someone their
  // audit. Recipients are overridable via env (comma-separated) so they can
  // change without a deploy. Sales needs this too — it's what preps the second
  // call — so customer.service@ and info@ get it alongside Florian.
  const notifyTo = process.env.AUDIT_NOTIFY_TO
    ? process.env.AUDIT_NOTIFY_TO.split(",").map((s) => s.trim()).filter(Boolean)
    : ["kotullaflorian@gmail.com", "customer.service@flowwestfilms.de", "info@flowwestfilms.de"];
  try {
    const sections = Array.isArray(audit.sections) ? audit.sections : [];
    const gaps = sections.find((s) => s && s.title === "Biggest gaps");
    const overall = sections.find((s) => s && s.title === "Overall Score");
    const rec = audit.recommendation && audit.recommendation.headline ? audit.recommendation : null;
    const dims = Array.isArray(audit.dimensions) ? audit.dimensions : [];
    const MONO = "'JetBrains Mono','SF Mono',Menlo,Consolas,'Roboto Mono','Courier New',monospace";
    const SERIF = "'Cormorant Garamond',Georgia,'Times New Roman',serif";
    const SANS = "'Syne',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    // strip non-dialable characters so the number is tappable straight from the inbox
    const telHref = cleanPhone.replace(/[^\d+]/g, "");

    const row = (label, value, accent) =>
      `<tr>
         <td style="padding:9px 18px 9px 0;font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#5A5A5A;white-space:nowrap;vertical-align:middle;">${esc(label)}</td>
         <td style="padding:9px 0;font-family:${SANS};font-size:15px;font-weight:${accent ? 600 : 400};color:${accent || "#EDEDED"};">${value || "—"}</td>
       </tr>`;

    const dimRows = dims.map((d) => {
      const c = dimColor(d.score);
      return `
        <tr><td style="padding:7px 0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:${MONO};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#9a9a9a;">${esc(d.name)}</td>
            <td align="right" style="font-family:${MONO};font-size:10px;color:${c};white-space:nowrap;">${d.score}/10</td>
          </tr></table>
          <div style="margin-top:6px;">${barHtml(d.score * 10, c)}</div>
        </td></tr>`;
    }).join("");

    await resend.emails.send({
      from: "Flow West Films <audit@noreply.flowwestfilms.de>",
      to: notifyTo,
      replyTo: cleanEmail,
      subject: `${fit ? (fit.qualified ? "QUALIFIED · " : "Not a fit yet · ") : ""}Audit lead: ${cleanName} — ${cleanCompany} (${audit.score || "?"})`,
      text: [
        `New audit lead${fit ? (fit.qualified ? " · QUALIFIED" : " · not a fit yet") : ""}`,
        `Name:    ${cleanName}`,
        `Company: ${cleanCompany}`,
        `Phone:   ${cleanPhone || "—"}`,
        `Email:   ${cleanEmail}`,
        `Score:   ${audit.score || "?"}`,
        ...(fit ? [
          `Package: ${fit.tier || "—"}`,
          `Field:   ${FIT_LABELS.industry[fit.industry]}`,
          `Ad spend:${" " + FIT_LABELS.ad_spend[fit.ad_spend]}`,
          `Budget:  ${FIT_LABELS.budget[fit.budget]}`,
          `Newsletter: ${fit.newsletter ? "yes (double opt-in pending)" : "no"}`,
          fit.qualified ? `Qualified: can book directly. Best to call within 5 minutes.` : ``,
        ] : []),
        ``,
        gaps ? `Biggest gaps:\n${gaps.body}` : ``,
      ].join("\n"),
      html: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:28px 0;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0D0D0D;border:1px solid #1E1E1E;border-radius:14px;overflow:hidden;">
          <tr><td style="height:2px;background:linear-gradient(90deg,#FF2D78,#9B30FF);font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr><td style="padding:26px 32px 0;">
            <p style="font-family:${MONO};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#FF2D78;margin:0 0 18px 0;">New audit lead</p>
            <p style="font-family:${SERIF};font-size:34px;line-height:1.05;color:#FFFFFF;margin:0;">${esc(cleanName)}</p>
            <p style="font-family:${SANS};font-size:14px;color:#8a8a8a;margin:6px 0 0 0;">${esc(cleanCompany)}</p>
          </td></tr>

          <tr><td style="padding:22px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #242424;border-radius:10px;">
              <tr><td style="padding:18px 22px;">
                <p style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin:0 0 4px 0;">Overall score</p>
                <p style="font-family:${SERIF};font-size:46px;line-height:1;color:#FFFFFF;margin:0 0 12px 0;">${esc(audit.score || "?")}</p>
                ${barHtml(Number(audit.scorePct) || 0, "#FF2D78")}
              </td></tr>
            </table>
          </td></tr>

          <tr><td style="padding:20px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("Phone", telHref ? `<a href="tel:${esc(telHref)}" style="color:#00C87A;text-decoration:none;font-weight:600;">${esc(cleanPhone)}</a>` : "", "#00C87A")}
              ${row("Email", `<a href="mailto:${esc(cleanEmail)}" style="color:#EDEDED;text-decoration:none;">${esc(cleanEmail)}</a>`)}
              ${fit ? row("Qualified", fit.qualified ? "Yes" : "Not yet", fit.qualified ? "#FF2D78" : null) : ""}
              ${fit ? row("Package", esc(fit.tier || "—")) : ""}
              ${fit ? row("Field", esc(FIT_LABELS.industry[fit.industry])) : ""}
              ${fit ? row("Ad spend", esc(FIT_LABELS.ad_spend[fit.ad_spend])) : ""}
              ${fit ? row("Budget", esc(FIT_LABELS.budget[fit.budget])) : ""}
              ${fit ? row("Newsletter", fit.newsletter ? "Yes (double opt-in pending)" : "No") : ""}
              ${row("Language", audit.lang === "de" ? "German" : "English")}
              ${row("Date", esc(audit.date || ""))}
            </table>
          </td></tr>

          ${dimRows ? `<tr><td style="padding:22px 32px 0;">
            <p style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin:0 0 10px 0;">Dimensions</p>
            <table width="100%" cellpadding="0" cellspacing="0">${dimRows}</table>
          </td></tr>` : ""}

          ${gaps ? `<tr><td style="padding:22px 32px 0;">
            <p style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#FF2D78;margin:0 0 10px 0;">Biggest gaps</p>
            <p style="font-family:${SANS};font-size:14px;line-height:1.7;color:#cfcfcf;margin:0;white-space:pre-wrap;">${esc(gaps.body)}</p>
          </td></tr>` : ""}

          ${overall ? `<tr><td style="padding:22px 32px 0;">
            <p style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin:0 0 10px 0;">Summary</p>
            <p style="font-family:${SANS};font-size:14px;line-height:1.7;color:#cfcfcf;margin:0;">${esc(overall.body)}</p>
          </td></tr>` : ""}

          ${rec ? `<tr><td style="padding:22px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #242424;border-radius:10px;">
              <tr><td style="padding:18px 22px;">
                <p style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5A5A5A;margin:0 0 8px 0;">What we'd recommend</p>
                <p style="font-family:${SERIF};font-size:22px;line-height:1.2;color:#FFFFFF;margin:0 0 8px 0;">${esc(rec.headline)}</p>
                ${rec.body ? `<p style="font-family:${SANS};font-size:14px;line-height:1.65;color:#cfcfcf;margin:0;">${esc(rec.body)}</p>` : ""}
              </td></tr>
            </table>
          </td></tr>` : ""}

          <tr><td style="padding:26px 32px 30px;">
            ${telHref ? `<a href="tel:${esc(telHref)}" style="display:block;text-align:center;background:#0A0A0A;color:#FFFFFF;font-family:${MONO};font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;padding:14px 10px;border:1px solid #00C87A;border-radius:999px;">Call ${esc(cleanName.split(" ")[0] || "them")} now →</a>` : ""}
          </td></tr>
        </table>
      </td></tr>
      </table>`,
    });
  } catch (err) {
    console.error("Notify error:", err?.message || err);
  }

  // ── 3. Mailchimp — ONLY with the newsletter opt-in from the contact step, as
  //    double opt-in (Mailchimp sends the confirmation mail; status_if_new
  //    "pending", existing members keep their status). Best-effort. ─────────
  if (fit && fit.newsletter) try {
    const apiKey = process.env.MAILCHIMP_API_KEY || "";
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID || "";
    const dc = apiKey.split("-").pop(); // e.g. "us1", "eu1"
    const subscriberHash = crypto.createHash("md5").update(cleanEmail).digest("hex");

    const mcRes = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`x:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: cleanEmail,
          status_if_new: "pending",
          // FNAME/PHONE are Mailchimp defaults; COMPANY needs a merge field with
          // tag COMPANY in the audience (otherwise Mailchimp ignores/rejects it —
          // which is fine, the audit email has already sent by this point).
          merge_fields: {
            FNAME: cleanName,
            COMPANY: cleanCompany,
            ...(cleanPhone ? { PHONE: cleanPhone } : {}),
          },
        }),
      }
    );

    if (!mcRes.ok) {
      console.error("Mailchimp error:", mcRes.status);
    } else {
      await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${Buffer.from(`x:${apiKey}`).toString("base64")}` },
        body: JSON.stringify({ tags: [
          { name: "website-audit", status: "active" },
          { name: `bereich-${fit.industry}`, status: "active" },
          { name: fit.qualified ? "qualifiziert" : "spaeter", status: "active" },
        ] }),
      }).catch(() => {});
    }
  } catch (err) {
    console.error("Mailchimp error:", err?.message || err);
  }

  // ── 4. Meta Conversions API: QualifiedLead (best-effort). Only for qualified
  //    leads, only with the visitor's cookie consent, only if META_ACCESS_TOKEN
  //    is set for this project. Email/phone go to Meta as SHA-256 hashes only.
  //    Same event_id as the browser pixel, so Meta counts it once. ───────────
  const metaToken = process.env.META_ACCESS_TOKEN;
  if (metaToken && fit && fit.qualified && fit.consent && fit.eventId && process.env.VERCEL_ENV === "production") {
    try {
      const sha = (v) => crypto.createHash("sha256").update(v).digest("hex");
      let ph = cleanPhone.replace(/\D/g, "").replace(/^00/, "");
      if (ph.startsWith("0")) ph = "49" + ph.slice(1);
      const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
      const pixel = process.env.META_PIXEL_ID || "3457088161112221";
      const r = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(metaToken)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [{
          event_name: "QualifiedLead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: fit.eventId,
          action_source: "website",
          event_source_url: fit.page,
          user_data: {
            em: [sha(cleanEmail)],
            ...(ph.length >= 8 ? { ph: [sha(ph)] } : {}),
            ...(ip ? { client_ip_address: ip } : {}),
            ...(req.headers["user-agent"] ? { client_user_agent: String(req.headers["user-agent"]) } : {}),
          },
          custom_data: { source: "website-audit", industry: fit.industry },
        }] }),
      });
      if (!r.ok) console.error("Meta CAPI error:", r.status);
    } catch (err) {
      console.error("Meta CAPI error:", err?.message || err);
    }
  }

  return res.status(200).json({ ok: true });
};
