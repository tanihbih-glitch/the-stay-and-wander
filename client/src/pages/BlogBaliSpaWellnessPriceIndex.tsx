import { ArrowLeft, ArrowRight, Check, ChevronRight, HeartHandshake, Sparkles } from "lucide-react";
import { useState } from "react";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import { BALI_WELLNESS_INDEX_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import IdrUsdConverter from "@/components/IdrUsdConverter";

export const articleMetadata = {
  title: "Bali Spa & Wellness Price Index (2026): Local Street Warungs vs. Luxury Resort Treatments",
  description: "Compare Bali spa prices in 2026, from local massage warungs to boutique retreats and five-star resort treatments — with practical tier, setting, and traveler-fit guidance.",
  url: "/blog/bali-spa-wellness-price-index-2026",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  keywords: "Bali spa prices 2026, Bali massage cost, Ubud wellness retreat, Seminyak spa, Bali luxury resort spa, Bali traditional massage",
  author: "The Stay & Wander",
  category: "Coastal Field Notes · Bali Wellness",
  readTime: "8 minutes",
  publishDate: "2026-08-23",
};

export const spaPriceRows = [
  {
    tier: "Tier 1: Local Parlor / Massage Warung",
    massage: "IDR 100k–180k (~$6–$11 USD)", massageAmounts: [100000, 180000],
    specialty: "IDR 200k–300k (~$13–$19 USD)", specialtyAmounts: [200000, 300000],
    setting: "Open-air rooms, fan-cooled, basic oils, walk-in availability.",
    traveler: "Backpacker, long-stay nomad, daily treatment seeker.",
  },
  {
    tier: "Tier 2: Mid-Range Boutique Spa",
    massage: "IDR 300k–650k (~$19–$42 USD)", massageAmounts: [300000, 650000],
    specialty: "IDR 600k–1.2M (~$38–$76 USD)", specialtyAmounts: [600000, 1200000],
    setting: "Air-conditioned, private suites, organic aromatherapy, herbal tea service.",
    traveler: "Mid-range holidaymakers, wellness travelers, couples.",
  },
  {
    tier: "Tier 3: 5-Star Luxury Resort Spa",
    massage: "IDR 1.8M–3.5M+ (~$115–$225+ USD)", massageAmounts: [1800000, 3500000],
    specialty: "IDR 2.5M–5.0M+ (~$160–$320+ USD)", specialtyAmounts: [2500000, 5000000],
    setting: "Clifftop or jungle valley private villas, hydrotherapy, premium imported products.",
    traveler: "Luxury travelers, honeymooners, retreat attendees.",
  },
] as const;

const decisionBranches = [
  { icon: Sparkles, priority: "seeking a quick daily treatment on a budget", recommendation: "Choose the Local Parlor tier", note: "Prioritise a straightforward 60-minute massage and walk-in convenience; choose a treatment-focused experience first.", href: BALI_WELLNESS_INDEX_AFFILIATE_LINKS.experiences, cta: "Book spa & wellness experiences" },
  { icon: HeartHandshake, priority: "looking for a spiritual wellness retreat", recommendation: "Choose Ubud boutique spas", note: "A private suite, aromatherapy, and a slower ritual fit the boutique tier better than a quick resort stop.", href: BALI_WELLNESS_INDEX_AFFILIATE_LINKS.experiences, cta: "Explore wellness experiences" },
  { icon: Sparkles, priority: "planning a honeymoon splurge", recommendation: "Choose a 5-star resort spa", note: "Pair a private treatment villa and hydrotherapy with a resort stay when the setting is part of the celebration.", href: BALI_WELLNESS_INDEX_AFFILIATE_LINKS.resorts, cta: "Search luxury resort stays" },
  { icon: Check, priority: "you want a polished mid-range day together", recommendation: "Choose a boutique spa", note: "The middle tier balances private treatment rooms and thoughtful inclusions without committing to a full resort stay.", href: BALI_WELLNESS_INDEX_AFFILIATE_LINKS.experiences, cta: "Book a treatment-focused day" },
] as const;

function formatIdrButton(value: number): string { return `IDR ${value.toLocaleString("en-US")}`; }

export default function BlogBaliSpaWellnessPriceIndex() {
  const [prefillAmount, setPrefillAmount] = useState(500000);
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
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12% 12%, #0077B6 0, transparent 30%), radial-gradient(circle at 87% 72%, #F4A261 0, transparent 24%)" }} />
        <div className="container relative z-10 max-w-5xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#F4A261]">Coastal Field Notes · Bali Wellness</p>
          <h1 className="max-w-5xl font-playfair text-4xl font-bold leading-tight md:text-6xl">{articleMetadata.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">A practical three-tier field guide to Bali&apos;s massage, spa, and retreat costs—so you can decide when a walk-in treatment is enough and when the setting is worth the splurge.</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200"><span>By {articleMetadata.author}</span><span>{articleMetadata.readTime}</span><span>Updated for 2026 planning</span></div>
        </div>
      </section>

      <main className="container max-w-6xl px-4 py-12 md:py-16">
        <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#005c91]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Blog</a>

        <section className="rounded-2xl border border-[#ecd9b9] bg-[#F8EFE0] p-6 md:p-8" aria-labelledby="methodology-title">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b20]">Methodology note</p>
          <h2 id="methodology-title" className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">A practical price baseline, not a fixed menu</h2>
          <p className="mt-3 leading-relaxed text-slate-700">Data compiled from 120+ active venue rate sheets, local tourism board updates, and field research across 5 Balinese regencies for 2026.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Treatment menus, inclusions, taxes, and booking availability can change. Use this index to set a realistic tier, then confirm the final menu and service details directly with the provider.</p>
        </section>

        <section className="mt-14" aria-labelledby="decision-title">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">The Bali Wellness Decision Framework</p><h2 id="decision-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Choose the treatment experience before the price</h2><p className="mt-4 text-lg leading-relaxed text-slate-700">Start with the pace and setting you want. The right tier is often more useful than a single headline massage rate.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {decisionBranches.map(({ icon: Icon, priority, recommendation, note, href, cta }) => (
              <article key={priority} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"><div className="flex items-start gap-4"><div className="rounded-full bg-[#e5f4fb] p-3 text-[#0077B6]"><Icon className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">If {priority}</p><h3 className="mt-1 font-playfair text-xl font-bold text-[#0D1B2A]">{recommendation}</h3></div></div><p className="mt-5 text-sm leading-relaxed text-slate-700">{note}</p><a href={href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#0077B6] underline decoration-[#F4A261] decoration-2 underline-offset-4 transition-colors hover:text-[#005c91]">{cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="benchmark-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">2026 Bali spa price benchmark</p>
          <h2 id="benchmark-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Compare the massage, treatment, setting, and traveler fit</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Select any IDR amount in the table to prefill the multi-currency calculator below with that exact benchmark.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[1050px] w-full text-left text-sm"><caption className="sr-only">Bali spa and wellness benchmark by tier, massage cost, specialty treatment cost, setting, and target traveler. Select a displayed IDR amount to prefill the calculator.</caption><thead className="bg-[#0D1B2A] text-white"><tr>{["Spa Category", "60-Min Traditional Massage", "Specialty Treatments (Scrub / Bath)", "Typical Setting & Inclusions", "Target Traveler"].map((heading) => <th key={heading} scope="col" className="px-5 py-4 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-200 text-slate-700">{spaPriceRows.map((row) => <tr key={row.tier} className="align-top hover:bg-[#fffaf3]"><th scope="row" className="px-5 py-5 font-playfair text-base font-bold text-[#0D1B2A]">{row.tier}</th><td className="px-5 py-5 font-medium text-[#005c91]"><p>{row.massage}</p><div className="mt-3 flex flex-wrap gap-2">{row.massageAmounts.map((amount) => <button type="button" key={amount} onClick={() => setPrefillAmount(amount)} className="rounded-full border border-[#0077B6]/25 bg-[#e5f4fb] px-2.5 py-1 text-xs font-bold text-[#005c91] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2" aria-label={`Use ${formatIdrButton(amount)} in the currency calculator`}>{formatIdrButton(amount)}</button>)}</div></td><td className="px-5 py-5 font-medium text-[#005c91]"><p>{row.specialty}</p><div className="mt-3 flex flex-wrap gap-2">{row.specialtyAmounts.map((amount) => <button type="button" key={amount} onClick={() => setPrefillAmount(amount)} className="rounded-full border border-[#0077B6]/25 bg-[#e5f4fb] px-2.5 py-1 text-xs font-bold text-[#005c91] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2" aria-label={`Use ${formatIdrButton(amount)} in the currency calculator`}>{formatIdrButton(amount)}</button>)}</div></td><td className="px-5 py-5 leading-relaxed">{row.setting}</td><td className="px-5 py-5 leading-relaxed font-medium text-slate-900">{row.traveler}</td></tr>)}</tbody></table></div>
          <IdrUsdConverter prefillAmount={prefillAmount} />
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" aria-labelledby="region-title">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Region variance</p><h2 id="region-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Seminyak and Canggu versus Ubud</h2><p className="mt-5 text-lg leading-relaxed text-slate-700">Tourist-dense Seminyak and Canggu tend to suit travelers looking for design-led, easily scheduled treatments between beach, dining, and social plans. Ubud suits the slower, ritual-led side of the index: boutique settings, wellness-focused days, and retreat-style pacing.</p><p className="mt-4 leading-relaxed text-slate-700">Within any tier, the exact premium depends on the provider, treatment length, private-suite access, and whether the experience is bundled with a resort stay. Compare the inclusions—not only the headline massage price.</p></div>
          <aside className="rounded-2xl border border-blue-100 bg-[#e5f4fb] p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Planning cue</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Use a spa day to shape the base.</h3><p className="mt-3 leading-relaxed text-slate-700">Choose Ubud when wellness is an itinerary anchor. Choose Seminyak or Canggu when the spa is one restorative part of a broader beach-and-dining day. Choose a resort spa when the stay itself is the experience.</p></aside>
        </section>

        <section className="mt-14 rounded-3xl bg-[#0D1B2A] px-6 py-10 text-white md:px-10 md:py-12" aria-labelledby="book-title"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4A261]">Ready to plan a reset</p><h2 id="book-title" className="mt-3 max-w-3xl font-playfair text-3xl font-bold md:text-4xl">Build a Bali stay around the wellness pace you want.</h2><p className="mt-4 max-w-2xl leading-relaxed text-slate-200">Book a treatment-focused experience for the day, or pair a private spa ritual with a resort stay when the setting is part of the trip.</p><div className="mt-8 flex flex-wrap gap-3"><a href={BALI_WELLNESS_INDEX_AFFILIATE_LINKS.experiences} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-6 py-3 font-semibold text-[#0D1B2A] transition-colors hover:bg-[#e78b4d]">Book Spa & Wellness Experiences <ChevronRight className="h-4 w-4" /></a><a href={BALI_WELLNESS_INDEX_AFFILIATE_LINKS.resorts} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">Search Luxury Resort Stays <ChevronRight className="h-4 w-4" /></a></div></section>

        <section className="mt-14 grid gap-5 md:grid-cols-2" aria-label="Related Bali guides"><a href="/blog/where-to-stay-in-bali-2026" className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Stay planning</p><h2 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Where to Stay in Bali for First-Timers</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Choose a Bali base around your preferred trip rhythm, budget, and location.</p></a><a href="/blog/bali-beach-comparison-matrix-2026" className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Coastal field notes</p><h2 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Bali Beach Comparison Matrix</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Pair a restorative treatment day with the coast that best fits your Bali plan.</p></a></section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
