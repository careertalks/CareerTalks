/**
 * Job Fetcher — aggregates listings from multiple free APIs
 *
 * Sources (all free, no API key for Tier 1):
 *   Tier 1 (no auth): Remotive, Jobicy, Himalayas
 *   Tier 2 (free key): Adzuna, The Muse
 *
 * Usage:
 *   const jobs = await fetchJobsForCareer("ai-data-science");
 */

import type { CareerSlug } from "../career-config";
import { careerSources } from "../career-sources";

// ─── Types ───────────────────────────────────────────────────────────

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  salaryRange?: string;
  url: string;
  postedAt: string; // ISO date string
  source: "remotive" | "jobicy" | "himalayas" | "adzuna" | "themuse";
  tags?: string[];
  remote: boolean;
}

export interface JobFetchResult {
  jobs: JobListing[];
  totalFound: number;
  sources: string[];
  fetchedAt: string;
  careerSlug: CareerSlug;
}

// ─── Remotive (No Auth) ─────────────────────────────────────────────

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  tags: string[];
}

async function fetchRemotive(
  keywords: string[],
  category?: string,
  limit = 10
): Promise<JobListing[]> {
  try {
    // Remotive works better with category alone; search + category can return 0
    const params = new URLSearchParams({ limit: String(limit) });
    if (category) {
      params.set("category", category);
    } else {
      // Fall back to keyword search only if no category
      const searchQuery = keywords.slice(0, 2).join(" ");
      params.set("search", searchQuery);
    }

    const res = await fetch(`https://remotive.com/api/remote-jobs?${params}`, {
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!res.ok) return [];
    const data = await res.json();

    return (data.jobs || []).slice(0, limit).map((j: RemotiveJob): JobListing => ({
      id: `remotive-${j.id}`,
      title: j.title,
      company: j.company_name,
      companyLogo: j.company_logo || undefined,
      location: j.candidate_required_location || "Remote",
      type: mapJobType(j.job_type),
      salaryRange: j.salary || undefined,
      url: j.url,
      postedAt: j.publication_date,
      source: "remotive",
      tags: j.tags || [],
      remote: true,
    }));
  } catch (e) {
    console.error("[JobFetcher] Remotive error:", e);
    return [];
  }
}

// ─── Jobicy (No Auth) ───────────────────────────────────────────────

interface JobicyJob {
  id: number;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  pubDate: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  salaryCurrency?: string;
}

async function fetchJobicy(
  keywords: string[],
  limit = 10
): Promise<JobListing[]> {
  try {
    // Jobicy uses tag parameter for keyword search
    const tag = keywords[0]?.replace(/\s+/g, "-").toLowerCase() || "";
    const params = new URLSearchParams({
      count: String(limit),
      tag,
    });

    const res = await fetch(`https://jobicy.com/api/v2/remote-jobs?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();

    return (data.jobs || []).slice(0, limit).map((j: JobicyJob): JobListing => {
      let salaryRange: string | undefined;
      if (j.annualSalaryMin && j.annualSalaryMax) {
        const currency = j.salaryCurrency || "USD";
        salaryRange = `${currency} ${formatSalary(j.annualSalaryMin)} – ${formatSalary(j.annualSalaryMax)}`;
      }

      return {
        id: `jobicy-${j.id}`,
        title: j.jobTitle,
        company: j.companyName,
        companyLogo: j.companyLogo || undefined,
        location: j.jobGeo || "Remote",
        type: mapJobType(j.jobType?.[0] || "full_time"),
        salaryRange,
        url: j.url,
        postedAt: j.pubDate,
        source: "jobicy",
        tags: j.jobIndustry || [],
        remote: true,
      };
    });
  } catch (e) {
    console.error("[JobFetcher] Jobicy error:", e);
    return [];
  }
}

// ─── Himalayas (No Auth, 20 max per request) ────────────────────────

interface HimalayasJob {
  guid: string;
  title: string;
  companyName: string;
  companySlug?: string;
  companyLogo?: string;
  locationRestrictions?: string[];
  seniority?: string[];
  employmentType?: string;
  applicationLink: string;
  pubDate: number; // Unix timestamp
  minSalary?: number;
  maxSalary?: number;
  categories?: string[];
}

async function fetchHimalayas(
  keywords: string[],
  limit = 10
): Promise<JobListing[]> {
  try {
    const keyword = keywords[0] || "";
    const params = new URLSearchParams({
      keyword,
      limit: String(Math.min(limit, 20)), // Himalayas caps at 20
    });

    const res = await fetch(`https://himalayas.app/jobs/api?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();

    return (data.jobs || []).slice(0, limit).map((j: HimalayasJob): JobListing => {
      let salaryRange: string | undefined;
      if (j.minSalary && j.maxSalary) {
        salaryRange = `$${formatSalary(j.minSalary)} – $${formatSalary(j.maxSalary)}`;
      }

      // pubDate is a Unix timestamp (seconds) — convert to ISO string
      const postedAt = j.pubDate
        ? new Date(j.pubDate * 1000).toISOString()
        : new Date().toISOString();

      return {
        id: `himalayas-${j.guid || j.companySlug || j.title}`,
        title: j.title,
        company: j.companyName,
        companyLogo: j.companyLogo || undefined,
        location: j.locationRestrictions?.join(", ") || "Remote",
        type: mapJobType(j.employmentType || "full_time"),
        salaryRange,
        url: j.applicationLink || j.guid || "",
        postedAt,
        source: "himalayas",
        tags: j.categories || [],
        remote: true,
      };
    });
  } catch (e) {
    console.error("[JobFetcher] Himalayas error:", e);
    return [];
  }
}

// ─── Adzuna (Requires Free API Key) ─────────────────────────────────

interface AdzunaJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
  redirect_url: string;
  created: string;
  category: { tag: string; label: string };
}

// Currency symbols for Adzuna country results
const ADZUNA_CURRENCY: Record<string, string> = {
  us: "$", gb: "£", in: "₹", sg: "S$", au: "A$", ca: "C$", de: "€", fr: "€",
};

async function fetchAdzunaForCountry(
  country: string,
  keywords: string[],
  adzunaCategory?: string,
  limit = 10
): Promise<JobListing[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return [];

  try {
    const query = keywords.slice(0, 3).join(" OR ");
    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      results_per_page: String(limit),
      what: query,
      content_type: "application/json",
    });
    if (adzunaCategory) params.set("category", adzunaCategory);

    const res = await fetch(
      `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];
    const data = await res.json();

    const currencySymbol = ADZUNA_CURRENCY[country] || "$";

    return (data.results || []).slice(0, limit).map((j: AdzunaJob): JobListing => {
      let salaryRange: string | undefined;
      if (j.salary_min && j.salary_max) {
        salaryRange = `${currencySymbol}${formatSalary(j.salary_min)} – ${currencySymbol}${formatSalary(j.salary_max)}`;
      }

      return {
        id: `adzuna-${country}-${j.id}`,
        title: j.title,
        company: j.company?.display_name || "Unknown",
        location: j.location?.display_name || country.toUpperCase(),
        type: mapJobType(j.contract_type || "full_time"),
        salaryRange,
        url: j.redirect_url,
        postedAt: j.created,
        source: "adzuna",
        tags: [j.category?.label, country.toUpperCase()].filter(Boolean),
        remote: j.title.toLowerCase().includes("remote") || j.location?.display_name?.toLowerCase().includes("remote"),
      };
    });
  } catch (e) {
    console.error(`[JobFetcher] Adzuna (${country}) error:`, e);
    return [];
  }
}

/**
 * Fetch from Adzuna across multiple countries in parallel.
 * Splits the limit evenly across countries.
 */
async function fetchAdzuna(
  keywords: string[],
  adzunaCategory?: string,
  countries: string[] = ["us"],
  limit = 10
): Promise<JobListing[]> {
  const perCountry = Math.max(3, Math.ceil(limit / countries.length));

  const results = await Promise.allSettled(
    countries.map((c) => fetchAdzunaForCountry(c, keywords, adzunaCategory, perCountry))
  );

  const allJobs: JobListing[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allJobs.push(...r.value);
  }
  return allJobs.slice(0, limit);
}

// ─── The Muse (Free, 500 req/hr unregistered) ──────────────────────

interface MuseJob {
  id: number;
  name: string;
  type: string;
  company: { name: string };
  locations: { name: string }[];
  publication_date: string;
  refs: { landing_page: string };
  levels: { name: string }[];
  categories: { name: string }[];
}

async function fetchTheMuse(
  keywords: string[],
  limit = 10
): Promise<JobListing[]> {
  try {
    // The Muse uses category parameter
    const params = new URLSearchParams({
      page: "0",
      descending: "true",
    });
    // Add keyword as category filter if possible
    if (keywords[0]) {
      params.set("category", keywords[0]);
    }

    const apiKey = process.env.THEMUSE_API_KEY;
    if (apiKey) params.set("api_key", apiKey);

    const res = await fetch(
      `https://www.themuse.com/api/public/jobs?${params}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];
    const data = await res.json();

    return (data.results || []).slice(0, limit).map((j: MuseJob): JobListing => ({
      id: `themuse-${j.id}`,
      title: j.name,
      company: j.company?.name || "Unknown",
      location: j.locations?.map((l) => l.name).join(", ") || "Various",
      type: mapJobType(j.type || "full_time"),
      url: j.refs?.landing_page || `https://www.themuse.com/jobs/${j.id}`,
      postedAt: j.publication_date,
      source: "themuse",
      tags: j.categories?.map((c) => c.name) || [],
      remote: j.locations?.some((l) => l.name.toLowerCase().includes("remote")) || false,
    }));
  } catch (e) {
    console.error("[JobFetcher] TheMuse error:", e);
    return [];
  }
}

// ─── Utilities ───────────────────────────────────────────────────────

function mapJobType(raw: string): JobListing["type"] {
  const lower = (raw || "").toLowerCase().replace(/[_-]/g, "");
  if (lower.includes("fulltime") || lower === "permanent") return "full-time";
  if (lower.includes("parttime")) return "part-time";
  if (lower.includes("contract") || lower.includes("temporary")) return "contract";
  if (lower.includes("freelance")) return "freelance";
  if (lower.includes("internship") || lower.includes("intern")) return "internship";
  return "full-time";
}

function formatSalary(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

function deduplicateJobs(jobs: JobListing[]): JobListing[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    // Normalize: lowercase title + company to deduplicate across sources
    const key = `${job.title.toLowerCase().trim()}|${job.company.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortByDate(jobs: JobListing[]): JobListing[] {
  return jobs.sort((a, b) => {
    const da = new Date(a.postedAt).getTime() || 0;
    const db = new Date(b.postedAt).getTime() || 0;
    return db - da; // newest first
  });
}

// ─── Main Aggregator ─────────────────────────────────────────────────

/**
 * Fetches jobs from all available APIs for a given career slug.
 * Runs all APIs in parallel, deduplicates, and sorts by date.
 */
export async function fetchJobsForCareer(
  slug: CareerSlug,
  limit = 20
): Promise<JobFetchResult> {
  const config = careerSources[slug];
  if (!config) {
    return {
      jobs: [],
      totalFound: 0,
      sources: [],
      fetchedAt: new Date().toISOString(),
      careerSlug: slug,
    };
  }

  const { primary, india, remotiveCategory, adzunaCategory, adzunaCountries } = config.jobKeywords;
  const countries = adzunaCountries || ["us", "in"];
  const perSourceLimit = Math.ceil(limit / 3); // Distribute across sources

  // Use India-specific keywords for Jobicy/Himalayas as bonus queries
  const indiaKeywords = india || [];

  // Run all fetchers in parallel
  const [remotiveJobs, jobicyJobs, himalayasJobs, adzunaJobs, museJobs, jobicyIndia, himalayasIndia] =
    await Promise.allSettled([
      fetchRemotive(primary, remotiveCategory, perSourceLimit),
      fetchJobicy(primary, perSourceLimit),
      fetchHimalayas(primary, perSourceLimit),
      fetchAdzuna(primary, adzunaCategory, countries, perSourceLimit),
      fetchTheMuse(primary, perSourceLimit),
      // Bonus India-specific queries (use first India keyword if available)
      indiaKeywords.length > 0 ? fetchJobicy(indiaKeywords.slice(0, 1), Math.ceil(perSourceLimit / 2)) : Promise.resolve([]),
      indiaKeywords.length > 0 ? fetchHimalayas(indiaKeywords.slice(0, 1), Math.ceil(perSourceLimit / 2)) : Promise.resolve([]),
    ]);

  // Collect all successful results
  const allJobs: JobListing[] = [];
  const activeSources: string[] = [];

  const results = [
    { result: remotiveJobs, name: "Remotive" },
    { result: jobicyJobs, name: "Jobicy" },
    { result: himalayasJobs, name: "Himalayas" },
    { result: adzunaJobs, name: "Adzuna" },
    { result: museJobs, name: "The Muse" },
    { result: jobicyIndia, name: "Jobicy" },      // India bonus (deduped later)
    { result: himalayasIndia, name: "Himalayas" }, // India bonus (deduped later)
  ];

  for (const { result, name } of results) {
    if (result.status === "fulfilled" && result.value.length > 0) {
      allJobs.push(...result.value);
      activeSources.push(name);
    }
  }

  const deduped = deduplicateJobs(allJobs);
  const sorted = sortByDate(deduped).slice(0, limit);

  return {
    jobs: sorted,
    totalFound: deduped.length,
    sources: activeSources,
    fetchedAt: new Date().toISOString(),
    careerSlug: slug,
  };
}
