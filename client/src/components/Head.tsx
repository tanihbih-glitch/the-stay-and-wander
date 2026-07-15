import { useEffect } from "react";
import type { MetaTags } from "@shared/seo";

/**
 * Head Component
 * Manages meta tags for both SSR and client-side rendering
 * Ensures meta tags are in the HTML before JavaScript loads
 */

interface HeadProps extends Partial<MetaTags> {
  children?: React.ReactNode;
}

export default function Head({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  keywords,
  author,
  publishedDate,
  updatedDate,
  children,
}: HeadProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }

      tag.content = content;
    };

    // Standard meta tags
    if (description) updateMetaTag("description", description);
    if (keywords) updateMetaTag("keywords", keywords);
    if (author) updateMetaTag("author", author);

    // Open Graph meta tags
    if (ogTitle) updateMetaTag("og:title", ogTitle, true);
    if (ogDescription) updateMetaTag("og:description", ogDescription, true);
    if (ogImage) updateMetaTag("og:image", ogImage, true);
    if (ogUrl) updateMetaTag("og:url", ogUrl, true);
    if (ogType) updateMetaTag("og:type", ogType, true);

    // Twitter meta tags
    if (twitterCard) updateMetaTag("twitter:card", twitterCard);
    if (twitterTitle) updateMetaTag("twitter:title", twitterTitle);
    if (twitterDescription) updateMetaTag("twitter:description", twitterDescription);
    if (twitterImage) updateMetaTag("twitter:image", twitterImage);

    // Article meta tags
    if (publishedDate) updateMetaTag("article:published_time", publishedDate, true);
    if (updatedDate) updateMetaTag("article:modified_time", updatedDate, true);

    // Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    if (canonical) {
      canonicalTag.href = canonical;
    }
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    keywords,
    author,
    publishedDate,
    updatedDate,
  ]);

  return <>{children}</>;
}
