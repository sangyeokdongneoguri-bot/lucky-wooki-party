import { useMemo } from 'react';

const EMOJIS = ['🎉', '🥂', '💕', '✨', '🎊', '🍷', '💖', '🎈', '🪩', '💐'];

interface Bubble {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingEmojis({ count = 12 }: { count?: number }) {
  const bubbles = useMemo<Bubble[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 16 + Math.random() * 16,
    })),
    [count],
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            bottom: -40,
            fontSize: b.size,
            animation: `float-up ${b.duration}s ${b.delay}s linear infinite`,
            opacity: 0,
          }}
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
}
