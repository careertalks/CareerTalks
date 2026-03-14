"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { Cluster, CareerSlug, CareerConfig } from "@/lib/career-config";
import { extendedCareerData } from "@/lib/interactive-data";
import type { ExtendedCareerData } from "@/lib/interactive-data";
import ShareButton from "@/components/ShareButton";

const SALARY_THRESHOLDS = [0, 60, 70, 80, 90, 100];
const GROWTH_THRESHOLDS = [0, 10, 15, 20];
const DEMAND_LEVELS = ["Moderate", "High", "Very High", "Growing"];

export default function CareerExplorerPage() {
  const [clusters, setClusters] = useState<Set<Cluster>>(
    new Set(["tech", "business", "science", "creative"])
  );
  const [minSalary, setMinSalary] = useState(0);
  const [minGrowth, setMinGrowth] = useState(0);
  const [demandLevels, setDemandLevels] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<CareerSlug[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtering logic
  const filteredCareers = useMemo(() => {
    return Object.values(careerConfigs)
      .filter((career) => {
        const extended = extendedCareerData.find((e) => e.slug === career.slug);
        if (!extended) return false;
        if (!clusters.has(career.cluster)) return false;
        if (extended.salaryRange.min < minSalary * 1000) return false;
        if (parseFloat(career.stats.growthRate) < minGrowth) return false;
        if (demandLevels.size > 0 && !demandLevels.has(extended.demandLevel))
          return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            career.title.toLowerCase().includes(q) ||
            extended.keySkills.some((s) => s.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [clusters, minSalary, minGrowth, demandLevels, searchQuery]);

  const toggleCluster = (cluster: Cluster) => {
    const newClusters = new Set(clusters);
    if (newClusters.has(cluster)) {
      newClusters.delete(cluster);
    } else {
      newClusters.add(cluster);
    }
    setClusters(newClusters);
  };

  const toggleDemandLevel = (level: string) => {
    const newDemandLevels = new Set(demandLevels);
    if (newDemandLevels.has(level)) {
      newDemandLevels.delete(level);
    } else {
      newDemandLevels.add(level);
    }
    setDemandLevels(newDemandLevels);
  };

  const toggleCompare = (slug: CareerSlug) => {
    const newList = compareList.includes(slug)
      ? compareList.filter((s) => s !== slug)
      : [...compareList, slug].slice(-3); // Max 3 comparisons
    setCompareList(newList);
    setShowComparison(false);
  };

  const clearAllFilters = () => {
    setClusters(new Set(["tech", "business", "science", "creative"]));
    setMinSalary(0);
    setMinGrowth(0);
    setDemandLevels(new Set());
    setSearchQuery("");
  };

  const comparisonCareers = compareList
    .map((slug) => careerConfigs[slug])
    .filter(Boolean);

  const getClusterColor = (cluster: Cluster): string => {
    return clusterConfigs[cluster]?.accent || "#6B7280";
  };

  const getGrowthColor = (growth: number): string => {
    if (growth >= 20) return "#10B981";
    if (growth >= 15) return "#3B82F6";
    if (growth >= 10) return "#F59E0B";
    return "#6B7280";
  };

  const formatSalary = (value: number): string => {
    if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return "$" + (value / 1000).toFixed(0) + "k";
    return "$" + value;
  };

  if (showComparison && comparisonCareers.length > 0) {
    return (
      <ComparisonView
        careers={comparisonCareers}
        onClose={() => setShowComparison(false)}
        compareList={compareList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="hero-dark bg-gradient-to-r from-blue-600 to-blue-700 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              🔍 Career Explorer
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Explore & Compare Careers
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Filter through 20 careers by salary, growth, demand, and skills. Find your perfect career fit or compare multiple paths.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition mb-4"
          >
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`${
              showMobileFilters ? "block" : "hidden"
            } lg:block lg:w-64 flex-shrink-0`}
          >
            <div className="sticky top-6 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* Clusters */}
              <div>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                  Career Clusters
                </h3>
                <div className="space-y-2">
                  {(["tech", "business", "science", "creative"] as const).map(
                    (cluster) => (
                      <label
                        key={cluster}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={clusters.has(cluster)}
                          onChange={() => toggleCluster(cluster)}
                          className="w-4 h-4 rounded border-gray-300"
                          style={{
                            accentColor: getClusterColor(cluster),
                          }}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {clusterConfigs[cluster]?.title}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                  Minimum Salary
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SALARY_THRESHOLDS.map((threshold) => (
                    <button
                      key={threshold}
                      onClick={() => setMinSalary(threshold)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        minSalary === threshold
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {threshold === 0 ? "Any" : `$${threshold}k+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Growth Rate */}
              <div>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                  Growth Rate
                </h3>
                <div className="flex flex-wrap gap-2">
                  {GROWTH_THRESHOLDS.map((threshold) => (
                    <button
                      key={threshold}
                      onClick={() => setMinGrowth(threshold)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        minGrowth === threshold
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {threshold === 0 ? "Any" : `${threshold}%+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demand Level */}
              <div>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                  Demand Level
                </h3>
                <div className="space-y-2">
                  {DEMAND_LEVELS.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={demandLevels.has(level)}
                        onChange={() => toggleDemandLevel(level)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                  Search
                </h3>
                <input
                  type="text"
                  placeholder="Search careers or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Count and Comparison Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm font-medium text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredCareers.length}</span> of{" "}
                <span className="font-semibold text-gray-900">20</span> careers
              </p>
              {compareList.length > 0 && (
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">
                    Comparing {compareList.length} career{compareList.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => setShowComparison(true)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </div>
              )}
            </div>

            {/* Career Grid */}
            {filteredCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => {
                  const extended = extendedCareerData.find(
                    (e) => e.slug === career.slug
                  );
                  if (!extended) return null;

                  const growth = parseFloat(career.stats.growthRate);
                  const isComparing = compareList.includes(career.slug);

                  return (
                    <div
                      key={career.slug}
                      className={`bg-white rounded-xl border transition-all hover:shadow-lg hover:scale-105 p-5 ${
                        isComparing
                          ? "border-blue-500 shadow-md ring-2 ring-blue-200"
                          : "border-gray-200"
                      }`}
                      style={{
                        borderLeftWidth: "3px",
                        borderLeftColor: getClusterColor(career.cluster),
                      }}
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl">{career.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-base">
                                {career.title}
                              </h3>
                              <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                                {clusterConfigs[career.cluster]?.title}
                              </span>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isComparing}
                            onChange={() => toggleCompare(career.slug)}
                            className="w-5 h-5 rounded border-gray-300"
                            style={{
                              accentColor: getClusterColor(career.cluster),
                            }}
                            title="Compare this career"
                          />
                        </div>
                      </div>

                      {/* Salary Range Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-600 font-semibold">
                            Salary Range
                          </span>
                          <span className="text-xs text-gray-900 font-bold">
                            {formatSalary(extended.salaryRange.min)} -{" "}
                            {formatSalary(extended.salaryRange.max)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                            style={{
                              width: `${Math.min(100, (extended.salaryRange.max / 200000) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Growth Rate */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex-1">
                          <span className="text-xs text-gray-600 font-semibold">
                            Growth Rate
                          </span>
                          <p className="font-bold text-gray-900">
                            {career.stats.growthRate}%
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: getGrowthColor(growth) }}
                        >
                          {growth >= 20
                            ? "Rapid"
                            : growth >= 15
                              ? "Strong"
                              : growth >= 10
                                ? "Steady"
                                : "Moderate"}
                        </div>
                      </div>

                      {/* Demand Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                          {extended.demandLevel} Demand
                        </span>
                      </div>

                      {/* Key Skills */}
                      <div className="mb-4">
                        <span className="text-xs text-gray-600 font-semibold block mb-2">
                          Key Skills
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {extended.keySkills.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {extended.keySkills.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{extended.keySkills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Education Level */}
                      <div className="mb-5">
                        <span className="text-xs text-gray-600 font-semibold">
                          Entry Education
                        </span>
                        <p className="text-sm text-gray-800 font-medium">
                          {extended.educationLevels?.[0] || "Bachelor's Degree"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/careers/${career.slug}`}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition text-center"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-semibold text-gray-900 mb-2">
                  No careers match your filters
                </p>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or clearing filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Comparison View Component
function ComparisonView({
  careers,
  onClose,
  compareList,
}: {
  careers: CareerConfig[];
  onClose: () => void;
  compareList: CareerSlug[];
}) {
  const extendedDataMap = new Map(
    extendedCareerData.map((data) => [data.slug, data])
  );

  const comparisons = careers.map((career) => ({
    career,
    extended: extendedDataMap.get(career.slug),
  }));

  const formatSalary = (value: number): string => {
    if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return "$" + (value / 1000).toFixed(0) + "k";
    return "$" + value;
  };

  const getClusterColor = (cluster: Cluster): string => {
    return clusterConfigs[cluster]?.accent || "#6B7280";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="hero-dark bg-gradient-to-r from-blue-600 to-blue-700 py-12 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Career Comparison
              </h1>
              <p className="text-blue-100">
                Comparing {careers.length} career{careers.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition"
            >
              Back to Explorer
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-6 py-4 text-left font-bold text-gray-900 min-w-[200px]">
                  Career
                </th>
                {comparisons.map((comp) => (
                  <th key={comp.career.slug} className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">{comp.career.icon}</span>
                      <span className="font-bold text-gray-900">
                        {comp.career.title}
                      </span>
                      <span
                        className="px-2 py-1 text-xs font-semibold text-white rounded"
                        style={{
                          backgroundColor: getClusterColor(comp.career.cluster as Cluster),
                        }}
                      >
                        {clusterConfigs[comp.career.cluster as Cluster]?.title}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Salary Range Row */}
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Salary Range
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-gray-700"
                  >
                    {comp.extended && (
                      <div className="font-semibold">
                        {formatSalary(comp.extended.salaryRange.min)} -{" "}
                        {formatSalary(comp.extended.salaryRange.max)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Growth Rate Row */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Growth Rate
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-gray-700"
                  >
                    <span className="font-bold text-lg">
                      {comp.career.stats.growthRate}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Demand Level Row */}
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Demand Level
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center"
                  >
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm">
                      {comp.extended?.demandLevel}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Key Skills Row */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Key Skills
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-sm"
                  >
                    {comp.extended && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {comp.extended.keySkills.slice(0, 6).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Education Paths Row */}
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Education Paths
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-sm text-gray-700"
                  >
                    {comp.extended && (
                      <div className="space-y-1">
                        {comp.extended.educationLevels.map((path, idx) => (
                          <div key={idx}>{path}</div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Work Environment Row */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Work Environment
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-sm text-gray-700"
                  >
                    {comp.extended?.workEnvironment}
                  </td>
                ))}
              </tr>

              {/* Entry Paths Row */}
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Entry Paths
                </td>
                {comparisons.map((comp) => (
                  <td
                    key={comp.career.slug}
                    className="px-6 py-4 text-center text-sm text-gray-700"
                  >
                    {comp.extended && (
                      <div className="space-y-1">
                        {comp.extended.entryPaths.map((path, idx) => (
                          <div key={idx}>{path}</div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="lg:hidden space-y-6">
          {comparisons.map((comp) => (
            <div
              key={comp.career.slug}
              className="bg-white rounded-xl border-2 p-6"
              style={{
                borderColor: getClusterColor(comp.career.cluster),
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">{comp.career.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {comp.career.title}
                  </h3>
                  <span
                    className="inline-block px-2 py-1 text-xs font-semibold text-white rounded"
                    style={{
                      backgroundColor: getClusterColor(comp.career.cluster as Cluster),
                    }}
                  >
                    {clusterConfigs[comp.career.cluster as Cluster]?.title}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {comp.extended && (
                  <>
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">
                        Salary Range
                      </span>
                      <span className="text-gray-700">
                        {formatSalary(comp.extended.salaryRange.min)} -{" "}
                        {formatSalary(comp.extended.salaryRange.max)}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">
                        Growth Rate
                      </span>
                      <span className="text-gray-700">
                        {comp.career.stats.growthRate}%
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">
                        Demand Level
                      </span>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-xs">
                        {comp.extended.demandLevel}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-2">
                        Key Skills
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {comp.extended.keySkills.slice(0, 6).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-2">
                        Education Paths
                      </span>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {comp.extended.educationLevels.map((path, idx) => (
                          <li key={idx}>{path}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">
                        Work Environment
                      </span>
                      <p className="text-gray-700">{comp.extended.workEnvironment}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-900 block mb-2">
                        Entry Paths
                      </span>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {comp.extended.entryPaths.map((path, idx) => (
                          <li key={idx}>{path}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <Link
                href={`/careers/${comp.career.slug}`}
                className="block mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center"
              >
                View Full Details
              </Link>
            </div>
          ))}
        </div>

        {/* Share Comparison Button */}
        <div className="mt-8 flex justify-center">
          <ShareButton
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/career-explorer`}
            title={`Comparing ${careers.map((c) => c.title).join(" vs ")} - Career Talk`}
            prefilledMessage={`Comparing ${careers.map((c) => c.title).join(" vs ")}: which would you choose? 🔍`}
          />
        </div>
      </div>
    </div>
  );
}
