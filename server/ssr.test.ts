import { describe, expect, it } from "vitest";
import { pageMetadataConfig } from "../shared/seo";
import { articleFaqsByPath } from "../shared/articleFaqs";
import { injectSSRHead } from "./ssr";
import { featuredGuideDiscovery } from "../shared/featuredGuideDiscovery";

describe("server-rendered page metadata", () => {
  it("replaces the generic title with Corporate Travel crawler metadata", () => {
    const rendered = injectSSRHead(
      "<html><head><title>Default site title</title></head><body></body></html>",
      pageMetadataConfig.corporateTravel
    );

    expect(rendered).toContain(
      "<title>Corporate Travel Planning — ADIPEC 2026 · GITEX 2026 · ADSW 2027 · Global Business Travel | The Stay &amp; Wander</title>"
    );
    expect(rendered).toContain(
      'name="description" content="Professional corporate travel planning for ADIPEC 2026, GITEX 2026 and Abu Dhabi Sustainability Week 2027. Hotels near ADNEC and DWTC · Executive itineraries · Team retreat planning for companies from USA, UK, Canada, Australia, India and Nigeria."'
    );
    expect(rendered).toContain(
      'href="https://thestayandwander.com/corporate-travel"'
    );
    expect(rendered).not.toContain("Default site title");
  });

  it("preserves the unmodified document when a route has no metadata", () => {
    const template = "<html><head><title>Default site title</title></head></html>";

    expect(injectSSRHead(template)).toBe(template);
  });

  it("renders the CTR-focused Bali snippet while preserving its visible-guide schema title", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const prices = injectSSRHead(template, pageMetadataConfig.baliHotelPricesGuide);
    const fourStar = injectSSRHead(template, pageMetadataConfig.baliFourStarHotelsGuide);

    expect(prices).toContain("<title>Bali Hotel Prices 2026: $30–$250+ | The Stay &amp; Wander</title>");
    expect(prices).toContain('name="description" content="Compare typical 2026 Bali hotel ranges from $30–$90 budget to $250+ luxury in Seminyak, Ubud, Canggu and Uluwatu. Plan before booking."');
    expect(prices).toContain('"headline":"Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)"');
    expect(prices).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-bali-2026"');
    expect(fourStar).toContain("<title>Best 4-Star Hotels in Bali Under $100/Night (2026 Picks)</title>");
    expect(fourStar).toContain('name="description" content="Handpicked 4-star hotels across Bali that don&#039;t break the bank — real picks under $100/night, from Seminyak to Ubud."');
  });

  it("renders the CTR-focused Bangkok snippet while preserving its visible-guide schema title", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const bangkok = injectSSRHead(template, pageMetadataConfig.bangkokHotelPricesGuide);

    expect(bangkok).toContain("<title>Bangkok Hotel Prices 2026: $10–$250+ | The Stay &amp; Wander</title>");
    expect(bangkok).toContain('name="description" content="Compare typical 2026 Bangkok hotel ranges from $10–$60 budget to $250+ luxury across Sukhumvit, Silom, Riverside, Khao San and Sathorn."');
    expect(bangkok).toContain('"headline":"Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)"');
    expect(bangkok).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-bangkok-2026"');
  });

  it("renders the Bangkok hotel-cost breakdown metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const budget = injectSSRHead(template, pageMetadataConfig.bangkokHotelBudgetBreakdown);

    expect(budget).toContain("<title>Bangkok Hotel Costs 2026: $10–$300+ | The Stay &amp; Wander</title>");
    expect(budget).toContain('name="description" content="See typical Bangkok hotel rates in 2026: $10–$20 hostels, $30–$80 mid-range rooms and $120–$300+ five-star stays, plus booking factors."');
    expect(budget).toContain('href="https://thestayandwander.com/blog/bangkok-hotel-budget-breakdown-2026"');
  });

  it("renders the Bangkok Airport layover metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const airport = injectSSRHead(template, pageMetadataConfig.bangkokAirportHotels);

    expect(airport).toContain("<title>Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers</title>");
    expect(airport).toContain('name="description" content="Where to stay near Bangkok&#039;s Suvarnabhumi Airport for a quick layover — in-terminal options, free-shuttle hotels, and essential timing tips."');
    expect(airport).toContain('href="https://thestayandwander.com/blog/bangkok-airport-hotels-2026"');
  });

  it("renders the UAE extended-stay sustainability metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const uae = injectSSRHead(template, pageMetadataConfig.uaeExtendedStaySustainability);

    expect(uae).toContain("<title>UAE Sustainable Extended Stays 2026 | The Stay &amp; Wander</title>");
    expect(uae).toContain('name="description" content="Compare Hilton, Marriott, Accor and IHG extended-stay options in the UAE: sustainability frameworks, kitchens, laundry and long-stay booking checks."');
    expect(uae).toContain('href="https://thestayandwander.com/blog/uae-extended-stay-sustainability-2026"');
  });

  it("renders the Bali beach comparison matrix metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const coastal = injectSSRHead(template, pageMetadataConfig.baliBeachComparisonMatrix);

    expect(coastal).toContain("<title>Bali Beach Comparison Matrix (2026): Sand Quality, Swim Safety &amp; Entry Fees by Region</title>");
    expect(coastal).toContain('name="description" content="Compare Bali beach regions for sand quality, swim safety, entry fees, surfing, snorkeling, cliff views, and family-friendly water in 2026."');
    expect(coastal).toContain('href="https://thestayandwander.com/blog/bali-beach-comparison-matrix-2026"');
  });

  it("renders indexable canonical metadata for every guide in the shared discovery registry", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const metadataByPath = {
      "/blog/bangkok-hotel-price-index-2026": pageMetadataConfig.bangkokHotelPriceIndex,
      "/blog/seoul-food-price-index-2026": pageMetadataConfig.seoulFoodPriceIndex,
      "/blog/bali-spa-wellness-price-index-2026": pageMetadataConfig.baliSpaWellnessPriceIndex,
      "/blog/bali-beach-comparison-matrix-2026": pageMetadataConfig.baliBeachComparisonMatrix,
      "/blog/bali-hotel-price-index-2026": pageMetadataConfig.baliHotelPriceIndex,
    } as const;

    featuredGuideDiscovery.forEach((guide) => {
      const rendered = injectSSRHead(template, metadataByPath[guide.path]);
      expect(rendered).toContain(`href="https://thestayandwander.com${guide.path}"`);
      expect(rendered).not.toContain("noindex");
    });
  });

  it("renders the requested CTR-focused price-index metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const bali = injectSSRHead(template, pageMetadataConfig.baliHotelPriceIndex);
    const bangkok = injectSSRHead(template, pageMetadataConfig.bangkokHotelPriceIndex);

    expect(bali).toContain("<title>Bali Hotel Prices in 2026: Average Rates by Neighborhood &amp; Budget</title>");
    expect(bali).toContain('name="description" content="Planning a trip to Bali? View 2026 average nightly hotel rates across Seminyak, Canggu, Ubud &amp; Uluwatu. Features interactive budget calculator &amp; district benchmarks."');
    expect(bangkok).toContain("<title>Bangkok Hotel Price Index (2026): Nightly Cost Breakdown &amp; Interactive Tool</title>");
    expect(bangkok).toContain('name="description" content="Compare average hotel prices per night in Bangkok for 2026 across Sukhumvit, Silom, Riverside &amp; Old Town. Interactive district matcher &amp; tier breakdown."');
  });

  it("renders the refreshed Tokyo and Seoul where-to-stay metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const tokyo = injectSSRHead(template, pageMetadataConfig.tokyoStayGuide);
    const seoul = injectSSRHead(template, pageMetadataConfig.seoulStayGuide);

    expect(tokyo).toContain("<title>Where to Stay in Tokyo (2026): Best Neighborhoods &amp; Hotel Price Guide</title>");
    expect(tokyo).toContain('name="description" content="Compare Tokyo&#039;s best neighborhoods for first-time visitors in 2026—Shinjuku, Shibuya, Asakusa, Ginza &amp; Ikebukuro—with hotel price ranges, rail-access tips and an interactive area matcher."');
    expect(tokyo).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-tokyo-2026"');
    expect(seoul).toContain("<title>Where to Stay in Seoul (2026): Best Areas &amp; Hotel Price Guide</title>");
    expect(seoul).toContain('name="description" content="Compare Seoul&#039;s best areas for first-time visitors in 2026—Myeongdong, Hongdae, Gangnam, Itaewon &amp; Insadong—with hotel price ranges, subway-access tips and an interactive area matcher."');
    expect(seoul).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-seoul-2026"');
  });

  it("emits current Article, BreadcrumbList, FAQPage, and modified-time signals for the four refreshed guides", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const guideMetadata = [
      pageMetadataConfig.baliHotelPriceIndex,
      pageMetadataConfig.bangkokHotelPriceIndex,
      pageMetadataConfig.tokyoStayGuide,
      pageMetadataConfig.seoulStayGuide,
    ];

    for (const metadata of guideMetadata) {
      const faqs = articleFaqsByPath[metadata.url] ?? [];
      const rendered = injectSSRHead(template, metadata, faqs);
      expect(metadata.updatedDate).toBe("2026-09-06");
      expect(rendered).toContain('property="article:modified_time" content="2026-09-06"');
      expect(rendered).toContain('"@type":"BlogPosting"');
      expect(rendered).toContain('"@type":"BreadcrumbList"');
      expect(rendered).toContain('"@type":"FAQPage"');
      expect(rendered).toContain(`"@id":"https://thestayandwander.com${metadata.url}"`);
    }
  });

  it("emits current timestamps and BreadcrumbList schemas for every configured blog destination guide", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const blogGuides = Object.values(pageMetadataConfig).filter((metadata) => metadata.type === "article" && metadata.url.startsWith("/blog/"));

    expect(blogGuides).toHaveLength(21);
    for (const metadata of blogGuides) {
      const rendered = injectSSRHead(template, metadata, articleFaqsByPath[metadata.url] ?? []);
      expect(metadata.updatedDate).toMatch(/^2026-09-(06|12)$/);
      expect(rendered).toContain(`property="article:modified_time" content="${metadata.updatedDate}"`);
      expect(rendered).toContain('"@type":"BreadcrumbList"');
      expect(rendered).toContain(`"@id":"https://thestayandwander.com${metadata.url}"`);
    }
  });

  it("injects a valid FAQPage JSON-LD payload for each specified FAQ article", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";

    for (const [path, faqs] of Object.entries(articleFaqsByPath)) {
      const rendered = injectSSRHead(template, undefined, faqs);
      expect(rendered).toContain('"@type":"FAQPage"');
      expect(rendered).toContain(`"name":"${faqs[0].question}"`);
      expect(rendered).toContain(`"text":"${faqs[0].answer}"`);
      expect(rendered).toContain("<title>Default site title</title>");
      expect(path).toMatch(/^\/blog\//);
    }
  });

  it("emits unambiguous Organization and WebSite entities without relying on similarly named sites", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const rendered = injectSSRHead(template, pageMetadataConfig.home);

    expect(rendered).toContain('"@type":"Organization"');
    expect(rendered).toContain('"@id":"https://thestayandwander.com/#organization"');
    expect(rendered).toContain('"@type":"WebSite"');
    expect(rendered).toContain('"name":"The Stay & Wander"');
    expect(rendered).toContain('"url":"https://thestayandwander.com"');
    expect(rendered).not.toContain('"@id":"https://wander.com/#website"');
  });

  it("preserves the successful homepage and booking metadata", () => {
    expect(pageMetadataConfig.home.title).toBe("The Stay & Wander | Curated Stays & Travel Itineraries");
    expect(pageMetadataConfig.booking.title).toBe("Book Your Trip - Hotels, Flights & More | The Stay & Wander");
  });
});
