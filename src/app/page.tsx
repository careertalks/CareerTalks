import Link from "next/link";
import { clusterConfigs, getCareersByCluster, type Cluster } from "@/lib/career-config";
import { getLatestArticles } from "@/lib/articles";
import CareerPathCard from "@/components/CareerPathCard";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import CrossPromoStrip from "@/components/CrossPromoStrip";

const clusterOrder: Cluster[] = ["tech", "business", "science", "creative"];

export default function Home() {
  const latestArticles = getLatestArticles(6);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        {/* Background decorative elements */}
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-8">
            <span className="text-sm">&#x1F3AF;</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              20 Career Paths &middot; 100% Free &middot; No Signups Required
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Shape Your{" "}
            <span className="gradient-text">Tomorrow,</span>
            <br className="hidden sm:block" />
            Today
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Real career guidance for students and young professionals.
            Explore 20 industries, build skills, and find your path &mdash; all free, no walls.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href="#careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 transition-all hover:-translate-y-0.5"
            >
              Explore Career Paths
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-400/30 text-white font-bold rounded-xl hover:bg-white/5 hover:border-indigo-400/50 transition-all"
            >
              Take the Career Quiz
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { number: "20", label: "Career Paths" },
              { number: "100+", label: "Articles & Guides" },
              { number: "5,000+", label: "Students Guided" },
              { number: "100%", label: "Free Resources" },
            ].map((stat) => (
              <div key={stat.label} className="glass-dark rounded-xl px-4 py-3">
                <div className="text-2xl font-extrabold text-white font-mono">
                  {stat.number}
                </div>
                <div className="text-xs text-indigo-300 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 74.7C120 69 240 59 360 53.3C480 48 600 48 720 53.3C840 59 960 69 1080 69.3C1200 69 1320 59 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== CAREER PATHS GRID ===== */}
      <section id="careers" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Choose Your Career Path
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Explore 20 industries organized into four clusters. Each path comes with guides, insights, and resources.
            </p>
          </div>

          {clusterOrder.map((clusterId) => {
            const cluster = clusterConfigs[clusterId];
            const careers = getCareersByCluster(clusterId);

            return (
              <div key={clusterId} className="mb-10">
                {/* Cluster header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className={`w-2.5 h-2.5 rounded-full ${cluster.dotClass}`} />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    {cluster.title}
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full">
                    {careers.length} paths
                  </span>
                </div>

                {/* Career cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {careers.map((career) => (
                    <CareerPathCard
                      key={career.slug}
                      career={career}
                      cluster={cluster}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              How CareerTalks Works
            </h2>
            <p className="text-gray-500">
              No signups, no paywalls. Just clear career guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Explore",
                description: "Browse 20 career paths across tech, business, science, and creative industries. Every guide is free.",
              },
              {
                step: "2",
                title: "Learn",
                description: "Read in-depth articles, salary guides, skill roadmaps, and real industry stories from professionals.",
              },
              {
                step: "3",
                title: "Act",
                description: "Build a personalized career plan. Save articles, track interests, and get weekly insights in your inbox.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      {latestArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900">Latest Articles</h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-indigo-600 hover:text-violet-600 transition-colors"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <NewsletterCTA />
        </div>
      </section>

      {/* ===== FAQ PREVIEW ===== */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              "What if I\u2019m completely confused about my future career?",
              "Is everything really free? What\u2019s the catch?",
              "How do I choose between 20 different career paths?",
            ].map((question) => (
              <div
                key={question}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900 text-sm">{question}</span>
                <span className="text-gray-400 text-lg">+</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/faq"
              className="text-sm font-semibold text-indigo-600 hover:text-violet-600 transition-colors"
            >
              View all FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CROSS PROMO ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <CrossPromoStrip index={0} />
      </div>
    </>
  );
}
