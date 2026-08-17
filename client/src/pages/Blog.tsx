import { useState } from "react";
import Head from "@/components/Head";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { generateBlogMetadata, generateMetaTags } from "@shared/seo";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/BlogArticleSchema";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const articles = [
    {
      id: 15,
      slug: "bangkok-airport-hotels-2026",
      title: "Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers",
      category: "Bangkok Hotels · Asia Travel",
      image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
      excerpt: "Choose an in-terminal, connected, or free-shuttle hotel near Suvarnabhumi Airport, with layover timing tips for BKK.",
      author: "The Stay & Wander",
      date: "August 17, 2026",
      readTime: "7 min read",
    },
    {
      id: 14,
      slug: "bangkok-hotel-budget-breakdown-2026",
      title: "How Much Does a Hotel in Bangkok Really Cost in 2026? (Budget to Luxury Breakdown)",
      category: "Bangkok Hotels · Asia Travel",
      image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
      excerpt: "A practical 2026 breakdown of Bangkok accommodation costs, from hostels and boutique stays to five-star riverside hotels.",
      author: "The Stay & Wander",
      date: "August 17, 2026",
      readTime: "8 min read",
    },
    {
      id: 13,
      slug: "where-to-stay-in-seoul-2026",
      title: "Where to Stay in Seoul: Best Areas for First-Timers (2026 Guide)",
      category: "Hotel Reviews · Asia Travel",
      image: "/manus-storage/seoul-where-to-stay-hero_050ef7b1.jpg",
      excerpt: "Compare Myeongdong, Gangnam, Hongdae, Itaewon, and Insadong to choose a Seoul base that fits your first trip and budget.",
      author: "The Stay & Wander",
      date: "August 12, 2026",
      readTime: "7 min read",
    },
    {
      id: 12,
      slug: "where-to-stay-in-tokyo-2026",
      title: "Where to Stay in Tokyo: Best Neighborhoods for First-Timers (2026 Guide)",
      category: "Hotel Reviews · Asia Travel",
      image: "/manus-storage/tokyo-where-to-stay-hero_78be225b.jpg",
      excerpt: "Compare Shinjuku, Shibuya, Asakusa, Ginza, and Ikebukuro to choose a Tokyo neighborhood that fits your first trip and budget.",
      author: "The Stay & Wander",
      date: "August 12, 2026",
      readTime: "7 min read",
    },
    {
      id: 11,
      slug: "where-to-stay-in-bangkok-2026",
      title: "Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)",
      category: "Hotel Reviews · Asia Travel",
      image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
      excerpt: "Compare Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn to choose a Bangkok base for your first trip and budget.",
      author: "The Stay & Wander",
      date: "August 3, 2026",
      readTime: "6 min read",
    },
    {
      id: 10,
      slug: "things-to-do-in-bali-2026",
      title: "Things to Do in Bali: 50 Best Experiences for 2026",
      category: "Bali Guide · Indonesia Travel",
      image: "/manus-storage/bali-tegallalang-rice-terraces-hero_030f04ef.jpg",
      excerpt: "Plan a more considered Bali trip with 50 experiences across temples, beaches, food, nature, wellness, and island escapes.",
      author: "The Stay & Wander",
      date: "July 30, 2026",
      readTime: "18 min read",
    },
    {
      id: 9,
      slug: "best-hotels-dubai-2026",
      title: "Best Hotels in Dubai & Abu Dhabi for Every Kind of Stay",
      category: "Middle East · Hotel Reviews",
      image: "/manus-storage/dubai-middle-east-destination_1431ce58.png",
      excerpt: "Use this Dubai and Abu Dhabi guide to choose a UAE base for skyline views, beach time, culture, and desert experiences.",
      author: "The Stay & Wander",
      date: "July 30, 2026",
      readTime: "7 min read",
    },
    {
      id: 8,
      slug: "where-to-stay-in-bali-2026",
      title: "Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)",
      category: "Hotel Reviews · Asia Travel",
      image: "/manus-storage/blog-bali_5a40f78c.png",
      excerpt: "Compare Seminyak, Ubud, Uluwatu, and Canggu to choose a Bali base for your first trip and budget.",
      author: "The Stay & Wander",
      date: "July 27, 2026",
      readTime: "5 min read",
    },
    {
      id: 7,
      slug: "best-4-star-hotels-bali-2026",
      title: "Best 4 Star Hotels in Bali 2026 — Top Picks From $80/Night",
      category: "Hotel Reviews · Asia Travel",
      image: "/manus-storage/blog-bali_5a40f78c.png",
      excerpt: "Top four-star Bali stays across Seminyak, Ubud, Canggu, Uluwatu, and Nusa Dua.",
      author: "The Stay & Wander",
      date: "July 20, 2026",
      readTime: "9 min read",
    },
    {
      id: 1,
      slug: "best-hotels-bali-2026",
      title: "Best Hotels in Bali for Every Budget 2026",
      category: "Hotel Reviews",
      image: "/manus-storage/blog-bali_5a40f78c.png",
      excerpt: "Discover luxury, mid-range, and budget-friendly stays in Bali.",
      author: "Sarah Chen",
      date: "June 15, 2026",
      readTime: "5 min read",
    },
    {
      id: 2,
      slug: "best-cities-europe-summer-2026",
      title: "7 Best Cities to Visit in Europe This Summer",
      category: "Destination Guides",
      image: "/manus-storage/blog-europe-cities_de773d0d.png",
      excerpt:
        "From Lisbon to Prague, explore Europe's most enchanting cities.",
      author: "Marcus Johnson",
      date: "June 10, 2026",
      readTime: "7 min read",
    },
    {
      id: 3,
      slug: "tokyo-vs-bangkok-2026",
      title: "Tokyo vs Bangkok — Which Should You Visit First?",
      category: "Itinerary Ideas",
      image: "/manus-storage/blog-tokyo-bangkok_0467868b.png",
      excerpt:
        "A detailed comparison to help you choose your next Asian adventure.",
      author: "Emma Rodriguez",
      date: "June 5, 2026",
      readTime: "6 min read",
    },
    {
      id: 4,
      slug: "where-to-stay-lisbon-2026",
      title: "Where to Stay in Lisbon 2026 — Best Neighbourhoods and Hotels for Every Budget",
      category: "Hotel Reviews · Europe Travel",
      image: "/manus-storage/lisbon-yellow-tram-hero_11c0dde1.jpg",
      excerpt:
        "Not sure where to stay in Lisbon? Choose between Alfama, Chiado, Bairro Alto, Belém and beyond — with hotel ideas for every budget.",
      author: "The Stay & Wander",
      date: "July 30, 2026",
      readTime: "10 min read",
    },
    {
      id: 5,
      slug: "brazil-travel-guide-2026",
      title: "Brazil Travel Guide — Everything You Need to Know",
      category: "Destination Guides",
      image: "/manus-storage/brazil-destination_ea7c39d7.png",
      excerpt:
        "Complete guide to planning your Brazilian adventure from visa to activities.",
      author: "Ana Costa",
      date: "May 20, 2026",
      readTime: "10 min read",
    },
    {
      id: 6,
      slug: "best-flight-deals-asia-2026",
      title: "Best Flight Deals to Asia in 2026",
      category: "Affiliate Picks",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      excerpt:
        "Expert tips for finding the cheapest flights to Asia this year.",
      author: "James Wilson",
      date: "May 15, 2026",
      readTime: "4 min read",
    },
  ];

  const categories = [
    "all",
    "destination guides",
    "hotel reviews",
    "packing lists",
    "affiliate picks",
    "itinerary ideas",
    "middle east",
  ];

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter(
          (article) =>
            article.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const breadcrumbItems = [
    { name: "Home", url: "https://thestayandwander.com" },
    { name: "Blog", url: "https://thestayandwander.com/blog" },
  ];

  const blogPageMetadata = {
    title: "Travel Blog - Tips, Guides & Inspiration | The Stay & Wander",
    description: "Expert travel guides, hotel reviews, packing tips, and insider stories from Europe, Asia, Brazil and the Middle East.",
    image: "https://thestayandwander.com/og-image.png",
    url: "/blog",
    keywords: "travel blog, travel guides, hotel reviews, packing tips, travel tips",
  };
  const blogTags = generateMetaTags(blogPageMetadata);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Head
        title={blogTags.title}
        description={blogTags.description}
        canonical={blogTags.canonical}
        ogTitle={blogTags.ogTitle}
        ogDescription={blogTags.ogDescription}
        ogImage={blogTags.ogImage}
        ogUrl={blogTags.ogUrl}
        keywords={blogTags.keywords}
      />
      <OrganizationSchema />
      {BreadcrumbSchema(breadcrumbItems)}
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h1 style={{ fontFamily: '"Playfair Display", serif' }} className="text-4xl font-bold text-gray-900 mb-2">
            Travel Smarter. Stay Better. Wander Further.
          </h1>
          <p className="text-lg text-gray-600">
            Expert travel guides, hotel reviews, packing tips and insider stories
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 py-4 px-4">
        <div className="container flex gap-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-semibold text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 style={{ fontFamily: '"Playfair Display", serif' }} className="text-lg font-bold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300" />
                      <span>{article.author}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <Link href={`/blog/${article.slug}`}>
                      <Button
                        variant="outline"
                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-sm"
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: '"Playfair Display", serif' }} className="text-3xl font-bold text-gray-900 mb-4">
            Never Miss a Travel Story
          </h2>
          <p className="text-gray-600 mb-6">
            Get our latest articles, travel tips, and exclusive deals delivered
            to your inbox weekly.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
