import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";

export type GuideSaveOption = {
  id: string;
  name: string;
  detail: string;
  href?: string;
};

type GuideSaveForLaterProps = {
  guideId: string;
  destination: string;
  options: readonly GuideSaveOption[];
};

function safeKey(guideId: string) {
  return `tsw-${guideId}-save-for-later`;
}

function readSaved(guideId: string, options: readonly GuideSaveOption[]) {
  try {
    const value = JSON.parse(window.localStorage.getItem(safeKey(guideId)) ?? "[]");
    if (!Array.isArray(value)) return [];
    const valid = new Set(options.map((option) => option.id));
    return Array.from(new Set(value.filter((id): id is string => typeof id === "string" && valid.has(id))));
  } catch {
    return [];
  }
}

export function GuideSaveForLater({ guideId, destination, options }: GuideSaveForLaterProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const savedOptions = useMemo(() => options.filter((option) => savedIds.includes(option.id)), [options, savedIds]);

  useEffect(() => {
    setSavedIds(readSaved(guideId, options));
    setStorageReady(true);
  }, [guideId]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      if (savedIds.length) window.localStorage.setItem(safeKey(guideId), JSON.stringify(savedIds));
      else window.localStorage.removeItem(safeKey(guideId));
    } catch {
      // The list remains usable in memory if storage is blocked or full.
    }
  }, [guideId, savedIds, storageReady]);

  const toggleSaved = (id: string) => {
    setSavedIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  };

  return (
    <section id={`${guideId}-save-for-later`} className="mt-12 scroll-mt-28 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby={`${guideId}-save-title`}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Plan your shortlist</p>
          <h2 id={`${guideId}-save-title`} className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Save {destination} areas for later</h2>
          <p className="mt-3 leading-relaxed text-slate-700">Bookmark the areas that fit your trip, then review the short summary below before you check live availability. This list stays in this browser only; no account, server persistence, or visitor tracking is used.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#0077B6] shadow-sm" aria-live="polite"><Bookmark className="h-4 w-4" aria-hidden="true" />{savedIds.length} saved</span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSaved = savedIds.includes(option.id);
          return (
            <article key={option.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-playfair text-xl font-bold text-[#0D1B2A]">{option.name}</h3>
                <button type="button" onClick={() => toggleSaved(option.id)} aria-pressed={isSaved} aria-label={`${isSaved ? "Remove" : "Save"} ${option.name} ${isSaved ? "from" : "for"} later`} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#cfe4ee] px-2.5 py-1 text-xs font-semibold text-[#0077B6] transition hover:bg-[#eef8fb] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#0077B6]">
                  {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" /> : <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />}{isSaved ? "Saved" : "Save"}
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{option.detail}</p>
              {option.href ? <a href={option.href} className="mt-3 inline-flex text-sm font-semibold text-[#0077B6] hover:underline">Read the area guide →</a> : null}
            </article>
          );
        })}
      </div>

      {savedOptions.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-[#F4A261]/50 bg-white p-5 shadow-sm" aria-labelledby={`${guideId}-saved-summary-title`}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 id={`${guideId}-saved-summary-title`} className="font-playfair text-2xl font-bold text-[#0D1B2A]">Your saved {destination} shortlist</h3>
              <p className="mt-1 text-sm text-slate-600">A quick browser-local summary for your next planning session.</p>
            </div>
            <button type="button" onClick={() => setSavedIds([])} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#0077B6]"><Trash2 className="h-4 w-4" aria-hidden="true" />Clear saved areas</button>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {savedOptions.map((option) => <li key={option.id} className="flex items-start justify-between gap-3 rounded-xl bg-[#f8fbfc] p-3"><span><strong className="text-[#0D1B2A]">{option.name}</strong><span className="mt-1 block text-sm text-slate-600">{option.detail}</span></span><button type="button" onClick={() => toggleSaved(option.id)} aria-label={`Remove ${option.name} from saved shortlist`} className="rounded-full p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#0077B6]"><Trash2 className="h-4 w-4" aria-hidden="true" /></button></li>)}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default GuideSaveForLater;
