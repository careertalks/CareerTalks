import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools & Games",
  description:
    "11 free interactive career tools — assessments, quizzes, simulators, and calculators to help you discover your ideal career path. No signup required.",
  keywords: [
    "career tools",
    "career games",
    "free career assessment tools",
    "career exploration tools",
    "interactive career quiz",
  ],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
