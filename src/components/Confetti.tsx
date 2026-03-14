import { useMemo } from 'react';

const COLORS = [
  '#FF69B4', '#FF1493', '#FF6B6B', '#FFD700', '#FF85C0',
  '#FFA07A', '#DDA0DD', '#87CEEB', '#98FB98', '#FFB6C1',
  '#FF4500', '#DA70D6', '#FFC0CB', '#FF8C00', '#E0BBE4',
];
const SHAPES = ['circle', 'square', 'strip'] as const;

interface Piece {
  id: number;
  left: number;
  size: number;
  color: string;
  shape: (typeof SHAPES)[number];
  delay: number;
  duration: number;
  swayDuration: number;
}

export default function Confetti({ count = 40, burst = false }: { count?: number; burst?: boolean }) {
  const pieces = useMemo<Piece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      delay: burst ? Math.random() * 0.5 : Math.random() * 8,
      duration: burst ? 1.5 + Math.random() * 2 : 4 + Math.random() * 6,
      swayDuration: 2 + Math.random() * 3,
    })),
    [count, burst],
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: -20,
            width: p.shape === 'strip' ? p.size * 0.4 : p.size,
            height: p.shape === 'strip' ? p.size * 1.8 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'strip' ? 2 : 1,
            animation: burst
              ? `confetti-burst ${p.duration}s ${p.delay}s ease-out forwards, confetti-sway ${p.swayDuration}s ${p.delay}s ease-in-out ${Math.ceil(p.duration / p.swayDuration)}`
              : `confetti-fall ${p.duration}s ${p.delay}s linear infinite, confetti-sway ${p.swayDuration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
