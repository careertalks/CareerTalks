/**
 * Badge Unlock Utility
 * Manages badge state in localStorage and dispatches custom events for notifications
 */

export function unlockBadge(badgeId: string): boolean {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("careertalks-badges");
  const badges: string[] = stored ? JSON.parse(stored) : [];

  if (badges.includes(badgeId)) {
    return false; // already unlocked
  }

  badges.push(badgeId);
  localStorage.setItem("careertalks-badges", JSON.stringify(badges));

  // Dispatch custom event so badge notification can listen
  window.dispatchEvent(
    new CustomEvent("badge-unlocked", {
      detail: { badgeId },
    })
  );

  return true; // newly unlocked
}

export function isBadgeUnlocked(badgeId: string): boolean {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("careertalks-badges");
  const badges: string[] = stored ? JSON.parse(stored) : [];

  return badges.includes(badgeId);
}

export function getUnlockedBadges(): string[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("careertalks-badges");
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get badge details by ID
 * Useful for notification components that need badge info
 */
export function getBadgeById(
  badgeId: string
): {
  name: string;
  icon: string;
  description: string;
} | null {
  const badgeMap: Record<string, { name: string; icon: string; description: string }> = {
    "quiz-master": {
      name: "Quiz Master",
      icon: "🧭",
      description: "Completed the Career Quiz",
    },
    "zodiac-explorer": {
      name: "Zodiac Explorer",
      icon: "✨",
      description: "Discovered your cosmic career match",
    },
    "roulette-lucky": {
      name: "Lucky Spinner",
      icon: "🎰",
      description: "Spun the Career Roulette",
    },
    "skill-seeker": {
      name: "Skill Seeker",
      icon: "💪",
      description: "Completed the Skill Match assessment",
    },
    "duel-champion": {
      name: "Duel Champion",
      icon: "⚔️",
      description: "Crowned a career champion",
    },
    navigator: {
      name: "Pathfinder",
      icon: "🗺️",
      description: "Navigated your career path",
    },
    explorer: {
      name: "Career Scholar",
      icon: "🔍",
      description: "Explored and compared careers",
    },
  };

  return badgeMap[badgeId] || null;
}
