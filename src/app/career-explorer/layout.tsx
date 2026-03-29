import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Explorer",
  description:
    "Filter and compare 20+ careers by salary, growth rate, demand, and skills. Use side-by-side comparison to find the career path that fits you best.",
  keywords: [
    "career explorer",
    "compare careers",
    "career comparison tool",
    "career salary comparison",
  ],
};

export default function CareerExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
