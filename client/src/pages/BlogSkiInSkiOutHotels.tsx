import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Filter, Snowflake } from "lucide-react";
import { Link } from "wouter";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ArticleBreadcrumbs from "@/components/ArticleBreadcrumbs";
import ArticleFAQ from "@/components/ArticleFAQ";
import GuideFeedbackAndBackToTop from "@/components/GuideFeedbackAndBackToTop";
import { AffiliateLink } from "@/components/AffiliateLink";
import { SKI_HOTELS_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { skiInSkiOutHotelsFaqs } from "@shared/articleFaqs";

export const articleMetadata = {
  title: "Ski-In Ski-Out Hotels 2026–2027: Hand-Picked Stays",
  description:
    "Compare six source-bounded ski stays for winter 2026–2027 across Verbier, Courchevel, Megève, Niseko, Hakuba, and Dubai’s indoor snow exception.",
  url: "/blog/ski-in-ski-out-hotels-2026-2027",
  image: "/og-image.png",
  keywords:
    "ski-in ski-out hotels 2026 2027, ski hotels Switzerland, Courchevel ski hotels, Niseko ski hotels, Hakuba ski hotels, Dubai Ski Dubai hotel",
  author: "The Stay & Wander",
  category: "Ski Stays · Winter Travel",
  readTime: "9 minutes",
  publishDate: "2026-10-23",
  lastUpdated: "2026-10-23",
} as const;

type Property = {
  id: string;
  name: string;
  location: string;
  region: "Alps" | "Japan" | "Dubai";
  tier: "Upscale" | "Luxury";
  access: "Central" | "Ski-in/ski-out" | "Check lift access" | "Shuttle" | "Indoor snow";
  bestFor: string[];
  details: string[];
  opening: string;
  link?: { href: string; partner: string; category: string; source: string; label: string };
  enquiry?: boolean;
  note?: string;
};

const properties: readonly Property[] = [
  {
    id: "ski-lodge-verbier",
    name: "The Ski Lodge Verbier",
    location: "Verbier, Switzerland",
    region: "Alps",
    tier: "Upscale",
    access: "Central",
    bestFor: ["Recovery-focused stays", "Design-conscious travelers"],
    details: ["Independent 36-room boutique", "TV-free rooms", "Recovery-focused spa", "Vinyl bar"],
    opening: "Expected to open in December 2026; confirm the opening date with the hotel.",
    link: { href: SKI_HOTELS_AFFILIATE_LINKS.theSkiLodgeVerbier.href, partner: "trip.com", category: "hotel", source: "ski-in-ski-out-hotels-2026-2027", label: "Check The Ski Lodge Verbier" },
  },
  {
    id: "bourbon-courchevel",
    name: "Bourbon Hotel (Chapitre Six)",
    location: "Courchevel 1850, France",
    region: "Alps",
    tier: "Luxury",
    access: "Ski-in/ski-out",
    bestFor: ["Design and food", "Luxury couples"],
    details: ["28 rooms and 3 suites", "Design-led interiors", "Vinyl bar", "Restaurant by chef Simone Zanoni"],
    opening: "Expected to open on 18 December 2026; confirm the opening date with the hotel.",
    enquiry: true,
    note: "Official booking URL not yet provided; use the enquiry button until it is available.",
  },
  {
    id: "zannier-megeve",
    name: "Zannier Le Chalet",
    location: "Megève, France",
    region: "Alps",
    tier: "Luxury",
    access: "Check lift access",
    bestFor: ["Quiet luxury", "Spa and mountain views"],
    details: ["12 rooms and suites across three chalets", "Fireplaces", "Mont Blanc views", "Spa with indoor pool", "Small family-owned group"],
    opening: "Season timing was not supplied; confirm opening dates and lift access with the hotel.",
    link: { href: SKI_HOTELS_AFFILIATE_LINKS.zannierLeChalet.href, partner: "stay22", category: "hotel", source: "ski-in-ski-out-hotels-2026-2027", label: "Check Zannier Le Chalet" },
  },
  {
    id: "sansui-niseko",
    name: "Sansui Niseko",
    location: "Upper Hirafu, Japan",
    region: "Japan",
    tier: "Luxury",
    access: "Ski-in/ski-out",
    bestFor: ["Onsen and food", "Luxury powder-ski trips"],
    details: ["Onsen", "In-house sushi restaurant"],
    opening: "Season expected from late November; confirm the operating dates with the hotel.",
    link: { href: SKI_HOTELS_AFFILIATE_LINKS.sansuiNiseko.href, partner: "stay22", category: "hotel", source: "ski-in-ski-out-hotels-2026-2027", label: "Check Sansui Niseko" },
  },
  {
    id: "la-vigne-hakuba",
    name: "La Vigne Hakuba by Onko Chishin",
    location: "Echoland, Hakuba, Japan",
    region: "Japan",
    tier: "Upscale",
    access: "Shuttle",
    bestFor: ["Self-catering groups", "Longer mountain stays"],
    details: ["38-room apartment-hotel", "Full kitchens", "Northern Alps views", "Wine programme", "Part of a small boutique group"],
    opening: "Season timing was not supplied; confirm opening dates and shuttle schedules with the hotel.",
    link: { href: SKI_HOTELS_AFFILIATE_LINKS.laVigneHakuba.href, partner: "trip.com", category: "hotel", source: "ski-in-ski-out-hotels-2026-2027", label: "Check La Vigne Hakuba" },
  },
  {
    id: "aspen-ski-chalets",
    name: "Aspen Ski Chalets, Kempinski Mall of the Emirates",
    location: "Dubai, United Arab Emirates",
    region: "Dubai",
    tier: "Luxury",
    access: "Indoor snow",
    bestFor: ["Indoor snow stopovers", "Families and city breaks"],
    details: ["Chalet-style rooms", "Rooms overlook the Ski Dubai indoor slope", "Chain hotel, included as the indoor-snow exception"],
    opening: "Operating date was not supplied; confirm current availability and Ski Dubai access with the hotel.",
    link: { href: SKI_HOTELS_AFFILIATE_LINKS.aspenSkiChalets.href, partner: "stay22", category: "hotel", source: "ski-in-ski-out-hotels-2026-2027", label: "Check Aspen Ski Chalets" },
  },
] as const;

const regionOptions = ["All regions", "Alps", "Japan", "Dubai"] as const;
const tierOptions = ["All tiers", "Upscale", "Luxury"] as const;
const accessOptions = ["All access types", "Ski-in/ski-out", "Central", "Check lift access", "Shuttle", "Indoor snow"] as const;
const travelerOptions = ["All traveler types", "Recovery-focused stays", "Design and food", "Quiet luxury", "Onsen and food", "Self-catering groups", "Indoor snow stopovers"] as const;

function matchesTraveler(property: Property, traveler: string) {
  if (traveler === "All traveler types") return true;
  return property.bestFor.some((fit) => fit.toLowerCase().includes(traveler.toLowerCase().replace(" stays", "").replace(" and food", ""))) ||
    (traveler === "Design and food" && property.bestFor.some((fit) => /design|food/i.test(fit))) ||
    (traveler === "Quiet luxury" && property.bestFor.some((fit) => /quiet|spa/i.test(fit))) ||
    (traveler === "Onsen and food" && property.bestFor.some((fit) => /onsen|food/i.test(fit))) ||
    (traveler === "Self-catering groups" && property.bestFor.some((fit) => /self-catering|group/i.test(fit))) ||
    (traveler === "Indoor snow stopovers" && property.bestFor.some((fit) => /indoor|famil/i.test(fit)));
}

export default function BlogSkiInSkiOutHotels() {
  const [region, setRegion] = useState<(typeof regionOptions)[number]>("All regions");
  const [tier, setTier] = useState<(typeof tierOptions)[number]>("All tiers");
  const [access, setAccess] = useState<(typeof accessOptions)[number]>("All access types");
  const [traveler, setTraveler] = useState<(typeof travelerOptions)[number]>("All traveler types");

  const filteredProperties = useMemo(() => properties.filter((property) =>
    (region === "All regions" || property.region === region) &&
    (tier === "All tiers" || property.tier === tier) &&
    (access === "All access types" || property.access === access) &&
    matchesTraveler(property, traveler)
  ), [region, tier, access, traveler]);

  const resetFilters = () => {
    setRegion("All regions");
    setTier("All tiers");
    setAccess("All access types");
    setTraveler("All traveler types");
  };

  const canonical = `https://thestayandwander.com${articleMetadata.url}`;

  return (
    <div className="min-h-screen bg-white">
      <Head title={articleMetadata.title} description={articleMetadata.description} canonical={canonical} ogTitle={articleMetadata.title} ogDescription={articleMetadata.description} ogImage="https://thestayandwander.com/og-image.png" ogUrl={canonical} ogType="article" keywords={articleMetadata.keywords} author={articleMetadata.author} publishedDate={articleMetadata.publishDate} updatedDate={articleMetadata.lastUpdated} />
      <Header />
      <section className="relative overflow-hidden bg-[#0D1B2A] px-4 pb-14 pt-28 text-white md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#0077B6_0,transparent_34%),radial-gradient(circle_at_85%_65%,#F4A261_0,transparent_28%)] opacity-70" />
        <div className="container relative z-10 max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">{articleMetadata.category}</p>
          <h1 className="mt-4 max-w-5xl font-playfair text-4xl font-bold leading-tight md:text-6xl">{articleMetadata.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">Six source-bounded winter stays across the Alps, Japan, and one Dubai indoor-snow exception—filtered by access, travel style, region, and tier.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300"><span>By The Stay &amp; Wander</span><span>{articleMetadata.readTime}</span><span>Updated October 23, 2026</span></div>
        </div>
      </section>

      <main className="container max-w-6xl px-4 py-10 md:py-14">
        <ArticleBreadcrumbs currentLabel="Ski-In Ski-Out Hotels" />
        <aside className="mt-6 rounded-2xl border border-[#ead6b8] bg-[#fff8f1] p-5 text-sm leading-relaxed text-[#70451f]" aria-label="Affiliate disclosure">We may earn a commission if you book through our links.</aside>

        <section id="ski-method" className="mt-8 scroll-mt-28 rounded-2xl border border-[#cfe4ee] bg-[#f5fbfd] p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">How to use this guide</p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Filter the stay by the skiing day you want</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-700">This is a hand-picked, fact-bounded shortlist rather than a ranking. There are no prices or review scores in this guide. “Ski-in/ski-out” and other access labels are shown only where supplied; where lift access is unknown, check lift access with the hotel.</p>
        </section>

        <section id="ski-filters" className="mt-12 scroll-mt-28 rounded-3xl bg-[#F8EFE0] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Interactive shortlist</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Find your mountain-base fit</h2></div><Filter className="h-8 w-8 text-[#0077B6]" aria-hidden="true" /></div>
          <p className="mt-3 text-slate-700">Choose any combination. The cards update locally in your browser; no filter choice is saved or sent to the server.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Region", region, setRegion, regionOptions], ["Tier", tier, setTier, tierOptions], ["Ski access", access, setAccess, accessOptions], ["Traveler type", traveler, setTraveler, travelerOptions]].map(([label, value, setter, options]) => <label key={label as string} className="text-sm font-semibold text-[#0D1B2A]"><span className="mb-2 block">{label as string}</span><select value={value as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} className="w-full rounded-xl border border-[#d7c4a7] bg-white px-3 py-3 font-medium text-[#0D1B2A] shadow-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{(options as readonly string[]).map((option) => <option key={option}>{option}</option>)}</select></label>)}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4"><p className="text-sm font-semibold text-[#0D1B2A]" aria-live="polite">Showing {filteredProperties.length} of {properties.length} stays</p><button type="button" onClick={resetFilters} className="rounded-full border border-[#0D1B2A] bg-white px-4 py-2 text-sm font-semibold text-[#0D1B2A] transition hover:-translate-y-0.5 hover:border-[#0077B6] hover:text-[#0077B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6]">Reset filters</button></div>
        </section>

        <section id="ski-shortlist" className="mt-12 scroll-mt-28"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">The shortlist</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Six stays to verify for winter 2026–2027</h2></div><Snowflake className="hidden h-9 w-9 text-[#F4A261] sm:block" aria-hidden="true" /></div><div className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredProperties.map((property) => <article key={property.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0077B6] hover:shadow-lg"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">{property.region} · {property.tier}</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{property.name}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{property.location}</p></div><span className="rounded-full bg-[#edf7fb] px-3 py-1 text-xs font-bold text-[#0077B6]">{property.access}</span></div><ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-700">{property.details.map((detail) => <li key={detail} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" />{detail}</li>)}</ul><div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700"><p><strong>Best for:</strong> {property.bestFor.join(" · ")}</p><p className="mt-2"><strong>Opening:</strong> {property.opening}</p>{property.note && <p className="mt-2 text-[#70451f]">{property.note}</p>}{property.access === "Check lift access" && <p className="mt-2 font-semibold text-[#70451f]">Check lift access with the hotel.</p>}</div><div className="mt-5">{property.link ? <AffiliateLink href={property.link.href} partner={property.link.partner} category={property.link.category} source={property.link.source} destination={property.name} rel="sponsored nofollow" className="inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-4 py-2.5 text-sm font-bold text-[#0D1B2A] transition hover:-translate-y-0.5 hover:bg-[#f7b47c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6]"><span>{property.link.label}</span><ExternalLink className="h-4 w-4" aria-hidden="true" /></AffiliateLink> : property.enquiry ? <a href="mailto:thestayandwander@thestayandwander.com?subject=Bourbon%20Hotel%20(Courchevel)%20enquiry" className="inline-flex items-center gap-2 rounded-full border border-[#0D1B2A] bg-white px-4 py-2.5 text-sm font-bold text-[#0D1B2A] transition hover:-translate-y-0.5 hover:border-[#0077B6] hover:text-[#0077B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6]">Enquire about this stay <ArrowRight className="h-4 w-4" aria-hidden="true" /></a> : null}</div></article>)}
        </div>{filteredProperties.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">No stays match all four filters. Reset one filter to widen the shortlist.</div>}<p className="mt-5 text-xs leading-relaxed text-slate-500">No hotel photos, prices, star scores, or review scores are used here. Opening signals are expected dates and should be confirmed with each hotel.</p></section>

        <section id="ski-planning" className="mt-12 scroll-mt-28 rounded-2xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-6 md:p-8"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">Booking checks before you commit</h2><div className="mt-4 grid gap-4 md:grid-cols-3"><div><h3 className="font-semibold text-[#0D1B2A]">Access</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">Ask whether “ski-in/ski-out” applies to the exact room or suite, and whether snow conditions change the route.</p></div><div><h3 className="font-semibold text-[#0D1B2A]">Opening</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">For new or seasonal properties, confirm the expected opening date, operating calendar, and any soft-opening limitations.</p></div><div><h3 className="font-semibold text-[#0D1B2A]">Room fit</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">Confirm bed layout, kitchen access, spa availability, shuttle times, and whether the selected room matches your group.</p></div></div></section>

        <section id="ski-sources" className="mt-12 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Source boundary</p><h2 className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">What this shortlist does—and does not—claim</h2><p className="mt-4 leading-relaxed text-slate-700">Property facts, access labels, and expected opening signals on this page are limited to the supplied editorial brief. They are not independent availability checks, price comparisons, star classifications, or review rankings. Verify current access, opening dates, room details, and cancellation terms directly with the intended property or booking partner.</p></section>

        <section id="faqs" className="scroll-mt-28"><ArticleFAQ faqs={skiInSkiOutHotelsFaqs} title="Ski Stay Questions, Answered" /></section>
        <section id="related-guides" className="mt-12 scroll-mt-28"><h2 className="font-playfair text-3xl font-bold text-[#0D1B2A]">Keep planning your next winter route</h2><div className="mt-6 grid gap-4 md:grid-cols-3"><Link href="/blog/best-cities-europe-summer-2026" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0077B6]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Related Europe guide</p><h3 className="mt-3 font-playfair text-xl font-bold text-[#0D1B2A]">Best European Cities This Summer</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">Build a broader Europe route before narrowing down the mountain segment.</p></Link><Link href="/blog/where-to-stay-lisbon-2026" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0077B6]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Related stay guide</p><h3 className="mt-3 font-playfair text-xl font-bold text-[#0D1B2A]">Where to Stay in Lisbon</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">Pair an alpine winter stay with a city break that has a different pace and climate.</p></Link><Link href="/blog/tokyo-vs-osaka-2026" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0077B6]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Related Japan guide</p><h3 className="mt-3 font-playfair text-xl font-bold text-[#0D1B2A]">Tokyo vs Osaka</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">Continue planning a Japan trip around Niseko or Hakuba with a city split.</p></Link></div><p className="mt-5 text-sm text-slate-500">More Europe winter guides can be added here as source-bounded pages are published.</p></section>
      </main>
      <Footer />
      <GuideFeedbackAndBackToTop />
      <MobileBottomNav />
    </div>
  );
}
