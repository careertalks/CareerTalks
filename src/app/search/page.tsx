"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";

const allCareers = Object.values(careerConfigs);

// Tool data for search
const tools = [
  { name: "Career Assessment", description: "18-question personality-based career matching", href: "/assessment", icon: "🎯", time: "~5 min" },
  { name: "Career Quiz", description: "7 quick questions to find your career cluster", href: "/quiz", icon: "❓", time: "~3 min" },
  { name: "Zodiac Career Match", description: "Fun career matching based on your zodiac sign", href: "/zodiac", icon: "♈", time: "~2 min" },
  { name: "Career Roulette", description: "Spin the wheel to discover a random career", href: "/roulette", icon: "🎰", time: "~1 min" },
  { name: "Skill Match", description: "Rate your skills and find matching careers", href: "/skill-match", icon: "🧩", time: "~3 min" },
  { name: "Career Pathways", description: "10-year career progressions by high school stream", href: "/duels", icon: "🛤️", time: "~5 min" },
  { name: "Career Navigator", description: "Choose-your-own-adventure career tool", href: "/career-navigator", icon: "🧭", time: "~5 min" },
  { name: "Career Explorer", description: "Filter and compare 20+ careers side by side", href: "/career-explorer", icon: "🔍", time: "~5 min" },
  { name: "Day in the Life", description: "Interactive work day simulator for 6 careers", href: "/day-in-life", icon: "🎮", time: "~5 min" },
  { name: "Career Compatibility", description: "2-player career compatibility test", href: "/compatibility", icon: "👯", time: "~3 min" },
  { name: "Salary Calculator", description: "10-year salary projection across 20 careers", href: "/salary-calculator", icon: "💰", time: "~3 min" },
];

interface SearchResult {
  type: "career" | "tool";
  title: string;
  description: string;
  href: string;
  icon: string;
  extra?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.length < 2) return [];

    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    // Search careers
    for (const career of allCareers) {
      const cluster = clusterConfigs[career.cluster];
      const searchText = `${career.title} ${career.description} ${career.heroDescription} ${career.stats.topRoles.join(" ")} ${cluster.title}`.toLowerCase();
      if (searchText.includes(q)) {
        matches.push({
          type: "career",
          title: career.title,
          description: career.description,
          href: `/careers/${career.slug}`,
          icon: career.icon,
          extra: `${career.stats.avgSalary} avg · ${career.stats.growthRate} growth`,
        });
      }
    }

    // Search tools
    for (const tool of tools) {
      const searchText = `${tool.name} ${tool.description}`.toLowerCase();
      if (searchText.includes(q)) {
        matches.push({
          type: "tool",
          title: tool.name,
          description: tool.description,
          href: tool.href,
          icon: tool.icon,
          extra: tool.time,
        });
      }
    }

    return matches;
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Search CareerTalks
      </h1>
      <p className="text-gray-500 mb-8">
        Find career paths, tools, salary guides, and more.
      </p>

      {/* Search input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers, tools, skills..."
          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-lg"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        )}
      </div>

      {/* Results */}
      {query.length >= 2 && (
        <div>
          <p className="text-sm text-gray-400 mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No results found. Try a different search term.
              </p>
              <Link
                href="/tools"
                className="text-sm font-semibold text-indigo-600 hover:text-violet-600"
              >
                Browse all tools &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <Link
                  key={result.href}
                  href={result.href}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-gray-50/50 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {result.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {result.title}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          result.type === "career"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {result.type === "career" ? "Career Path" : "Tool"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {result.description}
                    </p>
                    {result.extra && (
                      <p className="text-xs text-gray-400 mt-1">
                        {result.extra}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Browse when no query */}
      {query.length < 2 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {(["tech", "business", "science", "creative"] as const).map(
              (clusterId) => {
                const cluster = clusterConfigs[clusterId];
                const careers = allCareers.filter(
                  (c) => c.cluster === clusterId
                );
                return (
                  <div
                    key={clusterId}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      {cluster.title}
                    </h3>
                    <div className="space-y-1">
                      {careers.map((career) => (
                        <Link
                          key={career.slug}
                          href={`/careers/${career.slug}`}
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-600 transition-colors py-0.5"
                        >
                          <span>{career.icon}</span>
                          <span>{career.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
