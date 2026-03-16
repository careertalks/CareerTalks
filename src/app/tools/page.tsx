"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Tool {
  id: number;
  emoji: string;
  name: string;
  tagline: string;
  timeEstimate: string;
  href: string;
  featured?: boolean;
  category: "assessment" | "game" | "calculator" | "explorer";
}

const tools: Tool[] = [
  {
    id: 1,
    emoji: "🎯",
    name: "Career Assessment",
    tagline: "Discover careers that match your personality & interests",
    timeEstimate: "~5 min",
    href: "/assessment",
    featured: true,
    category: "assessment",
  },
  {
    id: 2,
    emoji: "⭐",
    name: "Zodiac Career Match",
    tagline: "What does your zodiac sign say about your career?",
    timeEstimate: "~2 min",
    href: "/zodiac",
    category: "game",
  },
  {
    id: 3,
    emoji: "🧩",
    name: "Career Quiz",
    tagline: "Answer 7 fun questions to find your career cluster",
    timeEstimate: "~3 min",
    href: "/quiz",
    category: "assessment",
  },
  {
    id: 4,
    emoji: "🎡",
    name: "Career Roulette",
    tagline: "Spin the wheel and discover a surprise career!",
    timeEstimate: "~1 min",
    href: "/roulette",
    category: "game",
  },
  {
    id: 5,
    emoji: "📊",
    name: "Skill Match",
    tagline: "Rate your skills and find careers that fit",
    timeEstimate: "~3 min",
    href: "/skill-match",
    category: "assessment",
  },
  {
    id: 6,
    emoji: "📚",
    name: "Career Pathways",
    tagline: "Map your high school stream to a 10-year career journey",
    timeEstimate: "~5 min",
    href: "/duels",
    category: "explorer",
  },
  {
    id: 7,
    emoji: "🧭",
    name: "Career Navigator",
    tagline: "Choose your own adventure through career decisions",
    timeEstimate: "~5 min",
    href: "/career-navigator",
    category: "explorer",
  },
  {
    id: 8,
    emoji: "🔍",
    name: "Career Explorer",
    tagline: "Filter, compare, and research 20+ careers",
    timeEstimate: "~5 min",
    href: "/career-explorer",
    category: "explorer",
  },
  {
    id: 9,
    emoji: "🎮",
    name: "Day in the Life",
    tagline: "Experience a typical day in different careers",
    timeEstimate: "~5 min",
    href: "/day-in-life",
    category: "game",
  },
  {
    id: 10,
    emoji: "👯",
    name: "Career Compatibility",
    tagline: "Compare career interests with a friend!",
    timeEstimate: "~3 min",
    href: "/compatibility",
    category: "game",
  },
  {
    id: 11,
    emoji: "💰",
    name: "Salary Calculator",
    tagline: "Project your career earnings over 10 years",
    timeEstimate: "~3 min",
    href: "/salary-calculator",
    category: "calculator",
  },
];

const categories = [
  { id: "all" as const, label: "All Tools", count: tools.length },
  { id: "assessment" as const, label: "Assessments", count: tools.filter((t) => t.category === "assessment").length },
  { id: "game" as const, label: "Games", count: tools.filter((t) => t.category === "game").length },
  { id: "explorer" as const, label: "Explorers", count: tools.filter((t) => t.category === "explorer").length },
  { id: "calculator" as const, label: "Calculators", count: tools.filter((t) => t.category === "calculator").length },
];

const clusterAccents = [
  "from-indigo-500/20 to-indigo-600/10",
  "from-violet-500/20 to-violet-600/10",
  "from-blue-500/20 to-blue-600/10",
  "from-cyan-500/20 to-cyan-600/10",
  "from-indigo-500/20 to-violet-600/10",
  "from-violet-500/20 to-indigo-600/10",
  "from-blue-500/20 to-cyan-600/10",
  "from-cyan-500/20 to-blue-600/10",
  "from-indigo-500/20 to-cyan-600/10",
  "from-violet-500/20 to-blue-600/10",
  "from-blue-500/20 to-indigo-600/10",
];

type FilterCategory = "all" | "assessment" | "game" | "calculator" | "explorer";

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredTools =
    activeFilter === "all" ? tools : tools.filter((t) => t.category === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">🎮</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              11 Interactive Tools &middot; 100% Free
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Tools &{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Games
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Play, explore, and share. Discover your ideal career through
            interactive assessments, simulations, and calculators.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 sm:gap-12">
            {[
              { num: "11", label: "Tools" },
              { num: "20", label: "Careers Covered" },
              { num: "~35 min", label: "Total Play Time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{s.num}</div>
                <div className="text-xs text-indigo-300 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 80L60 74.7C120 69 240 59 360 53.3C480 48 600 48 720 53.3C840 59 960 69 1080 69.3C1200 69 1320 59 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40 backdrop-blur-lg bg-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
                <span
                  className={`ml-1.5 text-xs ${
                    activeFilter === cat.id ? "text-indigo-200" : "text-gray-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map((tool) => {
              const originalIndex = tools.findIndex((t) => t.id === tool.id);
              return (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  accentGradient={clusterAccents[originalIndex]}
                />
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No tools in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gradient-to-b from-white to-indigo-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg text-gray-600 mb-2">
            🏆 Complete all tools to unlock{" "}
            <span className="font-bold text-gray-900">Achievement Badges</span>
          </p>
          <Link
            href="/badges"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            View Your Badges →
          </Link>
        </div>
      </section>
    </>
  );
}

interface ToolCardProps {
  tool: Tool;
  accentGradient: string;
}

function ToolCard({ tool, accentGradient }: ToolCardProps) {
  const categoryColors: Record<string, string> = {
    assessment: "bg-violet-100 text-violet-700",
    game: "bg-blue-100 text-blue-700",
    explorer: "bg-emerald-100 text-emerald-700",
    calculator: "bg-amber-100 text-amber-700",
  };

  const categoryLabels: Record<string, string> = {
    assessment: "Assessment",
    game: "Game",
    explorer: "Explorer",
    calculator: "Calculator",
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Featured badge */}
      {tool.featured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Featured
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Top row: emoji + category */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {tool.emoji}
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[tool.category]}`}>
            {categoryLabels[tool.category]}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
          {tool.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
          {tool.tagline}
        </p>

        {/* Bottom row: time + play button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{tool.timeEstimate}</span>
          <Link
            href={tool.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:shadow-indigo-500/20"
          >
            Play Now
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
