'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

export function PremiumHero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="relative h-full flex flex-col bg-[#080808] overflow-hidden">

      {/* ── Ambient glow ────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-700/12 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] translate-x-1/4 rounded-full bg-emerald-900/8 blur-[140px]" />
      </div>

      {/* ── Noise ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      {/* ── Top strip ───────────────────────────────────────────────────── */}
      <BlurFade delay={0.05} duration={0.7} className="relative px-6 sm:px-10 lg:px-16 pt-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            Growline Group
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <span className="font-mono text-[11px] tracking-[0.14em] text-zinc-600 uppercase">
              Performance · Scale · Growth
            </span>
          </div>
        </div>
      </BlurFade>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10">

        {/* Overline */}
        <BlurFade delay={0.1} duration={0.7} direction="up" offset={12} className="flex items-center gap-3 mb-9">
          <span className="h-px w-10 bg-emerald-500/70" />
          <span className="font-mono text-[11px] tracking-[0.22em] text-emerald-400 uppercase">
            Spezialisierte Digitalagentur
          </span>
        </BlurFade>

        {/* Headline */}
        <div>
          <BlurFade delay={0.18} duration={0.85} direction="up" offset={24}>
            <h1
              className="font-bold leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}
            >
              <span className="block text-white">Digitales</span>
              <span className="block text-white">Wachstum.</span>
              <span className="block text-zinc-700">Ohne Kompromisse.</span>
            </h1>
          </BlurFade>
        </div>

        {/* Subtext + CTA */}
        <BlurFade delay={0.38} duration={0.8} direction="up" offset={16} className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <p className="max-w-[22rem] text-sm sm:text-base leading-relaxed text-zinc-500">
            {t.hero.subtext}
          </p>
          <div className="flex items-center gap-5 flex-shrink-0">
            <Link
              href={`/${locale}/kontakt`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-emerald-400 hover:gap-4"
            >
              Gespräch anfragen
              <span className="transition-colors duration-300 group-hover:text-zinc-900 text-zinc-500">→</span>
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-300 transition-colors duration-200 underline underline-offset-4 decoration-zinc-800"
            >
              Leistungen ↓
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <BlurFade delay={0.55} duration={0.7} className="relative border-t border-zinc-800/60 px-6 sm:px-10 lg:px-16 py-6">
        <div className="flex items-center gap-10 sm:gap-20 lg:gap-28">
          {t.hero.stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.6 + i * 0.08} duration={0.6}>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-[11px] text-zinc-600 tracking-wide">{stat.label}</span>
              </div>
            </BlurFade>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
