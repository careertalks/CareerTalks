/**
 * Content Fetcher — aggregates articles from RSS feeds and APIs
 *
 * Parses RSS/Atom feeds and combines with Dev.to API for each career.
 * Used to populate the "Latest" tab on career pages.
 *
 * Usage:
 *   const content = await fetchContentForCareer("ai-data-science");
 */

import type { CareerSlug } from "../career-config";
import { careerSources, type RSSFeedSource } from "../career-sources";

// ─── Types ───────────────────────────────────────────────────────────

export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  sourceType: RSSFeedSource["type"];
  author?: string;
  imageUrl?: string;
  publishedAt: string; // ISO date
  readTime?: string; // e.g. "5 min read"
  tags?: string[];
}

export interface ContentFetchResult {
  items: ContentItem[];
  totalFound: number;
  sources: string[];
  fetchedAt: string;
  careerSlug: CareerSlug;
}

// ─── RSS/Atom Parser (lightweight, no dependencies) ─────────────────

/**
 * Parses RSS 2.0 or Atom XML into a simple item array.
 * Uses regex-based extraction — no XML parser dependency needed.
 */
function parseRSSItems(xml: string, sourceName: string, sourceType: RSSFeedSource["type"]): ContentItem[] {
  const items: ContentItem[] = [];

  // Try RSS 2.0 <item> format
  const rssItemPattern = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = rssItemPattern.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link") || extractAtomLink(block);
    const description = extractTag(block, "description") || extractTag(block, "content:encoded");
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date");
    const author = extractTag(block, "dc:creator") || extractTag(block, "author");
    const imageUrl = extractMediaImage(block);

    if (title && link) {
      items.push({
        id: `rss-${hashString(link)}`,
        title: cleanHTML(title),
        excerpt: truncateExcerpt(cleanHTML(description || "")),
        url: link.trim(),
        source: sourceName,
        sourceType,
        author: author ? cleanHTML(author) : undefined,
        imageUrl,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        tags: extractCategories(block),
      });
    }
  }

  // If no RSS items, try Atom <entry> format
  if (items.length === 0) {
    const atomEntryPattern = /<entry[\s>]([\s\S]*?)<\/entry>/gi;

    while ((match = atomEntryPattern.exec(xml)) !== null) {
      const block = match[1];
      const title = extractTag(block, "title");
      const link = extractAtomLink(block);
      const summary = extractTag(block, "summary") || extractTag(block, "content");
      const published = extractTag(block, "published") || extractTag(block, "updated");
      const author = extractAtomAuthor(block);

      if (title && link) {
        items.push({
          id: `atom-${hashString(link)}`,
          title: cleanHTML(title),
          excerpt: truncateExcerpt(cleanHTML(summary || "")),
          url: link.trim(),
          source: sourceName,
          sourceType,
          author: author ? cleanHTML(author) : undefined,
          publishedAt: published ? new Date(published).toISOString() : new Date().toISOString(),
          tags: extractCategories(block),
        });
      }
    }
  }

  return items;
}

// ─── XML helpers ─────────────────────────────────────────────────────

function extractTag(block: string, tag: string): string | null {
  // Handle CDATA: <tag><![CDATA[content]]></tag>
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, "i");
  const cdataMatch = cdataRegex.exec(block);
  if (cdataMatch) return cdataMatch[1].trim();

  // Handle plain text: <tag>content</tag>
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = regex.exec(block);
  return m ? m[1].trim() : null;
}

function extractAtomLink(block: string): string | null {
  // <link href="..." rel="alternate" />
  const altMatch = /href="([^"]+)"[^>]*rel="alternate"/i.exec(block);
  if (altMatch) return altMatch[1];
  // <link href="..." />
  const hrefMatch = /<link[^>]*href="([^"]+)"/i.exec(block);
  return hrefMatch ? hrefMatch[1] : null;
}

function extractAtomAuthor(block: string): string | null {
  const authorBlock = /<author[\s>]([\s\S]*?)<\/author>/i.exec(block);
  if (!authorBlock) return null;
  return extractTag(authorBlock[1], "name");
}

function extractMediaImage(block: string): string | undefined {
  // <media:thumbnail url="..." />
  const mediaThumbnail = /url="(https?:\/\/[^"]+\.(jpg|jpeg|png|webp|gif)[^"]*)"/i.exec(block);
  if (mediaThumbnail) return mediaThumbnail[1];
  // <enclosure url="..." type="image/..." />
  const enclosure = /<enclosure[^>]*url="([^"]+)"[^>]*type="image/i.exec(block);
  if (enclosure) return enclosure[1];
  // First <img src="..."> in description
  const imgMatch = /<img[^>]*src="(https?:\/\/[^"]+)"/i.exec(block);
  return imgMatch ? imgMatch[1] : undefined;
}

function extractCategories(block: string): string[] {
  const cats: string[] = [];
  const catRegex = /<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi;
  let m: RegExpExecArray | null;
  while ((m = catRegex.exec(block)) !== null) {
    const val = m[1].trim();
    if (val && val.length < 50) cats.push(val);
  }
  return cats.slice(0, 5);
}

function cleanHTML(html: string): string {
  return html
    .replace(/<[^>]+>/g, "") // Strip HTML tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateExcerpt(text: string, maxLen = 200): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(36);
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}

// ─── RSS Feed Fetcher ────────────────────────────────────────────────

async function fetchRSSFeed(feed: RSSFeedSource, limit = 5): Promise<ContentItem[]> {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 3600 }, // Cache 1 hour
      headers: {
        "User-Agent": "CareerTalks/1.0 (RSS Reader)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) {
      console.warn(`[ContentFetcher] RSS ${feed.name} returned ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const items = parseRSSItems(xml, feed.name, feed.type);

    // Add read time estimate
    return items.slice(0, limit).map((item) => ({
      ...item,
      readTime: item.excerpt ? estimateReadTime(item.excerpt) : "3 min read",
    }));
  } catch (e) {
    console.error(`[ContentFetcher] RSS ${feed.name} error:`, e);
    return [];
  }
}

// ─── Dev.to API Fetcher ─────────────────────────────────────────────

interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  readable_publish_date: string;
  published_at: string;
  reading_time_minutes: number;
  user: { name: string; username: string };
  tag_list: string[];
}

async function fetchDevtoArticles(
  tags: string[],
  limit = 5
): Promise<ContentItem[]> {
  if (tags.length === 0) return [];

  try {
    // Fetch top articles from first 2 tags
    const fetchPromises = tags.slice(0, 2).map(async (tag) => {
      const params = new URLSearchParams({
        tag,
        per_page: String(Math.ceil(limit / 2)),
        state: "rising", // Trending articles
      });

      const res = await fetch(`https://dev.to/api/articles?${params}`, {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "CareerTalks/1.0" },
      });

      if (!res.ok) return [];
      const articles: DevtoArticle[] = await res.json();

      return articles.map(
        (a): ContentItem => ({
          id: `devto-${a.id}`,
          title: a.title,
          excerpt: a.description || "",
          url: a.url,
          source: "Dev.to",
          sourceType: "tutorial",
          author: a.user?.name || a.user?.username,
          imageUrl: a.cover_image || a.social_image || undefined,
          publishedAt: a.published_at,
          readTime: `${a.reading_time_minutes} min read`,
          tags: a.tag_list || [],
        })
      );
    });

    const results = await Promise.allSettled(fetchPromises);
    const allArticles: ContentItem[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") allArticles.push(...r.value);
    }

    return allArticles.slice(0, limit);
  } catch (e) {
    console.error("[ContentFetcher] Dev.to error:", e);
    return [];
  }
}

// ─── Reddit RSS Fetcher ─────────────────────────────────────────────

async function fetchRedditRSS(
  subreddits: string[],
  limit = 3
): Promise<ContentItem[]> {
  if (subreddits.length === 0) return [];

  try {
    const subreddit = subreddits[0]; // Use first subreddit
    const res = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`, {
      next: { revalidate: 7200 }, // Cache 2 hours (Reddit rate limits)
      headers: { "User-Agent": "CareerTalks/1.0" },
    });

    if (!res.ok) return [];
    const data = await res.json();

    return (data.data?.children || [])
      .filter((c: { data: { stickied: boolean } }) => !c.data.stickied)
      .slice(0, limit)
      .map(
        (c: {
          data: {
            id: string;
            title: string;
            selftext: string;
            permalink: string;
            subreddit_name_prefixed: string;
            author: string;
            created_utc: number;
            thumbnail: string;
            link_flair_text: string;
          };
        }): ContentItem => ({
          id: `reddit-${c.data.id}`,
          title: cleanHTML(c.data.title),
          excerpt: truncateExcerpt(cleanHTML(c.data.selftext || "")),
          url: `https://www.reddit.com${c.data.permalink}`,
          source: c.data.subreddit_name_prefixed || `r/${subreddit}`,
          sourceType: "community",
          author: c.data.author,
          imageUrl:
            c.data.thumbnail && c.data.thumbnail.startsWith("http")
              ? c.data.thumbnail
              : undefined,
          publishedAt: new Date(c.data.created_utc * 1000).toISOString(),
          tags: c.data.link_flair_text ? [c.data.link_flair_text] : [],
        })
      );
  } catch (e) {
    console.error("[ContentFetcher] Reddit error:", e);
    return [];
  }
}

// ─── Deduplication & Sorting ─────────────────────────────────────────

function deduplicateContent(items: ContentItem[]): ContentItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase().trim().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortByDate(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) => {
    const da = new Date(a.publishedAt).getTime() || 0;
    const db = new Date(b.publishedAt).getTime() || 0;
    return db - da; // newest first
  });
}

// ─── Main Aggregator ─────────────────────────────────────────────────

/**
 * Fetches content from RSS feeds, Dev.to, and Reddit for a career.
 * Runs all sources in parallel, deduplicates, and sorts by date.
 */
export async function fetchContentForCareer(
  slug: CareerSlug,
  limit = 15
): Promise<ContentFetchResult> {
  const config = careerSources[slug];
  if (!config) {
    return {
      items: [],
      totalFound: 0,
      sources: [],
      fetchedAt: new Date().toISOString(),
      careerSlug: slug,
    };
  }

  const perFeedLimit = 4; // Articles per RSS feed

  // Run all fetchers in parallel
  const feedPromises = config.feeds.map((feed) => fetchRSSFeed(feed, perFeedLimit));

  const [feedResults, devtoItems, redditItems] = await Promise.all([
    Promise.allSettled(feedPromises),
    fetchDevtoArticles(config.contentTags.devto, 5),
    fetchRedditRSS(config.contentTags.subreddits, 3),
  ]);

  // Collect all content
  const allItems: ContentItem[] = [];
  const activeSources: string[] = [];

  for (let i = 0; i < feedResults.length; i++) {
    const result = feedResults[i];
    if (result.status === "fulfilled" && result.value.length > 0) {
      allItems.push(...result.value);
      activeSources.push(config.feeds[i].name);
    }
  }

  if (devtoItems.length > 0) {
    allItems.push(...devtoItems);
    activeSources.push("Dev.to");
  }

  if (redditItems.length > 0) {
    allItems.push(...redditItems);
    activeSources.push("Reddit");
  }

  const deduped = deduplicateContent(allItems);
  const sorted = sortByDate(deduped).slice(0, limit);

  return {
    items: sorted,
    totalFound: deduped.length,
    sources: [...new Set(activeSources)],
    fetchedAt: new Date().toISOString(),
    careerSlug: slug,
  };
}
