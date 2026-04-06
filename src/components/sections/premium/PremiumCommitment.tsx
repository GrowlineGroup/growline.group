'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';
import { WavyBackground } from '@/components/ui/WavyBackground';

const ease = [0.22, 1, 0.36, 1] as const;

const POINTS = [
  {
    icon: '◎',
    title: 'Monatlich kündbar',
    body: 'Keine langen Vertragslaufzeiten. Wir verdienen dein Vertrauen jeden Monat neu.',
  },
  {
    icon: '◈',
    title: 'Transparente Preise',
    body: 'Keine versteckten Kosten, keine Überraschungsrechnungen. Klarer Preis vor dem Start.',
  },
  {
    icon: '◉',
    title: 'Vereinbarte KPIs',
    body: 'Was wir messen, legen wir vorher fest. Keine abstrakten Versprechen — konkrete Ziele.',
  },
  {
    icon: '◐',
    title: 'Direkter Ansprechpartner',
    body: 'Kein rotierendes Account-Management. Du weißt immer, mit wem du sprichst.',
  },
];

export function PremiumCommitment() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative h-full bg-[#080808] flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* WavyBackground as pure decorative background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <WavyBackground
          className="h-full w-full"
          waveOpacity={0.22}
          speed="slow"
          blur={18}
          colors={['#10b981', '#34d399', '#059669', '#6ee7b7', '#047857']}
        />
      </div>

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/4 rounded-full bg-emerald-900/12 blur-[180px] z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
              05 — Commitment
            </span>
            <h2
              className="mt-5 font-bold tracking-[-0.02em] leading-[0.92] text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              Klare Regeln.<br />
              Ehrliche Preise.<br />
              <span className="text-emerald-400">Echte Ergebnisse.</span>
            </h2>
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-zinc-500 max-w-sm">
              Unser Commitment bedeutet: Wir sagen, was wir tun — und tun, was wir sagen. Keine Lock-in-Fallen, kein künstliches Komplizieren.
            </p>
          </motion.div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.08 }}
              >
                <MagicCard
                  className="rounded-xl"
                  gradientColor="#052e16"
                  gradientFrom="#10b981"
                  gradientTo="#065f46"
                >
                  <div className="p-6">
                    <span className="text-lg text-emerald-500/60 mb-4 block">{point.icon}</span>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-2 group-hover:text-white transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                      {point.body}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
