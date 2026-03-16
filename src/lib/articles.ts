import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { CareerSlug } from "./career-config";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentCategory = CareerSlug | "blog";

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: ContentCategory;
  readTime: string;
  tags: string[];
  type: "article" | "guide" | "interview" | "resource";
  featured?: boolean;
  career?: CareerSlug;
  image?: string;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

export function getArticlesByCategory(category: ContentCategory): ArticleMeta[] {
  const categoryDir = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(categoryDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "2025-01-01",
      description: data.description || "",
      category,
      readTime: data.readTime || "5 min read",
      tags: data.tags || [],
      type: data.type || "article",
      featured: data.featured || false,
      career: data.career,
      image: data.image,
    } as ArticleMeta;
  });

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getArticleBySlug(
  category: ContentCategory,
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2025-01-01",
    description: data.description || "",
    category,
    readTime: data.readTime || "5 min read",
    tags: data.tags || [],
    type: data.type || "article",
    featured: data.featured || false,
    career: data.career,
    image: data.image,
    contentHtml,
  };
}

export function getAllArticleSlugs(): { category: ContentCategory; slug: string }[] {
  const slugs: { category: ContentCategory; slug: string }[] = [];

  if (!fs.existsSync(contentDirectory)) return slugs;

  const categories = fs.readdirSync(contentDirectory).filter((dir) => {
    const fullPath = path.join(contentDirectory, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const category of categories) {
    const articles = getArticlesByCategory(category as ContentCategory);
    for (const article of articles) {
      slugs.push({ category: category as ContentCategory, slug: article.slug });
    }
  }

  return slugs;
}

// Get latest articles across all career paths
export function getLatestArticles(limit: number = 6): ArticleMeta[] {
  const allArticles: ArticleMeta[] = [];

  if (!fs.existsSync(contentDirectory)) return allArticles;

  const categories = fs.readdirSync(contentDirectory).filter((dir) => {
    const fullPath = path.join(contentDirectory, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const category of categories) {
    const articles = getArticlesByCategory(category as ContentCategory);
    allArticles.push(...articles);
  }

  return allArticles
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, limit);
}
