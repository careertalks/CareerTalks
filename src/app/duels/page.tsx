"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import {
  subjectStreams,
  careerProgressions,
  getStreamById,
  getCareerProgressionBySlug,
  getCareersByStream,
  getStreamsByCareer,
} from "@/lib/career-pathways-data";
import type {
  StreamId,
  SubjectStream,
  CareerProgression,
  CareerStage,
  SpecializationOption,
  ProgressionContext,
} from "@/lib/career-pathways-data";
import ShareButton from "@/components/ShareButton";

export default function CareerPathwaysPage() {
  const [selectedStream, setSelectedStream] = useState<StreamId | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerSlug | null>(null);
  const [selectedFork, setSelectedFork] = useState<number | null>(null);
  const [context, setContext] = useState<ProgressionContext>("india");

  const currentStream = selectedStream ? getStreamById(selectedStream) ?? null : null;
  const currentCareer = selectedCareer ? getCareerProgressionBySlug(selectedCareer) : null;
  const currentCareerConfig = selectedCareer ? careerConfigs[selectedCareer] : null;
  const currentCluster = currentCareerConfig ? clusterConfigs[currentCareerConfig.cluster] : null;

  // Get careers for current stream
  const careersInStream = useMemo(() => {
    if (!selectedStream) return [];
    const careerSlugs = getCareersByStream(selectedStream);
    return careerSlugs
      .map((slug) => {
        const config = careerConfigs[slug];
        const progression = getCareerProgressionBySlug(slug);
        return { slug, config, progression, cluster: clusterConfigs[config.cluster] };
      })
      .sort((a, b) => a.config.title.localeCompare(b.config.title));
  }, [selectedStream]);

  // Get selected fork specialization
  const selectedSpecialization =
    currentCareer && selectedFork !== null ? currentCareer.fork.options[selectedFork] : null;

  // Reset fork when career changes
  const handleCareerSelect = (careerSlug: CareerSlug) => {
    setSelectedCareer(careerSlug);
    setSelectedFork(null);
  };

  // Phase 1: Stream Selection
  if (!selectedStream) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="hero-dark py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <span className="text-sm font-semibold text-white">📚 Career Pathways</span>
          </div>
          <h1 className="mx-auto mb-4 max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
            From School Subjects to Dream Career
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-100">
            Pick your Class 11-12 stream and discover where it leads. Explore 20+ career paths
            with 10-year progressions, salary insights, and specialization options.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjectStreams.map((stream) => {
              const careerCount = getCareersByStream(stream.id).length;
              return (
                <button
                  key={stream.id}
                  onClick={() => setSelectedStream(stream.id)}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-lg hover:scale-105"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: stream.color,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-3 text-4xl">{stream.icon}</div>
                    <h3 className="font-extrabold text-gray-900">{stream.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{stream.description}</p>
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-semibold text-blue-600">
                        Opens {careerCount} career paths
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stream.coreSubjects.slice(0, 3).map((subject) => (
                          <span
                            key={subject}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Tip:</strong> PCMB covers the most options with
              access to engineering, medicine, and research careers!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2: Career Map
  if (!selectedCareer) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Stream Header */}
        <div className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedStream(null);
                    setSelectedCareer(null);
                    setSelectedFork(null);
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <div>
                  <div
                    className="rounded-lg px-3 py-2 text-white"
                    style={{ backgroundColor: currentStream?.color }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{currentStream?.icon}</span>
                      <div>
                        <h2 className="font-extrabold">{currentStream?.name}</h2>
                        <p className="text-xs opacity-90">
                          {currentStream?.coreSubjects.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* India/Global Toggle */}
              <div className="flex gap-2 rounded-full bg-gray-200 p-1">
                <button
                  onClick={() => setContext("india")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    context === "india"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🇮🇳 India
                </button>
                <button
                  onClick={() => setContext("global")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    context === "global"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🌐 Global
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Entrance Exams */}
        <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-b">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Relevant Entrance Exams:
            </p>
            <div className="flex flex-wrap gap-2">
              {currentStream?.entranceExams.map((exam) => (
                <span
                  key={exam}
                  className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {exam}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Careers Grid */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-2xl font-extrabold text-gray-900">
            Career Paths from {currentStream?.shortName}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careersInStream.map((item, idx) => {
              const entryStage = item.progression?.stages[0];
              const stage4 = item.progression?.fork.options[0]?.stages[1];
              const entrySalary = entryStage?.salary[context] || "N/A";
              const finalSalary = stage4?.salary[context] || "N/A";

              return (
                <div
                  key={item.slug}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.config.icon}</span>
                          <h4 className="font-extrabold text-gray-900">
                            {item.config.title}
                          </h4>
                        </div>
                        <div className="mt-2">
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                            style={{ backgroundColor: item.cluster.accent }}
                          >
                            {item.cluster.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 border-t pt-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Entry Salary
                        </p>
                        <p className="text-lg font-bold text-gray-900">{entrySalary}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Growth Potential
                        </p>
                        <p
                          className="text-lg font-bold"
                          style={{ color: item.cluster.accent }}
                        >
                          {finalSalary}+
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCareerSelect(item.slug)}
                      className="mt-4 w-full rounded-lg px-4 py-2 font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: item.cluster.accent }}
                    >
                      Explore Path →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: Career Progression Timeline
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setSelectedCareer(null);
                setSelectedFork(null);
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              ← Back to Career Map
            </button>

            {/* India/Global Toggle */}
            <div className="flex gap-2 rounded-full bg-gray-200 p-1">
              <button
                onClick={() => setContext("india")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  context === "india"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🇮🇳 India
              </button>
              <button
                onClick={() => setContext("global")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  context === "global"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🌐 Global
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Career Header */}
        <div className="mb-12 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-4xl">{currentCareerConfig?.icon}</span>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {currentCareerConfig?.title}
              </h1>
              <span
                className="inline-block mt-2 rounded-full px-3 py-1 text-sm font-semibold text-white"
                style={{ backgroundColor: currentCluster?.accent }}
              >
                {currentCluster?.title}
              </span>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Education Path ({context}):</strong>{" "}
              {currentCareer?.educationPath[context]}
            </p>
          </div>
        </div>

        {/* Top Companies */}
        {currentCareer && (
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-extrabold text-gray-900">
              Top Companies Hiring
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentCareer.topCompanies[context].map((company) => (
                <span
                  key={company}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {currentCareer && (
          <div className="relative mb-16">
            {/* Vertical Line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-1"
              style={{ backgroundColor: currentCluster?.accent }}
            />

            <div className="space-y-8">
              {/* Stages 1-2 */}
              {currentCareer.stages.map((stage, idx) => (
                <TimelineStage
                  key={`stage-${stage.stage}`}
                  stage={stage}
                  clusterAccent={currentCluster?.accent || "#3B82F6"}
                  isFirst={idx === 0}
                />
              ))}

              {/* Fork Section */}
              {selectedFork === null && (
                <ForkSection
                  fork={currentCareer.fork}
                  onSelectFork={setSelectedFork}
                  clusterAccent={currentCluster?.accent || "#3B82F6"}
                  context={context}
                />
              )}

              {/* Stages 3-4 (after fork selection) */}
              {selectedFork !== null && selectedSpecialization && (
                <>
                  {selectedSpecialization.stages.map((stage, idx) => (
                    <TimelineStage
                      key={`fork-stage-${stage.stage}`}
                      stage={stage}
                      clusterAccent={currentCluster?.accent || "#3B82F6"}
                      isFirst={false}
                    />
                  ))}
                  <button
                    onClick={() => setSelectedFork(null)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    ← Change specialization
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Shareable Summary Card */}
        {currentCareer && selectedSpecialization && (
          <ShareableSummaryCard
            stream={currentStream}
            career={currentCareerConfig}
            specialization={selectedSpecialization}
            context={context}
            clusterAccent={currentCluster?.accent || "#3B82F6"}
          />
        )}
      </div>
    </div>
  );
}

// Timeline Stage Component
function TimelineStage({
  stage,
  clusterAccent,
  isFirst,
}: {
  stage: CareerStage;
  clusterAccent: string;
  isFirst: boolean;
}) {
  return (
    <div className="relative pl-24">
      {/* Circle Marker */}
      <div
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white font-extrabold text-white shadow-md border-4"
        style={{ borderColor: clusterAccent, backgroundColor: clusterAccent }}
      >
        {stage.stage}
      </div>

      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-extrabold text-gray-900">{stage.title}</h3>
          <span className="text-sm font-semibold text-gray-500">{stage.yearRange}</span>
        </div>

        <p className="mt-4 text-3xl font-extrabold" style={{ color: clusterAccent }}>
          {stage.salary.india}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Key Skills</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {stage.keySkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700"
                  style={{ borderColor: clusterAccent, backgroundColor: `${clusterAccent}10` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600">{stage.description}</p>

          <div
            className="border-l-4 px-4 py-3 italic text-gray-600"
            style={{
              borderLeftColor: clusterAccent,
              backgroundColor: `${clusterAccent}08`,
            }}
          >
            <strong className="not-italic text-gray-900">Milestone:</strong> {stage.milestone}
          </div>
        </div>
      </div>
    </div>
  );
}

// Fork Section Component
function ForkSection({
  fork,
  onSelectFork,
  clusterAccent,
  context,
}: {
  fork: any;
  onSelectFork: (idx: number) => void;
  clusterAccent: string;
  context: ProgressionContext;
}) {
  return (
    <div className="relative pl-24">
      {/* Diamond Marker */}
      <div
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center font-bold text-xl text-white shadow-md rounded-full"
        style={{ backgroundColor: clusterAccent }}
      >
        🔀
      </div>

      <div className="rounded-xl border-2 border-dashed bg-white p-6 shadow-sm" style={{ borderColor: clusterAccent }}>
        <h3 className="mb-6 text-center text-lg font-extrabold text-gray-900">
          {fork.question}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fork.options.map((option: SpecializationOption, idx: number) => {
            const stage3 = option.stages[0];
            return (
              <button
                key={idx}
                onClick={() => onSelectFork(idx)}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-lg hover:border-current"
                style={{ borderColor: clusterAccent }}
              >
                <div className="mb-3 text-3xl">{option.icon}</div>
                <h4 className="font-extrabold text-gray-900">{option.label}</h4>
                <p className="mt-2 text-sm text-gray-600">{option.description}</p>
                <div className="mt-4 border-t pt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Year 4-7</p>
                  <p className="font-bold text-gray-900">{stage3?.title}</p>
                  <p className="text-sm font-semibold" style={{ color: clusterAccent }}>
                    {stage3?.salary[context]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Shareable Summary Card Component
function ShareableSummaryCard({
  stream,
  career,
  specialization,
  context,
  clusterAccent,
}: {
  stream: SubjectStream | null;
  career: any;
  specialization: SpecializationOption;
  context: ProgressionContext;
  clusterAccent: string;
}) {
  const entryStage = specialization.stages[0]?.salary[context];
  const stage4 = specialization.stages[1]?.salary[context];

  const shareMessage = `My career path: ${stream?.name} → ${career?.title} → ${specialization.label}! 📚🚀 Plan yours:`;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
      {/* Summary Card */}
      <div
        className="flex-1 overflow-hidden rounded-xl p-8 text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${clusterAccent} 0%, ${clusterAccent}dd 100%)`,
        }}
      >
        <div className="space-y-4">
          {/* Stream -> Career -> Specialization Path */}
          <div className="flex items-center gap-3 text-lg font-bold">
            <span className="text-2xl">{stream?.icon}</span>
            <span>{stream?.shortName}</span>
            <span className="text-xl">→</span>
            <span className="text-2xl">{career?.icon}</span>
            <span>{career?.title}</span>
          </div>

          <div className="border-t border-white/30 pt-4">
            <p className="mb-2 text-sm font-semibold opacity-90">Your Path: {specialization.label}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-75">Entry</p>
                <p className="text-xl font-bold">{specialization.stages[0]?.salary[context]}</p>
              </div>
              <div>
                <p className="opacity-75">Year 4</p>
                <p className="text-xl font-bold">{specialization.stages[0]?.title}</p>
              </div>
              <div>
                <p className="opacity-75">Year 7</p>
                <p className="text-xl font-bold">{specialization.stages[1]?.title}</p>
              </div>
              <div>
                <p className="opacity-75">Leadership</p>
                <p className="text-xl font-bold">{specialization.stages[1]?.salary[context]}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/30 pt-4 text-center text-xs font-semibold opacity-75">
          CareerTalks.space
        </div>
      </div>

      {/* Share Button */}
      <div className="flex flex-col gap-3">
        <ShareButton
          url={typeof window !== "undefined" ? window.location.href : ""}
          title="My Career Pathway"
          prefilledMessage={shareMessage}
        />
        <p className="text-center text-xs text-gray-500 md:text-left">
          Share your 10-year career progression with friends!
        </p>
      </div>
    </div>
  );
}
