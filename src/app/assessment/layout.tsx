import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Assessment",
  description:
    "Take our free 18-question career assessment to discover your personality type and top career matches across 20 industries. No signup required.",
  keywords: [
    "career assessment",
    "career test",
    "personality career match",
    "free career quiz",
    "career aptitude test",
  ],
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
