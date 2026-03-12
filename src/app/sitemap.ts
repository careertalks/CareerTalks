import type { MetadataRoute } from "next";
import { getAllCareerSlugs } from "@/lib/career-config";
import { getAllArticleSlugs } from "@/lib/articles";

const BASE_URL = "https://www.careertalks.space";

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
      url: `${BASE_URL}/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
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
  ];

  // Career hub pages (20 paths)
  const careerSlugs = getAllCareerSlugs();
  const careerPages: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${BASE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Individual career article pages (blog articles don't have individual routes)
  const articleSlugs = getAllArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs
    .filter(({ category }) => category !== "blog")
    .map(({ category, slug }) => ({
      url: `${BASE_URL}/careers/${category}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...careerPages, ...articlePages];
}
