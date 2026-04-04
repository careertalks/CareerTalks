"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { CareerSlug } from "@/lib/career-config";
import {
  careerConfigs,
  clusterConfigs,
  getClusterForCareer,
  getCareersByCluster,
} from "@/lib/career-config";
import LatestTab from "./career-hub/LatestTab";
import PracticeTab from "./career-hub/PracticeTab";
import EarnNowTab from "./career-hub/EarnNowTab";
import ProgressRings from "./career-hub/ProgressRings";

// ─── Types ───
type TabId = "latest" | "practice" | "earn";

interface CareerHubPageProps {
  career: CareerSlug;
  articleCount?: number;
}

interface ProgressData {
  knowledge: { done: number; total: number };
  skills: { done: number; total: number };
  experience: { done: number; total: number };
}

// ─── Cluster color mapping ───
const CLUSTER_COLORS: Record<string, string> = {
  tech: "#3B82F6",
  business: "#F59E0B",
  science: "#10B981",
  creative: "#F43F5E",
};

const TAB_ACTIVE_CLASSES: Record<TabId, string> = {
  latest: "bg-blue-500/20 text-blue-400",
  practice: "bg-emerald-500/20 text-emerald-400",
  earn: "bg-amber-500/20 text-amber-400",
};

// ─── Default progress (used for SSR and initial client render) ───
const DEFAULT_PROGRESS: ProgressData = {
  knowledge: { done: 0, total: 10 },
  skills: { done: 0, total: 6 },
  experience: { done: 0, total: 0 },
};

// ─── localStorage helpers ───
function getProgressKey(slug: CareerSlug) {
  return `ct-progress-${slug}`;
}

function loadProgress(slug: CareerSlug): ProgressData {
  try {
    const stored = localStorage.getItem(getProgressKey(slug));
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_PROGRESS;
}

function saveProgress(slug: CareerSlug, data: ProgressData) {
  try {
    localStorage.setItem(getProgressKey(slug), JSON.stringify(data));
  } catch {}
}

// ─── Cycle date helpers ───
function getCurrentCycleDates(): { start: string; end: string } {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (day <= 15) {
    return {
      start: fmt(new Date(year, month, 1)),
      end: fmt(new Date(year, month, 15)),
    };
  }
  const lastDay = new Date(year, month + 1, 0).getDate();
  return {
    start: fmt(new Date(year, month, 16)),
    end: fmt(new Date(year, month, lastDay)),
  };
}

// ──────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────
export default function CareerHubPage({
  career: careerSlug,
  articleCount = 6,
}: CareerHubPageProps) {
  const career = careerConfigs[careerSlug];
  const cluster = getClusterForCareer(careerSlug);
  const clusterColor = CLUSTER_COLORS[career.cluster] || "#3B82F6";

  // Tab state
  const [activeTab, setActiveTab] = useState<TabId>("latest");

  // Progress state — use static default for SSR, hydrate from localStorage after mount
  const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);

  // Notification dots (new content since last visit)
  const [notifCounts, setNotifCounts] = useState({ latest: 0, earn: 0 });

  // Cycle dates — defer to useEffect to avoid server/client mismatch
  const [cycle, setCycle] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  // Hydrate client-only state after mount
  useEffect(() => {
    setProgress(loadProgress(careerSlug));
    setCycle(getCurrentCycleDates());
  }, [careerSlug]);

  // Related careers
  const relatedCareers = getCareersByCluster(career.cluster)
    .filter((c) => c.slug !== careerSlug)
    .slice(0, 3);

  // Update progress totals based on actual article count (passed from server)
  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      knowledge: { ...prev.knowledge, total: Math.max(articleCount, 6) },
    }));
  }, [articleCount]);

  // Save progress when it changes
  useEffect(() => {
    saveProgress(careerSlug, progress);
  }, [progress, careerSlug]);

  // Callback for child components to update progress
  const updateProgress = useCallback(
    (
      ring: "knowledge" | "skills" | "experience",
      increment: number = 1
    ) => {
      setProgress((prev) => ({
        ...prev,
        [ring]: {
          ...prev[ring],
          done: prev[ring].done + increment,
        },
      }));
    },
    []
  );

  return (
    <>
      {/* ═══════ HERO — light, soft ═══════ */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-100 border-b border-gray-200">
        <div className="max-w-[900px] mx-auto px-6 pt-8 pb-7">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#careers"
              className="hover:text-blue-500 transition-colors"
            >
              Careers
            </Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">{career.title}</span>
          </nav>

          {/* Title row */}
          <div className="flex items-center gap-3.5 mb-2 flex-wrap">
            <span className="text-4xl">{career.icon}</span>
            <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight">
              {career.title}
            </h1>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: cluster.accentBg,
                color: cluster.accent,
              }}
            >
              {clusterConfigs[career.cluster].title}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 max-w-[540px] leading-relaxed mb-4">
            {career.description}
          </p>

          {/* Stats row */}
          <div className="flex gap-2.5 flex-wrap">
            <div className="bg-white border border-gray-200 rounded-lg px-3.5 py-1.5 inline-flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Avg Salary</span>
              <span className="text-[13px] font-bold text-gray-800">
                {career.stats.avgSalary}
              </span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3.5 py-1.5 inline-flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Growth</span>
              <span className="text-[13px] font-bold text-gray-800">
                ▲ {career.stats.growthRate}
              </span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3.5 py-1.5 inline-flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Top Roles</span>
              <span className="text-[13px] font-bold text-gray-800">
                {career.stats.topRoles.join(" · ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STICKY PROGRESS BAR — DARK ═══════ */}
      <div className="sticky top-[56px] z-40 bg-[#0f172a] border-b border-blue-500/20 shadow-lg shadow-black/15">
        <div className="max-w-[900px] mx-auto px-6">
          {/* Progress row */}
          <div className="flex items-center justify-between py-3.5 flex-wrap gap-3">
            <ProgressRings
              progress={progress}
              clusterColor={clusterColor}
            />
            <div className="text-right">
              <div className="text-[11px] text-gray-400">
                {cycle.start} – {cycle.end}
              </div>
              <div className="text-[11px] text-amber-400 mt-0.5">
                🏆 Top students have completed 8/10 this cycle
              </div>
            </div>
          </div>

          {/* Tab row */}
          <div className="flex gap-1 pb-2.5">
            {(
              [
                { id: "latest" as TabId, label: "Latest", count: notifCounts.latest },
                { id: "practice" as TabId, label: "Practice", count: 0 },
                { id: "earn" as TabId, label: "Earn Now", count: notifCounts.earn },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 py-2 text-xs font-semibold rounded-md
                  transition-all cursor-pointer border-none
                  ${
                    activeTab === tab.id
                      ? TAB_ACTIVE_CLASSES[tab.id]
                      : "text-gray-500 hover:text-gray-200 hover:bg-slate-800/60"
                  }
                `}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ CONTENT AREA ═══════ */}
      <div className="bg-white min-h-[400px]">
        <div className="max-w-[900px] mx-auto px-6 py-8">
          {activeTab === "latest" && (
            <LatestTab
              careerSlug={careerSlug}
              clusterColor={clusterColor}
              onArticleRead={() => updateProgress("knowledge")}
              onNewContentCount={(count) =>
                setNotifCounts((prev) => ({ ...prev, latest: count }))
              }
            />
          )}
          {activeTab === "practice" && (
            <PracticeTab
              careerSlug={careerSlug}
              clusterColor={clusterColor}
              progress={progress.skills}
              onComplete={() => updateProgress("skills")}
            />
          )}
          {activeTab === "earn" && (
            <EarnNowTab
              careerSlug={careerSlug}
              clusterColor={clusterColor}
              onJobView={() => updateProgress("experience")}
              onNewJobCount={(count) =>
                setNotifCounts((prev) => ({ ...prev, earn: count }))
              }
            />
          )}
        </div>
      </div>

      {/* ═══════ RELATED CAREERS ═══════ */}
      {relatedCareers.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-[900px] mx-auto px-6 py-8">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
              Related Career Paths
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {relatedCareers.map((related) => {
                const relCluster = clusterConfigs[related.cluster];
                return (
                  <Link
                    key={related.slug}
                    href={`/careers/${related.slug}`}
                    className="group flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-[22px]">{related.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {related.shortTitle}
                      </div>
                      <span className="text-[11px] text-emerald-600">
                        ▲ {related.stats.growthRate} growth
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
