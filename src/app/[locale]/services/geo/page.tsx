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
import { baseUrl } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/services/geo`;
  return {
    title: locale === 'de'
      ? 'GEO – In KI-Antworten sichtbar werden'
      : 'GEO – Get cited by AI answers',
    description: t.pages.geo.hero.subtext,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
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

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pb-24 pt-16 dot-grid">
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
      <GeoShift
        eyebrow={p.shift.eyebrow}
        headline={p.shift.headline}
        body={p.shift.body}
      />

      {/* ── Demo ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 dot-grid">
        {/* subtle ambient glow behind demo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.06] blur-[80px]"
        />
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <div className="mx-auto w-fit">
                <Eyebrow>{p.demo.eyebrow}</Eyebrow>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.demo.headline}
              </h2>
              <p className="text-sm text-zinc-500 max-w-sm">{p.demo.note}</p>
            </div>
          </FadeIn>

          {/* Animated chat demo */}
          <div className="mx-auto max-w-2xl">
            <GeoDemo queries={p.demo.queries} aiLabel={p.demo.aiLabel} />
          </div>
        </Container>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="bg-zinc-900 py-24 dot-grid">
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
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 border-t border-zinc-800/60">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
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
        {/* Wider wrapper so pricing cards use more horizontal space */}
        <div className="mx-auto w-full max-w-7xl px-6">
          <GeoPricing
            packages={p.pricing.packages}
            recommendedLabel={p.pricing.recommendedLabel}
            locale={locale}
          />
        </div>
      </section>

      {/* ── Urgency ──────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 border-t border-zinc-800/60">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center text-center gap-4 mb-14">
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
      </section>

    </>
  );
}
