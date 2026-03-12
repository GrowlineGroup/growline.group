'use client';

import { PageStarCanvas } from '@/components/ui/PageStarCanvas';

export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-zinc-950"
    >
      {/* ── Stars + shooting stars ── */}
      <PageStarCanvas />

      {/* ── Global dot-grid texture ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Ambient glow — top-right focal ── */}
      <div
        className="absolute -top-48 -right-48 h-[800px] w-[800px] rounded-full bg-emerald-500/[0.12] blur-[140px]"
        style={{ animation: 'bgDrift1 22s ease-in-out infinite' }}
      />

      {/* ── Ambient glow — bottom-left ── */}
      <div
        className="absolute -bottom-40 -left-40 h-[650px] w-[650px] rounded-full bg-teal-400/[0.09] blur-[130px]"
        style={{ animation: 'bgDrift2 28s ease-in-out infinite' }}
      />

      {/* ── Mid accent — left edge ── */}
      <div
        className="absolute top-1/3 -left-24 h-[480px] w-[480px] rounded-full bg-emerald-600/[0.08] blur-[110px]"
        style={{ animation: 'bgDrift3 18s ease-in-out infinite' }}
      />

      {/* ── Horizon glow — bottom center ── */}
      <div
        className="absolute bottom-0 left-1/2 h-[320px] w-[860px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[100px]"
        style={{ animation: 'bgDrift4 32s ease-in-out infinite' }}
      />

      {/* ── Radial vignette — keeps center readable ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 40%, transparent 35%, rgba(9,9,11,0.55) 100%)',
        }}
      />
    </div>
  );
}
