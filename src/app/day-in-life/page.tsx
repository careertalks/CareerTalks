"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs, type CareerSlug, type Cluster } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";
import { ConfettiEffect } from "@/components/interactive";
import { unlockBadge } from "@/lib/badges";

interface Moment {
  time: string;
  scenario: string;
  options: {
    text: string;
    trait: string;
  }[];
}

interface ScenarioData {
  moments: Moment[];
  startTime: string;
}

type CareerScenarios = Partial<Record<CareerSlug, ScenarioData>>;

// Scenario data for each career
const careerScenarios: CareerScenarios = {
  "software-development": {
    startTime: "9:00 AM",
    moments: [
      {
        time: "9:00 AM",
        scenario: "Your team lead asks for a status update on the login bug. What do you say?",
        options: [
          { text: "I found the root cause, fixing it today", trait: "Confidence" },
          { text: "Still investigating, need help from backend team", trait: "Teamwork" },
        ],
      },
      {
        time: "11:00 AM",
        scenario: "A junior dev submitted code with a subtle security flaw. How do you handle it?",
        options: [
          { text: "Leave a detailed comment explaining the fix", trait: "Mentorship" },
          { text: "Fix it yourself to save time", trait: "Efficiency" },
        ],
      },
      {
        time: "1:00 PM",
        scenario: "The team needs to choose between building a feature from scratch or using a library. Your call?",
        options: [
          { text: "Build from scratch — more control", trait: "Technical Depth" },
          { text: "Use the library — ship faster", trait: "Pragmatism" },
        ],
      },
      {
        time: "3:00 PM",
        scenario: "The app is crashing for some users! What's your first move?",
        options: [
          { text: "Check error logs and monitoring dashboards", trait: "Analytical" },
          { text: "Roll back the last deployment immediately", trait: "Decisiveness" },
        ],
      },
      {
        time: "5:00 PM",
        scenario: "You have an hour of free time. How do you spend it?",
        options: [
          { text: "Try out a new programming language", trait: "Curiosity" },
          { text: "Refactor some messy legacy code", trait: "Craftsmanship" },
        ],
      },
    ],
  },
  "product-management": {
    startTime: "9:00 AM",
    moments: [
      {
        time: "9:00 AM",
        scenario: "Three stakeholders each want different features built first. What's your approach?",
        options: [
          { text: "Look at data to see what users need most", trait: "Data-Driven" },
          { text: "Negotiate a compromise that partially satisfies all", trait: "Diplomacy" },
        ],
      },
      {
        time: "10:30 AM",
        scenario: "A user interview reveals people use your product differently than expected. React?",
        options: [
          { text: "Redesign the flow to match actual behavior", trait: "User Empathy" },
          { text: "Add analytics to understand the full pattern first", trait: "Strategic" },
        ],
      },
      {
        time: "1:00 PM",
        scenario: "The engineering team says the feature will take 3 weeks. Marketing wants it in 1. What do you do?",
        options: [
          { text: "Negotiate scope — ship a smaller version first", trait: "Pragmatism" },
          { text: "Push back on marketing with realistic timelines", trait: "Honesty" },
        ],
      },
      {
        time: "3:00 PM",
        scenario: "A competitor just launched a similar feature. Your CEO asks for a response.",
        options: [
          { text: "Focus on our unique strengths instead", trait: "Strategic" },
          { text: "Accelerate our roadmap to match", trait: "Competitive" },
        ],
      },
      {
        time: "5:00 PM",
        scenario: "Quarterly planning is coming up. How do you prepare?",
        options: [
          { text: "Gather input from every team", trait: "Collaborative" },
          { text: "Build a vision doc with your best ideas first", trait: "Visionary" },
        ],
      },
    ],
  },
  "healthcare-management": {
    startTime: "8:00 AM",
    moments: [
      {
        time: "8:00 AM",
        scenario: "A patient's test results are unusual but not alarming. What do you do?",
        options: [
          { text: "Order additional tests to be thorough", trait: "Thoroughness" },
          { text: "Monitor and reassess in 24 hours", trait: "Clinical Judgment" },
        ],
      },
      {
        time: "10:00 AM",
        scenario: "You need to explain a complex diagnosis to a worried family. Your approach?",
        options: [
          { text: "Use simple language and visual aids", trait: "Communication" },
          { text: "Give them time to ask questions", trait: "Empathy" },
        ],
      },
      {
        time: "12:00 PM",
        scenario: "A patient requests an unnecessary procedure they read about online. How do you respond?",
        options: [
          { text: "Explain why it's not recommended with evidence", trait: "Evidence-Based" },
          { text: "Listen to their concerns first, then educate", trait: "Patient-Centered" },
        ],
      },
      {
        time: "2:00 PM",
        scenario: "Multiple patients arrive at once. How do you triage?",
        options: [
          { text: "Follow the severity protocol strictly", trait: "Systematic" },
          { text: "Quickly assess and use your instinct", trait: "Decisiveness" },
        ],
      },
      {
        time: "4:00 PM",
        scenario: "A new research paper challenges current treatment methods. Your reaction?",
        options: [
          { text: "Read it thoroughly and evaluate the evidence", trait: "Scholarly" },
          { text: "Discuss it with colleagues for multiple perspectives", trait: "Collaborative" },
        ],
      },
    ],
  },
  "digital-marketing": {
    startTime: "9:00 AM",
    moments: [
      {
        time: "9:00 AM",
        scenario: "Last week's campaign had great clicks but low conversions. What's your move?",
        options: [
          { text: "A/B test the landing page", trait: "Data-Driven" },
          { text: "Rethink the messaging and audience targeting", trait: "Strategic" },
        ],
      },
      {
        time: "11:00 AM",
        scenario: "A social media post went viral for the wrong reasons. What do you do?",
        options: [
          { text: "Draft a thoughtful response immediately", trait: "Crisis Management" },
          { text: "Take it down and analyze what went wrong", trait: "Analytical" },
        ],
      },
      {
        time: "1:00 PM",
        scenario: "You need to justify your ad spend. The CEO wants results.",
        options: [
          { text: "Present ROI metrics and attribution data", trait: "Analytical" },
          { text: "Tell the story of customer journeys and brand impact", trait: "Storytelling" },
        ],
      },
      {
        time: "3:00 PM",
        scenario: "A new platform is gaining traction with your target audience. Do you...",
        options: [
          { text: "Run a small experimental campaign there", trait: "Innovation" },
          { text: "Research it more before committing budget", trait: "Cautious" },
        ],
      },
      {
        time: "5:00 PM",
        scenario: "You need content for next week. How do you approach it?",
        options: [
          { text: "Check what competitors are posting for inspiration", trait: "Competitive" },
          { text: "Survey your audience about what they want", trait: "User-Focused" },
        ],
      },
    ],
  },
  "architecture-planning": {
    startTime: "8:00 AM",
    moments: [
      {
        time: "8:00 AM",
        scenario: "The client wants a modern design but the budget is tight. Your response?",
        options: [
          { text: "Propose creative cost-saving alternatives", trait: "Resourceful" },
          { text: "Be upfront about what's realistic", trait: "Honest" },
        ],
      },
      {
        time: "10:00 AM",
        scenario: "The building site has an unusual shape. How do you approach it?",
        options: [
          { text: "See it as an opportunity for creative design", trait: "Creative" },
          { text: "Study successful buildings on similar sites", trait: "Research" },
        ],
      },
      {
        time: "12:00 PM",
        scenario: "Adding solar panels would increase cost 15% but save money long-term.",
        options: [
          { text: "Advocate strongly for the green option", trait: "Sustainability" },
          { text: "Present both options with data for the client to decide", trait: "Client-Focused" },
        ],
      },
      {
        time: "2:00 PM",
        scenario: "The builder says your design is too complex to construct. What do you do?",
        options: [
          { text: "Simplify the design while keeping the vision", trait: "Pragmatism" },
          { text: "Find a more skilled contractor", trait: "Quality" },
        ],
      },
      {
        time: "4:00 PM",
        scenario: "A design magazine wants to feature your work. How do you present it?",
        options: [
          { text: "Focus on the story and impact of the project", trait: "Storytelling" },
          { text: "Highlight the technical innovations", trait: "Technical" },
        ],
      },
    ],
  },
  "business-entrepreneurship": {
    startTime: "7:00 AM",
    moments: [
      {
        time: "7:00 AM",
        scenario: "It's early, your to-do list is overwhelming. First priority?",
        options: [
          { text: "Revenue — close that pending deal", trait: "Business Acumen" },
          { text: "Product — fix the bug users are complaining about", trait: "User-Focused" },
        ],
      },
      {
        time: "10:00 AM",
        scenario: "An investor asks 'What makes you different from competitors?'",
        options: [
          { text: "Our technology is 10x better", trait: "Technical" },
          { text: "Our team's deep understanding of the customer", trait: "Market" },
        ],
      },
      {
        time: "12:00 PM",
        scenario: "You can hire someone experienced but expensive, or train someone new.",
        options: [
          { text: "Invest in the experienced hire — speed matters", trait: "Pragmatic" },
          { text: "Train someone — build culture and loyalty", trait: "Culture" },
        ],
      },
      {
        time: "3:00 PM",
        scenario: "Customer data shows people use your product for something you didn't intend.",
        options: [
          { text: "Pivot to serve the unexpected use case", trait: "Adaptive" },
          { text: "Stay focused on the original vision", trait: "Visionary" },
        ],
      },
      {
        time: "5:00 PM",
        scenario: "Your co-founder wants to work through the weekend. What do you say?",
        options: [
          { text: "Let's do it — we're in growth mode", trait: "Driven" },
          { text: "Let's rest and come back sharper Monday", trait: "Sustainable" },
        ],
      },
    ],
  },
};

interface TraitScore {
  trait: string;
  count: number;
}

interface DayResults {
  career: CareerSlug;
  traits: TraitScore[];
  totalMoments: number;
}

export default function DayInLifePage() {
  const [phase, setPhase] = useState<"selection" | "simulation" | "complete">("selection");
  const [selectedCareer, setSelectedCareer] = useState<CareerSlug | null>(null);
  const [currentMoment, setCurrentMoment] = useState(0);
  const [traitScores, setTraitScores] = useState<Record<string, number>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Featured careers for the simulator
  const featuredCareers: CareerSlug[] = [
    "software-development",
    "product-management",
    "healthcare-management",
    "digital-marketing",
    "architecture-planning",
    "business-entrepreneurship",
  ];

  const handleCareerSelect = (careerSlug: CareerSlug) => {
    setSelectedCareer(careerSlug);
    setTraitScores({});
    setCurrentMoment(0);
    setPhase("simulation");
  };

  const handleChoice = (trait: string) => {
    setFadeOut(true);
    setTraitScores((prev) => ({
      ...prev,
      [trait]: (prev[trait] || 0) + 1,
    }));

    const scenarios = selectedCareer && careerScenarios[selectedCareer];
    if (!scenarios) return;

    setTimeout(() => {
      if (currentMoment < scenarios.moments.length - 1) {
        setCurrentMoment(currentMoment + 1);
        setFadeOut(false);
      } else {
        setPhase("complete");
        setShowConfetti(true);
        // Unlock the day-explorer badge
        unlockBadge("day-explorer");
      }
    }, 1500);
  };

  const handleTryAnother = () => {
    setPhase("selection");
    setSelectedCareer(null);
    setCurrentMoment(0);
    setTraitScores({});
    setShowConfetti(false);
  };

  if (phase === "selection") {
    return (
      <>
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-dark noise-overlay">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
            <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="text-sm">🎬</span>
              <span className="text-xs font-semibold text-indigo-200 tracking-wide">
                Interactive Simulator
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Day in the <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Life</span>
            </h1>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Experience a typical day in different careers. Make decisions, solve problems, and discover your work style.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 40L60 37C120 34 240 28 360 25C480 22 600 22 720 25C840 28 960 34 1080 34C1200 34 1320 28 1380 25L1440 22V40H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Career Grid */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCareers.map((slug, idx) => {
                const career = careerConfigs[slug];
                const cluster = clusterConfigs[career.cluster];

                return (
                  <button
                    key={slug}
                    onClick={() => handleCareerSelect(slug)}
                    className="group relative rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 career-card-enter"
                    style={{
                      borderColor: cluster.accent,
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  >
                    {/* Colored accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: cluster.accent }}
                    />

                    {/* Content */}
                    <div className="p-6">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                          style={{ backgroundColor: cluster.accentBg }}
                        >
                          {career.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {career.shortTitle}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {cluster.title}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-6 line-clamp-3 text-left">
                        {career.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Start
                        </span>
                        <svg
                          className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (phase === "simulation" && selectedCareer) {
    const career = careerConfigs[selectedCareer];
    const cluster = clusterConfigs[career.cluster];
    const scenarios = careerScenarios[selectedCareer];

    if (!scenarios) return null;

    const moment = scenarios.moments[currentMoment];
    const progress = ((currentMoment) / scenarios.moments.length) * 100;

    return (
      <>
        {/* Career Header */}
        <div
          className="sticky top-0 z-40 border-b"
          style={{
            borderColor: cluster.borderClass.replace("border-", ""),
            backgroundColor: cluster.accentBg,
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{career.icon}</div>
              <div>
                <h2 className="font-bold text-gray-900">{career.shortTitle}</h2>
                <p className="text-xs text-gray-500">{cluster.title}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>
                {moment.time}
              </span>
              <span>
                Moment {currentMoment + 1} of {scenarios.moments.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor: cluster.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white min-h-[calc(100vh-200px)] flex items-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
            {/* Time indicator with background effect */}
            <div
              className="mb-8 p-4 rounded-lg opacity-20 blur-sm absolute inset-0 pointer-events-none"
              style={{ backgroundColor: cluster.accent }}
            />

            <div
              className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
            >
              {/* Scenario Description */}
              <p className="text-lg sm:text-2xl font-bold text-gray-900 mb-8 relative z-10">
                {moment.scenario}
              </p>

              {/* Options */}
              <div className="space-y-4 relative z-10">
                {moment.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(option.trait)}
                    className="w-full text-left p-6 rounded-xl border-2 bg-white transition-all duration-200 group hover:shadow-lg"
                    style={{
                      borderColor: cluster.accent,
                      animation: !fadeOut ? `fade-in-up 0.4s ease-out forwards` : undefined,
                      animationDelay: !fadeOut ? `${idx * 0.1}s` : undefined,
                      opacity: !fadeOut ? undefined : 0,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all group-hover:scale-110"
                        style={{
                          backgroundColor: cluster.accentBg,
                          color: cluster.accent,
                        }}
                      >
                        {idx + 1}
                      </div>

                      {/* Text + Trait */}
                      <div className="flex-1">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                          {option.text}
                        </p>
                        <span
                          className="inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full transition-all"
                          style={{
                            backgroundColor: cluster.accentBg,
                            color: cluster.accent,
                          }}
                        >
                          +1 {option.trait}
                        </span>
                      </div>
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

  if (phase === "complete" && selectedCareer) {
    const career = careerConfigs[selectedCareer];
    const cluster = clusterConfigs[career.cluster];

    // Calculate top traits
    const sortedTraits = Object.entries(traitScores)
      .map(([trait, count]) => ({ trait, count }))
      .sort((a, b) => b.count - a.count);

    const topTrait = sortedTraits[0];
    const topTraits = sortedTraits.slice(0, 3);

    // Generate personality summary
    const getPersonalitySummary = () => {
      if (!topTrait) return "You explored a day as a professional!";

      const traitDescriptions: Record<string, string> = {
        "Confidence": "You lead with confidence and direct action.",
        "Teamwork": "You thrive through collaboration and team support.",
        "Mentorship": "You excel at developing and teaching others.",
        "Efficiency": "You focus on getting things done quickly.",
        "Technical Depth": "You dive deep into technical complexity.",
        "Pragmatism": "You balance ideals with practical solutions.",
        "Analytical": "You make decisions backed by data and analysis.",
        "Decisiveness": "You make bold decisions under pressure.",
        "Curiosity": "You're driven by learning and exploration.",
        "Craftsmanship": "You care deeply about quality and excellence.",
        "Data-Driven": "You rely on metrics and evidence.",
        "Diplomacy": "You navigate complex relationships with finesse.",
        "User Empathy": "You genuinely understand what users need.",
        "Strategic": "You think long-term and big picture.",
        "Honesty": "You value transparency and integrity.",
        "Competitive": "You're motivated by competition and winning.",
        "Collaborative": "You bring out the best in teams.",
        "Visionary": "You see possibilities others miss.",
        "Communication": "You express ideas clearly and compassionately.",
        "Empathy": "You connect emotionally with people.",
        "Evidence-Based": "You rely on research and proof.",
        "Patient-Centered": "You prioritize individual needs.",
        "Systematic": "You follow proven processes.",
        "Scholarly": "You pursue knowledge rigorously.",
        "Crisis Management": "You stay calm and effective under pressure.",
        "Storytelling": "You inspire through narrative and emotion.",
        "Innovation": "You push boundaries and try new things.",
        "Cautious": "You evaluate thoroughly before committing.",
        "User-Focused": "You listen to and serve your audience.",
        "Resourceful": "You find creative solutions with constraints.",
        "Honest": "You communicate with integrity.",
        "Creative": "You generate original ideas and designs.",
        "Research": "You investigate deeply before deciding.",
        "Sustainability": "You think about long-term impact.",
        "Client-Focused": "You prioritize what matters to clients.",
        "Quality": "You maintain high standards.",
        "Technical": "You value technical excellence.",
        "Business Acumen": "You understand market dynamics.",
        "Market": "You grasp customer needs deeply.",
        "Culture": "You build strong team culture.",
        "Adaptive": "You pivot and evolve easily.",
        "Driven": "You're motivated and ambitious.",
        "Sustainable": "You balance ambition with wellbeing.",
      };

      const mainTraitDesc = traitDescriptions[topTrait.trait] || `You lead with ${topTrait.trait}.`;
      return `${mainTraitDesc}`;
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareMessage = `I spent a day as a ${career.shortTitle}! My work style: ${topTrait?.trait || "curious"}. Try it:`;

    return (
      <>
        <ConfettiEffect trigger={showConfetti} duration={4000} />

        {/* Completion Hero */}
        <section className="relative overflow-hidden hero-dark noise-overlay">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div
            className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ background: cluster.accent }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="text-sm">✨</span>
              <span className="text-xs font-semibold text-indigo-200 tracking-wide">
                Day Complete
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              You Spent a Day as a{" "}
              <span style={{ color: cluster.accentLight }}>
                {career.shortTitle}
              </span>
            </h1>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {getPersonalitySummary()}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Traits Summary */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Your Day in Summary</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTraits.map((item, idx) => (
                <div
                  key={item.trait}
                  className="rounded-xl p-6 border-2 bg-white text-center"
                  style={{
                    borderColor: cluster.accent,
                    backgroundColor: cluster.accentBg,
                  }}
                >
                  <div
                    className="text-3xl mb-2"
                    style={{ color: cluster.accent }}
                  >
                    +{item.count}
                  </div>
                  <h3
                    className="font-bold text-sm sm:text-base mb-2"
                    style={{ color: cluster.accent }}
                  >
                    {item.trait}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Earned through your choices
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Info */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-xl p-8 border-2" style={{ borderColor: cluster.accent }}>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: cluster.accentBg }}
                >
                  {career.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{career.title}</h3>
                  <p className="text-sm text-gray-500">{cluster.title}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {career.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    Avg Salary
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {career.stats.avgSalary}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    Growth Rate
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {career.stats.growthRate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    Top Roles
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {career.stats.topRoles[0]}
                  </p>
                </div>
              </div>

              <Link
                href={`/careers/${selectedCareer}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: cluster.accent,
                  color: "white",
                }}
              >
                Learn More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleTryAnother}
                className="px-6 py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                Try Another Career
              </button>

              <ShareButton
                url={shareUrl}
                title={`I spent a day as a ${career.shortTitle}`}
                prefilledMessage={shareMessage}
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
}
