"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  howToUnlock: string;
  tool: string;
  toolUrl: string;
}

const badges: Badge[] = [
  {
    id: "quiz-master",
    name: "Quiz Master",
    icon: "🧭",
    description: "Completed the Career Quiz",
    howToUnlock: "Complete the Career Quiz",
    tool: "Career Quiz",
    toolUrl: "/quiz",
  },
  {
    id: "zodiac-explorer",
    name: "Zodiac Explorer",
    icon: "✨",
    description: "Discovered your cosmic career match",
    howToUnlock: "Select your zodiac sign",
    tool: "Zodiac Match",
    toolUrl: "/zodiac",
  },
  {
    id: "roulette-lucky",
    name: "Lucky Spinner",
    icon: "🎰",
    description: "Spun the Career Roulette",
    howToUnlock: "Spin the Career Roulette wheel",
    tool: "Career Roulette",
    toolUrl: "/roulette",
  },
  {
    id: "skill-seeker",
    name: "Skill Seeker",
    icon: "💪",
    description: "Completed the Skill Match assessment",
    howToUnlock: "Rate all 8 skills and see results",
    tool: "Skill Match",
    toolUrl: "/skill-match",
  },
  {
    id: "duel-champion",
    name: "Duel Champion",
    icon: "⚔️",
    description: "Crowned a career champion",
    howToUnlock: "Complete a full Career Duels tournament",
    tool: "Career Duels",
    toolUrl: "/duels",
  },
  {
    id: "navigator",
    name: "Pathfinder",
    icon: "🗺️",
    description: "Navigated your career path",
    howToUnlock: "Complete the Career Navigator adventure",
    tool: "Career Navigator",
    toolUrl: "/career-navigator",
  },
  {
    id: "explorer",
    name: "Career Scholar",
    icon: "🔍",
    description: "Explored and compared careers",
    howToUnlock: "Compare 2+ careers in Career Explorer",
    tool: "Career Explorer",
    toolUrl: "/career-explorer",
  },
];

export default function BadgesPage() {
  const [unlockedBadges, setUnlockedBadges] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("careertalks-badges");
    if (stored) {
      setUnlockedBadges(new Set(JSON.parse(stored)));
    }
    setIsLoading(false);
  }, []);

  const unlockedCount = unlockedBadges.size;
  const totalCount = badges.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white/60">Loading badges...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Hero Section */}
      <section className="hero-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/50 border border-purple-500/30 mb-6">
            <span className="text-2xl">🏆</span>
            <span className="text-purple-300 text-sm font-medium">Achievement Badges</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Your Career Badges</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unlock badges as you explore different career tools and discover what's right for you
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">
              Progress: <span className="text-purple-400">{unlockedCount}</span> of{" "}
              <span className="text-purple-400">{totalCount}</span> badges unlocked
            </h2>
            <span className="text-sm text-slate-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Badges Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const isUnlocked = unlockedBadges.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`relative group transition-all duration-500 ${
                  isUnlocked ? "animate-fade-in" : "animate-fade-in"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 h-full flex flex-col ${
                    isUnlocked
                      ? "bg-gradient-to-br from-purple-950/80 to-blue-950/80 border-purple-500/50 shadow-lg shadow-purple-500/20 animate-glow-pulse"
                      : "bg-slate-800/30 border-slate-700/50 opacity-60"
                  }`}
                >
                  {/* Badge Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`text-5xl transition-transform duration-300 ${
                        isUnlocked ? "scale-100" : "scale-75 opacity-50"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        isUnlocked
                          ? "bg-green-500/20 text-green-300 border border-green-500/50"
                          : "bg-slate-700/50 text-slate-400 border border-slate-600/50"
                      }`}
                    >
                      {isUnlocked ? "✓ Unlocked" : "🔒 Locked"}
                    </div>
                  </div>

                  {/* Badge Info */}
                  <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? "text-white" : "text-slate-400"}`}>
                    {badge.name}
                  </h3>
                  <p className={`mb-4 flex-grow ${isUnlocked ? "text-slate-300" : "text-slate-500"}`}>
                    {badge.description}
                  </p>

                  {/* Unlock Instructions or Share */}
                  <div className="space-y-3 mt-auto pt-4 border-t border-slate-700/50">
                    {isUnlocked ? (
                      <>
                        <p className="text-xs text-slate-400">Share your achievement</p>
                        <ShareButton
                          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/badges`}
                          title={`I unlocked the ${badge.name} badge on CareerTalks! 🏆`}
                        />
                      </>
                    ) : (
                      <>
                        <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-slate-400 font-medium mb-1">How to unlock:</p>
                          <p className="text-sm text-slate-300">{badge.howToUnlock}</p>
                        </div>
                        <Link
                          href={badge.toolUrl}
                          className="inline-block px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors duration-200 w-full text-center"
                        >
                          Try {badge.tool}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explore All Tools */}
      <section className="border-t border-slate-800 py-12 bg-gradient-to-t from-slate-950 to-transparent">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to unlock more badges?</h3>
          <p className="text-slate-400 mb-6">Explore all our career tools and discover your perfect path</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
