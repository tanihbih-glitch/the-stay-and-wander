import { describe, expect, it } from "vitest";

describe("Mailchimp server credentials", () => {
  it("authenticates against the Mailchimp API without exposing secret values", async () => {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = (process.env.MAILCHIMP_SERVER_PREFIX ?? "")
      .replace(/^https?:\/\//, "")
      .split(".")[0]
      .replace(/\/$/, "");
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    expect(apiKey).toBeTruthy();
    expect(serverPrefix).toMatch(/^[a-z0-9-]+$/);
    expect(audienceId).toMatch(/^[a-zA-Z0-9_-]+$/);

    const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`manus:${apiKey}`).toString("base64")}`,
        Accept: "application/json",
      },
    });

    expect(response.status).toBe(200);
    const body = (await response.json()) as { account_name?: string; _links?: unknown };
    expect(body.account_name || body._links).toBeTruthy();
  }, 20_000);
});
