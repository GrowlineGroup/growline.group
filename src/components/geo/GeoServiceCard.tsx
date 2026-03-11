'use client';

import { useRef, useState } from 'react';

interface GeoServiceCardProps {
  number: string;
  title: string;
  body: string;
}

export function GeoServiceCard({ number, title, body }: GeoServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  function handleMouseLeave() {
    setGlow(prev => ({ ...prev, active: false }));
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 h-full overflow-hidden transition-[border-color] duration-300 hover:border-zinc-700"
    >
      {/* Cursor-following glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, rgba(16,185,129,0.09) 0%, transparent 70%)`,
        }}
      />

      {/* Number badge — absolute top-right */}
      <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
        <span className="text-xs font-bold tabular-nums text-emerald-400">{number}</span>
      </div>

      <h3 className="text-base font-semibold text-white pr-12">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
    </div>
  );
}
