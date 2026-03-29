import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zodiac Career Match",
  description:
    "Discover career paths aligned with your zodiac sign. A fun, free tool that matches your astrological traits to real career opportunities.",
  keywords: [
    "zodiac career match",
    "career by zodiac sign",
    "astrology career guide",
    "zodiac job match",
  ],
};

export default function ZodiacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
