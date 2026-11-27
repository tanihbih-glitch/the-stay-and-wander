import { describe, expect, it } from "vitest";
import { buildTripPlanningChatNotification } from "./tripPlanningChatEmail";
import { sitemapRoutes } from "../shared/publicRoutes";
import fs from "node:fs";

const pageSource = fs.readFileSync(new URL("../client/src/pages/TripPlanner.tsx", import.meta.url), "utf8");
const analyticsSource = fs.readFileSync(new URL("../client/src/lib/analytics.ts", import.meta.url), "utf8");
const routerSource = fs.readFileSync(new URL("./routers/tripPlanningChat.ts", import.meta.url), "utf8");

describe("free trip-planning chat request", () => {
  it("keeps the requested fields, unticked consent, privacy link, source field and enquiry marker in the page", () => {
    expect(pageSource).toContain('data-enquiry-form="trip_planning_chat"');
    expect(pageSource).toContain('name="name"');
    expect(pageSource).toContain('name="email"');
    expect(pageSource).toContain('name="destination"');
    expect(pageSource).toContain('name="approximateDates"');
    expect(pageSource).toContain('name="budgetBand"');
    expect(pageSource).toContain('name="message"');
    expect(pageSource).toContain('name="consent" type="checkbox" required');
    expect(pageSource).toContain('href="/privacy-policy"');
    expect(pageSource).toContain('name="source"');
    expect(pageSource).toContain('utm_source');
    expect(pageSource).toContain("Free 15-minute trip-planning chat");
    expect(pageSource).toContain("Limited places available each month");
    expect(pageSource).toContain("No obligation");
  });

  it("passes only the source attribution alongside the form name to enquiry_submit", () => {
    expect(analyticsSource).toContain('form.elements.namedItem("source")');
    expect(analyticsSource).toContain('form_name: form.getAttribute("data-enquiry-form")');
    expect(analyticsSource).not.toContain('formData.get("email")');
    expect(analyticsSource).not.toContain('formData.get("message")');
  });

  it("uses the owner inbox delivery path and escapes all submitted values", () => {
    const payload = buildTripPlanningChatNotification({
      name: "A <traveller>",
      email: "traveller@example.com",
      destination: "Bali",
      approximateDates: "October 2027",
      budgetBand: "Not sure",
      message: "Please help with a relaxed route.",
      source: "pinterest",
    });
    expect(payload.to).toEqual(["thestayandwander@thestayandwander.com"]);
    expect(payload.reply_to).toBe("traveller@example.com");
    expect(payload.html).toContain("A &lt;traveller&gt;");
    expect(payload.html).toContain("pinterest");
    expect(routerSource).toContain("consent: z.literal(true");
    expect(routerSource).toContain("sendTripPlanningChatEmail");
    expect(routerSource).not.toContain("db.");
  });

  it("keeps the canonical trip-planner route in the sitemap registry", () => {
    expect(sitemapRoutes.some(route => route.path === "/trip-planner")).toBe(true);
  });
});
