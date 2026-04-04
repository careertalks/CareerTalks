/**
 * TEMPORARY DEBUG ENDPOINT — remove after verifying Adzuna works
 * GET /api/debug-adzuna
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Never cache this

export async function GET() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return NextResponse.json({
      status: "MISSING_KEYS",
      hasAppId: !!appId,
      hasAppKey: !!appKey,
      message: "ADZUNA_APP_ID or ADZUNA_APP_KEY not set in environment",
    });
  }

  // Test with a simple software query in US
  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: "3",
    what: "software developer",
  });

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?${params}`;

  try {
    const res = await fetch(url);
    const status = res.status;
    const body = await res.text();

    if (!res.ok) {
      return NextResponse.json({
        status: "API_ERROR",
        httpStatus: status,
        responseBody: body.slice(0, 500),
        appIdPrefix: appId.slice(0, 4) + "...",
      });
    }

    const data = JSON.parse(body);
    return NextResponse.json({
      status: "OK",
      resultCount: data.results?.length ?? 0,
      totalCount: data.count ?? 0,
      sampleTitles: (data.results || []).slice(0, 3).map((j: { title: string; company?: { display_name?: string } }) => ({
        title: j.title,
        company: j.company?.display_name,
      })),
      appIdPrefix: appId.slice(0, 4) + "...",
    });
  } catch (e) {
    return NextResponse.json({
      status: "FETCH_ERROR",
      error: String(e),
      appIdPrefix: appId.slice(0, 4) + "...",
    });
  }
}
