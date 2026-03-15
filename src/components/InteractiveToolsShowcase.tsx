"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Tool {
  id: number;
  emoji: string;
  name: string;
  tagline: string;
  timeEstimate: string;
  href: string;
  featured?: boolean;
}

const tools: Tool[] = [
  {
    id: 1,
    emoji: "🎯",
    name: "Career Assessment",
    tagline: "Discover careers that match your personality & interests",
    timeEstimate: "~5 min",
    href: "/assessment",
    featured: true,
  },
  {
    id: 2,
    emoji: "⭐",
    name: "Zodiac Career Match",
    tagline: "What does your zodiac sign say about your career?",
    timeEstimate: "~2 min",
    href: "/zodiac",
  },
  {
    id: 3,
    emoji: "🧩",
    name: "Career Quiz",
    tagline: "Answer 7 fun questions to find your career cluster",
    timeEstimate: "~3 min",
    href: "/quiz",
  },
  {
    id: 4,
    emoji: "🎡",
    name: "Career Roulette",
    tagline: "Spin the wheel and discover a surprise career!",
    timeEstimate: "~1 min",
    href: "/roulette",
  },
  {
    id: 5,
    emoji: "📊",
    name: "Skill Match",
    tagline: "Rate your skills and find careers that fit",
    timeEstimate: "~3 min",
    href: "/skill-match",
  },
  {
    id: 6,
    emoji: "📚",
    name: "Career Pathways",
    tagline: "Map your high school stream to a 10-year career journey",
    timeEstimate: "~5 min",
    href: "/duels",
  },
  {
    id: 7,
    emoji: "🧭",
    name: "Career Navigator",
    tagline: "Choose your own adventure through career decisions",
    timeEstimate: "~5 min",
    href: "/career-navigator",
  },
  {
    id: 8,
    emoji: "🔍",
    name: "Career Explorer",
    tagline: "Filter, compare, and research 20+ careers",
    timeEstimate: "~5 min",
    href: "/career-explorer",
  },
  {
    id: 9,
    emoji: "🎮",
    name: "Day in the Life",
    tagline: "Experience a typical day in different careers",
    timeEstimate: "~5 min",
    href: "/day-in-life",
  },
  {
    id: 10,
    emoji: "👯",
    name: "Career Compatibility",
    tagline: "Compare career interests with a friend!",
    timeEstimate: "~3 min",
    href: "/compatibility",
  },
  {
    id: 11,
    emoji: "💰",
    name: "Salary Calculator",
    tagline: "Project your career earnings over 10 years",
    timeEstimate: "~3 min",
    href: "/salary-calculator",
  },
];

const clusterAccents = [
  "from-indigo-500/20 to-indigo-600/10",
  "from-violet-500/20 to-violet-600/10",
  "from-blue-500/20 to-blue-600/10",
  "from-cyan-500/20 to-cyan-600/10",
  "from-indigo-500/20 to-violet-600/10",
  "from-violet-500/20 to-indigo-600/10",
  "from-blue-500/20 to-cyan-600/10",
  "from-cyan-500/20 to-blue-600/10",
  "from-indigo-500/20 to-cyan-600/10",
  "from-violet-500/20 to-blue-600/10",
  "from-blue-500/20 to-indigo-600/10",
];

export default function InteractiveToolsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-indigo-950 to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Discover Your Career —{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Play, Explore, Share
            </span>
          </h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Interactive tools designed to help you find your perfect career match
          </p>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {tools.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool} accentGradient={clusterAccents[idx]} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          {/* Carousel container */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-4"
              onScroll={() => {
                if (scrollContainerRef.current) {
                  const index = Math.round(
                    scrollContainerRef.current.scrollLeft / 320
                  );
                  setActiveIndex(index);
                }
              }}
            >
              {tools.map((tool, idx) => (
                <div key={tool.id} className="flex-shrink-0 w-80 snap-start">
                  <ToolCard tool={tool} accentGradient={clusterAccents[idx]} />
                </div>
              ))}
            </div>

            {/* Scroll buttons */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label="Scroll left"
              >
                ←
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label="Scroll right"
              >
                →
              </button>
            )}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {tools.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`transition-all ${
                  Math.round(activeIndex) === idx
                    ? "w-8 h-2 bg-indigo-400"
                    : "w-2 h-2 bg-indigo-600/40 hover:bg-indigo-600/60"
                } rounded-full`}
                aria-label={`Go to tool ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-indigo-900/50">
          <p className="text-indigo-200 mb-4">
            🏆{" "}
            <span className="font-semibold">
              Complete them all to unlock Achievement Badges!
            </span>
          </p>
          <Link
            href="/badges"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            View Badges &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ToolCardProps {
  tool: Tool;
  accentGradient: string;
}

function ToolCard({ tool, accentGradient }: ToolCardProps) {
  return (
    <div
      className={`group relative glass-dark rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20`}
    >
      {/* Background accent gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
      />

      {/* Featured badge */}
      {tool.featured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-indigo-400 to-violet-400 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Featured
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Emoji icon */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {tool.emoji}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {tool.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-indigo-200 mb-4 flex-grow line-clamp-2">
          {tool.tagline}
        </p>

        {/* Time estimate */}
        <div className="text-xs text-indigo-300 font-semibold mb-4">
          {tool.timeEstimate}
        </div>

        {/* Play Now button */}
        <Link
          href={tool.href}
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 group/btn hover:shadow-lg hover:shadow-indigo-500/30"
        >
          Play Now
          <span className="group-hover/btn:translate-x-0.5 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
