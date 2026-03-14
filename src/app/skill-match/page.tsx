"use client";
import { useState } from "react";
import Link from "next/link";
import { skillDefinitions } from "@/lib/interactive-data";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";

const SKILL_ORDER = [
  "problem-solving",
  "communication",
  "collaboration",
  "creativity",
  "analytical",
  "leadership",
  "technical",
  "adaptability",
];

export default function SkillMatchPage() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<
    { slug: CareerSlug; score: number; matchPercentage: number }[]
  >([]);

  const allSkillsRated = SKILL_ORDER.every((skill) => ratings[skill]);

  const handleRateSkill = (skillId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [skillId]: rating }));
  };

  const calculateMatches = () => {
    const careerMatches: {
      slug: CareerSlug;
      score: number;
      matchPercentage: number;
    }[] = [];

    // Iterate through all careers
    Object.entries(careerConfigs).forEach(([slug, config]) => {
      let totalScore = 0;
      let totalWeight = 0;

      // Calculate weighted score for this career
      skillDefinitions.forEach((skill) => {
        const userRating = ratings[skill.id] || 0;
        const skillWeight = skill.careerWeights[slug as CareerSlug] || 0;
        totalScore += userRating * skillWeight;
        totalWeight += skillWeight;
      });

      const maxScore = 5 * totalWeight; // Max possible score (all skills rated 5)
      const matchPercentage =
        maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

      careerMatches.push({
        slug: slug as CareerSlug,
        score: totalScore,
        matchPercentage,
      });
    });

    // Sort by match percentage descending and take top 5
    const topMatches = careerMatches
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5);

    setMatches(topMatches);
    setShowResults(true);
  };

  const getTopSkills = () => {
    return SKILL_ORDER.sort((a, b) => (ratings[b] || 0) - (ratings[a] || 0))
      .slice(0, 3)
      .map((skillId) => skillDefinitions.find((s) => s.id === skillId)?.name || skillId)
      .join(", ");
  };

  const getTopCareerTitle = () => {
    if (matches.length === 0) return "your perfect career match";
    return careerConfigs[matches[0].slug]?.title || "your perfect career match";
  };

  if (showResults) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
        <style>{`
          @keyframes radar-fill {
            from {
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fade-in-scale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .radar-polygon {
            animation: radar-fill 2s ease-out forwards;
          }
          .match-card {
            animation: fade-in-scale 0.5s ease-out forwards;
          }
          .match-card:nth-child(1) { animation-delay: 0.1s; }
          .match-card:nth-child(2) { animation-delay: 0.2s; }
          .match-card:nth-child(3) { animation-delay: 0.3s; }
          .match-card:nth-child(4) { animation-delay: 0.4s; }
          .match-card:nth-child(5) { animation-delay: 0.5s; }
        `}</style>

        {/* Hero Section */}
        <div className="hero-dark text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40">
              <span className="text-sm font-medium text-indigo-300">
                💪 Skill Match
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Your Career Matches
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Based on your skill profile
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Radar Chart */}
          <div className="mb-20">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Your Skill Profile
            </h2>
            <div className="flex justify-center">
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className="filter drop-shadow-lg"
              >
                {/* Octagon outline */}
                <polygon
                  points="160,40 237.6,62.4 259.6,140 237.6,217.6 160,240 82.4,217.6 60.4,140 82.4,62.4"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />

                {/* Axis lines */}
                {SKILL_ORDER.map((_, i) => {
                  const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 160 + 100 * Math.cos(angle);
                  const y = 160 + 100 * Math.sin(angle);
                  return (
                    <line
                      key={`axis-${i}`}
                      x1="160"
                      y1="160"
                      x2={x}
                      y2={y}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* User's skill polygon */}
                <polygon
                  points={SKILL_ORDER.map((skillId, i) => {
                    const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                    const rating = (ratings[skillId] || 0) / 5;
                    const radius = 100 * rating;
                    const x = 160 + radius * Math.cos(angle);
                    const y = 160 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="url(#radarGradient)"
                  fillOpacity="0.3"
                  stroke="url(#radarGradient)"
                  strokeWidth="2"
                  className="radar-polygon"
                  strokeDasharray="1000"
                />

                <defs>
                  <linearGradient
                    id="radarGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* Labels */}
                {SKILL_ORDER.map((skillId, i) => {
                  const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                  const labelRadius = 130;
                  const x = 160 + labelRadius * Math.cos(angle);
                  const y = 160 + labelRadius * Math.sin(angle);
                  const skillName = skillDefinitions.find((s) => s.id === skillId)?.name || skillId;
                  return (
                    <text
                      key={`label-${i}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-semibold fill-gray-600"
                    >
                      {skillName}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Top Skills */}
          <div className="mb-16 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Your strongest skills are{" "}
              <span className="font-extrabold text-indigo-600">
                {getTopSkills()}
              </span>
            </p>
          </div>

          {/* Top 5 Matches */}
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Top Career Matches
            </h2>
            <div className="space-y-4">
              {matches.map((match, index) => {
                const career = careerConfigs[match.slug];
                const cluster = clusterConfigs[career.cluster];
                return (
                  <Link
                    key={match.slug}
                    href={`/careers/${match.slug}`}
                    className="match-card"
                  >
                    <div className="group glass-dark hover:shadow-lg transition-shadow p-6 rounded-xl border border-white/20">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-extrabold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {career.title}
                              </h3>
                              <div className="flex gap-2 mt-2">
                                <span className="text-2xl">{career.icon}</span>
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white"
                                  style={{
                                    backgroundColor: cluster.accent,
                                  }}
                                >
                                  {cluster.title}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-extrabold text-indigo-600">
                                {match.matchPercentage}%
                              </div>
                            </div>
                          </div>
                          {/* Match percentage bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${match.matchPercentage}%`,
                                backgroundColor: cluster.accent,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                setShowResults(false);
                setRatings({});
              }}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all"
            >
              ↻ Retake Assessment
            </button>
            <Link
              href="/careers"
              className="px-6 py-3 rounded-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 transition-all text-center"
            >
              Browse All Careers
            </Link>
          </div>

          {/* Share Button */}
          <div className="flex justify-center">
            <ShareButton
              url={typeof window !== "undefined" ? window.location.href : ""}
              title="Career Match Quiz"
              prefilledMessage={`My top skills match with ${getTopCareerTitle()}! 💪 Find your career match:`}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <div className="hero-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40">
            <span className="text-sm font-medium text-indigo-300">
              💪 Skill Match
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Match Your Skills to Careers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Rate your proficiency in 8 key skills and discover which careers are
            the perfect fit for you
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Skills Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Rate Your Skills (1-5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_ORDER.map((skillId) => {
              const skill = skillDefinitions.find((s) => s.id === skillId);
              if (!skill) return null;

              const currentRating = ratings[skillId] || 0;

              return (
                <div
                  key={skillId}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{skill.icon}</span>
                        <h3 className="text-lg font-extrabold text-gray-900">
                          {skill.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div className="flex gap-2 mt-6">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRateSkill(skillId, rating)}
                        className={`w-8 h-8 rounded-full font-semibold text-xs transition-all ${
                          currentRating >= rating
                            ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>

                  {currentRating > 0 && (
                    <div className="mt-3 text-xs font-medium text-indigo-600">
                      Rated: {currentRating}/5
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={calculateMatches}
            disabled={!allSkillsRated}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              allSkillsRated
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {allSkillsRated ? "See My Matches →" : "Rate all skills to continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
