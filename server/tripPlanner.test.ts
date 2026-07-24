import { describe, expect, it } from "vitest";
import { generateTripItineraryPdf } from "./generateTripItineraryPdf";
import {
  buildConciergeRevisionPrompt,
  buildFreePreviewPrompt,
  buildPaidItineraryPrompt,
  type TripPlannerInput,
} from "./tripPlannerPrompts";
import { tierSupportsTripLength } from "./stripe";
import { canRequestConciergeRevision } from "../client/src/lib/conciergeRevision";

const input: TripPlannerInput = {
  destination: "Lisbon, Portugal",
  tripLength: 7,
  travelDates: "April 2027",
  interests: ["food", "culture", "beaches"],
  budgetLevel: "Mid-range",
  travelStyle: "Couple",
  pace: "Balanced",
};

describe("trip-planner prompt templates", () => {
  it("keeps the supplied Free Preview instruction and substitutes only its placeholders", () => {
    const prompt = buildFreePreviewPrompt(input);
    expect(prompt).toContain("Generate ONLY Day 1 of a trip itinerary.");
    expect(prompt).toContain("Destination: Lisbon, Portugal");
    expect(prompt).toContain("Trip length (for context only — do not generate beyond Day 1): 7 days");
    expect(prompt).toContain("This is just Day 1 of your 7-day adventure");
    expect(prompt).not.toContain("{{destination}}");
  });

  it("preserves Premium location-line instructions and Concierge personal touches", () => {
    const premium = buildPaidItineraryPrompt("premium", input);
    const concierge = buildPaidItineraryPrompt("concierge", input);
    expect(premium).toContain('"LOCATION: [name], [neighborhood/area]"');
    expect(premium).toContain("do not generate the map itself");
    expect(concierge).toContain('[Use the full Premium tier prompt above, plus:]');
    expect(concierge).toContain('"Personal Touches" section');
  });

  it("preserves the Concierge revision constraint", () => {
    const revision = buildConciergeRevisionPrompt("## Day 1 — Arrival", "Swap the dinner recommendation.");
    expect(revision).toContain("Do not regenerate parts of the itinerary that were not");
    expect(revision).toContain("Swap the dinner recommendation.");
  });
});

describe("trip-planner tier eligibility", () => {
  it("only exposes a tier for its intended trip duration", () => {
    expect(tierSupportsTripLength("basic", 2)).toBe(true);
    expect(tierSupportsTripLength("basic", 5)).toBe(false);
    expect(tierSupportsTripLength("standard", 5)).toBe(true);
    expect(tierSupportsTripLength("premium", 7)).toBe(true);
    expect(tierSupportsTripLength("premium", 6)).toBe(false);
    expect(tierSupportsTripLength("concierge", 10)).toBe(true);
  });
});

describe("Concierge revision visibility", () => {
  it("hides the one-time feedback form after a Concierge revision has been consumed, including on a later revisit", () => {
    expect(canRequestConciergeRevision({ tier: "concierge", conciergeRevisionAvailable: true, revisionComplete: false })).toBe(true);
    expect(canRequestConciergeRevision({ tier: "concierge", conciergeRevisionAvailable: false, revisionComplete: false })).toBe(false);
    expect(canRequestConciergeRevision({ tier: "concierge", conciergeRevisionAvailable: true, revisionComplete: true })).toBe(false);
  });
});

describe("branded itinerary PDF", () => {
  it("renders a non-empty PDF document from an itinerary", async () => {
    const pdf = await generateTripItineraryPdf({
      input,
      tier: "premium",
      itinerary: "## Day 1 — A gentle arrival\n\nMorning: Settle into the city.\n\n- Visit a neighborhood market.\n\nPractical tip: Keep the first afternoon flexible.",
    });
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(pdf.length).toBeGreaterThan(1_000);
  });

  it("sanitizes unsupported emoji in generated itinerary text before PDF rendering", async () => {
    const pdf = await generateTripItineraryPdf({
      input,
      tier: "standard",
      itinerary: "## Day 1 — Arrival 🧳\n\nMorning: Walk to the waterfront ⛵ and pause for coffee.",
    });

    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(pdf.length).toBeGreaterThan(1_000);
  });
});
