import { describe, expect, it } from "vitest";
import { registerAnalyticsConfigRoute } from "./analyticsConfig";

describe("analytics config", () => {
  it("returns an internal marker without revealing the configured IP", () => {
    process.env.GA4_INTERNAL_TRAFFIC_IP = "203.0.113.10";
    let handler: ((req: any, res: any) => void) | undefined;
    const app = { get: (_path: string, callback: (req: any, res: any) => void) => { handler = callback; } } as any;
    registerAnalyticsConfigRoute(app);

    let body = "";
    const response = {
      setHeader: () => undefined,
      json: (value: unknown) => { body = JSON.stringify(value); },
    };
    handler?.({ ip: "203.0.113.10", socket: { remoteAddress: "203.0.113.10" } }, response);
    expect(body).toBe(JSON.stringify({ isInternal: true }));
    expect(body).not.toContain("203.0.113.10");
  });
});
