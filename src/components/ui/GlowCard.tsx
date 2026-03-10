'use client';

import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlowCard({ children, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }

  function onMouseLeave() {
    setPos((p) => ({ ...p, active: false }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      style={{
        ...style,
        // Resting state matches the subtle shadow passed via className (inline wins over class)
        boxShadow: pos.active
          ? '0 0 0 1px rgba(16,185,129,0.45), 0 0 32px rgba(16,185,129,0.2), 0 4px 20px rgba(0,0,0,0.06)'
          : '0 0 0 1px rgba(16,185,129,0.08), 0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Cursor-following interior spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.22), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
