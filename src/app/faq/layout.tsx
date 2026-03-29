import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about CareerTalks — how to use our free career guidance platform, explore 20 career paths, and make the most of our interactive tools.",
  keywords: [
    "CareerTalks FAQ",
    "career guidance questions",
    "free career advice",
    "career exploration help",
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
