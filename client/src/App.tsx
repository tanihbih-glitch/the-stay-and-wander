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
import BlogEuropeCities from "./pages/BlogEuropeCities";
import BlogTokyoBangkok from "./pages/BlogTokyoBangkok";
import BlogBrazil from "./pages/BlogBrazil";
import BlogFlightDeals from "./pages/BlogFlightDeals";

import { AffiliateAnalytics } from "./pages/AffiliateAnalytics";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/itineraries"} component={Itineraries} />
      <Route path={"/itinerary/:id"} component={ItineraryDetail} />
      <Route path={"/booking"} component={Booking} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/best-hotels-bali-2026"} component={BlogBaliHotels} />
      <Route path={"/blog/best-cities-europe-summer-2026"} component={BlogEuropeCities} />
      <Route path={"/blog/tokyo-vs-bangkok-2026"} component={BlogTokyoBangkok} />
      <Route path={"/blog/brazil-travel-guide-2026"} component={BlogBrazil} />
      <Route path={"/blog/best-flight-deals-asia-2026"} component={BlogFlightDeals} />
      {/* Redirects from old numeric URLs to new semantic slugs */}
      <Route path={"/blog/1"} component={() => { window.location.href = '/blog/best-hotels-bali-2026'; return null; }} />
      <Route path={"/blog/2"} component={() => { window.location.href = '/blog/best-cities-europe-summer-2026'; return null; }} />
      <Route path={"/blog/3"} component={() => { window.location.href = '/blog/tokyo-vs-bangkok-2026'; return null; }} />
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
