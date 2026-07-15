import { useState } from "react";
import { useLocation } from "wouter";
import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, ArrowLeft } from "lucide-react";
import { generateMetaTags } from "@shared/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";

interface BlogArticle {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  relatedArticles: number[];
}

const articles: Record<number, BlogArticle> = {
  1: {
    id: 1,
    title: "Best Hotels in Bali for Every Budget 2026",
    category: "Hotel Reviews",
    image: "/manus-storage/blog-bali_5a40f78c.png",
    excerpt: "Discover luxury, mid-range, and budget-friendly stays in Bali.",
    author: "Sarah Chen",
    date: "June 15, 2026",
    readTime: "5 min read",
    content: `
      <h2>Luxury Hotels in Bali</h2>
      <p>Bali offers some of the world's most luxurious resorts and villas. From clifftop infinity pools overlooking the Indian Ocean to private beach clubs, luxury accommodations in Bali cater to every whim.</p>
      
      <h3>Ayana Resort & Spa</h3>
      <p>Located in Jimbaran, Ayana Resort & Spa is one of Bali's most iconic luxury properties. With 290 hectares of tropical gardens, multiple pools, and a world-class spa, this resort offers an unforgettable experience. The Rock Bar is famous for its sunset views and cocktails.</p>
      
      <h3>Four Seasons Bali at Jimbaran Bay</h3>
      <p>Perched on a clifftop above Jimbaran Bay, the Four Seasons offers stunning ocean views and personalized service. Each villa features a private infinity pool and direct beach access.</p>
      
      <h2>Mid-Range Hotels in Bali</h2>
      <p>For travelers seeking comfort without breaking the bank, Bali's mid-range hotels offer excellent value. Many feature modern amenities, beautiful designs, and convenient locations.</p>
      
      <h3>Hilton Bali Resort</h3>
      <p>The Hilton Bali Resort in Nusa Dua offers a perfect blend of luxury and affordability. With multiple pools, restaurants, and a private beach, it's an excellent choice for families and couples.</p>
      
      <h2>Budget-Friendly Stays</h2>
      <p>Bali is famous for its budget-friendly accommodations. You can find comfortable guesthouses, hostels, and budget hotels throughout the island, particularly in areas like Ubud and Canggu.</p>
      
      <h2>Booking Tips</h2>
      <p>When booking hotels in Bali, consider the following tips:</p>
      <ul>
        <li>Book during shoulder seasons (April-May or September-October) for better rates</li>
        <li>Compare prices across multiple booking platforms</li>
        <li>Read recent reviews from verified guests</li>
        <li>Check for package deals that include breakfast or airport transfers</li>
      </ul>
    `,
    relatedArticles: [2, 3],
  },
  2: {
    id: 2,
    title: "7 Best Cities to Visit in Europe This Summer",
    category: "Destination Guides",
    image: "/manus-storage/blog-europe-cities_de773d0d.png",
    excerpt: "From Lisbon to Prague, explore Europe's most enchanting cities.",
    author: "Marcus Johnson",
    date: "June 10, 2026",
    readTime: "7 min read",
    content: `
      <h2>Lisbon, Portugal</h2>
      <p>Lisbon is one of Europe's most charming capitals. With its colorful tiles, historic trams, and vibrant food scene, Lisbon offers a perfect blend of old-world charm and modern energy.</p>
      
      <h3>Must-See Attractions</h3>
      <ul>
        <li>Belém Tower - A UNESCO World Heritage site with stunning architecture</li>
        <li>Jerónimos Monastery - A masterpiece of Portuguese architecture</li>
        <li>São Jorge Castle - Offers panoramic views of the city</li>
        <li>Pastéis de Nata - Don't miss these iconic Portuguese custard tarts</li>
      </ul>
      
      <h2>Barcelona, Spain</h2>
      <p>Barcelona is a city of art, architecture, and passion. From Gaudí's whimsical creations to the bustling Las Ramblas, Barcelona captivates visitors with its unique energy.</p>
      
      <h2>Prague, Czech Republic</h2>
      <p>Prague's fairy-tale architecture and affordable prices make it a favorite among travelers. The Charles Bridge, Prague Castle, and Old Town Square are must-see attractions.</p>
      
      <h2>Vienna, Austria</h2>
      <p>Vienna is the capital of classical music and imperial grandeur. Visit Schönbrunn Palace, St. Stephen's Cathedral, and enjoy world-class museums.</p>
      
      <h2>Amsterdam, Netherlands</h2>
      <p>Amsterdam's picturesque canals, cycling culture, and world-class museums make it a unique destination. Visit the Anne Frank House, Van Gogh Museum, and enjoy Dutch cuisine.</p>
      
      <h2>Florence, Italy</h2>
      <p>Florence is the birthplace of the Renaissance. Explore the Uffizi Gallery, climb the Duomo, and enjoy authentic Tuscan cuisine.</p>
      
      <h2>Rome, Italy</h2>
      <p>Rome is the Eternal City, home to iconic landmarks like the Colosseum, Vatican, and Roman Forum. Every corner tells a story of ancient history.</p>
    `,
    relatedArticles: [1, 3],
  },
  3: {
    id: 3,
    title: "Tokyo vs Bangkok — Which Should You Visit First?",
    category: "Itinerary Ideas",
    image: "/manus-storage/blog-tokyo-bangkok_0467868b.png",
    excerpt: "A detailed comparison to help you choose your next Asian adventure.",
    author: "Emma Rodriguez",
    date: "June 5, 2026",
    readTime: "6 min read",
    content: `
      <h2>Tokyo: The Megacity</h2>
      <p>Tokyo is a sprawling metropolis that blends ancient traditions with cutting-edge technology. With over 37 million people, it's one of the world's largest cities.</p>
      
      <h3>Why Visit Tokyo?</h3>
      <ul>
        <li>Incredible food scene with Michelin-starred restaurants and street food</li>
        <li>Unique neighborhoods like Shibuya, Harajuku, and Shinjuku</li>
        <li>Traditional temples and gardens</li>
        <li>World-class museums and galleries</li>
        <li>Efficient public transportation</li>
      </ul>
      
      <h2>Bangkok: The City of Smiles</h2>
      <p>Bangkok is Thailand's vibrant capital, known for its ornate shrines, bustling street markets, and world-class cuisine. It's more laid-back than Tokyo but equally exciting.</p>
      
      <h3>Why Visit Bangkok?</h3>
      <ul>
        <li>Affordable prices for food, accommodation, and activities</li>
        <li>Stunning Buddhist temples and palaces</li>
        <li>Vibrant street food scene</li>
        <li>Warm, welcoming locals</li>
        <li>Easy access to nearby islands and beaches</li>
      </ul>
      
      <h2>The Verdict</h2>
      <p>Both cities are incredible in their own ways. Tokyo is better for those seeking cutting-edge technology and refined cuisine, while Bangkok is ideal for budget travelers seeking authentic Asian culture and adventure.</p>
      
      <h2>Pro Tip</h2>
      <p>Consider visiting both! Many travelers do a Tokyo-Bangkok combo trip, spending 5-7 days in each city for a comprehensive Asian experience.</p>
    `,
    relatedArticles: [1, 2],
  },
};

export default function BlogArticleDetail() {
  const [location] = useLocation();
  const articleId = parseInt(location.split("/blog/")[1] || "1");
  const article = articles[articleId];

  // Generate unique meta tags for each article
  const articleMetadata = {
    title: `${article.title} | The Stay & Wander`,
    description: article.excerpt,
    image: article.image,
    url: `/blog/${article.id}`,
    keywords: `${article.category}, travel, ${article.title.toLowerCase()}`,
    author: article.author,
    publishedDate: new Date(article.date).toISOString(),
  };
  const articleTags = generateMetaTags(articleMetadata);

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Head
        title={articleTags.title}
        description={articleTags.description}
        canonical={articleTags.canonical}
        ogTitle={articleTags.ogTitle}
        ogDescription={articleTags.ogDescription}
        ogImage={articleTags.ogImage}
        ogUrl={articleTags.ogUrl}
        keywords={articleTags.keywords}
        author={articleTags.author}
        publishedDate={articleTags.publishedDate}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="container">
            <div className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {article.category}
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", serif' }} className="text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <section className="py-6 px-4 bg-gray-50 border-b">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300" />
            <div>
              <p className="font-semibold text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-600">
                {article.date} • {article.readTime}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </section>

      {/* Article Content with Sidebar */}
      <section className="py-12 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Related Articles */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 style={{ fontFamily: '"Playfair Display", serif' }} className="text-2xl font-bold text-gray-900 mb-6">
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.map((relatedId) => {
                    const relatedArticle = articles[relatedId];
                    return (
                      <Card key={relatedId} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 w-full"
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Hotel Search Widget */}
                <Card className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Find Hotels
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Destination"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                      Search Hotels
                    </Button>
                  </div>
                </Card>

                {/* Popular Routes Widget */}
                <div>
                  <p style={{ color: "#F4A261" }} className="font-bold text-sm mb-3">
                    Popular Flight Routes
                  </p>
                  <PopularRoutesWidgetBlogSidebar />
                </div>

                {/* Newsletter Signup */}
                <Card className="p-6 bg-yellow-50">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Get Travel Tips
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Subscribe to our newsletter for exclusive deals and travel inspiration.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      Subscribe
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
