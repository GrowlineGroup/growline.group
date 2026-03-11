'use client';

import { useState } from 'react';

interface Stat {
  metric: string;
  label: string;
}

interface Point {
  title: string;
  body: string;
}

interface GeoUrgencyProps {
  stats: Stat[];
  points: Point[];
}

export function GeoUrgency({ stats, points }: GeoUrgencyProps) {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-14 md:grid-cols-4">
        {stats.map((stat, i) => {
          const isActive = hoveredStat === i;
          const isOther = hoveredStat !== null && !isActive;
          return (
            <div
              key={stat.label}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              className="relative flex flex-col gap-2 rounded-2xl border bg-zinc-900 p-5 overflow-hidden cursor-default"
              style={{
                transform: isActive ? 'scale(1.08)' : isOther ? 'scale(0.96)' : 'scale(1)',
                transition: isActive
                  ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.2s ease'
                  : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                borderColor: isActive ? 'rgba(16,185,129,0.35)' : 'rgba(63,63,70,1)',
                boxShadow: isActive
                  ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 20px 48px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.12)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                zIndex: isActive ? 10 : 1,
              }}
            >
              <div aria-hidden className="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-emerald-500/8 blur-xl" />
              <span className="font-mono text-2xl font-bold text-emerald-400 sm:text-3xl">
                {stat.metric}
              </span>
              <span className="text-xs leading-snug text-zinc-500">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Reason cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {points.map((point, i) => {
          const isActive = hoveredPoint === i;
          const isOther = hoveredPoint !== null && !isActive;
          return (
            <div
              key={point.title}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="relative flex flex-col gap-3 rounded-2xl border bg-zinc-900 p-6 overflow-hidden cursor-default"
              style={{
                transform: isActive ? 'scale(1.05)' : isOther ? 'scale(0.97)' : 'scale(1)',
                transition: isActive
                  ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.2s ease'
                  : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                borderColor: isActive ? 'rgba(16,185,129,0.3)' : 'rgba(63,63,70,1)',
                boxShadow: isActive
                  ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 56px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.09)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                zIndex: isActive ? 10 : 1,
              }}
            >
              <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 h-36 w-36 rounded-full bg-emerald-500/5 blur-2xl" />
              <div className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-white pr-10">{point.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{point.body}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
