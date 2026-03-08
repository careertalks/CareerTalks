interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CareerTalks",
    url: "https://www.careertalks.space",
    description:
      "Comprehensive career guidance for 20+ industries. Interactive guides, skill roadmaps, and expert insights to help you find your path.",
    publisher: {
      "@type": "Organization",
      name: "CareerTalks",
      url: "https://www.careertalks.space",
      logo: {
        "@type": "ImageObject",
        url: "https://www.careertalks.space/logo.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.careertalks.space/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLdScript data={data} />;
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: ArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "CareerTalks",
      url: "https://www.careertalks.space",
    },
    publisher: {
      "@type": "Organization",
      name: "CareerTalks",
      url: "https://www.careertalks.space",
      logo: {
        "@type": "ImageObject",
        url: "https://www.careertalks.space/logo.png",
      },
    },
  };

  if (image) {
    data.image = image;
  }

  return <JsonLdScript data={data} />;
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.careertalks.space${item.href}`,
    })),
  };

  return <JsonLdScript data={data} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageJsonLdProps {
  faqs: FAQItem[];
}

export function FAQPageJsonLd({ faqs }: FAQPageJsonLdProps) {
  const data = {
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

  return <JsonLdScript data={data} />;
}
