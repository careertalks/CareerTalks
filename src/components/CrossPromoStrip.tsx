"use client";

import { getPromoTargets, buildUtmUrl } from "@/lib/ecosystem-config";
import type { EcosystemProject } from "@/lib/ecosystem-config";

interface CrossPromoStripProps {
  projectId?: "tpg" | "ct" | "aitt";
  index?: number;
}

function StripContent({ project }: { project: EcosystemProject }) {
  return (
    <a
      href={buildUtmUrl(project.url, "strip")}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 ${project.stripBg} rounded-xl px-5 py-3.5 transition-all duration-200 hover:opacity-90 group`}
    >
      <span className="text-xl flex-shrink-0">{project.icon}</span>
      <span className="flex-1 text-sm text-gray-300 font-medium">
        {project.tagline.includes(project.name)
          ? project.tagline.split(project.name).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <strong className={project.stripAccent}>{project.name}</strong>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )
          : project.tagline}
      </span>
      <span
        className={`${project.ctaBg} ${project.ctaHoverBg} text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap`}
      >
        {project.ctaLabel}
      </span>
    </a>
  );
}

export default function CrossPromoStrip({ projectId, index = 0 }: CrossPromoStripProps) {
  const targets = getPromoTargets();

  if (targets.length === 0) return null;

  if (projectId) {
    const project = targets.find((t) => t.id === projectId);
    if (!project) return null;
    return <StripContent project={project} />;
  }

  const project = targets[index % targets.length];
  return <StripContent project={project} />;
}
