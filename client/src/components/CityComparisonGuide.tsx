import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MapPinned, Sparkles } from "lucide-react";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ArticleBreadcrumbs from "@/components/ArticleBreadcrumbs";
import ArticleFAQ from "@/components/ArticleFAQ";
import TripComHotelWidget from "@/components/TripComHotelWidget";
import ComparisonShare from "@/components/ComparisonShare";
import LastUpdated from "@/components/LastUpdated";
import { Link } from "wouter";
import type { ArticleFaq } from "@shared/articleFaqs";

export type CityComparisonConfig = {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords: string;
  label: string;
  intro: string;
  cityA: { name: string; flag: string; range: string; tierRows: readonly string[]; summary: string };
  cityB: { name: string; flag: string; range: string; tierRows: readonly string[]; summary: string };
  tableRows: readonly { label: string; a: string; b: string }[];
  selector: readonly { id: string; label: string; city: "a" | "b"; reason: string }[];
  foodTitle: string;
  foodCopy: string;
  transportCopy: string;
  activityTitle: string;
  activityCopy: string;
  relatedHeading?: string;
  related: readonly { href: string; label: string; description: string }[];
  sources: readonly { href: string; label: string; note: string }[];
  faqs: readonly ArticleFaq[];
  updated: string;
};

export default function CityComparisonGuide({ config }: { config: CityComparisonConfig }) {
  const [persona, setPersona] = useState(config.selector[0].id);
  const match = useMemo(() => config.selector.find((item) => item.id === persona) ?? config.selector[0], [config.selector, persona]);
  const recommended = match.city === "a" ? config.cityA : config.cityB;
  const canonical = `https://thestayandwander.com${config.url}`;

  return <div className="min-h-screen bg-white">
    <Head title={config.title} description={config.description} canonical={canonical} ogTitle={config.title} ogDescription={config.description} ogImage={config.image} ogUrl={canonical} keywords={config.keywords} />
    <Header />
    <section className="relative overflow-hidden bg-[#0D1B2A] px-4 pb-14 pt-28 text-white md:pb-20 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#0077B6_0,transparent_32%),radial-gradient(circle_at_85%_70%,#F4A261_0,transparent_28%)] opacity-70" />
      <div className="container relative z-10 max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">{config.label}</p><h1 className="mt-4 max-w-5xl font-playfair text-4xl font-bold leading-tight md:text-6xl">{config.title}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">{config.intro}</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300"><span>By The Stay &amp; Wander</span><span>8 minutes</span><LastUpdated date={config.updated} badge /></div></div>
    </section>
    <main className="container max-w-6xl px-4 py-10 md:py-14">
      <ArticleBreadcrumbs currentLabel={config.title.split(":")[0]} />
      <ComparisonShare title={config.title} url={canonical} className="mb-8" />
      <section id="comparison-method" className="scroll-mt-28 rounded-2xl border border-[#cfe4ee] bg-[#f5fbfd] p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">How to use this comparison</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Start with the traveler fit, then check the numbers</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-700">The ranges below are planning benchmarks carried from the published city guides and, for Phuket, the dated source notes listed in this article. They are not live quotes or a property ranking. Use the selector to choose a starting point, then confirm dates, taxes, room type, and availability with the live handoff.</p></section>
      <section id="comparison-table" className="mt-12 scroll-mt-28"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Nightly planning baseline</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Accommodation by tier</h2></div><MapPinned className="hidden h-8 w-8 text-[#F4A261] sm:block" aria-hidden="true" /></div><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-[40rem] w-full text-left text-sm"><thead className="bg-[#0D1B2A] text-white"><tr><th className="px-4 py-3">Tier</th><th className="px-4 py-3">{config.cityA.name}</th><th className="px-4 py-3">{config.cityB.name}</th></tr></thead><tbody>{config.tableRows.map((row, i) => <tr key={row.label} className={i % 2 ? "bg-slate-50" : "bg-white"}><th className="px-4 py-4 font-semibold text-[#0D1B2A]">{row.label}</th><td className="px-4 py-4 text-slate-700">{row.a}</td><td className="px-4 py-4 text-slate-700">{row.b}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs leading-relaxed text-slate-500">Published planning ranges vary by district, dates, occupancy, and season. Confirm the final tax-inclusive total before booking.</p></section>
      <section id="traveler-fit" className="mt-12 scroll-mt-28 rounded-3xl bg-[#F8EFE0] p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Which city fits you?</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">A deterministic traveler-fit selector</h2><p className="mt-3 text-slate-700">Choose one priority. This browser-local selector returns the documented fit signal; it does not score people, track choices, or save anything to an account.</p><div className="mt-6 flex flex-wrap gap-2">{config.selector.map((item) => <button key={item.id} type="button" aria-pressed={persona === item.id} onClick={() => setPersona(item.id)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] ${persona === item.id ? "scale-[1.02] border-[#0077B6] bg-[#0077B6] text-white shadow-md" : "border-[#d7c4a7] bg-white text-[#0D1B2A] hover:border-[#0077B6]"}`}>{item.label}</button>)}</div><div key={match.id} className="mt-6 grid gap-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200 md:grid-cols-[1fr_auto] md:items-center" aria-live="polite"><div className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]"><Sparkles className="h-4 w-4" aria-hidden="true" />Recommended starting point</div><h3 className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A]">{recommended.name} {recommended.flag}</h3><p className="mt-2 text-lg leading-relaxed text-slate-700">{match.reason}</p></div><div className="rounded-2xl border border-[#ead6b8] bg-[#fffaf3] p-5 text-sm text-slate-700 transition-shadow duration-200 hover:shadow-md"><p className="font-semibold text-[#0D1B2A]">Published range</p><p className="mt-2 text-2xl font-bold text-[#9a5b20]">{recommended.range}</p><p className="mt-2">{recommended.summary}</p></div></div></section>
      <section id="food-transport" className="mt-12 scroll-mt-28"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">Food and transport: the daily-cost trade-off</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-slate-200 p-6"><h3 className="font-playfair text-xl font-bold text-[#0D1B2A]">{config.foodTitle}</h3><p className="mt-3 leading-relaxed text-slate-700">{config.foodCopy}</p></article><article className="rounded-2xl border border-slate-200 p-6"><h3 className="font-playfair text-xl font-bold text-[#0D1B2A]">Transport planning</h3><p className="mt-3 leading-relaxed text-slate-700">{config.transportCopy}</p></article></div></section>
      <section id="activity-fit" className="mt-12 scroll-mt-28 rounded-2xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-6"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{config.activityTitle}</h2><p className="mt-3 leading-relaxed text-slate-700">{config.activityCopy}</p></section>
      <section id="sources" className="mt-12 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Sources and boundaries</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Where the comparison comes from</h2><p className="mt-3 leading-relaxed text-slate-700">City ranges are carried from the cited guides and dated research below. They are planning benchmarks, not a live average, property ranking, or guarantee of availability.</p><ul className="mt-5 space-y-4">{config.sources.map((source) => <li key={source.href} className="text-sm leading-relaxed text-slate-700"><a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077B6] underline decoration-[#F4A261] underline-offset-4">{source.label}</a><span className="block text-slate-600">{source.note}</span></li>)}</ul></section>
      <section id="live-rates" className="mt-12 scroll-mt-28"><div className="grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-[#cfe4ee] bg-[#f5fbfd] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">{config.cityA.name} benchmark</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{config.cityA.range}</h3><ul className="mt-4 space-y-2 text-sm text-slate-700">{config.cityA.tierRows.map((row) => <li key={row} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" />{row}</li>)}</ul></article><article className="rounded-2xl border border-[#ead6b8] bg-[#fffaf3] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a5b20]">{config.cityB.name} benchmark</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{config.cityB.range}</h3><ul className="mt-4 space-y-2 text-sm text-slate-700">{config.cityB.tierRows.map((row) => <li key={row} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9a5b20]" aria-hidden="true" />{row}</li>)}</ul></article></div><div className="mt-7 rounded-3xl border border-slate-200 p-6 md:p-8"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">Check live rates for your dates</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">The comparison ranges are directional. Use the partner search below for current availability, taxes, and final booking terms.</p><TripComHotelWidget className="mt-7" title={`Search ${config.cityA.name} and ${config.cityB.name} hotels on Trip.com`} /></div></section>
      <section id="faqs" className="scroll-mt-28"><ArticleFAQ faqs={config.faqs} title={`${config.cityA.name} vs ${config.cityB.name} Questions, Answered`} /></section>
      <section id="related-guides" className="mt-12 scroll-mt-28"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">{config.relatedHeading ?? "Keep planning your Asia and beach trip"}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{config.related.map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0077B6]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Related guide</p><h3 className="mt-3 font-playfair text-xl font-bold text-[#0D1B2A]">{item.label}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6]">Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div></section>
    </main>
    <Footer /><MobileBottomNav />
  </div>;
}
