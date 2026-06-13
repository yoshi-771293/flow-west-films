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

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(audit) {
  const { clientName = "Your Business", date = "", score = "", sections = [] } = audit;

  const sectionRows = sections.map((s) => `
    <tr>
      <td style="padding:20px 0;border-bottom:1px solid #1f1f1f;">
        <p style="font-family:system-ui,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin:0 0 8px 0;">${esc(s.title)}</p>
        <p style="font-family:system-ui,sans-serif;font-size:15px;color:#FFFFFF;margin:0;line-height:1.65;">${esc(s.body).replace(/\n/g, "<br>")}</p>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your audit is ready — Flow West Films</title></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:system-ui,sans-serif;color:#FFFFFF;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 0;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0A0A0A;border:1px solid #1f1f1f;border-radius:12px;overflow:hidden;">

      <!-- signature gradient line -->
      <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#FF2D78 45%,#9B30FF 75%,transparent);font-size:0;line-height:0;">&nbsp;</td></tr>

      <!-- header -->
      <tr><td style="padding:32px 36px 20px;">
        <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin:0 0 20px 0;">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#00FF88;vertical-align:middle;margin-right:7px;"></span>
          Audit complete
        </p>
        <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:40px;font-weight:400;line-height:1.02;letter-spacing:-0.02em;color:#FFFFFF;margin:0 0 14px 0;">
          Your audit is <em style="font-style:italic;color:#FF2D78;">ready</em>.
        </h1>
        <p style="font-family:system-ui,sans-serif;font-size:14px;color:#8A8A8A;margin:0;">
          Prepared for <strong style="color:#FFFFFF;font-weight:500;">${esc(clientName)}</strong>${date ? " &nbsp;·&nbsp; " + esc(date) : ""}
        </p>
      </td></tr>

      <!-- score card -->
      <tr><td style="padding:0 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#181818;border:1px solid #2a2a2a;border-radius:8px;">
          <tr><td style="padding:18px 22px;">
            <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5A5A5A;margin:0 0 6px 0;">Overall Score</p>
            <p style="font-family:Georgia,serif;font-size:30px;font-weight:400;color:#FFFFFF;margin:0;">${esc(score)}</p>
          </td></tr>
        </table>
      </td></tr>

      <!-- sections -->
      <tr><td style="padding:0 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${sectionRows}
        </table>
      </td></tr>

      <!-- footer -->
      <tr><td style="padding:24px 36px 32px;border-top:1px solid #1a1a1a;margin-top:8px;">
        <p style="font-family:monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5A5A5A;margin:0;">
          No spam. Just the audit. &nbsp;·&nbsp; flowwestfilms.de
        </p>
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

  const { email, audit } = req.body || {};

  if (!email || !isValidEmail(email) || !audit || typeof audit !== "object") {
    return res.status(400).json({ error: "Invalid request: bad email or missing audit" });
  }

  const cleanEmail = email.trim().toLowerCase();

  // ── 1. Send via Resend ──────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "Flow West Films <audit@noreply.flowwestfilms.de>",
      to: cleanEmail,
      subject: "Your audit is ready",
      html: buildEmailHtml(audit),
    });
  } catch (err) {
    console.error("Resend error:", err?.message || err);
    return res.status(500).json({ error: "Failed to send email" });
  }

  // ── 2. Upsert to Mailchimp (best-effort — never blocks the response) ────────
  try {
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
          status_if_new: "subscribed",
          status: "subscribed",
          merge_fields: audit.clientName ? { FNAME: String(audit.clientName).slice(0, 255) } : {},
        }),
      }
    );

    if (!mcRes.ok) {
      console.error("Mailchimp error:", mcRes.status, await mcRes.text());
    }
  } catch (err) {
    console.error("Mailchimp error:", err?.message || err);
  }

  return res.status(200).json({ ok: true });
};
