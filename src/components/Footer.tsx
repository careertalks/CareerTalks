"use client";

import { useState } from "react";
import Link from "next/link";

const techCareers = [
  { label: "AI & Data Science", href: "/careers/ai-data-science" },
  { label: "Software Development", href: "/careers/software-development" },
  { label: "FinTech", href: "/careers/fintech" },
  { label: "Telecommunications", href: "/careers/telecommunications" },
  { label: "Product Management", href: "/careers/product-management" },
];

const businessCareers = [
  { label: "Business & Startups", href: "/careers/business-entrepreneurship" },
  { label: "Digital Marketing", href: "/careers/digital-marketing" },
  { label: "Retail & Logistics", href: "/careers/retail-logistics" },
  { label: "Real Estate", href: "/careers/real-estate" },
  { label: "Hospitality", href: "/careers/hospitality-management" },
];

const resources = [
  { label: "Blog", href: "/blog" },
  { label: "Career Quiz", href: "/quiz" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-tight">CT</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Career</span>
                <span className="text-violet-400">Talks</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 text-gray-500">
              Comprehensive career guidance for 20+ industries. Interactive guides, skill roadmaps, and expert insights to help you find your path.
            </p>
            <a
              href="mailto:hello@careertalks.space"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              hello@careertalks.space
            </a>
          </div>

          {/* Tech & Data careers */}
          <div>
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Tech & Data
            </h4>
            <ul className="space-y-2.5">
              {techCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business careers */}
          <div>
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Business
            </h4>
            <ul className="space-y-2.5">
              {businessCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 mb-8">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="text-sm text-emerald-400">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 min-w-0 px-3 py-2 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} CareerTalks. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            We empower <span className="text-violet-400 font-medium">YOU</span> to find your career path.
          </p>
        </div>
      </div>
    </footer>
  );
}
