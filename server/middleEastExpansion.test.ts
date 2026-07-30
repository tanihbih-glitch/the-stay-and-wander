import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";

const projectRoot = process.cwd();

function readProjectFile(relativePath: string) {
  return fs.readFileSync(path.resolve(projectRoot, relativePath), "utf8");
}

describe("Middle East destination expansion", () => {
  it("uses the approved site-wide home description and Middle East SEO metadata", () => {
    expect(pageMetadataConfig.home.description).toBe(
      "Discover beautiful places, unique stays and unforgettable journeys across Europe, Asia, Brazil and the Middle East — hand-picked hotels, flight deals and complete travel itineraries"
    );
    expect(pageMetadataConfig.dubaiHotelGuide.url).toBe("/blog/best-hotels-dubai-2026");
    expect(pageMetadataConfig.dubaiHotelGuide.keywords).toContain("Dubai hotels");
  });

  it("registers the Dubai hotel guide for the application and sitemap", () => {
    expect(isApplicationRoute("/blog/best-hotels-dubai-2026")).toBe(true);
    expect(sitemapRoutes.some((route) => route.path === "/blog/best-hotels-dubai-2026")).toBe(true);
  });

  it("adds the approved Middle East homepage discovery card and linked Dubai guide", () => {
    const home = readProjectFile("client/src/pages/Home.tsx");
    const blog = readProjectFile("client/src/pages/Blog.tsx");

    expect(home).toContain("Europe · Asia · Brazil · Middle East");
    expect(home).toContain("Golden Sands &amp; City Skylines");
    expect(home).toContain("/blog/best-hotels-dubai-2026");
    expect(home).toContain("https://booking.stay22.com/thestayandwander/r-lvU3PLVF");
    expect(blog).toContain("Middle East · Hotel Reviews");
    expect(blog).toContain("best-hotels-dubai-2026");
  });

  it("makes Dubai and Abu Dhabi discoverable from the itinerary experience", () => {
    const itineraries = readProjectFile("client/src/pages/Itineraries.tsx");

    expect(itineraries).toContain('region: "MIDDLE EAST"');
    expect(itineraries).toContain('"middle east"');
    expect(itineraries).toContain("Dubai & Abu Dhabi City-to-Desert Escape");
  });

  it("keeps every shared destination message aligned with the expanded coverage", () => {
    const header = readProjectFile("client/src/components/Header.tsx");
    const footer = readProjectFile("client/src/components/Footer.tsx");
    const about = readProjectFile("client/src/pages/About.tsx");
    const tours = readProjectFile("client/src/components/GetYourGuideTours.tsx");
    const blog = readProjectFile("client/src/pages/Blog.tsx");

    expect(header).toContain("EUROPE · ASIA · BRAZIL · MIDDLE EAST");
    expect(footer).toContain("Europe · Asia · Brazil · Middle East");
    expect(about).toContain("Europe · Asia · Brazil · Middle East");
    expect(about).toContain("Europe, Asia, Brazil and the Middle East");
    expect(tours).toContain("Europe, Asia, Brazil &amp; the Middle East");
    expect(blog).toContain("Europe, Asia, Brazil and the Middle East");
  });
});
