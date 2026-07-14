import { describe, it, expect } from "vitest";

/**
 * Test to validate Travelpayout API credentials
 * This test fetches real flight deals from Travelpayout to verify the API token works
 */
describe("Travelpayout API Integration", () => {
  it("should fetch flight deals with valid API token", async () => {
    const affiliateId = process.env.TRAVELPAYOUT_AFFILIATE_ID;
    const apiToken = process.env.TRAVELPAYOUT_API_TOKEN;

    // Check if credentials are set
    expect(affiliateId).toBeDefined();
    expect(apiToken).toBeDefined();

    if (!apiToken) {
      throw new Error("TRAVELPAYOUT_API_TOKEN not set");
    }

    // Test API call to Travelpayout
    const url = new URL("https://api.travelpayouts.com/v2/prices/latest");
    url.searchParams.set("origin", "LHR"); // London
    url.searchParams.set("destination", "NRT"); // Tokyo
    url.searchParams.set("depart_date", "2026-08-01");
    url.searchParams.set("token", apiToken);

    const response = await fetch(url.toString());

    // Verify response is successful
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      data?: Array<{
        origin: string;
        destination: string;
        price: number;
        airline: string;
        search_key: string;
      }>;
    };

    // Verify we got flight data back
    expect(data).toBeDefined();
    expect(Array.isArray(data.data) || data.data === undefined).toBe(true);

    console.log("✅ Travelpayout API credentials are valid!");
    if (data.data && data.data.length > 0) {
      console.log(`Found ${data.data.length} flight deals`);
      console.log("Sample deal:", data.data[0]);
    }
  });

  it("should have affiliate ID configured", () => {
    const affiliateId = process.env.TRAVELPAYOUT_AFFILIATE_ID;
    expect(affiliateId).toBe("745048");
    console.log(`✅ Affiliate ID configured: ${affiliateId}`);
  });
});
