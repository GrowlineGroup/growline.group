'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

const NUMBERS = ['01', '02', '03', '04'];
const TAGS = [
  ['CPC', 'Google Shopping', 'Dauerhaft'],
  ['Merchant Center', 'Reaktivierung', 'Feed & Policy'],
  ['KI-Sichtbarkeit', 'ChatGPT', 'Perplexity'],
  ['Web Development', 'Performance', 'Individual'],
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
      className="relative h-full bg-[#050505] flex flex-col justify-center py-10 px-6 sm:px-10 lg:px-16 overflow-y-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="flex items-end justify-between mb-16 sm:mb-20"
      >
        <div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-600 uppercase">
            02 — Leistungen
          </span>
          <h2
            className="mt-4 font-bold tracking-tight text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            Was wir tun.
          </h2>
        </div>
        <Link
          href={`/${locale}/kontakt`}
          className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 font-medium"
        >
          Alle anfragen <span className="text-emerald-500">→</span>
        </Link>
      </motion.div>

      {/* Service rows */}
      <div className="divide-y divide-zinc-800/60">
        {services.map((service, i) => (
          <ServiceRow
            key={service.key}
            service={service}
            number={NUMBERS[i]}
            tags={TAGS[i]}
            locale={locale}
            index={i}
            inView={inView}
            active={active === i}
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
  number,
  tags,
  locale,
  index,
  inView,
  active,
  onHover,
  onLeave,
}: {
  service: { key: string; abbr: string; tileLabel: string; tileDesc: string; href: string; features: string[] };
  number: string;
  tags: string[];
  locale: string;
  index: number;
  inView: boolean;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.08 }}
    >
      <Link
        href={`/${locale}/${service.href}`}
        className="group relative flex items-start sm:items-center gap-6 sm:gap-10 py-8 sm:py-10 cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Left accent line */}
        <motion.span
          initial={false}
          animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute left-0 top-0 bottom-0 w-px bg-emerald-500 origin-top"
        />

        {/* Number */}
        <span className="font-mono text-xs text-zinc-700 tracking-widest flex-shrink-0 w-6 sm:w-8 pt-0.5 sm:pt-0 transition-colors duration-300 group-hover:text-zinc-500">
          {number}
        </span>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-4">
            <span
              className="font-bold tracking-[-0.02em] text-zinc-300 transition-colors duration-300 group-hover:text-white leading-none"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}
            >
              {service.tileLabel}
            </span>
            <span className="hidden sm:block font-mono text-[11px] text-zinc-700 tracking-widest uppercase">
              {service.abbr}
            </span>
          </div>

          {/* Tags — visible on hover */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-2 mt-3 overflow-hidden"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-[11px] font-mono tracking-wide text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desc — right side, hidden on small */}
        <span className="hidden lg:block max-w-[22rem] text-sm leading-relaxed text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400 flex-shrink-0">
          {service.tileDesc}
        </span>

        {/* Arrow */}
        <span className="flex-shrink-0 text-zinc-700 transition-all duration-300 group-hover:text-emerald-400 group-hover:translate-x-1 text-xl">
          →
        </span>
      </Link>
    </motion.div>
  );
}
