"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { careerConfigs, clusterConfigs } from "@/lib/career-config";
import type { CareerSlug } from "@/lib/career-config";
import ShareButton from "@/components/ShareButton";

interface DuelState {
  allContestants: CareerSlug[];
  rounds: CareerSlug[][];
  currentRound: number;
  currentMatch: number;
  isTransitioning: boolean;
  champion: CareerSlug | null;
}

export default function CareerDuelsPage() {
  const [duelState, setDuelState] = useState<DuelState>({
    allContestants: [],
    rounds: [[], [], []],
    currentRound: 0,
    currentMatch: 0,
    isTransitioning: false,
    champion: null,
  });

  const [mounted, setMounted] = useState(false);

  // Initialize tournament on mount
  useEffect(() => {
    setMounted(true);
    initializeTournament();
  }, []);

  const initializeTournament = () => {
    const allCareers = Object.keys(careerConfigs) as CareerSlug[];
    const shuffled = allCareers.sort(() => Math.random() - 0.5).slice(0, 8);

    setDuelState({
      allContestants: shuffled,
      rounds: [[], [], []],
      currentRound: 0,
      currentMatch: 0,
      isTransitioning: false,
      champion: null,
    });
  };

  const getCurrentMatchup = useMemo(() => {
    if (duelState.champion) return null;

    const matchesPerRound = [4, 2, 1];
    const currentRoundWinners = duelState.rounds[duelState.currentRound] || [];

    let contestants: CareerSlug[];
    if (duelState.currentRound === 0) {
      contestants = duelState.allContestants;
    } else {
      contestants = duelState.rounds[duelState.currentRound - 1];
    }

    const matchIndex = duelState.currentMatch;
    const left = contestants[matchIndex * 2];
    const right = contestants[matchIndex * 2 + 1];

    return { left, right, matchIndex, totalMatches: matchesPerRound[duelState.currentRound] };
  }, [duelState]);

  const handleMatchWinner = (winner: CareerSlug) => {
    setDuelState((prev) => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setDuelState((prev) => {
        const updatedRounds = [...prev.rounds];
        const newWinners = [...(updatedRounds[prev.currentRound] || []), winner];
        updatedRounds[prev.currentRound] = newWinners;

        const matchesPerRound = [4, 2, 1];
        const totalMatches = matchesPerRound[prev.currentRound];

        // Check if tournament is complete
        if (newWinners.length === 1 && prev.currentRound === 2) {
          return {
            ...prev,
            rounds: updatedRounds,
            champion: winner,
            isTransitioning: false,
          };
        }

        // Move to next match or next round
        if (prev.currentMatch + 1 < totalMatches) {
          return {
            ...prev,
            rounds: updatedRounds,
            currentMatch: prev.currentMatch + 1,
            isTransitioning: false,
          };
        } else {
          return {
            ...prev,
            rounds: updatedRounds,
            currentRound: prev.currentRound + 1,
            currentMatch: 0,
            isTransitioning: false,
          };
        }
      });
    }, 600);
  };

  const roundNames = ["Quarterfinals", "Semifinals", "Grand Final"];
  const currentRoundName = roundNames[duelState.currentRound] || "Tournament";

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-dark py-12 md:py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            ⚔️ Career Duels
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Career Tournament</h1>
          <p className="text-lg text-white/80">
            Pick your favorite in each matchup to crown your champion career!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {!duelState.champion ? (
          <>
            {/* Mini Bracket Visualization */}
            {duelState.allContestants.length > 0 && (
              <div className="mb-12">
                <MiniBracket
                  allContestants={duelState.allContestants}
                  rounds={duelState.rounds}
                  currentRound={duelState.currentRound}
                />
              </div>
            )}

            {/* Round Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentRoundName}</h2>
              <p className="text-white/60">
                Match {duelState.currentMatch + 1} of {[4, 2, 1][duelState.currentRound]}
              </p>
            </div>

            {/* VS Screen */}
            {getCurrentMatchup && (
              <VSScreen
                matchup={getCurrentMatchup}
                onWinner={handleMatchWinner}
                isTransitioning={duelState.isTransitioning}
              />
            )}
          </>
        ) : (
          /* Champion Screen */
          <ChampionScreen champion={duelState.champion} onPlayAgain={initializeTournament} />
        )}
      </div>
    </main>
  );
}

interface VSScreenProps {
  matchup: {
    left: CareerSlug;
    right: CareerSlug;
    matchIndex: number;
    totalMatches: number;
  };
  onWinner: (winner: CareerSlug) => void;
  isTransitioning: boolean;
}

function VSScreen({ matchup, onWinner, isTransitioning }: VSScreenProps) {
  const leftCareer = careerConfigs[matchup.left];
  const rightCareer = careerConfigs[matchup.right];
  const leftCluster = clusterConfigs[leftCareer.cluster];
  const rightCluster = clusterConfigs[rightCareer.cluster];

  const [selectedWinner, setSelectedWinner] = useState<CareerSlug | null>(null);

  const handleSelection = (winner: CareerSlug) => {
    setSelectedWinner(winner);
    setTimeout(() => {
      onWinner(winner);
      setSelectedWinner(null);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
      {/* Left Career */}
      <CareerCard
        career={matchup.left}
        config={leftCareer}
        cluster={leftCluster}
        isSelected={selectedWinner === matchup.left}
        isLoser={selectedWinner ? selectedWinner !== matchup.left : false}
        onClick={() => handleSelection(matchup.left)}
        position="left"
      />

      {/* VS Badge */}
      <div className="flex items-center justify-center md:col-span-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
        <div className="bg-white text-black text-3xl md:text-4xl font-bold rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-vs-flash shadow-lg">
          VS
        </div>
      </div>

      {/* Right Career */}
      <CareerCard
        career={matchup.right}
        config={rightCareer}
        cluster={rightCluster}
        isSelected={selectedWinner === matchup.right}
        isLoser={selectedWinner ? selectedWinner !== matchup.right : false}
        onClick={() => handleSelection(matchup.right)}
        position="right"
      />
    </div>
  );
}

interface CareerCardProps {
  career: CareerSlug;
  config: any;
  cluster: any;
  isSelected: boolean;
  isLoser: boolean;
  onClick: () => void;
  position: "left" | "right";
}

function CareerCard({
  career,
  config,
  cluster,
  isSelected,
  isLoser,
  onClick,
  position,
}: CareerCardProps) {
  const gradientStart = cluster.colorStart;
  const gradientEnd = cluster.colorEnd;

  return (
    <button
      onClick={onClick}
      disabled={isLoser}
      className={`relative p-8 md:p-10 min-h-80 flex flex-col items-center justify-center text-center transition-all duration-300 ${
        position === "left" ? "md:rounded-l-2xl" : "md:rounded-r-2xl"
      } ${
        isSelected
          ? "scale-105 ring-4 ring-offset-2 ring-white"
          : isLoser
            ? "opacity-30 scale-95"
            : "hover:scale-102"
      } ${!isLoser ? "cursor-pointer" : "cursor-default"}`}
      style={{
        background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
      }}
    >
      {/* Icon */}
      <div className="text-6xl mb-6">{config.icon}</div>

      {/* Career Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{config.title}</h3>

      {/* Cluster Name */}
      <p className="text-white/80 text-sm mb-4">{cluster.title}</p>

      {/* Salary */}
      <div className="mb-4">
        <p className="text-white/70 text-xs uppercase tracking-wide">Median Salary</p>
        <p className="text-xl md:text-2xl font-semibold text-white">${config.stats.avgSalary}</p>
      </div>

      {/* Growth Rate */}
      <div className="mb-6">
        <p className="text-white/70 text-xs uppercase tracking-wide">Growth Rate</p>
        <p className="text-lg font-semibold text-white">{config.stats.growthRate}%</p>
      </div>

      {/* Top Roles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {config.stats.topRoles.slice(0, 3).map((role: string, idx: number) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
          >
            {role}
          </span>
        ))}
      </div>
    </button>
  );
}

interface MiniBracketProps {
  allContestants: CareerSlug[];
  rounds: CareerSlug[][];
  currentRound: number;
}

function MiniBracket({ allContestants, rounds, currentRound }: MiniBracketProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-2 justify-center">
        {allContestants.map((careerSlug) => {
          const config = careerConfigs[careerSlug];
          const isEliminated =
            !rounds[currentRound]?.includes(careerSlug) &&
            !rounds[currentRound === 0 ? currentRound : currentRound - 1]?.includes(careerSlug) &&
            currentRound > 0;
          const isWinner = rounds[currentRound]?.includes(careerSlug) || rounds[2]?.includes(careerSlug);

          return (
            <div
              key={careerSlug}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                isWinner
                  ? "bg-green-500/20 text-green-300 ring-1 ring-green-500/50"
                  : isEliminated
                    ? "bg-gray-700/30 text-gray-500"
                    : "bg-white/10 text-white/70"
              }`}
            >
              <span>{config.icon}</span>
              <span className="hidden sm:inline">{config.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ChampionScreenProps {
  champion: CareerSlug;
  onPlayAgain: () => void;
}

function ChampionScreen({ champion, onPlayAgain }: ChampionScreenProps) {
  const config = careerConfigs[champion];
  const cluster = clusterConfigs[config.cluster];

  const confettiEmojis = ["🎉", "🏆", "⚔️", "✨", "🎊", "⭐", "💫", "🌟"];

  return (
    <div className="text-center">
      {/* Confetti */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap animate-scale-bounce">
        {confettiEmojis.map((emoji, idx) => (
          <span key={idx} className="text-5xl">
            {emoji}
          </span>
        ))}
      </div>

      {/* Champion Title */}
      <div className="mb-8">
        <p className="text-xl text-white/60 mb-2">🏆 Champion! 🏆</p>
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{config.title}</h2>
        <p className="text-lg text-white/70">{cluster.title}</p>
      </div>

      {/* Career Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <p className="text-white/60 text-sm mb-2">Median Salary</p>
          <p className="text-2xl font-bold text-white">${config.stats.avgSalary}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <p className="text-white/60 text-sm mb-2">Growth Rate</p>
          <p className="text-2xl font-bold text-white">{config.stats.growthRate}%</p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-2xl mx-auto mb-8">
        <p className="text-white/80 text-lg leading-relaxed">{config.description}</p>
      </div>

      {/* Top Roles */}
      <div className="max-w-2xl mx-auto mb-8">
        <p className="text-white/60 text-sm mb-3">Top Roles in {config.title}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {config.stats.topRoles.map((role: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-2 bg-white/10 rounded-full text-white text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Link
          href={`/careers/${champion}`}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
        >
          Explore {config.title}
        </Link>
        <ShareButton
          url={`/careers/${champion}`}
          title="Career Tournament Champion"
          prefilledMessage={`I crowned ${config.title} as my Career Champion! ⚔️🏆`}
        />
      </div>

      {/* Play Again */}
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Play Again
      </button>
    </div>
  );
}
