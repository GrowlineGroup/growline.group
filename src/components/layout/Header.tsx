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

export function Header({ locale }: Props) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const navLink =
    'text-sm text-zinc-400 hover:text-white transition-colors duration-200 py-1';
  const navLinkActive = 'text-sm text-white font-medium py-1';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-base font-semibold tracking-tight text-white hover:text-emerald-400 transition-colors duration-200"
        >
          Growline Group
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${locale}`}
            className={isActive(`/${locale}`) ? navLinkActive : navLink}
          >
            {t.nav.home}
          </Link>

          {/* Services dropdown */}
          <div className="group relative">
            <button className={`${navLink} flex items-center gap-1`}>
              {t.nav.services}
              <svg
                className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full mt-2 w-52 rounded-xl border border-zinc-800 bg-zinc-950/95 p-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {t.nav.servicesDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-colors duration-150"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href={`/${locale}#about`} className={navLink}>
            {t.nav.about}
          </Link>
          <Link href={`/${locale}#commitment`} className={navLink}>
            {t.nav.commitment}
          </Link>
          <Link href={`/${locale}/kontakt`} className={navLink}>
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />

          {/* CTA button desktop */}
          <Link
            href={`/${locale}/kontakt`}
            className="hidden rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-emerald-500 md:block"
          >
            {t.nav.contact}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-5 bg-zinc-400 transition-all duration-300 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <nav className="flex flex-col gap-1 border-t border-zinc-800/60 bg-zinc-950 px-6 py-4">
          <Link
            href={`/${locale}`}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
          >
            {t.nav.home}
          </Link>
          <div className="px-3 py-2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {t.nav.services}
            </p>
            {t.nav.servicesDropdown.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}#about`}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
          >
            {t.nav.about}
          </Link>
          <Link
            href={`/${locale}#commitment`}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
          >
            {t.nav.commitment}
          </Link>
          <Link
            href={`/${locale}/kontakt`}
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            {t.nav.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
