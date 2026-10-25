import { submitLead } from "./_ghl.js";

const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS || ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Allow only your configured website origins.
  const origin = req.headers.origin;

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  const {
    name,
    email,
    phone = "",
    message = "",
    website = "",
  } = req.body || {};

  // Honeypot: silently accept bot submissions without forwarding.
  if (typeof website === "string" && website.trim()) {
    return res.status(200).json({ success: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({
      error: "Invalid form data",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanMessage = message.trim();

  if (
    !cleanName ||
    cleanName.length > 120 ||
    cleanEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanPhone.length > 40 ||
    cleanMessage.length > 5000
  ) {
    return res.status(400).json({
      error: "Please check your form details",
    });
  }

  try {
    const result = await submitLead({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      source: "pentacipher.com",
    });

    if (!result.ok) {
      return res.status(502).json({
        error: "Contact service temporarily unavailable",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Lead submission failed");

    return res.status(502).json({
      error: "Contact service temporarily unavailable",
    });
  }
};
