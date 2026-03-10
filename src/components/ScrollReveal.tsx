import { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const directionClass: Record<string, string> = {
  up: 'fade-in-up',
  down: 'fade-in-down',
  left: 'fade-in-left',
  right: 'fade-in-right',
  none: 'fade-in',
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = [directionClass[direction] || 'fade-in-up', visible && 'animate-in', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={cls}
      style={
        { '--delay': `${delay}s`, '--duration': `${duration}s` } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
