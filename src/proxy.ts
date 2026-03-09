import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  return (locales as readonly string[]).includes(preferred) ? preferred : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Skip internal Next.js paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
