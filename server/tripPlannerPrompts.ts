export const TRIP_PLANNER_TIERS = ["basic", "standard", "premium", "concierge"] as const;

export type TripPlannerTier = (typeof TRIP_PLANNER_TIERS)[number];

export type TripPlannerInput = {
  destination: string;
  tripLength: number;
  travelDates?: string | null;
  interests: string[];
  budgetLevel: "Budget" | "Mid-range" | "Luxury";
  travelStyle: string;
  pace: "Relaxed" | "Balanced" | "Packed";
};

export const TRIP_PLANNER_TIER_CONFIG: Record<
  TripPlannerTier,
  { label: string; priceCents: number; description: string; dayRange: string }
> = {
  basic: {
    label: "Basic",
    priceCents: 200,
    description: "A concise two-day itinerary with the essentials.",
    dayRange: "2 days",
  },
  standard: {
    label: "Standard",
    priceCents: 500,
    description: "A detailed five-day itinerary with richer recommendations.",
    dayRange: "5 days",
  },
  premium: {
    label: "Premium",
    priceCents: 1000,
    description: "A 7–10 day itinerary with restaurants and map-ready locations.",
    dayRange: "7–10 days",
  },
  concierge: {
    label: "Concierge",
    priceCents: 1500,
    description: "Premium planning plus personal touches and one revision.",
    dayRange: "7–10 days",
  },
};

// The following source templates intentionally preserve the user's supplied
// wording. Only {{double-curly-brace}} variables are interpolated at runtime.
const FREE_PREVIEW_PROMPT = `You are a professional travel itinerary planner for The Stay & Wander, a travel
planning brand. Generate ONLY Day 1 of a trip itinerary. This is a free preview
meant to showcase quality and entice the user to purchase the full itinerary.

Write Day 1 in full detail, matching the quality of a premium product — this is
a marketing sample, so make it genuinely excellent.

Destination: {{destination}}
Trip length (for context only — do not generate beyond Day 1): {{trip_length}} days
Interests: {{interests}}
Budget level: {{budget_level}}
Travel style: {{travel_style}}
Pace: {{pace}}

Format Day 1 with:
- A short, evocative intro line for the day (1 sentence, sets the mood)
- Morning / Afternoon / Evening blocks
- For each block: 1-2 suggested activities with brief descriptions (2-3 sentences each)
- One specific restaurant or food suggestion for the day
- One practical tip (transport, timing, booking advice)

End with a short teaser line encouraging upgrade, e.g.:
"This is just Day 1 of your {{trip_length}}-day adventure — unlock the full
itinerary to see where the rest of your trip takes you."

Do not mention pricing or affiliate links in this section — that's handled
separately in the UI.`;

const BASIC_TIER_PROMPT = `Generate a complete 2-day travel itinerary for The Stay & Wander.

Destination: {{destination}}
Interests: {{interests}}
Budget level: {{budget_level}}
Travel style: {{travel_style}}
Pace: {{pace}}

For each day, include:
- A short intro line
- Morning / Afternoon / Evening blocks with 1-2 activities each
- One meal suggestion per day
- One practical tip per day

Keep total length concise — this is the entry-level tier. Clear, useful,
no filler. Format with day headers (Day 1, Day 2) and consistent structure
so it renders cleanly in a PDF.`;

const STANDARD_TIER_PROMPT = `Generate a complete 5-day travel itinerary for The Stay & Wander.

Destination: {{destination}}
Interests: {{interests}}
Budget level: {{budget_level}}
Travel style: {{travel_style}}
Pace: {{pace}}

For each day, include:
- A short intro line setting the mood/theme for the day
- Morning / Afternoon / Evening blocks with 2-3 activities each and brief
  descriptions (2-3 sentences)
- Two meal suggestions per day (one casual, one notable)
- One practical tip per day (transport, booking, timing, weather)
- A "why this day" one-liner tying the day's theme to the traveler's stated interests

Include a short "Trip Overview" summary at the top (3-4 sentences) before Day 1.
Format with clear day headers and consistent structure for clean PDF rendering.`;

const PREMIUM_TIER_PROMPT = `Generate a complete {{trip_length}}-day travel itinerary for The Stay & Wander
(7-10 days).

Destination: {{destination}}
Interests: {{interests}}
Budget level: {{budget_level}}
Travel style: {{travel_style}}
Pace: {{pace}}

For each day, include:
- A short intro line setting the mood/theme for the day
- Morning / Afternoon / Evening blocks with 2-3 activities each and detailed
  descriptions (3-4 sentences)
- TWO specific restaurant suggestions per day (breakfast/lunch spot + dinner spot)
  with cuisine type and price range ($ / $$ / $$$)
- A list of 3-5 named locations for the day, formatted as:
  "LOCATION: [name], [neighborhood/area]" — these will be used to generate a
  map pin overlay in the PDF (do not generate the map itself, just structured
  location data)
- One practical tip per day
- A "why this day" one-liner tying the day's theme to the traveler's interests

Include a "Trip Overview" summary at the top (4-5 sentences) plus a full list
of all named locations across the trip, grouped by day, for the map appendix.

Format with clear day headers and consistent structure for clean PDF rendering.`;

const CONCIERGE_INITIAL_ADDITION = `[Use the full Premium tier prompt above, plus:]

Additionally, include a "Personal Touches" section at the end with 3-4
highly specific, non-obvious recommendations tailored to the traveler's
stated interests and style — the kind of insider tips a well-traveled friend
would share, not generic "top 10" list items. These should feel hand-picked
for THIS traveler specifically, referencing their interests directly.`;

const CONCIERGE_REVISION_PROMPT = `You previously generated the following itinerary:

{{original_itinerary}}

The customer has requested this change:
{{revision_request}}

Revise the itinerary to incorporate this feedback while keeping everything
else consistent. Do not regenerate parts of the itinerary that were not
affected by the requested change. Return the full updated itinerary in the
same format as the original.`;

const GENERAL_FORMATTING_RULES = `- Use consistent day headers: \`## Day 1 — [short theme title]\`
- Keep tone warm, confident, and specific — avoid generic phrases like
  "enjoy the local culture" without specifics
- Never invent exact prices, opening hours, or booking availability — use
  soft language like "typically open until..." or "budget around..."
- Weave in a natural mention of booking through The Stay & Wander where
  relevant (e.g., "Book your stay near [neighborhood] through our hotel
  search" ) — but do not hard-code affiliate links in the AI output; insert
  those programmatically in the PDF template instead, so links stay current
  if affiliate IDs change`;

type PromptValues = Record<string, string>;

function interpolatePrompt(template: string, values: PromptValues) {
  return template.replace(/\{\{([a-z_]+)\}\}/g, (match, variable: string) => values[variable] ?? match);
}

function inputValues(input: TripPlannerInput): PromptValues {
  return {
    destination: input.destination,
    trip_length: String(input.tripLength),
    interests: input.interests.join(", "),
    budget_level: input.budgetLevel,
    travel_style: input.travelStyle,
    pace: input.pace,
  };
}

function withGeneralFormattingRules(prompt: string) {
  return `${prompt}\n\n${GENERAL_FORMATTING_RULES}`;
}

export function buildFreePreviewPrompt(input: TripPlannerInput) {
  return withGeneralFormattingRules(interpolatePrompt(FREE_PREVIEW_PROMPT, inputValues(input)));
}

export function buildPaidItineraryPrompt(tier: TripPlannerTier, input: TripPlannerInput) {
  const tierPrompt =
    tier === "basic"
      ? BASIC_TIER_PROMPT
      : tier === "standard"
        ? STANDARD_TIER_PROMPT
        : tier === "premium"
          ? PREMIUM_TIER_PROMPT
          : `${PREMIUM_TIER_PROMPT}\n\n${CONCIERGE_INITIAL_ADDITION}`;

  return withGeneralFormattingRules(interpolatePrompt(tierPrompt, inputValues(input)));
}

export function buildConciergeRevisionPrompt(originalItinerary: string, revisionRequest: string) {
  return withGeneralFormattingRules(
    interpolatePrompt(CONCIERGE_REVISION_PROMPT, {
      original_itinerary: originalItinerary,
      revision_request: revisionRequest,
    })
  );
}
