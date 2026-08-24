import { ArrowLeft, ArrowRight, BedDouble, CalendarDays, MapPin, Percent, Users } from "lucide-react";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import { MapView } from "@/components/Map";
import { BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS } from "@/lib/affiliateLinks";

export const articleMetadata = {
  title: "Bali Hotel Price Index (2026): Average Rates Across 5 Regions",
  description: "Real 2026 price benchmarks for Bali hotels and villas. Detailed nightly breakdowns for Canggu, Ubud, Sanur, Uluwatu, and Amed across all budget tiers.",
  url: "/blog/bali-hotel-price-index-2026",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  keywords: "Bali hotel prices 2026, Bali villa prices, Canggu hotel cost, Ubud hotel cost, Uluwatu resort price, Sanur accommodation, Amed hotels",
  author: "The Stay & Wander",
  category: "Coastal Field Notes · Bali Travel",
  readTime: "8 minutes",
  publishDate: "2026-08-23",
};

export const hotelRateRows = [
  { region: "Canggu & Seminyak", budget: "$12–$25", boutique: "$65–$140", villa: "$180–$320", resort: "$400–$750", focus: "Beach clubs, surf, modern cafes" },
  { region: "Ubud & Central", budget: "$8–$18", boutique: "$50–$110", villa: "$140–$260", resort: "$350–$800", focus: "Jungles, wellness, rice terraces" },
  { region: "Bukit (Uluwatu)", budget: "$15–$30", boutique: "$80–$160", villa: "$220–$400", resort: "$500–$1,200+", focus: "Cliffside views, white sand beaches" },
  { region: "Sanur & Nusa Dua", budget: "$14–$22", boutique: "$55–$120", villa: "$150–$280", resort: "$250–$600", focus: "Calm swimming waters, family stays" },
  { region: "Amed & Lovina", budget: "$7–$15", boutique: "$30–$70", villa: "$90–$170", resort: "$180–$350", focus: "Snorkeling, black sand, quiet pace" },
] as const;

const regionPins = [
  { name: "Canggu & Seminyak", position: { lat: -8.65, lng: 115.14 }, detail: "Beach clubs, surf, and modern cafés" },
  { name: "Ubud & Central", position: { lat: -8.5069, lng: 115.2625 }, detail: "Jungles, wellness, and rice terraces" },
  { name: "Bukit (Uluwatu)", position: { lat: -8.829, lng: 115.084 }, detail: "Cliffside views and white-sand beaches" },
  { name: "Sanur & Nusa Dua", position: { lat: -8.74, lng: 115.25 }, detail: "Calm water and family-oriented stays" },
  { name: "Amed & Lovina", position: { lat: -8.35, lng: 115.52 }, detail: "Snorkeling, black sand, and a quiet pace" },
] as const;

const pricingFactors = [
  { icon: Percent, title: "The 21% Tax Trap", text: "Most listing cards exclude government tax (10%) and service charge (11%) — factor in an additional 21% surcharge." },
  { icon: CalendarDays, title: "Peak Season Premiums", text: "Rates rise 35%–60% during July–August and mid-December through January." },
  { icon: Users, title: "Villa vs. Hotel Value", text: "For groups of 4+, a private 2–3 bedroom pool villa often costs less per person than multiple mid-range hotel rooms." },
] as const;

export default function BlogBaliHotelPriceIndex() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbItems = [
    { name: "Home", url: "https://thestayandwander.com" },
    { name: "Blog", url: "https://thestayandwander.com/blog" },
    { name: articleMetadata.title, url: canonicalUrl },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-20 md:pb-0">
      <Head title={articleMetadata.title} description={articleMetadata.description} canonical={canonicalUrl} ogTitle={articleMetadata.title} ogDescription={articleMetadata.description} ogImage={articleMetadata.image} ogUrl={canonicalUrl} keywords={articleMetadata.keywords} />
      <BlogArticleSchema title={articleMetadata.title} description={articleMetadata.description} image={`https://thestayandwander.com${articleMetadata.image}`} author={articleMetadata.author} datePublished={articleMetadata.publishDate} url={canonicalUrl} />
      {BreadcrumbSchema(breadcrumbItems)}
      <Header />

      <section className="relative overflow-hidden bg-[#0D1B2A] px-4 pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12% 12%, #0077B6 0, transparent 28%), radial-gradient(circle at 87% 72%, #F4A261 0, transparent 22%)" }} />
        <div className="container relative z-10 max-w-5xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#F4A261]">Coastal Field Notes · Bali Travel</p>
          <h1 className="max-w-5xl font-playfair text-4xl font-bold leading-tight md:text-6xl">{articleMetadata.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">A five-region planning baseline for reading Bali accommodation rates beyond the first promotional price you see.</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200"><span>By {articleMetadata.author}</span><span>{articleMetadata.readTime}</span><span>Updated for 2026 planning</span></div>
        </div>
      </section>

      <main className="container max-w-6xl px-4 py-12 md:py-16">
        <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#005c91]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Blog</a>

        <aside className="rounded-2xl border border-[#ecd9b9] bg-[#F8EFE0] p-6 text-slate-700 md:p-8" aria-label="Affiliate disclosure">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Affiliate disclosure</p>
          <p className="mt-3 leading-relaxed">The Stay &amp; Wander is a reader-supported travel research portal. When you book accommodation through links on our site, we may earn an affiliate commission at no extra cost to you.</p>
        </aside>

        <section className="mt-12 max-w-4xl" aria-labelledby="introduction-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Bali accommodation research</p>
          <h2 id="introduction-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Why Bali&apos;s promotional rates rarely tell the full story</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">Realistic Bali accommodation budgeting means looking beyond the headline rate. Region, season, room configuration, villa occupancy, and taxes can materially change what a stay costs by the time you check out.</p>
        </section>

        <section className="mt-14" aria-labelledby="summary-title">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">2026 benchmark matrix</p><h2 id="summary-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Bali accommodation cost summary</h2><p className="mt-4 text-lg leading-relaxed text-slate-700">Nightly benchmarks across five regions and four accommodation tiers.</p></div>
          <div className="table-responsive mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[940px] w-full border-collapse text-left text-sm"><thead className="bg-[#0D1B2A] text-white"><tr><th className="p-4">Region</th><th className="p-4">Budget/Dorms</th><th className="p-4">Mid-Range Boutique</th><th className="p-4">Private Pool Villa</th><th className="p-4">5-Star Resort</th><th className="p-4">Regional Focus</th></tr></thead><tbody>{hotelRateRows.map((row) => <tr key={row.region} className="border-t border-slate-100 align-top"><th scope="row" className="p-4 font-semibold text-[#0D1B2A]">{row.region}</th><td className="p-4 text-slate-700">{row.budget}</td><td className="p-4 text-slate-700">{row.boutique}</td><td className="p-4 text-slate-700">{row.villa}</td><td className="p-4 text-slate-700">{row.resort}</td><td className="p-4 text-slate-700">{row.focus}</td></tr>)}</tbody></table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="factors-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Before you compare</p><h2 id="factors-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Key pricing factors for 2026</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">{pricingFactors.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="inline-flex rounded-full bg-[#e5f4fb] p-3 text-[#0077B6]"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-4 font-playfair text-xl font-bold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{text}</p></article>)}</div>
          <p className="mt-7 rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-5 text-slate-700"><span className="font-bold text-[#0D1B2A]">Research Tip:</span> Map regional trade-offs to a stay you would actually enjoy, then compare the final tax-inclusive price before booking.</p>
        </section>

        <section className="mt-14" aria-labelledby="map-title">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Regional map</p><h2 id="map-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Where the five rate zones sit</h2></div><p className="max-w-md text-sm leading-relaxed text-slate-600">Select a marker for the local focus used in the matrix. This is an orientation tool, not a live availability map.</p></div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#e5f4fb] p-2 shadow-sm"><MapView initialCenter={{ lat: -8.4095, lng: 115.1889 }} initialZoom={9} className="h-[24rem] rounded-xl bg-[radial-gradient(circle_at_22%_20%,rgba(244,162,97,0.45),transparent_18%),linear-gradient(135deg,#d9f0f7_0%,#b8dce8_48%,#d7ecf1_100%)] md:h-[32rem]" onMapReady={(map) => { const bounds = new google.maps.LatLngBounds(); regionPins.forEach((region) => { const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: region.position, title: region.name }); const infoWindow = new google.maps.InfoWindow({ content: `<div style="max-width:220px;padding:4px 2px"><strong>${region.name}</strong><br/><span>${region.detail}</span></div>` }); marker.addListener("click", () => infoWindow.open({ map, anchor: marker })); bounds.extend(region.position); }); map.fitBounds(bounds, { top: 48, bottom: 48, left: 48, right: 48 }); }} /></div>
          <ul className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-5">{regionPins.map((region) => <li key={region.name} className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />{region.name}</li>)}</ul>
        </section>

        <section className="mt-16 rounded-3xl bg-[#0D1B2A] px-6 py-10 text-white md:px-10" aria-labelledby="booking-title"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">Compare your stay</p><h2 id="booking-title" className="mt-3 font-playfair text-3xl font-bold md:text-4xl">Ready to compare Bali accommodation rates?</h2><p className="mt-4 leading-relaxed text-slate-200">Use the matrix to shortlist a region, then check current tax-inclusive options for your travel dates.</p><a href={BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS.hotels} target="_blank" rel="sponsored nofollow" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-7 py-3.5 font-semibold text-[#0D1B2A] transition-colors hover:bg-[#f7b879]">Compare Bali Accommodation Rates on Stay22<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div></section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
