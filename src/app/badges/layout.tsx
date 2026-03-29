import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievement Badges",
  description:
    "Track your CareerTalks progress with achievement badges. Complete assessments, quizzes, and tools to unlock badges and share your career exploration journey.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BadgesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
