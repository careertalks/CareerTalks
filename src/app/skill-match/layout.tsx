import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Match",
  description:
    "Rate your skills and find your top 5 career matches. Our free skill-based career matching tool analyzes 8 key competencies to recommend the best career paths for you.",
  keywords: [
    "skill match career",
    "career by skills",
    "skill based career test",
    "career skills assessment",
  ],
};

export default function SkillMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
