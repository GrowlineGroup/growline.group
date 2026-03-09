import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: t.pages.googleMerchant.hero.headline,
    description: t.pages.googleMerchant.hero.subtext,
  };
}

export default async function GoogleMerchantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const p = t.pages.googleMerchant;

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

      {/* ── Causes ───────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 mb-12">
              <Badge>{p.causes.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {p.causes.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {p.causes.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 h-full">
                  <h3 className="text-base font-semibold text-zinc-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Badge variant="light">{p.process.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.process.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-5xl font-bold leading-none text-emerald-500/40">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Evidence ─────────────────────────────────────── */}
      <section className="bg-zinc-900 py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Badge variant="light">{p.evidence.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.evidence.headline}
              </h2>
              <p className="text-sm text-zinc-500">{p.evidence.note}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {p.evidence.placeholders.map((ph, i) => (
              <FadeIn key={ph.label} delay={i * 100}>
                <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60">
                    <span className="px-4 text-center text-xs text-zinc-600">{ph.hint}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-300">{ph.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Trust ────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col gap-8">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.trust.headline}
              </h2>
              <ul className="flex flex-col gap-4">
                {p.trust.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-sm text-zinc-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
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
              <Button href={`/${locale}/kontakt`} variant="secondary">
                {t.cta.button}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
