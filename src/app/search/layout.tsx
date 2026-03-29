import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search CareerTalks for career guides, salary data, skill roadmaps, and articles across 20 career paths.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
