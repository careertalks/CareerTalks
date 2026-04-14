import type { MetadataRoute } from "next";
import { getAllCareerSlugs } from "@/lib/career-config";
import { getAllArticleSlugs, getArticlesByCategory } from "@/lib/articles";
import type { CareerSlug } from "@/lib/career-config";

const BASE_URL = "https://careertalks.space";

// Use a stable launch date instead of `new Date()` so Google doesn't see
// every page as "just modified" on every crawl.  Update these when you
// actually ship changes to the corresponding pages.
const SITE_LAUNCH = "2026-03-01";
const TOOLS_UPDATED = "2026-04-01"; // last time interactive tools were updated

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: TOOLS_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: TOOLS_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: TOOLS_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Interactive tool pages ────────────────────────────────────────
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
    lastModified: TOOLS_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Career hub pages (20 paths) — highest-value content ──────────
  const careerSlugs = getAllCareerSlugs();
  const careerPages: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: `${BASE_URL}/careers/${slug}`,
    lastModified: TOOLS_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ── Build a date lookup for article pages ─────────────────────────
  const articleDateMap = new Map<string, string>();
  for (const careerSlug of careerSlugs) {
    const articles = getArticlesByCategory(careerSlug as CareerSlug);
    for (const article of articles) {
      articleDateMap.set(`${careerSlug}/${article.slug}`, article.date);
    }
  }

  // ── Career article pages — the core SEO content ──────────────────
  const articleSlugs = getAllArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs
    .filter(({ category }) => category !== "blog")
    .map(({ category, slug }) => ({
      url: `${BASE_URL}/careers/${category}/${slug}`,
      lastModified: articleDateMap.get(`${category}/${slug}`) || SITE_LAUNCH,
      changeFrequency: "monthly" as const,
      priority: 0.8, // bumped from 0.7 — articles are the primary content
    }));

  // ── Blog article pages ────────────────────────────────────────────
  const blogArticles = getArticlesByCategory("blog");
  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly" as const,
    priority: 0.7, // bumped from 0.6
  }));

  // ── NOTE: Comparison pages (/compare/*) deliberately EXCLUDED ────
  // 190 template-based comparison pages were diluting the sitemap's
  // quality signal.  Google classified 335 pages as "Discovered –
  // currently not indexed", largely because half the sitemap was thin
  // auto-generated content.  These pages are still accessible via
  // internal links for users, but keeping them out of the sitemap
  // focuses Google's crawl budget on the high-value articles and
  // career hubs.  We can add them back once they carry unique,
  // substantial content (analysis, pros/cons write-ups, etc.).

  return [
    ...staticPages,
    ...toolPages,
    ...careerPages,
    ...articlePages,
    ...blogPages,
  ];
}
