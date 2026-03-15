"use client";

import { useState, useMemo } from "react";
import { careerConfigs, clusterConfigs, getClusterForCareer, CareerSlug } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";
import { InteractiveHero } from "@/components/interactive";
import { unlockBadge } from "@/lib/badges";

// Salary data structure for all 20 careers
type SalaryData = {
  slug: CareerSlug;
  india: { entry: number; mid: number; senior: number; lead: number; executive: number };
  global: { entry: number; mid: number; senior: number; lead: number; executive: number };
  levels: string[];
  milestones: { year: number; label: string }[];
};

const SALARY_DATA: SalaryData[] = [
  {
    slug: "ai-data-science",
    india: { entry: 8, mid: 18, senior: 30, lead: 45, executive: 70 },
    global: { entry: 85, mid: 128, senior: 170, lead: 210, executive: 280 },
    levels: ["Analyst", "Data Scientist", "Senior DS", "Lead DS", "Head of AI"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "software-development",
    india: { entry: 6, mid: 15, senior: 28, lead: 42, executive: 60 },
    global: { entry: 75, mid: 110, senior: 155, lead: 195, executive: 250 },
    levels: ["Junior Dev", "Mid Dev", "Senior Dev", "Tech Lead", "Engineering Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "fintech",
    india: { entry: 7, mid: 16, senior: 28, lead: 40, executive: 65 },
    global: { entry: 80, mid: 115, senior: 160, lead: 200, executive: 260 },
    levels: ["Analyst", "Associate", "VP", "Director", "MD"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "business-entrepreneurship",
    india: { entry: 5, mid: 12, senior: 22, lead: 35, executive: 55 },
    global: { entry: 55, mid: 95, senior: 140, lead: 180, executive: 240 },
    levels: ["Trainee", "Manager", "Senior Manager", "Director", "VP"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "clean-tech",
    india: { entry: 5, mid: 12, senior: 22, lead: 35, executive: 55 },
    global: { entry: 60, mid: 92, senior: 130, lead: 170, executive: 220 },
    levels: ["Junior Engineer", "Engineer", "Senior Engineer", "Principal", "VP Engineering"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "telecommunications",
    india: { entry: 5, mid: 12, senior: 22, lead: 32, executive: 50 },
    global: { entry: 65, mid: 98, senior: 135, lead: 170, executive: 210 },
    levels: ["Network Trainee", "Network Engineer", "Senior Engineer", "Architect", "VP Networks"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "biotech-pharma",
    india: { entry: 5, mid: 14, senior: 25, lead: 38, executive: 58 },
    global: { entry: 65, mid: 105, senior: 150, lead: 190, executive: 250 },
    levels: ["Research Trainee", "Scientist", "Senior Scientist", "Principal Scientist", "R&D Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "automotive",
    india: { entry: 5, mid: 11, senior: 20, lead: 32, executive: 48 },
    global: { entry: 58, mid: 88, senior: 125, lead: 165, executive: 210 },
    levels: ["Graduate Engineer", "Engineer", "Lead Engineer", "Engineering Manager", "VP Engineering"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "retail-logistics",
    india: { entry: 4, mid: 10, senior: 18, lead: 28, executive: 42 },
    global: { entry: 45, mid: 75, senior: 110, lead: 145, executive: 190 },
    levels: ["Coordinator", "Manager", "Senior Manager", "Director", "VP Operations"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "digital-marketing",
    india: { entry: 4, mid: 10, senior: 18, lead: 28, executive: 45 },
    global: { entry: 45, mid: 72, senior: 110, lead: 150, executive: 200 },
    levels: ["Executive", "Specialist", "Manager", "Head of Marketing", "CMO"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "product-management",
    india: { entry: 8, mid: 18, senior: 30, lead: 45, executive: 65 },
    global: { entry: 85, mid: 120, senior: 165, lead: 210, executive: 270 },
    levels: ["APM", "PM", "Senior PM", "Group PM", "VP Product"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "real-estate",
    india: { entry: 4, mid: 10, senior: 18, lead: 28, executive: 45 },
    global: { entry: 48, mid: 78, senior: 115, lead: 155, executive: 200 },
    levels: ["Trainee", "Agent/Analyst", "Manager", "Director", "VP/Partner"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "law-legal",
    india: { entry: 5, mid: 12, senior: 22, lead: 35, executive: 55 },
    global: { entry: 60, mid: 95, senior: 145, lead: 190, executive: 250 },
    levels: ["Associate", "Senior Associate", "Partner-Track", "Junior Partner", "Senior Partner"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "fashion-design",
    india: { entry: 3, mid: 8, senior: 15, lead: 25, executive: 40 },
    global: { entry: 38, mid: 65, senior: 95, lead: 130, executive: 175 },
    levels: ["Assistant Designer", "Designer", "Senior Designer", "Design Director", "Creative Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "human-resources",
    india: { entry: 4, mid: 10, senior: 18, lead: 28, executive: 42 },
    global: { entry: 50, mid: 78, senior: 115, lead: 150, executive: 195 },
    levels: ["HR Exec", "HR Manager", "Senior HRBP", "HR Director", "CHRO"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "architecture-planning",
    india: { entry: 4, mid: 10, senior: 18, lead: 28, executive: 45 },
    global: { entry: 48, mid: 82, senior: 120, lead: 160, executive: 210 },
    levels: ["Junior Architect", "Architect", "Senior Architect", "Principal", "Design Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "healthcare-management",
    india: { entry: 5, mid: 12, senior: 22, lead: 35, executive: 52 },
    global: { entry: 55, mid: 85, senior: 128, lead: 170, executive: 220 },
    levels: ["Coordinator", "Manager", "Senior Manager", "Director", "VP/Administrator"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "hospitality-management",
    india: { entry: 3, mid: 8, senior: 15, lead: 25, executive: 38 },
    global: { entry: 35, mid: 62, senior: 95, lead: 130, executive: 170 },
    levels: ["Trainee", "Supervisor", "Manager", "General Manager", "Regional Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "education-social-work",
    india: { entry: 3, mid: 7, senior: 12, lead: 20, executive: 32 },
    global: { entry: 35, mid: 58, senior: 85, lead: 110, executive: 145 },
    levels: ["Teacher", "Senior Teacher", "Head of Dept", "Principal", "Director of Education"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
  {
    slug: "creative-arts",
    india: { entry: 3, mid: 8, senior: 15, lead: 25, executive: 40 },
    global: { entry: 40, mid: 70, senior: 105, lead: 140, executive: 185 },
    levels: ["Junior Designer", "Designer", "Senior/Lead", "Art Director", "Creative Director"],
    milestones: [
      { year: 0, label: "Start your career" },
      { year: 2, label: "First major project" },
      { year: 4, label: "Promotion to mid-level" },
      { year: 6, label: "Team lead responsibility" },
      { year: 8, label: "Senior leadership" },
    ],
  },
];

// Smooth interpolation function
function interpolateSalary(years: number, points: [number, number][]): number {
  if (years <= points[0][0]) return points[0][1];
  if (years >= points[points.length - 1][0]) return points[points.length - 1][1];

  let i = 0;
  while (i < points.length - 1 && points[i + 1][0] < years) i++;

  const [x0, y0] = points[i];
  const [x1, y1] = points[i + 1];
  const t = (years - x0) / (x1 - x0);

  return y0 + t * (y1 - y0);
}

// Format salary
function formatSalary(value: number, isIndia: boolean): string {
  if (isIndia) {
    if (value >= 100) {
      return `₹${(value / 100).toFixed(1)} Cr`;
    }
    return `₹${value} LPA`;
  } else {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}M`;
    }
    return `$${Math.round(value)}K`;
  }
}

// Get salary at a specific year
function getSalaryAtYear(data: SalaryData, year: number, isIndia: boolean): number {
  const salaryData = isIndia ? data.india : data.global;
  const points: [number, number][] = [
    [0, salaryData.entry],
    [2, salaryData.mid],
    [4, salaryData.senior],
    [6, salaryData.lead],
    [8, salaryData.executive],
    [10, salaryData.executive],
  ];
  return interpolateSalary(year, points);
}

// Get current level
function getCurrentLevel(year: number): number {
  if (year < 2) return 0;
  if (year < 4) return 1;
  if (year < 6) return 2;
  if (year < 8) return 3;
  return 4;
}

export default function SalaryCalculator() {
  const [selectedCareer, setSelectedCareer] = useState<CareerSlug>("software-development");
  const [isIndia, setIsIndia] = useState(true);
  const [years, setYears] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const [compareCareer, setCompareCareer] = useState<CareerSlug>("ai-data-science");

  // Trigger badge unlock
  const unlockSalarySeekerBadge = () => {
    unlockBadge("salary-seeker");
  };

  const salaryData = SALARY_DATA.find((d) => d.slug === selectedCareer)!;
  const compareSalaryData = SALARY_DATA.find((d) => d.slug === compareCareer)!;
  const currentSalary = getSalaryAtYear(salaryData, years, isIndia);
  const startingSalary = getSalaryAtYear(salaryData, 0, isIndia);
  const finalSalary = getSalaryAtYear(salaryData, 10, isIndia);
  const currentLevel = getCurrentLevel(years);
  const clusterConfig = getClusterForCareer(selectedCareer);
  const careerConfig = careerConfigs[selectedCareer];

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/salary-calculator`;
  const shareTitle = `Salary Growth: ${careerConfig.title}`;
  const shareMessage = `I just calculated my 10-year earnings as a ${careerConfig.title}: ${formatSalary(finalSalary, isIndia)}! That's a ${(finalSalary / startingSalary).toFixed(1)}x growth from entry level. See what you could earn:`;

  // Generate chart points
  const chartPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= 10; i += 0.5) {
    const salary = getSalaryAtYear(salaryData, i, isIndia);
    chartPoints.push({ x: i, y: salary });
  }

  const compareChartPoints: { x: number; y: number }[] = [];
  if (showCompare) {
    for (let i = 0; i <= 10; i += 0.5) {
      const salary = getSalaryAtYear(compareSalaryData, i, isIndia);
      compareChartPoints.push({ x: i, y: salary });
    }
  }

  const maxY = Math.max(
    ...chartPoints.map((p) => p.y),
    ...compareChartPoints.map((p) => p.y)
  );

  // SVG dimensions
  const chartWidth = 600;
  const chartHeight = 400;
  const padding = { top: 30, right: 20, bottom: 40, left: 60 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  // Scale functions
  const scaleX = (x: number) => padding.left + (x / 10) * plotWidth;
  const scaleY = (y: number) => padding.top + plotHeight - (y / maxY) * plotHeight;

  // Current position on chart
  const currentX = scaleX(years);
  const currentY = scaleY(currentSalary);

  // Generate path for main career
  const pathData = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`).join(" ");
  const comparePathData = compareChartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`).join(" ");

  // Growth percentage
  const growthPercentage = ((finalSalary - startingSalary) / startingSalary) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InteractiveHero
        badge="💰 Salary Calculator"
        title="Salary & Growth Calculator"
        subtitle="Project your career earnings over 10 years and discover your growth potential"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Career Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Your Career
              </label>
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value as CareerSlug)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {Object.entries(careerConfigs).map(([slug, config]) => (
                  <option key={slug} value={slug}>
                    {config.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Context Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Market Context
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsIndia(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    isIndia
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  India 🇮🇳
                </button>
                <button
                  onClick={() => setIsIndia(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    !isIndia
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Global 🌍
                </button>
              </div>
            </div>

            {/* Experience Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Years of Experience: {years}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={years}
                onChange={(e) => {
                  setYears(parseInt(e.target.value));
                  unlockSalarySeekerBadge();
                }}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Entry</span>
                <span>Senior</span>
                <span>Executive</span>
              </div>
            </div>

            {/* Compare Button */}
            <div>
              <button
                onClick={() => setShowCompare(!showCompare)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
              >
                {showCompare ? "Hide Comparison" : "Compare Another Career"}
              </button>
              {showCompare && (
                <select
                  value={compareCareer}
                  onChange={(e) => setCompareCareer(e.target.value as CareerSlug)}
                  className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {Object.entries(careerConfigs).map(([slug, config]) => (
                    <option key={slug} value={slug}>
                      {config.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Right Content - Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Salary Display */}
            <div
              className="p-6 rounded-xl border-2"
              style={{
                borderColor: clusterConfig.accent,
                backgroundColor: clusterConfig.accentBg,
              }}
            >
              <p className="text-sm text-gray-600 mb-2">Current Projected Salary</p>
              <h3
                className="text-4xl font-bold mb-1"
                style={{ color: clusterConfig.accent }}
              >
                {formatSalary(currentSalary, isIndia)}
              </h3>
              <p className="text-gray-700 font-medium">
                Level: {salaryData.levels[currentLevel]}
              </p>
            </div>

            {/* Growth Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">10-Year Salary Growth</h3>
              <svg
                width={Math.min(chartWidth, 600)}
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full"
              >
                {/* Grid lines */}
                {[0, 2, 4, 6, 8, 10].map((year) => (
                  <line
                    key={`grid-x-${year}`}
                    x1={scaleX(year)}
                    y1={padding.top}
                    x2={scaleX(year)}
                    y2={padding.top + plotHeight}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Gradient fill under main curve */}
                <defs>
                  <linearGradient id="salary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={clusterConfig.accent} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={clusterConfig.accent} stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Area under curve */}
                <path
                  d={`${pathData} L ${scaleX(10)} ${padding.top + plotHeight} Z`}
                  fill="url(#salary-gradient)"
                />

                {/* Main career curve */}
                <path
                  d={pathData}
                  stroke={clusterConfig.accent}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Compare career curve */}
                {showCompare && (
                  <path
                    d={comparePathData}
                    stroke="#999"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Level markers */}
                {[
                  { year: 0, label: "Entry" },
                  { year: 2, label: "Mid" },
                  { year: 4, label: "Senior" },
                  { year: 6, label: "Lead" },
                  { year: 8, label: "Exec" },
                ].map((marker) => {
                  const salary = getSalaryAtYear(salaryData, marker.year, isIndia);
                  return (
                    <circle
                      key={`level-${marker.year}`}
                      cx={scaleX(marker.year)}
                      cy={scaleY(salary)}
                      r="5"
                      fill={clusterConfig.accent}
                    />
                  );
                })}

                {/* Current position marker */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="8"
                  fill={clusterConfig.accent}
                  stroke="white"
                  strokeWidth="3"
                  opacity="1"
                />

                {/* Axes */}
                <line
                  x1={padding.left}
                  y1={padding.top + plotHeight}
                  x2={padding.left + plotWidth}
                  y2={padding.top + plotHeight}
                  stroke="#333"
                  strokeWidth="2"
                />
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={padding.top + plotHeight}
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                {[0, 2, 4, 6, 8, 10].map((year) => (
                  <g key={`x-label-${year}`}>
                    <text
                      x={scaleX(year)}
                      y={padding.top + plotHeight + 25}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#666"
                    >
                      {year}
                    </text>
                  </g>
                ))}

                {/* Y-axis labels */}
                {isIndia ? (
                  <>
                    <text x={padding.left - 50} y={padding.top + plotHeight} fontSize="12" fill="#666" textAnchor="end">
                      ₹{(0).toFixed(0)}
                    </text>
                    <text x={padding.left - 50} y={padding.top + (plotHeight * 2) / 4} fontSize="12" fill="#666" textAnchor="end">
                      ₹{Math.round(maxY / 2)}
                    </text>
                    <text x={padding.left - 50} y={padding.top} fontSize="12" fill="#666" textAnchor="end">
                      ₹{Math.round(maxY)}
                    </text>
                  </>
                ) : (
                  <>
                    <text x={padding.left - 50} y={padding.top + plotHeight} fontSize="12" fill="#666" textAnchor="end">
                      ${(0).toFixed(0)}K
                    </text>
                    <text x={padding.left - 50} y={padding.top + (plotHeight * 2) / 4} fontSize="12" fill="#666" textAnchor="end">
                      ${Math.round(maxY / 2)}K
                    </text>
                    <text x={padding.left - 50} y={padding.top} fontSize="12" fill="#666" textAnchor="end">
                      ${Math.round(maxY)}K
                    </text>
                  </>
                )}

                {/* Axis labels */}
                <text x={chartWidth / 2} y={chartHeight - 5} textAnchor="middle" fontSize="12" fill="#999">
                  Years of Experience
                </text>
                <text
                  x={20}
                  y={chartHeight / 2}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#999"
                  transform={`rotate(-90 20 ${chartHeight / 2})`}
                >
                  {isIndia ? "Salary (LPA)" : "Salary (USD)"}
                </text>
              </svg>
            </div>

            {/* Level Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Levels</h3>
              <div className="space-y-3">
                {salaryData.levels.map((level, idx) => {
                  const isCurrentLevel = idx === currentLevel;
                  const yearRange = `Year ${idx * 2}-${(idx + 1) * 2}`;
                  const salaryRange = `${formatSalary(getSalaryAtYear(salaryData, idx * 2, isIndia), isIndia)} - ${formatSalary(
                    getSalaryAtYear(salaryData, (idx + 1) * 2, isIndia),
                    isIndia
                  )}`;

                  return (
                    <div
                      key={level}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCurrentLevel
                          ? `border-2 bg-white`
                          : "border-gray-200 bg-gray-50"
                      }`}
                      style={{
                        borderColor: isCurrentLevel ? clusterConfig.accent : undefined,
                        backgroundColor: isCurrentLevel ? clusterConfig.accentBg : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4
                            className={`font-semibold ${
                              isCurrentLevel ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {level}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{yearRange}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{salaryRange}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Growth Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">10-Year Earnings</p>
                <h3 className="text-2xl font-bold text-green-700">
                  {formatSalary(finalSalary, isIndia)}
                </h3>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Growth Multiple</p>
                <h3 className="text-2xl font-bold text-blue-700">
                  {(finalSalary / startingSalary).toFixed(1)}x
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {growthPercentage.toFixed(0)}% increase
                </p>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex gap-4 items-center">
              <ShareButton
                url={shareUrl}
                title={shareTitle}
                description="Check out your career growth potential"
                prefilledMessage={shareMessage}
              />
              <p className="text-sm text-gray-600">Share your growth potential</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
