'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface PricingPackage {
  name: string;
  price: string;
  per: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}

interface GeoPricingProps {
  packages: PricingPackage[];
  recommendedLabel: string;
  locale: string;
}

export function GeoPricing({ packages, recommendedLabel, locale }: GeoPricingProps) {
  const defaultIndex = packages.findIndex(p => p.featured);
  const [active, setActive] = useState(defaultIndex >= 0 ? defaultIndex : 0);

  return (
    <>
      {/* Mobile: pill tabs + single active card */}
      <div className="md:hidden">
        <div className="flex gap-2 mb-8 flex-wrap">
          {packages.map((pkg, i) => (
            <button
              key={pkg.name}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                active === i
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600'
              }`}
            >
              {pkg.name}
            </button>
          ))}
        </div>

        {packages.map((pkg, i) =>
          i !== active ? null : (
            <div key={`${pkg.name}-${active}`} className="animate-chat-enter">
              <PricingCard pkg={pkg} recommendedLabel={recommendedLabel} locale={locale} />
            </div>
          )
        )}
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-start">
        {packages.map(pkg => (
          <PricingCard key={pkg.name} pkg={pkg} recommendedLabel={recommendedLabel} locale={locale} />
        ))}
      </div>
    </>
  );
}

function PricingCard({
  pkg,
  recommendedLabel,
  locale,
}: {
  pkg: PricingPackage;
  recommendedLabel: string;
  locale: string;
}) {
  const cardStyle = pkg.featured
    ? 'gradient-border bg-zinc-950 shadow-[0_8px_40px_rgba(16,185,129,0.07)] hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(16,185,129,0.14)]'
    : !pkg.per
    ? 'border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
    : 'border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]';

  const scaleStyle = pkg.featured ? 'scale-[1.08] z-10' : '';

  return (
    <div className={`relative flex flex-col gap-7 rounded-2xl p-5 sm:p-10 h-full transition-all duration-300 ease-out ${cardStyle} ${scaleStyle}`}>
      {pkg.featured && (
        <div className="absolute top-7 right-7 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
          {recommendedLabel}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{pkg.name}</span>
        <div className="flex items-baseline gap-2">
          <span className={`font-mono font-bold text-white ${pkg.featured ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl'}`}>
            {pkg.price}
          </span>
          {pkg.per && <span className="text-sm text-zinc-500">{pkg.per}</span>}
        </div>
        <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">{pkg.description}</p>
      </div>

      <div className="h-px bg-zinc-800/80" />

      <ul className="flex flex-col gap-3.5 flex-1">
        {pkg.features.map(feature => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                <path
                  d="M1 3.5L3 5.5L8 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm leading-snug text-zinc-400">{feature}</span>
          </li>
        ))}
      </ul>

      <Button href={`/${locale}/kontakt`} variant={pkg.featured ? 'primary' : 'secondary'} className="w-full justify-center">
        {pkg.cta}
      </Button>
    </div>
  );
}
