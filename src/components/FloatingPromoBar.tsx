"use client";

import { useState, useEffect } from "react";
import { getPromoTargets, buildUtmUrl } from "@/lib/ecosystem-config";

export default function FloatingPromoBar() {
  const [dismissed, setDismissed] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const targets = getPromoTargets();

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem("promo-bar-dismissed");
    if (wasDismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setDismissed(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (targets.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % targets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [targets.length]);

  if (dismissed || targets.length === 0) return null;

  const project = targets[currentIndex];

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("promo-bar-dismissed", "true");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-gray-950 to-gray-900 border-t-2 border-indigo-500/50 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3">
          <span className="text-lg flex-shrink-0">{project.icon}</span>
          <span className="text-sm text-gray-300 font-medium hidden sm:inline">
            {project.tagline}
          </span>
          <span className="text-sm text-gray-300 font-medium sm:hidden">
            {project.name}
          </span>
          <a
            href={buildUtmUrl(project.url, "floating_bar")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${project.ctaBg} ${project.ctaHoverBg} text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap`}
          >
            {project.ctaLabel}
          </a>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 flex-shrink-0 ml-1"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {targets.length > 1 && (
            <div className="flex gap-1 ml-1">
              {targets.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-violet-400" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
