"use client";

import { useMemo } from "react";
import type { CareerSlug } from "@/lib/career-config";
import { careerConfigs } from "@/lib/career-config";

interface PracticeTabProps {
  careerSlug: CareerSlug;
  clusterColor: string;
  progress: { done: number; total: number };
  onComplete: () => void;
}

// Careers that have Day in Life scenarios
const DAY_IN_LIFE_CAREERS: CareerSlug[] = [
  "software-development",
  "product-management",
  "healthcare-management",
  "digital-marketing",
  "architecture-planning",
  "business-entrepreneurship",
];

interface PracticeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyClass: string;
  type: string;
}

function getPracticeItems(slug: CareerSlug): PracticeItem[] {
  const career = careerConfigs[slug];
  const items: PracticeItem[] = [];

  // 1. Salary Calculator — all 20 careers
  items.push({
    id: "salary-calculator",
    title: "Salary Explorer",
    description: `Check salary expectations for ${career.shortTitle} roles across India and globally`,
    icon: "💰",
    href: "/salary-calculator",
    duration: "5 min",
    difficulty: "Beginner",
    difficultyClass: "text-emerald-600 bg-emerald-50",
    type: "Interactive",
  });

  // 2. Skill Match — all 20 careers
  items.push({
    id: "skill-match",
    title: "Skill Match Assessment",
    description: `Rate your skills and see how well they align with ${career.shortTitle} careers`,
    icon: "🎯",
    href: "/skill-match",
    duration: "8 min",
    difficulty: "Beginner",
    difficultyClass: "text-emerald-600 bg-emerald-50",
    type: "Assessment",
  });

  // 3. Day in Life — only 6 careers
  if (DAY_IN_LIFE_CAREERS.includes(slug)) {
    items.push({
      id: "day-in-life",
      title: `A Day in ${career.shortTitle}`,
      description: `Experience a typical day working in ${career.shortTitle} through an interactive simulation`,
      icon: "🎮",
      href: "/day-in-life",
      duration: "15 min",
      difficulty: "Beginner",
      difficultyClass: "text-emerald-600 bg-emerald-50",
      type: "Simulation",
    });
  }

  // 4. Career Explorer — all 20
  items.push({
    id: "career-explorer",
    title: "Career Explorer",
    description: `Compare ${career.shortTitle} with other paths — filter by salary, growth, and skills`,
    icon: "🔍",
    href: "/career-explorer",
    duration: "10 min",
    difficulty: "Beginner",
    difficultyClass: "text-emerald-600 bg-emerald-50",
    type: "Interactive",
  });

  // 5. Career Quiz — generic but useful
  items.push({
    id: "quiz",
    title: "Career Match Quiz",
    description: "Answer 7 quick questions to discover which career cluster suits your personality",
    icon: "🧪",
    href: "/quiz",
    duration: "5 min",
    difficulty: "Beginner",
    difficultyClass: "text-emerald-600 bg-emerald-50",
    type: "Quiz",
  });

  // 6. Assessment — psychometric
  items.push({
    id: "assessment",
    title: "Career Personality Assessment",
    description: "Deep-dive psychometric assessment with 18 questions to understand your strengths",
    icon: "📋",
    href: "/assessment",
    duration: "12 min",
    difficulty: "Intermediate",
    difficultyClass: "text-amber-600 bg-amber-50",
    type: "Assessment",
  });

  return items;
}

export default function PracticeTab({
  careerSlug,
  clusterColor,
  progress,
  onComplete,
}: PracticeTabProps) {
  const items = useMemo(() => getPracticeItems(careerSlug), [careerSlug]);

  return (
    <div>
      {/* Progress summary card */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="text-sm font-semibold text-gray-900">
            Your Practice Progress
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {progress.done} of {items.length} modules completed this cycle
          </p>
        </div>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < progress.done ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Practice cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => {
          const isCompleted = idx < progress.done;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={onComplete}
              className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all block no-underline"
            >
              {/* Completion badge */}
              {isCompleted && (
                <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  ✓ Done
                </span>
              )}

              {/* Icon */}
              <div className="text-2xl mb-2.5">{item.icon}</div>

              {/* Title */}
              <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
                {item.title}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed mb-2.5">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mb-3">
                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                  ⏱ {item.duration}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded ${item.difficultyClass}`}
                >
                  {item.difficulty}
                </span>
                <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                  {item.type}
                </span>
              </div>

              {/* CTA */}
              <div
                className={`text-xs font-semibold w-full text-center py-2 rounded-lg transition-colors ${
                  isCompleted
                    ? "text-gray-500 bg-gray-50"
                    : "text-blue-600 bg-blue-50 group-hover:bg-blue-100"
                }`}
              >
                {isCompleted ? "Try Again →" : "Start Practice →"}
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 text-center">
        <p className="text-[11px] text-gray-400">
          New practice challenges added every cycle ·{" "}
          <span className="text-blue-500 cursor-pointer">
            Suggest a challenge →
          </span>
        </p>
      </div>
    </div>
  );
}
