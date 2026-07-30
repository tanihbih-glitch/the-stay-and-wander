export type CorporateTravelEnquiry = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  travellerCount: string;
  eventName: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  additionalRequirements?: string;
};

const CORPORATE_TRAVEL_INBOX = "thestayandwander@thestayandwander.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

function formatRow(label: string, value: string) {
  return `<tr><td style="padding:8px 12px 8px 0;color:#5e6c77;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0D1B2A;">${escapeHtml(value)}</td></tr>`;
}

export function buildCorporateTravelNotification(enquiry: CorporateTravelEnquiry) {
  const dates = `${enquiry.startDate} to ${enquiry.endDate}`;
  return {
    to: [CORPORATE_TRAVEL_INBOX],
    reply_to: enquiry.email,
    subject: `Corporate travel enquiry — ${enquiry.companyName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0D1B2A;">
        <p style="color:#0077B6;font-size:12px;font-weight:700;letter-spacing:1.5px;">THE STAY &amp; WANDER · CORPORATE TRAVEL</p>
        <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 18px;">New corporate travel request</h1>
        <p style="line-height:1.6;">A new proposal request has been submitted. Reply directly to this email to contact the traveller.</p>
        <table style="border-collapse:collapse;width:100%;margin:22px 0;background:#F8EFE0;border-radius:8px;padding:14px;">
          ${formatRow("Full name", enquiry.fullName)}
          ${formatRow("Company", enquiry.companyName)}
          ${formatRow("Email", enquiry.email)}
          ${formatRow("Phone", enquiry.phone)}
          ${formatRow("Country", enquiry.country)}
          ${formatRow("Travellers", enquiry.travellerCount)}
          ${formatRow("Event", enquiry.eventName)}
          ${formatRow("Destination", enquiry.destination)}
          ${formatRow("Travel dates", dates)}
          ${formatRow("Budget per person", enquiry.budget)}
          ${formatRow("Additional requirements", enquiry.additionalRequirements || "None provided")}
        </table>
      </div>
    `,
  };
}

export function buildCorporateTravelAutoReply(enquiry: CorporateTravelEnquiry) {
  return {
    to: [enquiry.email],
    subject: "We received your corporate travel request | The Stay & Wander",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;color:#0D1B2A;">
        <p style="color:#0077B6;font-size:12px;font-weight:700;letter-spacing:1.5px;">THE STAY &amp; WANDER · CORPORATE TRAVEL</p>
        <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 18px;">Thank you, ${escapeHtml(enquiry.fullName)}.</h1>
        <p style="line-height:1.65;">We have received your corporate travel request for ${escapeHtml(enquiry.destination)}. We will send your personalised corporate travel proposal within 24 hours.</p>
        <p style="line-height:1.65;">Our team will review your group size, dates, event needs, and travel preferences before preparing recommended hotels, flights, transfers, and itinerary options.</p>
        <p style="margin:26px 0 0;font-weight:700;">— The Stay &amp; Wander Team</p>
      </div>
    `,
  };
}

async function sendResendEmail(payload: { to: string[]; subject: string; html: string; reply_to?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.info("[Corporate Travel] Email delivery skipped because Resend credentials are not configured.");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, ...payload }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`Resend corporate travel email failed (${response.status}): ${detail}`);
  }

  return { sent: true as const };
}

export async function sendCorporateTravelEmails(enquiry: CorporateTravelEnquiry) {
  const notification = await sendResendEmail(buildCorporateTravelNotification(enquiry));
  if (!notification.sent) return { delivered: false as const, autoReplySent: false as const };

  try {
    const autoReply = await sendResendEmail(buildCorporateTravelAutoReply(enquiry));
    return { delivered: true as const, autoReplySent: autoReply.sent };
  } catch (error) {
    console.error("[Corporate Travel] Auto-reply delivery failed after the owner notification was sent", error);
    return { delivered: true as const, autoReplySent: false as const };
  }
}
