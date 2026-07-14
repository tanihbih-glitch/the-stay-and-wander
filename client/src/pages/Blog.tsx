import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const articles = [
    {
      id: 1,
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
      title: "7 Best Cities to Visit in Europe This Summer",
      category: "Destination Guides",
      image: "/manus-storage/blog-europe-cities_de773d0d.png",
      excerpt: "From Lisbon to Prague, explore Europe's most enchanting cities.",
      author: "Marcus Johnson",
      date: "June 10, 2026",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Tokyo vs Bangkok — Which Should You Visit First?",
      category: "Itinerary Ideas",
      image: "/manus-storage/blog-tokyo-bangkok_0467868b.png",
      excerpt: "A detailed comparison to help you choose your next Asian adventure.",
      author: "Emma Rodriguez",
      date: "June 5, 2026",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Ultimate Packing List for Southeast Asia — What to Bring",
      category: "Packing Lists",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      excerpt: "Complete packing guide for tropical travel with weather tips.",
      author: "Lisa Thompson",
      date: "June 1, 2026",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Complete Guide to Visiting Rio de Janeiro",
      category: "Destination Guides",
      image: "/manus-storage/brazil-destination_ea7c39d7.png",
      excerpt: "Beaches, culture, nightlife — everything about Rio.",
      author: "Diego Martins",
      date: "May 25, 2026",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "European Summer Packing List — Pack Light, Travel Smart",
      category: "Packing Lists",
      image: "/manus-storage/blog-europe-cities_de773d0d.png",
      excerpt: "Essential packing guide for European summer travel.",
      author: "Emma Wilson",
      date: "May 20, 2026",
      readTime: "7 min read",
    },
    {
      id: 7,
      title: "Hidden Gems in Portugal — Beyond Lisbon and Porto",
      category: "Destination Guides",
      image: "/manus-storage/blog-europe-cities_de773d0d.png",
      excerpt: "Discover Sintra, Douro Valley, Algarve and other treasures.",
      author: "Sofia Oliveira",
      date: "May 15, 2026",
      readTime: "8 min read",
    },
    {
      id: 8,
      title: "Best Street Food in Asia — A Culinary Adventure",
      category: "Destination Guides",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      excerpt: "From Bangkok night markets to Tokyo ramen alleys.",
      author: "James Chen",
      date: "May 10, 2026",
      readTime: "6 min read",
    },
    {
      id: 9,
      title: "Best Budget Travel Destinations 2026",
      category: "Destination Guides",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      excerpt: "Travel the world on $30/day — cheapest destinations.",
      author: "Michael Torres",
      date: "May 5, 2026",
      readTime: "10 min read",
    },
  ];

  const categories = [
    "all",
    "Destination Guides",
    "Hotel Reviews",
    "Packing Lists",
    "Itinerary Ideas",
  ];

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-20 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 py-12 md:py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Travel Blog
            </h1>
            <p className="text-lg text-gray-600">
              Destination guides, packing tips, and travel inspiration
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-gray-200">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all"
                    ? "All Articles"
                    : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          {article.author}
                        </p>
                        <span className="text-xs text-gray-500">
                          {article.date}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {article.readTime}
                        </span>
                        <Link href={`/blog/${article.id}`}>
                          <Button
                            variant="outline"
                            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-sm"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
