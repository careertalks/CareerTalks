"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  careerConfigs,
  clusterConfigs,
  Cluster,
  CareerSlug,
  getCareersByCluster,
} from "@/lib/career-config";
import { unlockBadge } from "@/lib/badges";
import ShareButton from "@/components/ShareButton";
import { InteractiveHero, ConfettiEffect } from "@/components/interactive";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    icon: string;
    cluster: Cluster;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Pick your ideal weekend activity:",
    options: [
      { label: "Hackathon or coding", icon: "🖥️", cluster: "tech" },
      {
        label: "Networking event or market research",
        icon: "💼",
        cluster: "business",
      },
      {
        label: "Science fair or nature documentary",
        icon: "🔬",
        cluster: "science",
      },
      { label: "Art workshop or design jam", icon: "🎨", cluster: "creative" },
    ],
  },
  {
    id: 2,
    question: "Your dream project would be:",
    options: [
      {
        label: "Building an app that millions use",
        icon: "📱",
        cluster: "tech",
      },
      {
        label: "Growing a business from zero to profit",
        icon: "📈",
        cluster: "business",
      },
      {
        label: "Discovering something no one has before",
        icon: "🔍",
        cluster: "science",
      },
      {
        label: "Creating something beautiful that inspires people",
        icon: "✨",
        cluster: "creative",
      },
    ],
  },
  {
    id: 3,
    question: "In a team, you're usually the one who:",
    options: [
      {
        label: "Figures out the technical solution",
        icon: "⚙️",
        cluster: "tech",
      },
      {
        label: "Makes the plan and keeps everyone on track",
        icon: "🎯",
        cluster: "business",
      },
      { label: "Does the research and finds the facts", icon: "📚", cluster: "science" },
      {
        label: "Comes up with the creative ideas",
        icon: "💡",
        cluster: "creative",
      },
    ],
  },
  {
    id: 4,
    question: "The news story that excites you most:",
    options: [
      {
        label: "A breakthrough in AI or space tech",
        icon: "🚀",
        cluster: "tech",
      },
      {
        label: "A startup that just raised ₹100 Crore",
        icon: "💰",
        cluster: "business",
      },
      {
        label: "A new medical discovery",
        icon: "⚕️",
        cluster: "science",
      },
      {
        label: "An innovative building or art installation",
        icon: "🏛️",
        cluster: "creative",
      },
    ],
  },
  {
    id: 5,
    question: "Your friends come to you for help with:",
    options: [
      {
        label: "Fixing phones, computers, or WiFi",
        icon: "🔧",
        cluster: "tech",
      },
      {
        label: "Money advice or career planning",
        icon: "💳",
        cluster: "business",
      },
      {
        label: "Science homework or health questions",
        icon: "🧪",
        cluster: "science",
      },
      {
        label: "Design, fashion, or creative projects",
        icon: "👗",
        cluster: "creative",
      },
    ],
  },
  {
    id: 6,
    question: "Pick a superpower:",
    options: [
      {
        label: "Super intelligence",
        icon: "🧠",
        cluster: "tech",
      },
      {
        label: "Everything you touch turns to gold",
        icon: "💎",
        cluster: "business",
      },
      {
        label: "X-ray vision (see how things work)",
        icon: "👁️",
        cluster: "science",
      },
      {
        label: "Create anything you imagine",
        icon: "🎭",
        cluster: "creative",
      },
    ],
  },
];

interface PlayerAnswers {
  name: string;
  answers: Cluster[];
  scores: Record<Cluster, number>;
}

type Phase =
  | "setup"
  | "player1"
  | "handoff"
  | "player2"
  | "results";

export default function CompatibilityPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Data, setPlayer1Data] = useState<PlayerAnswers | null>(null);
  const [player2Data, setPlayer2Data] = useState<PlayerAnswers | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPlayerAnswers, setCurrentPlayerAnswers] = useState<Cluster[]>(
    []
  );
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    unlockBadge("compatibility-checker");
  }, []);

  const calculateScores = (answers: Cluster[]): Record<Cluster, number> => {
    return {
      tech: answers.filter((c) => c === "tech").length,
      business: answers.filter((c) => c === "business").length,
      science: answers.filter((c) => c === "science").length,
      creative: answers.filter((c) => c === "creative").length,
    };
  };

  const handleStartGame = () => {
    if (!player1Name.trim()) setPlayer1Name("Player 1");
    if (!player2Name.trim()) setPlayer2Name("Player 2");
    setPhase("player1");
  };

  const handleAnswerSelected = (cluster: Cluster) => {
    setCurrentPlayerAnswers([...currentPlayerAnswers, cluster]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Player finished all questions
      const scores = calculateScores(currentPlayerAnswers);
      if (phase === "player1") {
        setPlayer1Data({
          name: player1Name || "Player 1",
          answers: currentPlayerAnswers,
          scores,
        });
        setCurrentQuestionIndex(0);
        setCurrentPlayerAnswers([]);
        setPhase("handoff");
      } else {
        setPlayer2Data({
          name: player2Name || "Player 2",
          answers: currentPlayerAnswers,
          scores,
        });
        setShowConfetti(true);
        setPhase("results");
      }
    }
  };

  const handleProceedToPlayer2 = () => {
    setCurrentQuestionIndex(0);
    setCurrentPlayerAnswers([]);
    setPhase("player2");
  };

  // Results calculations
  const calculateCompatibility = (): number => {
    if (!player1Data || !player2Data) return 0;

    const clusters: Cluster[] = ["tech", "business", "science", "creative"];
    let totalDifference = 0;

    clusters.forEach((cluster) => {
      const p1Score = (player1Data.scores[cluster] / 6) * 100;
      const p2Score = (player2Data.scores[cluster] / 6) * 100;
      totalDifference += Math.abs(p1Score - p2Score);
    });

    const avgDifference = totalDifference / clusters.length;
    return Math.max(0, 100 - avgDifference);
  };

  const getCompatibilityLabel = (score: number) => {
    if (score > 70) return { emoji: "💫", title: "Career Soulmates!", desc: "You two are on the same wavelength" };
    if (score >= 40)
      return { emoji: "🤝", title: "Dynamic Duo!", desc: "Different strengths, great together" };
    return { emoji: "☯️", title: "Yin & Yang!", desc: "You complement each other perfectly" };
  };

  const getTopCareersForPlayer = (playerData: PlayerAnswers): CareerSlug[] => {
    const clusterScores = playerData.scores;
    const topCluster = (
      Object.entries(clusterScores) as [Cluster, number][]
    ).sort((a, b) => b[1] - a[1])[0][0];

    const careersInCluster = getCareersByCluster(topCluster);
    return careersInCluster.slice(0, 2).map((c) => c.slug);
  };

  const getBestTeamCareer = (): CareerSlug => {
    if (!player1Data || !player2Data) return "ai-data-science";

    const clusterScores: Record<Cluster, number> = {
      tech: player1Data.scores.tech + player2Data.scores.tech,
      business: player1Data.scores.business + player2Data.scores.business,
      science: player1Data.scores.science + player2Data.scores.science,
      creative: player1Data.scores.creative + player2Data.scores.creative,
    };

    const topCluster = (
      Object.entries(clusterScores) as [Cluster, number][]
    ).sort((a, b) => b[1] - a[1])[0][0];

    const careersInCluster = getCareersByCluster(topCluster);
    return careersInCluster[0].slug;
  };

  // PHASE 1: Setup
  if (phase === "setup") {
    return (
      <>
        <InteractiveHero
          badge="🎤 2-Player Game"
          title="Career Compatibility"
          highlightedText="Compatibility"
          subtitle="Compare career interests with a friend! Are you career soulmates or perfect opposites? Find out in 3 minutes."
          accentColor="violet"
        />

        <div className="w-full bg-slate-900">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Player 1 Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="Player 1"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Player 2 Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="Player 2"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>

              <button
                onClick={handleStartGame}
                className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Start!
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // PHASE 2: Player 1's Turn
  if (phase === "player1") {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = currentPlayerAnswers.length > currentQuestionIndex;

    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div
            className="mb-8 text-center p-6 rounded-xl"
            style={{
              backgroundColor: clusterConfigs.tech.accentBg,
              borderLeft: `4px solid ${clusterConfigs.tech.accent}`,
            }}
          >
            <p className="text-lg font-bold text-gray-800">
              🎤 {player1Name || "Player 1"}'s Turn!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Pass to {player2Name || "Player 2"} when done — no peeking!
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-400">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-violet-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentPlayerAnswers[currentQuestionIndex] === option.cluster;
                const clusterConfig = clusterConfigs[option.cluster];

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const newAnswers = [...currentPlayerAnswers];
                      newAnswers[currentQuestionIndex] = option.cluster;
                      setCurrentPlayerAnswers(newAnswers);
                    }}
                    className={`p-6 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                      isSelected
                        ? `bg-gradient-to-r ${clusterConfig.gradientFrom} ${clusterConfig.gradientTo} text-white shadow-lg scale-105`
                        : "bg-slate-700 text-gray-200 hover:bg-slate-600 border border-slate-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`flex-1 px-6 py-3 font-medium rounded-lg transition-all ${
                isAnswered
                  ? "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white"
                  : "bg-slate-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PHASE 3: Handoff
  if (phase === "handoff" && player1Data) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {player1Name || "Player 1"} is done!
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Now hand the device to {player2Name || "Player 2"}
          </p>

          <button
            onClick={handleProceedToPlayer2}
            className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
          >
            I'm {player2Name || "Player 2"}, let's go!
          </button>
        </div>
      </div>
    );
  }

  // PHASE 4: Player 2's Turn
  if (phase === "player2") {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = currentPlayerAnswers.length > currentQuestionIndex;

    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div
            className="mb-8 text-center p-6 rounded-xl"
            style={{
              backgroundColor: clusterConfigs.business.accentBg,
              borderLeft: `4px solid ${clusterConfigs.business.accent}`,
            }}
          >
            <p className="text-lg font-bold text-gray-800">
              🎤 {player2Name || "Player 2"}'s Turn!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {player1Name || "Player 1"} took a break — don't let them peek!
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-400">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentPlayerAnswers[currentQuestionIndex] === option.cluster;
                const clusterConfig = clusterConfigs[option.cluster];

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const newAnswers = [...currentPlayerAnswers];
                      newAnswers[currentQuestionIndex] = option.cluster;
                      setCurrentPlayerAnswers(newAnswers);
                    }}
                    className={`p-6 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                      isSelected
                        ? `bg-gradient-to-r ${clusterConfig.gradientFrom} ${clusterConfig.gradientTo} text-white shadow-lg scale-105`
                        : "bg-slate-700 text-gray-200 hover:bg-slate-600 border border-slate-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`flex-1 px-6 py-3 font-medium rounded-lg transition-all ${
                isAnswered
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                  : "bg-slate-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? "See Results!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PHASE 5: Results
  if (phase === "results" && player1Data && player2Data) {
    const compatibility = calculateCompatibility();
    const compatLabel = getCompatibilityLabel(compatibility);
    const bestTeamCareer = getBestTeamCareer();
    const player1TopCareers = getTopCareersForPlayer(player1Data);
    const player2TopCareers = getTopCareersForPlayer(player2Data);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareMessage = `${player1Data.name} & ${player2Data.name} are ${Math.round(compatibility)}% career compatible! Our best team career: ${careerConfigs[bestTeamCareer].shortTitle}`;

    return (
      <>
        <ConfettiEffect trigger={showConfetti} duration={4000} />

        <InteractiveHero
          badge="🎊 Results!"
          title="Compatibility Results"
          highlightedText="Results"
          subtitle={`${player1Data.name} & ${player2Data.name}'s career match`}
          accentColor="violet"
        />

        <div className="w-full bg-slate-900">
          <div className="max-w-5xl mx-auto px-6 py-16">
            {/* Section 1: Compatibility Score */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-12 border border-slate-600 text-center">
                <div className="mb-6">
                  <span className="text-7xl">{compatLabel.emoji}</span>
                </div>

                <div
                  className="w-40 h-40 mx-auto mb-8 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      #A78BFA 0deg,
                      #A78BFA ${(compatibility / 100) * 360}deg,
                      #374151 ${(compatibility / 100) * 360}deg,
                      #374151 360deg
                    )`,
                    padding: "4px",
                  }}
                >
                  <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-violet-300">
                      {Math.round(compatibility)}%
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  {compatLabel.title}
                </h2>
                <p className="text-lg text-gray-300">{compatLabel.desc}</p>
              </div>
            </div>

            {/* Section 2: Career Cluster Breakdown */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Career Cluster Breakdown
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Player 1 */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <h4 className="text-xl font-bold text-white mb-6 text-center">
                    {player1Data.name}
                  </h4>

                  <div className="space-y-4">
                    {(["tech", "business", "science", "creative"] as Cluster[]).map(
                      (cluster) => {
                        const percentage = (player1Data.scores[cluster] / 6) * 100;
                        const config = clusterConfigs[cluster];

                        return (
                          <div key={cluster}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-300">
                                {config.title}
                              </span>
                              <span className="text-sm font-bold text-white">
                                {Math.round(percentage)}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: config.accent,
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Player 2 */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <h4 className="text-xl font-bold text-white mb-6 text-center">
                    {player2Data.name}
                  </h4>

                  <div className="space-y-4">
                    {(["tech", "business", "science", "creative"] as Cluster[]).map(
                      (cluster) => {
                        const percentage = (player2Data.scores[cluster] / 6) * 100;
                        const config = clusterConfigs[cluster];

                        return (
                          <div key={cluster}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-300">
                                {config.title}
                              </span>
                              <span className="text-sm font-bold text-white">
                                {Math.round(percentage)}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: config.accent,
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Best Team Career */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                If You Worked Together...
              </h3>

              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-12 border border-slate-600 text-center">
                <div className="mb-6">
                  <span className="text-7xl">
                    {careerConfigs[bestTeamCareer].icon}
                  </span>
                </div>

                <h4 className="text-3xl font-bold text-white mb-4">
                  {careerConfigs[bestTeamCareer].title}
                </h4>

                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  Your combined strengths would make you an amazing team in{" "}
                  <span className="font-bold text-violet-300">
                    {careerConfigs[bestTeamCareer].shortTitle}
                  </span>
                  . Your complementary skills and shared interests align perfectly for this career
                  path!
                </p>

                <Link
                  href={`/careers/${bestTeamCareer}`}
                  className="inline-block bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Section 4: Individual Top Matches */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Your Individual Top Matches
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Player 1 Top Careers */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white text-center mb-6">
                    {player1Data.name}'s Best Fit
                  </h4>
                  {player1TopCareers.map((slug) => {
                    const career = careerConfigs[slug];
                    return (
                      <Link
                        key={slug}
                        href={`/careers/${slug}`}
                        className="block bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border border-slate-700 transition-all duration-200 hover:border-violet-500"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{career.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-bold text-white text-lg mb-1">
                              {career.title}
                            </h5>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {career.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Player 2 Top Careers */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white text-center mb-6">
                    {player2Data.name}'s Best Fit
                  </h4>
                  {player2TopCareers.map((slug) => {
                    const career = careerConfigs[slug];
                    return (
                      <Link
                        key={slug}
                        href={`/careers/${slug}`}
                        className="block bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border border-slate-700 transition-all duration-200 hover:border-violet-500"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{career.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-bold text-white text-lg mb-1">
                              {career.title}
                            </h5>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {career.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 5: Share & Play Again */}
            <div className="bg-slate-800 rounded-2xl p-12 border border-slate-700 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Share Your Results
              </h3>

              <div className="mb-8">
                <ShareButton
                  url={shareUrl}
                  title={shareMessage}
                  description={`${player1Data.name} & ${player2Data.name} are ${Math.round(compatibility)}% career compatible!`}
                  prefilledMessage={shareMessage}
                />
              </div>

              <button
                onClick={() => {
                  setPhase("setup");
                  setPlayer1Name("");
                  setPlayer2Name("");
                  setPlayer1Data(null);
                  setPlayer2Data(null);
                  setCurrentQuestionIndex(0);
                  setCurrentPlayerAnswers([]);
                  setShowConfetti(false);
                }}
                className="inline-block bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 ml-4"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
