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
  "creativity",
  "data-analysis",
  "leadership",
  "technical",
  "research",
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
    const topMatch = matches[0];
    const topCareer = topMatch ? careerConfigs[topMatch.slug] : null;
    const topCluster = topCareer ? clusterConfigs[topCareer.cluster] : null;

    return (
      <main className="min-h-screen bg-white">
        <style>{`
          @keyframes radar-fill {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes fade-in-scale {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes bar-fill {
            from { width: 0%; }
          }
          .radar-polygon { animation: radar-fill 2s ease-out forwards; }
          .match-card { opacity: 0; animation: fade-in-scale 0.5s ease-out forwards; }
          .match-card:nth-child(1) { animation-delay: 0.1s; }
          .match-card:nth-child(2) { animation-delay: 0.2s; }
          .match-card:nth-child(3) { animation-delay: 0.3s; }
          .match-card:nth-child(4) { animation-delay: 0.4s; }
          .match-card:nth-child(5) { animation-delay: 0.5s; }
          .bar-animate { animation: bar-fill 1s ease-out forwards; }
        `}</style>

        {/* Hero Section */}
        <div className="hero-dark text-white py-20 relative overflow-hidden">
          {/* Accent glow orb */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ backgroundColor: topCluster?.accent || "#4f46e5" }}
          />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40">
              <span className="text-sm font-medium text-indigo-300">
                💪 Skill Match Results
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Your Top Match:{" "}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${topCluster?.accent || "#4f46e5"}, ${topCluster?.gradientTo || "#a855f7"})`,
                }}
              >
                {topCareer?.title || "Career"}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Based on your unique skill profile, here are your best career matches
            </p>
          </div>
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white" />
            </svg>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Two-column layout: Radar + Top Skills */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Radar Chart */}
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">
                  Your Skill Profile
                </h2>
                <svg
                  width="280"
                  height="280"
                  viewBox="0 0 320 320"
                  className="mx-auto"
                >
                  {/* Grid rings */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => (
                    <polygon
                      key={`ring-${scale}`}
                      points={SKILL_ORDER.map((_, i) => {
                        const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                        const x = 160 + 100 * scale * Math.cos(angle);
                        const y = 160 + 100 * scale * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth={scale === 1 ? "1.5" : "0.5"}
                      strokeDasharray={scale === 1 ? "0" : "4 4"}
                    />
                  ))}

                  {/* Axis lines */}
                  {SKILL_ORDER.map((_, i) => {
                    const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 160 + 100 * Math.cos(angle);
                    const y = 160 + 100 * Math.sin(angle);
                    return (
                      <line
                        key={`axis-${i}`}
                        x1="160" y1="160" x2={x} y2={y}
                        stroke="#e5e7eb" strokeWidth="0.5"
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
                    fillOpacity="0.25"
                    stroke="url(#radarGradient)"
                    strokeWidth="2.5"
                    className="radar-polygon"
                    strokeDasharray="1000"
                  />

                  {/* Dots at each point */}
                  {SKILL_ORDER.map((skillId, i) => {
                    const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                    const rating = (ratings[skillId] || 0) / 5;
                    const radius = 100 * rating;
                    const x = 160 + radius * Math.cos(angle);
                    const y = 160 + radius * Math.sin(angle);
                    return (
                      <circle key={`dot-${i}`} cx={x} cy={y} r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
                    );
                  })}

                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>

                  {/* Labels */}
                  {SKILL_ORDER.map((skillId, i) => {
                    const angle = (i / SKILL_ORDER.length) * 2 * Math.PI - Math.PI / 2;
                    const labelRadius = 125;
                    const x = 160 + labelRadius * Math.cos(angle);
                    const y = 160 + labelRadius * Math.sin(angle);
                    const skillName = skillDefinitions.find((s) => s.id === skillId)?.name || skillId;
                    return (
                      <text
                        key={`label-${i}`}
                        x={x} y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[10px] font-semibold"
                        fill="#374151"
                      >
                        {skillName}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Skill Bars */}
            <div className="flex-grow w-full">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Your Skill Ratings
              </h2>
              <div className="space-y-4">
                {[...SKILL_ORDER]
                  .sort((a, b) => (ratings[b] || 0) - (ratings[a] || 0))
                  .map((skillId) => {
                    const skill = skillDefinitions.find((s) => s.id === skillId);
                    const rating = ratings[skillId] || 0;
                    return (
                      <div key={skillId}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-gray-800">
                            {skill?.icon} {skill?.name || skillId}
                          </span>
                          <span className="text-sm font-bold text-indigo-600">{rating}/5</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full bar-animate bg-gradient-to-r from-indigo-500 to-violet-500"
                            style={{ width: `${(rating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-sm text-indigo-900">
                  <span className="font-bold">Strongest skills:</span>{" "}
                  {getTopSkills()}
                </p>
              </div>
            </div>
          </div>

          {/* Top 5 Matches */}
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              Top Career Matches
            </h2>
            <p className="text-gray-500 text-center mb-8">Ranked by how well your skills align</p>
            <div className="space-y-4">
              {matches.map((match, index) => {
                const career = careerConfigs[match.slug];
                const cluster = clusterConfigs[career.cluster];
                const isTop = index === 0;
                return (
                  <Link
                    key={match.slug}
                    href={`/careers/${match.slug}`}
                    className="block match-card"
                  >
                    <div
                      className={`group relative rounded-xl border p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                        isTop
                          ? "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 shadow-md"
                          : "bg-white border-gray-200 hover:border-indigo-200"
                      }`}
                    >
                      {isTop && (
                        <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full">
                          Best Match
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div
                          className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl font-extrabold text-lg ${
                            isTop
                              ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Career info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{career.icon}</span>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                              {career.title}
                            </h3>
                            <span
                              className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white"
                              style={{ backgroundColor: cluster.accent }}
                            >
                              {cluster.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{career.stats.avgSalary}</span>
                            <span className="text-green-600 font-semibold">{career.stats.growthRate} growth</span>
                          </div>
                          {/* Match bar */}
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2.5">
                            <div
                              className="h-1.5 rounded-full bar-animate"
                              style={{
                                width: `${match.matchPercentage}%`,
                                backgroundColor: cluster.accent,
                              }}
                            />
                          </div>
                        </div>

                        {/* Percentage */}
                        <div className="flex-shrink-0 text-right">
                          <div
                            className={`text-2xl font-extrabold ${isTop ? "text-indigo-600" : "text-gray-700"}`}
                          >
                            {match.matchPercentage}%
                          </div>
                          <div className="text-xs text-gray-400">match</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => {
                setShowResults(false);
                setRatings({});
              }}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md hover:shadow-lg"
            >
              ↻ Retake Assessment
            </button>
            <Link
              href="/careers"
              className="px-6 py-3 rounded-xl font-semibold text-indigo-600 bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center"
            >
              Browse All Careers
            </Link>
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
