"use client";

import { useState } from "react";
import Link from "next/link";
import { zodiacConfigs } from "@/lib/interactive-data";
import type { ZodiacSign } from "@/lib/interactive-data";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";

const elementColors: Record<string, string> = {
  Fire: "bg-red-500 text-white",
  Earth: "bg-green-500 text-white",
  Air: "bg-blue-500 text-white",
  Water: "bg-cyan-500 text-white",
};

const elementAccents: Record<string, string> = {
  Fire: "#EF4444",
  Earth: "#22C55E",
  Air: "#3B82F6",
  Water: "#06B6D4",
};

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  if (selectedSign) {
    const zodiac = zodiacConfigs.find((z) => z.sign === selectedSign);
    if (!zodiac) return null;

    const accentColor = elementAccents[zodiac.element];

    return (
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Confetti effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animation: `confetti-fall ${2 + Math.random() * 1}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <div
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 hero-dark"
          style={{
            boxShadow: `inset 0 0 60px ${accentColor}20`,
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4">
              <span className="inline-block bg-white/80 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Your Cosmic Career Match
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              You're a {zodiac.name}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover careers that align with your cosmic destiny
            </p>

            {/* Traits */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {zodiac.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Zodiac Symbol - Large */}
            <div className="text-9xl mb-8 drop-shadow-lg">{zodiac.symbol}</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Career Matches */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
              Your Career Matches
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zodiac.careerMatches.map((match) => {
                const career = careerConfigs[match.slug];
                const cluster = clusterConfigs[career.cluster];

                return (
                  <Link
                    key={match.slug}
                    href={`/careers/${match.slug}`}
                    className="group"
                  >
                    <div
                      className="h-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
                      style={{
                        borderColor: cluster.accent,
                        boxShadow: `0 0 0 2px ${cluster.accent}10`,
                      }}
                    >
                      {/* Icon and title */}
                      <div className="text-4xl mb-3">{career.icon}</div>
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {career.title}
                      </h3>

                      {/* Cluster Badge */}
                      <div className="mb-3 inline-block">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `${cluster.accent}15`,
                            color: cluster.accent,
                          }}
                        >
                          {cluster.title}
                        </span>
                      </div>

                      {/* Reason */}
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {match.reason}
                      </p>

                      {/* Stats */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Salary:</span>
                          <span className="font-semibold text-gray-900">
                            {career.stats.avgSalary}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth Rate:</span>
                          <span
                            className="font-semibold"
                            style={{ color: cluster.accent }}
                          >
                            {career.stats.growthRate}
                          </span>
                        </div>
                      </div>

                      {/* Learn More Arrow */}
                      <div className="mt-4 pt-4 border-t border-gray-100 group-hover:translate-x-1 transition-transform">
                        <span
                          className="text-sm font-semibold flex items-center gap-1"
                          style={{ color: cluster.accent }}
                        >
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-8 sm:p-12 border border-indigo-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                  Love your match?
                </h3>
                <p className="text-gray-600">
                  Share your cosmic career result with friends
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <ShareButton
                  url={`${typeof window !== "undefined" ? window.location.origin : ""}/zodiac`}
                  title={`I'm a ${zodiac.name}! Check your cosmic career match`}
                  prefilledMessage={zodiac.shareText}
                />
                <Link
                  href="/careers"
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors text-center"
                >
                  Browse All Careers
                </Link>
              </div>
            </div>
          </div>

          {/* Try Another Sign Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setSelectedSign(null)}
              className="px-8 py-3 rounded-lg font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors inline-flex items-center gap-2"
            >
              ♻️ Try Another Sign
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Selection Screen
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 hero-dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="inline-block bg-white/80 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Zodiac Career Match
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
            What's Your Cosmic Career?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect career path based on your zodiac sign. Let the stars guide your career destiny!
          </p>
        </div>
      </div>

      {/* Sparkle Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Zodiac Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {zodiacConfigs.map((zodiac, index) => (
            <button
              key={zodiac.sign}
              onClick={() => setSelectedSign(zodiac.sign)}
              className="group relative"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`,
              }}
            >
              <div
                className="h-full bg-white rounded-xl border-2 border-gray-200 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  borderColor: elementAccents[zodiac.element],
                  boxShadow: `0 0 0 2px ${elementAccents[zodiac.element]}10`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${elementAccents[zodiac.element]}40 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 text-center">
                  {/* Symbol */}
                  <div className="text-5xl mb-3 drop-shadow-sm group-hover:scale-110 transition-transform">
                    {zodiac.symbol}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {zodiac.name}
                  </h3>

                  {/* Dates */}
                  <p className="text-xs text-gray-500 mb-3">{zodiac.dates}</p>

                  {/* Element Badge */}
                  <div className="inline-block">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${elementColors[zodiac.element]}`}
                    >
                      {zodiac.element}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
