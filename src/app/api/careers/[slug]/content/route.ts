/**
 * GET /api/careers/[slug]/content
 *
 * Fetches latest articles/news from RSS feeds, Dev.to, and Reddit
 * for a specific career.
 * Query params:
 *   - limit (default 15, max 30)
 *
 * Response: ContentFetchResult JSON
 *
 * Caching: ISR with 1-hour revalidation
 */

import { NextRequest, NextResponse } from "next/server";
import { type CareerSlug, careerConfigs } from "@/lib/career-config";
import { fetchContentForCareer } from "@/lib/fetchers/content-fetcher";

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Validate career slug
  if (!careerConfigs[slug as CareerSlug]) {
    return NextResponse.json(
      { error: "Invalid career slug", validSlugs: Object.keys(careerConfigs) },
      { status: 400 }
    );
  }

  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 15, 1), 30);

  try {
    const result = await fetchContentForCareer(slug as CareerSlug, limit);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error(`[API] /careers/${slug}/content error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch content", careerSlug: slug },
      { status: 500 }
    );
  }
}
