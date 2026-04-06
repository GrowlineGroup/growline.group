'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICE_META = [
  { number: '01', tags: ['CPC-Senkung', 'Google Shopping', 'CSS Entry', 'Dauerhaft'] },
  { number: '02', tags: ['Merchant Center', 'Reaktivierung', 'Feed & Policy'] },
  { number: '03', tags: ['KI-Sichtbarkeit', 'ChatGPT', 'Perplexity', 'Gemini'] },
  { number: '04', tags: ['Webseiten', 'Next.js', 'Performance', 'Individual'] },
];

export function PremiumServices({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [active, setActive] = useState<number | null>(null);

  const services = t.services.items;

  return (
    <section
      id="services"
      ref={ref}
      className="relative h-full bg-[#050505] flex flex-col justify-center py-10 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-[0.35]" />

      {/* Emerald ambient glow — top-left, subtle */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-700/8 blur-[130px]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="flex items-end justify-between mb-8 sm:mb-12"
      >
        <div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            02 — Leistungen
          </span>
          <h2
            className="mt-3 font-bold tracking-tight text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            Was wir tun.
          </h2>
        </div>
        <Link
          href={`/${locale}/kontakt`}
          className="hidden sm:flex items-center gap-2 text-sm text-zinc-600 hover:text-white transition-colors duration-200 font-medium"
        >
          Anfragen <span className="text-emerald-500">→</span>
        </Link>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease, delay: 0.1 }}
        style={{ transformOrigin: 'left' }}
        className="h-px bg-zinc-800/80 mb-2"
      />

      {/* Service rows */}
      <div className="flex flex-col">
        {services.map((service, i) => (
          <ServiceRow
            key={service.key}
            service={service}
            meta={SERVICE_META[i]}
            locale={locale}
            index={i}
            inView={inView}
            active={active === i}
            dimmed={active !== null && active !== i}
            onHover={() => setActive(i)}
            onLeave={() => setActive(null)}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  meta,
  locale,
  index,
  inView,
  active,
  dimmed,
  onHover,
  onLeave,
}: {
  service: { key: string; abbr: string; tileLabel: string; tileDesc: string; href: string; features: string[] };
  meta: { number: string; tags: string[] };
  locale: string;
  index: number;
  inView: boolean;
  active: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: dimmed ? 0.3 : 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: 0.15 + index * 0.07 }}
    >
      <Link
        href={`/${locale}/${service.href}`}
        className="group relative flex items-center gap-6 sm:gap-10 py-5 sm:py-6 border-b border-zinc-800/60 transition-colors duration-200 hover:border-zinc-700/80"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Full-row hover wash */}
        <div
          className="pointer-events-none absolute inset-0 -inset-x-4 sm:-inset-x-6 rounded-lg transition-opacity duration-300"
          style={{ opacity: active ? 1 : 0, background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)' }}
        />

        {/* Left accent bar */}
        <motion.span
          initial={false}
          animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-[2px] bg-emerald-500 origin-center rounded-full"
        />

        {/* Number */}
        <span className="font-mono text-xs text-zinc-700 tracking-widest flex-shrink-0 w-7 transition-colors duration-200 group-hover:text-zinc-500">
          {meta.number}
        </span>

        {/* Service name */}
        <div className="flex-1 min-w-0">
          <span
            className="font-bold tracking-[-0.025em] leading-none transition-colors duration-200"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 3rem)',
              color: active ? '#ffffff' : '#71717a',
            }}
          >
            {service.tileLabel}
          </span>

          {/* Tags — animate in below name */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-1.5 mt-2 overflow-hidden"
              >
                {meta.tags.map((tag, ti) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ti * 0.04 }}
                    className="text-[10px] font-mono tracking-wide text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Abbr + desc — right side */}
        <div className="hidden lg:flex flex-col items-end gap-1 flex-shrink-0 max-w-[18rem] text-right">
          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-700 uppercase transition-colors duration-200 group-hover:text-zinc-600">
            {service.abbr}
          </span>
          <span className="text-xs leading-relaxed text-zinc-700 transition-colors duration-200 group-hover:text-zinc-500 line-clamp-2">
            {service.tileDesc}
          </span>
        </div>

        {/* Arrow */}
        <motion.span
          animate={{ x: active ? 5 : 0, opacity: active ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-emerald-500 text-base"
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}
