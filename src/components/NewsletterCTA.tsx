"use client";

import { useState } from "react";
import { careerConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";

interface NewsletterCTAProps {
  careerSlug?: CareerSlug;
}

export default function NewsletterCTA({ careerSlug }: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const careerName = careerSlug ? careerConfigs[careerSlug]?.shortTitle : null;

  const headline = careerName
    ? `Get Weekly ${careerName} Career Insights`
    : "Get Weekly Career Insights";

  const description = careerName
    ? `Personalized guidance, skill roadmaps, and industry trends for ${careerName} careers delivered straight to your inbox.`
    : "Personalized guidance, skill roadmaps, and industry trends delivered straight to your inbox.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 sm:p-10">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {headline}
        </h3>
        <p className="text-indigo-100 text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>

        {subscribed ? (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white font-semibold">Thanks for subscribing!</p>
            <p className="text-indigo-100 text-sm mt-1">
              Check your inbox for a confirmation email.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl transition-colors shadow-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-indigo-200 mt-4">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
