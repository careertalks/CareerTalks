"use client";

import { useState, useEffect } from "react";
import type { CareerSlug } from "@/lib/career-config";

interface ContentItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceType: "rss" | "devto" | "reddit";
  publishedAt: string;
  excerpt: string;
  imageUrl?: string | null;
  readTime?: string;
  tags?: string[];
}

interface LatestTabProps {
  careerSlug: CareerSlug;
  clusterColor: string;
  onArticleRead: () => void;
  onNewContentCount: (count: number) => void;
}

// Source badge styling
function getSourceBadge(source: string, sourceType: string) {
  if (sourceType === "reddit") {
    return { bg: "#FFF7ED", color: "#EA580C", label: source };
  }
  if (sourceType === "devto") {
    return { bg: "#F0FDF4", color: "#16A34A", label: "Dev.to" };
  }
  // RSS
  return { bg: "#FFFBEB", color: "#D97706", label: source };
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function LatestTab({
  careerSlug,
  clusterColor,
  onArticleRead,
  onNewContentCount,
}: LatestTabProps) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/careers/${careerSlug}/content?limit=15`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const contentItems: ContentItem[] = data.items || [];
        setItems(contentItems);
        // Count items from last 24 hours as "new"
        const oneDayAgo = Date.now() - 86400000;
        const newCount = contentItems.filter(
          (it) => it.publishedAt && new Date(it.publishedAt).getTime() > oneDayAgo
        ).length;
        onNewContentCount(Math.min(newCount, 9));
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
  }, [careerSlug, onNewContentCount]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-100 rounded-xl p-4 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <span className="text-3xl block mb-3">📡</span>
        <p className="text-sm text-gray-500">
          Could not load latest content right now.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          We&apos;ll try again on the next page load.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-3xl block mb-3">📰</span>
        <p className="text-sm text-gray-500">
          No articles found yet. Check back soon!
        </p>
      </div>
    );
  }

  // Collect unique sources for attribution
  const uniqueSources = [...new Set(items.map((it) => it.source))].slice(0, 6);

  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: clusterColor }}
        />
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Articles &amp; Industry News
        </span>
      </div>

      {/* Content list */}
      <div className="flex flex-col gap-2.5">
        {items.map((item) => {
          const badge = getSourceBadge(item.source, item.sourceType);
          const isNew =
            item.publishedAt &&
            Date.now() - new Date(item.publishedAt).getTime() < 86400000;

          return (
            <a
              key={item.id}
              href={item.url}
              target={item.url.startsWith("/") ? "_self" : "_blank"}
              rel={item.url.startsWith("/") ? undefined : "noopener noreferrer"}
              onClick={onArticleRead}
              className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all block"
            >
              <div className="flex gap-3 items-start">
                {/* Icon or image */}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xl flex-shrink-0">
                    {item.sourceType === "reddit"
                      ? "💬"
                      : item.sourceType === "devto"
                      ? "👩‍💻"
                      : "📰"}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  {/* Meta row */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                    {isNew && (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400">
                      {timeAgo(item.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    className={`text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
                      item.url.startsWith("/") ? "" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </div>

                  {/* Meta footer */}
                  <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                    {item.readTime && (
                      <span className="text-[11px] text-gray-400">
                        📖 {item.readTime}
                      </span>
                    )}
                    {(item.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {!item.url.startsWith("/") && (
                      <span className="text-[11px] text-gray-400">
                        ↗ Read on {item.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Attribution footer */}
      <div className="mt-7 pt-5 border-t border-gray-100 text-center">
        <p className="text-[11px] text-gray-400">
          Curated from{" "}
          {uniqueSources.map((src, i) => (
            <span key={src}>
              {i > 0 && " · "}
              <span className="text-gray-500">{src}</span>
            </span>
          ))}
          {" "}and CareerTalks original content
        </p>
      </div>
    </div>
  );
}
