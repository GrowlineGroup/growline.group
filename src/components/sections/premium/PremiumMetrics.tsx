'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { NumberTicker } from '@/components/ui/number-ticker';
import { MagicCard } from '@/components/ui/magic-card';
import { StarBackground } from '@/components/ui/StarBackground';

const ease = [0.22, 1, 0.36, 1] as const;

const METRICS = [
  { numericValue: 1000, suffix: '+',  label: 'Merchant Accounts entsperrt', sub: 'Google Shopping Reaktivierungen' },
  { numericValue: 300,  suffix: '+',  label: 'Websites gebaut',              sub: 'Individuell & performant' },
  { numericValue: 20,   suffix: ' %', label: 'CPC-Ersparnis',                sub: 'Dauerhaft durch CSS Entry' },
  { numericValue: 12,   prefix: '< ', suffix: ' h', label: 'Antwortzeit',   sub: 'Persönlich — kein Ticket-System' },
];

export function PremiumMetrics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative h-full bg-[#080808] flex items-center overflow-hidden"
    >
      {/* StarBackground as decorative background — wraps in pointer-events-none, mouse repulsion disabled */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <StarBackground
          className="h-full w-full"
          density={2600}
          opacity={0.75}
          interactive={false}
        />
      </div>

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center z-[1]">
        <div className="h-[500px] w-[700px] rounded-full bg-emerald-900/10 blur-[160px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
              03 — Ergebnisse
            </span>
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.1 }}
              >
                <MagicCard
                  className="rounded-2xl"
                  gradientColor="#052e16"
                  gradientFrom="#10b981"
                  gradientTo="#065f46"
                >
                  <div className="px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-3">
                    <span
                      className="font-mono font-bold tracking-tight text-white leading-none"
                      style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
                    >
                      {m.prefix}
                      {inView ? (
                        <NumberTicker
                          value={m.numericValue}
                          delay={0.2 + i * 0.1}
                          className="font-mono font-bold tracking-tight text-white"
                        />
                      ) : (
                        <span>0</span>
                      )}
                      {m.suffix}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-zinc-300 leading-snug">{m.label}</span>
                      <span className="text-xs text-zinc-600 leading-snug">{m.sub}</span>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="mt-16 border-l-2 border-emerald-500/40 pl-6 max-w-2xl"
          >
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light italic">
              „Kein Agentur-Overhead, keine unnötigen Zwischenschichten, keine Lösungen von der Stange."
            </p>
            <footer className="mt-4 font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase">
              Growline Group — Unser Grundsatz
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
