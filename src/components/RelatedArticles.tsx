import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";
import type { CareerSlug } from "@/lib/career-config";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";

interface RelatedArticlesProps {
  career: CareerSlug;
  currentSlug: string;
}

export default function RelatedArticles({
  career,
  currentSlug,
}: RelatedArticlesProps) {
  const articles = getArticlesByCategory(career);
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  const config = careerConfigs[career];
  const cluster = clusterConfigs[config.cluster];

  return (
    <section className="py-10 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          More in {config.shortTitle}
        </h2>
        <div className="grid gap-3">
          {related.map((article) => (
            <Link
              key={article.slug}
              href={`/careers/${career}/${article.slug}`}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-gray-50/50 transition-colors group"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${cluster.badgeClass}`}
              >
                {article.type === "guide" ? "G" : "A"}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {article.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href={`/careers/${career}`}
            className="text-sm font-semibold text-indigo-600 hover:text-violet-600 transition-colors"
          >
            View all {config.shortTitle} articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
