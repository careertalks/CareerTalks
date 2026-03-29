import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Roulette",
  description:
    "Spin the career wheel and discover a random career path with salary info, growth rates, and fun facts. A quick, free way to explore new career possibilities.",
  keywords: [
    "career roulette",
    "random career generator",
    "career wheel spin",
    "explore careers",
  ],
};

export default function RouletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
