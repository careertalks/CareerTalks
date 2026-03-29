import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Compatibility",
  description:
    "Take the 2-player career compatibility test with a friend. Answer 6 questions each and discover your compatibility score, team career matches, and individual top picks.",
  keywords: [
    "career compatibility",
    "career match with friend",
    "career personality match",
    "career compatibility test",
  ],
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
