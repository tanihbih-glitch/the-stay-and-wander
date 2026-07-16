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
import MailchimpPopup from "@/components/MailchimpPopup";
import BlogEmailSignup from "@/components/BlogEmailSignup";

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
      
      <h3>Sofitel Bali Nusa Dua Beach Resort</h3>
      <p>This beachfront resort combines French elegance with Balinese charm. Enjoy world-class dining, spa facilities, and direct beach access.</p>
      
      <h2>Budget-Friendly Hotels in Bali</h2>
      <p>Bali is famous for offering incredible value. Budget hotels here often rival mid-range properties in other destinations.</p>
      
      <h3>Kuta Beach Hotel</h3>
      <p>Located on iconic Kuta Beach, this hotel offers clean rooms and great value. The beachfront location and proximity to shops and restaurants make it ideal for budget travelers.</p>
      
      <h3>Ubud Terrace Bungalows</h3>
      <p>Nestled in the rice terraces of Ubud, these charming bungalows offer an authentic Balinese experience at budget prices.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Complete Your Bali Trip — Book Activities</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
    `,
    relatedArticles: [2, 3],
  },
  2: {
    id: 2,
    title: "7 Best Cities to Visit in Europe This Summer",
    category: "Destination Guides",
    image: "/manus-storage/blog-europe-cities_de773d0d.png",
    excerpt: "From Lisbon to Kotor, explore Europe's most enchanting cities.",
    author: "Marcus Johnson",
    date: "June 10, 2026",
    readTime: "7 min read",
    content: `
      <h2>Lisbon, Portugal</h2>
      <p>Lisbon is one of Europe's most charming capitals. With its colorful tiles, historic trams, and vibrant food scene, Lisbon offers a perfect blend of old-world charm and modern energy. Explore the historic neighborhoods of Alfama and Belém, ride the iconic Tram 28, and enjoy fresh seafood at waterfront restaurants.</p>
      
      <h3>Where to Stay</h3>
      <p>Memmo Alfama Hotel offers stunning views of the Tagus River with rooftop terraces, while Memmo Baleeira Hotel provides a more boutique experience in the heart of the city with personalized service.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Lisbon</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Dubrovnik, Croatia</h2>
      <p>Dubrovnik, the "Pearl of the Adriatic," is a stunning medieval walled city perched on the Dalmatian coast. Its red-roofed buildings and crystal-clear waters create a fairy-tale setting. Walk the ancient city walls, explore the marble-paved streets, and take a boat trip to nearby islands.</p>
      
      <h3>Where to Stay</h3>
      <p>Hotel Excelsior offers luxury accommodations with sea views and direct beach access, while Boutique Hotel Kazbah provides intimate charm within the old town walls with traditional Dalmatian architecture.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Dubrovnik</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Budapest, Hungary</h2>
      <p>Budapest, the "Paris of the East," is a captivating city straddling the Danube River. Known for its thermal baths, ruin bars, and stunning architecture, Budapest is a must-visit destination. Soak in the famous Széchenyi Thermal Bath, explore the Danube promenade, and enjoy vibrant nightlife.</p>
      
      <h3>Where to Stay</h3>
      <p>Four Seasons Hotel Gresham Palace offers historic luxury with Danube views, while Aria Hotel Budapest provides contemporary elegance with rooftop views and personalized service.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Budapest</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Porto, Portugal</h2>
      <p>Porto, Portugal's second-largest city, is a charming riverside destination famous for its port wine and colorful azulejo tiles. The Douro River and historic Ribeira district are highlights. Visit the stunning Dom Luís Bridge, explore the wine cellars, and enjoy fresh grilled sardines.</p>
      
      <h3>Where to Stay</h3>
      <p>The Yeatman offers wine-themed luxury with Douro Valley views and a Michelin-starred restaurant, while Livraria Lello Hotel combines literary charm with modern comfort in a historic building.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Porto</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Athens, Greece</h2>
      <p>Athens, the cradle of Western civilization, is a vibrant city where ancient history meets modern culture. The Acropolis, Parthenon, and countless museums showcase Greece's rich heritage. Climb to the Acropolis at sunset, explore the Plaka district, and enjoy authentic Greek cuisine.</p>
      
      <h3>Where to Stay</h3>
      <p>Hotel Grande Bretagne offers timeless elegance with Acropolis views and legendary service, while Zillers Boutique Hotel provides intimate charm in the Plaka district with rooftop dining.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Athens</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Ljubljana, Slovenia</h2>
      <p>Ljubljana, Europe's smallest capital, is a charming and sustainable city with a thriving cultural scene. The Ljubljana Castle, Central Market, and Metelkova district are must-see attractions. Cycle through green spaces, enjoy the vibrant café culture, and explore the alternative art scene.</p>
      
      <h3>Where to Stay</h3>
      <p>Hotel Lev offers modern comfort in the city center with contemporary design, while Cubo offers design-forward accommodations with artistic flair and locally-sourced amenities.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Ljubljana</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>Kotor, Montenegro</h2>
      <p>Kotor is a hidden gem nestled in a stunning bay surrounded by dramatic mountains. This medieval walled town offers a perfect blend of history, natural beauty, and Mediterranean charm. Hike to the fortress, explore the narrow cobblestone streets, and enjoy fresh seafood with bay views.</p>
      
      <h3>Where to Stay</h3>
      <p>Palazzo Radomiri offers luxury within the old town with historic charm, while Hotel Fjord provides contemporary comfort with bay views and modern amenities.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top Tours in Kotor</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <p style="text-align: center; margin-top: 30px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Browse All European Tours & Experiences</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
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
      
      <h3>Where to Stay in Tokyo</h3>
      <p>Tokyo offers luxury options like the Park Hyatt Tokyo with stunning city views, and mid-range favorites like Hotel Gracery Shinjuku for convenient access to shopping and dining.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top-Rated Tokyo Tours & Experiences</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
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
      
      <h3>Where to Stay in Bangkok</h3>
      <p>Bangkok features luxury properties like the Mandarin Oriental with riverside elegance, and budget-friendly options like NapPark Design Hotel for authentic local experiences.</p>
      
      <p style="text-align: center; margin-top: 20px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Top-Rated Bangkok Tours & Experiences</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
      
      <h2>The Verdict</h2>
      <p>Both cities are incredible in their own ways. Tokyo is better for those seeking cutting-edge technology and refined cuisine, while Bangkok is ideal for budget travelers seeking authentic Asian culture and adventure.</p>
      
      <h2>Pro Tip</h2>
      <p>Consider visiting both! Many travelers do a Tokyo-Bangkok combo trip, spending 5-7 days in each city for a comprehensive Asian experience.</p>
      
      <p style="text-align: center; margin-top: 30px; margin-bottom: 10px;"><span style="background-color: #D4AF37; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">Browse All Asia Tours</span></p>
      <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
    `,
    relatedArticles: [1, 2],
  },
};

export default function BlogArticleDetail() {
  const [location] = useLocation();
  const articleId = parseInt(location.split("/")[2]) || 1;
  const article = articles[articleId as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Button
            onClick={() => (window.location.href = "/blog")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const metaTags = generateMetaTags({
    title: article.title,
    description: article.excerpt,
    image: article.image,
    url: `/blog/${articleId}`,
  });

  return (
    <div className="min-h-screen bg-white">
      <Head {...metaTags} />
      <Header />

      {/* Article Header */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => (window.location.href = "/blog")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PopularRoutesWidgetBlogSidebar />
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get More Travel Inspiration
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive travel tips, destination guides, and special offers.
          </p>
          <MailchimpPopup
            title="Subscribe to Our Newsletter"
            description="Get exclusive travel tips, deals, and inspiration delivered to your inbox."
            trigger="manual"
          />
        </div>
      </section>

      {/* Email Signup Section */}
      <BlogEmailSignup />

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {article.relatedArticles.map((relatedId) => {
                const relatedArticle =
                  articles[relatedId as keyof typeof articles];
                if (!relatedArticle) return null;

                return (
                  <Card
                    key={relatedId}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/blog/${relatedId}`)
                    }
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <p className="text-sm font-semibold text-blue-600 uppercase mb-2">
                        {relatedArticle.category}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {relatedArticle.date} • {relatedArticle.readTime}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
