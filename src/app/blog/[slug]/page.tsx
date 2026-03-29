import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import NewsletterCTA from "@/components/NewsletterCTA";
import ShareButton from "@/components/ShareButton";
import CrossPromoStrip from "@/components/CrossPromoStrip";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const articles = getArticlesByCategory("blog");
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug("blog", slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: `https://careertalks.space/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: `https://careertalks.space/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug("blog", slug);

  if (!article) notFound();

  const articleUrl = `https://careertalks.space/blog/${slug}`;

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
          { name: "Blog", href: "/blog" },
          { name: article.title, href: `/blog/${slug}` },
        ]}
      />

      {/* Breadcrumb bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <article>
        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
              Blog
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
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}
