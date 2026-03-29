import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for CareerTalks — guidelines for using our free career guidance platform, content, and interactive tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Terms of Use
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Last updated: March 2026
      </p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using CareerTalks (careertalks.space), you agree to
            these terms of use. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Free Access
          </h2>
          <p>
            All content, tools, and resources on CareerTalks are provided free
            of charge. No account creation, payment, or subscription is required
            to access any part of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Content & Information
          </h2>
          <p>
            CareerTalks provides career guidance, salary data, industry insights,
            and interactive tools for educational and informational purposes only.
            While we strive for accuracy, we do not guarantee that all information
            is complete, current, or error-free.
          </p>
          <p>
            Salary figures, growth rates, and market data are based on publicly
            available sources and industry reports. Actual salaries and career
            outcomes vary by location, experience, education, employer, and many
            other factors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Not Professional Advice
          </h2>
          <p>
            Content on CareerTalks is for general informational purposes and
            should not be considered professional career counseling, financial
            advice, or legal advice. We recommend consulting qualified
            professionals for personalized guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Interactive Tools
          </h2>
          <p>
            Our career assessment tools, quizzes, and simulators are designed to
            help you explore career options. Results are algorithmic suggestions
            based on your inputs and should be treated as starting points for
            exploration, not definitive career recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Intellectual Property
          </h2>
          <p>
            All content, design, code, and tools on CareerTalks are the
            intellectual property of CareerTalks and its creators. You may share
            links to our content freely, but you may not reproduce, distribute,
            or create derivative works from our content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            External Links
          </h2>
          <p>
            CareerTalks may link to third-party websites and resources. We are
            not responsible for the content, accuracy, or practices of external
            sites. Links do not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            CareerTalks after changes constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Contact
          </h2>
          <p>
            If you have questions about these terms, please reach out through
            our social media channels or newsletter reply.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-violet-600 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
