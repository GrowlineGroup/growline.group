'use client';

import { motion } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';

const EASE = [0.22, 1, 0.36, 1] as const;

const LINES = [
  { text: 'Wir sind keine Agentur,', accent: false },
  { text: 'die alles kann.', accent: false },
  { text: 'Wir sind eine Agentur,', accent: false },
  { text: 'die etwas wirklich kann.', accent: true },
];

const PILLARS = [
  {
    label: 'Spezialisierung',
    body: 'Vier Bereiche. Kein Bauchladen. Jede Leistung ist unser Kerngeschäft.',
  },
  {
    label: 'Direktheit',
    body: 'Kein Account-Manager als Zwischenschicht. Du erreichst immer die Person, die arbeitet.',
  },
  {
    label: 'Messbarkeit',
    body: 'Wir definieren vor dem Start, woran Erfolg gemessen wird.',
  },
];

export function PremiumStatement() {
  return (
    <section className="relative h-full bg-[#080808] flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden">

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full py-16">

        {/* Overline */}
        <BlurFade delay={0.05} duration={0.6} className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            01 — Warum Growline
          </span>
        </BlurFade>

        {/* Headline lines — staggered */}
        <div className="mb-16">
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <BlurFade delay={0.12 + i * 0.08} duration={0.75} direction="up" offset={20}>
                <p
                  className={`leading-[1.0] tracking-[-0.025em] font-bold ${
                    line.accent ? 'text-emerald-400' : 'text-white'
                  }`}
                  style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)' }}
                >
                  {line.text}
                </p>
              </BlurFade>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-zinc-800/50 pt-10">
          {PILLARS.map((p, i) => (
            <BlurFade key={p.label} delay={0.45 + i * 0.08} duration={0.65} direction="up" offset={12}>
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-emerald-500 uppercase">
                  {p.label}
                </span>
                <p className="text-sm leading-relaxed text-zinc-500">{p.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: 'left' }}
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none"
      />
    </section>
  );
}
