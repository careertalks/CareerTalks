import Link from "next/link";
import type { CareerConfig, ClusterConfig } from "@/lib/career-config";

interface CareerPathCardProps {
  career: CareerConfig;
  cluster: ClusterConfig;
}

export default function CareerPathCard({ career, cluster }: CareerPathCardProps) {
  return (
    <Link
      href={`/careers/${career.slug}`}
      className="card-hover group relative block rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-lg"
      style={{
        ["--cluster-accent" as string]: cluster.accent,
        ["--cluster-accent-light" as string]: cluster.accentLight,
      }}
    >
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 opacity-40 group-hover:opacity-100"
        style={{ backgroundColor: cluster.accent }}
      />

      <div className="p-5 pl-6">
        {/* Icon + title row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
            style={{ backgroundColor: cluster.accentBg }}
          >
            {career.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-gray-800 transition-colors">
              {career.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {career.description}
        </p>

        {/* Bottom row with cluster badge and arrow */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cluster.badgeClass}`}>
            {cluster.title}
          </span>
          <span className="text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 8px 30px ${cluster.accent}20, 0 4px 15px ${cluster.accent}10`,
        }}
      />
    </Link>
  );
}
