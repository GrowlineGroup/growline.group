'use client';

import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlowCard({ children, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }

  function onMouseLeave() {
    setGlow((g) => ({ ...g, opacity: 0 }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Mouse-tracking spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(360px circle at ${glow.x}px ${glow.y}px, rgba(16,185,129,0.12), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
