'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface Props {
  locale: Locale;
}

// ── Dot particle positions — spread across item width ─────────────────────────
const DOTS = [
  { left: '8%',  delay: '0ms',   dur: '2.1s' },
  { left: '19%', delay: '420ms', dur: '1.9s' },
  { left: '30%', delay: '840ms', dur: '2.3s' },
  { left: '42%', delay: '210ms', dur: '2.0s' },
  { left: '54%', delay: '630ms', dur: '1.8s' },
  { left: '65%', delay: '70ms',  dur: '2.2s' },
  { left: '76%', delay: '490ms', dur: '2.4s' },
  { left: '86%', delay: '280ms', dur: '1.95s' },
  { left: '93%', delay: '700ms', dur: '2.1s' },
];

function NavDots() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-full h-5 overflow-hidden"
    >
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-full"
          style={{
            left: d.left,
            width: i % 3 === 0 ? '2px' : '1.5px',
            height: i % 3 === 0 ? '2px' : '1.5px',
            background: i % 4 === 0 ? '#6ee7b7' : '#34d399',
            animation: `navfall ${d.dur} ${d.delay} infinite ease-in`,
          }}
        />
      ))}
    </span>
  );
}

// ── Active item overlay: lamp bar + corona glow + dots ───────────────────────
function ActiveOverlay() {
  return (
    <>
      {/* Background fill */}
      <span className="absolute inset-0 rounded-full bg-white/[0.08]" />

      {/* Lamp bar — brighter emerald line at top */}
      <span
        className="absolute inset-x-3 top-0 h-[2px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #34d399, #6ee7b7, #34d399, transparent)',
          boxShadow: '0 0 6px 1px rgba(52,211,153,0.55), 0 0 12px 2px rgba(52,211,153,0.2)',
        }}
      />

      {/* Corona glow — bleed below the lamp */}
      <span
        className="absolute inset-x-4 top-[2px] h-5 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.18) 0%, transparent 75%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Falling dots */}
      <NavDots />
    </>
  );
}

export function Header({ locale }: Props) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Route-based active states
  const isHome       = pathname === `/${locale}`;
  const isServices   = pathname.startsWith(`/${locale}/services`);
  const isAbout      = pathname === `/${locale}/ueber-uns`;
  const isCommitment = pathname === `/${locale}/commitment`;
  const isKontakt    = pathname === `/${locale}/kontakt`;

  const baseItem = 'relative text-sm px-4 py-2 rounded-full transition-colors duration-150 cursor-pointer';
  const active   = `${baseItem} font-medium text-white`;
  const inactive = `${baseItem} text-zinc-400 hover:text-zinc-100`;

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/82 backdrop-blur-xl shadow-[0_6px_28px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">

        {/* ── Logo ────────────────────────────────────────── */}
        <Link
          href={`/${locale}`}
          className="text-base font-semibold tracking-tight text-white hover:text-emerald-400 transition-colors duration-200"
        >
          Growline Group
        </Link>

        {/* ── Desktop floating pill nav ────────────────────── */}
        <nav aria-label="Main navigation" className="hidden items-center md:flex">
          <div className="flex items-center gap-1 rounded-full border border-zinc-700/35 bg-zinc-900/55 px-3 py-2 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.075),inset_0_-1px_0_rgba(0,0,0,0.2),0_10px_32px_rgba(0,0,0,0.45)]">

            {/* Home */}
            <Link href={`/${locale}`} className={isHome ? active : inactive}>
              {isHome && <ActiveOverlay />}
              <span className="relative">{t.nav.home}</span>
            </Link>

            {/* Services dropdown */}
            <div className="group relative">
              <button className={`${isServices ? active : inactive} flex items-center gap-1.5`}>
                {isServices && <ActiveOverlay />}
                <span className="relative">{t.nav.services}</span>
                <svg
                  className="relative h-3 w-3 text-zinc-500 transition-transform duration-200 group-hover:rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown glass card */}
              <div className="invisible absolute left-0 top-full mt-3 w-54 rounded-xl border border-zinc-700/45 bg-zinc-950/92 p-2 opacity-0 shadow-[0_20px_56px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
                {t.nav.servicesDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}/${item.href}`}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                      pathname === `/${locale}/${item.href}`
                        ? 'bg-emerald-500/10 text-emerald-300 font-medium'
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/55" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Über uns */}
            <Link href={`/${locale}/ueber-uns`} className={isAbout ? active : inactive}>
              {isAbout && <ActiveOverlay />}
              <span className="relative">{t.nav.about}</span>
            </Link>

            {/* Commitment */}
            <Link href={`/${locale}/commitment`} className={isCommitment ? active : inactive}>
              {isCommitment && <ActiveOverlay />}
              <span className="relative">{t.nav.commitment}</span>
            </Link>

            {/* Kontakt */}
            <Link href={`/${locale}/kontakt`} className={isKontakt ? active : inactive}>
              {isKontakt && <ActiveOverlay />}
              <span className="relative">{t.nav.contact}</span>
            </Link>

          </div>
        </nav>

        {/* ── Right side ──────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </button>
        </div>

      </div>

      {/* ── Mobile menu — glass panel ───────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? 'max-h-[520px]' : 'max-h-0'}`}
      >
        <nav className="flex flex-col gap-0.5 bg-zinc-950/96 backdrop-blur-xl px-4 py-4">
          {/* Subtle top shimmer */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          <MobileLink
            href={`/${locale}`}
            active={isHome}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.home}
          </MobileLink>

          {/* Services group */}
          <div className="py-1">
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
              {t.nav.services}
            </p>
            {t.nav.servicesDropdown.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                  pathname === `/${locale}/${item.href}`
                    ? 'bg-emerald-500/10 text-emerald-300 font-medium'
                    : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100'
                }`}
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                  pathname === `/${locale}/${item.href}` ? 'bg-emerald-400' : 'bg-zinc-700'
                }`} />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="my-0.5 mx-3 h-px bg-zinc-800/60" />

          <MobileLink
            href={`/${locale}/ueber-uns`}
            active={isAbout}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.about}
          </MobileLink>

          <MobileLink
            href={`/${locale}/commitment`}
            active={isCommitment}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.commitment}
          </MobileLink>

          <MobileLink
            href={`/${locale}/kontakt`}
            active={isKontakt}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.contact}
          </MobileLink>

          {/* Language switcher */}
          <div className="pt-2 pb-1 px-1 flex">
            <LanguageSwitcher currentLocale={locale} />
          </div>

        </nav>
      </div>
    </header>
  );
}

// ── Mobile nav link helper ────────────────────────────────────────────────────
function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
        active
          ? 'bg-emerald-500/10 text-emerald-300 font-medium'
          : 'text-zinc-300 hover:bg-zinc-800/40 hover:text-white'
      }`}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #34d399, #6ee7b7)',
            boxShadow: '0 0 6px rgba(52,211,153,0.6)',
          }}
        />
      )}
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
        active ? 'bg-emerald-400' : 'bg-zinc-700'
      }`} />
      {children}
    </Link>
  );
}
