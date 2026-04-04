# CareerTalks — Project Context for Claude Code

## Project Overview
CareerTalks (careertalks.space) is a free career guidance platform built with Next.js 16 (App Router), Tailwind CSS 4, and markdown-based content. Targets students grade 9+ and early-career professionals in India and globally. 20 career paths, ~125 articles, 11 interactive tools, 190 comparison pages.

## Key Architecture
- **Framework**: Next.js 16 with App Router, deployed on Vercel (auto-deploy from `main`)
- **Content**: Markdown files in `/content/[career-slug]/` parsed with gray-matter + remark
- **Career config**: `src/lib/career-config.ts` — 20 careers across 4 clusters (tech, business, science, creative)
- **Articles**: `src/lib/articles.ts` — reads from `/content/`, 6 article types per career
- **Schemas**: `src/components/JsonLd.tsx` — WebSite, EducationalOrganization, Article, Breadcrumb, FAQ, Occupation
- **Newsletter**: Buttondown API via `/api/subscribe` route. API key in Vercel env vars.
- **Analytics**: GA4 (G-HNDHCJR8L4)
- **Domain**: `careertalks.space` (non-www is canonical, www redirects via Vercel dashboard)

## Career Hub Revamp (April 2026)

### Design System
- **Visual hierarchy**: Light body + single dark sticky progress bar (the focal point)
- **Theme**: White (#ffffff) body, dark bar (#0f172a), frosted glass navbar
- **Cluster colors**: Tech #3B82F6 (blue), Business #F59E0B (amber), Science #10B981 (green), Creative #F43F5E (rose)
- **Typography**: Inter font family, 300–800 weights
- **Cards**: 1px #e8ecf4 border, 10px radius, subtle hover (border-color + light shadow)
- **Prototype**: `career-page-redesign-prototype.html` (root of repo) — the visual spec

### Career Hub Page Structure (top to bottom)
1. **Navbar** — Frosted glass, CT logo, nav links, CTA (sticky, z-index 60)
2. **Hero** — Light gradient, breadcrumb, title + emoji icon, cluster badge, stats row
3. **Sticky Progress Bar** — Dark (#0f172a), 3 SVG progress rings (Knowledge/Skills/Experience), benchmark text, 3 tabs (sticky, z-index 40, top: 56px)
4. **Content Area** — Tab-switched: Latest | Practice | Earn Now
5. **Related Careers** — 3-column grid on light gray background
6. **Footer** — Dark (#030712), 5-column layout with all 20 careers by cluster

### Three Tabs
- **Latest** (blue active) — Live RSS + Dev.to + Reddit content, notification dot with count
- **Practice** (green active) — Quizzes, simulations, skill challenges, progress dots
- **Earn Now** (amber active) — Job/gig listings with pay, location, apply links, filter pills

### Content Feed System (Latest Tab)
- **Config**: `src/lib/career-sources.ts` — Maps all 20 careers to RSS feeds (global + India/Asia), job keywords, Dev.to/Medium tags, Reddit subreddits
- **Content Fetcher**: `src/lib/fetchers/content-fetcher.ts` — Regex-based RSS parser (no deps), Dev.to API, Reddit JSON
- **API Route**: `GET /api/careers/[slug]/content?limit=15` — ISR 1 hour

#### India/Asia RSS Sources (verified working)
YourStory, Inc42, ET Tech, LiveMint, MoneyControl, ETHRWorld (hr.economictimes...), ET Healthworld, Express Healthcare, ET Hospitality, ET Retail, ET Realty, Bar & Bench, ArchDaily

#### RSS URL Pattern for Economic Times verticals
- Use: `https://{vertical}.economictimes.indiatimes.com/rss/topstories`
- NOT: `rss_feeds.cms` (old, returns 404)
- ETHRWorld moved to: `hr.economictimes.indiatimes.com` (not `ethrworld.com`)

### Job Aggregation System (Earn Now Tab)
- **Job Fetcher**: `src/lib/fetchers/job-fetcher.ts` — 5 APIs in parallel, deduplication, date sort
- **API Route**: `GET /api/careers/[slug]/jobs?limit=20` — ISR 1 hour

#### Job APIs
| API | Auth | Coverage |
|-----|------|----------|
| Remotive | None | Remote-only, 18 category slugs |
| Jobicy | None | Remote-only, tag-based |
| Himalayas | None | Remote-only, keyword search |
| Adzuna | Free key | Multi-country: US, IN, GB, SG, AU |
| The Muse | Free key | US-focused |

#### Adzuna Multi-Country
- Queries multiple countries per career in parallel
- Currency symbols: US=$, IN=₹, GB=£, SG=S$, AU=A$
- Countries per sector configured in `adzunaCountries` field

#### Remotive Category Mapping
- Use category alone (NOT search+category combined — returns 0 results)
- Verified slugs: `software-development`, `ai-ml`, `finance`, `marketing`, `product`, `design`, `human-resources`, `legal`, `education`, `medical`, `devops`, `data`, `writing`, `qa`, `sales-business`, `customer-service`, `project-management`, `all-others`

### Progress Tracking (Gamification)
- 3 SVG donut rings: Knowledge (blue), Skills (green), Experience (amber)
- Stored in localStorage per user per career (no auth for MVP)
- Bi-monthly cycles with benchmark messages
- Notification dots on tabs showing new content count

### Environment Variables (Vercel)
| Variable | Purpose |
|----------|---------|
| ADZUNA_APP_ID | Adzuna job API (multi-country) |
| ADZUNA_APP_KEY | Adzuna job API (multi-country) |
| THE_MUSE_API_KEY | The Muse job API |

## Important Conventions
- All URLs must use `careertalks.space` (NOT www.careertalks.space)
- Career slugs must match content directory names exactly
- Tool pages are `"use client"` — metadata goes in sibling `layout.tsx` files
- Sitemap is dynamic in `src/app/sitemap.ts` — includes all pages, tools, comparisons
- OG image is edge-rendered at `src/app/opengraph-image.tsx`
- `lightningcss` native module prevents `npm run build` locally — use `npx tsc --noEmit` for type checking
- ISR caching: use `revalidate = 3600` (1 hour) on API routes and external fetch calls

## Ecosystem
- **AI Think Tank**: aithinktank.space (sister site)
- **The Practise Ground**: thepractiseground.in (sister site)
- Cross-promo via `FloatingPromoBar` (sticky bottom bar, kept) — `CrossPromoStrip` was removed

## Task Tracker
See `TODO.md` in project root for pending tasks and roadmap items.
