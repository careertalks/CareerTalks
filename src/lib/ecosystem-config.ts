export interface EcosystemProject {
  id: string;
  name: string;
  shortName: string;
  url: string;
  icon: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  stripBg: string;
  stripAccent: string;
  ctaBg: string;
  ctaHoverBg: string;
}

export const ecosystem: Record<string, EcosystemProject> = {
  tpg: {
    id: "tpg",
    name: "The Practise Ground",
    shortName: "TPG",
    url: "https://www.thepractiseground.in",
    icon: "\u{1F4DA}",
    tagline: "Subject learning with quiz practice for students \u2014 The Practise Ground",
    description: "Grammar, math & science \u2014 interactive quizzes, practice exercises, and learning resources for classrooms and homeschool.",
    ctaLabel: "Visit The Practise Ground \u2192",
    stripBg: "bg-gray-900",
    stripAccent: "text-amber-400",
    ctaBg: "bg-amber-500",
    ctaHoverBg: "hover:bg-amber-600",
  },
  aitt: {
    id: "aitt",
    name: "AI Think Tank",
    shortName: "AITT",
    url: "https://www.aithinktank.space",
    icon: "\u{1F9E0}",
    tagline: "Free AI education for kids, teens & corporates \u2014 AI Think Tank",
    description: "Quizzes, interactive games, infographics, and practical AI guides \u2014 making AI accessible for everyone.",
    ctaLabel: "Explore AI Think Tank \u2192",
    stripBg: "bg-gray-900",
    stripAccent: "text-teal-400",
    ctaBg: "bg-teal-600",
    ctaHoverBg: "hover:bg-teal-700",
  },
  ct: {
    id: "ct",
    name: "CareerTalks",
    shortName: "CT",
    url: "https://careertalks.space",
    icon: "\u{1F3AF}",
    tagline: "20 career paths explored for the next generation \u2014 CareerTalks",
    description: "Interactive career guides, industry insights, and skill maps \u2014 helping teens and young adults find their path.",
    ctaLabel: "Discover CareerTalks \u2192",
    stripBg: "bg-indigo-950",
    stripAccent: "text-violet-400",
    ctaBg: "bg-violet-600",
    ctaHoverBg: "hover:bg-violet-700",
  },
};

// Which projects to promote on each site
export const crossPromoTargets: Record<string, string[]> = {
  aitt: ["tpg", "ct"],
  tpg: ["aitt", "ct"],
  ct: ["tpg", "aitt"],
};

// Current site ID
export const CURRENT_SITE = "ct";

export function getPromoTargets(): EcosystemProject[] {
  const targets = crossPromoTargets[CURRENT_SITE] || [];
  return targets.map((id) => ecosystem[id]);
}

export function buildUtmUrl(baseUrl: string, content: "strip" | "floating_bar"): string {
  const params = new URLSearchParams({
    utm_source: CURRENT_SITE,
    utm_medium: "banner",
    utm_campaign: "cross_promo",
    utm_content: content,
  });
  return `${baseUrl}?${params.toString()}`;
}
