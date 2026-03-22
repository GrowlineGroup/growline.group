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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-zinc-950`}>
        <Header locale={typedLocale} />
        <main className="flex-1">{children}</main>
        {/* Global footer glow — gleich auf allen Seiten */}
        <div aria-hidden className="pointer-events-none relative h-0 overflow-x-clip">
          <div className="absolute bottom-0 left-1/2 h-[320px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[260px] w-[400px] rounded-full bg-teal-500/7 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[220px] w-[350px] rounded-full bg-violet-600/6 blur-[100px]" />
        </div>
        <Footer locale={typedLocale} />
      </body>
    </html>
  );
}
