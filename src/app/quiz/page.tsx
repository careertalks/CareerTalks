"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { Cluster, CareerSlug } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    clusters: Cluster[];
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What kind of problems do you enjoy solving?",
    options: [
      { label: "Technical puzzles and building things with code or data", clusters: ["tech"] },
      { label: "Strategic challenges involving money, markets, or people", clusters: ["business"] },
      { label: "Scientific mysteries and understanding how things work", clusters: ["science"] },
      { label: "Creative challenges that involve design, expression, or human connection", clusters: ["creative"] },
    ],
  },
  {
    id: 2,
    question: "What does your ideal work day look like?",
    options: [
      { label: "Coding, analyzing data, or experimenting with new technology", clusters: ["tech"] },
      { label: "Leading meetings, closing deals, or planning strategy", clusters: ["business"] },
      { label: "Running experiments, doing research, or working in a lab/field", clusters: ["science"] },
      { label: "Designing, writing, collaborating with creative teams, or helping people", clusters: ["creative"] },
    ],
  },
  {
    id: 3,
    question: "Which school subject do you enjoy the most?",
    options: [
      { label: "Mathematics, Computer Science, or Statistics", clusters: ["tech"] },
      { label: "Economics, Business Studies, or Accounting", clusters: ["business"] },
      { label: "Biology, Chemistry, Physics, or Environmental Science", clusters: ["science"] },
      { label: "Art, Literature, Psychology, or Social Studies", clusters: ["creative"] },
    ],
  },
  {
    id: 4,
    question: "What matters most to you in a career?",
    options: [
      { label: "High salary and being at the forefront of innovation", clusters: ["tech"] },
      { label: "Building wealth, independence, and business influence", clusters: ["business"] },
      { label: "Making a tangible impact on health, environment, or society", clusters: ["science"] },
      { label: "Creative fulfillment, helping people, or expressing ideas", clusters: ["creative"] },
    ],
  },
  {
    id: 5,
    question: "How do you prefer to work?",
    options: [
      { label: "Independently, deep in focus with minimal interruptions", clusters: ["tech", "science"] },
      { label: "In a fast-paced team with lots of collaboration and networking", clusters: ["business"] },
      { label: "A mix of fieldwork, research, and hands-on problem solving", clusters: ["science"] },
      { label: "In dynamic, people-focused environments with varied tasks", clusters: ["creative", "business"] },
    ],
  },
  {
    id: 6,
    question: "What would you do with a free weekend?",
    options: [
      { label: "Build a side project, learn a new programming language, or explore AI tools", clusters: ["tech"] },
      { label: "Read about startups, visit a market, or work on a business idea", clusters: ["business"] },
      { label: "Go hiking, visit a science museum, or watch a documentary about nature", clusters: ["science"] },
      { label: "Draw, write, redesign your room, or volunteer at a community event", clusters: ["creative"] },
    ],
  },
  {
    id: 7,
    question: "Which headline excites you the most?",
    options: [
      { label: "\"New AI Model Breaks Records in Scientific Discovery\"", clusters: ["tech"] },
      { label: "\"25-Year-Old Founder Raises $10M for Her Startup\"", clusters: ["business"] },
      { label: "\"Breakthrough Gene Therapy Cures Previously Untreatable Disease\"", clusters: ["science"] },
      { label: "\"Design Studio Wins International Award for Sustainable Architecture\"", clusters: ["creative"] },
    ],
  },
];

function getTopCareers(scores: Record<Cluster, number>): { cluster: Cluster; careers: typeof careerConfigs[CareerSlug][] }[] {
  const sorted = (Object.entries(scores) as [Cluster, number][])
    .sort((a, b) => b[1] - a[1]);

  const topCluster = sorted[0][0];
  const secondCluster = sorted[1][0];

  const topCareers = Object.values(careerConfigs)
    .filter((c) => c.cluster === topCluster)
    .slice(0, 3);

  const secondCareers = Object.values(careerConfigs)
    .filter((c) => c.cluster === secondCluster)
    .slice(0, 2);

  return [
    { cluster: topCluster, careers: topCareers },
    { cluster: secondCluster, careers: secondCareers },
  ];
}

const confettiEmojis = ["🎉", "✨", "🌟", "💫", "🎊"];

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="fixed text-2xl animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
          }}
        >
          {confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]}
        </span>
      ))}
    </div>
  );
}

function ScoreBreakdownBar({ cluster, score }: { cluster: Cluster; score: number }) {
  const config = clusterConfigs[cluster];
  const maxScore = 7;
  const percentage = (score / maxScore) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">{config.title}</span>
        <span className="text-sm font-bold text-gray-700">{score}/{maxScore}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            backgroundColor: config.accent,
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Cluster, number>>({
    tech: 0,
    business: 0,
    science: 0,
    creative: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (clusters: Cluster[]) => {
    setFadeOut(true);
    const newScores = { ...scores };
    clusters.forEach((cluster) => {
      newScores[cluster] += 1;
    });
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFadeOut(false);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores({ tech: 0, business: 0, science: 0, creative: 0 });
    setShowResults(false);
    setSelectedOption(null);
    setFadeOut(false);
  };

  if (showResults) {
    const results = getTopCareers(scores);
    const topCluster = results[0].cluster;
    const topConfig = clusterConfigs[topCluster];
    const shareMessage = `I'm a ${topConfig.title} Explorer! 🎯 Discover your career match:`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
      <>
        <Confetti />
        {/* Results Hero */}
        <section className="relative overflow-hidden hero-dark noise-overlay">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div
            className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ background: topConfig.accent }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="text-sm">✨</span>
              <span className="text-xs font-semibold text-indigo-200 tracking-wide">
                Your Results Are In
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              You&apos;re a{" "}
              <span
                className="inline-block relative"
                style={{ color: topConfig.accentLight }}
              >
                {topConfig.title}
                <div
                  className="absolute inset-0 opacity-20 blur-xl -z-10"
                  style={{ background: topConfig.accent }}
                />
              </span>{" "}
              Explorer
            </h1>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Based on your answers, careers in {topConfig.title.toLowerCase()} align best with your interests and strengths.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Your Score Breakdown</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <ScoreBreakdownBar cluster="tech" score={scores.tech} />
              <ScoreBreakdownBar cluster="business" score={scores.business} />
              <ScoreBreakdownBar cluster="science" score={scores.science} />
              <ScoreBreakdownBar cluster="creative" score={scores.creative} />
            </div>
          </div>
        </section>

        {/* Results Content */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {results.map((result, idx) => (
              <div key={result.cluster} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: clusterConfigs[result.cluster].accent }}
                  />
                  <h2 className="text-lg font-bold text-gray-900">
                    {idx === 0 ? "Top Match" : "Strong Match"}: {clusterConfigs[result.cluster].title}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.careers.map((career, careerIdx) => {
                    const cluster = clusterConfigs[career.cluster];
                    return (
                      <Link
                        key={career.slug}
                        href={`/careers/${career.slug}`}
                        className="group relative block rounded-xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 result-card-enter"
                        style={{ animationDelay: `${careerIdx * 0.1}s` }}
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: cluster.accent }}
                        />
                        <div className="p-5 pl-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                              style={{ background: cluster.accentBg }}
                            >
                              {career.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {career.shortTitle}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {career.stats.avgSalary} &middot; {career.stats.growthRate} growth
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {career.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={handleRestart}
                className="px-6 py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
              >
                Retake Quiz
              </button>
              <Link
                href="/#careers"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all text-center"
              >
                Browse All Career Paths
              </Link>
              <div className="ml-auto">
                <ShareButton
                  url={shareUrl}
                  title={`I'm a ${topConfig.title} Explorer`}
                  prefilledMessage={shareMessage}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const question = questions[currentQuestion];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <>
      {/* Quiz Hero */}
      <section className="relative overflow-hidden hero-dark noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
            <span className="text-sm">🧭</span>
            <span className="text-xs font-semibold text-indigo-200 tracking-wide">
              Career Quiz
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Which Career Path Fits You?
          </h1>
          <p className="text-indigo-200 max-w-lg mx-auto text-sm sm:text-base">
            Answer {questions.length} quick questions and discover career paths that match your interests and strengths.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L60 37C120 34 240 28 360 25C480 22 600 22 720 25C840 28 960 34 1080 34C1200 34 1320 28 1380 25L1440 22V40H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <section className="py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div
            className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-8 leading-snug">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    handleAnswer(option.clusters);
                  }}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform ${
                    selectedOption === idx
                      ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-500/10 scale-[1.02]"
                      : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-sm hover:scale-[1.02]"
                  }`}
                  style={{
                    animation: !fadeOut ? `fade-in-up 0.4s ease-out forwards` : undefined,
                    animationDelay: !fadeOut ? `${idx * 0.05}s` : undefined,
                    opacity: !fadeOut ? undefined : 0,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all ${
                        selectedOption === idx
                          ? "bg-indigo-600 text-white scale-110"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {optionLetters[idx]}
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium pt-1">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
