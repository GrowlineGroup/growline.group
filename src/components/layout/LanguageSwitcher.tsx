'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';

interface Props {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  function getLocalePath(locale: string): string {
    return pathname.replace(new RegExp(`^/${currentLocale}`), `/${locale}`);
  }

  return (
    <div className="flex items-center rounded-full border border-zinc-700/50 bg-zinc-900/60 p-0.5 text-xs font-semibold backdrop-blur-md">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          aria-label={`Switch language to ${locale.toUpperCase()}`}
          className={
            locale === currentLocale
              ? 'rounded-full bg-emerald-600 px-2.5 py-1 text-white shadow-[0_0_8px_rgba(16,185,129,0.35)] transition-colors duration-200'
              : 'rounded-full px-2.5 py-1 text-zinc-400 transition-colors duration-200 hover:text-zinc-100'
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
