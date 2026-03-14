"use client";

import { useState, useEffect } from "react";
import { getBadgeById } from "@/lib/badges";

interface BadgeData {
  badgeId: string;
}

export default function BadgeNotification() {
  const [unlockedBadge, setUnlockedBadge] = useState<BadgeData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBadgeUnlocked = (event: Event) => {
      const customEvent = event as CustomEvent<BadgeData>;
      setUnlockedBadge(customEvent.detail);
      setIsVisible(true);

      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Remove from state after animation completes
        setTimeout(() => {
          setUnlockedBadge(null);
        }, 300);
      }, 4000);

      return () => clearTimeout(timer);
    };

    window.addEventListener("badge-unlocked", handleBadgeUnlocked);
    return () => {
      window.removeEventListener("badge-unlocked", handleBadgeUnlocked);
    };
  }, []);

  if (!unlockedBadge) {
    return null;
  }

  const badgeInfo = getBadgeById(unlockedBadge.badgeId);

  if (!badgeInfo) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end pointer-events-none transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{
        animation: isVisible ? "slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : undefined,
      }}
    >
      {/* Toast Container */}
      <div className="relative mb-6 mx-4 pointer-events-auto">
        {/* Confetti Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: "0",
                animation: `confetti-fall ${1.5 + Math.random()}s ease-out forwards`,
                animationDelay: `${i * 50}ms`,
              }}
            >
              {["🎉", "✨", "🎊", "⭐", "🏆", "💫", "🌟"][i % 7]}
            </div>
          ))}
        </div>

        {/* Toast Card */}
        <div className="relative bg-gradient-to-br from-purple-900 to-blue-900 border-2 border-purple-400 rounded-2xl px-8 py-6 shadow-2xl shadow-purple-500/50 backdrop-blur-sm max-w-sm">
          {/* Badge Icon with Animation */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="text-7xl transform"
              style={{
                animation: "badge-unlock 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {badgeInfo.icon}
            </div>

            {/* Text Content */}
            <div className="text-center">
              <p className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-1">
                Badge Unlocked!
              </p>
              <h3 className="text-2xl font-bold text-white">{badgeInfo.name}</h3>
              <p className="text-sm text-slate-300 mt-1">{badgeInfo.description}</p>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 animate-pulse pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-white/10" />
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes badge-unlock {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(20deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(200px) translateX(${Math.random() * 100 - 50}px) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
