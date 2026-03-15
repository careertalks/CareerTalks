"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { Cluster, CareerSlug, CareerConfig } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";
import { InteractiveHero, ProgressIndicator, ConfettiEffect } from "@/components/interactive";
import { unlockBadge } from "@/lib/badges";

// ===== TYPE DEFINITIONS =====
type PersonalityAxis = "A" | "C" | "I" | "Co" | "S" | "F" | "L" | "Sp";
type PersonalityArchetype =
  | "The Analyst"
  | "The Researcher"
  | "The Innovator"
  | "The Designer"
  | "The Leader"
  | "The Expert";

interface AssessmentQuestion {
  id: number;
  dimension: "interest" | "personality" | "values";
  question: string;
  options: {
    label: string;
    clusters?: Cluster[];
    personalityAxes?: PersonalityAxis[];
  }[];
}

interface PersonalityProfile {
  A: number;
  C: number;
  I: number;
  Co: number;
  S: number;
  F: number;
  L: number;
  Sp: number;
}

interface CareerMatch {
  slug: CareerSlug;
  title: string;
  cluster: Cluster;
  icon: string;
  matchScore: number;
}

interface AssessmentResults {
  clusterScores: Record<Cluster, number>;
  personalityProfile: PersonalityProfile;
  archetype: PersonalityArchetype;
  topCareers: CareerMatch[];
}

// ===== ASSESSMENT QUESTIONS (18 total) =====
const assessmentQuestions: AssessmentQuestion[] = [
  // Dimension 1: Interest Profile (Q1-Q6)
  {
    id: 1,
    dimension: "interest",
    question: "What kind of weekend project sounds most exciting?",
    options: [
      { label: "Building an app or website", clusters: ["tech"] },
      { label: "Starting a small business or selling something", clusters: ["business"] },
      { label: "Conducting a science experiment", clusters: ["science"] },
      { label: "Creating art, writing, or designing something", clusters: ["creative"] },
    ],
  },
  {
    id: 2,
    dimension: "interest",
    question: "You're browsing YouTube. What do you watch first?",
    options: [
      { label: "Tech reviews or coding tutorials", clusters: ["tech"] },
      { label: "Business success stories or finance tips", clusters: ["business"] },
      { label: "Science documentaries or medical breakthroughs", clusters: ["science"] },
      { label: "Design inspiration or creative process videos", clusters: ["creative"] },
    ],
  },
  {
    id: 3,
    dimension: "interest",
    question: "A friend asks for help. What are you most likely helping with?",
    options: [
      { label: "Fixing their computer or phone", clusters: ["tech"] },
      { label: "Planning their budget or a side hustle idea", clusters: ["business"] },
      { label: "Explaining a science concept or health question", clusters: ["science"] },
      { label: "Designing a poster or editing a video", clusters: ["creative"] },
    ],
  },
  {
    id: 4,
    dimension: "interest",
    question: "What school subject makes you lose track of time?",
    options: [
      { label: "Computer Science or Math", clusters: ["tech"] },
      { label: "Economics or Accountancy", clusters: ["business"] },
      { label: "Biology, Chemistry, or Physics", clusters: ["science"] },
      { label: "Art, Literature, or Social Studies", clusters: ["creative"] },
    ],
  },
  {
    id: 5,
    dimension: "interest",
    question: "Which headline grabs your attention?",
    options: [
      { label: "'New AI breakthrough changes everything'", clusters: ["tech"] },
      { label: "'Young entrepreneur builds ₹10Cr company by 25'", clusters: ["business"] },
      { label: "'Scientists discover new renewable energy source'", clusters: ["science"] },
      { label: "'Award-winning architect redesigns urban living'", clusters: ["creative"] },
    ],
  },
  {
    id: 6,
    dimension: "interest",
    question: "If you had to teach a class, what would it be about?",
    options: [
      { label: "How technology works behind the scenes", clusters: ["tech"] },
      { label: "How money and markets work", clusters: ["business"] },
      { label: "How the human body or nature works", clusters: ["science"] },
      { label: "How to express ideas through art or communication", clusters: ["creative"] },
    ],
  },

  // Dimension 2: Personality Type (Q7-Q12)
  {
    id: 7,
    dimension: "personality",
    question: "How do you prefer to solve problems?",
    options: [
      { label: "Break them into logical steps", personalityAxes: ["A", "S"] },
      { label: "Brainstorm creative solutions", personalityAxes: ["C", "F"] },
      { label: "Research and gather data", personalityAxes: ["A", "I"] },
      { label: "Discuss with others to find answers", personalityAxes: ["Co", "C"] },
    ],
  },
  {
    id: 8,
    dimension: "personality",
    question: "In a group project, you naturally...",
    options: [
      { label: "Take charge and delegate tasks", personalityAxes: ["L", "S"] },
      { label: "Come up with the creative ideas", personalityAxes: ["C", "F"] },
      { label: "Do the detailed research and analysis", personalityAxes: ["A", "Sp"] },
      { label: "Make sure everyone works well together", personalityAxes: ["Co", "L"] },
    ],
  },
  {
    id: 9,
    dimension: "personality",
    question: "Your ideal work environment is...",
    options: [
      { label: "A quiet space where you can focus deeply", personalityAxes: ["I", "S"] },
      { label: "A buzzing creative studio with variety", personalityAxes: ["C", "F"] },
      { label: "A collaborative office with team energy", personalityAxes: ["Co", "F"] },
      { label: "A structured lab or well-organized workspace", personalityAxes: ["A", "S"] },
    ],
  },
  {
    id: 10,
    dimension: "personality",
    question: "When making decisions, you tend to...",
    options: [
      { label: "Analyze all data before deciding", personalityAxes: ["A", "S"] },
      { label: "Go with your gut feeling", personalityAxes: ["C", "F"] },
      { label: "Consider how it affects others", personalityAxes: ["Co", "L"] },
      { label: "Research what experts recommend", personalityAxes: ["A", "Sp"] },
    ],
  },
  {
    id: 11,
    dimension: "personality",
    question: "What stresses you out the most?",
    options: [
      { label: "Having no clear plan or structure", personalityAxes: ["S"] },
      { label: "Being stuck in a rigid routine", personalityAxes: ["F"] },
      { label: "Working completely alone for too long", personalityAxes: ["Co"] },
      { label: "Not having time for deep focused work", personalityAxes: ["I"] },
    ],
  },
  {
    id: 12,
    dimension: "personality",
    question: "What gives you the biggest sense of accomplishment?",
    options: [
      { label: "Solving a complex puzzle or problem", personalityAxes: ["A", "I"] },
      { label: "Creating something beautiful or new", personalityAxes: ["C", "F"] },
      { label: "Leading a team to success", personalityAxes: ["L", "Co"] },
      { label: "Mastering a specialized skill", personalityAxes: ["Sp", "S"] },
    ],
  },

  // Dimension 3: Values & Motivation (Q13-Q18)
  {
    id: 13,
    dimension: "values",
    question: "What matters most in your dream career?",
    options: [
      { label: "High salary and financial security", clusters: ["business", "tech"] },
      { label: "Making a positive impact on society", clusters: ["science", "creative"] },
      { label: "Constant learning and innovation", clusters: ["tech", "science"] },
      { label: "Creative freedom and self-expression", clusters: ["creative", "business"] },
    ],
  },
  {
    id: 14,
    dimension: "values",
    question: "Where do you see yourself in 10 years?",
    options: [
      { label: "Running a team or department", clusters: ["business"] },
      { label: "Being a top expert in my field", clusters: ["tech", "science"] },
      { label: "Working on cutting-edge innovations", clusters: ["tech", "science"] },
      { label: "Making a difference in people's lives", clusters: ["creative", "science"] },
    ],
  },
  {
    id: 15,
    dimension: "values",
    question: "What kind of challenges do you enjoy?",
    options: [
      { label: "Technical problems with definite solutions", clusters: ["tech", "science"] },
      { label: "People problems and negotiations", clusters: ["business", "creative"] },
      { label: "Research questions that need investigation", clusters: ["science", "tech"] },
      { label: "Design challenges with open-ended creativity", clusters: ["creative"] },
    ],
  },
  {
    id: 16,
    dimension: "values",
    question: "Pick your ideal workplace culture:",
    options: [
      { label: "Fast-paced startup with big ambitions", clusters: ["tech", "business"] },
      { label: "Mission-driven organization making change", clusters: ["science", "creative"] },
      { label: "Large corporation with clear growth path", clusters: ["business"] },
      { label: "Small creative team with lots of autonomy", clusters: ["creative"] },
    ],
  },
  {
    id: 17,
    dimension: "values",
    question: "If money didn't matter, what would you spend your days doing?",
    options: [
      { label: "Building and experimenting with technology", clusters: ["tech"] },
      { label: "Mentoring and growing businesses", clusters: ["business"] },
      { label: "Researching and discovering new things", clusters: ["science"] },
      { label: "Creating, designing, and expressing ideas", clusters: ["creative"] },
    ],
  },
  {
    id: 18,
    dimension: "values",
    question: "What's your superpower?",
    options: [
      { label: "I can figure out how anything works", clusters: ["tech"] },
      { label: "I can convince anyone of anything", clusters: ["business"] },
      { label: "I can stay focused for hours on complex problems", clusters: ["science"] },
      { label: "I can see beauty and potential everywhere", clusters: ["creative"] },
    ],
  },
];

// ===== HELPER FUNCTIONS =====
function calculateClusterScores(
  answers: (number | null)[],
  questions: AssessmentQuestion[]
): Record<Cluster, number> {
  const clusters: Record<Cluster, number> = { tech: 0, business: 0, science: 0, creative: 0 };
  const clusterMax: Record<Cluster, number> = { tech: 0, business: 0, science: 0, creative: 0 };

  // Count for interest and values dimensions only
  questions.forEach((q, idx) => {
    if ((q.dimension === "interest" || q.dimension === "values") && answers[idx] !== null) {
      const selectedOption = q.options[answers[idx]!];
      if (selectedOption.clusters) {
        selectedOption.clusters.forEach((cluster) => {
          clusters[cluster]++;
        });
      }
    }

    // Track max possible per cluster (for interest + values dimensions)
    if (q.dimension === "interest" || q.dimension === "values") {
      q.options.forEach((opt) => {
        if (opt.clusters) {
          opt.clusters.forEach((cluster) => {
            clusterMax[cluster]++;
          });
        }
      });
    }
  });

  // Calculate percentages
  const maxPerCluster = 6; // 6 interest + 6 values = 12 questions max per cluster
  const scores: Record<Cluster, number> = { tech: 0, business: 0, science: 0, creative: 0 };
  Object.keys(clusters).forEach((cluster) => {
    scores[cluster as Cluster] = Math.round((clusters[cluster as Cluster] / maxPerCluster) * 100);
  });

  return scores;
}

function calculatePersonalityProfile(
  answers: (number | null)[],
  questions: AssessmentQuestion[]
): PersonalityProfile {
  const profile: PersonalityProfile = { A: 0, C: 0, I: 0, Co: 0, S: 0, F: 0, L: 0, Sp: 0 };

  questions.forEach((q, idx) => {
    if (q.dimension === "personality" && answers[idx] !== null) {
      const selectedOption = q.options[answers[idx]!];
      if (selectedOption.personalityAxes) {
        selectedOption.personalityAxes.forEach((axis) => {
          profile[axis]++;
        });
      }
    }
  });

  return profile;
}

function getPersonalityArchetype(profile: PersonalityProfile): PersonalityArchetype {
  // Determine dominant traits
  const isAnalytical = profile.A > profile.C;
  const isStructured = profile.S > profile.F;
  const isLeader = profile.L > profile.Sp;
  const isIndependent = profile.I > profile.Co;

  if (isAnalytical && isStructured) return "The Analyst";
  if (isAnalytical && !isStructured) return "The Researcher";
  if (!isAnalytical && !isStructured) return "The Innovator";
  if (!isAnalytical && isStructured) return "The Designer";
  if (isLeader && !isIndependent) return "The Leader";
  return "The Expert";
}

function calculateCareerMatches(
  clusterScores: Record<Cluster, number>,
  personalityProfile: PersonalityProfile,
  archetype: PersonalityArchetype
): CareerMatch[] {
  const matches: CareerMatch[] = [];

  Object.entries(careerConfigs).forEach(([slug, career]) => {
    const clusterScore = clusterScores[career.cluster];

    // Personality fit based on career cluster
    let personalityFit = 50;
    if (career.cluster === "tech") {
      const analyticScore = personalityProfile.A - personalityProfile.C;
      personalityFit = 50 + analyticScore * 5;
    } else if (career.cluster === "business") {
      const leaderScore = personalityProfile.L - personalityProfile.Sp;
      const collab = personalityProfile.Co - personalityProfile.I;
      personalityFit = 50 + (leaderScore + collab) * 3;
    } else if (career.cluster === "science") {
      const analyticScore = personalityProfile.A - personalityProfile.C;
      personalityFit = 50 + analyticScore * 5;
    } else if (career.cluster === "creative") {
      const creativeScore = personalityProfile.C - personalityProfile.A;
      personalityFit = 50 + creativeScore * 5;
    }

    // Value alignment (all careers benefit from learning and growth)
    const valueAlignment = 70;

    // Final score: weighted average
    const matchScore = Math.round(
      clusterScore * 0.6 + personalityFit * 0.25 + valueAlignment * 0.15
    );

    matches.push({
      slug: slug as CareerSlug,
      title: career.title,
      cluster: career.cluster,
      icon: career.icon,
      matchScore,
    });
  });

  // Sort by match score (descending) and return top 5
  return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}

// ===== MAIN COMPONENT =====
export default function AssessmentPage() {
  const [phase, setPhase] = useState<"welcome" | "questions" | "results">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(18).fill(null));
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate results when all questions answered
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Auto-advance after small delay
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion < 17) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        // All questions answered, calculate results
        const clusterScores = calculateClusterScores(newAnswers, assessmentQuestions);
        const personalityProfile = calculatePersonalityProfile(newAnswers, assessmentQuestions);
        const archetype = getPersonalityArchetype(personalityProfile);
        const topCareers = calculateCareerMatches(
          clusterScores,
          personalityProfile,
          archetype
        );

        setResults({
          clusterScores,
          personalityProfile,
          archetype,
          topCareers,
        });

        // Show analyzing animation
        setTimeout(() => {
          setPhase("results");
          setShowConfetti(true);
          unlockBadge("assessment-master");
        }, 2000);
      }
    }, 500);
  };

  const getDimensionLabel = (idx: number): string => {
    if (idx < 6) return "Interest Profile";
    if (idx < 12) return "Personality Type";
    return "Values & Motivation";
  };

  // Personality axes visualization
  const personalityAxes = results ? [
    { label: "Analytical", left: results.personalityProfile.A, right: results.personalityProfile.C, rightLabel: "Creative" },
    { label: "Independent", left: results.personalityProfile.I, right: results.personalityProfile.Co, rightLabel: "Collaborative" },
    { label: "Structured", left: results.personalityProfile.S, right: results.personalityProfile.F, rightLabel: "Flexible" },
    { label: "Leader", left: results.personalityProfile.L, right: results.personalityProfile.Sp, rightLabel: "Specialist" },
  ] : [];

  return (
    <>
      <ConfettiEffect trigger={showConfetti} duration={3000} />

      {phase === "welcome" && (
        <div className="min-h-screen flex flex-col">
          <InteractiveHero
            badge="Interactive Assessment"
            title="Career Assessment"
            subtitle="Discover careers that match your personality, interests, and values"
            accentColor="indigo"
          />

          <div className="flex-1 bg-white py-16 px-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  A quick 18-question psychometric-style assessment (~5 minutes)
                </p>
                <p className="text-gray-500">
                  Inspired by professional assessments, gamified and fun for students
                </p>
              </div>

              <div className="flex justify-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">18</div>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">~5</div>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">20</div>
                  <p className="text-sm text-gray-600">Career Matches</p>
                </div>
              </div>

              <button
                onClick={() => setPhase("questions")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 animate-pulse-glow"
              >
                Start Assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === "questions" && currentQuestion < 18 && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col py-12 px-6">
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-8">
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400 mb-4">
                {getDimensionLabel(currentQuestion)}
              </div>
              <ProgressIndicator
                current={currentQuestion + 1}
                total={18}
                label="Question"
              />
            </div>

            {/* Question Container */}
            <div
              className={`space-y-6 ${isTransitioning ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
              {/* Question Text */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {assessmentQuestions[currentQuestion].question}
                </h2>
              </div>

              {/* Answer Options - 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessmentQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="group relative p-6 rounded-xl glass-dark border border-gray-700 hover:border-indigo-500/50 text-left transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 card-hover"
                  >
                    {/* Icon circle */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/40 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Option Text */}
                    <p className="text-base md:text-lg font-medium text-gray-100 pr-8">
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question counter */}
            <div className="text-center text-sm text-gray-500">
              Question {currentQuestion + 1} of 18
            </div>
          </div>
        </div>
      )}

      {phase === "results" && results && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Section 1: Personality Archetype */}
            <section className="animate-fade-in-up space-y-6">
              <div className="text-center space-y-4">
                <div className="text-5xl md:text-6xl mb-4">
                  {results.archetype === "The Analyst" && "🔬"}
                  {results.archetype === "The Researcher" && "🔍"}
                  {results.archetype === "The Innovator" && "💡"}
                  {results.archetype === "The Designer" && "🎨"}
                  {results.archetype === "The Leader" && "🦁"}
                  {results.archetype === "The Expert" && "🏆"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {results.archetype}
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  {results.archetype === "The Analyst" && "You're a methodical problem solver who excels with data, logic, and structured approaches."}
                  {results.archetype === "The Researcher" && "You're a curious investigator who loves exploring new ideas and understanding complex concepts."}
                  {results.archetype === "The Innovator" && "You're an imaginative creator who thrives on bringing new ideas to life and breaking conventions."}
                  {results.archetype === "The Designer" && "You're an organized creative who combines artistic vision with structured execution."}
                  {results.archetype === "The Leader" && "You're a natural team captain who excels at inspiring and guiding others toward common goals."}
                  {results.archetype === "The Expert" && "You're a deep knowledge seeker who finds fulfillment in mastering specialized skills."}
                </p>
              </div>
            </section>

            {/* Section 2: Cluster Scores */}
            <section className="animate-fade-in-up space-y-6" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-2xl font-bold text-white">Your Cluster Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(clusterConfigs) as Cluster[]).map((cluster) => {
                  const config = clusterConfigs[cluster];
                  const score = results.clusterScores[cluster];
                  return (
                    <div key={cluster} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-300">{config.title}</span>
                        <span className="text-sm font-bold text-white">{score}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${score}%`,
                            backgroundColor: config.accent,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Top 5 Career Matches */}
            <section className="animate-fade-in-up space-y-6" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold text-white">Your Top 5 Career Matches</h3>
              <div className="space-y-4">
                {results.topCareers.map((career, idx) => {
                  const clusterConfig = clusterConfigs[career.cluster];
                  const isTopMatch = idx === 0;
                  return (
                    <Link
                      key={career.slug}
                      href={`/careers/${career.slug}`}
                      className={`group block ${isTopMatch ? "scale-105" : ""} transition-transform`}
                    >
                      <div
                        className={`p-6 rounded-xl border transition-all duration-300 card-hover ${
                          isTopMatch
                            ? "bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20"
                            : "glass-dark border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="text-4xl">{career.icon}</div>
                            <div className="flex-1">
                              <h4 className="text-lg md:text-xl font-bold text-white mb-1">
                                {career.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${clusterConfig.badgeClass}`}
                                >
                                  {clusterConfig.title}
                                </span>
                                {isTopMatch && (
                                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                                    Best Match
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl md:text-3xl font-bold text-white">
                              {career.matchScore}%
                            </div>
                            <p className="text-xs text-gray-400">Match</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Section 4: Personality Breakdown */}
            <section className="animate-fade-in-up space-y-6" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-bold text-white">Your Personality Profile</h3>
              <div className="space-y-8 glass-dark rounded-xl p-8 border border-gray-700">
                {personalityAxes.map((axis, idx) => {
                  const total = axis.left + axis.right;
                  const leftPercent = total > 0 ? (axis.left / total) * 100 : 50;
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300 font-medium">{axis.label}</span>
                        <span className="text-gray-400 text-xs">
                          {axis.left} · {axis.right}
                        </span>
                        <span className="text-gray-300 font-medium text-right">{axis.rightLabel}</span>
                      </div>
                      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                          style={{ width: `${leftPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 5: Share & Actions */}
            <section className="animate-fade-in-up text-center space-y-6" style={{ animationDelay: "0.4s" }}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Share Your Results</h3>
                <div className="flex justify-center">
                  <ShareButton
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    title="CareerTalks Career Assessment"
                    description={`I took the CareerTalks Career Assessment and I'm ${results.archetype}! My top match is ${results.topCareers[0]?.title}.`}
                    prefilledMessage={`I took the CareerTalks Career Assessment and I'm ${results.archetype}! My top match is ${results.topCareers[0]?.title}. Discover yours at careertalks.in`}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setPhase("welcome");
                  setCurrentQuestion(0);
                  setAnswers(Array(18).fill(null));
                  setResults(null);
                  setShowConfetti(false);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake Assessment
              </button>
            </section>
          </div>
        </div>
      )}

      {phase === "results" && !results && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center py-16 px-6">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-spin" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Analyzing your responses...
              </h2>
              <p className="text-gray-300">
                We're matching you with the perfect careers
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
