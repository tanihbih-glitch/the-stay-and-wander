import { ArrowUpDown, AtSign, CalendarDays, Compass, Download, ExternalLink, Heart, MapPinned, MapPin, MessageCircle, Plus, Printer, RotateCcw, Share2, Sparkles, Trash2, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DEALS_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const BALI_MATCHER_SHORTLIST_KEY = "tsw-bali-base-shortlist";
export const BALI_MATCHER_SHORTLIST_LIMIT = 3;
export const BALI_MATCHER_FAVORITES_KEY = "tsw-bali-base-favorites";
export const BALI_MATCHER_FAVORITES_LIMIT = 4;
export const BALI_MATCHER_RESULT_REVEAL_MS = 1800;
export const BALI_BASE_MATCHER_STAY22_URL = DEALS_AFFILIATE_LINKS.hotels.bali;

type AreaKey = "seminyak" | "ubud" | "uluwatu" | "canggu";
type VibeKey = "social" | "culture" | "scenic" | "cafe";
type BudgetKey = "budget" | "mid" | "luxury";
type DurationKey = "short" | "medium" | "long";

export type BaliMatcherAnswers = {
  vibe: VibeKey | "";
  budget: BudgetKey | "";
  duration: DurationKey | "";
};

export type BaliBaseArea = {
  key: AreaKey;
  name: string;
  anchor: string;
  heading: string;
  dynamics: string;
  quickSummary: string;
  localHighlights: readonly string[];
  directionalPrice: string;
  baselinePriceBands: {
    budget: readonly [number, number];
    midRange: readonly [number, number];
    luxuryFrom: number;
  };
  costRank: number;
  bestFor: readonly BaliTravelerFit[];
  shortlistLabel: string;
  baliLocation: string;
  locationContext: string;
  markerClassName: string;
};

export type BaliMatcherRecommendation = {
  primary: BaliBaseArea;
  alternative: BaliBaseArea;
};

export type BaliFavoriteSort = "saved" | "vibe" | "cost";
export type BaliTravelerFit = "solo" | "couples" | "families";

export type BaliSeasonalEstimate = {
  multiplier: number;
  label: string;
  note: string;
};

export const BALI_MATCHER_SEASONAL_ESTIMATES: Record<number, BaliSeasonalEstimate> = {
  0: { multiplier: 0.85, label: "January low-season reference", note: "The late-January benchmark is 0.85×; New Year dates from January 1–5 can reach 1.25×." },
  1: { multiplier: 0.8, label: "February low-season reference", note: "The supplied monsoon-season benchmark is 0.80×." },
  2: { multiplier: 0.8, label: "March low-season reference", note: "The supplied Nyepi-period benchmark is 0.80×." },
  3: { multiplier: 1, label: "April shoulder-season reference", note: "The supplied April benchmark is the 1.00× baseline." },
  4: { multiplier: 0.95, label: "May shoulder-season reference", note: "The supplied May benchmark is 0.95×." },
  5: { multiplier: 1.2, label: "June high-season reference", note: "The supplied June benchmark is 1.20×." },
  6: { multiplier: 1.45, label: "July peak-season reference", note: "The supplied July benchmark is 1.45×." },
  7: { multiplier: 1.5, label: "August peak-season reference", note: "The supplied August benchmark is 1.50×." },
  8: { multiplier: 1.05, label: "September shoulder-season reference", note: "The supplied September benchmark is 1.05×." },
  9: { multiplier: 0.9, label: "October transition-season reference", note: "The supplied October benchmark is 0.90×." },
  10: { multiplier: 0.8, label: "November low-season reference", note: "The supplied rainy-start benchmark is 0.80×." },
  11: { multiplier: 1.6, label: "December festive-season reference", note: "The supplied 1.60× benchmark reflects the December 20–31 festive period." },
};

export const BALI_TRAVELER_FIT_LABELS: Record<BaliTravelerFit, string> = {
  solo: "Solo travelers",
  couples: "Couples",
  families: "Families",
};

export type BaliMatcherEventName =
  | "bali_matcher_started"
  | "bali_matcher_option_selected"
  | "bali_matcher_completed"
  | "bali_matcher_area_saved"
  | "bali_matcher_area_notes_clicked"
  | "bali_matcher_availability_clicked"
  | "bali_matcher_results_shared"
  | "bali_matcher_social_share_opened"
  | "bali_matcher_location_opened"
  | "bali_matcher_favorite_saved"
  | "bali_matcher_comparison_exported"
  | "bali_matcher_comparison_pdf_exported";

type BaliMatcherEventProperties = Record<string, string | number | boolean>;

type UmamiTracker = {
  track?: (eventName: string, properties?: BaliMatcherEventProperties) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

const AREA_ORDER: AreaKey[] = ["seminyak", "ubud", "uluwatu", "canggu"];

export const baliBaseAreas: Record<AreaKey, BaliBaseArea> = {
  seminyak: {
    key: "seminyak",
    name: "Seminyak",
    anchor: "#seminyak",
    heading: "Beach clubs, dining, and a social first base",
    dynamics: "A walkable beach-and-dining rhythm for travellers who want restaurants, boutiques, sunset plans, and a lively resort atmosphere close together.",
    quickSummary: "A sociable south-west base for a first trip that revolves around beach days, dining plans, boutiques, and sunset energy in one compact rhythm.",
    localHighlights: ["Beach clubs and sunset plans", "Restaurant and boutique walks", "Lively first-timer base"],
    directionalPrice: "Typical guide range: $40–70 budget · $80–150 mid-range · $200+ luxury per night.",
    baselinePriceBands: { budget: [40, 70], midRange: [80, 150], luxuryFrom: 200 },
    costRank: 3,
    bestFor: ["solo", "couples"],
    shortlistLabel: "Seminyak — beach clubs and dining",
    baliLocation: "South-west Bali coast",
    locationContext: "Seminyak sits on Bali’s south-west coast, south of Canggu and close to the island’s restaurant, beach-club, and shopping corridor.",
    markerClassName: "left-[42%] top-[57%]",
  },
  ubud: {
    key: "ubud",
    name: "Ubud",
    anchor: "#ubud",
    heading: "Culture, rice terraces, and a slower inland rhythm",
    dynamics: "A strong base for temples, cafés, wellness, and lush surroundings when cultural experiences and a calmer pace matter more than beach access.",
    quickSummary: "An inland, culture-led base for temple visits, rice-terrace scenery, cafés, and wellness-focused days at a more relaxed pace.",
    localHighlights: ["Temple and cultural days", "Rice-terrace surroundings", "Cafés and wellness time"],
    directionalPrice: "Typical guide range: $30–60 budget · $75–130 mid-range · $180+ luxury per night.",
    baselinePriceBands: { budget: [30, 60], midRange: [75, 130], luxuryFrom: 180 },
    costRank: 1,
    bestFor: ["solo", "couples", "families"],
    shortlistLabel: "Ubud — culture and wellness",
    baliLocation: "Central inland Bali",
    locationContext: "Ubud is inland in central Bali, making it a culture, rice-terrace, and wellness base rather than a beach base.",
    markerClassName: "left-[52%] top-[38%]",
  },
  uluwatu: {
    key: "uluwatu",
    name: "Uluwatu",
    anchor: "#uluwatu",
    heading: "Cliffs, surf, and self-contained resort time",
    dynamics: "A Bukit coast base for clifftop sunsets, surf beaches, and slower resort days; build in more transport time for island-wide sightseeing.",
    quickSummary: "A scenic southern-coast match for clifftop views, surf beaches, and slower resort time when a self-contained stay matters most.",
    localHighlights: ["Clifftop sunsets", "Surf beaches", "Slower resort days"],
    directionalPrice: "Typical guide range: $50–90 budget · $100–180 mid-range · $250+ luxury per night.",
    baselinePriceBands: { budget: [50, 90], midRange: [100, 180], luxuryFrom: 250 },
    costRank: 4,
    bestFor: ["couples"],
    shortlistLabel: "Uluwatu — cliffs and surf",
    baliLocation: "Bukit Peninsula, south Bali",
    locationContext: "Uluwatu is on Bali’s southern Bukit Peninsula, known for its clifftop coast, surf breaks, and more self-contained resort setting.",
    markerClassName: "left-[45%] top-[79%]",
  },
  canggu: {
    key: "canggu",
    name: "Canggu",
    anchor: "#canggu",
    heading: "Cafés, surf, and a longer-stay feel",
    dynamics: "A social remote-work and café rhythm with surf access and an energetic, less polished feel; a central location can help with traffic on longer stays.",
    quickSummary: "A flexible south-west base for surf, independent cafés, and a social longer-stay rhythm, especially when day-to-day lifestyle matters.",
    localHighlights: ["Independent café culture", "Surf access", "Longer-stay social rhythm"],
    directionalPrice: "Typical guide range: $35–65 budget · $70–140 mid-range · $190+ luxury per night.",
    baselinePriceBands: { budget: [35, 65], midRange: [70, 140], luxuryFrom: 190 },
    costRank: 2,
    bestFor: ["solo", "couples"],
    shortlistLabel: "Canggu — cafés and longer stays",
    baliLocation: "South-west Bali coast",
    locationContext: "Canggu is on Bali’s south-west coast, north of Seminyak, with surf beaches and a café-led longer-stay rhythm.",
    markerClassName: "left-[37%] top-[45%]",
  },
};

const vibeScores: Record<VibeKey, Record<AreaKey, number>> = {
  social: { seminyak: 5, ubud: 1, uluwatu: 2, canggu: 4 },
  culture: { seminyak: 1, ubud: 5, uluwatu: 2, canggu: 1 },
  scenic: { seminyak: 1, ubud: 2, uluwatu: 5, canggu: 2 },
  cafe: { seminyak: 3, ubud: 2, uluwatu: 1, canggu: 5 },
};

const budgetScores: Record<BudgetKey, Record<AreaKey, number>> = {
  budget: { seminyak: 1, ubud: 3, uluwatu: 0, canggu: 2 },
  mid: { seminyak: 3, ubud: 3, uluwatu: 2, canggu: 3 },
  luxury: { seminyak: 3, ubud: 2, uluwatu: 4, canggu: 2 },
};

const durationScores: Record<DurationKey, Record<AreaKey, number>> = {
  short: { seminyak: 3, ubud: 1, uluwatu: 2, canggu: 1 },
  medium: { seminyak: 2, ubud: 3, uluwatu: 2, canggu: 3 },
  long: { seminyak: 1, ubud: 3, uluwatu: 1, canggu: 3 },
};

export const matcherQuestions = [
  {
    field: "vibe",
    label: "What should shape your first Bali trip?",
    options: [
      { value: "social", label: "Beach clubs, dining & a social base" },
      { value: "culture", label: "Culture, rice terraces & wellness" },
      { value: "scenic", label: "Cliffs, surf & resort time" },
      { value: "cafe", label: "Cafés, surf & a longer-stay feel" },
    ],
  },
  {
    field: "budget",
    label: "What is your typical nightly budget target?",
    options: [
      { value: "budget", label: "Budget-led planning" },
      { value: "mid", label: "Mid-range comfort" },
      { value: "luxury", label: "Luxury villa or resort" },
    ],
  },
  {
    field: "duration",
    label: "How long are you likely to stay in Bali?",
    options: [
      { value: "short", label: "1–4 days" },
      { value: "medium", label: "5–10 days" },
      { value: "long", label: "10+ days" },
    ],
  },
] as const;

/**
 * Uses only fixed, editorially visible guide inputs. The returned order is a
 * transparent priority order, not a live availability or price prediction.
 */
export function getBaliBaseRecommendation(answers: BaliMatcherAnswers): BaliMatcherRecommendation | null {
  const { vibe, budget, duration } = answers;
  if (!vibe || !budget || !duration) return null;

  const scoredAreas = AREA_ORDER.map((key) => ({
    key,
    score: vibeScores[vibe][key] + budgetScores[budget][key] + durationScores[duration][key],
  })).sort((left, right) => right.score - left.score || AREA_ORDER.indexOf(left.key) - AREA_ORDER.indexOf(right.key));

  return {
    primary: baliBaseAreas[scoredAreas[0].key],
    alternative: baliBaseAreas[scoredAreas[1].key],
  };
}

/**
 * Emits only anonymous, low-cardinality event properties. The local CustomEvent
 * makes the contract observable without a GTM global-event-buffer dependency; when the
 * already-installed Umami tracker is available it receives the same payload.
 */
export function trackBaliMatcherEvent(eventName: BaliMatcherEventName, properties: BaliMatcherEventProperties = {}) {
  if (typeof window === "undefined") return;

  window.umami?.track?.(eventName, properties);
  window.dispatchEvent(new CustomEvent("tsw:bali-matcher", { detail: { eventName, properties } }));
}

export function buildBaliMatcherShareSummary(recommendation: BaliMatcherRecommendation) {
  return [
    "My Bali base ideas from The Stay & Wander",
    `Primary area: ${recommendation.primary.name} — ${recommendation.primary.heading}.`,
    `Alternative area: ${recommendation.alternative.name} — ${recommendation.alternative.heading}.`,
    "Compare the full area notes and current availability: https://thestayandwander.com/blog/where-to-stay-in-bali-2026#bali-base-matcher",
  ].join("\n");
}

export function buildBaliMatcherSocialShareUrl(platform: "whatsapp" | "x", recommendation: BaliMatcherRecommendation) {
  const encodedSummary = encodeURIComponent(buildBaliMatcherShareSummary(recommendation));
  return platform === "whatsapp"
    ? `https://wa.me/?text=${encodedSummary}`
    : `https://twitter.com/intent/tweet?text=${encodedSummary}`;
}

export function sanitizeBaliBaseShortlist(value: unknown): AreaKey[] {
  if (!Array.isArray(value)) return [];

  return value.filter((key): key is AreaKey => typeof key === "string" && key in baliBaseAreas).slice(0, BALI_MATCHER_SHORTLIST_LIMIT);
}

export function sanitizeBaliBaseFavorites(value: unknown): AreaKey[] {
  if (!Array.isArray(value)) return [];

  return value.filter((key): key is AreaKey => typeof key === "string" && key in baliBaseAreas).slice(0, BALI_MATCHER_FAVORITES_LIMIT);
}

export function sortBaliFavoriteAreas(areaKeys: AreaKey[], sort: BaliFavoriteSort): AreaKey[] {
  const uniqueKeys = Array.from(new Set(sanitizeBaliBaseFavorites(areaKeys)));
  if (sort === "saved") return uniqueKeys;

  return [...uniqueKeys].sort((left, right) => {
    if (sort === "cost") return baliBaseAreas[left].costRank - baliBaseAreas[right].costRank || baliBaseAreas[left].name.localeCompare(baliBaseAreas[right].name);
    return baliBaseAreas[left].heading.localeCompare(baliBaseAreas[right].heading) || baliBaseAreas[left].name.localeCompare(baliBaseAreas[right].name);
  });
}

export function filterBaliFavoriteAreas(areaKeys: AreaKey[], travelerFit: BaliTravelerFit | "all"): AreaKey[] {
  const validKeys = sanitizeBaliBaseFavorites(areaKeys);
  return travelerFit === "all" ? validKeys : validKeys.filter((key) => baliBaseAreas[key].bestFor.includes(travelerFit));
}

export function getBaliMatcherSeasonalEstimate(tripDate: string): BaliSeasonalEstimate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(tripDate);
  const monthIndex = match ? Number(match[2]) - 1 : 6;
  const day = match ? Number(match[3]) : 15;

  if (monthIndex === 0 && day >= 1 && day <= 5) {
    return { multiplier: 1.25, label: "New Year peak reference", note: "The supplied January 1–5 benchmark is 1.25×." };
  }

  return BALI_MATCHER_SEASONAL_ESTIMATES[monthIndex] ?? BALI_MATCHER_SEASONAL_ESTIMATES[6];
}

export function buildBaliAreaSeasonalEstimate(area: BaliBaseArea, tripDate: string) {
  const seasonal = getBaliMatcherSeasonalEstimate(tripDate);
  const adjusted = (amount: number) => Math.round(amount * seasonal.multiplier);
  return {
    seasonal,
    budget: `$${adjusted(area.baselinePriceBands.budget[0])}–${adjusted(area.baselinePriceBands.budget[1])}/night`,
    midRange: `$${adjusted(area.baselinePriceBands.midRange[0])}–${adjusted(area.baselinePriceBands.midRange[1])}/night`,
    luxuryFrom: `$${adjusted(area.baselinePriceBands.luxuryFrom)}+/night`,
  };
}

export function calculateBaliAreaTotalStayEstimate(area: BaliBaseArea, tripDate: string, travelers: number, nights: number, roomOverride = 0) {
  const seasonal = getBaliMatcherSeasonalEstimate(tripDate);
  const automaticRooms = Math.max(1, Math.ceil(Math.max(1, travelers) / 2));
  const rooms = Math.max(1, Math.floor(roomOverride) || automaticRooms);
  const safeNights = Math.max(1, nights);
  const total = (amount: number) => Math.round(amount * seasonal.multiplier * rooms * safeNights);
  return {
    rooms,
    usingRoomOverride: Math.floor(roomOverride) > 0,
    nights: safeNights,
    budget: `$${total(area.baselinePriceBands.budget[0]).toLocaleString()}–${total(area.baselinePriceBands.budget[1]).toLocaleString()} total`,
    midRange: `$${total(area.baselinePriceBands.midRange[0]).toLocaleString()}–${total(area.baselinePriceBands.midRange[1]).toLocaleString()} total`,
    luxuryFrom: `$${total(area.baselinePriceBands.luxuryFrom).toLocaleString()}+ total`,
  };
}

export function buildBaliFavoritesComparisonText(areaKeys: AreaKey[], tripDate: string, travelers = 2, nights = 7, roomOverride = 0) {
  const selectedAreas = sanitizeBaliBaseFavorites(areaKeys).map((key) => baliBaseAreas[key]);
  const seasonal = getBaliMatcherSeasonalEstimate(tripDate);
  const formattedDate = /^\d{4}-\d{2}-\d{2}$/.test(tripDate) ? tripDate : "2026-07-15";

  return [
    "Bali base comparison — The Stay & Wander",
    `Trip date planning reference: ${formattedDate} · ${seasonal.label} (${seasonal.multiplier.toFixed(2)}×).`,
    `Stay estimate: ${Math.max(1, travelers)} traveler${Math.max(1, travelers) === 1 ? "" : "s"} · ${Math.max(1, nights)} night${Math.max(1, nights) === 1 ? "" : "s"} · ${Math.floor(roomOverride) > 0 ? `${Math.floor(roomOverride)} specified hotel room${Math.floor(roomOverride) === 1 ? "" : "s"}` : "one mid-range room per two travelers"}.`,
    seasonal.note,
    "",
    ...selectedAreas.map((area) => {
      const estimate = buildBaliAreaSeasonalEstimate(area, tripDate);
      const total = calculateBaliAreaTotalStayEstimate(area, tripDate, travelers, nights, roomOverride);
      return `${area.name}\nVibe: ${area.heading}.\nEstimated planning range: Budget ${estimate.budget} · Mid-range ${estimate.midRange} · Luxury from ${estimate.luxuryFrom}.\nTotal stay estimate: Budget ${total.budget} · Mid-range ${total.midRange} · Luxury from ${total.luxuryFrom}.\nHighlights: ${area.localHighlights.join("; ")}.`;
    }),
    "",
    "Planning estimates only; confirm live availability and final prices before booking.",
    "https://thestayandwander.com/blog/where-to-stay-in-bali-2026#bali-base-matcher",
  ].join("\n");
}

function parseShortlist(value: string | null): AreaKey[] {
  if (!value) return [];

  try {
    return sanitizeBaliBaseShortlist(JSON.parse(value));
  } catch {
    return [];
  }
}

function parseFavorites(value: string | null): AreaKey[] {
  if (!value) return [];

  try {
    return sanitizeBaliBaseFavorites(JSON.parse(value));
  } catch {
    return [];
  }
}

function getStepProgress(step: number) {
  return Math.min(100, Math.max(0, (step / 3) * 100));
}

export default function BaliBaseMatcher() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<BaliMatcherAnswers>({ vibe: "", budget: "", duration: "" });
  const [shortlist, setShortlist] = useState<AreaKey[]>([]);
  const [shortlistReady, setShortlistReady] = useState(false);
  const [shortlistMessage, setShortlistMessage] = useState("");
  const [favorites, setFavorites] = useState<AreaKey[]>([]);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [favoritesMessage, setFavoritesMessage] = useState("");
  const [favoriteSort, setFavoriteSort] = useState<BaliFavoriteSort>("saved");
  const [favoriteTravelerFit, setFavoriteTravelerFit] = useState<BaliTravelerFit | "all">("all");
  const [tripDate, setTripDate] = useState("2026-07-15");
  const [comparisonTravelers, setComparisonTravelers] = useState(2);
  const [comparisonNights, setComparisonNights] = useState(7);
  const [comparisonRoomOverride, setComparisonRoomOverride] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [locationArea, setLocationArea] = useState<BaliBaseArea | null>(null);

  const recommendation = useMemo(() => getBaliBaseRecommendation(answers), [answers]);
  const filteredFavorites = useMemo(() => filterBaliFavoriteAreas(favorites, favoriteTravelerFit), [favoriteTravelerFit, favorites]);
  const sortedFavorites = useMemo(() => sortBaliFavoriteAreas(filteredFavorites, favoriteSort), [favoriteSort, filteredFavorites]);
  const seasonalEstimate = useMemo(() => getBaliMatcherSeasonalEstimate(tripDate), [tripDate]);
  const activeQuestion = matcherQuestions[step - 1];

  useEffect(() => {
    setShortlist(parseShortlist(window.localStorage.getItem(BALI_MATCHER_SHORTLIST_KEY)));
    setShortlistReady(true);
    setFavorites(parseFavorites(window.localStorage.getItem(BALI_MATCHER_FAVORITES_KEY)));
    setFavoritesReady(true);
  }, []);

  useEffect(() => {
    if (!shortlistReady) return;
    if (shortlist.length) window.localStorage.setItem(BALI_MATCHER_SHORTLIST_KEY, JSON.stringify(shortlist));
    else window.localStorage.removeItem(BALI_MATCHER_SHORTLIST_KEY);
  }, [shortlist, shortlistReady]);

  useEffect(() => {
    if (!favoritesReady) return;
    if (favorites.length) window.localStorage.setItem(BALI_MATCHER_FAVORITES_KEY, JSON.stringify(favorites));
    else window.localStorage.removeItem(BALI_MATCHER_FAVORITES_KEY);
  }, [favorites, favoritesReady]);

  useEffect(() => {
    if (step !== 4 || !recommendation) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const revealTimer = window.setTimeout(() => {
      setStep(5);
      trackBaliMatcherEvent("bali_matcher_completed", { area: recommendation.primary.key });
    }, prefersReducedMotion ? 180 : BALI_MATCHER_RESULT_REVEAL_MS);

    return () => window.clearTimeout(revealTimer);
  }, [recommendation, step]);

  const selectAnswer = (field: keyof BaliMatcherAnswers, value: string) => {
    const updatedAnswers = { ...answers, [field]: value } as BaliMatcherAnswers;
    const isFirstSelection = !answers.vibe && field === "vibe";
    setAnswers(updatedAnswers);
    setShortlistMessage("");
    setShareMessage("");

    if (isFirstSelection) trackBaliMatcherEvent("bali_matcher_started");
    trackBaliMatcherEvent("bali_matcher_option_selected", { step, option: value });

    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    setStep(4);
  };

  const savePrimaryArea = () => {
    if (!recommendation) return;
    const area = recommendation.primary.key;

    if (shortlist.includes(area)) {
      setShortlistMessage(`${recommendation.primary.name} is already saved in this browser.`);
      return;
    }

    if (shortlist.length >= BALI_MATCHER_SHORTLIST_LIMIT) {
      setShortlistMessage(`Your shortlist can hold up to ${BALI_MATCHER_SHORTLIST_LIMIT} areas. Remove one before adding another.`);
      return;
    }

    setShortlist((items) => [...items, area]);
    setShortlistMessage(`${recommendation.primary.name} saved in this browser.`);
    trackBaliMatcherEvent("bali_matcher_area_saved", { area });
  };

  const startOver = () => {
    setIsRestarting(true);
    window.setTimeout(() => {
      setAnswers({ vibe: "", budget: "", duration: "" });
      setStep(1);
      setShortlistMessage("");
      setShareMessage("");
      setFavoritesMessage("");
      setIsRestarting(false);
    }, 180);
  };

  const clearShortlist = () => {
    setShortlist([]);
    setShortlistMessage("Saved areas cleared from this browser.");
  };

  const saveMatchedAreasToFavorites = () => {
    if (!recommendation) return;
    const matchedAreas = [recommendation.primary.key, recommendation.alternative.key];
    const additions = matchedAreas.filter((key) => !favorites.includes(key));

    if (!additions.length) {
      setFavoritesMessage("These matched areas are already in Favorites on this device.");
      return;
    }

    setFavorites((currentFavorites) => [...currentFavorites, ...additions].slice(0, BALI_MATCHER_FAVORITES_LIMIT));
    setFavoritesMessage(`${additions.map((key) => baliBaseAreas[key].name).join(" and ")} added to Favorites on this device.`);
    trackBaliMatcherEvent("bali_matcher_favorite_saved", { primary: recommendation.primary.key, alternative: recommendation.alternative.key });
  };

  const removeFavorite = (area: AreaKey) => {
    setFavorites((items) => items.filter((item) => item !== area));
    setFavoritesMessage(`${baliBaseAreas[area].name} removed from Favorites.`);
  };

  const clearFavorites = () => {
    setFavorites([]);
    setFavoritesMessage("Favorites cleared from this browser.");
  };

  const downloadFavoritesComparison = () => {
    if (sortedFavorites.length < 2) return;
    const text = buildBaliFavoritesComparisonText(sortedFavorites, tripDate, comparisonTravelers, comparisonNights, comparisonRoomOverride);
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bali-base-comparison.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    setFavoritesMessage("Your shareable Bali comparison text card has downloaded.");
    trackBaliMatcherEvent("bali_matcher_comparison_exported", { areas: sortedFavorites.length, seasonal_reference: seasonalEstimate.label });
  };

  const downloadFavoritesComparisonPdf = async () => {
    if (sortedFavorites.length < 2) return;

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      const regular = await pdf.embedFont(StandardFonts.Helvetica);
      const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
      const navy = rgb(13 / 255, 27 / 255, 42 / 255);
      const ocean = rgb(0 / 255, 119 / 255, 182 / 255);
      const slate = rgb(51 / 255, 65 / 255, 85 / 255);
      let page = pdf.addPage([595, 842]);
      let y = 796;
      const margin = 46;
      const ensureSpace = (required: number) => {
        if (y - required >= 48) return;
        page = pdf.addPage([595, 842]);
        y = 796;
      };
      const writeWrapped = (text: string, font = regular, size = 9, color = slate, gap = 13) => {
        const words = text.split(/\s+/);
        let line = "";
        for (const word of words) {
          const candidate = line ? `${line} ${word}` : word;
          if (font.widthOfTextAtSize(candidate, size) > 503 && line) {
            ensureSpace(gap);
            page.drawText(line, { x: margin, y, size, font, color });
            y -= gap;
            line = word;
          } else line = candidate;
        }
        if (line) {
          ensureSpace(gap);
          page.drawText(line, { x: margin, y, size, font, color });
          y -= gap;
        }
      };
      const writeHeading = (text: string, size = 16) => {
        ensureSpace(size + 16);
        page.drawText(text, { x: margin, y, size, font: bold, color: navy });
        y -= size + 10;
      };

      page.drawText("THE STAY & WANDER", { x: margin, y, size: 9, font: bold, color: ocean });
      y -= 26;
      writeHeading("Saved Bali base comparison", 22);
      writeWrapped(`${tripDate} · ${seasonalEstimate.label} · ${comparisonTravelers} traveler${comparisonTravelers === 1 ? "" : "s"} · ${comparisonNights} night${comparisonNights === 1 ? "" : "s"} · ${comparisonRoomOverride > 0 ? `${comparisonRoomOverride} specified room${comparisonRoomOverride === 1 ? "" : "s"}` : "one mid-range room per two travelers"}.`, regular, 10);
      writeWrapped("Planning estimates only. Taxes, service, room configuration, and live availability can change final prices.", regular, 9);
      y -= 8;

      for (const key of sortedFavorites) {
        const area = baliBaseAreas[key];
        const estimate = buildBaliAreaSeasonalEstimate(area, tripDate);
        const total = calculateBaliAreaTotalStayEstimate(area, tripDate, comparisonTravelers, comparisonNights, comparisonRoomOverride);
        writeHeading(area.name, 16);
        writeWrapped(area.heading, bold, 10, ocean);
        writeWrapped(`Vibe: ${area.quickSummary}`);
        writeWrapped(`Seasonal planning range: Budget ${estimate.budget} · Mid-range ${estimate.midRange} · Luxury from ${estimate.luxuryFrom}.`);
        writeWrapped(`Total-stay estimate: Budget ${total.budget} · Mid-range ${total.midRange} · Luxury from ${total.luxuryFrom}.`);
        writeWrapped(`Highlights: ${area.localHighlights.join(" · ")}.`);
        writeWrapped(`Location: ${area.baliLocation}.`);
        y -= 8;
      }

      const generatedBytes = await pdf.save();
      const pdfBytes = new Uint8Array(generatedBytes.length);
      pdfBytes.set(generatedBytes);
      const file = new Blob([pdfBytes.buffer], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bali-base-comparison.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setFavoritesMessage("Your printable Bali comparison PDF has downloaded.");
      trackBaliMatcherEvent("bali_matcher_comparison_pdf_exported", { areas: sortedFavorites.length, seasonal_reference: seasonalEstimate.label });
    } catch {
      setFavoritesMessage("Your browser could not create the PDF. Use Print comparison to save a PDF instead.");
    }
  };

  const printFavoritesComparison = () => window.print();

  const shareResults = async () => {
    if (!recommendation) return;
    const summary = buildBaliMatcherShareSummary(recommendation);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable");
      await navigator.clipboard.writeText(summary);
      setShareMessage("Result summary copied. You can paste it into your group chat or notes.");
      trackBaliMatcherEvent("bali_matcher_results_shared", { area: recommendation.primary.key });
    } catch {
      setShareMessage(`Copy this summary:\n${summary}`);
    }
  };

  const openAreaLocation = (area: BaliBaseArea) => {
    setLocationArea(area);
    trackBaliMatcherEvent("bali_matcher_location_opened", { area: area.key });
  };

  return (
    <section id="bali-base-matcher" className="mt-10 scroll-mt-28 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-5 sm:p-7" aria-labelledby="bali-base-matcher-heading">
      <div className="flex flex-col gap-4 border-b border-[#cfe4ee] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="rounded-full bg-white p-3 text-[#0077B6]" aria-hidden="true"><Compass className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Interactive planning aid</p>
            <h2 id="bali-base-matcher-heading" className="mt-1 font-playfair text-3xl font-bold text-[#0D1B2A]">Find your Bali base</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">Answer three quick questions for an explainable area recommendation based on the guide below. It is a planning tool, not a live-rate or availability prediction.</p>
          </div>
        </div>
        <span className="self-start rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]">{step <= 3 ? `Step ${step} of 3` : step === 4 ? "Matching your answers" : "Your result"}</span>
      </div>

      {step <= 3 && activeQuestion && (
        <div className="mt-6 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200">
          <div className="h-1.5 overflow-hidden rounded-full bg-white" aria-hidden="true"><div className="h-full rounded-full bg-[#0077B6]" style={{ width: `${getStepProgress(step)}%` }} /></div>
          <p className="mt-5 font-playfair text-2xl font-bold text-[#0D1B2A]">{activeQuestion.label}</p>
          <div className={`mt-5 grid gap-3 ${activeQuestion.field === "vibe" ? "sm:grid-cols-2" : activeQuestion.field === "duration" ? "sm:grid-cols-3" : "sm:grid-cols-3"}`}>
            {activeQuestion.options.map((option) => (
              <button key={option.value} type="button" onClick={() => selectAnswer(activeQuestion.field, option.value)} className="min-h-24 rounded-2xl border border-white bg-white p-4 text-left text-sm font-semibold leading-relaxed text-[#0D1B2A] shadow-sm transition-colors hover:border-[#0077B6] hover:bg-[#f8fcfe] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">
                {option.label}
              </button>
            ))}
          </div>
          {step > 1 && <button type="button" onClick={() => setStep((currentStep) => Math.max(1, currentStep - 1))} className="mt-5 text-sm font-semibold text-[#0077B6] underline-offset-4 hover:underline">Back to the previous question</button>}
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#9ed1e7] bg-white px-6 text-center" role="status" aria-live="polite">
          <div className="rounded-full bg-[#eef8fb] p-5 text-[#0077B6]"><Compass className="h-10 w-10 motion-safe:animate-spin motion-reduce:animate-none" aria-hidden="true" /></div>
          <p className="mt-5 font-playfair text-2xl font-bold text-[#0D1B2A]">Finding your Bali rhythm</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">Matching your answers with the guide’s area profiles and planning ranges.</p>
        </div>
      )}

      {step === 5 && recommendation && (
        <div className={`mt-6 space-y-5 transition-opacity duration-200 motion-reduce:transition-none ${isRestarting ? "opacity-0" : "opacity-100"}`}>
          <div className="rounded-2xl border border-[#9ed1e7] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Your suggested base</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <h3 className="flex items-center gap-2 font-playfair text-3xl font-bold text-[#0D1B2A]"><MapPin className="h-6 w-6 text-[#0077B6]" aria-hidden="true" />{recommendation.primary.name}</h3>
                  <button type="button" onClick={() => openAreaLocation(recommendation.primary)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9ed1e7] bg-[#eef8fb] text-[#0077B6] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2" aria-label={`Show ${recommendation.primary.name} on the Bali location guide`}><MapPinned className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                <p className="mt-3 max-w-2xl text-lg font-semibold text-slate-800">{recommendation.primary.heading}</p>
              </div>
              <span className="rounded-full bg-[#F8EFE0] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#9a5b20]">Area-led guidance</span>
            </div>
            <p className="mt-4 leading-relaxed text-slate-700">{recommendation.primary.dynamics}</p>
            <p className="mt-4 text-sm font-semibold text-slate-700">{recommendation.primary.directionalPrice}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[recommendation.primary, recommendation.alternative].map((area) => (
                <article key={area.key} className="rounded-xl border border-[#d5e9f1] bg-[#f8fcfe] p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />{area.name} match summary</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{area.quickSummary}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Guide highlights</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {area.localHighlights.map((highlight) => <li key={highlight} className="flex gap-2"><span className="text-[#F4A261]" aria-hidden="true">•</span>{highlight}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={recommendation.primary.anchor} onClick={() => trackBaliMatcherEvent("bali_matcher_area_notes_clicked", { area: recommendation.primary.key })} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-semibold text-[#0077B6] hover:bg-[#eef8fb] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">Read {recommendation.primary.name} notes</a>
              <a href={BALI_BASE_MATCHER_STAY22_URL} target="_blank" rel="sponsored nofollow" onClick={() => trackBaliMatcherEvent("bali_matcher_availability_clicked", { area: recommendation.primary.key })} className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#005c91] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">Compare Bali availability <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={savePrimaryArea} className="inline-flex items-center gap-2 rounded-full border border-[#9a5b20] bg-white px-4 py-2.5 text-sm font-semibold text-[#9a5b20] hover:bg-[#F8EFE0] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><Plus className="h-4 w-4" aria-hidden="true" />Save {recommendation.primary.name}</button>
            <button type="button" onClick={saveMatchedAreasToFavorites} className="inline-flex items-center gap-2 rounded-full border border-[#d59650] bg-[#F8EFE0] px-4 py-2.5 text-sm font-semibold text-[#9a5b20] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><Heart className="h-4 w-4" aria-hidden="true" />Save to Favorites</button>
            <button type="button" onClick={shareResults} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-semibold text-[#0077B6] hover:bg-[#eef8fb] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><Share2 className="h-4 w-4" aria-hidden="true" />Share Results</button>
            <a href={buildBaliMatcherSocialShareUrl("whatsapp", recommendation)} target="_blank" rel="noopener noreferrer" onClick={() => trackBaliMatcherEvent("bali_matcher_social_share_opened", { area: recommendation.primary.key, platform: "whatsapp" })} className="inline-flex items-center gap-2 rounded-full border border-[#42a46d] bg-white px-4 py-2.5 text-sm font-semibold text-[#26754a] hover:bg-[#effaf3] focus:outline-none focus:ring-2 focus:ring-[#26754a] focus:ring-offset-2"><MessageCircle className="h-4 w-4" aria-hidden="true" />WhatsApp</a>
            <a href={buildBaliMatcherSocialShareUrl("x", recommendation)} target="_blank" rel="noopener noreferrer" onClick={() => trackBaliMatcherEvent("bali_matcher_social_share_opened", { area: recommendation.primary.key, platform: "x" })} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"><AtSign className="h-4 w-4" aria-hidden="true" />Share on X</a>
            <button type="button" onClick={() => openAreaLocation(recommendation.alternative)} className="inline-flex items-center gap-2 rounded-full border border-[#9ed1e7] bg-white px-4 py-2.5 text-sm font-semibold text-[#0077B6] hover:bg-[#eef8fb] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><MapPinned className="h-4 w-4" aria-hidden="true" />Locate {recommendation.alternative.name}</button>
            <button type="button" onClick={startOver} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" aria-hidden="true" />Start Over</button>
          </div>
          {shareMessage && <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700" aria-live="polite">{shareMessage}</p>}
          <aside className="rounded-2xl border border-[#f0d3af] bg-[#fffaf4] p-4" aria-live="polite">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Saved favorites</p>
                <p className="mt-1 text-sm text-slate-600">Keep matched-area ideas in this browser for your next planning pass.</p>
              </div>
              {favorites.length > 0 && <button type="button" onClick={clearFavorites} className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-slate-600 underline-offset-4 hover:text-[#0D1B2A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><Trash2 className="h-4 w-4" aria-hidden="true" />Clear Favorites</button>}
            </div>
            {favorites.length > 0 ? <>
              <div className="mt-4 grid gap-3 md:grid-cols-6">
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-favorite-fit"><span className="inline-flex items-center gap-2"><UsersRound className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Best for</span><select id="bali-favorite-fit" value={favoriteTravelerFit} onChange={(event) => setFavoriteTravelerFit(event.target.value as BaliTravelerFit | "all")} className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><option value="all">All saved areas</option>{Object.entries(BALI_TRAVELER_FIT_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-favorite-sort"><span className="inline-flex items-center gap-2"><ArrowUpDown className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Sort saved favorites</span><select id="bali-favorite-sort" value={favoriteSort} onChange={(event) => setFavoriteSort(event.target.value as BaliFavoriteSort)} className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><option value="saved">Saved order</option><option value="vibe">Vibe</option><option value="cost">Lower directional cost</option></select></label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-comparison-date"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Trip date</span><input id="bali-comparison-date" type="date" min="2026-01-01" max="2026-12-31" value={tripDate} onChange={(event) => setTripDate(event.target.value)} aria-describedby="bali-seasonal-estimate-note" className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2" /></label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-comparison-travelers"><span className="inline-flex items-center gap-2"><UsersRound className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Travelers <span className="font-normal text-slate-500">(optional)</span></span><input id="bali-comparison-travelers" type="number" min="1" max="20" value={comparisonTravelers} onChange={(event) => setComparisonTravelers(Math.max(1, Number(event.target.value) || 1))} aria-describedby="bali-total-estimate-note" className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2" /></label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-comparison-nights"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Nights</span><input id="bali-comparison-nights" type="number" min="1" max="30" value={comparisonNights} onChange={(event) => setComparisonNights(Math.max(1, Number(event.target.value) || 1))} aria-describedby="bali-total-estimate-note" className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2" /></label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700" htmlFor="bali-comparison-rooms"><span className="inline-flex items-center gap-2"><UsersRound className="h-4 w-4 text-[#9a5b20]" aria-hidden="true" />Room override <span className="font-normal text-slate-500">(optional)</span></span><input id="bali-comparison-rooms" type="number" min="0" max="10" value={comparisonRoomOverride || ""} placeholder="Auto" onChange={(event) => setComparisonRoomOverride(Math.min(10, Math.max(0, Number(event.target.value) || 0)))} aria-describedby="bali-total-estimate-note" className="rounded-full border border-[#f0d3af] bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2" /></label>
              </div>
              <p id="bali-seasonal-estimate-note" className="mt-3 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-[#0D1B2A]">{seasonalEstimate.label}:</span> {seasonalEstimate.note} Estimated ranges below apply this supplied 2026 seasonal reference to the guide’s directional ranges; they are not live rates.</p>
              <p id="bali-total-estimate-note" className="mt-2 text-sm leading-relaxed text-slate-600">Total-stay estimates use {comparisonRoomOverride > 0 ? `${comparisonRoomOverride} specified hotel room${comparisonRoomOverride === 1 ? "" : "s"}` : "one room per two travelers"}, {comparisonTravelers} traveler{comparisonTravelers === 1 ? "" : "s"}, and {comparisonNights} night{comparisonNights === 1 ? "" : "s"}. Taxes, service, room configuration, and live availability can change final prices.</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Saved Bali area favorites">{sortedFavorites.map((key) => <li key={key} className="inline-flex overflow-hidden rounded-full border border-[#f0d3af] bg-white"><a href={baliBaseAreas[key].anchor} className="px-3 py-2 text-sm font-semibold text-[#0D1B2A] hover:text-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-inset">{baliBaseAreas[key].name}</a><button type="button" onClick={() => removeFavorite(key)} className="border-l border-[#f0d3af] px-2 text-[#9a5b20] hover:bg-[#F8EFE0] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-inset" aria-label={`Remove ${baliBaseAreas[key].name} from Favorites`}><Trash2 className="h-3.5 w-3.5" aria-hidden="true" /></button></li>)}</ul>
              {sortedFavorites.length === 0 && <p className="mt-4 text-sm text-slate-600">No saved areas match the selected traveller filter. Choose “All saved areas” to see your full list.</p>}
              {sortedFavorites.length >= 2 && <section id="bali-favorites-print-card" className="mt-5 border-t border-[#f0d3af] pt-5" aria-labelledby="bali-favorites-comparison-heading">
                <style>{`@media screen { .bali-comparison-print-only { display: none; } } @media print { body * { visibility: hidden !important; } #bali-favorites-print-card, #bali-favorites-print-card * { visibility: visible !important; } #bali-favorites-print-card { position: absolute; inset: 0; width: 100%; padding: 24px; border: 0; background: #fff; color: #0D1B2A; } #bali-favorites-print-card .bali-comparison-screen-actions, #bali-favorites-print-card .bali-comparison-screen-actions *, #bali-favorites-print-card .bali-comparison-availability, #bali-favorites-print-card .bali-comparison-availability * { display: none !important; } #bali-favorites-print-card .bali-comparison-print-only { display: block !important; } #bali-favorites-print-card .bali-comparison-card { break-inside: avoid; border-color: #cbd5e1; box-shadow: none; } }`}</style>
                <div className="bali-comparison-screen-actions flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div><p id="bali-favorites-comparison-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Compare saved areas</p><p className="mt-1 text-sm text-slate-600">Use the same guide-supported signals to weigh your top choices side by side.</p></div>
                  <div className="flex flex-wrap gap-2"><button type="button" onClick={downloadFavoritesComparison} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#9a5b20] bg-white px-4 py-2 text-sm font-semibold text-[#9a5b20] hover:bg-[#F8EFE0] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-offset-2"><Download className="h-4 w-4" aria-hidden="true" />Download text card</button><button type="button" onClick={downloadFavoritesComparisonPdf} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] hover:bg-[#eef8fb] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><Download className="h-4 w-4" aria-hidden="true" />Download PDF</button><button type="button" onClick={printFavoritesComparison} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243a52] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] focus:ring-offset-2"><Printer className="h-4 w-4" aria-hidden="true" />Print comparison</button></div>
                </div>
                <div className="bali-comparison-print-only"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">The Stay & Wander · Bali planning card</p><h3 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Saved Bali base comparison</h3><p className="mt-2 text-sm text-slate-700">{tripDate} · {seasonalEstimate.label} · {comparisonTravelers} traveler{comparisonTravelers === 1 ? "" : "s"} · {comparisonNights} night{comparisonNights === 1 ? "" : "s"} · {comparisonRoomOverride > 0 ? `${comparisonRoomOverride} specified room${comparisonRoomOverride === 1 ? "" : "s"}` : "one room per two travelers"}</p></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sortedFavorites.map((key) => {
                    const area = baliBaseAreas[key];
                    const estimate = buildBaliAreaSeasonalEstimate(area, tripDate);
                    const total = calculateBaliAreaTotalStayEstimate(area, tripDate, comparisonTravelers, comparisonNights, comparisonRoomOverride);
                    return <article key={area.key} className="bali-comparison-card rounded-xl border border-[#f0d3af] bg-white p-4">
                      <h4 className="font-playfair text-xl font-bold text-[#0D1B2A]">{area.name}</h4>
                      <p className="mt-1 text-sm font-semibold text-[#9a5b20]">{area.heading}</p>
                      <dl className="mt-4 space-y-3 text-sm">
                        <div><dt className="font-bold uppercase tracking-[0.1em] text-[11px] text-slate-500">Vibe</dt><dd className="mt-1 text-slate-700">{area.quickSummary}</dd></div>
                        <div><dt className="font-bold uppercase tracking-[0.1em] text-[11px] text-slate-500">Estimated seasonal range</dt><dd className="mt-1 text-slate-700">Budget {estimate.budget} · Mid-range {estimate.midRange} · Luxury from {estimate.luxuryFrom}</dd></div>
                        <div><dt className="font-bold uppercase tracking-[0.1em] text-[11px] text-slate-500">Total-stay estimate</dt><dd className="mt-1 text-slate-700">Budget {total.budget} · Mid-range {total.midRange} · Luxury from {total.luxuryFrom}<span className="mt-1 block text-xs text-slate-500">{total.rooms} {total.usingRoomOverride ? "specified" : "mid-range"} hotel room{total.rooms === 1 ? "" : "s"} × {total.nights} night{total.nights === 1 ? "" : "s"}</span></dd></div>
                        <div><dt className="font-bold uppercase tracking-[0.1em] text-[11px] text-slate-500">Highlights</dt><dd className="mt-1 text-slate-700">{area.localHighlights.join(" · ")}</dd></div>
                        <div><dt className="font-bold uppercase tracking-[0.1em] text-[11px] text-slate-500">Location</dt><dd className="mt-1 text-slate-700">{area.baliLocation}</dd></div>
                      </dl>
                      <a href={BALI_BASE_MATCHER_STAY22_URL} target="_blank" rel="sponsored nofollow" onClick={() => trackBaliMatcherEvent("bali_matcher_availability_clicked", { area: area.key, source: "favorite_comparison" })} className="bali-comparison-availability mt-4 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005c91] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">Check {area.name} availability <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
                    </article>;
                  })}
                </div>
              </section>}
            </> : <p className="mt-4 text-sm text-slate-600">No favorites saved yet. Use “Save to Favorites” to keep both matched areas here.</p>}
            {favoritesMessage && <p className="mt-3 text-sm font-medium text-slate-700">{favoritesMessage}</p>}
          </aside>
        </div>
      )}

      <aside className="mt-6 border-t border-[#cfe4ee] pt-5" aria-live="polite">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Saved area shortlist</p>
            <p className="mt-1 text-sm text-slate-600">Keep up to three area ideas on this device. Nothing is sent to the site or saved to an account.</p>
          </div>
          {shortlist.length > 0 && <button type="button" onClick={clearShortlist} className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-slate-600 underline-offset-4 hover:text-[#0D1B2A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><Trash2 className="h-4 w-4" aria-hidden="true" />Clear saved areas</button>}
        </div>
        {shortlist.length > 0 ? <ul className="mt-4 flex flex-wrap gap-2" aria-label="Saved Bali areas">{shortlist.map((key) => <li key={key}><a href={baliBaseAreas[key].anchor} className="inline-flex rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A] ring-1 ring-[#cfe4ee] hover:text-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">{baliBaseAreas[key].shortlistLabel}</a></li>)}</ul> : <p className="mt-4 text-sm text-slate-600">No areas saved yet.</p>}
        {shortlistMessage && <p className="mt-3 text-sm font-medium text-slate-700">{shortlistMessage}</p>}
      </aside>

      <Dialog open={Boolean(locationArea)} onOpenChange={(open) => { if (!open) setLocationArea(null); }}>
        {locationArea && <DialogContent className="border-[#9ed1e7] bg-white p-6 text-[#0D1B2A] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl font-bold text-[#0D1B2A]">{locationArea.name} in Bali</DialogTitle>
            <DialogDescription className="pt-1 leading-relaxed text-slate-600">{locationArea.locationContext}</DialogDescription>
          </DialogHeader>
          <div className="relative mt-2 h-48 overflow-hidden rounded-2xl border border-[#cfe4ee] bg-[#eef8fb]" aria-label={`Stylized Bali location guide showing ${locationArea.name}`}>
            <div className="absolute left-[12%] top-[14%] h-28 w-44 -rotate-[24deg] rounded-[48%_52%_44%_56%] border border-[#9ed1e7] bg-white/80" aria-hidden="true" />
            <span className="absolute right-5 top-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0077B6]">Bali · not to scale</span>
            <span className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#4a778e]">Indian Ocean</span>
            <div className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[#0077B6] px-2.5 py-1.5 text-xs font-bold text-white shadow-sm ${locationArea.markerClassName}`}><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{locationArea.name}</div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700">{locationArea.baliLocation}</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4ee] bg-[#eef8fb] px-4 py-2 text-sm font-semibold text-[#0077B6]"><MapPinned className="h-4 w-4" aria-hidden="true" />Location guide</span>
          </div>
        </DialogContent>}
      </Dialog>
    </section>
  );
}
