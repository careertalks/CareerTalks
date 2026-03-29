import type { Metadata } from "next";
import Link from "next/link";
import NewsletterCTA from "@/components/NewsletterCTA";

import { ecosystem, buildUtmUrl } from "@/lib/ecosystem-config";

export const metadata: Metadata = {
  title: "About CareerTalks",
  description:
    "CareerTalks provides free, comprehensive career guidance for students and young professionals across 20 industries. Learn about our mission and approach.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">&#x1F3AF;</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              Our Mission
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            About CareerTalks
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Real career guidance for real people. No paywalls, no gatekeeping, no fluff.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-lg text-gray-500">
              CareerTalks was born from a simple frustration: the career guidance available to most students and young professionals is either too generic to be useful, locked behind expensive coaching programs, or buried in academic jargon that nobody actually reads.
            </p>

            <p>
              We believe that everyone deserves access to clear, practical career information — whether you&apos;re a 9th-grader wondering what to study, a college student choosing between internships, or a young professional contemplating a career pivot.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-4">
              What We Do
            </h2>

            <p>
              We cover 20 career paths across four clusters — technology, business, science, and creative industries. Each career path comes with:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                { icon: "\u{1F4CA}", title: "Industry Insights", desc: "Real data on salaries, growth rates, and job market trends." },
                { icon: "\u{1F6E4}\uFE0F", title: "Skill Roadmaps", desc: "Step-by-step guides on what to learn and in what order." },
                { icon: "\u{1F4AC}", title: "Real Stories", desc: "Interviews and case studies from people actually working in these fields." },
                { icon: "\u{1F4D6}", title: "Free Guides", desc: "In-depth articles you can read without signing up for anything." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:shadow-indigo-50 transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-4">
              Our Four Career Clusters
            </h2>

            <div className="grid gap-3 my-6">
              {[
                { color: "bg-blue-500", label: "Tech & Data", desc: "AI, Software Dev, FinTech, Telecom, Product Management", count: 5 },
                { color: "bg-amber-500", label: "Business & Commerce", desc: "Business, Real Estate, Retail, Digital Marketing, Hospitality", count: 5 },
                { color: "bg-emerald-500", label: "Science & Health", desc: "BioTech, Clean Tech, Healthcare, Automotive", count: 4 },
                { color: "bg-rose-500", label: "People & Creative", desc: "Law, Fashion, HR, Architecture, Education, Creative Arts", count: 6 },
              ].map((cluster) => (
                <div key={cluster.label} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100">
                  <div className={`w-3 h-3 rounded-full ${cluster.color} flex-shrink-0`} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {cluster.label}
                      <span className="text-xs font-normal text-gray-400 ml-2">{cluster.count} paths</span>
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{cluster.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-4">
              Why Free?
            </h2>

            <p>
              Career guidance shouldn&apos;t be a privilege. In a world where the job market changes faster than ever, access to understanding your options shouldn&apos;t depend on your parents&apos; ability to hire a career coach. All our content is and will remain free, open, and accessible to everyone.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-4">
              Part of a Bigger Mission
            </h2>

            <p>
              CareerTalks is part of an ecosystem of educational platforms. Our sibling projects include{" "}
              <a href={buildUtmUrl(ecosystem.aitt.url, "strip")} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-violet-600 underline underline-offset-2 transition-colors">
                AI Think Tank
              </a>{" "}
              (making AI accessible for everyone) and{" "}
              <a href={buildUtmUrl(ecosystem.tpg.url, "strip")} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-violet-600 underline underline-offset-2 transition-colors">
                The Practise Ground
              </a>{" "}
              (hands-on skill building through quizzes and practice). Together, we&apos;re building a comprehensive platform for learning and growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/#careers"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5 text-sm"
            >
              Explore Career Paths
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors text-sm"
            >
              Read the Blog
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors text-sm"
            >
              FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}
