import { Compass, ExternalLink, MapPin, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DEALS_AFFILIATE_LINKS } from "@/lib/affiliateLinks";

export const BALI_MATCHER_SHORTLIST_KEY = "tsw-bali-base-shortlist";
export const BALI_MATCHER_SHORTLIST_LIMIT = 3;
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
  | "bali_matcher_availability_clicked";

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
  },
  ubud: {
    key: "ubud",
    name: "Ubud",
    anchor: "#ubud",
    heading: "Culture, rice terraces, and a slower inland rhythm",
    dynamics: "A strong base for temples, cafés, wellness, and lush surroundings when cultural experiences and a calmer pace matter more than beach access.",
    directionalPrice: "Typical guide range: $30–60 budget · $75–130 mid-range · $180+ luxury per night.",
    shortlistLabel: "Ubud — culture and wellness",
  },
  uluwatu: {
    key: "uluwatu",
    name: "Uluwatu",
    anchor: "#uluwatu",
    heading: "Cliffs, surf, and self-contained resort time",
    dynamics: "A Bukit coast base for clifftop sunsets, surf beaches, and slower resort days; build in more transport time for island-wide sightseeing.",
    directionalPrice: "Typical guide range: $50–90 budget · $100–180 mid-range · $250+ luxury per night.",
    shortlistLabel: "Uluwatu — cliffs and surf",
  },
  canggu: {
    key: "canggu",
    name: "Canggu",
    anchor: "#canggu",
    heading: "Cafés, surf, and a longer-stay feel",
    dynamics: "A social remote-work and café rhythm with surf access and an energetic, less polished feel; a central location can help with traffic on longer stays.",
    directionalPrice: "Typical guide range: $35–65 budget · $70–140 mid-range · $190+ luxury per night.",
    shortlistLabel: "Canggu — cafés and longer stays",
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

export function sanitizeBaliBaseShortlist(value: unknown): AreaKey[] {
  if (!Array.isArray(value)) return [];

  return value.filter((key): key is AreaKey => typeof key === "string" && key in baliBaseAreas).slice(0, BALI_MATCHER_SHORTLIST_LIMIT);
}

function parseShortlist(value: string | null): AreaKey[] {
  if (!value) return [];

  try {
    return sanitizeBaliBaseShortlist(JSON.parse(value));
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

  const recommendation = useMemo(() => getBaliBaseRecommendation(answers), [answers]);
  const activeQuestion = matcherQuestions[step - 1];

  useEffect(() => {
    setShortlist(parseShortlist(window.localStorage.getItem(BALI_MATCHER_SHORTLIST_KEY)));
    setShortlistReady(true);
  }, []);

  useEffect(() => {
    if (!shortlistReady) return;
    if (shortlist.length) window.localStorage.setItem(BALI_MATCHER_SHORTLIST_KEY, JSON.stringify(shortlist));
    else window.localStorage.removeItem(BALI_MATCHER_SHORTLIST_KEY);
  }, [shortlist, shortlistReady]);

  const selectAnswer = (field: keyof BaliMatcherAnswers, value: string) => {
    const updatedAnswers = { ...answers, [field]: value } as BaliMatcherAnswers;
    const isFirstSelection = !answers.vibe && field === "vibe";
    setAnswers(updatedAnswers);
    setShortlistMessage("");

    if (isFirstSelection) trackBaliMatcherEvent("bali_matcher_started");
    trackBaliMatcherEvent("bali_matcher_option_selected", { step, option: value });

    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    const result = getBaliBaseRecommendation(updatedAnswers);
    if (result) trackBaliMatcherEvent("bali_matcher_completed", { area: result.primary.key });
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

  const resetMatcher = () => {
    setAnswers({ vibe: "", budget: "", duration: "" });
    setStep(1);
    setShortlistMessage("");
  };

  const clearShortlist = () => {
    setShortlist([]);
    setShortlistMessage("Saved areas cleared from this browser.");
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
        <span className="self-start rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]">{step <= 3 ? `Step ${step} of 3` : "Your result"}</span>
      </div>

      {step <= 3 && activeQuestion && (
        <div className="mt-6">
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

      {step === 4 && recommendation && (
        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-[#9ed1e7] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Your suggested base</p>
                <h3 className="mt-2 flex items-center gap-2 font-playfair text-3xl font-bold text-[#0D1B2A]"><MapPin className="h-6 w-6 text-[#0077B6]" aria-hidden="true" />{recommendation.primary.name}</h3>
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
            <button type="button" onClick={resetMatcher} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" aria-hidden="true" />Retake matcher</button>
          </div>
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
    </section>
  );
}
