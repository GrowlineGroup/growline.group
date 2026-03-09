import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { locales, Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { baseUrl } from '@/lib/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: {
      default: t.meta.title,
      template: `%s | ${t.meta.title}`,
    },
    description: t.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/de`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: canonicalUrl,
      siteName: t.meta.title,
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}>
        <Header locale={typedLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={typedLocale} />
      </body>
    </html>
  );
}
