'use client';

import { useState } from 'react';

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

const PACKAGE_KEYS = ['starter', 'professional', 'custom'] as const;

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
              <GmcCard pkg={pkg} isPro={i === 1} locale={locale} index={i} />
            </div>
          )
        )}
        <p className="mt-8 text-center text-xs text-zinc-600">{note}</p>
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg, i) => (
          <GmcCard key={pkg.name} pkg={pkg} isPro={i === 1} locale={locale} index={i} />
        ))}
      </div>
    </>
  );
}

function GmcCard({
  pkg,
  isPro,
  locale,
  index,
}: {
  pkg: GmcPackage;
  isPro: boolean;
  locale: string;
  index: number;
}) {
  const [loading, setLoading] = useState(false);
  const isCustom = index === 2; // Custom package

  async function handleCheckout() {
    if (isCustom) {
      window.location.href = `/${locale}/kontakt`;
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/gmc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: PACKAGE_KEYS[index], locale }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('[checkout/gmc]', data.error);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <div
      className={[
        'group relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500',
        isPro
          ? 'gradient-border bg-zinc-950 shadow-[0_8px_40px_rgba(16,185,129,0.15)] hover:shadow-[0_24px_64px_rgba(16,185,129,0.25)] scale-[1.10] z-10 hover:scale-[1.13]'
          : 'border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 hover:border-emerald-500/25 hover:shadow-[0_16px_48px_rgba(16,185,129,0.08)] hover:scale-[1.03]',
      ].join(' ')}
    >
      {/* Top glow bar — all cards, stronger for Pro */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500 ${isPro ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: 'linear-gradient(90deg, transparent, #34d399, #6ee7b7, #34d399, transparent)',
          boxShadow: isPro ? '0 0 16px 3px rgba(52,211,153,0.5)' : '0 0 8px 1px rgba(52,211,153,0.25)',
        }}
      />

      {/* Corner glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 ${
          isPro ? 'bg-emerald-500/15 opacity-100' : 'bg-emerald-500/10 opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-2/3 rounded-full bg-emerald-500/0 blur-3xl group-hover:bg-emerald-500/[0.06] transition-all duration-700"
      />

      {/* Badge strip */}
      {pkg.label && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/15 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
          {pkg.label}
        </div>
      )}

      <div className="relative flex flex-col gap-6 flex-1 p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {pkg.name}
          </span>
          <span className={`font-mono font-bold tracking-tight transition-colors duration-300 ${
            isPro ? 'text-white' : 'text-white group-hover:text-emerald-100'
          } ${isCustom ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
            {pkg.price}
          </span>
        </div>

        <div className="h-px bg-zinc-800/80 group-hover:bg-emerald-500/15 transition-colors duration-500" />

        {/* Features */}
        <ul className="flex flex-col gap-4 flex-1">
          {pkg.features.map((feature, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25 transition-colors duration-300">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                  <path d="M1 3.5L3 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm leading-snug text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
            isPro
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.3)]'
              : 'border border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-300'
          } ${loading ? 'opacity-60 cursor-wait' : ''}`}
        >
          {loading
            ? (locale === 'de' ? 'Weiterleitung...' : 'Redirecting...')
            : pkg.cta}
        </button>
      </div>
    </div>
  );
}
