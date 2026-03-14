"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import { rouletteFunFacts } from "@/lib/interactive-data";
import ShareButton from "@/components/ShareButton";

type CareerKey = keyof typeof careerConfigs;

export default function CareerRoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(
    null
  );
  const [selectedFunFact, setSelectedFunFact] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const careers = Object.values(careerConfigs);

  const getClusterColor = (clusterSlug: string): string => {
    const colors: { [key: string]: string } = {
      tech: "#3B82F6",
      business: "#F59E0B",
      science: "#10B981",
      creative: "#F43F5E",
    };
    return colors[clusterSlug] || "#6366F1";
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedCareerIndex(null);

    const randomIndex = Math.floor(Math.random() * careers.length);
    const rotations = Math.floor(Math.random() * 3) + 5; // 5-8 rotations

    // Calculate target degrees: each segment is 18 degrees (360/20)
    // Add 9 to center the segment, add full rotations
    const segmentAngle = 18;
    const centerOffset = 9;
    const targetDegrees =
      randomIndex * segmentAngle + centerOffset + rotations * 360;

    setWheelRotation(targetDegrees);

    // Simulate animation duration
    setTimeout(() => {
      setSelectedCareerIndex(randomIndex);
      const selectedCareerData = careers[randomIndex];
      const careerFunFacts = rouletteFunFacts[selectedCareerData.slug];
      const randomFact =
        careerFunFacts[Math.floor(Math.random() * careerFunFacts.length)];
      setSelectedFunFact(randomFact);
      setIsSpinning(false);

      // Trigger confetti
      triggerConfetti();
    }, 4000);
  };

  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      // Create confetti animation using CSS
      const confettiPieces = Array.from({ length: 50 }, (_, i) => {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.width = Math.random() * 10 + 5 + "px";
        confetti.style.height = Math.random() * 10 + 5 + "px";
        confetti.style.backgroundColor = [
          "#FFD700",
          "#FF6B6B",
          "#4ECDC4",
          "#95E1D3",
          "#F38181",
        ][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = "50%";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";
        confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        return confetti;
      });

      // Add animation to document if not already present
      if (!document.getElementById("confetti-style")) {
        const style = document.createElement("style");
        style.id = "confetti-style";
        style.innerHTML = `
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Clean up confetti after animation
      setTimeout(() => {
        confettiPieces.forEach((piece) => piece.remove());
      }, 3000);
    }
  };

  const selectedCareer =
    selectedCareerIndex !== null ? careers[selectedCareerIndex] : null;

  // Conic gradient for wheel segments
  const segmentColors = careers
    .map((career) => {
      const color = getClusterColor(career.cluster);
      return color;
    })
    .join(", ");

  const conicGradientStops = careers
    .map((_, i) => {
      const startPercent = (i / careers.length) * 100;
      const endPercent = ((i + 1) / careers.length) * 100;
      const color = getClusterColor(careers[i].cluster);
      return `${color} ${startPercent}% ${endPercent}%`;
    })
    .join(", ");

  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="bg-hero-dark py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-400 rounded-full text-sm font-medium mb-6">
            🎰 Career Roulette
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Spin Your Career Destiny
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Let fate guide your career exploration. Spin the wheel to discover
            an exciting career path, complete with insights and fun facts to
            spark your imagination.
          </p>
        </div>
      </section>

      {/* Wheel Section */}
      <section className="py-12 md:py-20 flex flex-col items-center">
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 mb-8">
          {/* Pointer Arrow */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-indigo-300"></div>
            <div className="w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-indigo-500 mx-auto -mt-1"></div>
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full relative shadow-2xl overflow-hidden transition-transform"
            style={{
              background: `conic-gradient(${conicGradientStops})`,
              transform: `rotate(${wheelRotation}deg)`,
              transitionDuration: isSpinning ? "4s" : "0s",
              transitionTimingFunction: isSpinning
                ? "cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
            }}
          >
            {/* Career Emojis positioned around the wheel */}
            {careers.map((career, index) => {
              const angle = (index / careers.length) * 360;
              const distance = 110; // Distance from center
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${distance}px)`,
                  }}
                >
                  <div
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 text-4xl"
                    style={{
                      transform: `translateX(-50%) rotate(-${angle}deg)`,
                    }}
                  >
                    {career.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          style={{
            animation: !isSpinning
              ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              : "none",
          }}
        >
          {isSpinning ? "SPINNING..." : "SPIN THE WHEEL"}
        </button>
      </section>

      {/* Result Section */}
      {selectedCareer && (
        <section className="py-12 md:py-20 animate-fadeIn">
          <div className="max-w-2xl mx-auto px-6">
            {/* Result Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-8 mb-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{selectedCareer.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {selectedCareer.title}
                </h2>

                {/* Cluster Badge */}
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                  style={{
                    backgroundColor: `${getClusterColor(selectedCareer.cluster)}20`,
                    color: getClusterColor(selectedCareer.cluster),
                    border: `1px solid ${getClusterColor(selectedCareer.cluster)}`,
                  }}
                >
                  {clusterConfigs[selectedCareer.cluster]?.title ||
                    selectedCareer.cluster}
                </div>
              </div>

              {/* Career Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Median Salary</p>
                  <p className="text-xl font-bold text-emerald-400">
                    {selectedCareer.stats.avgSalary}
                  </p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Growth Rate</p>
                  <p className="text-xl font-bold text-blue-400">
                    {selectedCareer.stats.growthRate}%
                  </p>
                </div>
              </div>

              {/* Top Roles */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Top Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.stats.topRoles.slice(0, 3).map((role, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-500/20 border border-indigo-400 rounded-full text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              {selectedFunFact && (
                <div className="bg-slate-700/50 border-l-4 border-indigo-500 rounded-lg p-6 mb-8">
                  <p className="text-gray-200 italic leading-relaxed">
                    {selectedFunFact}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/careers/${selectedCareer.slug}`}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  Explore This Career
                </Link>
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="flex-1 px-6 py-3 border-2 border-indigo-500 hover:bg-indigo-500/10 text-indigo-400 font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  Spin Again
                </button>
                <div className="flex-1">
                  <ShareButton
                    url={`${typeof window !== "undefined" ? window.location.origin : ""}/roulette`}
                    title={`Career Roulette: ${selectedCareer.title}`}
                    description={selectedCareer.description}
                    prefilledMessage={`The Career Roulette says I should try ${selectedCareer.title}! 🎰 What's your career destiny?`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional CTA */}
      {!selectedCareer && (
        <section className="py-12 text-center">
          <p className="text-gray-400 text-lg">
            Click the button above to spin the wheel and discover your next
            career!
          </p>
        </section>
      )}
    </main>
  );
}
