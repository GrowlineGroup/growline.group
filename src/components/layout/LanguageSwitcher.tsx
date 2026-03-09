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
    <div className="flex items-center gap-1 text-sm font-medium">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-zinc-300 dark:text-zinc-600">|</span>}
          <Link
            href={getLocalePath(locale)}
            aria-label={`Switch language to ${locale.toUpperCase()}`}
            className={
              locale === currentLocale
                ? 'text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors'
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
