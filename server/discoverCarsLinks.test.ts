import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DISCOVERCARS_AFFILIATE_URL, affiliateLinks } from "../client/src/lib/affiliateLinks";

const root = resolve(import.meta.dirname, "..");
const readSource = (relativePath: string) => readFileSync(resolve(root, relativePath), "utf8");

describe("DiscoverCars affiliate destinations", () => {
  const expectedUrl = "https://www.discovercars.com/?a_aid=Thestayandwander";

  it("centralizes the supplied DiscoverCars URL and removes legacy car-rental destinations", () => {
    expect(DISCOVERCARS_AFFILIATE_URL).toBe(expectedUrl);
    expect(Object.values(affiliateLinks.carRentals).every((rental) => rental.link === expectedUrl)).toBe(true);
    expect(Object.values(affiliateLinks.carRentals).every((rental) => rental.network === "discovercars")).toBe(true);
    expect(readSource("client/src/lib/affiliateLinks.ts")).not.toContain("rentalcars.com");
  });

  it("wires all requested booking, home, and footer car-rental actions to safe new-tab links", () => {
    const booking = readSource("client/src/pages/Booking.tsx");
    const home = readSource("client/src/pages/Home.tsx");
    const footer = readSource("client/src/components/Footer.tsx");

    ["Search Car Rentals", "Compare Prices", "Economy", "SUV & Family", "Luxury"].forEach((label) => expect(booking).toContain(label));
    [booking, home, footer].forEach((source) => {
      expect(source).toContain("DISCOVERCARS_AFFILIATE_URL");
      expect(source).toContain('target="_blank"');
      expect(source).toContain('rel="noopener noreferrer"');
    });
    expect(home).toContain("Search Car Rentals");
    expect(footer).toContain("Car Rentals");
    expect(footer.indexOf("Book Now")).toBeLessThan(footer.indexOf("Car Rentals"));
    expect(home).not.toContain("rentalcars.com");
  });

  it("adds the requested Bali and Europe CTA copy above the final booking controls", () => {
    const bali = readSource("client/src/pages/BlogBaliHotels.tsx");
    const baliFourStar = readSource("client/src/pages/BlogBaliFourStarHotels.tsx");
    const europe = readSource("client/src/pages/BlogEuropeCities.tsx");

    [bali, baliFourStar].forEach((source) => {
      expect(source).toContain("Need a Car in Bali? Compare the best rental prices from 500+ suppliers worldwide.");
      expect(source).toContain("Search Car Rentals in Bali");
      expect(source).toContain("DISCOVERCARS_AFFILIATE_URL");
      expect(source).toContain('target="_blank"');
      expect(source).toContain('rel="noopener noreferrer"');
    });

    expect(europe).toContain("Renting a Car in Europe? Compare the best prices across all major suppliers.");
    expect(europe).toContain("Search Car Rentals in Europe");
    expect(europe).toContain("DISCOVERCARS_AFFILIATE_URL");
    expect(europe).toContain('target="_blank"');
    expect(europe).toContain('rel="noopener noreferrer"');
  });
});
