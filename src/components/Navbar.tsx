"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Careers", href: "/#careers" },
  { label: "Tools & Games", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const exploreTools = [
  { icon: "🎯", name: "Career Assessment", href: "/assessment", description: "Personality + career match" },
  { icon: "🧭", name: "Career Quiz", href: "/quiz", description: "Find your career match" },
  { icon: "✨", name: "Zodiac Match", href: "/zodiac", description: "Your cosmic career" },
  { icon: "🎰", name: "Career Roulette", href: "/roulette", description: "Spin your destiny" },
  { icon: "💪", name: "Skill Match", href: "/skill-match", description: "Rate your skills" },
  { icon: "📚", name: "Career Pathways", href: "/duels", description: "Stream → career map" },
  { icon: "🧭", name: "Navigator", href: "/career-navigator", description: "Choose your path" },
  { icon: "🔍", name: "Explorer", href: "/career-explorer", description: "Filter & compare" },
  { icon: "🎮", name: "Day in the Life", href: "/day-in-life", description: "Experience a career day" },
  { icon: "👯", name: "Compatibility", href: "/compatibility", description: "Compare with a friend" },
  { icon: "💰", name: "Salary Calculator", href: "/salary-calculator", description: "10-year projections" },
  { icon: "🏆", name: "Badges", href: "/badges", description: "Your achievements" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-indigo-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm tracking-tight">CT</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-slate-900">Career</span>
              <span className="text-violet-600">Talks</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Explore Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/60 transition-colors flex items-center gap-1"
              >
                Explore
                <svg className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {exploreOpen && (
                <div
                  onMouseEnter={() => setExploreOpen(true)}
                  onMouseLeave={() => setExploreOpen(false)}
                  className="absolute left-0 mt-0 w-[480px] bg-white rounded-lg shadow-xl border border-indigo-100/50 py-4 px-4 z-50"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {exploreTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="group p-3 rounded-lg hover:bg-indigo-50/80 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-xl flex-shrink-0">{tool.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {tool.name}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#careers"
              className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-indigo-100/50 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Explore Section */}
            <div className="px-3 py-2.5">
              <button
                onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                className="w-full text-left text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center justify-between"
              >
                Explore
                <svg
                  className={`w-4 h-4 transition-transform ${mobileExploreOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Mobile Explore Items */}
              {mobileExploreOpen && (
                <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-indigo-200">
                  {exploreTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileExploreOpen(false);
                      }}
                      className="block p-2 rounded-lg hover:bg-indigo-50/60 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg flex-shrink-0">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#careers"
              onClick={() => setMobileOpen(false)}
              className="block mx-3 mt-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-center shadow-sm"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
