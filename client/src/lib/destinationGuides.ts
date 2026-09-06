export const DESTINATION_GUIDE_PATHS = [
  "/blog/best-hotels-bali-2026",
  "/blog/best-cities-europe-summer-2026",
  "/blog/tokyo-vs-bangkok-2026",
  "/blog/brazil-travel-guide-2026",
  "/blog/best-flight-deals-asia-2026",
  "/blog/best-hotels-dubai-2026",
  "/blog/where-to-stay-lisbon-2026",
  "/blog/things-to-do-in-bali-2026",
  "/blog/bali-beach-comparison-matrix-2026",
  "/blog/bali-spa-wellness-price-index-2026",
  "/blog/bali-hotel-price-index-2026",
  "/blog/where-to-stay-in-bali-2026",
  "/blog/where-to-stay-in-bangkok-2026",
  "/blog/bangkok-hotel-budget-breakdown-2026",
  "/blog/bangkok-hotel-price-index-2026",
  "/blog/bangkok-airport-hotels-2026",
  "/blog/uae-extended-stay-sustainability-2026",
  "/blog/where-to-stay-in-tokyo-2026",
  "/blog/where-to-stay-in-seoul-2026",
  "/blog/seoul-food-price-index-2026",
  "/blog/best-4-star-hotels-bali-2026",
] as const;

const priceIndexPaths = new Set<string>([
  "/blog/bali-hotel-price-index-2026",
  "/blog/bangkok-hotel-price-index-2026",
]);

const destinationGuidePaths = new Set<string>(DESTINATION_GUIDE_PATHS);

export function isDestinationGuidePath(pathname: string) {
  return destinationGuidePaths.has(pathname);
}

export function isLongFormNonPriceDestinationGuidePath(pathname: string) {
  return isDestinationGuidePath(pathname) && !priceIndexPaths.has(pathname);
}
