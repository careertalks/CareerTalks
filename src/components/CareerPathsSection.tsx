"use client";

import { useState } from "react";
import type { Cluster, CareerConfig, ClusterConfig } from "@/lib/career-config";
import CareerPathCard from "./CareerPathCard";

interface ClusterData {
  cluster: ClusterConfig;
  careers: CareerConfig[];
}

interface CareerPathsSectionProps {
  clusters: ClusterData[];
}

const clusterOrder: Cluster[] = ["tech", "business", "science", "creative"];

const clusterDescriptions: Record<Cluster, string> = {
  tech: "Build the future with code, data, and digital innovation",
  business: "Lead, strategize, and drive commerce forward",
  science: "Research, discover, and solve the world's biggest challenges",
  creative: "Design, advocate, and shape culture and communities",
};

export default function CareerPathsSection({ clusters }: CareerPathsSectionProps) {
  const [activeCluster, setActiveCluster] = useState<Cluster>("tech");

  const activeData = clusters.find((c) => c.cluster.id === activeCluster);

  return (
    <section id="careers" className="py-16 sm:py-20 bg-gray-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Choose Your Career Path
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Explore 20 industries organized into four clusters. Each path comes
            with guides, insights, and resources.
          </p>
        </div>

        {/* Cluster tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 gap-1">
            {clusterOrder.map((clusterId) => {
              const data = clusters.find((c) => c.cluster.id === clusterId);
              if (!data) return null;
              const isActive = activeCluster === clusterId;

              return (
                <button
                  key={clusterId}
                  onClick={() => setActiveCluster(clusterId)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: data.cluster.accent }
                      : undefined
                  }
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-white/80" : ""
                      }`}
                      style={
                        !isActive
                          ? { backgroundColor: data.cluster.accent }
                          : undefined
                      }
                    />
                    {data.cluster.title}
                    <span
                      className={`text-xs font-normal ${
                        isActive ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {data.careers.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active cluster description */}
        {activeData && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 italic">
              {clusterDescriptions[activeCluster]}
            </p>
          </div>
        )}

        {/* Career cards grid */}
        {activeData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeData.careers.map((career) => (
              <CareerPathCard
                key={career.slug}
                career={career}
                cluster={activeData.cluster}
              />
            ))}
          </div>
        )}

        {/* View all careers link */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-400">
            {clusters.reduce((sum, c) => sum + c.careers.length, 0)} career paths
            across {clusters.length} clusters
          </p>
        </div>
      </div>
    </section>
  );
}
