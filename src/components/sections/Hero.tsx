import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { GlowCard } from '@/components/ui/GlowCard';

interface Props {
  locale: Locale;
}

export function Hero({ locale }: Props) {
  const t = getTranslations(locale);

  return (
    <section className="relative overflow-hidden bg-zinc-950 pb-0 pt-20">
      {/* Glow layer 1: wide, soft */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.08] blur-[130px] animate-glow-pulse"
      />
      {/* Glow layer 2: tight, bright, offset */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 top-1/3 h-56 w-56 rounded-full bg-emerald-400/[0.12] blur-3xl"
      />
      {/* Glow layer 3: bottom-left accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-teal-500/[0.06] blur-3xl"
      />
      {/* Dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid" />
      {/* Top fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent"
      />

      <Container className="relative flex flex-col items-center gap-7 text-center">
        {/* Badge */}
        <div className="hero-reveal-1">
          <Badge variant="light">{t.hero.badge}</Badge>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl">
          <span className="hero-reveal-2 block text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.08]">
            {t.hero.headline_1}
          </span>
          <span className="hero-reveal-3 block text-5xl font-bold tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.08]">
            <span className="shimmer-text">{t.hero.headline_2}</span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-reveal-4 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
          {t.hero.subtext}
        </p>

        {/* Section label */}
        <div className="hero-reveal-5 mt-4 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            {t.hero.tilesLabel}
          </p>
          {/* Gradient line */}
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </div>

        {/* Service tiles */}
        <div className="hero-reveal-5 mt-1 grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
          {t.services.items.map((service, i) => (
            <GlowCard
              key={service.key}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/25 hover:shadow-[0_12px_40px_rgba(16,185,129,0.08)]"
              style={{ animationDelay: `${i * 60}ms` } as React.CSSProperties}
            >
              <Link href={`#${service.key}`} className="flex flex-col gap-3 p-5 text-left">
                <span className="font-mono text-sm font-bold tracking-tighter text-emerald-400">
                  {service.abbr}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold leading-snug text-white">
                    {service.tileLabel}
                  </span>
                  <span className="text-xs leading-relaxed text-zinc-500">
                    {service.tileDesc}
                  </span>
                </div>
                <span className="mt-auto flex items-center gap-1 text-xs font-medium text-emerald-500/0 transition-all duration-200 group-hover:text-emerald-500/100">
                  Zum Bereich <span>↓</span>
                </span>
              </Link>
            </GlowCard>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-zinc-950"
        />
      </Container>

      {/* Scroll arrow */}
      <div className="relative flex justify-center pb-10 pt-14">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-xs text-zinc-600 animate-scroll-bounce">
          ↓
        </div>
      </div>
    </section>
  );
}
