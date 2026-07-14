import { publicProcedure, router } from "../_core/trpc";
import { generateCompleteSitemap } from "../generateSitemap";

/**
 * Sitemap Router
 * Provides SEO sitemap for search engines
 */
export const sitemapRouter = router({
  /**
   * Get the complete XML sitemap
   */
  getSitemap: publicProcedure.query(() => {
    const sitemap = generateCompleteSitemap();
    return {
      xml: sitemap,
      contentType: "application/xml",
    };
  }),
});
