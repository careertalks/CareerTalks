import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator",
  description:
    "Project your 10-year salary growth across 20 careers in India and globally. Compare earnings, see career level progression, and plan your financial future.",
  keywords: [
    "salary calculator",
    "career salary comparison",
    "10 year salary projection",
    "salary by career India",
    "salary growth calculator",
  ],
};

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
