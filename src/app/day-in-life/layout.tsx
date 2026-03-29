import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day in the Life",
  description:
    "Experience a day in the life of professionals across 6 careers. Make real workplace decisions and discover which career personality matches yours.",
  keywords: [
    "day in the life",
    "career simulator",
    "what is it like to work as",
    "career day simulation",
  ],
};

export default function DayInLifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
