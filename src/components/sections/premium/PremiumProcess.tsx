'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: '01',
    title: 'Erstgespräch',
    body: 'Du beschreibst dein Projekt in normalen Worten. Wir stellen die richtigen Fragen. Kein Fragebogen, kein Sales-Pitch — ein echtes Gespräch.',
    duration: 'Tag 1',
  },
  {
    number: '02',
    title: 'Analyse & Einschätzung',
    body: 'Wir bewerten deinen Status quo: was ist das Problem, was ist realistisch lösbar, was kostet es. Klare Aussage innerhalb von 24 Stunden.',
    duration: 'Tag 1–2',
  },
  {
    number: '03',
    title: 'Angebot & Freigabe',
    body: 'Du bekommst ein klares Angebot: Leistungsumfang, Preis, Zeitplan. Kein Kleingedrucktes, keine Überraschungen. Du entscheidest.',
    duration: 'Tag 2–3',
  },
  {
    number: '04',
    title: 'Umsetzung & Ergebnisse',
    body: 'Wir arbeiten. Du siehst Ergebnisse. Laufende Kommunikation ohne Tickets — und danach bleiben wir ansprechbar.',
    duration: 'Ab Tag 4',
  },
];

export function PremiumProcess() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="relative h-full bg-[#050505] flex flex-col justify-center py-10 px-6 sm:px-10 lg:px-16 overflow-y-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="max-w-5xl mx-auto mb-20"
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

      {/* Steps */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[2.75rem] sm:left-[3.75rem] top-4 bottom-4 w-px bg-zinc-800/80 hidden sm:block" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.1 }}
                className="relative flex gap-8 sm:gap-12 py-8 sm:py-10 group"
              >
                {/* Number bubble */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-800 bg-[#050505] flex items-center justify-center transition-colors duration-300 group-hover:border-emerald-500/50">
                    <span className="font-mono text-xs font-bold text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5 border-b border-zinc-800/40 pb-8 sm:pb-10 last:border-0">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[11px] tracking-widest text-zinc-700 flex-shrink-0">
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
