import type { MetadataRoute } from "next";
import { getAllCareerSlugs } from "@/lib/career-config";
import { getAllArticleSlugs, getArticlesByCategory } from "@/lib/articles";
import type { CareerSlug } from "@/lib/career-config";

const BASE_URL = "https://careertalks.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Interactive tool pages
  const toolPages: MetadataRoute.Sitemap = [
    "assessment",
    "quiz",
    "zodiac",
    "roulette",
    "skill-match",
    "duels",
    "career-navigator",
    "career-explorer",
    "day-in-life",
    "compatibility",
    "salary-calculator",
  ].map((tool) => ({
    url: `${BASE_URL}/${tool}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Career hub pages (20 paths)
  const careerSlugs = getAllCareerSlugs();
  const careerPages: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${BASE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Build a date lookup for article pages
  const articleDateMap = new Map<string, string>();
  for (const careerSlug of careerSlugs) {
    const articles = getArticlesByCategory(careerSlug as CareerSlug);
    for (const article of articles) {
      articleDateMap.set(`${careerSlug}/${article.slug}`, article.date);
    }
  }

  // Individual career article pages
  const articleSlugs = getAllArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs
    .filter(({ category }) => category !== "blog")
    .map(({ category, slug }) => ({
      url: `${BASE_URL}/careers/${category}/${slug}`,
      lastModified: articleDateMap.get(`${category}/${slug}`) || now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Blog article pages
  const blogArticles = getArticlesByCategory("blog");
  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Career comparison pages (20 choose 2 = 190 pages)
  const comparePages: MetadataRoute.Sitemap = [];
  for (let i = 0; i < careerSlugs.length; i++) {
    for (let j = i + 1; j < careerSlugs.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${careerSlugs[i]}-vs-${careerSlugs[j]}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      });
    }
  }

  return [
    ...staticPages,
    ...toolPages,
    ...careerPages,
    ...articlePages,
    ...blogPages,
    ...comparePages,
  ];
}
