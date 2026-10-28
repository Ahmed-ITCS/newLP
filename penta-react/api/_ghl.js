const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

async function ghlFetch(path, token, options = {}) {
  const response = await fetch(`${GHL_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(10000),
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return { ok: response.ok, status: response.status, data };
}

async function createContact({ name, email, phone, message, source }) {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    return { ok: false, reason: "not-configured" };
  }

  const { firstName, lastName } = splitName(name);

  const upsert = await ghlFetch("/contacts/upsert", token, {
    method: "POST",
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      name,
      email,
      phone: phone || undefined,
      source: source || "Website Contact Form",
      tags: ["website-lead"],
    }),
  });

  if (!upsert.ok) {
    console.error("GHL contact upsert failed", upsert.status, upsert.data);
    return { ok: false, reason: "upsert-failed", status: upsert.status };
  }

  const contactId = upsert.data?.contact?.id;

  if (!contactId) {
    console.error("GHL contact upsert returned no contact id", upsert.data);
    return { ok: false, reason: "no-contact-id" };
  }

  return { ok: true, contactId, via: "api" };
}

async function addNote(contactId, message) {
  const token = process.env.GHL_API_TOKEN;

  if (!token || !contactId || !message) {
    return;
  }

  const note = await ghlFetch(`/contacts/${contactId}/notes`, token, {
    method: "POST",
    body: JSON.stringify({ body: message }),
  });

  if (!note.ok) {
    console.error("GHL note failed", note.status, note.data);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let alertContactId = null;

async function getAlertContactId(token, locationId, notifyEmail) {
  if (alertContactId) {
    return alertContactId;
  }

  const upsert = await ghlFetch("/contacts/upsert", token, {
    method: "POST",
    body: JSON.stringify({
      locationId,
      firstName: "Penta Cipher",
      lastName: "Lead Alerts",
      name: "Penta Cipher Lead Alerts",
      email: notifyEmail,
      source: "Internal",
      tags: ["internal-alerts"],
    }),
  });

  if (!upsert.ok) {
    console.error("GHL alert contact failed", upsert.status, upsert.data);
    return null;
  }

  alertContactId = upsert.data?.contact?.id || null;

  return alertContactId;
}

async function notifyOwner(lead) {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const notifyEmail = process.env.GHL_NOTIFY_EMAIL;

  if (!token || !locationId || !notifyEmail) {
    return;
  }

  const contactId = await getAlertContactId(token, locationId, notifyEmail);

  if (!contactId) {
    return;
  }

  const html = `
    <h2>New website lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(
      lead.message || "",
    )}</pre>
  `;

  const result = await ghlFetch("/conversations/messages", token, {
    method: "POST",
    body: JSON.stringify({
      type: "Email",
      contactId,
      emailTo: notifyEmail,
      subject: `New website lead: ${lead.name}`,
      html,
    }),
  });

  if (!result.ok) {
    console.error("GHL owner notification failed", result.status, result.data);
  }
}

async function sendToWebhook({ name, email, phone, message, source }) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false, reason: "not-configured" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message, source }),
    signal: AbortSignal.timeout(10000),
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    console.error("GHL webhook returned HTTP", response.status);
    return { ok: false, reason: "webhook-failed", status: response.status };
  }

  const status = String(data?.status || "");

  if (/test request received/i.test(status) || !data?.id) {
    console.error(
      "GHL webhook did not deliver the lead (trigger is in test mode or not mapped)",
    );
    return { ok: false, reason: "webhook-not-live", status: response.status };
  }

  return { ok: true, via: "webhook" };
}

async function submitLead(lead) {
  const source = lead.source || "Website Contact Form";

  const apiResult = await createContact({ ...lead, source });

  if (apiResult.ok) {
    await Promise.allSettled([
      addNote(apiResult.contactId, lead.message),
      notifyOwner(lead),
    ]);

    return apiResult;
  }

  if (apiResult.reason !== "not-configured") {
    console.error("GHL API failed, trying webhook fallback");
  }

  const webhookResult = await sendToWebhook({ ...lead, source });

  if (webhookResult.ok) {
    return webhookResult;
  }

  return { ok: false };
}

export { submitLead };
