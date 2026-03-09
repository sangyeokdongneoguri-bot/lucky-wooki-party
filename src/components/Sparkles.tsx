import { useMemo } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Sparkles({ count = 20 }: { count?: number }) {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 2,
    })),
    [count],
  );

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(255,215,0,0.3)`,
            animation: `sparkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
      ))}
    </>
  );
}
