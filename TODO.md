# CareerTalks — Task Tracker & Roadmap

_Last updated: April 4, 2026_

---

## ✅ COMPLETED

### P0 — Critical Fixes
- [x] A1: Fix www/non-www URL mismatch across JSON-LD, OG tags, ecosystem config
- [x] A2: Rename content/hr-people-management → content/human-resources (6 hidden articles)
- [x] A3: Add FAQPageJsonLd schema to FAQ page (10 Q&A pairs)
- [x] A4: Remove invalid SearchAction from WebsiteJsonLd
- [x] A5: Update stale "2025" keyword to "2026"
- [x] A7: Connect newsletter forms to Buttondown API (subscribe + auto-send)
- [x] A10: Make homepage FAQ items clickable links to /faq

### P1 — SEO Foundation
- [x] A6: Add dynamic OG image via Next.js ImageResponse API + metadataBase
- [x] A8: Create /privacy and /terms pages (footer 404s fixed)
- [x] A9: Add SEO metadata to all 14 tool/interactive pages via layout.tsx
- [x] B3: Create RelatedArticles component on every article page
- [x] B4: Fix canonical URLs, real sitemap dates, tool pages + blog pages in sitemap
- [x] C2: Add EducationalOrganization schema (global) + Occupation schema (per career hub)
- [x] Domain: www→non-www redirect configured in Vercel dashboard
- [x] Domain: DNS A record updated to 216.198.79.1

### P2 — Growth Infrastructure
- [x] Build /search page with instant search across careers and tools
- [x] Build 190 programmatic /compare pages (all career pair combinations)
- [x] Create QuickAnswer and KeyTakeaways AEO components (src/components/AEOBlocks.tsx)
- [x] Remove CrossPromoStrip from all pages, keep FloatingPromoBar
- [x] Buttondown newsletter integration with career tagging
- [x] Auto-send route for new articles (/api/notify-new-article)

### Career Hub Revamp — Backend (April 2026)
- [x] Design career hub page visual prototype (HTML) — light body + dark sticky bar
- [x] Rename "Latest Updates" tab to "Latest"
- [x] Research RSS feeds and job APIs for all 20 career sectors (240+ feeds evaluated)
- [x] Create `career-sources.ts` — 100+ RSS feeds (global + India/Asia), job keywords, Dev.to/Medium/Reddit tags for all 20 careers
- [x] Build `content-fetcher.ts` — regex-based RSS parser + Dev.to API + Reddit JSON, parallel execution
- [x] Build `job-fetcher.ts` — 5-API aggregator (Remotive, Jobicy, Himalayas, Adzuna, The Muse), deduplication
- [x] Fix Remotive category mapping — use category alone, not search+category
- [x] Fix broken RSS feeds (HubSpot → TechCrunch, Search Engine Land → SEJ, dezeen needs www, Creative Boom → Creative Bloq)
- [x] Create API routes: `/api/careers/[slug]/content` and `/api/careers/[slug]/jobs` with ISR (1hr)
- [x] Add India/Asia feeds to all 20 sectors (ET verticals, YourStory, Inc42, Bar & Bench, etc.)
- [x] Fix ET RSS URLs: `rss_feeds.cms` → `rss/topstories`, ETHRWorld moved to `hr.economictimes...`
- [x] Add multi-country Adzuna support (US, IN, GB, SG, AU) with currency formatting
- [x] Add India-specific job keywords for Jobicy/Himalayas bonus queries
- [x] Verify all 13 India RSS feeds working, all 4 cluster tests passing
- [x] TypeScript compilation: zero errors
- [x] Create CT Product Revamp Plan v1 (approved April 4, 2026)
- [x] Update CLAUDE.md with new architecture details
- [x] Update TODO.md with phased implementation roadmap

---

## 🔴 CAREER HUB REVAMP — FRONTEND (Next Up)

### Phase 1: Career Hub React Component
- [ ] Convert HTML prototype to `CareerHubPage.tsx` (or update existing `[career]/page.tsx`)
- [ ] Implement frosted glass navbar (already site-wide? verify consistency)
- [ ] Build hero section with cluster badge, stats row, breadcrumb
- [ ] Build dark sticky progress bar with 3 SVG donut rings
- [ ] Implement tab switching (Latest | Practice | Earn Now) with cluster-colored active states
- [ ] Add notification dots on tabs
- [ ] Responsive design: mobile breakpoints for progress bar, tabs, cards
- [ ] Wire up SWR or fetch for API calls from client component

### Phase 2: Latest Tab — Live Content
- [ ] Create `LatestTab.tsx` component
- [ ] Render RSS articles as cards: title, excerpt, source, image, readTime, publishedAt
- [ ] Render Dev.to articles with proper attribution
- [ ] Render Reddit discussion cards
- [ ] Add source attribution footer ("Curated from..." with source logos/names)
- [ ] Test content loading across all 20 career slugs
- [ ] Handle loading states and empty/error states gracefully

### Phase 3: Earn Now Tab — Live Jobs
- [ ] Create `EarnNowTab.tsx` component
- [ ] Render job cards: title, company, location, pay, tags, apply button
- [ ] Add filter pills by skill/tag
- [ ] Style pay badges with proper currency (₹, $, £, S$, A$)
- [ ] Add "via [source]" attribution on each listing
- [ ] Set up ADZUNA_APP_ID and ADZUNA_APP_KEY in Vercel env vars
- [ ] Test job loading across all 20 career slugs

### Phase 4: Progress Tracking & Gamification
- [ ] Implement localStorage-based progress tracking per career per user
- [ ] Build SVG ring animation (stroke-dasharray/dashoffset)
- [ ] Track article reads (Knowledge ring)
- [ ] Track quiz/challenge completions (Skills ring)
- [ ] Track job views/applies (Experience ring)
- [ ] Add bi-monthly cycle logic with date display
- [ ] Add benchmark motivational messages
- [ ] Add notification dot counts from new content since last visit

### Phase 5A: Practice Tab — Link to Existing Tools (Launch Day)
- [ ] Create `PracticeTab.tsx` component
- [ ] Map existing tools to each career: Salary Calculator (all 20), Skill Match (all 20), Career Explorer (all 20), Day in Life (6 careers), Quiz, Assessment (generic)
- [ ] Render card grid with tool name, description, difficulty tag, estimated time
- [ ] Link each card to existing tool page (e.g., /salary-calculator, /skill-match)
- [ ] Add completion tracking with progress dots (localStorage)

### Phase 5B: Practice Tab — Content Expansion (Fast Follow)
- [ ] Generate Day in Life scenarios for 14 missing careers
- [ ] Add career-specific quiz questions (5-8 per career × 20 careers)
- [ ] Add deeplink support to tools (e.g., /quiz?career=ai-data-science)
- [ ] Build inline quiz component for career-specific questions

### Phase 6: Testing, QA & Deployment
- [ ] Cross-browser testing (Chrome, Safari, Firefox, mobile Safari)
- [ ] Lighthouse performance audit (target: 90+ performance, 95+ accessibility)
- [ ] Verify ISR caching behavior on Vercel (stale-while-revalidate)
- [ ] Test all 20 career pages end-to-end with live API data
- [ ] Monitor error rates for RSS/job API failures in first 48 hours
- [ ] Deploy to production via `git push origin main`

---

## 🔴 PENDING — HIGH PRIORITY (Existing)

### E-E-A-T Building (Critical for SEO + LLM Citation)
- [ ] Add author profiles — create /authors page, add `author` field to article frontmatter
- [ ] Change JSON-LD author @type from "Organization" to "Person"
- [ ] Add "Reviewed by" badge on salary/market guide articles
- [ ] Add "Sources" section at bottom of data-heavy articles (link to BLS, Glassdoor, NASSCOM)
- [ ] Collect and display testimonials on homepage and about page
- [ ] Create "How We Research" editorial methodology page

### AEO Content Restructuring
- [ ] Add Quick Answer boxes to all 125 articles (component built, content needed)
- [ ] Add Key Takeaways numbered lists to all articles (component built, content needed)
- [ ] Restructure article headings as questions (e.g., "Core Skills" → "What skills do I need?")
- [ ] Add source citations inline within article content
- [ ] Date-stamp articles visibly (show datePublished + dateModified on page)

### Additional Schemas
- [ ] HowTo schema for "Getting Started" + "Skills Roadmap" articles
- [ ] Speakable schema for FAQ answers + Quick Answer boxes
- [ ] ItemList schema for tools page and career paths section
- [ ] Course/LearningResource schema for skills roadmap articles

---

## 🟡 PENDING — MEDIUM PRIORITY

### New Content Types
- [ ] "Best colleges/courses for [career]" — 7th article type per career (highest-traffic gap for India)
- [ ] City-specific career pages (e.g., /careers/ai-data-science/bangalore)
- [ ] Skills directory pages (/skills/python, /skills/sql — cross-reference careers)
- [ ] Certification guide pages (/certifications/aws, /certifications/cfa)

### Content Quality
- [ ] Add article images to all 125 articles (currently gradient fallbacks)
- [ ] Add internal links within markdown article content (2-3 per article)
- [ ] Blog expansion — target 2+ new blog posts per month
- [ ] Add article-level keywords to frontmatter across all articles

### Social & Referral Traffic
- [ ] Generate dynamic per-article OG images (use Next.js ImageResponse)
- [ ] Verify WhatsApp sharing works (critical for Indian audience)
- [ ] Make quiz/tool results shareable with preview cards
- [ ] Get reciprocal links from AI Think Tank and The Practise Ground
- [ ] Submit tools to Product Hunt and career resource directories
- [ ] Guest post on Indian education sites (Shiksha, CollegeDunia, Leverage Edu)

---

## 🔵 PENDING — LOWER PRIORITY

### Missing Features Users Expect
- [ ] College/exam entrance info (CLAT, NEET, JEE, CAT) in relevant career paths
- [ ] Job board / internship outlinks (Naukri, LinkedIn) from each career path
- [ ] Downloadable resources — career roadmap PDFs, resume templates (lead magnets)
- [ ] Comments or community — Discord/WhatsApp group link
- [ ] Bookmarking system — FAQ mentions it but no implementation exists
- [ ] Hindi content for Indian market expansion
- [ ] Table of contents component for long articles
- [ ] Site-wide search integration in navbar

### Technical Debt
- [ ] Make homepage article count dynamic (import getAllArticleSlugs, display real count)
- [ ] Verify "5,000+ Students Guided" stat or replace with verifiable metric
- [ ] Add hreflang tags if creating localized content
- [ ] Review CareerPaths tabs on homepage for crawler visibility of non-default clusters

---

## 📊 Current Metrics
- **Static pages**: 359
- **Sitemap URLs**: ~550
- **Schema types**: 6 (WebSite, EducationalOrg, Article, Breadcrumb, FAQ, Occupation)
- **Comparison pages**: 190
- **Newsletter**: Buttondown (connected, welcome email active)
- **Articles**: ~125 across 20 career paths + 3 blog posts
- **RSS feeds configured**: 100+ (global + India/Asia)
- **Job APIs integrated**: 5 (Remotive, Jobicy, Himalayas, Adzuna, The Muse)
- **Countries for jobs**: 5 (US, IN, GB, SG, AU)
