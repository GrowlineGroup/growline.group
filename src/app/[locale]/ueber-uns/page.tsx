import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { About } from '@/components/sections/About';
import { baseUrl } from '@/lib/config';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/ueber-uns`;
  return {
    title: t.about.eyebrow,
    description: t.about.subtext,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de/ueber-uns`,
        en: `${baseUrl}/en/ueber-uns`,
        'x-default': `${baseUrl}/de/ueber-uns`,
      },
    },
    openGraph: {
      url: canonicalUrl,
      title: t.about.eyebrow + ' – Growline Group',
      description: t.about.subtext,
      siteName: 'Growline Group',
    },
    twitter: {
      card: 'summary',
      title: t.about.eyebrow,
      description: t.about.subtext,
    },
  };
}

export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  const aboutBreadcrumbLd = breadcrumbSchema([
    { name: t.nav.home, url: `https://growline.group/${locale}` },
    { name: t.nav.about, url: `https://growline.group/${locale}/ueber-uns` },
  ]);

  return (
    <div className="relative bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(aboutBreadcrumbLd) }} />
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>
      <div className="pt-10 pb-2 z-[1] relative">
        <Container>
          <Button
            href={`/${locale}`}
            variant="ghost"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            {t.common.back}
          </Button>
        </Container>
      </div>
      <div className="z-[1] relative">
        <About locale={locale as Locale} />
      </div>
    </div>
  );
}
