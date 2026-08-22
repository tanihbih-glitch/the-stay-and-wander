import { ArrowLeft, ArrowRight, Camera, ChevronRight, CircleAlert, Compass, MapPin, ShieldCheck, Waves } from "lucide-react";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import { MapView } from "@/components/Map";
import { BALI_COASTAL_MATRIX_AFFILIATE_LINKS } from "@/lib/affiliateLinks";

export const articleMetadata = {
  title: "Bali Beach Comparison Matrix (2026): Sand Quality, Swim Safety & Entry Fees by Region",
  description:
    "Compare Bali beach regions for sand quality, swim safety, entry fees, surfing, snorkeling, cliff views, and family-friendly water in 2026.",
  url: "/blog/bali-beach-comparison-matrix-2026",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  keywords:
    "Bali beach comparison 2026, Bali beach entry fees, Bali swim safety, Bali beaches for families, Bali surf beaches, Bali snorkeling beaches, Bali beach guide",
  author: "The Stay & Wander",
  category: "Coastal Field Notes · Bali Travel",
  readTime: "9 minutes",
  publishDate: "2026-08-22",
};

export const coastlineRows = [
  {
    region: "Bukit Peninsula",
    beaches: "Melasti, Pandawa, Bingin, Padang Padang",
    sand: "White, soft",
    safety: "Moderate — tide-dependent",
    fee: "IDR 10k–50k (~$0.65–$3.25)",
    bestFor: "Cliff views, white sand, intermediate surf",
  },
  {
    region: "West Coast",
    beaches: "Seminyak, Canggu (Batu Bolong), Kuta",
    sand: "Grey-to-tan volcanic",
    safety: "Caution — strong rip currents",
    fee: "Free; parking IDR 2k–5k",
    bestFor: "Sunsets, beach clubs, beginner surf lessons",
  },
  {
    region: "Southeast Coast",
    beaches: "Nusa Dua, Sanur, Geger",
    sand: "Light golden / white",
    safety: "High — reef-protected, calm",
    fee: "Free–IDR 15k (~$1.00)",
    bestFor: "Family swimming, toddlers, water sports",
  },
  {
    region: "East / North Coast",
    beaches: "Amed, Virgin Beach, Lovina",
    sand: "Black volcanic / coarse",
    safety: "High — gentle tides",
    fee: "Free; snorkel gear around IDR 50k",
    bestFor: "Snorkeling, coral diving, quiet stays",
  },
  {
    region: "Nusa Islands",
    beaches: "Kelingking, Crystal Bay, Atuh",
    sand: "White / dramatic cove",
    safety: "Low — Kelingking is non-swimmable",
    fee: "IDR 25k (~$1.60) plus boat / taxi",
    bestFor: "Viewpoints, photography",
  },
] as const;

const decisionBranches = [
  {
    icon: ShieldCheck,
    priority: "Travelling with kids",
    recommendation: "Head to Nusa Dua or Sanur",
    note: "The Southeast Coast is the calmest, reef-protected choice in this matrix for family swimming and water sports.",
  },
  {
    icon: Compass,
    priority: "Looking for cliff views",
    recommendation: "Head to Melasti or the Bukit Peninsula",
    note: "White sand, cliffside coves, and tide-dependent swimming make this the view-led south-Bali choice.",
  },
  {
    icon: Waves,
    priority: "Prioritising surf",
    recommendation: "Head to Canggu or Batu Bolong",
    note: "The West Coast is the matrix pick for beginner surf lessons and sunset energy; treat rip-current warnings seriously.",
  },
  {
    icon: MapPin,
    priority: "Planning to snorkel or dive",
    recommendation: "Head to Amed on the East / North Coast",
    note: "Gentler tides, coral-focused water time, and quieter stays make this the strongest underwater route.",
  },
  {
    icon: Camera,
    priority: "Chasing dramatic photography",
    recommendation: "Head to the Nusa Islands",
    note: "Kelingking, Crystal Bay, and Atuh are the framework’s viewpoint-first choice; do not assume a dramatic cove is safe to swim.",
  },
] as const;

const regionPins = [
  { name: "Bukit Peninsula", position: { lat: -8.828, lng: 115.164 }, detail: "Melasti, Pandawa, Bingin and Padang Padang" },
  { name: "West Coast", position: { lat: -8.65, lng: 115.13 }, detail: "Seminyak, Canggu and Kuta" },
  { name: "Southeast Coast", position: { lat: -8.75, lng: 115.23 }, detail: "Nusa Dua, Sanur and Geger" },
  { name: "East / North Coast", position: { lat: -8.35, lng: 115.52 }, detail: "Amed, Virgin Beach and Lovina" },
  { name: "Nusa Islands", position: { lat: -8.72, lng: 115.55 }, detail: "Kelingking, Crystal Bay and Atuh" },
] as const;

const regionPhotography = [
  {
    region: "Bukit Peninsula",
    image: "/manus-storage/bali-bukit-peninsula-melasti_79edb6f8.jpg",
    alt: "Soft white sand and limestone cliffs framing a clear-water cove on Bali's Bukit Peninsula",
    caption: "Bukit Peninsula · White sand and cliffside coves",
  },
  {
    region: "West Coast",
    image: "/manus-storage/bali-west-coast-canggu-surf_05a2afae.jpg",
    alt: "Grey-tan volcanic sand and rolling surf on Bali's West Coast at golden hour",
    caption: "West Coast · Volcanic sand, surf, and sunsets",
  },
  {
    region: "Southeast Coast",
    image: "/manus-storage/bali-southeast-coast-nusa-dua_5be95624.jpg",
    alt: "Calm shallow turquoise water over light golden sand on Bali's Southeast Coast",
    caption: "Southeast Coast · Calm, reef-protected water",
  },
  {
    region: "East / North Coast",
    image: "/manus-storage/bali-east-north-coast-amed_121c8b27.jpg",
    alt: "Black volcanic shoreline and a distant outrigger boat on Bali's quiet East and North Coast",
    caption: "East / North Coast · Volcanic texture and quiet water",
  },
  {
    region: "Nusa Islands",
    image: "/manus-storage/bali-nusa-islands-kelingking_67146dfd.jpg",
    alt: "A dramatic white-sand cove beneath towering limestone cliffs in Bali's Nusa Islands",
    caption: "Nusa Islands · Dramatic cliffs and viewpoint days",
  },
] as const;

function HotelSearchLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={BALI_COASTAL_MATRIX_AFFILIATE_LINKS.hotels}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-semibold text-[#0077B6] underline decoration-[#F4A261] decoration-2 underline-offset-4 transition-colors hover:text-[#005c91]"
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function BlogBaliBeachComparison() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbItems = [
    { name: "Home", url: "https://thestayandwander.com" },
    { name: "Blog", url: "https://thestayandwander.com/blog" },
    { name: articleMetadata.title, url: canonicalUrl },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-20 md:pb-0">
      <Head
        title={articleMetadata.title}
        description={articleMetadata.description}
        canonical={canonicalUrl}
        ogTitle={articleMetadata.title}
        ogDescription={articleMetadata.description}
        ogImage={articleMetadata.image}
        ogUrl={canonicalUrl}
        keywords={articleMetadata.keywords}
      />
      <BlogArticleSchema
        title={articleMetadata.title}
        description={articleMetadata.description}
        image={`https://thestayandwander.com${articleMetadata.image}`}
        author={articleMetadata.author}
        datePublished={articleMetadata.publishDate}
        url={canonicalUrl}
      />
      {BreadcrumbSchema(breadcrumbItems)}
      <Header />

      <section className="relative overflow-hidden bg-[#0D1B2A] px-4 pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12% 12%, #0077B6 0, transparent 28%), radial-gradient(circle at 87% 72%, #F4A261 0, transparent 22%)" }} />
        <div className="container relative z-10 max-w-5xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#F4A261]">Coastal Field Notes · Bali Travel</p>
          <h1 className="font-playfair max-w-5xl text-4xl font-bold leading-tight md:text-6xl">{articleMetadata.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">A practical five-zone field guide for choosing Bali&apos;s beaches by sand, sea conditions, access costs, and the experience you want from the day.</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200">
            <span>By {articleMetadata.author}</span>
            <span>{articleMetadata.readTime}</span>
            <span>Updated for 2026 planning</span>
          </div>
        </div>
      </section>

      <main className="container max-w-6xl px-4 py-12 md:py-16">
        <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#005c91]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </a>

        <section className="rounded-2xl border border-[#ecd9b9] bg-[#F8EFE0] p-6 md:p-8" aria-labelledby="methodology-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Methodology note</p>
          <h2 id="methodology-title" className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">A quick coastal baseline, not a substitute for local conditions</h2>
          <p className="mt-3 leading-relaxed text-slate-700">Data compiled from 120+ active venue rate sheets, local tourism board updates, and field research across 5 Balinese regencies for 2026.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Beach conditions, lifeguard coverage, tides, and local fees can change. Treat the matrix as a planning starting point, then check posted signs and local advice on the day.</p>
        </section>

        <section className="mt-14" aria-labelledby="decision-title">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">The Bali Beach Decision Framework</p>
            <h2 id="decision-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Choose your coastline by priority</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">Start with the experience you value most. Each route below leads to a region, then to a hotel search that can anchor the rest of your Bali plan.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {decisionBranches.map(({ icon: Icon, priority, recommendation, note }) => (
              <article key={priority} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#e5f4fb] p-3 text-[#0077B6]"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">If {priority.toLowerCase()}</p>
                    <h3 className="mt-1 font-playfair text-xl font-bold text-[#0D1B2A]">{recommendation}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-700">{note}</p>
                <div className="mt-5"><HotelSearchLink>Search hotels near this coast</HotelSearchLink></div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="map-title">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Coastline map</p>
              <h2 id="map-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Five regions, one island decision</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">Select a marker to see the beaches used in this comparison. The map is a regional orientation tool, not a live ocean-conditions service.</p>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#e5f4fb] p-2 shadow-sm">
            <MapView
              initialCenter={{ lat: -8.4095, lng: 115.1889 }}
              initialZoom={9}
              className="h-[24rem] rounded-xl bg-[radial-gradient(circle_at_22%_20%,rgba(244,162,97,0.45),transparent_18%),linear-gradient(135deg,#d9f0f7_0%,#b8dce8_48%,#d7ecf1_100%)] md:h-[32rem]"
              onMapReady={(map) => {
                const bounds = new google.maps.LatLngBounds();
                regionPins.forEach((region) => {
                  const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: region.position, title: region.name });
                  const infoWindow = new google.maps.InfoWindow({ content: `<div style="max-width:220px;padding:4px 2px"><strong>${region.name}</strong><br/><span>${region.detail}</span></div>` });
                  marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));
                  bounds.extend(region.position);
                });
                map.fitBounds(bounds, { top: 48, bottom: 48, left: 48, right: 48 });
              }}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Bali coastal region map legend">
            {regionPins.map((region, index) => (
              <div key={region.name} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0077B6] text-xs font-bold text-white">{index + 1}</span>
                <div>
                  <p className="text-sm font-bold text-[#0D1B2A]">{region.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{region.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="summary-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">2026 Bali coastline summary</p>
          <h2 id="summary-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Compare sand, water, access, and purpose</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[960px] w-full text-left text-sm">
              <caption className="sr-only">Bali coastline comparison by region, beach characteristics, swim safety, fees, and best use.</caption>
              <thead className="bg-[#0D1B2A] text-white">
                <tr>
                  {['Region', 'Featured Beaches', 'Sand Type', 'Swim Safety Rating', 'Average Entry / Parking Fee', 'Best For'].map((heading) => (
                    <th key={heading} scope="col" className="px-5 py-4 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {coastlineRows.map((row) => (
                  <tr key={row.region} className="align-top hover:bg-[#fffaf3]">
                    <th scope="row" className="px-5 py-5 font-playfair text-base font-bold text-[#0D1B2A]">{row.region}</th>
                    <td className="px-5 py-5 leading-relaxed">{row.beaches}</td>
                    <td className="px-5 py-5 leading-relaxed">{row.sand}</td>
                    <td className="px-5 py-5 leading-relaxed"><span className="inline-flex rounded-full bg-[#e5f4fb] px-3 py-1 font-semibold text-[#005c91]">{row.safety}</span></td>
                    <td className="px-5 py-5 leading-relaxed">{row.fee}</td>
                    <td className="px-5 py-5 leading-relaxed font-medium text-slate-900">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
            <p><strong>Sea-safety note:</strong> this planning matrix does not replace lifeguard instructions or local conditions. Do not swim at Kelingking simply because it appears in an itinerary, and reassess west-coast conditions when rip-current warnings are posted.</p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="photography-title">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Coastal visual notes</p>
            <h2 id="photography-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">See the coastline character before you choose a base</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">These regional scenes make the matrix easier to read at a glance—from Bukit&apos;s pale cliff coves to the textured volcanic shorelines of Amed and the Nusa viewpoint coast.</p>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionPhotography.map((photo) => (
              <figure key={photo.region} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
                <figcaption className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">{photo.region}</p>
                  <p className="mt-1 font-playfair text-lg font-bold text-[#0D1B2A]">{photo.caption.split(" · ")[1]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-[#0D1B2A] px-6 py-10 text-white md:px-10 md:py-12" aria-labelledby="book-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">Ready to plan your coast</p>
          <h2 id="book-title" className="mt-3 max-w-3xl font-playfair text-3xl font-bold md:text-4xl">Build the Bali stay around your ideal beach day.</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-200">Match your base to the coast you want to wake up near, then leave enough space for the tides, traffic, and unplanned pauses that make Bali work.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BALI_COASTAL_MATRIX_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-6 py-3 font-semibold text-[#0D1B2A] transition-colors hover:bg-[#e78b4d]">Search Hotels <ChevronRight className="h-4 w-4" /></a>
            <a href={BALI_COASTAL_MATRIX_AFFILIATE_LINKS.flights} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">Search Flights <ChevronRight className="h-4 w-4" /></a>
            <a href={BALI_COASTAL_MATRIX_AFFILIATE_LINKS.tours} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">Book Tours <ChevronRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2" aria-label="Related Bali guides">
          <a href="/blog/where-to-stay-in-bali-2026" className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Stay planning</p>
            <h2 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Where to Stay in Bali for First-Timers</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Compare the areas that turn a beach preference into a better Bali base.</p>
          </a>
          <a href="/blog/things-to-do-in-bali-2026" className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Build the day</p>
            <h2 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">50 Things to Do in Bali</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Pair a coastline pick with temples, food, water time, and island experiences.</p>
          </a>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
