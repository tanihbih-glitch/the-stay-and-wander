import { describe, expect, it } from "vitest";
import { pageMetadataConfig } from "../shared/seo";
import { articleFaqsByPath } from "../shared/articleFaqs";
import { injectSSRHead } from "./ssr";

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

  it("renders the supplied Bali where-to-stay metadata for crawlers without changing page content", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const prices = injectSSRHead(template, pageMetadataConfig.baliHotelPricesGuide);
    const fourStar = injectSSRHead(template, pageMetadataConfig.baliFourStarHotelsGuide);

    expect(prices).toContain("<title>Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)</title>");
    expect(prices).toContain('name="description" content="Not sure where to stay in Bali? Compare Seminyak, Ubud, Uluwatu, and Canggu — what each is best for, and what you&#039;ll pay in 2026."');
    expect(fourStar).toContain("<title>Best 4-Star Hotels in Bali Under $100/Night (2026 Picks)</title>");
    expect(fourStar).toContain('name="description" content="Handpicked 4-star hotels across Bali that don&#039;t break the bank — real picks under $100/night, from Seminyak to Ubud."');
  });

  it("renders the supplied Bangkok where-to-stay metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const bangkok = injectSSRHead(template, pageMetadataConfig.bangkokHotelPricesGuide);

    expect(bangkok).toContain("<title>Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)</title>");
    expect(bangkok).toContain('name="description" content="Not sure where to stay in Bangkok? Compare Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn — what each is best for, and what you&#039;ll pay in 2026."');
    expect(bangkok).toContain('href="https://thestayandwander.com/blog/bangkok-hotel-prices-2026"');
  });

  it("renders the Tokyo and Seoul where-to-stay metadata for crawlers", () => {
    const template = "<html><head><title>Default site title</title></head><body></body></html>";
    const tokyo = injectSSRHead(template, pageMetadataConfig.tokyoStayGuide);
    const seoul = injectSSRHead(template, pageMetadataConfig.seoulStayGuide);

    expect(tokyo).toContain("<title>Where to Stay in Tokyo: Best Neighborhoods for First-Timers (2026 Guide)</title>");
    expect(tokyo).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-tokyo-2026"');
    expect(seoul).toContain("<title>Where to Stay in Seoul: Best Areas for First-Timers (2026 Guide)</title>");
    expect(seoul).toContain('href="https://thestayandwander.com/blog/where-to-stay-in-seoul-2026"');
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
});
