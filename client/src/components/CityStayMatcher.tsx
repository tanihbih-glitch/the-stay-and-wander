import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Compass, Copy, Download, Heart, ListPlus, MapPin, Printer, QrCode, RotateCcw, Share2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapView } from "@/components/Map";

type TravelerFit = "solo" | "couples" | "families";
type FavoriteSort = "saved" | "vibe" | "cost";
type RoomType = "hostel" | "hotel" | "villa";
type Answers = { vibe: string; budget: string; duration: string };
type Range = readonly number[];

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
  verifiedRoomTypes?: readonly RoomType[];
  mapPoint?: { lat: number; lng: number };
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
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number;
  benchmark?: { sourceName: string; sourceUrl: string; asOf: string; scope: string; label?: string; updateNotice?: string };
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
  note: string;
  areaNotes: Record<string, string>;
};

type NoteTemplate = {
  id: string;
  name: string;
  text: string;
};

type ShareQr = {
  listName: string;
  dataUrl: string;
};

const ROOM_TYPES: Record<RoomType, { label: string; assumption: string }> = {
  hostel: { label: "Hostel / simple room", assumption: "Uses the guide's budget range" },
  hotel: { label: "Hotel room", assumption: "Uses this area's verified hotel range" },
  villa: { label: "Villa / resort", assumption: "Uses the guide's luxury-from reference" },
};
const FIT_LABELS: Record<TravelerFit, string> = { solo: "Solo travelers", couples: "Couples", families: "Families" };
const FAVORITE_LIMIT = 4;
const SHORTLIST_LIMIT = 3;
const LIST_LIMIT = 6;
const TEMPLATE_LIMIT = 8;
const REVEAL_MS = 1800;
const NOTE_TEMPLATES = [
  { id: "family", label: "Family vacation", text: "Family plan: confirm bedding, child-friendly transport, and quiet evening logistics." },
  { id: "solo", label: "Solo trip", text: "Solo plan: prioritise easy transit, well-lit routes, and the activities that matter most." },
] as const;

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
    const note = typeof list.note === "string" ? list.note.trim().slice(0, 600) : "";
    const areaNotes = Object.fromEntries(Object.entries(list.areaNotes ?? {}).flatMap(([key, areaNote]) => Boolean(getArea(config, key)) && typeof areaNote === "string" && areaNote.trim() ? [[key, areaNote.trim().slice(0, 400)]] : [])) as Record<string, string>;
    return [{ id: list.id, name, areaKeys, tripDate: /^2026-\d{2}-\d{2}$/.test(list.tripDate ?? "") ? list.tripDate! : "2026-07-15", travelers: Math.min(20, Math.max(1, Math.floor(list.travelers ?? 2))), nights: Math.min(30, Math.max(1, Math.floor(list.nights ?? 7))), roomOverride: Math.min(10, Math.max(0, Math.floor(list.roomOverride ?? 0))), roomTypes, note, areaNotes }];
  }).slice(0, LIST_LIMIT);
}

function parseLists(config: CityMatcherConfig, value: string | null) {
  try { return sanitizeLists(config, value ? JSON.parse(value) : []); } catch { return []; }
}

function sanitizeTemplates(value: unknown): NoteTemplate[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const template = item as Partial<NoteTemplate>;
    const name = typeof template.name === "string" ? template.name.trim().slice(0, 32) : "";
    const text = typeof template.text === "string" ? template.text.trim().slice(0, 300) : "";
    return name && text && typeof template.id === "string" && template.id ? [{ id: template.id, name, text }] : [];
  }).slice(0, TEMPLATE_LIMIT);
}

function parseTemplates(value: string | null) {
  try { return sanitizeTemplates(value ? JSON.parse(value) : []); } catch { return []; }
}

function formatRange(range: Range, multiplier: readonly [number, number], suffix = "/night") {
  const low = Math.round(range[0] * multiplier[0]);
  const high = Math.round(range[1] * multiplier[1]);
  return `$${low.toLocaleString()}–${high.toLocaleString()}${suffix}`;
}

function roomsFor(travelers: number, override: number) {
  return Math.max(1, Math.floor(override) || Math.ceil(Math.max(1, travelers) / 2));
}

function availableRoomTypes(area: CityMatcherArea): RoomType[] {
  return [...(area.verifiedRoomTypes ?? (area.tierRanges ? ["hostel", "hotel", "villa"] : []))];
}

function resolvedRoomType(area: CityMatcherArea, requested: RoomType): RoomType | null {
  const available = availableRoomTypes(area);
  return available.includes(requested) ? requested : available[0] ?? null;
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

function buildComparisonText(config: CityMatcherConfig, areaKeys: string[], tripDate: string, travelers: number, nights: number, roomOverride: number, roomTypes: Record<string, RoomType>, note = "", areaNotes: Record<string, string> = {}) {
  const seasonal = config.seasonal(tripDate);
  const areas = sanitizeAreaKeys(config, areaKeys, FAVORITE_LIMIT).map((key) => getArea(config, key)!).filter(Boolean);
  const lines = [`${config.city} base comparison — The Stay & Wander`, `Trip date planning reference: ${tripDate} · ${seasonal.label}.`, seasonal.note, config.supportsTierEstimates ? `Stay estimate: ${travelers} traveler${travelers === 1 ? "" : "s"} · ${nights} night${nights === 1 ? "" : "s"} · ${roomOverride ? `${roomOverride} specified room${roomOverride === 1 ? "" : "s"}` : "one hotel room per two travelers"}.` : `Room preferences are saved for comparison. ${config.tierNotice ?? "Localized room-tier benchmarks are pending."}`, config.benchmark ? `${config.benchmark.label ?? "Benchmark source"}: ${config.benchmark.sourceName}, ${config.benchmark.asOf}. ${config.benchmark.scope} ${config.benchmark.sourceUrl}` : "", config.benchmark?.updateNotice ?? "", note ? `Personal planning note: ${note}` : "", ""];
  areas.forEach((area) => {
    const preferred = resolvedRoomType(area, roomTypes[area.key] ?? "hotel");
    lines.push(`${area.name}`, `Vibe: ${area.heading}.`, `Estimated guide range: ${formatRange(area.baseRange, seasonal.multiplier)}.`, `Preferred stay type: ${preferred ? ROOM_TYPES[preferred].label : "No verified tier for this area"}.`);
    if (config.supportsTierEstimates && area.tierRanges && preferred) {
      const estimate = preferred === "villa" ? totalFrom(area.tierRanges.villaFrom, seasonal.multiplier, travelers, nights, roomOverride) : totalRange(area.tierRanges[preferred], seasonal.multiplier, travelers, nights, roomOverride);
      const publishedTiers = availableRoomTypes(area).map((type) => `${ROOM_TYPES[type].label}: ${type === "villa" ? totalFrom(area.tierRanges!.villaFrom, seasonal.multiplier, travelers, nights, roomOverride) : totalRange(area.tierRanges![type], seasonal.multiplier, travelers, nights, roomOverride)}`).join(" · ");
      lines.push(`Preferred stay estimate: ${estimate}.`, `Verified tiers for this area: ${publishedTiers}.`);
    } else lines.push("No verified tier-specific rate has been published for this area; use the guide range and check live availability.");
    lines.push(`Highlights: ${area.highlights.join("; ")}.`, areaNotes[area.key] ? `Area note: ${areaNotes[area.key]}` : "", "");
  });
  lines.push("Planning estimates only; confirm live availability and final prices before booking.", `https://thestayandwander.com${config.articleUrl}#${config.id}-base-matcher`);
  return lines.join("\n");
}

function encodeSharedList(config: CityMatcherConfig, list: SavedList) {
  const payload = JSON.stringify({ version: 1, city: config.id, name: list.name, areaKeys: list.areaKeys, tripDate: list.tripDate, travelers: list.travelers, nights: list.nights, roomOverride: list.roomOverride, roomTypes: list.roomTypes });
  const bytes = new TextEncoder().encode(payload);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decodeSharedList(config: CityMatcherConfig, encoded: string): SavedList | null {
  try {
    const binary = atob(encoded);
    const payload = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)))) as Partial<SavedList> & { version?: number; city?: string };
    if (payload.version !== 1 || payload.city !== config.id) return null;
    return sanitizeLists(config, [{ ...payload, id: `shared-${Date.now()}`, note: "", areaNotes: {} }])[0] ?? null;
  } catch { return null; }
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
  const [listNote, setListNote] = useState("");
  const [areaNotes, setAreaNotes] = useState<Record<string, string>>({});
  const [customTemplates, setCustomTemplates] = useState<NoteTemplate[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [templateText, setTemplateText] = useState("");
  const [message, setMessage] = useState("");
  const [copiedListId, setCopiedListId] = useState<string | null>(null);
  const [locationArea, setLocationArea] = useState<CityMatcherArea | null>(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [shareQr, setShareQr] = useState<ShareQr | null>(null);
  const recommendation = useMemo(() => getCityMatcherRecommendation(config, answers), [answers, config]);
  const seasonal = useMemo(() => config.seasonal(tripDate), [config, tripDate]);
  const visibleFavorites = useMemo(() => favorites.filter((key) => fit === "all" || getArea(config, key)?.bestFor.includes(fit)).sort((left, right) => favoriteSort === "saved" ? favorites.indexOf(left) - favorites.indexOf(right) : favoriteSort === "cost" ? (getArea(config, left)?.costRank ?? 0) - (getArea(config, right)?.costRank ?? 0) : (getArea(config, left)?.heading ?? "").localeCompare(getArea(config, right)?.heading ?? "")), [config, favoriteSort, favorites, fit]);

  useEffect(() => {
    setShortlist(parseAreaKeys(config, window.localStorage.getItem(storageKey(config, "shortlist")), SHORTLIST_LIMIT));
    setFavorites(parseAreaKeys(config, window.localStorage.getItem(storageKey(config, "favorites")), FAVORITE_LIMIT));
    setLists(parseLists(config, window.localStorage.getItem(storageKey(config, "comparison-lists"))));
    setCustomTemplates(parseTemplates(window.localStorage.getItem(storageKey(config, "note-templates"))));
    const loadSharedHash = () => {
      const encoded = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("list");
      const shared = encoded ? decodeSharedList(config, encoded) : null;
      if (shared) { setFavorites(shared.areaKeys); setTripDate(shared.tripDate); setTravelers(shared.travelers); setNights(shared.nights); setRoomOverride(shared.roomOverride); setRoomTypes(shared.roomTypes); setListName(shared.name); setAreaNotes({}); setMessage(`Shared list “${shared.name}” loaded. Personal notes are not included in share links.`); document.getElementById(`${config.id}-base-matcher`)?.scrollIntoView({ block: "start" }); }
    };
    loadSharedHash();
    window.addEventListener("hashchange", loadSharedHash);
    setStorageReady(true);
    return () => window.removeEventListener("hashchange", loadSharedHash);
  }, [config]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "shortlist"), JSON.stringify(shortlist)); }, [config, shortlist, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "favorites"), JSON.stringify(favorites)); }, [config, favorites, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "comparison-lists"), JSON.stringify(lists)); }, [config, lists, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem(storageKey(config, "note-templates"), JSON.stringify(customTemplates)); }, [config, customTemplates, storageReady]);

  const choose = (field: keyof Answers, value: string) => {
    const next = { ...answers, [field]: value };
    setAnswers(next);
    track(config, "option_selected", { field, value });
    if (field === "duration") { setIsLoading(true); track(config, "loading_started"); window.setTimeout(() => { setIsLoading(false); setStep(4); track(config, "completed", { primary: getCityMatcherRecommendation(config, next)?.primary.key ?? "" }); }, REVEAL_MS); }
    else setStep((current) => current + 1);
  };
  const saveFavorite = (key: string) => setFavorites((current) => current.includes(key) ? current : current.length >= FAVORITE_LIMIT ? current : [...current, key]);
  const saveShortlist = (key: string) => setShortlist((current) => current.includes(key) ? current : current.length >= SHORTLIST_LIMIT ? current : [...current, key]);
  const clearFavorites = () => {
    setFavorites([]);
    setRoomTypes({});
    setAreaNotes({});
    setClearConfirmOpen(false);
    setMessage("Saved favorites cleared. Your named comparison lists remain available on this device.");
    track(config, "favorites_cleared");
  };
  const copy = async () => {
    if (!recommendation) return;
    const text = shareSummary(config, recommendation.primary, recommendation.alternative);
    try { await navigator.clipboard?.writeText(text); setMessage("Result summary copied to your clipboard."); } catch { setMessage("Copy this result summary from the text shared in your browser."); }
    track(config, "results_shared");
  };
  const saveList = () => {
    const name = listName.trim().slice(0, 40);
    if (!name || !favorites.length) { setMessage("Save at least one favorite and enter a list name first."); return; }
    const list: SavedList = { id: `${Date.now()}-${name}`, name, areaKeys: favorites, tripDate, travelers, nights, roomOverride, roomTypes, note: listNote.trim().slice(0, 600), areaNotes };
    setLists((current) => [...current.filter((item) => item.name.toLowerCase() !== name.toLowerCase()), list].slice(-LIST_LIMIT));
    setListName(""); setListNote(""); setMessage(`“${name}” saved on this device.`); track(config, "comparison_list_saved");
  };
  const loadList = (list: SavedList) => { setFavorites(list.areaKeys); setTripDate(list.tripDate); setTravelers(list.travelers); setNights(list.nights); setRoomOverride(list.roomOverride); setRoomTypes(list.roomTypes); setListName(list.name); setListNote(list.note); setAreaNotes(list.areaNotes); setMessage(`“${list.name}” loaded.`); };
  const saveTemplate = () => {
    const name = templateName.trim().slice(0, 32);
    const text = templateText.trim().slice(0, 300);
    if (!name || !text) { setMessage("Enter both a template name and note text first."); return; }
    const template = { id: `${Date.now()}-${name}`, name, text };
    setCustomTemplates((current) => [...current.filter((item) => item.name.toLowerCase() !== name.toLowerCase()), template].slice(-TEMPLATE_LIMIT));
    setTemplateName(""); setTemplateText(""); setMessage(`“${name}” saved as a private note template on this device.`); track(config, "note_template_saved");
  };
  const buildShareUrl = (list: SavedList) => `${window.location.origin}${config.articleUrl}#${config.id}-base-matcher?list=${encodeURIComponent(encodeSharedList(config, list))}`;
  const shareList = async (list: SavedList) => {
    const url = buildShareUrl(list);
    const data = { title: `${config.city} stay comparison`, text: `Compare my ${config.city} stay ideas from The Stay & Wander. Private notes are not shared.`, url };
    try { if (navigator.share) { await navigator.share(data); setMessage("Share link ready to send to your travel companions."); } else { await navigator.clipboard?.writeText(url); setMessage("Share link copied to your clipboard."); } }
    catch { setMessage("Share link is ready—copy it from your browser address bar if the share sheet was closed."); }
    track(config, "comparison_list_shared");
  };
  const copyListLink = async (list: SavedList) => {
    const url = buildShareUrl(list);
    try {
      await navigator.clipboard?.writeText(url);
      setCopiedListId(list.id);
      setMessage("Share link copied to your clipboard.");
      window.setTimeout(() => setCopiedListId((current) => current === list.id ? null : current), 2400);
    } catch {
      setMessage("Copy the share link from your browser address bar if clipboard access is unavailable.");
    }
    track(config, "comparison_list_link_copied");
  };
  const showShareQr = async (list: SavedList) => {
    try {
      const { toDataURL } = await import("qrcode");
      const dataUrl = await toDataURL(buildShareUrl(list), { width: 256, margin: 1, errorCorrectionLevel: "M", color: { dark: "#0D1B2A", light: "#FFFFFFFF" } });
      setShareQr({ listName: list.name, dataUrl }); track(config, "comparison_list_qr_opened");
    } catch { setMessage("The QR code could not be created. Use Copy link to share this comparison instead."); }
  };
  const downloadText = () => {
    const blob = new Blob([buildComparisonText(config, visibleFavorites, tripDate, travelers, nights, roomOverride, roomTypes, listNote, areaNotes)], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${config.id}-stay-comparison.txt`; link.click(); URL.revokeObjectURL(link.href); track(config, "comparison_exported");
  };
  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf"); const doc = new jsPDF({ unit: "pt", format: "a4" });
    const text = buildComparisonText(config, visibleFavorites, tripDate, travelers, nights, roomOverride, roomTypes, listNote, areaNotes);
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

    <div className="mt-8 border-t border-[#0D1B2A]/15 pt-7" data-screen-controls><div className="flex items-center justify-between gap-4 print:hidden"><div><h3 className="font-playfair text-2xl font-bold text-[#0D1B2A]">Saved favorites</h3><p className="mt-1 text-sm text-slate-600">Saved only in this browser. Nothing is sent to an account.</p></div>{favorites.length > 0 && <button type="button" onClick={() => setClearConfirmOpen(true)} className="text-sm font-semibold text-[#0077B6]">Clear all favorites</button>}</div>
      {shortlist.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#0077B6]/15 bg-white/70 p-3 print:hidden"><span className="mr-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0077B6]">Saved area shortlist</span>{shortlist.map((key) => <span key={key} className="rounded-full bg-[#F8EFE0] px-3 py-1 text-sm font-semibold text-[#0D1B2A]">{getArea(config, key)?.name}</span>)}<button type="button" onClick={() => setShortlist([])} className="ml-auto text-sm font-semibold text-[#0077B6]">Clear shortlist</button></div>}
      <div className="mt-4 grid gap-3 md:grid-cols-3 print:hidden"><label className="text-sm font-semibold text-slate-700">Best for<select value={fit} onChange={(event) => setFit(event.target.value as TravelerFit | "all")} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5"><option value="all">All traveler types</option>{(Object.keys(FIT_LABELS) as TravelerFit[]).map((key) => <option key={key} value={key}>{FIT_LABELS[key]}</option>)}</select></label><label className="text-sm font-semibold text-slate-700">Sort favorites<select value={favoriteSort} onChange={(event) => setFavoriteSort(event.target.value as FavoriteSort)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5"><option value="saved">Saved order</option><option value="vibe">Vibe</option><option value="cost">Lower directional cost</option></select></label><label className="text-sm font-semibold text-slate-700">Trip date<select value={tripDate} onChange={(event) => setTripDate(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5">{[...Array(12)].map((_, month) => { const value = `2026-${String(month + 1).padStart(2, "0")}-15`; return <option key={value} value={value}>{new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</option>; })}</select></label></div>
      {config.supportsTierEstimates ? <div className="mt-3 grid gap-3 sm:grid-cols-3"><NumberInput label="Travelers" value={travelers} onChange={setTravelers} min={1} max={20} /><NumberInput label="Nights" value={nights} onChange={setNights} min={1} max={30} /><NumberInput label="Room override (optional)" value={roomOverride} onChange={setRoomOverride} min={0} max={10} /></div> : <p className="mt-4 rounded-lg bg-white/80 p-4 text-sm leading-relaxed text-slate-700"><strong>Room-type note:</strong> {config.tierNotice}</p>}
      {config.benchmark && <aside className="mt-4 rounded-lg border border-[#0077B6]/20 bg-white/75 p-4 text-sm leading-relaxed text-slate-700"><strong className="text-[#0D1B2A]">{config.benchmark.label ?? "Tier-estimate basis"}:</strong> {config.benchmark.scope} Rates were published as of {config.benchmark.asOf}; they are planning inputs, not live quotes. <a href={config.benchmark.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077B6] underline underline-offset-2">Read the benchmark source</a>.{config.benchmark.updateNotice && <span className="mt-2 block font-medium text-[#0D1B2A]">{config.benchmark.updateNotice}</span>}</aside>}
      <p className="mt-4 text-sm italic text-slate-600"><strong>{seasonal.label}:</strong> {seasonal.note} {config.supportsTierEstimates ? `Total-stay estimates use ${roomOverride ? `${roomOverride} specified room${roomOverride === 1 ? "" : "s"}` : "one hotel room per two travelers"} × ${nights} night${nights === 1 ? "" : "s"}.` : "The selected date updates the general guide range only."}</p>
      {favorites.length === 0 ? <p className="mt-5 rounded-xl bg-white p-5 text-sm text-slate-600">Complete a match, then use “Save to Favorites” to compare up to four area ideas.</p> : <><div className="mt-5 flex flex-wrap gap-2">{visibleFavorites.map((key) => { const area = getArea(config, key)!; return <span key={key} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#0D1B2A]">{area.name}<button type="button" aria-label={`Remove ${area.name}`} onClick={() => setFavorites((current) => current.filter((item) => item !== key))}><X className="h-4 w-4" /></button></span>; })}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2" data-screen-comparison>{displayAreas.map((area) => <ComparisonCard key={area.key} area={area} config={config} seasonal={seasonal} travelers={travelers} nights={nights} roomOverride={roomOverride} roomType={roomTypes[area.key] ?? "hotel"} areaNote={areaNotes[area.key] ?? ""} onRoomType={(value) => setRoomTypes((current) => ({ ...current, [area.key]: value }))} onAreaNote={(value) => setAreaNotes((current) => ({ ...current, [area.key]: value.slice(0, 400) }))} />)}</div>
      <SavedAreasMap config={config} areas={displayAreas} />
      {displayAreas.length > 1 && <div className="mt-6 rounded-xl bg-white p-5"><h4 className="font-playfair text-xl font-bold text-[#0D1B2A]">Named comparison lists</h4><div className="mt-3 grid gap-3"><input value={listName} onChange={(event) => setListName(event.target.value)} maxLength={40} placeholder="e.g., Family city break" className="min-w-0 rounded-lg border border-slate-300 px-3 py-2.5" /><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0077B6]">Note templates</span>{NOTE_TEMPLATES.map((template) => <button type="button" key={template.id} onClick={() => setListNote(template.text)} className="rounded-full border border-[#0077B6]/25 bg-[#F8EFE0] px-3 py-1.5 text-xs font-semibold text-[#0D1B2A]">{template.label}</button>)}</div><textarea value={listNote} onChange={(event) => setListNote(event.target.value.slice(0, 600))} maxLength={600} rows={3} aria-label="Personal planning note" placeholder="Optional private note for this comparison list" className="min-w-0 resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm" /><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{listNote.length}/600 characters · stored only in this browser.</p><button type="button" onClick={saveList} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-sm font-bold text-white"><ListPlus className="h-4 w-4" />Save list</button></div></div>{lists.length > 0 && <div className="mt-4 space-y-2">{lists.map((list) => <div key={list.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"><button type="button" onClick={() => loadList(list)} className="font-semibold text-[#0077B6]">{list.name}</button>{list.note && <span className="min-w-0 flex-1 truncate text-slate-600">{list.note}</span>}<button type="button" aria-label={`Share ${list.name}`} onClick={() => shareList(list)} className="inline-flex items-center gap-1 font-semibold text-[#0077B6]"><Share2 className="h-3.5 w-3.5" />Share</button><button type="button" aria-label={`Copy share link for ${list.name}`} onClick={() => copyListLink(list)} className="inline-flex items-center gap-1 font-semibold text-[#0077B6]"><Copy className="h-3.5 w-3.5" />{copiedListId === list.id ? "Link copied" : "Copy link"}</button><button type="button" aria-label={`Delete ${list.name}`} onClick={() => setLists((current) => current.filter((item) => item.id !== list.id))}><X className="h-3.5 w-3.5" /></button></div>)}</div>}<p className="mt-3 text-xs text-slate-500">Share links carry city, selected areas, dates, rooms, and room preferences in the browser URL fragment. List and area notes stay on your device.</p></div>}
      {displayAreas.length > 1 && <div className="mt-4 grid gap-4 rounded-xl border border-[#0077B6]/15 bg-[#F8EFE0]/60 p-4 print:hidden"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0077B6]">Your private templates</p><p className="mt-1 text-sm text-slate-600">Create reusable note prompts for future lists. They stay in this browser.</p></div><div className="flex flex-wrap gap-2">{customTemplates.map((template) => <span key={template.id} className="inline-flex items-center rounded-full border border-[#0077B6]/25 bg-white"><button type="button" onClick={() => setListNote(template.text)} className="px-3 py-1.5 text-xs font-semibold text-[#0D1B2A]">{template.name}</button><button type="button" aria-label={`Delete template ${template.name}`} onClick={() => setCustomTemplates((current) => current.filter((item) => item.id !== template.id))} className="border-l border-[#0077B6]/20 px-2 py-1.5 text-[#0077B6]"><X className="h-3 w-3" /></button></span>)}</div><div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]"><input value={templateName} onChange={(event) => setTemplateName(event.target.value.slice(0, 32))} maxLength={32} placeholder="Template name" aria-label="Custom template name" className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" /><input value={templateText} onChange={(event) => setTemplateText(event.target.value.slice(0, 300))} maxLength={300} placeholder="Reusable private note" aria-label="Custom template text" className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" /><button type="button" onClick={saveTemplate} className="rounded-lg border border-[#0077B6] bg-white px-3 py-2 text-sm font-bold text-[#0077B6]">Save template</button></div></div>}
      {lists.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden"><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0077B6]">Scan a saved list</span>{lists.map((list) => <button type="button" key={`qr-${list.id}`} aria-label={`Show QR code for ${list.name}`} onClick={() => showShareQr(list)} className="inline-flex items-center gap-1.5 rounded-full border border-[#0077B6]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#0077B6]"><QrCode className="h-3.5 w-3.5" />{list.name}</button>)}</div>}
      {displayAreas.length > 0 && <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={downloadText} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]"><Download className="h-4 w-4" />Download text card</button><button type="button" onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]">Download PDF</button><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-[#0077B6] bg-white px-4 py-2.5 text-sm font-bold text-[#0077B6]"><Printer className="h-4 w-4" />Print comparison</button></div>}</>}</div>
    {displayAreas.length > 0 && <div className="hidden print:block" data-print-comparison><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{config.city} saved-area comparison</h2><p className="mt-2 text-sm text-slate-700"><strong>{seasonal.label}:</strong> {seasonal.note}</p><p className="mt-2 text-sm text-slate-700">Planning estimates only. {config.supportsTierEstimates ? `${roomsFor(travelers, roomOverride)} room${roomsFor(travelers, roomOverride) === 1 ? "" : "s"} × ${nights} night${nights === 1 ? "" : "s"}.` : "Room type is a saved preference; localized tier benchmarks are pending."}</p><div className="mt-5 grid gap-4 grid-cols-2">{displayAreas.map((area) => <ComparisonCard key={`print-${area.key}`} area={area} config={config} seasonal={seasonal} travelers={travelers} nights={nights} roomOverride={roomOverride} roomType={roomTypes[area.key] ?? "hotel"} areaNote={areaNotes[area.key] ?? ""} onRoomType={() => undefined} onAreaNote={() => undefined} />)}</div></div>}
    <Dialog open={Boolean(locationArea)} onOpenChange={(open) => !open && setLocationArea(null)}><DialogContent className="max-w-lg"><DialogHeader><DialogTitle className="font-playfair text-2xl text-[#0D1B2A]">{locationArea?.name} in {config.city}</DialogTitle><DialogDescription>{locationArea?.location}</DialogDescription></DialogHeader>{locationArea && <div className="mt-4 rounded-xl bg-[#F8EFE0] p-6"><div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-[#0077B6]/40 bg-white"><MapPin className="h-10 w-10 text-[#F4A261]" /><span className="ml-3 text-sm font-bold text-[#0D1B2A]">{locationArea.location}</span></div><p className="mt-4 leading-relaxed text-slate-700">{locationArea.locationContext}</p></div>}</DialogContent></Dialog>
    <Dialog open={clearConfirmOpen} onOpenChange={setClearConfirmOpen}><DialogContent className="max-w-md"><DialogHeader><DialogTitle className="font-playfair text-2xl text-[#0D1B2A]">Clear saved favorites?</DialogTitle><DialogDescription>This removes your current favorite areas and unsaved area notes from this browser. Named comparison lists remain available.</DialogDescription></DialogHeader><div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setClearConfirmOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#0D1B2A]">Cancel</button><button type="button" onClick={clearFavorites} className="rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-sm font-bold text-white">Clear favorites</button></div></DialogContent></Dialog>
    <Dialog open={Boolean(shareQr)} onOpenChange={(open) => !open && setShareQr(null)}><DialogContent className="max-w-md"><DialogHeader><DialogTitle className="font-playfair text-2xl text-[#0D1B2A]">Scan comparison link</DialogTitle><DialogDescription>Open “{shareQr?.listName}” on another device. Private list and area notes are not included.</DialogDescription></DialogHeader>{shareQr && <div className="mt-5 flex justify-center rounded-xl bg-[#F8EFE0] p-5"><img src={shareQr.dataUrl} alt={`QR code for ${shareQr.listName} comparison link`} width={256} height={256} className="h-64 w-64 max-w-full rounded-lg bg-white p-2" /></div>}</DialogContent></Dialog>
  </section>;
}

function SavedAreasMap({ config, areas }: { config: CityMatcherConfig; areas: CityMatcherArea[] }) {
  const points = areas.map((area) => area.mapPoint ? { area, point: area.mapPoint } : null).filter((entry): entry is { area: CityMatcherArea; point: { lat: number; lng: number } } => Boolean(entry));
  const [selectedKey, setSelectedKey] = useState(points[0]?.area.key ?? "");
  useEffect(() => { if (!points.some(({ area }) => area.key === selectedKey)) setSelectedKey(points[0]?.area.key ?? ""); }, [points, selectedKey]);
  if (!points.length) return null;
  const latitudes = points.map(({ point }) => point.lat); const longitudes = points.map(({ point }) => point.lng);
  const north = Math.max(...latitudes); const south = Math.min(...latitudes); const west = Math.min(...longitudes); const east = Math.max(...longitudes);
  const selected = points.find(({ area }) => area.key === selectedKey)?.area ?? points[0].area;
  const positionFor = (point: { lat: number; lng: number }) => ({ left: `${16 + ((point.lng - west) / Math.max(0.0001, east - west)) * 68}%`, top: `${15 + ((north - point.lat) / Math.max(0.0001, north - south)) * 56}%` });

  return <div className="mt-6 overflow-hidden rounded-xl border border-[#0077B6]/20 bg-white print:hidden" data-area-map><div className="border-b border-[#0077B6]/15 px-5 py-4"><h4 className="font-playfair text-xl font-bold text-[#0D1B2A]">Saved-area map</h4><p className="mt-1 text-sm text-slate-600">A schematic city orientation map for comparing your saved areas. It does not use your location or send personal data anywhere.</p></div><div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_220px]"><div className="relative min-h-[280px] bg-[linear-gradient(135deg,#e0f2fe_0%,#f8efe0_100%)]" role="group" aria-label={`${config.city} saved area map`}><div className="absolute inset-5 rounded-[45%] border border-dashed border-[#0077B6]/25" aria-hidden="true" /><p className="absolute left-5 top-5 text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]/70">{config.city} orientation</p>{points.map(({ area, point }) => <button key={area.key} type="button" onClick={() => setSelectedKey(area.key)} aria-pressed={selected.key === area.key} className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white bg-[#0077B6] px-2.5 py-1.5 text-xs font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D1B2A]" style={positionFor(point)}><MapPin className="h-3.5 w-3.5" />{area.name}</button>)}</div><div className="border-t border-[#0077B6]/15 p-5 md:border-l md:border-t-0"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]">Selected area</p><h5 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{selected.name}</h5><p className="mt-2 text-sm font-semibold text-slate-700">{selected.location}</p><p className="mt-3 text-sm leading-relaxed text-slate-600">{selected.locationContext}</p></div></div></div>;
}

function ResultArea({ area, label, config, onFavorite, onShortlist, onLocate }: { area: CityMatcherArea; label: string; config: CityMatcherConfig; onFavorite: (key: string) => void; onShortlist: (key: string) => void; onLocate: (area: CityMatcherArea) => void }) {
  return <div className="rounded-xl bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0077B6]">{label}</p><div className="mt-2 flex items-start justify-between gap-4"><div><h3 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{area.name}</h3><p className="mt-2 font-semibold text-[#0D1B2A]">{area.heading}</p></div><button type="button" onClick={() => onLocate(area)} className="rounded-full bg-[#F8EFE0] p-2.5 text-[#0077B6]" aria-label={`Locate ${area.name}`}><MapPin className="h-5 w-5" /></button></div><p className="mt-4 text-sm leading-relaxed text-slate-700">{area.summary}</p><p className="mt-4 text-sm font-medium text-slate-600">{area.directionalPrice}</p><ul className="mt-4 space-y-1.5 text-sm text-slate-700">{area.highlights.map((highlight) => <li key={highlight}>• {highlight}</li>)}</ul><div className="mt-5 flex flex-wrap gap-3"><a href={area.anchor} className="font-semibold text-[#0077B6] underline underline-offset-2">Read {area.name} notes</a><button type="button" onClick={() => onShortlist(area.key)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077B6]"><Heart className="h-4 w-4" />Save {area.name}</button><button type="button" onClick={() => onFavorite(area.key)} className="text-sm font-semibold text-[#0077B6]">Save to Favorites</button></div><a href={config.availabilityUrl} target="_blank" rel="sponsored nofollow" onClick={() => track(config, "availability_clicked", { area: area.key })} className="mt-5 inline-flex rounded-lg bg-[#F4A261] px-4 py-2.5 text-sm font-bold text-[#0D1B2A]">Check {area.name} availability</a></div>;
}

function ComparisonCard({ area, config, seasonal, travelers, nights, roomOverride, roomType, areaNote, onRoomType, onAreaNote }: { area: CityMatcherArea; config: CityMatcherConfig; seasonal: CityMatcherSeasonalReference; travelers: number; nights: number; roomOverride: number; roomType: RoomType; areaNote: string; onRoomType: (value: RoomType) => void; onAreaNote: (value: string) => void }) {
  const tier = area.tierRanges;
  const roomTypes = area.verifiedRoomTypes ?? (tier ? ["hostel", "hotel", "villa"] as RoomType[] : []);
  const selectedType = roomTypes.includes(roomType) ? roomType : roomTypes[0] ?? "hotel";
  const rooms = roomsFor(travelers, roomOverride);
  const estimateFor = (type: RoomType) => {
    if (!tier || !roomTypes.includes(type)) return "No verified range published for this area and stay type.";
    return type === "villa" ? totalFrom(tier.villaFrom, seasonal.multiplier, travelers, nights, roomOverride) : totalRange(tier[type], seasonal.multiplier, travelers, nights, roomOverride);
  };
  return <article className="rounded-xl bg-white p-5 print:border print:border-slate-300">
    <h4 className="font-playfair text-2xl font-bold text-[#0D1B2A]">{area.name}</h4>
    <p className="mt-1 font-semibold text-slate-700">{area.heading}</p>
    <label className="mt-4 block text-sm font-semibold text-slate-700">Preferred stay type
      <select value={selectedType} onChange={(event) => onRoomType(event.target.value as RoomType)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5 print:hidden">
        {roomTypes.map((type) => <option key={type} value={type}>{ROOM_TYPES[type].label}</option>)}
      </select>
      <span className="hidden print:inline">{ROOM_TYPES[selectedType].label}</span>
    </label>
    {area.verifiedRoomTypes && <p className="mt-2 text-xs text-slate-500">Verified source coverage for this area: {roomTypes.map((type) => ROOM_TYPES[type].label).join(" · ")}.</p>}
    <p className="mt-4 text-sm leading-relaxed text-slate-700"><strong>Vibe:</strong> {area.summary}</p>
    <p className="mt-3 text-sm text-slate-700"><strong>Estimated seasonal range:</strong> {formatRange(area.baseRange, seasonal.multiplier)}</p>
    {config.supportsTierEstimates && tier ? <p className="mt-3 rounded-lg bg-[#F8EFE0] p-3 text-sm text-[#0D1B2A]"><strong>Preferred stay estimate:</strong> {estimateFor(selectedType)}<br /><span className="text-xs">{ROOM_TYPES[selectedType].assumption} · {rooms} room{rooms === 1 ? "" : "s"} × {nights} night{nights === 1 ? "" : "s"}. Unlisted tiers are intentionally not estimated for this area.</span></p> : <p className="mt-3 rounded-lg bg-[#F8EFE0] p-3 text-sm text-[#0D1B2A]"><strong>Room preference saved:</strong> {ROOM_TYPES[selectedType].label}. {config.tierNotice}</p>}
    <label className="mt-4 block text-sm font-semibold text-slate-700 print:hidden">Personal note for {area.name}
      <textarea value={areaNote} onChange={(event) => onAreaNote(event.target.value)} maxLength={400} rows={3} aria-label={`Personal note for ${area.name}`} placeholder="e.g., Quiet side street; close to our museum day" className="mt-1 block w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" />
      <span className="mt-1 block text-xs font-normal text-slate-500">{areaNote.length}/400 characters · saved only with this browser list.</span>
    </label>
    {areaNote && <p className="mt-3 hidden text-sm text-slate-700 print:block"><strong>Personal note:</strong> {areaNote}</p>}
    <p className="mt-3 text-sm text-slate-700"><strong>Highlights:</strong> {area.highlights.join(" · ")}</p>
    <p className="mt-3 text-sm text-slate-700"><strong>Location:</strong> {area.location}</p>
    <a href={config.availabilityUrl} target="_blank" rel="sponsored nofollow" onClick={() => track(config, "availability_clicked", { area: area.key, source: "comparison" })} className="mt-4 inline-flex rounded-lg border border-[#0077B6] px-3 py-2 text-sm font-bold text-[#0077B6] print:hidden">Check {area.name} availability</a>
  </article>;
}

function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number }) {
  return <label className="text-sm font-semibold text-slate-700">{label}<input aria-label={label} type="number" min={min} max={max} value={value} onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5" /></label>;
}
