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

## Important Conventions
- All URLs must use `careertalks.space` (NOT www.careertalks.space)
- Career slugs must match content directory names exactly
- Tool pages are `"use client"` — metadata goes in sibling `layout.tsx` files
- Sitemap is dynamic in `src/app/sitemap.ts` — includes all pages, tools, comparisons
- OG image is edge-rendered at `src/app/opengraph-image.tsx`

## Ecosystem
- **AI Think Tank**: aithinktank.space (sister site)
- **The Practise Ground**: thepractiseground.in (sister site)
- Cross-promo via `FloatingPromoBar` (sticky bottom bar, kept) — `CrossPromoStrip` was removed

## Task Tracker
See `TODO.md` in project root for pending tasks and roadmap items.
