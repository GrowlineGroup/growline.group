'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface GmcPackage {
  name: string;
  label?: string;
  price: string;
  features: string[];
  cta: string;
}

interface GmcPricingProps {
  packages: GmcPackage[];
  locale: string;
  note: string;
}

export function GmcPricing({ packages, locale, note }: GmcPricingProps) {
  const [active, setActive] = useState(1); // default: Pro (middle)

  return (
    <>
      {/* Mobile: pill tabs + single active card */}
      <div className="md:hidden">
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
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
              <GmcCard pkg={pkg} isPro={i === 1} locale={locale} />
            </div>
          )
        )}
        <p className="mt-8 text-center text-xs text-zinc-600">{note}</p>
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg, i) => (
          <GmcCard key={pkg.name} pkg={pkg} isPro={i === 1} locale={locale} />
        ))}
      </div>
    </>
  );
}

function GmcCard({
  pkg,
  isPro,
  locale,
}: {
  pkg: GmcPackage;
  isPro: boolean;
  locale: string;
}) {
  const isCustom = !pkg.price.startsWith('€') && isNaN(Number(pkg.price.replace(/[^0-9]/g, '')));

  return (
    <div
      className={[
        'relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300',
        isPro
          ? 'gradient-border bg-zinc-950 shadow-[0_8px_40px_rgba(16,185,129,0.12)] hover:shadow-[0_24px_64px_rgba(16,185,129,0.2)] scale-[1.10] z-10 hover:scale-[1.13]'
          : 'border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:scale-[1.02]',
      ].join(' ')}
    >
      {/* Pro glow top bar */}
      {isPro && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #34d399, #6ee7b7, #34d399, transparent)',
            boxShadow: '0 0 12px 2px rgba(52,211,153,0.4)',
          }}
        />
      )}

      {/* Badge strip */}
      {pkg.label && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/15 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
          {pkg.label}
        </div>
      )}

      <div className="flex flex-col gap-6 flex-1 p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {pkg.name}
          </span>
          <span className={`font-mono font-bold tracking-tight text-white ${isCustom ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
            {pkg.price}
          </span>
        </div>

        <div className="h-px bg-zinc-800/80" />

        {/* Features */}
        <ul className="flex flex-col gap-4 flex-1">
          {pkg.features.map((feature, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                  <path d="M1 3.5L3 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm leading-snug text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          href={`/${locale}/kontakt`}
          variant={isPro ? 'primary' : 'secondary'}
          className="w-full justify-center"
        >
          {pkg.cta}
        </Button>
      </div>
    </div>
  );
}
