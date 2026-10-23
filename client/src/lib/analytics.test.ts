import { describe, expect, it } from "vitest";
import { installAnalyticsDelegation, isGaDebugRequested, pageSlug } from "./analytics";

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

  it("emits property_link_click with the partner when a property CTA is clicked", () => {
    const events: unknown[][] = [];
    const listeners = new Map<string, EventListener>();
    const propertyLink = {
      href: "https://www.stay22.com/allez/booking",
      getAttribute: (name: string) => ({
        "data-property-name": "Hakuba Alpine Hotel",
        "data-affiliate-partner": "stay22",
      } as Record<string, string>)[name] ?? null,
      closest: (selector: string) => selector === "[data-flight-widget]" ? null : propertyLink,
    } as unknown as HTMLElement;
    const previousWindow = globalThis.window;
    const previousDocument = globalThis.document;
    globalThis.window = {
      __stayWanderAnalyticsConsent: "granted",
      location: { pathname: "/blog/ski-in-ski-out-hotels-2026-2027" },
      gtag: (...args: unknown[]) => events.push(args),
    } as unknown as Window & typeof globalThis;
    globalThis.document = {
      documentElement: { dataset: {} },
      addEventListener: (type: string, listener: EventListener) => listeners.set(type, listener),
      removeEventListener: () => undefined,
    } as unknown as Document;

    try {
      const cleanup = installAnalyticsDelegation();
      listeners.get("click")?.({ target: propertyLink } as unknown as MouseEvent);
      expect(events.some(([kind, name, params]) => kind === "event" && name === "property_link_click" && (params as Record<string, string>).partner === "stay22" && (params as Record<string, string>).property_name === "Hakuba Alpine Hotel")).toBe(true);
      cleanup();
    } finally {
      globalThis.window = previousWindow;
      globalThis.document = previousDocument;
    }
  });
});
