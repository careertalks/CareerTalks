"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const techCareers = [
  { label: "AI & Data Science", href: "/careers/ai-data-science" },
  { label: "Software Development", href: "/careers/software-development" },
  { label: "FinTech", href: "/careers/fintech" },
  { label: "Telecommunications", href: "/careers/telecommunications" },
  { label: "Product Management", href: "/careers/product-management" },
];

const businessCareers = [
  { label: "Business & Startups", href: "/careers/business-entrepreneurship" },
  { label: "Digital Marketing", href: "/careers/digital-marketing" },
  { label: "Retail & Logistics", href: "/careers/retail-logistics" },
  { label: "Real Estate", href: "/careers/real-estate" },
  { label: "Hospitality", href: "/careers/hospitality-management" },
];

const scienceCareers = [
  { label: "BioTech & Pharma", href: "/careers/biotech-pharma" },
  { label: "Clean Tech & Green Energy", href: "/careers/clean-tech" },
  { label: "Healthcare Management", href: "/careers/healthcare-management" },
  { label: "Automotive", href: "/careers/automotive" },
];

const creativeCareers = [
  { label: "Law & Legal", href: "/careers/law-legal" },
  { label: "Fashion Design & Tech", href: "/careers/fashion-design" },
  { label: "Human Resources", href: "/careers/human-resources" },
  { label: "Architecture & Planning", href: "/careers/architecture-planning" },
  { label: "Education & Social Work", href: "/careers/education-social-work" },
  { label: "Creative Arts & Design", href: "/careers/creative-arts" },
];

const resources = [
  { label: "Tools & Games", href: "/tools" },
  { label: "Career Assessment", href: "/assessment" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok || res.status === 409) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top: Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/ct-logo.svg"
                alt="CareerTalks"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Career</span>
                <span className="text-violet-400">Talks</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Comprehensive career guidance for 20+ industries across Tech, Business, Science, and Creative tracks. Interactive tools, skill roadmaps, and expert insights to help you find your path.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[340px]">
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
              Stay Updated
            </h4>
            {status === "success" ? (
              <p className="text-sm text-emerald-400">Thanks for subscribing!</p>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    disabled={status === "loading"}
                    className="flex-1 min-w-0 px-3 py-2 text-sm bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors whitespace-nowrap disabled:opacity-60"
                  >
                    {status === "loading" ? "..." : "Subscribe"}
                  </button>
                </form>
                {status === "error" && errorMsg && (
                  <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/60 mb-12" />

        {/* Career columns + Resources */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Tech & Data */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="text-blue-400">Tech & Data</span>
            </h4>
            <ul className="space-y-2.5">
              {techCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Commerce */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="text-amber-400">Business</span>
            </h4>
            <ul className="space-y-2.5">
              {businessCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Science & Health */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="text-emerald-400">Science & Health</span>
            </h4>
            <ul className="space-y-2.5">
              {scienceCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* People & Creative */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="text-rose-400">People & Creative</span>
            </h4>
            <ul className="space-y-2.5">
              {creativeCareers.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} CareerTalks. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="ml-1">20 career paths to explore</span>
          </div>
          <a
            href="mailto:hello@careertalks.space"
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            hello@careertalks.space
          </a>
        </div>
      </div>
    </footer>
  );
}
