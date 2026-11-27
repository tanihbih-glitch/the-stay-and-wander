export type TripPlanningChatEnquiry = {
  name: string;
  email: string;
  destination: string;
  approximateDates: string;
  budgetBand: string;
  interests?: string[];
  message?: string;
  source?: string;
};

const TRIP_PLANNING_CHAT_INBOX = "thestayandwander@thestayandwander.com";

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
  return `<tr><td style="padding:8px 12px 8px 0;color:#5e6c77;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0D1B2A;">${escapeHtml(value || "Not provided")}</td></tr>`;
}

export function buildTripPlanningChatNotification(enquiry: TripPlanningChatEnquiry) {
  return {
    to: [TRIP_PLANNING_CHAT_INBOX],
    reply_to: enquiry.email,
    subject: `Free trip-planning chat request — ${enquiry.destination}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0D1B2A;">
        <p style="color:#0077B6;font-size:12px;font-weight:700;letter-spacing:1.5px;">THE STAY &amp; WANDER · TRIP PLANNING</p>
        <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 18px;">New free 15-minute chat request</h1>
        <p style="line-height:1.6;">A traveller has asked for a no-obligation planning chat. Reply directly to this email to follow up.</p>
        <table style="border-collapse:collapse;width:100%;margin:22px 0;background:#F8EFE0;border-radius:8px;padding:14px;">
          ${formatRow("Name", enquiry.name)}
          ${formatRow("Email", enquiry.email)}
          ${formatRow("Destination", enquiry.destination)}
          ${formatRow("Approximate dates", enquiry.approximateDates)}
          ${formatRow("Budget band", enquiry.budgetBand)}
          ${formatRow("Primary interests", enquiry.interests?.join(", ") || "Not provided")}
          ${formatRow("Source", enquiry.source || "Direct")}
          ${formatRow("Message", enquiry.message || "None provided")}
        </table>
      </div>
    `,
  };
}

async function sendResendEmail(payload: { to: string[]; subject: string; html: string; reply_to?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.info("[Trip Planning Chat] Email delivery skipped because Resend credentials are not configured.");
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
    throw new Error(`Resend trip-planning chat email failed (${response.status}): ${detail}`);
  }

  return { sent: true as const };
}

export async function sendTripPlanningChatEmail(enquiry: TripPlanningChatEnquiry) {
  const result = await sendResendEmail(buildTripPlanningChatNotification(enquiry));
  return { delivered: result.sent } as const;
}
