import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Quiz",
  description:
    "Answer 7 quick questions to find your ideal career cluster. Our free career quiz matches your interests to 20 career paths in tech, business, science, and creative fields.",
  keywords: [
    "career quiz",
    "career interest quiz",
    "what career is right for me",
    "free career quiz for students",
  ],
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
