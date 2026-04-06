'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import IsoLevelWarp from '@/components/ui/IsoLevelWarp';

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: '01',
    title: 'Erstgespräch',
    body: 'Du beschreibst dein Projekt in normalen Worten. Wir stellen die richtigen Fragen. Kein Fragebogen, kein Sales-Pitch — ein echtes Gespräch.',
    duration: 'Tag 1',
    icon: '◎',
    color: '#34d399',
  },
  {
    number: '02',
    title: 'Analyse & Einschätzung',
    body: 'Wir bewerten deinen Status quo: was ist das Problem, was ist realistisch lösbar, was kostet es. Klare Aussage innerhalb von 24 Stunden.',
    duration: 'Tag 1–2',
    icon: '◈',
    color: '#6ee7b7',
  },
  {
    number: '03',
    title: 'Angebot & Freigabe',
    body: 'Du bekommst ein klares Angebot: Leistungsumfang, Preis, Zeitplan. Kein Kleingedrucktes, keine Überraschungen. Du entscheidest.',
    duration: 'Tag 2–3',
    icon: '◉',
    color: '#10b981',
  },
  {
    number: '04',
    title: 'Umsetzung & Ergebnisse',
    body: 'Wir arbeiten. Du siehst Ergebnisse. Laufende Kommunikation ohne Tickets — und danach bleiben wir ansprechbar.',
    duration: 'Ab Tag 4',
    icon: '◐',
    color: '#059669',
  },
];

// Floating status chips — decorative parallax elements
const CHIPS = [
  { label: 'Erstgespräch',   x: 72, y: 12, depth: 22, delay: '0s',    dur: '6.4s' },
  { label: 'Tag 1',          x: 82, y: 38, depth: 14, delay: '-2.2s',  dur: '7.8s' },
  { label: 'In Arbeit',      x: 76, y: 65, depth: 30, delay: '-4.1s',  dur: '6.9s' },
  { label: 'Ergebnis ✓',     x: 66, y: 85, depth: 18, delay: '-1.5s',  dur: '8.1s' },
];

export function PremiumProcess() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full bg-[#050505] flex flex-col justify-center py-10 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* ── IsoLevelWarp — topographic contour grid ─────────────────────── */}
      <IsoLevelWarp
        speed={0.6}
        density={48}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        } as React.CSSProperties}
      />

      {/* ── Floating status chips ────────────────────────────────────────── */}
      {CHIPS.map((chip) => {
        const dx = (mouse.x - 0.5) * chip.depth;
        const dy = (mouse.y - 0.5) * chip.depth;
        return (
          <div
            key={chip.label}
            className="absolute hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 backdrop-blur-sm px-4 py-2 pointer-events-none"
            style={{
              left: `${chip.x}%`,
              top: `${chip.y}%`,
              animation: `geoFloat0 ${chip.dur} ease-in-out ${chip.delay} infinite`,
              transform: `translate(${dx}px, ${dy}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              zIndex: 5,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400/80 whitespace-nowrap">{chip.label}</span>
          </div>
        );
      })}

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 max-w-5xl mx-auto mb-14 w-full"
      >
        <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
          04 — Wie es läuft
        </span>
        <h2
          className="mt-4 font-bold tracking-[-0.02em] text-white leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
        >
          Von Anfrage<br />
          <span className="text-zinc-600">zu Ergebnis.</span>
        </h2>
      </motion.div>

      {/* ── Steps ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="relative">
          {/* Animated connector line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 1.8, ease, delay: 0.4 }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[1.35rem] sm:left-[1.5rem] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/70 via-emerald-500/20 to-transparent hidden sm:block"
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.12 }}
                className="relative flex gap-8 sm:gap-12 py-7 sm:py-9 group"
              >
                {/* Number bubble */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border bg-[#050505] flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5"
                    style={{ borderColor: i === 0 ? 'rgba(52,211,153,0.5)' : 'rgba(63,63,70,0.8)' }}
                  >
                    <span className="font-mono text-xs font-bold text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5 border-b border-zinc-800/40 pb-7 sm:pb-9 last:border-0">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[11px] tracking-widest text-zinc-700 flex-shrink-0 group-hover:text-emerald-600 transition-colors duration-300">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 max-w-lg">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
