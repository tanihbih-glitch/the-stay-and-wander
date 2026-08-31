import { useEffect, useMemo, useState } from "react";
import { Compass, Copy, Download, Heart, ListPlus, MapPin, Printer, RotateCcw, Share2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type TravelerFit = "solo" | "couples" | "families";
type FavoriteSort = "saved" | "vibe" | "cost";
type RoomType = "hostel" | "hotel" | "villa";
type Answers = { vibe: string; budget: string; duration: string };
type Range = readonly [number, number];

export type CityMatcherArea = {
  key: string;
  name: string;
  anchor: string;
  heading: string;
  summary: string;
  highlights: readonly string[];
  location: string;
  locationContext: string;
  directionalPrice: string;
  baseRange: Range;
  costRank: number;
  bestFor: readonly TravelerFit[];
  tierRanges?: { hostel: Range; hotel: Range; villaFrom: number };
};

export type CityMatcherSeasonalReference = {
  label: string;
  multiplier: readonly [number, number];
  note: string;
};

export type CityMatcherConfig = {
  id: "bangkok" | "seoul" | "tokyo";
  city: string;
  articleUrl: string;
  availabilityUrl: string;
  areas: readonly CityMatcherArea[];
  questions: readonly { field: keyof Answers; label: string; options: readonly { value: string; label: string }[] }[];
  scores: Record<keyof Answers, Record<string, Record<string, number>>>;
  seasonal: (tripDate: string) => CityMatcherSeasonalReference;
  supportsTierEstimates: boolean;
  tierNotice?: string;
};

type SavedList = {
  id: string;
  name: string;
  areaKeys: string[];
  tripDate: string;
  travelers: number;
  nights: number;
  roomOverride: number;
  roomTypes: Record<string, RoomType>;
};

const ROOM_TYPES: Record<RoomType, { label: string; assumption: string }> = {
  hostel: { label: "Hostel / simple room", assumption: "Uses the guide's budget range" },
  hotel: { label: "Mid-range hotel", assumption: "Uses the guide's mid-range range" },
  villa: { label: "Villa / resort", assumption: "Uses the guide's luxury-from reference" },
};
const FIT_LABELS: Record<TravelerFit, string> = { solo: "Solo travelers", couples: "Couples", families: "Families" };
const FAVORITE_LIMIT = 4;
const SHORTLIST_LIMIT = 3;
const LIST_LIMIT = 6;
const REVEAL_MS = 1800;

function storageKey(config: CityMatcherConfig, suffix: string) {
  return `tsw-${config.id}-base-${suffix}`;
}

function getArea(config: CityMatcherConfig, key: string) {
  return config.areas.find((area) => area.key === key);
}

function sanitizeAreaKeys(config: CityMatcherConfig, value: unknown, limit: number) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((key): key is string => typeof key === "string" && Boolean(getArea(config, key))))).slice(0, limit);
}

function parseAreaKeys(config: CityMatcherConfig, value: string | null, limit: number) {
  try { return sanitizeAreaKeys(config, value ? JSON.parse(value) : [], limit); } catch { return []; }
}

function sanitizeLists(config: CityMatcherConfig, value: unknown): SavedList[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const list = item as Partial<SavedList>;
    const name = typeof list.name === "string" ? list.name.trim().slice(0, 40) : "";
    const areaKeys = sanitizeAreaKeys(config, list.areaKeys, FAVORITE_LIMIT);
    if (!name || !areaKeys.length || typeof list.id !== "string" || !list.id) return [];
    const roomTypes = Object.fromEntries(Object.entries(list.roomTypes ?? {}).filter(([key, type]) => Boolean(getArea(config, key)) && ["hostel", "hotel", "villa"].includes(type as string))) as Record<string, RoomType>;
    return [{ id: list.id, name, areaKeys, tripDate: /^2026-\d{2}-\d{2}$/.test(list.tripDate ?? "") ? list.tripDate! : "2026-07-15", travelers: Math.min(20, Math.max(1, Math.floor(list.travelers ?? 2))), nights: Math.min(30, Math.max(1, Math.floor(list.nights ?? 7))), roomOverride: Math.min(10, Math.max(0, Math.floor(list.roomOverride ?? 0))), roomTypes }];
  }).slice(0, LIST_LIMIT);
}

function parseLists(config: CityMatcherConfig, value: string | null) {
  try { return sanitizeLists(config, value ? JSON.parse(value) : []); } catch { return []; }
}

function formatRange(range: Range, multiplier: readonly [number, number], suffix = "/night") {
  const low = Math.round(range[0] * multiplier[0]);
  const high = Math.round(range[1] * multiplier[1]);
  return `$${low.toLocaleString()}–${high.toLocaleString()}${suffix}`;
}

function roomsFor(travelers: number, override: number) {
  return Math.max(1, Math.floor(override) || Math.ceil(Math.max(1, travelers) / 2));
}

function totalRange(range: Range, multiplier: readonly [number, number], travelers: number, nights: number, roomOverride: number) {
  const rooms = roomsFor(travelers, roomOverride);
  const safeNights = Math.max(1, nights);
  return `$${Math.round(range[0] * multiplier[0] * rooms * safeNights).toLocaleString()}–$${Math.round(range[1] * multiplier[1] * rooms * safeNights).toLocaleString()} total`;
}

function totalFrom(amount: number, multiplier: readonly [number, number], travelers: number, nights: number, roomOverride: number) {
  return `$${Math.round(amount * multiplier[0] * roomsFor(travelers, roomOverride) * Math.max(1, nights)).toLocaleString()}+ total`;
}

export function getCityMatcherRecommendation(config: CityMatcherConfig, answers: Answers) {
  if (!answers.vibe || !answers.budget || !answers.duration) return null;
  const scored = config.areas.map((area, index) => ({ area, index, score: (config.scores.vibe[answers.vibe]?.[area.key] ?? 0) + (config.scores.budget[answers.budget]?.[area.key] ?? 0) + (config.scores.duration[answers.duration]?.[area.key] ?? 0) }))
    .sort((left, right) => right.score - left.score || left.index - right.index);
  return { primary: scored[0].area, alternative: scored[1].area };
}

function track(config: CityMatcherConfig, eventName: string, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.umami?.track?.(`${config.id}_matcher_${eventName}`, properties);
  window.dispatchEvent(new CustomEvent("tsw:city-matcher", { detail: { city: config.id, eventName, properties } }));
}

declare global { interface Window { umami?: { track?: (eventName: string, properties?: Record<string, string | number | boolean>) => void }; } }

function shareSummary(config: CityMatcherConfig, primary: CityMatcherArea, alternative: CityMatcherArea) {
  return [`My ${config.city} base ideas from The Stay & Wander`, `Primary area: ${primary.name} — ${primary.heading}.`, `Alternative area: ${alternative.name} — ${alternative.heading}.`, `Compare the full guide: https://thestayandwander.com${config.articleUrl}#${config.id}-base-matcher`].join("\n");
}

function buildComparisonText(config: CityMatcherConfig, areaKeys: string[], tripDate: string, travelers: number, nights: number, roomOverride: number, roomTypes: Record<string, RoomType>) {
  const seasonal = config.seasonal(tripDate);
  const areas = sanitizeAreaKeys(config, areaKeys, FAVORITE_LIMIT).map((key) => getArea(config, key)!).filter(Boolean);
  const lines = [`${config.city} base comparison — The Stay & Wander`, `Trip date planning reference: ${tripDate} · ${seasonal.label}.`, seasonal.note, config.supportsTierEstimates ? `Stay estimate: ${travelers} traveler${travelers === 1 ? "" : "s"} · ${nights} night${nights === 1 ? "" : "s"} · ${roomOverride ? `${roomOverride} specified room${roomOverride === 1 ? "" : "s"}` : "one hotel room per two travelers"}.` : `Room preferences are saved for comparison. ${config.tierNotice ?? "Localized room-tier benchmarks are pending."}`, ""];
  areas.forEach((area) => {
    const preferred = roomTypes[area.key] ?? "hotel";
    lines.push(`${area.name}`, `Vibe: ${area.heading}.`, `Estimated guide range: ${formatRange(area.baseRange, seasonal.multiplier)}.`, `Preferred stay type: ${ROOM_TYPES[preferred].label}.`);
    if (config.supportsTierEstimates && area.tierRanges) lines.push(`Preferred stay estimate: ${preferred === "villa" ? totalFrom(area.tierRanges.villaFrom, seasonal.multiplier, travelers, nights, roomOverride) : totalRange(area.tierRanges[preferred], seasonal.multiplier, travelers, nights, roomOverride)}.`, `Total stay estimate: Budget ${totalRange(area.tierRanges.hostel, seasonal.multiplier, travelers, nights, roomOverride)} · Mid-range ${totalRange(area.tierRanges.hotel, seasonal.multiplier, travelers, nights, roomOverride)} · Luxury from ${totalFrom(area.tierRanges.villaFrom, seasonal.multiplier, travelers, nights, roomOverride)}.`);
    else lines.push(config.tierNotice ?? "Localized room-tier rate breakdowns will update once verified benchmarks are finalized.");
    lines.push(`Highlights: ${area.highlights.join("; ")}.`, "");
  });
  lines.push("Planning estimates only; confirm live availability and final prices before booking.", `https://thestayandwander.com${config.articleUrl}#${config.id}-base-matcher`);
  return lines.join("\n");
}

export default function CityStayMatcher({ config }: { config: CityMatcherConfig }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ vibe: "", budget: "", duration: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [favoriteSort, setFavoriteSort] = useState<FavoriteSort>("saved");
  const [fit, setFit] = useState<TravelerFit | "all">("all");
  const [tripDate, setTripDate] = useState("2026-07-15");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(7);
  const [roomOverride, setRoomOverride] = useState(0);
  const [roomTypes, setRoomTypes] = useState<Record<string, RoomType>>({});
  const [lists, setLists] = useState<SavedList[]>([]);
  const [listName, setListName] = useState("");
  const [message, setMessage] = useState("");
  const [locationArea, setLocationArea] = useState<CityMatcherArea | null>(null);
  const recommendation = useMemo(() => getCityMatcherRecommendation(config, answers), [answers, config]);
  const seasonal = useMemo(() => config.seasonal(tripDate), [config, tripDate]);
  const visibleFavorites = useMemo(() => favorites.filter((key) => fit === "all" || getArea(config, key)?.bestFor.includes(fit)).sort((left, right) => favoriteSort === "saved" ? favorites.indexOf(left) - favorites.indexOf(right) : favoriteSort === "cost" ? (getArea(config, left)?.costRank ?? 0) - (getArea(config, right)?.costRank ?? 0) : (getArea(config, left)?.heading ?? "").localeCompare(getArea(config, right)?.heading ?? "")), [config, favoriteSort, favorites, fit]);

  useEffect(() => {
    setShortlist(parseAreaKeys(config, window.localStorage.getItem(storageKey(config, "shortlist")), SHORTLIST_LIMIT));
    setFavorites(parseAreaKeys(config, window.localStorage.getItem(storageKey(config, "favorites")), FAVORITE_LIMIT));
    setLists(parseLists(config, window.localStorage.getItem(storageKey(config, "comparison-lists"))));
    setStorageReady(true);
  }, [config]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "shortlist"), JSON.stringify(shortlist)); }, [config, shortlist, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "favorites"), JSON.stringify(favorites)); }, [config, favorites, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "comparison-lists"), JSON.stringify(lists)); }, [config, lists, storageReady]);

  const choose = (field: keyof Answers, value: string) => {
    const next = { ...answers, [field]: value };
    setAnswers(next);
    track(config, "option_selected", { field, value });
    if (field === "duration") { setIsLoading(true); track(config, "loading_started"); window.setTimeout(() => { setIsLoading(false); setStep(4); track(config, "completed", { primary: getCityMatcherRecommendation(config, next)?.primary.key ?? "" }); }, REVEAL_MS); }
    else setStep((current) => current + 1);
  };
  const saveFavorite = (key: string) => setFavorites((current) => current.includes(key) ? current : current.length >= FAVORITE_LIMIT ? current : [...current, key]);
  const saveShortlist = (key: string) => setShortlist((current) => current.includes(key) ? current : current.length >= SHORTLIST_LIMIT ? current : [...current, key]);
  const copy = async () => {
    if (!recommendation) return;
    const text = shareSummary(config, recommendation.primary, recommendation.alternative);
    try { await navigator.clipboard?.writeText(text); setMessage("Result summary copied to your clipboard."); } catch { setMessage("Copy this result summary from the text shared in your browser."); }
    track(config, "results_shared");
  };
  const saveList = () => {
    const name = listName.trim().slice(0, 40);
    if (!name || !favorites.length) { setMessage("Save at least one favorite and enter a list name first."); return; }
    const list: SavedList = { id: `${Date.now()}-${name}`, name, areaKeys: favorites, tripDate, travelers, nights, roomOverride, roomTypes };
    setLists((current) => [...current.filter((item) => item.name.toLowerCase() !== name.toLowerCase()), list].slice(-LIST_LIMIT));
    setListName(""); setMessage(`“${name}” saved on this device.`); track(config, "comparison_list_saved");
  };
  const loadList = (list: SavedList) => { setFavorites(list.areaKeys); setTripDate(list.tripDate); setTravelers(list.travelers); setNights(list.nights); setRoomOverride(list.roomOverride); setRoomTypes(list.roomTypes); setMessage(`“${list.name}” loaded.`); };
  const downloadText = () => {
    const blob = new Blob([buildComparisonText(config, visibleFavorites, tripDate, travelers, nights, roomOverride, roomTypes)], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${config.id}-stay-comparison.txt`; link.click(); URL.revokeObjectURL(link.href); track(config, "comparison_exported");
  };
  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf"); const doc = new jsPDF({ unit: "pt", format: "a4" });
    const text = buildComparisonText(config, visibleFavorites, tripDate, travelers, nights, roomOverride, roomTypes);
    doc.setFontSize(11); doc.text(doc.splitTextToSize(text, 500), 48, 56); doc.save(`${config.id}-stay-comparison.pdf`); setMessage("Your printable comparison PDF has downloaded."); track(config, "comparison_pdf_exported");
  };
  const restart = () => { setStep(1); setAnswers({ vibe: "", budget: "", duration: "" }); setMessage(""); };
  const activeQuestion = config.questions[step - 1];
  const displayAreas = visibleFavorites.map((key) => getArea(config, key)).filter((area): area is CityMatcherArea => Boolean(area));

  return <section id={`${config.id}-base-matcher`} className="mt-12 scroll-mt-24 rounded-2xl border border-[#0077B6]/20 bg-[#F8EFE0] p-5 sm:p-8 print:border-0 print:bg-white print:p-0">
    <style>{`@media print { body * { visibility: hidden; } #${config.id}-base-matcher, #${config.id}-base-matcher * { visibility: visible; } #${config.id}-base-matcher { position: absolute; inset: 0 auto auto 0; width: 100%; margin: 0; } #${config.id}-base-matcher [data-screen-controls] { display: none !important; } #${config.id}-base-matcher [data-print-comparison] { display: block !important; } }`}</style>
    <div className="flex flex-wrap items-start justify-between gap-4 print:hidden"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Interactive planning tool</p><h2 className="mt-1 font-playfair text-3xl font-bold text-[#0D1B2A]">{config.city} Base Matcher</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">Choose a trip rhythm, budget approach, and stay length. Results use the editorial area profiles in this guide—not live availability or an opaque match score.</p></div><div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0D1B2A]">Step {Math.min(step, 3)} of 3</div></div>
    <div className="mt-5 h-1.5 rounded-full bg-[#0D1B2A]/10 print:hidden"><div className="h-full rounded-full bg-[#F4A261]" style={{ width: `${Math.min(100, (step / 3) * 100)}%` }} /></div>
    {isLoading ? <div className="flex min-h-[260px] flex-col items-center justify-center text-center print:hidden" role="status"><Compass className="h-10 w-10 animate-spin text-[#0077B6] motion-reduce:animate-none" /><h3 className="mt-5 font-playfair text-2xl font-bold text-[#0D1B2A]">Finding your {config.city} rhythm</h3><p className="mt-2 text-slate-600">Matching your answers to the guide’s area profiles.</p></div> : step <= 3 && activeQuestion ? <div className="mt-8 print:hidden"><h3 className="font-playfair text-2xl font-bold text-[#0D1B2A]">{activeQuestion.label}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{activeQuestion.options.map((option) => <button type="button" key={option.value} onClick={() => choose(activeQuestion.field, option.value)} className="rounded-xl border border-[#0077B6]/25 bg-white px-5 py-4 text-left font-semibold text-[#0D1B2A] transition hover:border-[#0077B6] hover:bg-[#0077B6]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077B6]">{option.label}</button>)}</div></div> : recommendation ? <div className="mt-8 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 print:hidden">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0077B6]">Your guide-led match</p><div className="mt-3 grid gap-5 md:grid-cols-2"><ResultArea area={recommendation.primary} label="Primary area" config={config} onFavorite={saveFavorite} onShortlist={saveShortlist} onLocate={setLocationArea} /><ResultArea area={recommendation.alternative} label="Alternative area" config={config} onFavorite={saveFavorite} onShortlist={saveShortlist} onLocate={setLocationArea} /></div>
      <div className="mt-5 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg bg-[#0077B6] px-4 py-2.5 text-sm font-bold text-white"><Copy className="h-4 w-4" />Share Results</button><a href={`https://wa.me/?text=${encodeURIComponent(shareSummary(config, recommendation.primary, recommendation.alternative))}`} target="_blank" rel="noopener noreferrer" onClick={() => track(config, "social_share_opened", { platform: "whatsapp" })} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]">WhatsApp</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareSummary(config, recommendation.primary, recommendation.alternative))}`} target="_blank" rel="noopener noreferrer" onClick={() => track(config, "social_share_opened", { platform: "x" })} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]">Share on X</a><button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-[#0D1B2A]"><RotateCcw className="h-4 w-4" />Start Over</button></div>{message && <p className="mt-3 text-sm font-medium text-[#0077B6]" aria-live="polite">{message}</p>}
    </div> : null}

    <div className="mt-8 border-t border-[#0D1B2A]/15 pt-7" data-screen-controls><div className="flex items-center justify-between gap-4 print:hidden"><div><h3 className="font-playfair text-2xl font-bold text-[#0D1B2A]">Saved favorites</h3><p className="mt-1 text-sm text-slate-600">Saved only in this browser. Nothing is sent to an account.</p></div>{favorites.length > 0 && <button type="button" onClick={() => setFavorites([])} className="text-sm font-semibold text-[#0077B6]">Clear favorites</button>}</div>
      {shortlist.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#0077B6]/15 bg-white/70 p-3 print:hidden"><span className="mr-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0077B6]">Saved area shortlist</span>{shortlist.map((key) => <span key={key} className="rounded-full bg-[#F8EFE0] px-3 py-1 text-sm font-semibold text-[#0D1B2A]">{getArea(config, key)?.name}</span>)}<button type="button" onClick={() => setShortlist([])} className="ml-auto text-sm font-semibold text-[#0077B6]">Clear shortlist</button></div>}
      <div className="mt-4 grid gap-3 md:grid-cols-3 print:hidden"><label className="text-sm font-semibold text-slate-700">Best for<select value={fit} onChange={(event) => setFit(event.target.value as TravelerFit | "all")} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5"><option value="all">All traveler types</option>{(Object.keys(FIT_LABELS) as TravelerFit[]).map((key) => <option key={key} value={key}>{FIT_LABELS[key]}</option>)}</select></label><label className="text-sm font-semibold text-slate-700">Sort favorites<select value={favoriteSort} onChange={(event) => setFavoriteSort(event.target.value as FavoriteSort)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5"><option value="saved">Saved order</option><option value="vibe">Vibe</option><option value="cost">Lower directional cost</option></select></label><label className="text-sm font-semibold text-slate-700">Trip date<select value={tripDate} onChange={(event) => setTripDate(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5">{[...Array(12)].map((_, month) => { const value = `2026-${String(month + 1).padStart(2, "0")}-15`; return <option key={value} value={value}>{new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</option>; })}</select></label></div>
      {config.supportsTierEstimates ? <div className="mt-3 grid gap-3 sm:grid-cols-3"><NumberInput label="Travelers" value={travelers} onChange={setTravelers} min={1} max={20} /><NumberInput label="Nights" value={nights} onChange={setNights} min={1} max={30} /><NumberInput label="Room override (optional)" value={roomOverride} onChange={setRoomOverride} min={0} max={10} /></div> : <p className="mt-4 rounded-lg bg-white/80 p-4 text-sm leading-relaxed text-slate-700"><strong>Room-type note:</strong> {config.tierNotice}</p>}
      <p className="mt-4 text-sm italic text-slate-600"><strong>{seasonal.label}:</strong> {seasonal.note} {config.supportsTierEstimates ? `Total-stay estimates use ${roomOverride ? `${roomOverride} specified room${roomOverride === 1 ? "" : "s"}` : "one hotel room per two travelers"} × ${nights} night${nights === 1 ? "" : "s"}.` : "The selected date updates the general guide range only."}</p>
      {favorites.length === 0 ? <p className="mt-5 rounded-xl bg-white p-5 text-sm text-slate-600">Complete a match, then use “Save to Favorites” to compare up to four area ideas.</p> : <><div className="mt-5 flex flex-wrap gap-2">{visibleFavorites.map((key) => { const area = getArea(config, key)!; return <span key={key} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A]">{area.name}<button type="button" aria-label={`Remove ${area.name}`} onClick={() => setFavorites((current) => current.filter((item) => item !== key))}><X className="h-4 w-4" /></button></span>; })}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2" data-screen-comparison>{displayAreas.map((area) => <ComparisonCard key={area.key} area={area} config={config} seasonal={seasonal} travelers={travelers} nights={nights} roomOverride={roomOverride} roomType={roomTypes[area.key] ?? "hotel"} onRoomType={(value) => setRoomTypes((current) => ({ ...current, [area.key]: value }))} />)}</div>
      {displayAreas.length > 1 && <div className="mt-6 rounded-xl bg-white p-5"><h4 className="font-playfair text-xl font-bold text-[#0D1B2A]">Named comparison lists</h4><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input value={listName} onChange={(event) => setListName(event.target.value)} maxLength={40} placeholder="e.g., Family city break" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5" /><button type="button" onClick={saveList} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-sm font-bold text-white"><ListPlus className="h-4 w-4" />Save list</button></div>{lists.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{lists.map((list) => <span key={list.id} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm"><button type="button" onClick={() => loadList(list)} className="font-semibold text-[#0077B6]">{list.name}</button><button type="button" aria-label={`Delete ${list.name}`} onClick={() => setLists((current) => current.filter((item) => item.id !== list.id))}><X className="h-3.5 w-3.5" /></button></span>)}</div>}</div>}
      {displayAreas.length > 0 && <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={downloadText} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]"><Download className="h-4 w-4" />Download text card</button><button type="button" onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]">Download PDF</button><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]"><Printer className="h-4 w-4" />Print comparison</button></div>}</>}</div>
    {displayAreas.length > 0 && <div className="hidden print:block" data-print-comparison><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{config.city} saved-area comparison</h2><p className="mt-2 text-sm text-slate-700"><strong>{seasonal.label}:</strong> {seasonal.note}</p><p className="mt-2 text-sm text-slate-700">Planning estimates only. {config.supportsTierEstimates ? `${roomsFor(travelers, roomOverride)} room${roomsFor(travelers, roomOverride) === 1 ? "" : "s"} × ${nights} night${nights === 1 ? "" : "s"}.` : "Room type is a saved preference; localized tier benchmarks are pending."}</p><div className="mt-5 grid gap-4 grid-cols-2">{displayAreas.map((area) => <ComparisonCard key={`print-${area.key}`} area={area} config={config} seasonal={seasonal} travelers={travelers} nights={nights} roomOverride={roomOverride} roomType={roomTypes[area.key] ?? "hotel"} onRoomType={() => undefined} />)}</div></div>}
    <Dialog open={Boolean(locationArea)} onOpenChange={(open) => !open && setLocationArea(null)}><DialogContent className="max-w-lg"><DialogHeader><DialogTitle className="font-playfair text-2xl text-[#0D1B2A]">{locationArea?.name} in {config.city}</DialogTitle><DialogDescription>{locationArea?.location}</DialogDescription></DialogHeader>{locationArea && <div className="mt-4 rounded-xl bg-[#F8EFE0] p-6"><div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-[#0077B6]/40 bg-white"><MapPin className="h-10 w-10 text-[#F4A261]" /><span className="ml-3 text-sm font-bold text-[#0D1B2A]">{locationArea.location}</span></div><p className="mt-4 leading-relaxed text-slate-700">{locationArea.locationContext}</p></div>}</DialogContent></Dialog>
  </section>;
}

function ResultArea({ area, label, config, onFavorite, onShortlist, onLocate }: { area: CityMatcherArea; label: string; config: CityMatcherConfig; onFavorite: (key: string) => void; onShortlist: (key: string) => void; onLocate: (area: CityMatcherArea) => void }) {
  return <div className="rounded-xl bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0077B6]">{label}</p><div className="mt-2 flex items-start justify-between gap-4"><div><h3 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{area.name}</h3><p className="mt-2 font-semibold text-[#0D1B2A]">{area.heading}</p></div><button type="button" onClick={() => onLocate(area)} className="rounded-full bg-[#F8EFE0] p-2.5 text-[#0077B6]" aria-label={`Locate ${area.name}`}><MapPin className="h-5 w-5" /></button></div><p className="mt-4 text-sm leading-relaxed text-slate-700">{area.summary}</p><p className="mt-4 text-sm font-medium text-slate-600">{area.directionalPrice}</p><ul className="mt-4 space-y-1.5 text-sm text-slate-700">{area.highlights.map((highlight) => <li key={highlight}>• {highlight}</li>)}</ul><div className="mt-5 flex flex-wrap gap-3"><a href={area.anchor} className="font-semibold text-[#0077B6] underline underline-offset-2">Read {area.name} notes</a><button type="button" onClick={() => onShortlist(area.key)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077B6]"><Heart className="h-4 w-4" />Save {area.name}</button><button type="button" onClick={() => onFavorite(area.key)} className="text-sm font-semibold text-[#0077B6]">Save to Favorites</button></div><a href={config.availabilityUrl} target="_blank" rel="sponsored nofollow" onClick={() => track(config, "availability_clicked", { area: area.key })} className="mt-5 inline-flex rounded-lg bg-[#F4A261] px-4 py-2.5 text-sm font-bold text-[#0D1B2A]">Check {area.name} availability</a></div>;
}

function ComparisonCard({ area, config, seasonal, travelers, nights, roomOverride, roomType, onRoomType }: { area: CityMatcherArea; config: CityMatcherConfig; seasonal: CityMatcherSeasonalReference; travelers: number; nights: number; roomOverride: number; roomType: RoomType; onRoomType: (value: RoomType) => void }) {
  const tier = area.tierRanges; const rooms = roomsFor(travelers, roomOverride);
  return <article className="rounded-xl bg-white p-5 print:border print:border-slate-300"><h4 className="font-playfair text-2xl font-bold text-[#0D1B2A]">{area.name}</h4><p className="mt-1 font-semibold text-slate-700">{area.heading}</p><label className="mt-4 block text-sm font-semibold text-slate-700">Preferred stay type<select value={roomType} onChange={(event) => onRoomType(event.target.value as RoomType)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5 print:hidden"><option value="hostel">Hostel / simple room</option><option value="hotel">Mid-range hotel</option><option value="villa">Villa / resort</option></select><span className="hidden print:inline">{ROOM_TYPES[roomType].label}</span></label><p className="mt-4 text-sm leading-relaxed text-slate-700"><strong>Vibe:</strong> {area.summary}</p><p className="mt-3 text-sm text-slate-700"><strong>Estimated seasonal range:</strong> {formatRange(area.baseRange, seasonal.multiplier)}</p>{config.supportsTierEstimates && tier ? <><p className="mt-3 text-sm text-slate-700"><strong>Total-stay estimate:</strong> Budget {totalRange(tier.hostel, seasonal.multiplier, travelers, nights, roomOverride)} · Mid-range {totalRange(tier.hotel, seasonal.multiplier, travelers, nights, roomOverride)} · Luxury from {totalFrom(tier.villaFrom, seasonal.multiplier, travelers, nights, roomOverride)}.</p><p className="mt-3 rounded-lg bg-[#F8EFE0] p-3 text-sm text-[#0D1B2A]"><strong>Preferred stay estimate:</strong> {roomType === "villa" ? totalFrom(tier.villaFrom, seasonal.multiplier, travelers, nights, roomOverride) : totalRange(tier[roomType], seasonal.multiplier, travelers, nights, roomOverride)}<br /><span className="text-xs">{ROOM_TYPES[roomType].assumption} · {rooms} room{rooms === 1 ? "" : "s"} × {nights} night{nights === 1 ? "" : "s"}.</span></p></> : <p className="mt-3 rounded-lg bg-[#F8EFE0] p-3 text-sm text-[#0D1B2A]"><strong>Room preference saved:</strong> {ROOM_TYPES[roomType].label}. {config.tierNotice}</p>}<p className="mt-3 text-sm text-slate-700"><strong>Highlights:</strong> {area.highlights.join(" · ")}</p><p className="mt-3 text-sm text-slate-700"><strong>Location:</strong> {area.location}</p><a href={config.availabilityUrl} target="_blank" rel="sponsored nofollow" onClick={() => track(config, "availability_clicked", { area: area.key, source: "comparison" })} className="mt-4 inline-flex rounded-lg border border-[#0077B6] px-3 py-2 text-sm font-bold text-[#0077B6] print:hidden">Check {area.name} availability</a></article>;
}

function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number }) {
  return <label className="text-sm font-semibold text-slate-700">{label}<input aria-label={label} type="number" min={min} max={max} value={value} onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5" /></label>;
}
