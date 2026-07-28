import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { pageMetadataConfig } from "../shared/seo";
import {
  buildMailchimpJsonpUrl,
  cleanMailchimpMessage,
  dealsMailchimpConfig,
  isValidEmailAddress,
} from "../client/src/lib/mailchimp";

const projectRoot = path.resolve(process.cwd());
const readProjectFile = (relativePath: string) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("Deals page", () => {
  const dealsSource = readProjectFile("client/src/pages/Deals.tsx");
  const affiliateSource = readProjectFile("client/src/lib/affiliateLinks.ts");
  const headerSource = readProjectFile("client/src/components/Header.tsx");
  const getYourGuideSource = readProjectFile("client/src/components/GetYourGuideTours.tsx");

  it("uses the requested Deals headline, sections, Mailchimp audience, widget, and disclosure", () => {
    expect(dealsSource).toContain("This Week&apos;s Best Travel Deals");
    expect(dealsSource).toContain("Hotel Deals — Free Cancellation");
    expect(dealsSource).toContain("Flight Deals — Best Prices This Week");
    expect(dealsSource).toContain("Featured Tours — Free Cancellation");
    expect(dealsSource).toContain("Car Rental Deals — Compare 500+ Suppliers");
    expect(dealsSource).toContain("Get Weekly Deals Delivered to Your Inbox");
    expect(dealsMailchimpConfig.audienceId).toBe("4512b2fda5");
    expect(dealsMailchimpConfig.endpoint).toContain("subscribe/post-json");
    expect(dealsSource).toContain('response.result === "success"');
    expect(dealsSource).toContain("Unable to contact Mailchimp");
    expect(dealsSource).toContain("GetYourGuideTours");
    expect(dealsSource).toContain("This page contains affiliate links.");
    expect(getYourGuideSource).toContain("const PARTNER_ID = 'YOPATWV'");
  });

  it("builds an encoded Mailchimp JSONP request and exposes usable validation and failure feedback", () => {
    const requestUrl = new URL(
      buildMailchimpJsonpUrl("traveller+deal@example.com", "dealsCallback")
    );

    expect(requestUrl.origin).toBe("https://thestayandwander.us10.list-manage.com");
    expect(requestUrl.pathname).toBe("/subscribe/post-json");
    expect(requestUrl.searchParams.get("u")).toBe(dealsMailchimpConfig.userId);
    expect(requestUrl.searchParams.get("id")).toBe("4512b2fda5");
    expect(requestUrl.searchParams.get("EMAIL")).toBe("traveller+deal@example.com");
    expect(requestUrl.searchParams.get("c")).toBe("dealsCallback");
    expect(isValidEmailAddress("traveller@example.com")).toBe(true);
    expect(isValidEmailAddress("not-an-email")).toBe(false);
    expect(cleanMailchimpMessage("<p>Already subscribed &amp; welcome</p>")).toBe(
      "Already subscribed & welcome"
    );
  });

  it("uses the supplied destinations and keeps every affiliate action in a safe new tab", () => {
    for (const url of [
      "https://booking.stay22.com/thestayandwander/r-lvU3PLVF",
      "https://booking.stay22.com/thestayandwander/_3gvRmesd0",
      "https://booking.stay22.com/thestayandwander/FBzzZenMr0",
      "https://booking.stay22.com/thestayandwander/GTP9FOQSFn",
      "https://booking.stay22.com/thestayandwander/xaad-D11z0",
      "https://booking.stay22.com/thestayandwander/zRyDL-E_PN",
      "https://aviasales.tpo.lu/f9QeB1mu",
      "https://gyg.me/As25WS5K",
      "https://gyg.me/JwtO7kBb",
      "https://gyg.me/nmBnWoSe",
      "https://www.discovercars.com/?a_aid=Thestayandwander",
    ]) {
      expect(affiliateSource).toContain(url);
    }

    expect(dealsSource).toContain('target="_blank"');
    expect(dealsSource).toContain('rel="noopener noreferrer"');
  });

  it("does not present unsupported review ratings or invented comparison prices", () => {
    expect(dealsSource).not.toMatch(/4\.[89] stars/i);
    expect(dealsSource).not.toMatch(/crossed out fake price/i);
    expect(dealsSource).toContain("Free Cancellation ✅");
    expect(dealsSource).toContain("⭐ Top Rated");
    expect(dealsSource).toContain("Instant Confirmation");
  });

  it("places Deals between Booking and Blog in the shared header and gives it canonical metadata", () => {
    expect(headerSource.indexOf('{ label: "Booking", href: "/booking" }')).toBeLessThan(
      headerSource.indexOf('{ label: "Deals", href: "/deals" }')
    );
    expect(headerSource.indexOf('{ label: "Deals", href: "/deals" }')).toBeLessThan(
      headerSource.indexOf('{ label: "Blog", href: "/blog" }')
    );
    expect(headerSource.match(/navLinks\.map/g)).toHaveLength(2);
    expect(
      headerSource.indexOf("navLinks.map", headerSource.indexOf("{/* Mobile Navigation */}"))
    ).toBeGreaterThan(headerSource.indexOf("{/* Mobile Navigation */}"));
    expect(pageMetadataConfig.deals).toMatchObject({
      title: "Best Travel Deals This Week — Hotels · Flights · Tours",
      url: "/deals",
    });
  });
});
