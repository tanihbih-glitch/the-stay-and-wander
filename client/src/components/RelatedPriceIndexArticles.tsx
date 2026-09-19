import { ArrowUpRight, Compass } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

type PriceIndexDestination = "bali" | "bangkok";
type RelatedGuideSourcePath = "/blog/bali-hotel-price-index-2026" | "/blog/bangkok-hotel-price-index-2026";
type RelatedGuideDestinationPath =
  | "/blog/where-to-stay-in-bali-2026"
  | "/blog/bali-spa-wellness-price-index-2026"
  | "/blog/bali-beach-comparison-matrix-2026"
  | "/blog/where-to-stay-in-bangkok-2026"
  | "/blog/bangkok-hotel-budget-breakdown-2026"
  | "/blog/bangkok-airport-hotels-2026";

const sourcePathByDestination: Record<PriceIndexDestination, RelatedGuideSourcePath> = {
  bali: "/blog/bali-hotel-price-index-2026",
  bangkok: "/blog/bangkok-hotel-price-index-2026",
};

type RelatedArticle = {
  href: RelatedGuideDestinationPath;
  eyebrow: string;
  title: string;
  description: string;
};

const relatedArticlesByDestination: Record<PriceIndexDestination, readonly RelatedArticle[]> = {
  bali: [
    {
      href: "/blog/where-to-stay-in-bali-2026",
      eyebrow: "Area guide",
      title: "Where to Stay in Bali for First-Timers",
      description: "Match Seminyak, Ubud, Uluwatu, or Canggu to the trip rhythm you want before comparing individual properties.",
    },
    {
      href: "/blog/bali-spa-wellness-price-index-2026",
      eyebrow: "Wellness costs",
      title: "Bali Spa & Wellness Price Index",
      description: "Plan treatment costs from local massage parlors through boutique and resort spa experiences.",
    },
    {
      href: "/blog/bali-beach-comparison-matrix-2026",
      eyebrow: "Coastal planning",
      title: "Bali Beach Comparison Matrix",
      description: "Compare Bali regions for sand, swim conditions, entry fees, surf, snorkeling, and family-friendly water.",
    },
  ],
  bangkok: [
    {
      href: "/blog/where-to-stay-in-bangkok-2026",
      eyebrow: "Area guide",
      title: "Where to Stay in Bangkok for First-Timers",
      description: "Compare Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn by transport, pace, and trip style.",
    },
    {
      href: "/blog/bangkok-hotel-budget-breakdown-2026",
      eyebrow: "Hotel costs",
      title: "Bangkok Hotel Cost Breakdown",
      description: "See accommodation planning ranges from hostels through five-star stays, plus booking factors by tier.",
    },
    {
      href: "/blog/bangkok-airport-hotels-2026",
      eyebrow: "Layover guide",
      title: "Where to Stay Near Bangkok Airport",
      description: "Plan an in-terminal or shuttle-connected layover stay with practical timing guidance for Suvarnabhumi.",
    },
  ],
};

interface RelatedPriceIndexArticlesProps {
  destination: PriceIndexDestination;
}

/** Retains readers on-site with contextual, non-duplicative planning guides. */
export default function RelatedPriceIndexArticles({ destination }: RelatedPriceIndexArticlesProps) {
  const articles = relatedArticlesByDestination[destination];
  const relatedGuideClick = trpc.analytics.trackRelatedGuideClick.useMutation();

  const recordSelection = (destinationPath: RelatedGuideDestinationPath) => {
    relatedGuideClick.mutate({
      sourcePath: sourcePathByDestination[destination],
      destinationPath,
    });
  };

  return (
    <section className="mt-14 border-t border-slate-200 pt-12" aria-labelledby="related-articles-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Keep planning</p>
          <h2 id="related-articles-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">
            Related travel guides
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          Continue from accommodation costs to area fit, practical planning, and complementary trip research.
        </p>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            onClick={() => recordSelection(article.href)}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9dce9] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">{article.eyebrow}</span>
              <Compass className="h-5 w-5 shrink-0 text-[#F4A261]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-playfair text-xl font-bold leading-snug text-[#0D1B2A] group-hover:text-[#0077B6]">
              {article.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{article.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6]">
              Read guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
