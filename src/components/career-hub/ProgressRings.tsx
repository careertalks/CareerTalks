"use client";

interface RingData {
  done: number;
  total: number;
}

interface ProgressRingsProps {
  progress: {
    knowledge: RingData;
    skills: RingData;
    experience: RingData;
  };
  clusterColor: string;
}

const RING_RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ~150.8

function Ring({
  label,
  color,
  done,
  total,
}: {
  label: string;
  color: string;
  done: number;
  total: number;
}) {
  const fraction = total > 0 ? Math.min(done / total, 1) : 0;
  const offset = CIRCUMFERENCE * (1 - fraction);
  const displayText = total > 0 ? `${done}/${total}` : `${done}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx="28"
            cy="28"
            r={RING_RADIUS}
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
          />
          {/* Fill arc */}
          <circle
            cx="28"
            cy="28"
            r={RING_RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.6s ease-out",
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-100">
          {displayText}
        </div>
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </span>
    </div>
  );
}

export default function ProgressRings({
  progress,
  clusterColor,
}: ProgressRingsProps) {
  return (
    <div className="flex items-center gap-7">
      <Ring
        label="Knowledge"
        color="#3B82F6"
        done={progress.knowledge.done}
        total={progress.knowledge.total}
      />
      <Ring
        label="Skills"
        color="#10B981"
        done={progress.skills.done}
        total={progress.skills.total}
      />
      <Ring
        label="Experience"
        color="#F59E0B"
        done={progress.experience.done}
        total={progress.experience.total}
      />
    </div>
  );
}
