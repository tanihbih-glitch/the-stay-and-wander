import { Check, RotateCcw, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";

export const SEOUL_FOOD_PLAN_STORAGE_KEY = "stay-wander-seoul-food-plan-v1";

export const seoulFoodPlanItems = [
  { id: "gwangjang", label: "Gwangjang Market breakfast", detail: "Jongno · market pancakes, gimbap, or knife-cut noodles" },
  { id: "mangwon", label: "Mangwon Market snack stop", detail: "Mapo-gu · Dakgangjeong and Kkwabaegi" },
  { id: "myeongdong-kyoja", label: "Myeongdong Kyoja comfort meal", detail: "Myeongdong · Kalguksu and Mandu" },
  { id: "hongdae-bbq", label: "Hongdae or Sinchon BBQ dinner", detail: "Hongdae & Sinchon · student-friendly social dining" },
  { id: "seongsu-cafe", label: "Seongsu-dong café and pastry break", detail: "Seongsu-dong · warehouse roastery or flagship bakery" },
  { id: "gangnam-finale", label: "Gangnam or Cheongdam finale", detail: "Gangnam & Cheongdam · Hanwoo, modern Korean, or a concept café" },
  { id: "nightlife", label: "One Seoul nightlife stop", detail: "Hongdae, Itaewon, or Gangnam · choose a budget that suits the evening" },
] as const;

/** Saves a reader's selections on their current device without requiring an account. */
export default function SeoulFoodPlanChecklist() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SEOUL_FOOD_PLAN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSelected(parsed.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      // A private browser or disabled storage still leaves the checklist usable for this visit.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(SEOUL_FOOD_PLAN_STORAGE_KEY, JSON.stringify(selected)); } catch { /* no persistent storage available */ }
  }, [selected, hydrated]);

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const reset = () => setSelected([]);

  return (
    <section className="mt-14 rounded-3xl border border-[#d5eaf5] bg-[#f4fbff] p-6 md:p-8" aria-labelledby="food-plan-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Save your Seoul food plan</p><h2 id="food-plan-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A]">Build a practical list for your trip</h2><p className="mt-3 max-w-2xl leading-relaxed text-slate-700">Select cafes, markets, meals, and nightlife stops to keep a lightweight Seoul plan on this device. It saves locally in your browser and does not require an account.</p></div><button type="button" onClick={reset} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0077B6]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-[#eaf7fd] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" />Clear plan</button></div>
      <p className="mt-5 text-sm font-semibold text-[#0D1B2A]}" aria-live="polite">{selected.length} of {seoulFoodPlanItems.length} stops saved</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">{seoulFoodPlanItems.map((item) => { const checked = selected.includes(item.id); return <li key={item.id}><button type="button" onClick={() => toggle(item.id)} aria-pressed={checked} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2 ${checked ? "border-[#0077B6] bg-white shadow-sm" : "border-slate-200 bg-white/70 hover:border-[#0077B6]/40"}`}><span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${checked ? "border-[#0077B6] bg-[#0077B6] text-white" : "border-slate-300 bg-white text-transparent"}`}><Check className="h-4 w-4" /></span><span><span className="block font-semibold text-[#0D1B2A]">{item.label}</span><span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.detail}</span></span></button></li>; })}</ul>
      <div className="mt-5 flex items-center gap-2 text-sm text-slate-600"><UtensilsCrossed className="h-4 w-4 text-[#F4A261]" />Selections remain on this browser until you clear them.</div>
    </section>
  );
}
