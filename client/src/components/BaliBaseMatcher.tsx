import { AtSign, Compass, ExternalLink, Heart, MapPinned, MapPin, MessageCircle, Plus, RotateCcw, Share2, Trash2 } from "lucide-react";
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
  directionalPrice: string;
  shortlistLabel: string;
  baliLocation: string;
  locationContext: string;
  markerClassName: string;
};

export type BaliMatcherRecommendation = {
  primary: BaliBaseArea;
  alternative: BaliBaseArea;
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
  | "bali_matcher_favorite_saved";

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
    directionalPrice: "Typical guide range: $40–70 budget · $80–150 mid-range · $200+ luxury per night.",
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
    directionalPrice: "Typical guide range: $30–60 budget · $75–130 mid-range · $180+ luxury per night.",
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
    directionalPrice: "Typical guide range: $50–90 budget · $100–180 mid-range · $250+ luxury per night.",
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
    directionalPrice: "Typical guide range: $35–65 budget · $70–140 mid-range · $190+ luxury per night.",
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
  const [isRestarting, setIsRestarting] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [locationArea, setLocationArea] = useState<BaliBaseArea | null>(null);

  const recommendation = useMemo(() => getBaliBaseRecommendation(answers), [answers]);
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
            <p className="mt-4 text-sm leading-relaxed text-slate-600">For a different trip rhythm, compare <strong>{recommendation.alternative.name}</strong> too: {recommendation.alternative.heading.toLowerCase()}.</p>
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
            {favorites.length > 0 ? <ul className="mt-4 flex flex-wrap gap-2" aria-label="Saved Bali area favorites">{favorites.map((key) => <li key={key} className="inline-flex overflow-hidden rounded-full border border-[#f0d3af] bg-white"><a href={baliBaseAreas[key].anchor} className="px-3 py-2 text-sm font-semibold text-[#0D1B2A] hover:text-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-inset">{baliBaseAreas[key].name}</a><button type="button" onClick={() => removeFavorite(key)} className="border-l border-[#f0d3af] px-2 text-[#9a5b20] hover:bg-[#F8EFE0] focus:outline-none focus:ring-2 focus:ring-[#9a5b20] focus:ring-inset" aria-label={`Remove ${baliBaseAreas[key].name} from Favorites`}><Trash2 className="h-3.5 w-3.5" aria-hidden="true" /></button></li>)}</ul> : <p className="mt-4 text-sm text-slate-600">No favorites saved yet. Use “Save to Favorites” to keep both matched areas here.</p>}
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
