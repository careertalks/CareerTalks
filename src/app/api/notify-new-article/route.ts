import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const LAST_SENT_FILE = path.join(process.cwd(), ".last-sent-articles.json");

interface ArticleInfo {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

function getAllArticles(): ArticleInfo[] {
  const articles: ArticleInfo[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return articles;

  const categories = fs.readdirSync(CONTENT_DIR).filter((dir) => {
    return fs.statSync(path.join(CONTENT_DIR, dir)).isDirectory();
  });

  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(categoryDir, file), "utf8");
      const { data } = matter(content);

      articles.push({
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        readTime: data.readTime || "5 min read",
        category,
        slug,
      });
    }
  }

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function getLastSentSlugs(): Set<string> {
  try {
    if (fs.existsSync(LAST_SENT_FILE)) {
      const data = JSON.parse(fs.readFileSync(LAST_SENT_FILE, "utf8"));
      return new Set(data.slugs || []);
    }
  } catch {
    // File doesn't exist or is corrupt
  }
  return new Set();
}

function saveLastSentSlugs(slugs: string[]) {
  fs.writeFileSync(
    LAST_SENT_FILE,
    JSON.stringify({ slugs, lastUpdated: new Date().toISOString() }, null, 2)
  );
}

export async function POST(request: NextRequest) {
  // Simple auth check — use a secret to protect this endpoint
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.NOTIFY_SECRET || process.env.BUTTONDOWN_API_KEY;

  if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const API_KEY = process.env.BUTTONDOWN_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "BUTTONDOWN_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const allArticles = getAllArticles();
    const lastSent = getLastSentSlugs();

    // Find new articles that haven't been sent
    const newArticles = allArticles.filter(
      (a) => !lastSent.has(`${a.category}/${a.slug}`)
    );

    if (newArticles.length === 0) {
      return NextResponse.json({
        message: "No new articles to send",
        totalArticles: allArticles.length,
      });
    }

    // Only send the most recent new articles (max 3 per notification)
    const toSend = newArticles.slice(0, 3);

    // Build email content
    const articleList = toSend
      .map((a) => {
        const url =
          a.category === "blog"
            ? `https://careertalks.space/blog/${a.slug}`
            : `https://careertalks.space/careers/${a.category}/${a.slug}`;

        return `### ${a.title}\n${a.description}\n\n${a.readTime} · [Read on CareerTalks](${url})`;
      })
      .join("\n\n---\n\n");

    const subject =
      toSend.length === 1
        ? `New on CareerTalks: ${toSend[0].title}`
        : `${toSend.length} New Articles on CareerTalks`;

    const body = `Hi there!\n\nWe just published new career guidance content on CareerTalks:\n\n${articleList}\n\n---\n\nHappy exploring!\nThe CareerTalks Team\n\n[Visit CareerTalks](https://careertalks.space)`;

    // Create a draft email in Buttondown
    const response = await fetch("https://api.buttondown.email/v1/emails", {
      method: "POST",
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        body,
        status: "draft", // Creates as draft — you review and send manually
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Buttondown email error:", error);
      return NextResponse.json(
        { error: "Failed to create email draft", details: error },
        { status: 500 }
      );
    }

    // Update the sent tracker
    const allSlugs = allArticles.map((a) => `${a.category}/${a.slug}`);
    saveLastSentSlugs(allSlugs);

    return NextResponse.json({
      success: true,
      message: `Created draft email for ${toSend.length} new article(s)`,
      articles: toSend.map((a) => a.title),
    });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
