import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";

interface ArticleCardProps {
  article: ArticleMeta;
}

const typeLabels: Record<ArticleMeta["type"], string> = {
  article: "Article",
  guide: "Guide",
  interview: "Interview",
  resource: "Resource",
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const isBlog = article.category === "blog";
  const href = isBlog
    ? `/blog/${article.slug}`
    : `/careers/${article.category}/${article.slug}`;

  // Determine gradient colors based on career cluster or default to indigo
  let gradientFrom = "from-indigo-500";
  let gradientTo = "to-violet-500";
  let badgeClass = "bg-indigo-100 text-indigo-700";

  if (!isBlog) {
    const career = careerConfigs[article.category as CareerSlug];
    if (career) {
      const cluster = clusterConfigs[career.cluster];
      gradientFrom = cluster.gradientFrom;
      gradientTo = cluster.gradientTo;
      badgeClass = cluster.badgeClass;
    }
  }

  return (
    <Link href={href} className="card-hover group block rounded-xl overflow-hidden bg-white border border-gray-100">
      {/* Gradient thumbnail area */}
      <div className={`relative h-40 bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-end p-4`}>
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
            {typeLabels[article.type]}
          </span>
        </div>
        {/* Read time */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {article.readTime}
          </span>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute bottom-4 right-12 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {article.description}
        </p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{article.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Read more */}
        <span className="inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">
          Read more
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
