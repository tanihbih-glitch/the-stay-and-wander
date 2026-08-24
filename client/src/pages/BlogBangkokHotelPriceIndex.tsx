import { ArrowLeft, ArrowRight, Building2, MapPinned, TrainFront, WalletCards } from "lucide-react";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import { TRIP_COM_HOTEL_WIDGET_URL } from "@/components/TripComHotelWidget";
import BangkokDistrictHotelMap from "@/components/BangkokDistrictHotelMap";
import BangkokHotelTaxCalculator from "@/components/BangkokHotelTaxCalculator";

export const articleMetadata = {
  title: "Bangkok Hotel Price Index (2026): Nightly Rates by District & Tier",
  description: "Compare average 2026 Bangkok hotel prices across Sukhumvit, Silom, Riverside, and Siam. Includes transport proximity analysis and tax guides.",
  url: "/blog/bangkok-hotel-price-index-2026",
  image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
  keywords: "Bangkok hotel prices 2026, Sukhumvit hotel rates, Silom hotel prices, Bangkok riverside hotel rates, Siam accommodation cost, Bangkok hotel taxes",
  author: "The Stay & Wander",
  category: "City Cost Index · Bangkok Travel",
  readTime: "7 minutes",
  publishDate: "2026-08-24",
};

export const bangkokHotelPriceRows = [
  { district: "Sukhumvit (Asok / Nana)", budget: "$14 – $28", midRange: "$55 – $110", luxury: "$190 – $450", transit: "Excellent (BTS/MRT hub), central dining" },
  { district: "Silom & Sathorn", budget: "$12 – $22", midRange: "$50 – $95", luxury: "$170 – $380", transit: "Great (BTS/MRT), business & nightlife" },
  { district: "Siam & Pratunam", budget: "$15 – $30", midRange: "$60 – $120", luxury: "$210 – $500", transit: "High (BTS), shopping malls & markets" },
  { district: "Bangkok Riverside", budget: "$18 – $35", midRange: "$75 – $150", luxury: "$300 – $850+", transit: "Moderate (Ferry/BTS), scenic flagship resorts" },
  { district: "Khao San / Old City", budget: "$8 – $16", midRange: "$35 – $70", luxury: "$120 – $220", transit: "Low (MRT nearby), backpacker hub & temples" },
] as const;

const pricingFactors = [
  { icon: TrainFront, title: "The Transport Offset", text: "Hotels located within a 5-minute walk of a BTS Skytrain or MRT station command a 15%–20% rate premium. However, staying near transit saves up to $15 per day in taxi fare and hours stuck in traffic." },
  { icon: WalletCards, title: "Thailand Hotel Taxes", text: "Published hotel rates are subject to a mandatory 17.7% surcharge (7% VAT, 10% service charge, and 0.7% local provincial tax)." },
  { icon: Building2, title: "Shoulder Season Savings", text: "Traveling between May and October can lower nightly rates on mid-range and 5-star properties by up to 40%." },
] as const;

export default function BlogBangkokHotelPriceIndex() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbs = [{ name: "Home", url: "https://thestayandwander.com" }, { name: "Blog", url: "https://thestayandwander.com/blog" }, { name: articleMetadata.title, url: canonicalUrl }];

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-20 md:pb-0">
      <Head title={articleMetadata.title} description={articleMetadata.description} canonical={canonicalUrl} ogTitle={articleMetadata.title} ogDescription={articleMetadata.description} ogImage={articleMetadata.image} ogUrl={canonicalUrl} keywords={articleMetadata.keywords} />
      <BlogArticleSchema title={articleMetadata.title} description={articleMetadata.description} image={`https://thestayandwander.com${articleMetadata.image}`} author={articleMetadata.author} datePublished={articleMetadata.publishDate} url={canonicalUrl} />
      {BreadcrumbSchema(breadcrumbs)}
      <Header />
      <section className="relative overflow-hidden bg-[#0D1B2A] px-4 pb-16 pt-32 text-white md:pb-20 md:pt-40"><div className="absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(circle at 12% 18%, #0077B6 0, transparent 30%), radial-gradient(circle at 85% 78%, #F4A261 0, transparent 24%)" }} /><div className="container relative z-10 max-w-5xl"><p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#F4A261]">City Cost Index · Bangkok Travel</p><h1 className="max-w-5xl font-playfair text-4xl font-bold leading-tight md:text-6xl">Bangkok Hotel Price Index (2026)</h1><p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-200">Nightly rates by district, tier, transit access, and the tax details that alter your final Bangkok accommodation budget.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200"><span>By {articleMetadata.author}</span><span>{articleMetadata.readTime}</span><span>Updated for 2026 planning</span></div></div></section>
      <main className="container max-w-6xl px-4 py-12 md:py-16"><a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6] hover:text-[#005c91]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Blog</a>
        <aside className="rounded-2xl border border-[#ecd9b9] bg-[#F8EFE0] p-6 text-slate-700 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Affiliate disclosure</p><p className="mt-3 leading-relaxed">The Stay &amp; Wander is a reader-supported travel research portal. When you book accommodation through links on our site, we may earn an affiliate commission at no extra cost to you.</p></aside>
        <section className="mt-12 max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Bangkok accommodation research</p><h2 className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Why district choice shapes the real cost of a Bangkok stay</h2><p className="mt-5 text-lg leading-relaxed text-slate-700">Bangkok offers exceptional accommodation value, but location determines overall daily expenditure. Proximity to transit lines often pays for itself by reducing daily taxi and tuk-tuk transport costs.</p></section>
        <section className="mt-14"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">2026 benchmark matrix</p><h2 className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Bangkok hotel price benchmark</h2><p className="mt-4 text-lg leading-relaxed text-slate-700">Typical nightly ranges across Bangkok&apos;s principal accommodation zones.</p></div><div className="table-responsive mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[960px] w-full border-collapse text-left text-sm"><thead className="bg-[#0D1B2A] text-white"><tr><th className="p-4">District</th><th className="p-4">Hostels / Budget</th><th className="p-4">3–4 Star Mid-Range</th><th className="p-4">5-Star Luxury</th><th className="p-4">Transit Access &amp; Vibe</th></tr></thead><tbody>{bangkokHotelPriceRows.map((row) => <tr key={row.district} className="border-t border-slate-100 align-top"><th scope="row" className="p-4 font-semibold text-[#0D1B2A]">{row.district}</th><td className="p-4 text-slate-700">{row.budget}</td><td className="p-4 text-slate-700">{row.midRange}</td><td className="p-4 text-slate-700">{row.luxury}</td><td className="p-4 text-slate-700">{row.transit}</td></tr>)}</tbody></table></div></section>
        <BangkokDistrictHotelMap />
        <section className="mt-14"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Before you book</p><h2 className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Key pricing factors for 2026</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{pricingFactors.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="inline-flex rounded-full bg-[#e5f4fb] p-3 text-[#0077B6]"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-4 font-playfair text-xl font-bold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{text}</p></article>)}</div><p className="mt-7 rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-5 text-slate-700"><span className="font-bold text-[#0D1B2A]">Booking logistics:</span> Secure airport rail transfers alongside hotel reservations to avoid street taxi surcharges upon arrival.</p></section>
        <BangkokHotelTaxCalculator />
        <section className="mt-14 rounded-3xl bg-[#0D1B2A] px-6 py-10 text-white md:px-10"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">Search live options</p><h2 className="mt-3 font-playfair text-3xl font-bold md:text-4xl">Compare Bangkok hotel and excursion deals</h2><p className="mt-4 leading-relaxed text-slate-200">Use the district matrix to shortlist the right base, then check current accommodation and excursion availability for your dates.</p><a href={TRIP_COM_HOTEL_WIDGET_URL} target="_blank" rel="sponsored nofollow" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-7 py-3.5 font-semibold text-[#0D1B2A] hover:bg-[#f7b879]">Search Bangkok Hotel &amp; Excursion Deals on Trip.com<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div></section>
        <section className="mt-12 rounded-2xl border border-[#cfe4ee] bg-[#eef8fb] p-6"><div className="flex items-start gap-3"><MapPinned className="mt-1 h-5 w-5 shrink-0 text-[#0077B6]" aria-hidden="true" /><div><h2 className="font-playfair text-2xl font-bold text-[#0D1B2A]">Plan your Bangkok base by district</h2><p className="mt-2 leading-relaxed text-slate-700">Choose a district from the index, then use a focused first-timer planning route to match its transport and sightseeing rhythm.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[{ label: "Sukhumvit transit and dining plan", hash: "#sukhumvit" }, { label: "Silom and Sathorn business-nightlife plan", hash: "#silom-sathorn" }, { label: "Siam shopping-base plan", hash: "#siam" }, { label: "Riverside temples and ferries plan", hash: "#riverside" }, { label: "Khao San and Old City plan", hash: "#khao-san" }].map((link) => <a key={link.label} href={`/blog/where-to-stay-in-bangkok-2026${link.hash}`} className="rounded-xl border border-[#b9dce9] bg-white px-4 py-3 text-sm font-semibold text-[#0077B6] hover:bg-[#e5f4fb]">{link.label}<span className="ml-2" aria-hidden="true">→</span></a>)}</div><p className="mt-5 leading-relaxed text-slate-700">For hotel picks by budget, see the <a href="/blog/bangkok-hotel-budget-breakdown-2026" className="font-semibold text-[#0077B6] hover:underline">Bangkok hotel cost breakdown</a>.</p></div></div></section>
      </main><Footer /><MobileBottomNav /></div>
  );
}
