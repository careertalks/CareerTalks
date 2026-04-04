"use client";

import { useState, useEffect } from "react";
import type { CareerSlug } from "@/lib/career-config";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  url?: string;
  salaryRange?: string;
  tags: string[];
  source: string;
  postedAt?: string;
  type?: string;
  remote?: boolean;
  companyLogo?: string;
}

interface EarnNowTabProps {
  careerSlug: CareerSlug;
  clusterColor: string;
  onJobView: () => void;
  onNewJobCount: (count: number) => void;
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function EarnNowTab({
  careerSlug,
  clusterColor,
  onJobView,
  onNewJobCount,
}: EarnNowTabProps) {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All Gigs");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/careers/${careerSlug}/jobs?limit=30`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const jobItems: JobListing[] = data.jobs || [];
        setJobs(jobItems);
        // Count jobs from last 48 hours
        const twoDaysAgo = Date.now() - 172800000;
        const newCount = jobItems.filter(
          (j) => j.postedAt && new Date(j.postedAt).getTime() > twoDaysAgo
        ).length;
        onNewJobCount(Math.min(newCount, 9));
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [careerSlug, onNewJobCount]);

  // Extract unique tags for filter pills
  const allTags = [...new Set(jobs.flatMap((j) => j.tags))].slice(0, 5);
  const filters = ["All Gigs", ...allTags];

  // Filter jobs
  const filteredJobs =
    activeFilter === "All Gigs"
      ? jobs
      : jobs.filter((j) =>
          j.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  const displayJobs = filteredJobs.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-100 rounded-xl p-4 animate-pulse"
          >
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-emerald-100 rounded w-16" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <span className="text-3xl block mb-3">💼</span>
        <p className="text-sm text-gray-500">
          Could not load job listings right now.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          We&apos;ll try again on the next page load.
        </p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-3xl block mb-3">🔍</span>
        <p className="text-sm text-gray-500">
          No job listings found yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Earn banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 mb-5">
        <div className="flex gap-3">
          <span className="text-2xl">💸</span>
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              Start Earning in This Field
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Remote gigs curated for students and early-career aspirants. No
              degree required — just skills and motivation.
            </p>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setVisibleCount(10);
            }}
            className={`text-[11px] px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${
              activeFilter === filter
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Job list */}
      <div className="flex flex-col gap-2.5">
        {displayJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            {/* Header: title + salary */}
            <div className="flex justify-between items-start mb-2.5 flex-wrap gap-2">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {job.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {job.company}
                </div>
              </div>
              {job.salaryRange && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                  {job.salaryRange}
                </span>
              )}
            </div>

            {/* Meta tags */}
            <div className="flex gap-2 mb-2.5 flex-wrap">
              {job.type && (
                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                  🕐 {job.type}
                </span>
              )}
              {job.location && (
                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                  🌍 {job.location}
                </span>
              )}
              {job.postedAt && (
                <span className="text-[11px] text-gray-400">
                  {timeAgo(job.postedAt)}
                </span>
              )}
            </div>

            {/* Skill tags */}
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {job.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer: source + apply */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-gray-400">
                via {job.source}
              </span>
              {job.url ? (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onJobView}
                  className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors no-underline"
                >
                  Apply ↗
                </a>
              ) : (
                <span className="text-xs text-gray-400 italic">
                  Link unavailable
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      {filteredJobs.length > visibleCount && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="text-xs font-semibold text-blue-600 bg-blue-50 px-5 py-2 rounded-lg border-none cursor-pointer hover:bg-blue-100 transition-colors"
          >
            Load More Gigs →
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-5 text-center">
        <p className="text-[10px] text-gray-400 max-w-md mx-auto leading-relaxed">
          These opportunities are sourced from Remotive, Jobicy, Himalayas,
          Adzuna &amp; The Muse. CareerTalks does not employ or endorse these
          listings.
        </p>
      </div>
    </div>
  );
}
