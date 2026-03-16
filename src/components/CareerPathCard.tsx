import Link from "next/link";
import Image from "next/image";
import type { CareerConfig, ClusterConfig } from "@/lib/career-config";

interface CareerPathCardProps {
  career: CareerConfig;
  cluster: ClusterConfig;
}

export default function CareerPathCard({ career, cluster }: CareerPathCardProps) {
  // Convention-based image path: /images/careers/{slug}.jpg
  const imagePath = `/images/careers/${career.slug}.jpg`;

  return (
    <Link
      href={`/careers/${career.slug}`}
      className="card-hover group relative block rounded-2xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-xl"
    >
      {/* Image / Gradient header */}
      <div className="relative h-36 overflow-hidden">
        {/* Gradient fallback (always rendered as base layer) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cluster.gradientFrom} ${cluster.gradientTo}`}
        >
          {/* Large decorative icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 text-7xl select-none">
            {career.icon}
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute bottom-2 left-6 w-12 h-12 rounded-full bg-white/5" />
        </div>

        {/* Actual image overlay (if it exists, loaded via next/image) */}
        <Image
          src={imagePath}
          alt={career.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            // Hide broken image to show gradient fallback
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Bottom gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Cluster badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: `${cluster.accent}20`,
              color: cluster.accentLight,
              border: `1px solid ${cluster.accent}40`,
            }}
          >
            {cluster.title}
          </span>
        </div>

        {/* Growth rate badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/90 text-emerald-700">
            ↑ {career.stats.growthRate}
          </span>
        </div>

        {/* Career icon + title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">{career.icon}</span>
            <h3 className="font-bold text-white text-sm leading-tight drop-shadow-md">
              {career.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {career.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-gray-900">{career.stats.avgSalary}</span>
            <span className="text-xs text-gray-400">avg</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-400 truncate block">
              {career.stats.topRoles.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold transition-colors"
            style={{ color: cluster.accent }}
          >
            Explore path →
          </span>
          <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
            6 articles
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 8px 30px ${cluster.accent}20, 0 4px 15px ${cluster.accent}10`,
        }}
      />
    </Link>
  );
}
