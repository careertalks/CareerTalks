/**
 * Job Fetcher — aggregates listings from multiple free APIs
 *
 * AUDIENCE: 17–24 year-olds (students, graduates, early-career aspirants)
 *
 * Three layers of filtering:
 *   1. Seniority filter — removes Senior, Director, VP, Principal, Lead, Manager, etc.
 *   2. Relevance scoring — matches job title/tags/categories against career keywords
 *   3. Type prioritization — boosts internships, part-time, freelance, entry-level
 *
 * Sources (all free, no API key required):
 *   - Remotive (category-based or keyword search)
 *   - Jobicy (tag-based, multiple keywords in parallel)
 *   - Himalayas (fetch latest, client-side filtering via categories + seniority)
 *   - Adzuna (optional, requires free API key)
 *
 * Himalayas NOTE: Their keyword/search params don't work (returns same jobs
 * regardless of query). Instead we fetch their latest listings and filter
 * client-side using their rich `categories` and `seniority` fields.
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
  source: "remotive" | "jobicy" | "adzuna" | "himalayas";
  tags?: string[];
  remote: boolean;
}

export interface JobFetchResult {
  jobs: JobListing[];
  totalFound: number;
  sources: string[];
  fetchedAt: string;
  careerSlug: CareerSlug;
  // Temporary debug field — remove after verifying Adzuna
  _debug?: {
    adzunaRaw: number;
    adzunaSample: string[];
    adzunaAfterSeniority: number;
    adzunaAfterRelevance: number;
    hasAdzunaKeys: boolean;
  };
}

// ─── Seniority Filter (audience: 17–24 yr olds) ─────────────────────

/** Title patterns that indicate senior/leadership roles */
const SENIOR_TITLE_PATTERNS = [
  /\bsenior\b/i,
  /\bsr\.?\s/i,
  /\bdirector\b/i,
  /\bvp\b/i,
  /\bvice\s*president\b/i,
  /\bprincipal\b/i,
  /\bstaff\s+(engineer|developer|designer|scientist)\b/i,
  /\bhead\s+of\b/i,
  /\bchief\b/i,
  /\bc[a-z]o\b/i, // CTO, CFO, COO, etc.
  /\barchitect\b/i, // Solutions Architect, etc. — usually 8+ yrs
  /\blead\b/i, // Tech Lead, Lead Engineer, etc. — all "lead" roles are 5+ yrs
  /\bmanager\b/i, // Account Manager, Engineering Manager, etc. — usually 5+ yrs
  /\bengineering\s+manager\b/i,
  /\bmanaging\s+director\b/i,
  /\bpartner\b/i, // law/consulting
  /\b(5|6|7|8|9|10|12|15)\+?\s*years?\b/i, // explicit experience requirements
  /\b(5|6|7|8|9|10|12|15)\+?\s*yrs?\b/i,
];

/**
 * Title substrings where "manager" or "lead" is VALID for entry-level
 * (e.g., "Lead Generation Specialist" is NOT a "Lead" role)
 */
const SENIORITY_EXCEPTIONS = [
  /\blead\s+generat/i, // lead generation
  /\bproject\s+coordinator\b/i,
  /\baccount\s+coordinator\b/i,
  /\bmanager\s+trainee\b/i,
  /\btrainee\s+manager\b/i,
  /\bassistant\s+manager\b/i,
  /\bjunior\b/i,
  /\bjr\b/i,
  /\bintern\b/i,
  /\btrainee\b/i,
  /\bentry[\s-]?level\b/i,
  /\bapprentice\b/i,
  /\bfresher\b/i,
  /\bgraduate\b/i,
];

/** Title patterns that indicate entry-level / student-friendly roles */
const ENTRY_LEVEL_BOOST_PATTERNS = [
  /\bjunior\b/i,
  /\bjr\.?\b/i,
  /\bintern\b/i,
  /\binternship\b/i,
  /\bentry[\s-]?level\b/i,
  /\btrainee\b/i,
  /\bgraduate\b/i,
  /\bapprentice\b/i,
  /\bassociate\b/i,
  /\bfresher\b/i,
  /\bstarter\b/i,
  /\bfellow\b/i,
  /\bpart[\s-]?time\b/i,
  /\bfreelance\b/i,
  /\bcontract\b/i,
  /\bcoordinator\b/i,
  /\bassistant\b/i,
  /\banalyst\b/i, // usually 0-3 yrs
  /\bexecutive\b/i, // in India this = entry-level (not exec)
  /\brepresentative\b/i,
  /\bspecialist\b/i,
  /\btutor\b/i,
];

/**
 * Returns true if the job title indicates a senior role.
 * Checks both title patterns and exceptions (e.g., "Junior Manager" is NOT senior).
 */
function isSeniorRole(title: string, careerSlug?: CareerSlug): boolean {
  const lower = title.toLowerCase();

  // Check exceptions first — if any exception matches, it's NOT senior
  if (SENIORITY_EXCEPTIONS.some((p) => p.test(lower))) {
    return false;
  }

  // Exception: "architect" is valid for architecture-planning career
  if (careerSlug === "architecture-planning" && /\barchitect\b/i.test(lower)) {
    // Only flag if it also has other senior markers (Senior Architect, etc.)
    const otherSeniorPatterns = SENIOR_TITLE_PATTERNS.filter(
      (p) => !p.source.includes("architect")
    );
    return otherSeniorPatterns.some((p) => p.test(lower));
  }

  return SENIOR_TITLE_PATTERNS.some((p) => p.test(title));
}

/** Returns true if the title suggests entry-level suitability */
function isEntryLevel(title: string): boolean {
  return ENTRY_LEVEL_BOOST_PATTERNS.some((p) => p.test(title));
}

// ─── Relevance Scoring ──────────────────────────────────────────────

/**
 * Creates a word-boundary regex for a keyword.
 * Uses \b for normal words; for hyphenated compound words in tags
 * (e.g., "AI-Training"), also checks with hyphens replaced by spaces.
 */
function keywordRegex(keyword: string): RegExp {
  // Escape regex special chars except hyphens (we handle those)
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Allow hyphens/spaces to match interchangeably (for "data-science" vs "data science")
  const pattern = escaped.replace(/[\s-]+/g, "[\\s\\-]+");
  return new RegExp(`\\b${pattern}\\b`, "i");
}

/**
 * Scores a job's relevance to a career track (0.0 to 1.0).
 * Uses WORD-BOUNDARY matching (not substring) to avoid false positives.
 *
 * KEY RULE: At least one keyword must match in the job TITLE (not just tags).
 * Tag-only matches are too noisy — e.g., an "Office Assistant" tagged "frontend"
 * should not appear in the software-development track.
 *
 * Returns 0 if the job has zero relevance (should be filtered out).
 */
function scoreRelevance(
  job: JobListing,
  primaryKeywords: string[],
  exclude?: string[]
): number {
  const titleLower = job.title.toLowerCase();
  // Normalize tag separators: replace hyphens with spaces for matching
  const tagsNormalized = (job.tags || [])
    .map((t) => t.toLowerCase().replace(/-/g, " "))
    .join(" | ");
  const combined = `${titleLower} ${tagsNormalized}`;

  // Check exclude keywords with word boundaries
  if (
    exclude?.some((kw) => {
      const re = keywordRegex(kw);
      return re.test(combined);
    })
  ) {
    return 0;
  }

  let score = 0;
  let titleMatchCount = 0;
  let tagMatchCount = 0;

  for (const keyword of primaryKeywords) {
    const re = keywordRegex(keyword);

    // Full keyword match in title = highest value
    if (re.test(titleLower)) {
      score += 1.0;
      titleMatchCount++;
      continue;
    }

    // Full keyword match in tags (lower score, acts as bonus only)
    if (re.test(tagsNormalized)) {
      score += 0.4;
      tagMatchCount++;
      continue;
    }

    // For multi-word keywords, check if individual LONG terms match in title
    // (must be 5+ chars to be meaningful)
    const terms = keyword.toLowerCase().split(/\s+/);
    if (terms.length > 1) {
      const titleTermMatches = terms.filter(
        (t) => t.length >= 5 && new RegExp(`\\b${t}\\b`, "i").test(titleLower)
      );
      if (titleTermMatches.length > 0) {
        score += 0.3 * (titleTermMatches.length / terms.length);
        titleMatchCount++;
      }
    }
  }

  // Require either:
  //   (a) at least one title-level match, OR
  //   (b) 2+ tag keyword matches (a single tag match is noisy, but 2+ is a strong signal)
  // This prevents "Office Assistant" tagged "frontend" (1 tag) from appearing in
  // software-dev, but ALLOWS "Junior Analyst" tagged "data-science" + "machine-learning".
  if (titleMatchCount === 0 && tagMatchCount < 2) return 0;

  const totalMatches = titleMatchCount + tagMatchCount;
  if (totalMatches === 0) return 0;

  // Normalize: at least one strong match = 0.5+
  return Math.min(1.0, score / Math.max(1, primaryKeywords.length / 2));
}

// ─── Type Prioritization ────────────────────────────────────────────

/**
 * Sorting score for job type suitability (higher = more suitable for audience).
 * Internships and part-time come first.
 */
function typePriorityScore(job: JobListing): number {
  let score = 0;

  // Type priority (for 17-24 audience)
  switch (job.type) {
    case "internship":
      score += 50;
      break;
    case "part-time":
      score += 40;
      break;
    case "freelance":
      score += 35;
      break;
    case "contract":
      score += 30;
      break;
    case "full-time":
      score += 10; // still included, just lower priority
      break;
  }

  // Entry-level title boost
  if (isEntryLevel(job.title)) {
    score += 25;
  }

  return score;
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
  limit = 20
): Promise<JobListing[]> {
  try {
    // Remotive: use category when available, otherwise keyword search
    const params = new URLSearchParams({ limit: String(limit) });
    if (category) {
      params.set("category", category);
    } else {
      const searchQuery = keywords.slice(0, 2).join(" ");
      params.set("search", searchQuery);
    }

    const res = await fetch(`https://remotive.com/api/remote-jobs?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();

    return (data.jobs || []).slice(0, limit).map(
      (j: RemotiveJob): JobListing => ({
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
      })
    );
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
  limit = 20
): Promise<JobListing[]> {
  // Try multiple keywords in parallel (Jobicy only accepts one tag at a time)
  const tags = keywords
    .slice(0, 3)
    .map((k) => k.replace(/\s+/g, "-").toLowerCase())
    .filter(Boolean);

  if (tags.length === 0) return [];

  const perTag = Math.ceil(limit / tags.length);
  const tagResults = await Promise.allSettled(
    tags.map(async (tag) => {
      const params = new URLSearchParams({
        count: String(perTag),
        tag,
      });
      const res = await fetch(
        `https://jobicy.com/api/v2/remote-jobs?${params}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.jobs || [];
    })
  );

  const allJobs: JobicyJob[] = [];
  for (const r of tagResults) {
    if (r.status === "fulfilled") allJobs.push(...r.value);
  }

  try {
    return allJobs.slice(0, limit).map((j: JobicyJob): JobListing => {
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

// ─── Himalayas (No Auth, Client-Side Filtering) ─────────────────────

interface HimalayasJob {
  title: string;
  companyName: string;
  companyLogo: string;
  applicationLink: string;
  guid: string;
  pubDate: number; // Unix timestamp
  categories: string[];
  seniority: string[];
  jobType: string | null;
  locationRestrictions: string[];
  excerpt: string;
}

/** Himalayas seniority values that are OK for our audience */
const HIMALAYAS_OK_SENIORITY = new Set(["Entry-level", "Mid-level"]);

/**
 * Fetch from Himalayas with client-side relevance filtering.
 * Their API returns latest jobs regardless of query params, so we:
 *   1. Fetch 50 latest jobs
 *   2. Filter by seniority (Entry-level or Mid-level only)
 *   3. Match `categories` against career keywords for relevance
 */
async function fetchHimalayas(
  keywords: string[],
  limit = 20
): Promise<JobListing[]> {
  try {
    // Fetch a large batch — we'll filter aggressively
    // 150 gives us a wider pool of careers to match from
    const res = await fetch(
      `https://himalayas.app/jobs/api?limit=150`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const jobs: HimalayasJob[] = data.jobs || [];

    // Build word-boundary regex matchers for each keyword
    const kwRegexes = keywords.map((k) => keywordRegex(k));

    const matched: JobListing[] = [];

    for (const j of jobs) {
      // Step 1: Filter by seniority (only Entry-level and Mid-level)
      const seniority = j.seniority || [];
      const seniorityOk =
        seniority.length === 0 ||
        seniority.some((s) => HIMALAYAS_OK_SENIORITY.has(s));
      if (!seniorityOk) continue;

      // Step 2: Check relevance via categories + title (word-boundary matching)
      // Normalize categories: "Product-Management" → "product management"
      const catsNormalized = (j.categories || [])
        .map((c) => c.toLowerCase().replace(/-/g, " "))
        .join(" | ");
      const titleLower = j.title.toLowerCase();

      // Count how many keywords match in title vs categories
      let titleMatch = false;
      let catMatchCount = 0;
      for (const re of kwRegexes) {
        if (re.test(titleLower)) {
          titleMatch = true;
          break; // Title match is sufficient
        }
        if (re.test(catsNormalized)) {
          catMatchCount++;
        }
      }

      // Require either a title match OR at least 2 category matches
      // (single category match is too noisy — e.g., "Operations" matches many jobs)
      if (!titleMatch && catMatchCount < 2) continue;

      // Map to our format
      const postedAt = j.pubDate
        ? new Date(j.pubDate * 1000).toISOString()
        : new Date().toISOString();

      matched.push({
        id: `himalayas-${j.guid || j.title.replace(/\s+/g, "-").toLowerCase()}`,
        title: j.title,
        company: j.companyName,
        companyLogo: j.companyLogo || undefined,
        location:
          j.locationRestrictions?.length > 0
            ? j.locationRestrictions.join(", ")
            : "Remote",
        type: mapJobType(j.jobType || "full_time"),
        salaryRange: undefined, // Himalayas doesn't expose salary in API
        url: j.applicationLink || j.guid,
        postedAt,
        source: "himalayas",
        tags: (j.categories || []).slice(0, 5),
        remote: true,
      });

      if (matched.length >= limit) break;
    }

    return matched;
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

const ADZUNA_CURRENCY: Record<string, string> = {
  us: "$",
  gb: "£",
  in: "₹",
  sg: "S$",
  au: "A$",
  ca: "C$",
  de: "€",
  fr: "€",
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
    // Simple keyword search — seniority filtering happens in the pipeline
    const query = keywords.slice(0, 3).join(" OR ");
    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      results_per_page: String(limit),
      what: query,
    });
    if (adzunaCategory) params.set("category", adzunaCategory);

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params}`;
    console.log(`[JobFetcher] Adzuna (${country}) URL: ${url.replace(appKey, "***")}`);

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[JobFetcher] Adzuna (${country}) HTTP ${res.status}: ${body.slice(0, 200)}`);
      return [];
    }
    const data = await res.json();
    console.log(`[JobFetcher] Adzuna (${country}) returned ${data.results?.length ?? 0} results`);
    return mapAdzunaJobs(data.results || [], country, limit);
  } catch (e) {
    console.error(`[JobFetcher] Adzuna (${country}) error:`, e);
    return [];
  }
}

function mapAdzunaJobs(
  results: AdzunaJob[],
  country: string,
  limit: number
): JobListing[] {
  const currencySymbol = ADZUNA_CURRENCY[country] || "$";
  return results.slice(0, limit).map(
    (j: AdzunaJob): JobListing => {
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
        remote:
          j.title.toLowerCase().includes("remote") ||
          j.location?.display_name?.toLowerCase().includes("remote"),
      };
    }
  );
}

async function fetchAdzuna(
  keywords: string[],
  adzunaCategory?: string,
  countries: string[] = ["us"],
  limit = 10
): Promise<JobListing[]> {
  const perCountry = Math.max(5, Math.ceil(limit / countries.length));

  const results = await Promise.allSettled(
    countries.map((c) =>
      fetchAdzunaForCountry(c, keywords, adzunaCategory, perCountry)
    )
  );

  const allJobs: JobListing[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allJobs.push(...r.value);
  }
  return allJobs.slice(0, limit);
}

// ─── Utilities ───────────────────────────────────────────────────────

function mapJobType(raw: string): JobListing["type"] {
  const lower = (raw || "").toLowerCase().replace(/[_-]/g, "");
  if (lower.includes("fulltime") || lower === "permanent") return "full-time";
  if (lower.includes("parttime")) return "part-time";
  if (lower.includes("contract") || lower.includes("temporary"))
    return "contract";
  if (lower.includes("freelance")) return "freelance";
  if (lower.includes("internship") || lower.includes("intern"))
    return "internship";
  return "full-time";
}

function formatSalary(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

function deduplicateJobs(jobs: JobListing[]): JobListing[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = `${job.title.toLowerCase().trim()}|${job.company.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Main Aggregator ─────────────────────────────────────────────────

/**
 * Fetches jobs from all available APIs for a given career slug.
 *
 * Pipeline:
 *   1. Fetch from Remotive + Jobicy + Himalayas + Adzuna in parallel
 *   2. Remove senior/leadership titles (audience = 17–24 yr olds)
 *   3. Score relevance against career keywords (drop irrelevant ones)
 *   4. Sort by: type priority (intern > part-time > freelance > contract > full-time)
 *              then by relevance score, then by date
 *   5. Deduplicate and return top N
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

  const {
    primary,
    india,
    exclude,
    remotiveCategory,
    remotiveCategories,
    adzunaCategory,
    adzunaCountries,
  } = config.jobKeywords;
  const countries = adzunaCountries || ["us", "in"];

  // Fetch MORE than needed so we have room after filtering
  const fetchLimit = Math.min(limit * 4, 80);

  const indiaKeywords = india || [];

  // Build Remotive fetches — query multiple categories if available
  const remotiveFetches: Promise<JobListing[]>[] = [];
  const cats = remotiveCategories || (remotiveCategory ? [remotiveCategory] : []);
  if (cats.length > 0) {
    const perCat = Math.ceil(fetchLimit / cats.length);
    for (const cat of cats) {
      remotiveFetches.push(fetchRemotive(primary, cat, perCat));
    }
  } else {
    // Keyword-only search (no category)
    remotiveFetches.push(fetchRemotive(primary, undefined, fetchLimit));
  }

  // Run ALL fetchers in parallel
  const [remotiveResults, jobicyJobs, himalayasJobs, adzunaJobs, jobicyIndia] =
    await Promise.allSettled([
      Promise.allSettled(remotiveFetches).then((results) =>
        results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      ),
      fetchJobicy(primary, fetchLimit),
      fetchHimalayas(primary, fetchLimit),
      fetchAdzuna(primary, adzunaCategory, countries, fetchLimit),
      // Bonus India-specific query via Jobicy
      indiaKeywords.length > 0
        ? fetchJobicy(indiaKeywords.slice(0, 1), Math.ceil(fetchLimit / 2))
        : Promise.resolve([]),
    ]);

  // Collect all successful results
  const allJobs: JobListing[] = [];
  const activeSources: string[] = [];

  const results = [
    { result: remotiveResults, name: "Remotive" },
    { result: jobicyJobs, name: "Jobicy" },
    { result: himalayasJobs, name: "Himalayas" },
    { result: adzunaJobs, name: "Adzuna" },
    { result: jobicyIndia, name: "Jobicy" },
  ];

  for (const { result, name } of results) {
    if (result.status === "fulfilled" && result.value.length > 0) {
      allJobs.push(...result.value);
      if (!activeSources.includes(name)) activeSources.push(name);
    }
  }

  // ─── DEBUG: Track Adzuna through pipeline ────────────────────
  const adzunaRawJobs = adzunaJobs.status === "fulfilled" ? adzunaJobs.value : [];
  const hasAdzunaKeys = !!(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY);

  // ─── FILTER PIPELINE ──────────────────────────────────────────

  // Step 1: Remove jobs without valid URLs
  let filtered = allJobs.filter(
    (j) => j.url && j.url.startsWith("http")
  );

  // Step 2: Remove senior/leadership roles (title-based, for non-Himalayas)
  // Note: Himalayas jobs already filtered by seniority field in fetchHimalayas()
  filtered = filtered.filter((j) => !isSeniorRole(j.title, slug));

  // DEBUG: count adzuna after seniority
  const adzunaAfterSeniority = filtered.filter((j) => j.source === "adzuna").length;

  // Step 3: Score relevance and remove irrelevant jobs
  const scored = filtered.map((job) => ({
    job,
    relevance: scoreRelevance(job, primary, exclude),
    typePriority: typePriorityScore(job),
    entryLevel: isEntryLevel(job.title),
  }));

  // Keep only jobs with actual relevance to the career track
  // ALL jobs must pass relevance scoring — no free passes
  const relevant = scored.filter((s) => s.relevance > 0);

  // DEBUG: count adzuna after relevance
  const adzunaAfterRelevance = relevant.filter((s) => s.job.source === "adzuna").length;

  // Step 4: Sort — entry-level/intern first, then by relevance + type priority
  relevant.sort((a, b) => {
    // Primary: type priority (internship > part-time > freelance > ...)
    const typeDiff = b.typePriority - a.typePriority;
    if (typeDiff !== 0) return typeDiff;

    // Secondary: relevance score
    const relDiff = b.relevance - a.relevance;
    if (Math.abs(relDiff) > 0.1) return relDiff;

    // Tertiary: newest first
    const da = new Date(a.job.postedAt).getTime() || 0;
    const db = new Date(b.job.postedAt).getTime() || 0;
    return db - da;
  });

  // Step 5: Deduplicate and cap
  const deduped = deduplicateJobs(relevant.map((s) => s.job));
  const final = deduped.slice(0, limit);

  return {
    jobs: final,
    totalFound: deduped.length,
    sources: activeSources,
    fetchedAt: new Date().toISOString(),
    careerSlug: slug,
    _debug: {
      adzunaRaw: adzunaRawJobs.length,
      adzunaSample: adzunaRawJobs.slice(0, 5).map((j) => j.title),
      adzunaAfterSeniority,
      adzunaAfterRelevance,
      hasAdzunaKeys,
    },
  };
}
