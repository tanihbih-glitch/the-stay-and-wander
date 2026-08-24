import { CalendarDays, Search } from "lucide-react";
import { useMemo, useState } from "react";

const STAY22_BANGKOK_MAP_URL = "https://booking.stay22.com/thestayandwander/bEUkQtNQBH";

export const buildBangkokStay22SearchUrl = (checkIn: string, checkOut: string) => {
  const url = new URL(STAY22_BANGKOK_MAP_URL);
  url.searchParams.set("checkin", checkIn);
  url.searchParams.set("checkout", checkOut);
  url.searchParams.set("group_adults", "2");
  url.searchParams.set("group_children", "0");
  url.searchParams.set("no_rooms", "1");
  return url.toString();
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
};

export default function BangkokLiveHotelSearch() {
  const defaults = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 14);
    return { checkIn: addDays(tomorrow, 0), checkOut: addDays(tomorrow, 3) };
  }, []);
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const searchUrl = buildBangkokStay22SearchUrl(checkIn, checkOut);

  return (
    <section className="mt-14 rounded-3xl border border-[#e8d3ad] bg-[#F8EFE0] p-6 md:p-8" aria-labelledby="bangkok-live-search-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#9a5b20]"><CalendarDays className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a5b20]">Live availability handoff</p><h2 id="bangkok-live-search-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Check Bangkok hotel availability for your dates</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Select a stay window to pass your dates to the live map search. This preset assumes two adults and one room; live availability, taxes, and final prices are shown by the booking partner.</p></div></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3"><label className="rounded-xl border border-[#ead6b8] bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Check-in<input aria-label="Bangkok hotel check-in date" type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="rounded-xl border border-[#ead6b8] bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Check-out<input aria-label="Bangkok hotel check-out date" type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20" /></label><div className="flex items-end"><a href={searchUrl} target="_blank" rel="sponsored nofollow" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F4A261] px-5 py-3.5 font-semibold text-[#0D1B2A] hover:bg-[#f7b879]"><Search className="h-4 w-4" aria-hidden="true" />Check Live Bangkok Rates</a></div></div>
    </section>
  );
}
