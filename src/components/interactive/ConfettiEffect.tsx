'use client';

import React, { useState, useEffect } from 'react';

interface ConfettiEffectProps {
  trigger: boolean;
  duration?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (!trigger) return;

    setIsVisible(true);

    // Generate confetti pieces
    const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '⭐'];
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
      rotation: Math.random() * 360,
    }));

    setConfettiPieces(pieces);

    // Auto-hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setConfettiPieces([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, duration]);

  if (!isVisible || confettiPieces.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          position: fixed;
          pointer-events: none;
          font-size: 24px;
          opacity: 1;
          z-index: 9999;
          animation: confetti-fall linear forwards;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-9999">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
              transform: `rotateZ(${piece.rotation}deg)`,
            }}
          >
            {piece.emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default ConfettiEffect;
