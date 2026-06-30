import { useState } from "react";
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
      excerpt:
        "From Lisbon to Prague, explore Europe's most enchanting cities.",
      author: "Marcus Johnson",
      date: "June 10, 2026",
      readTime: "7 min read",
    },
    {
      id: 3,
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
      title: "Where to Stay in Lisbon — Neighbourhood Guide",
      category: "Destination Guides",
      image: "/manus-storage/blog-europe-cities_de773d0d.png",
      excerpt:
        "Navigate Lisbon's vibrant neighborhoods and find your perfect base.",
      author: "Pedro Silva",
      date: "May 28, 2026",
      readTime: "8 min read",
    },
    {
      id: 5,
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
  ];

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter(
          (article) =>
            article.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
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
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-sm"
                    >
                      Read More
                    </Button>
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
