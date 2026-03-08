import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import NewsletterCTA from "@/components/NewsletterCTA";
import ShareButton from "@/components/ShareButton";
import CrossPromoStrip from "@/components/CrossPromoStrip";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const params: { career: string; slug: string }[] = [];

  for (const careerSlug of Object.keys(careerConfigs)) {
    const articles = getArticlesByCategory(careerSlug as CareerSlug);
    for (const article of articles) {
      params.push({ career: careerSlug, slug: article.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string; slug: string }>;
}): Promise<Metadata> {
  const { career, slug } = await params;
  const article = await getArticleBySlug(career as CareerSlug, slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `https://www.careertalks.space/careers/${career}/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ career: string; slug: string }>;
}) {
  const { career, slug } = await params;
  const careerConfig = careerConfigs[career as CareerSlug];

  if (!careerConfig) notFound();

  const article = await getArticleBySlug(career as CareerSlug, slug);
  if (!article) notFound();

  const cluster = clusterConfigs[careerConfig.cluster];
  const articleUrl = `https://www.careertalks.space/careers/${career}/${slug}`;

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        url={articleUrl}
        datePublished={article.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: careerConfig.title, href: `/careers/${career}` },
          { name: article.title, href: `/careers/${career}/${slug}` },
        ]}
      />

      {/* Breadcrumb bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link
              href={`/careers/${career}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {careerConfig.shortTitle}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <article>
        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cluster.badgeClass}`}>
              {careerConfig.shortTitle}
            </span>
            <span className="text-xs text-gray-400">{article.readTime}</span>
            <span className="text-xs text-gray-400">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            {article.description}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <ShareButton
            title={article.title}
            description={article.description}
            url={articleUrl}
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <div
            className="article-content text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </article>

      {/* Cross-promo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <CrossPromoStrip index={1} />
      </div>

      {/* Newsletter CTA */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterCTA careerSlug={career as CareerSlug} />
        </div>
      </section>
    </>
  );
}
