/**
 * GET /api/careers/[slug]/jobs
 *
 * Fetches job listings for a specific career from multiple free APIs.
 * Query params:
 *   - limit (default 20, max 50)
 *
 * Response: JobFetchResult JSON
 *
 * Caching: ISR with 1-hour revalidation
 */

import { NextRequest, NextResponse } from "next/server";
import { type CareerSlug, careerConfigs } from "@/lib/career-config";
import { fetchJobsForCareer } from "@/lib/fetchers/job-fetcher";

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
  const limit = Math.min(Math.max(Number(limitParam) || 20, 1), 50);

  try {
    const result = await fetchJobsForCareer(slug as CareerSlug, limit);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error(`[API] /careers/${slug}/jobs error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch jobs", careerSlug: slug },
      { status: 500 }
    );
  }
}
