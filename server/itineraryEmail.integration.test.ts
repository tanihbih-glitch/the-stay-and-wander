import { describe, expect, it } from "vitest";

describe("Resend itinerary delivery credentials", () => {
  it("authenticates against the lightweight domains endpoint", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be configured").toBeTruthy();

    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.ok, `Resend domains validation failed with HTTP ${response.status}`).toBe(true);
    const payload = (await response.json()) as { data?: Array<{ name?: string; status?: string }> };
    const senderDomain = process.env.RESEND_FROM_EMAIL?.split("@")[1]?.toLowerCase();
    expect(senderDomain, "RESEND_FROM_EMAIL must contain a sender domain").toBeTruthy();
    const configuredDomain = payload.data?.find(domain => domain.name?.toLowerCase() === senderDomain);
    expect(configuredDomain?.status, `The sender domain ${senderDomain} must be verified in Resend`).toBe("verified");
  }, 15_000);
});
