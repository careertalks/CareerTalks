import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  careerConfigs,
  clusterConfigs,
  getAllCareerSlugs,
} from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

function parseCompareSlug(slug: string): [CareerSlug, CareerSlug] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;

  const slugA = parts[0] as CareerSlug;
  const slugB = parts[1] as CareerSlug;

  if (!careerConfigs[slugA] || !careerConfigs[slugB]) return null;
  if (slugA === slugB) return null;

  return [slugA, slugB];
}

export async function generateStaticParams() {
  const slugs = getAllCareerSlugs();
  const params: { slug: string }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      params.push({ slug: `${slugs[i]}-vs-${slugs[j]}` });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = parseCompareSlug(slug);
  if (!pair) return {};

  const [a, b] = pair;
  const configA = careerConfigs[a];
  const configB = careerConfigs[b];

  return {
    title: `${configA.shortTitle} vs ${configB.shortTitle} — Career Comparison`,
    description: `Compare ${configA.title} and ${configB.title} careers side by side. See salary differences, growth rates, top roles, and which career path fits you better.`,
    keywords: [
      `${configA.title} vs ${configB.title}`,
      `${configA.shortTitle} vs ${configB.shortTitle}`,
      "career comparison",
      `${configA.title} salary`,
      `${configB.title} salary`,
    ],
    // Keep comparison pages out of Google index until we add unique
    // analysis content.  They're thin template pages right now.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://careertalks.space/compare/${slug}`,
    },
  };
}

function StatCard({
  label,
  valueA,
  valueB,
}: {
  label: string;
  valueA: string;
  valueB: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-4 border-b border-gray-100 last:border-0">
      <div className="text-right">
        <span className="text-sm font-bold text-gray-900">{valueA}</span>
      </div>
      <div className="text-center">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-left">
        <span className="text-sm font-bold text-gray-900">{valueB}</span>
      </div>
    </div>
  );
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = parseCompareSlug(slug);
  if (!pair) notFound();

  const [slugA, slugB] = pair;
  const a = careerConfigs[slugA];
  const b = careerConfigs[slugB];
  const clusterA = clusterConfigs[a.cluster];
  const clusterB = clusterConfigs[b.cluster];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Compare", href: `/compare/${slug}` },
        ]}
      />

      {/* Header */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-18 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">&#x2696;&#xFE0F;</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              Career Comparison
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            <span>{a.shortTitle}</span>
            <span className="text-indigo-300 mx-3">vs</span>
            <span>{b.shortTitle}</span>
          </h1>
          <p className="text-base text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Side-by-side comparison of {a.title} and {b.title} career paths —
            salaries, growth, roles, and which might be right for you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Career headers */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <span className="text-3xl block mb-2">{a.icon}</span>
            <Link
              href={`/careers/${slugA}`}
              className="text-sm font-bold text-indigo-600 hover:text-violet-600"
            >
              {a.shortTitle}
            </Link>
            <span
              className={`block text-[10px] font-semibold mt-1 ${clusterA.badgeClass} inline-block px-2 py-0.5 rounded-full`}
            >
              {clusterA.title}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-300 font-bold text-lg">VS</span>
          </div>
          <div className="text-center">
            <span className="text-3xl block mb-2">{b.icon}</span>
            <Link
              href={`/careers/${slugB}`}
              className="text-sm font-bold text-indigo-600 hover:text-violet-600"
            >
              {b.shortTitle}
            </Link>
            <span
              className={`block text-[10px] font-semibold mt-1 ${clusterB.badgeClass} inline-block px-2 py-0.5 rounded-full`}
            >
              {clusterB.title}
            </span>
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Key Metrics
          </h2>
          <StatCard
            label="Avg Salary"
            valueA={a.stats.avgSalary}
            valueB={b.stats.avgSalary}
          />
          <StatCard
            label="Growth Rate"
            valueA={a.stats.growthRate}
            valueB={b.stats.growthRate}
          />
          <StatCard
            label="Top Role"
            valueA={a.stats.topRoles[0]}
            valueB={b.stats.topRoles[0]}
          />
        </div>

        {/* All Roles */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {a.shortTitle} — Top Roles
            </h3>
            <ul className="space-y-2">
              {a.stats.topRoles.map((role) => (
                <li
                  key={role}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${clusterA.dotClass}`} />
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {b.shortTitle} — Top Roles
            </h3>
            <ul className="space-y-2">
              {b.stats.topRoles.map((role) => (
                <li
                  key={role}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${clusterB.dotClass}`} />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              About {a.shortTitle}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {a.heroDescription}
            </p>
            <Link
              href={`/careers/${slugA}`}
              className="inline-block mt-3 text-sm font-semibold text-indigo-600 hover:text-violet-600"
            >
              Explore {a.shortTitle} &rarr;
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              About {b.shortTitle}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {b.heroDescription}
            </p>
            <Link
              href={`/careers/${slugB}`}
              className="inline-block mt-3 text-sm font-semibold text-indigo-600 hover:text-violet-600"
            >
              Explore {b.shortTitle} &rarr;
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            Not sure which is right for you?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
            >
              Take the Career Assessment
            </Link>
            <Link
              href="/career-explorer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 transition-colors text-sm"
            >
              Compare All Careers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
