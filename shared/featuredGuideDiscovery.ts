/**
 * Source of truth for newly promoted public guides.
 *
 * Register every new guide here before publishing. The registry feeds the
 * homepage Latest Guides section, the Blog index, and canonical sitemap-route
 * assertions so a guide cannot silently ship without normal internal discovery.
 */
export interface FeaturedGuideDiscovery {
  id: number;
  path: `/blog/${string}`;
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const featuredGuideDiscovery: readonly FeaturedGuideDiscovery[] = [
  {
    id: 19,
    path: "/blog/seoul-food-price-index-2026",
    slug: "seoul-food-price-index-2026",
    title: "Seoul Food & Dining Price Index (2026): Best Districts, Iconic Eats & Area Cost Breakdown",
    category: "Seoul Guide · Korea Travel",
    image: "/manus-storage/seoul-where-to-stay-hero_050ef7b1.jpg",
    excerpt: "Compare Seoul dining costs by district, from market snacks and BBQ to premium tasting menus, with practical daily food budgets for 2026.",
    date: "August 23, 2026",
    readTime: "9 min read",
  },
  {
    id: 18,
    path: "/blog/bali-spa-wellness-price-index-2026",
    slug: "bali-spa-wellness-price-index-2026",
    title: "Bali Spa & Wellness Price Index (2026): Local Street Warungs vs. Luxury Resort Treatments",
    category: "Coastal Field Notes · Bali Wellness",
    image: "/manus-storage/blog-bali_5a40f78c.png",
    excerpt: "Compare Bali's local massage warungs, boutique spa rituals, and five-star resort treatments by price, setting, inclusions, and traveler fit.",
    date: "August 23, 2026",
    readTime: "8 min read",
  },
  {
    id: 17,
    path: "/blog/bali-beach-comparison-matrix-2026",
    slug: "bali-beach-comparison-matrix-2026",
    title: "Bali Beach Comparison Matrix (2026): Sand Quality, Swim Safety & Entry Fees by Region",
    category: "Bali Guide · Indonesia Travel",
    image: "/manus-storage/blog-bali_5a40f78c.png",
    excerpt: "Compare five Bali coastal regions for sand, sea conditions, practical access costs, surf, snorkeling, family swimming, and viewpoint days.",
    date: "August 22, 2026",
    readTime: "9 min read",
  },
] as const;

export const featuredGuidePaths = featuredGuideDiscovery.map((guide) => guide.path);
