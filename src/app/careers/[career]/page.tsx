import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { careerConfigs, getAllCareerSlugs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import { getArticlesByCategory } from "@/lib/articles";
import CareerHubPage from "@/components/CareerHubPage";
import { BreadcrumbJsonLd, OccupationJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ career: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string }>;
}): Promise<Metadata> {
  const { career } = await params;
  const config = careerConfigs[career as CareerSlug];
  if (!config) return {};

  const cluster = clusterConfigs[config.cluster];

  return {
    title: `${config.title} Career Path`,
    description: config.heroDescription,
    keywords: [
      config.title,
      `${config.title} careers`,
      `${config.title} jobs`,
      `${config.title} salary`,
      cluster.title,
      "career guidance",
      "career path",
    ],
    alternates: {
      canonical: `https://careertalks.space/careers/${career}`,
    },
    openGraph: {
      title: `${config.title} Career Path | CareerTalks`,
      description: config.description,
      type: "website",
    },
  };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const { career } = await params;

  // Validate the career slug
  if (!careerConfigs[career as CareerSlug]) {
    notFound();
  }

  const config = careerConfigs[career as CareerSlug];
  const articles = getArticlesByCategory(career as CareerSlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: config.title, href: `/careers/${career}` },
        ]}
      />
      <OccupationJsonLd
        name={config.title}
        description={config.heroDescription}
        salary={config.stats.avgSalary.replace("$", "").replace(",", "")}
        growthRate={config.stats.growthRate}
        skills={config.stats.topRoles}
      />
      <CareerHubPage career={career as CareerSlug} articleCount={articles.length} />

      {/* ═══════ SERVER-RENDERED ARTICLE INDEX ═══════
           This section is crucial for SEO.  It provides static internal
           links to every article in this career track, giving Google
           real <a> tags to crawl.  The CareerHubPage component above is
           "use client" and loads external content via API — those links
           are invisible to crawlers. */}
      {articles.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <div className="max-w-[900px] mx-auto px-6 py-10">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {config.title} Career Guides
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {articles.length} in-depth articles to help you explore and prepare
              for a career in {config.shortTitle}.
            </p>
            <div className="grid gap-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/careers/${career}/${article.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                >
                  <span className="text-indigo-400 mt-0.5 text-lg shrink-0">
                    📄
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {article.title}
                    </span>
                    {article.description && (
                      <span className="block text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {article.description}
                      </span>
                    )}
                    <span className="block text-[11px] text-gray-400 mt-1">
                      {article.readTime || "5 min read"}
                      {article.date && (
                        <>
                          {" · "}
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </>
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
