"use client";

import { useState } from "react";
import Link from "next/link";
import { decisionTree } from "@/lib/interactive-data";
import type { DecisionNode } from "@/lib/interactive-data";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { Cluster, CareerSlug } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";

type ClusterScores = Record<Cluster, number>;
type CareerScores = Partial<Record<CareerSlug, number>>;
type HistoryEntry = { nodeId: string; choiceLabel: string; choiceIcon: string };

const CLUSTER_COLORS: Record<Cluster, string> = {
  tech: "from-blue-500 to-cyan-400",
  business: "from-amber-500 to-orange-400",
  science: "from-purple-500 to-pink-400",
  creative: "from-rose-500 to-orange-400",
};

const CLUSTER_BORDER: Record<Cluster, string> = {
  tech: "border-blue-400",
  business: "border-amber-400",
  science: "border-purple-400",
  creative: "border-rose-400",
};

export default function CareerNavigator() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [clusterScores, setClusterScores] = useState<ClusterScores>({
    tech: 0,
    business: 0,
    science: 0,
    creative: 0,
  });
  const [careerScores, setCareerScores] = useState<CareerScores>({} as CareerScores);
  const [showResults, setShowResults] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const currentNode: DecisionNode | null = decisionTree.find((node) => node.id === currentNodeId) || null;
  const sceneNumber = history.length + 1;

  // Calculate dominant cluster for background gradient
  const dominantCluster = (Object.entries(clusterScores).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || "tech") as Cluster;

  const handleChoice = (option: DecisionNode["options"][0]) => {
    setFadeOut(true);

    setTimeout(() => {
      // Add to history
      const newHistory = [
        ...history,
        {
          nodeId: currentNodeId,
          choiceLabel: option.label,
          choiceIcon: option.icon,
        },
      ];
      setHistory(newHistory);

      // Update cluster scores
      const newClusterScores = { ...clusterScores };
      if (option.clusterBoost) {
        Object.entries(option.clusterBoost).forEach(([cluster, boost]) => {
          newClusterScores[cluster as Cluster] += boost;
        });
      }
      setClusterScores(newClusterScores);

      // Update career scores
      const newCareerScores = { ...careerScores };
      if (option.careerBoost) {
        Object.entries(option.careerBoost).forEach(([career, boost]) => {
          newCareerScores[career as CareerSlug] =
            (newCareerScores[career as CareerSlug] || 0) + boost;
        });
      }
      setCareerScores(newCareerScores);

      // Check if terminal node
      if (option.nextNode === null) {
        setShowResults(true);
      } else {
        setCurrentNodeId(option.nextNode);
      }

      setFadeOut(false);
    }, 300);
  };

  const calculateResults = () => {
    const careerScoresWithClusters: Record<CareerSlug, number> = {} as Record<CareerSlug, number>;

    Object.entries(careerConfigs).forEach(([slug, config]) => {
      const clusterScore = clusterScores[config.cluster as Cluster] || 0;
      const directScore = careerScores[slug as CareerSlug] || 0;
      careerScoresWithClusters[slug as CareerSlug] = clusterScore + directScore;
    });

    const sorted = Object.entries(careerScoresWithClusters)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const maxScore = Math.max(...sorted.map(([, score]) => score), 1);

    return sorted.map(([slug, score]) => ({
      slug: slug as CareerSlug,
      score: Math.round((score / maxScore) * 100),
      config: careerConfigs[slug as CareerSlug],
    }));
  };

  const handleStartOver = () => {
    setCurrentNodeId("start");
    setHistory([]);
    setClusterScores({ tech: 0, business: 0, science: 0, creative: 0 });
    setCareerScores({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();
    const topCareer = results[0];

    return (
      <div className="min-h-screen bg-slate-950">
        {/* Confetti animation could be added here with a library like confetti-js */}

        {/* Hero Section */}
        <div className="hero-dark relative overflow-hidden">
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-r ${
              CLUSTER_COLORS[topCareer.config.cluster as Cluster]
            }`}
          />
          <div className="relative z-10">
            <div className="mb-6 inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-300">
              🎯 Your Career Match
            </div>
            <h1 className="font-extrabold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Your Career Path
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Based on your journey through the navigator, here are your top
              career matches.
            </p>
          </div>
        </div>

        {/* Breadcrumb Trail */}
        <div className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-slate-400 mb-6">
              Your Journey
            </h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {history.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-lg">
                      {step.choiceIcon}
                    </div>
                    <span className="text-xs text-slate-400 text-center max-w-[60px] truncate">
                      {step.choiceLabel}
                    </span>
                  </div>
                  {idx < history.length - 1 && (
                    <div className="w-6 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-white mb-12">
              Top Career Matches
            </h2>
            <div className="space-y-6">
              {results.map((result, idx) => (
                <Link
                  key={result.slug}
                  href={`/careers/${result.slug}`}
                  className="group block"
                  style={{
                    animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="glass-dark rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-indigo-500/20">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">
                          {result.config.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                            {result.config.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                              {clusterConfigs[result.config.cluster as Cluster]?.title}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-extrabold text-indigo-400">
                          {result.score}%
                        </div>
                        <p className="text-xs text-slate-400">Match</p>
                      </div>
                    </div>

                    {/* Match Score Bar */}
                    <div className="mb-6">
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            CLUSTER_COLORS[result.config.cluster as Cluster]
                          }`}
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold">
                          SALARY RANGE
                        </p>
                        <p className="text-lg font-bold text-white mt-1">
                          {result.config.stats.avgSalary}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold">
                          GROWTH
                        </p>
                        <p className="text-lg font-bold text-white mt-1">
                          {result.config.stats.growthRate}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {result.config.description}
                    </p>

                    <div className="mt-6 inline-flex items-center text-indigo-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Explore Career <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Share & Actions */}
        <div className="py-12 px-6 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-300 mb-4">
                  Share your career path with others
                </p>
                <ShareButton
                  url={`${typeof window !== 'undefined' ? window.location.origin : ''}/career-navigator`}
                  title={`I navigated to ${topCareer.config.title}! 🧭`}
                  prefilledMessage={`I took the Career Navigator and discovered ${topCareer.config.title} is my perfect match! 🎯 My match score: ${topCareer.score}%. Find yours:`}
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Start Over
                </button>
                <Link
                  href="/careers"
                  className="px-6 py-3 rounded-lg font-semibold text-indigo-300 border border-indigo-500/50 hover:border-indigo-400 transition-colors"
                >
                  Browse All Careers
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 transition-all duration-500">
      {/* Dynamic background gradient based on dominant cluster */}
      <div
        className={`fixed inset-0 opacity-5 bg-gradient-to-br ${
          CLUSTER_COLORS[dominantCluster]
        } pointer-events-none transition-all duration-1000`}
      />

      {/* Hero Section */}
      <div className="hero-dark relative overflow-hidden">
        <div className="relative z-10">
          <div className="mb-6 inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-300">
            🧭 Career Navigator
          </div>
          <h1 className="font-extrabold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Navigate Your Career Path
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Make 4 key decisions to discover careers that match your values,
            skills, and aspirations.
          </p>
        </div>
      </div>

      {/* Breadcrumb Trail */}
      <div className="py-8 px-6 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Start position */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-400 flex items-center justify-center text-sm animate-pulse">
                🚀
              </div>
              <span className="text-xs text-slate-400">Start</span>
            </div>

            {/* History steps */}
            {history.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-300 flex items-center justify-center text-sm">
                    {step.choiceIcon}
                  </div>
                  <span className="text-xs text-slate-400 text-center max-w-[50px] truncate">
                    {step.choiceLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-6">
            Scene {sceneNumber} of ~4
          </p>
        </div>
      </div>

      {/* Decision Scene */}
      <div className="py-16 px-6 flex-1">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-300 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Question */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
              {currentNode.question}
            </h2>

            {/* Description */}
            {currentNode.description && (
              <p className="text-center text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                {currentNode.description}
              </p>
            )}

            {/* Options Grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentNode.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(option)}
                  className={`group glass-dark rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-105 text-left flex flex-col items-center justify-center text-center relative overflow-hidden ${
                    CLUSTER_BORDER[
                      (option.clusterBoost
                        ? Object.entries(option.clusterBoost).sort(
                            ([, a], [, b]) => b - a
                          )[0][0]
                        : "tech") as Cluster
                    ]
                  } border-b-2`}
                  style={{
                    animation: `slideUp 0.6s ease-out ${0.1 + idx * 0.1}s both`,
                  }}
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2">
                    {option.label}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
