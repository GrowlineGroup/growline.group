'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export function PremiumCTA({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative h-full bg-[#050505] flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Large ambient glow — centered */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[700px] w-[700px] rounded-full bg-emerald-700/8 blur-[200px]" />
      </div>

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto w-full text-center py-10">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="h-px w-8 bg-emerald-500/60" />
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            Jetzt starten
          </span>
          <span className="h-px w-8 bg-emerald-500/60" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="font-bold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            Schon die passende
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.18 }}
            className="font-bold leading-[0.9] tracking-[-0.03em] text-emerald-400"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            Leistung gefunden?
          </motion.h2>
        </div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="text-base sm:text-lg leading-relaxed text-zinc-400 max-w-md mx-auto mb-14"
        >
          {t.cta.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.48 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/kontakt`}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-emerald-400 hover:gap-4"
          >
            Gespräch vereinbaren
            <span className="transition-colors duration-300 group-hover:text-zinc-900">→</span>
          </Link>
          <Link
            href={`/${locale}/ueber-uns`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-8 py-4 text-sm font-medium text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-all duration-300"
          >
            Über uns
          </Link>
        </motion.div>

        {/* Trust footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 font-mono text-[11px] tracking-[0.15em] text-zinc-700 uppercase"
        >
          Antwort innerhalb von 12 Stunden · Monatlich kündbar · Kein Lock-in
        </motion.p>
      </div>
    </section>
  );
}
