type ItineraryEmailOptions = {
  recipient: string;
  destination: string;
  tier: string;
  downloadPath: string;
};

const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || "https://thestayandwander.com").replace(/\/$/, "");

export async function sendItineraryDeliveryEmail(options: ItineraryEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.info("[Trip Planner] Itinerary email skipped because Resend credentials are not configured.");
    return { sent: false, reason: "not_configured" as const };
  }

  const downloadUrl = options.downloadPath.startsWith("http")
    ? options.downloadPath
    : `${PUBLIC_SITE_URL}${options.downloadPath}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [options.recipient],
      subject: `Your ${options.destination} itinerary is ready`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #17364a; max-width: 560px; margin: 0 auto;">
          <p style="color: #b58a34; font-size: 12px; font-weight: 700; letter-spacing: 1px;">THE STAY &amp; WANDER</p>
          <h1 style="font-family: Georgia, serif; font-size: 28px; margin: 0 0 16px;">Your itinerary is ready.</h1>
          <p>Your ${options.tier} itinerary for <strong>${options.destination}</strong> has been created and is ready to download.</p>
          <p style="margin: 28px 0;"><a href="${downloadUrl}" style="background: #17364a; color: #fff; padding: 13px 20px; border-radius: 6px; text-decoration: none; font-weight: 700;">Download your PDF itinerary</a></p>
          <p style="font-size: 13px; color: #647177;">Keep this message handy for your trip. Safe travels.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`Resend itinerary email failed (${response.status}): ${detail}`);
  }

  return { sent: true };
}
