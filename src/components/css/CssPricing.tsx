'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CssTier {
  name: string;
  badge: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  annualBilling: string;
  features: string[];
  cta: string;
  featured: boolean;
  custom: boolean;
}

interface CssPricingProps {
  tiers: CssTier[];
  toggleMonthly: string;
  toggleAnnual: string;
  savingsBadge: string;
  agbLabel: string;
  note: string;
  locale: string;
}

export function CssPricing({
  tiers,
  toggleMonthly,
  toggleAnnual,
  savingsBadge,
  agbLabel,
  note,
  locale,
}: CssPricingProps) {
  const [annual, setAnnual] = useState(false);
  const featuredIndex = tiers.findIndex(t => t.featured);
  const [active, setActive] = useState(featuredIndex >= 0 ? featuredIndex : 0);

  return (
    <div className="flex flex-col gap-10">
      {/* Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              !annual
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            {toggleMonthly}
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              annual
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            {toggleAnnual}
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              {savingsBadge}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: pill tabs + single active card */}
      <div className="md:hidden">
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {tiers.map((tier, i) => (
            <button
              key={tier.name}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                active === i
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600'
              }`}
            >
              {tier.name}
              {tier.featured && (
                <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12 2 L13.76 9.57 L21.51 8.91 L14.85 12.93 L17.88 20.09 L12 15 L6.12 20.09 L9.15 12.93 L2.49 8.91 L10.24 9.57 Z" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
        {tiers.map((tier, i) =>
          i !== active ? null : (
            <div key={`${tier.name}-${active}`} className="animate-chat-enter">
              <CssTierCard tier={tier} index={i} annual={annual} locale={locale} mobile />
            </div>
          )
        )}
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier, i) => (
          <CssTierCard key={tier.name} tier={tier} index={i} annual={annual} locale={locale} />
        ))}
      </div>

      <p className="text-center text-xs text-zinc-500">
        {note}
        {' · '}
        <a
          href={`/${locale}/agb/css-entry`}
          className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
        >
          {agbLabel}
        </a>
      </p>
    </div>
  );
}

const SIZES = [
  { padding: 'p-12', priceText: 'text-6xl' },
  { padding: 'p-12', priceText: 'text-6xl' },
  { padding: 'p-12', priceText: 'text-6xl' },
] as const;

function CssTierCard({
  tier,
  index,
  annual,
  locale,
  mobile = false,
}: {
  tier: CssTier;
  index: number;
  annual: boolean;
  locale: string;
  mobile?: boolean;
}) {
  const size = SIZES[index] ?? SIZES[0];

  const price = tier.custom
    ? 'Auf Anfrage'
    : annual
    ? `€${tier.annualPrice}`
    : `€${tier.monthlyPrice}`;

  const cardStyle = (tier.featured || mobile)
    ? 'gradient-border bg-zinc-950 shadow-[0_8px_40px_rgba(16,185,129,0.07)]'
    : 'border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]';

  return (
    <div className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ease-out ${cardStyle}`}>
      {/* Strip badge */}
      {tier.badge && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/15 px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-emerald-400">
          {tier.badge}
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col gap-7 flex-1 ${size.padding}`}>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {tier.name}
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`font-mono font-bold text-white ${size.priceText}`}>
              {price}
            </span>
            {!tier.custom && (
              <span className="text-sm text-zinc-500">/ Monat</span>
            )}
          </div>
          {annual && !tier.custom && tier.annualBilling && (
            <p className="text-xs text-zinc-600">{tier.annualBilling}</p>
          )}
          <p className="text-sm leading-relaxed text-zinc-500 mt-1">{tier.description}</p>
        </div>

        <div className="h-px bg-zinc-800/80" />

        <ul className="flex flex-col gap-3.5 flex-1">
          {tier.features.map(feature => (
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

        <Button
          href={`/${locale}/kontakt`}
          variant={tier.featured ? 'primary' : 'secondary'}
          className="w-full justify-center"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
