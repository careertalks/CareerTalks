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
    url: "https://careertalks.space",
    description:
      "Comprehensive career guidance for 20+ industries. Interactive guides, skill roadmaps, and expert insights to help you find your path.",
    publisher: {
      "@type": "Organization",
      name: "CareerTalks",
      url: "https://careertalks.space",
      logo: {
        "@type": "ImageObject",
        url: "https://careertalks.space/logo.png",
      },
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
      url: "https://careertalks.space",
    },
    publisher: {
      "@type": "Organization",
      name: "CareerTalks",
      url: "https://careertalks.space",
      logo: {
        "@type": "ImageObject",
        url: "https://careertalks.space/logo.png",
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
      item: `https://careertalks.space${item.href}`,
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

export function EducationalOrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "CareerTalks",
    url: "https://careertalks.space",
    description:
      "Free career guidance platform for students and young professionals. Explore 20 career paths with interactive tools, salary guides, and skill roadmaps.",
    logo: {
      "@type": "ImageObject",
      url: "https://careertalks.space/logo.png",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    sameAs: [],
  };

  return <JsonLdScript data={data} />;
}

export interface OccupationJsonLdProps {
  name: string;
  description: string;
  salary: string;
  growthRate: string;
  skills: string[];
}

export function OccupationJsonLd({
  name,
  description,
  salary,
  growthRate,
  skills,
}: OccupationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name,
    description,
    occupationLocation: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
    ],
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "Average Annual Salary",
      currency: "USD",
      median: salary,
    },
    skills: skills.join(", "),
    qualifications: `Growth rate: ${growthRate}`,
  };

  return <JsonLdScript data={data} />;
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
