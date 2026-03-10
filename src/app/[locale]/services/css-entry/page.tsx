import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { baseUrl } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/services/css-entry`;
  return {
    title: t.pages.cssEntry.hero.headline,
    description: t.pages.cssEntry.hero.subtext,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
  };
}

export default async function CSSEntryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const p = t.pages.cssEntry;

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
              <Badge variant="light">{p.hero.badge}</Badge>
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

      {/* ── What is CSS Entry ─────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Badge>{p.what.eyebrow}</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                  {p.what.headline}
                </h2>
                <p className="text-base leading-relaxed text-zinc-600">{p.what.body}</p>
              </div>
              <ul className="flex flex-col gap-4">
                {p.what.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-sm text-zinc-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Badge variant="light">{p.pricing.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.pricing.headline}
              </h2>
            </div>
          </FadeIn>

          {/* Single primary offer */}
          <div className="mx-auto max-w-md">
            <FadeIn>
              <div className="relative flex flex-col gap-8 rounded-2xl gradient-border p-10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white">
                  {p.pricing.annual.badge}
                </span>

                {/* Price */}
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-sm font-medium text-zinc-400">{p.pricing.annual.label}</p>
                  <div className="flex items-end gap-1.5">
                    <span className="font-mono text-6xl font-bold text-white">
                      €{p.pricing.annual.price}
                    </span>
                    <span className="mb-2 text-base text-zinc-500">{p.pricing.annual.unit}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{p.pricing.annual.billingLabel}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-400">
                    {p.pricing.annual.savings}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-800" />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {p.pricing.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  href={`/${locale}/kontakt`}
                  variant="primary"
                  className="w-full justify-center bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  {p.pricing.cta}
                </Button>
              </div>
            </FadeIn>

            {/* Secondary: monthly mention */}
            <FadeIn delay={100}>
              <p className="mt-6 text-center text-xs text-zinc-600">
                {p.pricing.monthly.label}: €{p.pricing.monthly.price} {p.pricing.monthly.unit} ·{' '}
                {p.pricing.monthly.billing}
              </p>
              <p className="mt-2 text-center text-xs text-zinc-700">{p.pricing.note}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="bg-zinc-900 py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Badge variant="light">{p.process.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.process.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {p.process.steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="relative flex flex-col gap-4">
                  {i < p.process.steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-zinc-800 -translate-y-1/2 z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(100% + 1rem)' }} />
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-lg font-bold text-emerald-400">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {t.cta.headline}
              </h2>
              <p className="text-base leading-relaxed text-zinc-600">{t.cta.body}</p>
              <Button
                href={`/${locale}/kontakt`}
                variant="secondary"
              >
                {t.cta.button}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
