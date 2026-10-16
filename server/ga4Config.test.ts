import { describe, expect, it } from "vitest";

describe("GA4 configuration", () => {
  it("accepts the configured measurement ID and reaches the gtag endpoint", async () => {
    const measurementId = process.env.VITE_GA4_MEASUREMENT_ID;
    const internalTrafficIp = process.env.GA4_INTERNAL_TRAFFIC_IP;

    expect(measurementId).toMatch(/^G-[A-Z0-9]+$/);
    expect(internalTrafficIp).toMatch(/^(?:\d{1,3}\.){3}\d{1,3}$/);

    const response = await fetch(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId!)}`,
      { method: "GET", signal: AbortSignal.timeout(10_000) },
    );

    expect(response.ok).toBe(true);
    expect(response.headers.get("content-type") ?? "").toContain("javascript");
  }, 15_000);
});
