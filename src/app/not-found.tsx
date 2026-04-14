import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Browse our 20 career paths, take a career quiz, or explore interactive tools.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <span className="text-6xl block mb-4">🔍</span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We couldn&apos;t find what you&apos;re looking for. It may have been
          moved or renamed. Try one of these instead:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
          >
            Go Home
          </Link>
          <Link
            href="/careers/ai-data-science"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 transition-colors text-sm"
          >
            Browse Careers
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold border-2 border-indigo-200 hover:bg-indigo-50 transition-colors text-sm"
          >
            Interactive Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
