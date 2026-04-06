'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { RetroGrid } from '@/components/ui/RetroGrid';
import { StarBackground } from '@/components/ui/StarBackground';
import { SparklesText } from '@/components/ui/sparkles-text';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export function PremiumCTA({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const router = useRouter();

  return (
    <section
      ref={ref}
      className="relative h-full bg-[#050505] flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* RetroGrid — background grid */}
      <RetroGrid angle={55} className="opacity-35" />

      {/* StarBackground — calm, non-interactive star field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <StarBackground className="h-full w-full" density={3500} opacity={0.55} interactive={false} twinkleSpeed={0.3} />
      </div>

      {/* Bottom fade to match bg */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#050505] to-transparent z-10" />

      {/* Single ambient glow — centered, calm */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center z-[5]">
        <div className="h-[700px] w-[700px] rounded-full bg-emerald-900/10 blur-[200px]" />
      </div>

      {/* Top border */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent z-20" />

      <div className="relative z-20 max-w-4xl mx-auto w-full text-center py-10">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span className="h-px w-8 bg-emerald-500/50" />
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            Jetzt starten
          </span>
          <span className="h-px w-8 bg-emerald-500/50" />
        </motion.div>

        {/* Headline line 1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="mb-3"
        >
          <h2
            className="font-bold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            Schon die passende
          </h2>
        </motion.div>

        {/* Headline line 2 — SparklesText, fewer sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.55 }}
          className="mb-14"
        >
          <SparklesText
            colors={{ first: '#34d399', second: '#6ee7b7' }}
            sparklesCount={3}
            className="text-[clamp(2.8rem,_7vw,_7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-emerald-400"
          >
            Leistung gefunden?
          </SparklesText>
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease, delay: 0.85 }}
          className="text-base sm:text-lg leading-relaxed text-zinc-500 max-w-md mx-auto mb-14"
        >
          {t.cta.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ShimmerButton
            onClick={() => router.push(`/${locale}/kontakt`)}
            shimmerColor="#34d399"
            background="rgba(255,255,255,1)"
            className="text-zinc-950 font-semibold text-sm px-8 py-4"
          >
            Gespräch vereinbaren →
          </ShimmerButton>

          <Link
            href={`/${locale}/ueber-uns`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-8 py-4 text-sm font-medium text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-all duration-500"
          >
            Über uns
          </Link>
        </motion.div>

        {/* Trust footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, ease, delay: 1.4 }}
          className="mt-12 font-mono text-[11px] tracking-[0.15em] text-zinc-700 uppercase"
        >
          Antwort innerhalb von 12 Stunden · Monatlich kündbar · Kein Lock-in
        </motion.p>
      </div>
    </section>
  );
}
