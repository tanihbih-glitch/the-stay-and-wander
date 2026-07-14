/**
 * BlogArticleSchema Component
 * Renders JSON-LD structured data for blog articles to enhance SEO and rich snippets
 */

interface BlogArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}

export default function BlogArticleSchema({
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
  url,
}: BlogArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: "The Stay & Wander",
      logo: {
        "@type": "ImageObject",
        url: "https://thestayandwander.com/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization Schema for the website
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Stay & Wander",
    url: "https://thestayandwander.com",
    logo: "https://thestayandwander.com/logo.png",
    description: "Discover beautiful places, unique stays & unforgettable journeys",
    sameAs: [
      "https://www.facebook.com/thestayandwander",
      "https://www.instagram.com/thestayandwander",
      "https://www.twitter.com/thestayandwander",
    ],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@thestayandwander.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb Schema for navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema for frequently asked questions
 */
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema(faqs: FAQItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
