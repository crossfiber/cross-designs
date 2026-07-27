// Fires automatically on every verified Netlify Forms submission.
// Pushes the lead into Brevo: contact (with attributes) + list + deal in "New".
// Requires BREVO_API_KEY set in Netlify environment variables.

const BREVO = "https://api.brevo.com/v3";
const PIPELINE_ID = "6a63aed48ce74042c9b6e6c8";
const STAGE_NEW = "5e0d71a0eeae40268c09091ed5663801";
const LIST_WEBSITE_LEADS = 5;
const LIST_FREE_REVIEW = 6;

exports.handler = async function (event) {
  const key = process.env.BREVO_API_KEY || process.env.Brevo_API_Key || process.env.brevo_api_key;
  if (!key) {
    console.error("BREVO_API_KEY not set");
    return { statusCode: 200, body: "skipped" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (e) {
    console.error("bad payload", e);
    return { statusCode: 200, body: "skipped" };
  }

  const data = payload.data || {};
  const form = payload.form_name || data["form-name"] || "contact";
  const email = (data.email || "").trim().toLowerCase();
  if (!email || data.company) {
    // no email or honeypot tripped
    return { statusCode: 200, body: "skipped" };
  }

  const headers = {
    "api-key": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const attributes = {};
  if (data.name) attributes.FIRSTNAME = data.name.trim();
  if (data.city) attributes.CITY = data.city.trim();
  if (data.phone) attributes.PHONE_TEXT = data.phone.trim();
  if (data.website) attributes.WEBSITE_URL = data.website.trim();
  if (data.ptype) attributes.LEAD_TYPE = data.ptype.trim();
  if (data.message) attributes.MESSAGE = data.message.trim().slice(0, 500);
  attributes.SOURCE = (data.source || form).trim();

  const listId = form === "website-review" ? LIST_FREE_REVIEW : LIST_WEBSITE_LEADS;

  try {
    // 1. upsert contact
    const up = await fetch(BREVO + "/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({ email, attributes, listIds: [listId], updateEnabled: true }),
    });
    if (!up.ok && up.status !== 204) {
      console.error("contact upsert failed", up.status, await up.text());
      return { statusCode: 200, body: "contact failed" };
    }

    // 2. fetch contact id
    const got = await fetch(BREVO + "/contacts/" + encodeURIComponent(email), { headers });
    const contact = got.ok ? await got.json() : null;

    // 3. create deal in "New" (skip duplicates: one open deal per email is fine to dedupe by name)
    const who = data.name ? data.name.trim() : email;
    const dealName =
      who + " - " + (form === "website-review" ? "free review" : "project inquiry");
    const deal = await fetch(BREVO + "/crm/deals", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: dealName,
        attributes: {
          pipeline: PIPELINE_ID,
          deal_stage: STAGE_NEW,
        },
        linkedContactsIds: contact && contact.id ? [contact.id] : [],
      }),
    });
    if (!deal.ok) {
      console.error("deal create failed", deal.status, await deal.text());
    }
  } catch (e) {
    console.error("brevo error", e);
  }

  // Always 200 so Netlify never retries into duplicates
  return { statusCode: 200, body: "ok" };
};
