"use client";

import { useState } from "react";
import Link from "next/link";
import NewsletterCTA from "@/components/NewsletterCTA";

import { FAQPageJsonLd } from "@/components/JsonLd";

const faqs = [
  {
    question: "What if I'm completely confused about my future career?",
    answer:
      "That's completely normal and honestly the best place to start! Most people don't have their career figured out in school or even in their first job. CareerTalks helps you explore 20 different career paths across tech, business, science, and creative industries. Start by browsing the career clusters, read a few articles that interest you, and you'll naturally start narrowing down your options. There's no pressure to decide everything today.",
  },
  {
    question: "Is everything really free? What's the catch?",
    answer:
      "Yes, 100% free. No hidden costs, no premium tiers, no content behind paywalls. We believe career guidance is a right, not a privilege. We may ask for your email so we can send you weekly insights, but that's completely optional and never required to access any content. You can read every article, take the career quiz, and explore all 20 career paths without signing up for anything.",
  },
  {
    question: "How do I choose between 20 different career paths?",
    answer:
      "You don't have to choose just one! Start by looking at our four career clusters (Tech & Data, Business & Commerce, Science & Health, People & Creative) and see which cluster resonates with you. Within each cluster, read the overview pages to understand what each career path involves. You can also take our Career Quiz for personalized suggestions. Remember, many skills transfer between careers, so exploring broadly is actually a good strategy.",
  },
  {
    question: "Who is CareerTalks for?",
    answer:
      "CareerTalks is designed for students (from grade 9 onwards) and early-career professionals (0-5 years of experience). Whether you're choosing subjects in school, picking a college major, looking for your first internship, or considering a career change early in your professional life, our content is written for you. Parents and educators also find our resources valuable for guiding young people.",
  },
  {
    question: "How often is new content published?",
    answer:
      "We publish new articles and guides regularly across all 20 career paths. Subscribe to our newsletter to get the latest content delivered to your inbox. We also update existing articles when industry trends, salary data, or job market conditions change significantly.",
  },
  {
    question: "Can I save or bookmark articles to read later?",
    answer:
      "Yes! You can create a free profile with just your email address to save bookmarks across visits. No passwords required. Your saved articles will be available whenever you return to CareerTalks.",
  },
  {
    question: "How accurate are the salary and growth rate figures?",
    answer:
      "Our salary and growth rate data is sourced from industry reports, government labor statistics, and verified job market platforms. We update these figures regularly. Keep in mind that salaries vary significantly by location, experience level, company size, and specialization. The figures we show represent general averages for the field.",
  },
  {
    question: "What makes CareerTalks different from other career guidance sites?",
    answer:
      "Three things set us apart: First, everything is genuinely free with no content gating or email walls. Second, we focus specifically on students and early-career professionals rather than trying to serve everyone. Third, we provide practical, actionable guidance — not just generic career descriptions, but actual skill roadmaps, industry insights, and real stories from people working in these fields.",
  },
  {
    question: "Is CareerTalks connected to other educational platforms?",
    answer:
      "Yes! CareerTalks is part of an educational ecosystem alongside AI Think Tank (www.aithinktank.space) which makes AI accessible for everyone, and The Practise Ground (www.thepractiseground.in) which offers hands-on skill building through quizzes and practice exercises. Together, these platforms provide a comprehensive learning experience.",
  },
  {
    question: "How can I suggest a career path or topic to cover?",
    answer:
      "We'd love to hear from you! You can reach out to us through our newsletter or social media channels. We're always looking to expand our coverage and improve our content based on what readers actually want to learn about.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
          {question}
        </span>
        <span
          className={`text-indigo-500 text-xl font-light flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">&#x2753;</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              Got Questions?
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about CareerTalks and how to make the most of it.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-4">
              Still have questions? We&apos;d love to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#careers"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                Explore Career Paths
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors text-sm"
              >
                Learn About Us
              </Link>
            </div>
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
