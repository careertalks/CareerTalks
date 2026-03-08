import Link from "next/link";
import type { CareerSlug } from "@/lib/career-config";
import { careerConfigs, clusterConfigs, getClusterForCareer, getCareersByCluster } from "@/lib/career-config";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import NewsletterCTA from "./NewsletterCTA";
import CrossPromoStrip from "./CrossPromoStrip";

export default function CareerHubPage({ career: careerSlug }: { career: CareerSlug }) {
  const career = careerConfigs[careerSlug];
  const cluster = getClusterForCareer(careerSlug);
  const articles = getArticlesByCategory(careerSlug);
  const featuredArticles = articles.filter((a) => a.featured);
  const relatedCareers = getCareersByCluster(career.cluster)
    .filter((c) => c.slug !== careerSlug)
    .slice(0, 3);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        {/* Background elements */}
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: cluster.accent }}
        />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-indigo-300/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#careers" className="hover:text-white transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-white">{career.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left - Title & Description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{career.icon}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${cluster.badgeClass}`}
                >
                  {clusterConfigs[career.cluster].title}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                {career.title}
              </h1>

              <p className="text-lg text-indigo-200 leading-relaxed max-w-2xl">
                {career.heroDescription}
              </p>
            </div>

            {/* Right - Stats Card */}
            <div className="glass-dark rounded-2xl p-6 min-w-[280px] w-full lg:w-auto">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-4">
                Career Snapshot
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-indigo-400 mb-1">Avg. Salary</div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {career.stats.avgSalary}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-indigo-400 mb-1">Growth Rate</div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {career.stats.growthRate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-indigo-400 mb-3">Top Roles</div>
                  <div className="flex flex-wrap gap-2">
                    {career.stats.topRoles.map((role) => (
                      <span
                        key={role}
                        className="text-xs font-medium text-white/80 bg-white/10 px-2.5 py-1 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== FEATURED ARTICLES ===== */}
      {featuredArticles.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                Start Here
              </h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cluster.badgeClass} uppercase tracking-wide`}>
                Featured
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-promo between sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <CrossPromoStrip index={0} />
      </div>

      {/* ===== ALL ARTICLES ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {articles.length > 0 ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                All Articles & Guides
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({articles.length} {articles.length === 1 ? "article" : "articles"})
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">{career.icon}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Content coming soon!
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We&apos;re crafting amazing {career.title.toLowerCase()} guides and articles.
                Subscribe below to get notified when they&apos;re ready.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== RELATED CAREERS ===== */}
      {relatedCareers.length > 0 && (
        <section className="py-12 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Related Career Paths
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCareers.map((related) => {
                const relCluster = clusterConfigs[related.cluster];
                return (
                  <Link
                    key={related.slug}
                    href={`/careers/${related.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: relCluster.accentBg }}
                    >
                      {related.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {related.shortTitle}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {related.stats.avgSalary} avg &middot; {related.stats.growthRate} growth
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-colors ml-auto flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cross-promo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <CrossPromoStrip index={1} />
      </div>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterCTA careerSlug={careerSlug} />
        </div>
      </section>
    </>
  );
}
