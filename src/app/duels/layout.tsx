import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Pathways",
  description:
    "Explore 10-year career progressions based on your high school stream. See salary growth, key skills, and specialization paths for careers in India and globally.",
  keywords: [
    "career pathways",
    "career progression",
    "career after 12th",
    "career path by stream",
    "10 year career plan",
  ],
};

export default function DuelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
