import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import ItineraryDetail from "./pages/ItineraryDetail";
import Booking from "./pages/Booking";
import Blog from "./pages/Blog";
import BlogArticleDetail from "./pages/BlogArticleDetail";
import BlogBaliHotels from "./pages/BlogBaliHotels";
import BlogBaliFourStarHotels from "./pages/BlogBaliFourStarHotels";
import BlogBaliHotelPrices from "./pages/BlogBaliHotelPrices";
import BlogBangkokHotelPrices from "./pages/BlogBangkokHotelPrices";
import BlogBangkokHotelBudgetBreakdown from "./pages/BlogBangkokHotelBudgetBreakdown";
import BlogBangkokAirportHotels from "./pages/BlogBangkokAirportHotels";
import BlogUaeExtendedStaySustainability from "./pages/BlogUaeExtendedStaySustainability";
import BlogEuropeCities from "./pages/BlogEuropeCities";
import BlogTokyoBangkok from "./pages/BlogTokyoBangkok";
import BlogBrazil from "./pages/BlogBrazil";
import BlogFlightDeals from "./pages/BlogFlightDeals";
import BlogDubaiHotels from "./pages/BlogDubaiHotels";
import BlogLisbonHotels from "./pages/BlogLisbonHotels";
import BlogBaliExperiences from "./pages/BlogBaliExperiences";
import BlogBaliBeachComparison from "./pages/BlogBaliBeachComparison";
import BlogBaliSpaWellnessPriceIndex from "./pages/BlogBaliSpaWellnessPriceIndex";
import BlogTokyoStay from "./pages/BlogTokyoStay";
import BlogSeoulStay from "./pages/BlogSeoulStay";
import BlogSeoulFoodPriceIndex from "./pages/BlogSeoulFoodPriceIndex";
import TripPlanner from "./pages/TripPlanner";
import TripPlannerSuccess from "./pages/TripPlannerSuccess";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Deals from "./pages/Deals";
import CorporateTravel from "./pages/CorporateTravel";

import { AffiliateAnalytics } from "./pages/AffiliateAnalytics";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/itineraries"} component={Itineraries} />
      <Route path={"/itinerary/:id"} component={ItineraryDetail} />
      <Route path={"/booking"} component={Booking} />
      <Route path={"/trip-planner"} component={TripPlanner} />
      <Route path={"/trip-planner/success"} component={TripPlannerSuccess} />
      <Route path={"/about"} component={About} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/deals"} component={Deals} />
      <Route path={"/corporate-travel"} component={CorporateTravel} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/best-hotels-bali-2026"} component={BlogBaliHotels} />
      <Route path={"/blog/best-4-star-hotels-bali-2026"} component={BlogBaliFourStarHotels} />
      <Route path={"/blog/where-to-stay-in-bali-2026"} component={BlogBaliHotelPrices} />
      <Route path={"/blog/where-to-stay-in-bangkok-2026"} component={BlogBangkokHotelPrices} />
      <Route path={"/blog/bangkok-hotel-budget-breakdown-2026"} component={BlogBangkokHotelBudgetBreakdown} />
      <Route path={"/blog/bangkok-airport-hotels-2026"} component={BlogBangkokAirportHotels} />
      <Route path={"/blog/uae-extended-stay-sustainability-2026"} component={BlogUaeExtendedStaySustainability} />
      <Route path={"/blog/best-cities-europe-summer-2026"} component={BlogEuropeCities} />
      <Route path={"/blog/tokyo-vs-bangkok-2026"} component={BlogTokyoBangkok} />
      <Route path={"/blog/brazil-travel-guide-2026"} component={BlogBrazil} />
      <Route path={"/blog/best-flight-deals-asia-2026"} component={BlogFlightDeals} />
      <Route path={"/blog/best-hotels-dubai-2026"} component={BlogDubaiHotels} />
      <Route path={"/blog/where-to-stay-lisbon-2026"} component={BlogLisbonHotels} />
      <Route path={"/blog/things-to-do-in-bali-2026"} component={BlogBaliExperiences} />
      <Route path={"/blog/bali-beach-comparison-matrix-2026"} component={BlogBaliBeachComparison} />
      <Route path={"/blog/bali-spa-wellness-price-index-2026"} component={BlogBaliSpaWellnessPriceIndex} />
      <Route path={"/blog/where-to-stay-in-tokyo-2026"} component={BlogTokyoStay} />
      <Route path={"/blog/where-to-stay-in-seoul-2026"} component={BlogSeoulStay} />
      <Route path={"/blog/seoul-food-price-index-2026"} component={BlogSeoulFoodPriceIndex} />
      {/* Redirects from old numeric URLs to new semantic slugs */}
      <Route path={"/blog/1"} component={() => { window.location.href = '/blog/best-hotels-bali-2026'; return null; }} />
      <Route path={"/blog/2"} component={() => { window.location.href = '/blog/best-cities-europe-summer-2026'; return null; }} />
      <Route path={"/blog/3"} component={() => { window.location.href = '/blog/tokyo-vs-bangkok-2026'; return null; }} />
      <Route path={"/blog/4"} component={() => { window.location.href = '/blog/where-to-stay-lisbon-2026'; return null; }} />
      <Route path={"/blog/5"} component={() => { window.location.href = '/blog/brazil-travel-guide-2026'; return null; }} />
      <Route path={"/blog/6"} component={() => { window.location.href = '/blog/best-flight-deals-asia-2026'; return null; }} />
      <Route path={"/blog/:id"} component={BlogArticleDetail} />
      {/* Admin routes */}
      <Route path={"/admin/analytics"} component={AffiliateAnalytics} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
