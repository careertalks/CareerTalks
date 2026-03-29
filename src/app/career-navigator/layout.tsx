import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Navigator",
  description:
    "Make 4 key decisions in our choose-your-own-adventure career tool and get personalized career recommendations with match scores, salaries, and growth rates.",
  keywords: [
    "career navigator",
    "career decision tool",
    "career recommendation",
    "choose career path",
  ],
};

export default function CareerNavigatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
