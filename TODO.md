# CareerTalks — Task Tracker & Roadmap

_Last updated: March 30, 2026_

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

---

## 🔴 PENDING — HIGH PRIORITY

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
