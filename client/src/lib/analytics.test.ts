import { describe, expect, it } from "vitest";
import { isGaDebugRequested, pageSlug } from "./analytics";

describe("analytics helpers", () => {
  it("normalizes page slugs without exposing query strings", () => {
    expect(pageSlug("/blog/example")).toBe("blog/example");
    expect(pageSlug("/")).toBe("home");
  });

  it("keeps the requested GA4 event contract explicit", async () => {
    const source = await import("fs").then(fs => fs.readFileSync(new URL("./analytics.ts", import.meta.url), "utf8"));
    expect(source).toContain('"property_link_click"');
    expect(source).toContain('"enquiry_submit"');
    expect(source).toContain('"tool_use"');
    expect(source).toContain('"flight_widget_click"');
    expect(source).toContain('"outbound_affiliate_click"');
  });

  it("keeps the debug switch query-driven and session-only", async () => {
    const source = await import("fs").then(fs => fs.readFileSync(new URL("./analytics.ts", import.meta.url), "utf8"));
    expect(source).toContain("ga_debug");
    expect(source).toContain("debug_mode: true");
    expect(source).not.toContain("localStorage");
    expect(isGaDebugRequested()).toBe(false);
  });
});
