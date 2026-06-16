const crypto = require("crypto");

const LIBRARY_ID = "684848";

module.exports = function handler(req, res) {
  const guid = req.query.guid;
  if (!guid || !/^[0-9a-f-]{36}$/.test(guid)) {
    return res.status(400).json({ error: "Invalid guid" });
  }

  const key = process.env.BUNNY_TOKEN_KEY;
  if (!key) return res.status(500).json({ error: "Not configured" });

  // Token valid for 6 hours
  const expires = Math.floor(Date.now() / 1000) + 6 * 3600;

  // Bunny embed token: SHA256(key + videoGuid + expires)
  const token = crypto
    .createHash("sha256")
    .update(key + guid + expires)
    .digest("hex");

  const url =
    `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${guid}` +
    `?token=${token}&expires=${expires}` +
    `&autoplay=true&loop=false&muted=true&preload=true&responsive=true`;

  res.setHeader("Cache-Control", "no-store");
  res.json({ url });
};
