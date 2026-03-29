import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CareerTalks privacy policy — how we handle your data, what we collect, and your rights as a user of our free career guidance platform.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Last updated: March 2026
      </p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Who We Are
          </h2>
          <p>
            CareerTalks (careertalks.space) is a free career guidance platform
            for students and young professionals. We are committed to protecting
            your privacy and being transparent about how we use data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            What We Collect
          </h2>
          <p>
            <strong>Analytics data:</strong> We use Google Analytics (GA4) to
            understand how visitors use the site. This includes anonymized data
            such as pages visited, time on site, device type, and approximate
            geographic location. No personally identifiable information is
            collected through analytics.
          </p>
          <p>
            <strong>Email addresses:</strong> If you voluntarily subscribe to
            our newsletter, we collect your email address solely to send you
            career insights and updates. You can unsubscribe at any time.
          </p>
          <p>
            <strong>Local storage:</strong> Some interactive tools (quizzes,
            badges) store progress locally in your browser. This data never
            leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            What We Don&apos;t Collect
          </h2>
          <p>
            We do not collect passwords, payment information, social security
            numbers, or any sensitive personal data. We do not require account
            creation to access any content or tools on the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            How We Use Your Data
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To improve site content and user experience</li>
            <li>To understand which career paths and tools are most popular</li>
            <li>
              To send newsletter updates (only if you opted in)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Third-Party Services
          </h2>
          <p>
            We use Google Analytics for website analytics. Google&apos;s privacy
            policy applies to the data they collect. We do not sell, rent, or
            share your personal data with any third parties for marketing
            purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Cookies
          </h2>
          <p>
            We use essential cookies for site functionality and analytics cookies
            (via Google Analytics) to understand site usage. You can disable
            cookies in your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Your Rights
          </h2>
          <p>
            You have the right to request access to, correction of, or deletion
            of any personal data we hold about you. Since we collect minimal
            data, this primarily applies to newsletter subscriptions, which you
            can manage via the unsubscribe link in any email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please reach out
            through our social media channels or newsletter reply.
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
