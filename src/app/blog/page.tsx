import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import CrossPromoStrip from "@/components/CrossPromoStrip";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Career insights, industry trends, and practical advice for students and young professionals. Read our latest articles on future-proofing your career.",
  keywords: [
    "career blog",
    "career advice",
    "future careers",
    "Gen Z career tips",
    "career planning articles",
  ],
};

export default function BlogPage() {
  const articles = getArticlesByCategory("blog");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">&#x270D;&#xFE0F;</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              Insights & Perspectives
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            The CareerTalks Blog
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Career trends, industry deep dives, and practical advice to help you navigate your professional journey.
          </p>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {articles.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  All Articles
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    ({articles.length})
                  </span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">&#x1F4DD;</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Articles coming soon!
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We&apos;re working on insightful career articles. Subscribe below to be the first to read them.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                &larr; Back to Career Paths
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Cross-promo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <CrossPromoStrip index={0} />
      </div>

      {/* Newsletter */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}
