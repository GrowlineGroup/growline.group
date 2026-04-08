import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { GeoDemo } from '@/components/geo/GeoDemo';
import { GeoServiceCard } from '@/components/geo/GeoServiceCard';
import { GeoPricing } from '@/components/geo/GeoPricing';
import { GeoShift } from '@/components/geo/GeoShift';
import { GeoUrgency } from '@/components/geo/GeoUrgency';
import { StarBackground } from '@/components/ui/StarBackground';
import { DottedSurface } from '@/components/ui/DottedSurface';
import { WavyBackground } from '@/components/ui/WavyBackground';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';
import { baseUrl } from '@/lib/config';
import { serviceSchema, breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/services/geo`;
  const geoTitle = locale === 'de'
    ? 'GEO – In KI-Antworten sichtbar werden'
    : 'GEO – Get cited by AI answers';
  return {
    title: geoTitle,
    description: t.pages.geo.hero.subtext,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de/services/geo`,
        en: `${baseUrl}/en/services/geo`,
        'x-default': `${baseUrl}/de/services/geo`,
      },
    },
    openGraph: {
      url: canonicalUrl,
      title: geoTitle,
      description: t.pages.geo.hero.subtext,
      siteName: 'Growline Group',
    },
    twitter: {
      card: 'summary',
      title: geoTitle,
      description: t.pages.geo.hero.subtext,
    },
  };
}

export default async function GeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const p = t.pages.geo;

  const geoServiceLd = serviceSchema({
    locale: locale as string,
    name: locale === 'de' ? 'GEO – Generative Engine Optimization' : 'GEO – Generative Engine Optimization',
    description: p.hero.subtext,
    path: '/services/geo',
  });

  const geoBreadcrumbLd = breadcrumbSchema([
    { name: t.nav.home, url: `https://growline.group/${locale}` },
    { name: t.nav.services, url: `https://growline.group/${locale}` },
    { name: 'GEO', url: `https://growline.group/${locale}/services/geo` },
  ]);

  const geoFaqLd = faqSchema([
    {
      question: locale === 'de' ? 'Was ist GEO (Generative Engine Optimization)?' : 'What is GEO (Generative Engine Optimization)?',
      answer: p.shift.body,
    },
    {
      question: locale === 'de' ? 'Warum sollte man jetzt mit GEO anfangen?' : 'Why should you start with GEO now?',
      answer: p.urgency.body,
    },
  ]);

  return (
    <div className="relative bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(geoServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(geoBreadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(geoFaqLd) }} />

      {/* ── Globale Sterne über die gesamte Seite ─────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 sm:pb-24 pt-10 sm:pt-16 dot-grid z-[1]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[100px]"
        />
        <Container className="relative flex flex-col gap-8">
          <Button
            href={`/${locale}`}
            variant="ghost"
            className="self-start text-sm text-zinc-500 hover:text-zinc-300"
          >
            {t.common.back}
          </Button>
          <FadeIn delay={100}>
            <div className="flex flex-col gap-5 max-w-2xl">
              <Eyebrow>{p.hero.badge}</Eyebrow>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">{p.hero.headline}</span>
                <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  {p.hero.headlineAccent}
                </span>
              </h1>
              <p className="text-base leading-relaxed text-zinc-400 max-w-xl">
                {p.hero.subtext}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── The Shift ────────────────────────────────────── */}
      <div className="relative z-[1]">
        <GeoShift
          eyebrow={p.shift.eyebrow}
          headline={p.shift.headline}
          body={p.shift.body}
        />
      </div>

      {/* ── Demo ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24 dot-grid z-[1]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.06] blur-[80px]"
        />
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
              <div className="mx-auto w-fit">
                <Eyebrow>{p.demo.eyebrow}</Eyebrow>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.demo.headline}
              </h2>
              <p className="text-sm text-zinc-500 max-w-sm">{p.demo.note}</p>
            </div>
          </FadeIn>
          <div className="mx-auto max-w-2xl">
            <GeoDemo queries={p.demo.queries} aiLabel={p.demo.aiLabel} />
          </div>
        </Container>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <div className="relative z-[1]">
        <StarBackground className="py-24 sm:py-40">
          <Container>
            <FadeIn>
              <div className="flex flex-col items-center text-center gap-4 mb-12">
                <div className="mx-auto w-fit">
                  <Eyebrow>{p.what.eyebrow}</Eyebrow>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {p.what.headline}
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {p.what.services.map((service, i) => (
                <FadeIn key={service.title} delay={i * 80} className="h-full">
                  <GeoServiceCard
                    number={String(i + 1).padStart(2, '0')}
                    title={service.title}
                    body={service.body}
                  />
                </FadeIn>
              ))}
            </div>
          </Container>
        </StarBackground>
      </div>

      {/* ── Pricing ──────────────────────────────────────── */}
      <div className="relative z-[1]">
        <DottedSurface className="py-16 sm:py-24">
          <Container>
            <FadeIn>
              <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
                <div className="mx-auto w-fit">
                  <Eyebrow>{p.pricing.eyebrow}</Eyebrow>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {p.pricing.headline}
                </h2>
                <p className="text-sm text-zinc-500">{p.pricing.note}</p>
              </div>
            </FadeIn>
          </Container>
          <div className="mx-auto w-full max-w-7xl px-6">
            <GeoPricing
              packages={p.pricing.packages}
              recommendedLabel={p.pricing.recommendedLabel}
              locale={locale}
            />
          </div>
        </DottedSurface>
      </div>

      {/* ── Urgency ──────────────────────────────────────── */}
      <div className="relative z-[1]">
        <WavyBackground waveOpacity={0.5} speed="slow" className="py-16 sm:py-24">
          <Container>
            <FadeIn>
              <div className="flex flex-col items-center text-center gap-4 mb-10 sm:mb-14">
                <div className="mx-auto w-fit">
                  <Eyebrow>{p.urgency.eyebrow}</Eyebrow>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    {p.urgency.headline}
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-zinc-400 max-w-2xl">{p.urgency.body}</p>
              </div>
            </FadeIn>
            <GeoUrgency stats={p.urgency.stats} points={p.urgency.points} />
          </Container>
        </WavyBackground>
      </div>

    </div>
  );
}
