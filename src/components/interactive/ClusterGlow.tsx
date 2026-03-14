'use client';

import React, { useMemo } from 'react';

interface ClusterGlowProps {
  cluster: 'tech' | 'business' | 'science' | 'creative';
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const ClusterGlow: React.FC<ClusterGlowProps> = ({
  cluster,
  children,
  className = '',
  intensity = 'medium',
}) => {
  const clusterColorMap: Record<string, string> = {
    tech: '#3B82F6',
    business: '#F59E0B',
    science: '#10B981',
    creative: '#F43F5E',
  };

  const intensityMap: Record<string, { blur: string; spread: string; opacity: string }> = {
    low: { blur: '8px', spread: '2px', opacity: '0.3' },
    medium: { blur: '16px', spread: '4px', opacity: '0.5' },
    high: { blur: '24px', spread: '8px', opacity: '0.7' },
  };

  const glowColor = clusterColorMap[cluster] || clusterColorMap.tech;
  const glowIntensity = intensityMap[intensity] || intensityMap.medium;

  return (
    <>
      <style>{`
        @keyframes glow-pulse-cluster {
          0%, 100% {
            box-shadow: 0 0 ${glowIntensity.blur} ${glowIntensity.spread} ${glowColor}${Math.round(
        parseFloat(glowIntensity.opacity) * 255
      ).toString(16).padStart(2, '0')};
          }
          50% {
            box-shadow: 0 0 ${glowIntensity.blur} ${glowIntensity.spread} ${glowColor}${Math.round(
        parseFloat(glowIntensity.opacity) * 0.7 * 255
      ).toString(16).padStart(2, '0')};
          }
        }

        .cluster-glow {
          animation: glow-pulse-cluster 3s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`cluster-glow rounded-lg transition-all duration-300 ${className}`}
        style={{
          boxShadow: `0 0 ${glowIntensity.blur} ${glowIntensity.spread} ${glowColor}${Math.round(
            parseFloat(glowIntensity.opacity) * 255
          ).toString(16).padStart(2, '0')}`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ClusterGlow;
