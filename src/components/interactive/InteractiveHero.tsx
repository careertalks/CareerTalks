'use client';

import React from 'react';

interface InteractiveHeroProps {
  badge: string;
  title: string;
  highlightedText?: string;
  subtitle: string;
  accentColor?: string;
}

const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  badge,
  title,
  highlightedText,
  subtitle,
  accentColor = 'violet',
}) => {
  const accentColorMap: Record<string, string> = {
    indigo: '#6366F1',
    violet: '#A78BFA',
    purple: '#9333EA',
  };

  const glowColor = accentColorMap[accentColor] || accentColorMap.violet;

  return (
    <>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .hero-glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="hero-dark relative min-h-[500px] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="20" y="20" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-violet-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Animated glow orb - top right */}
        <div
          className="hero-glow-orb absolute top-10 right-10 w-64 h-64 rounded-full pointer-events-none blur-3xl"
          style={{
            backgroundColor: glowColor,
            opacity: 0.15,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 rounded-full glass-dark border border-violet-500/20 text-sm font-medium text-violet-200">
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {highlightedText ? (
              <>
                {title.split(highlightedText)[0]}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {highlightedText}
                </span>
                {title.split(highlightedText)[1]}
              </>
            ) : (
              title
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8">{subtitle}</p>
        </div>

        {/* Wave separator - bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 text-slate-900"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            opacity="0.1"
          />
        </svg>
      </div>
    </>
  );
};

export default InteractiveHero;
