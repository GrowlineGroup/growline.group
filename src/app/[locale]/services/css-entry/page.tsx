import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { CssPricing } from '@/components/css/CssPricing';
import { CssGridBeam } from '@/components/ui/CssGridBeam';
import { StarBackground } from '@/components/ui/StarBackground';
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
    <div className="bg-zinc-950">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-24 pt-16 dot-grid">
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
            <div className="flex flex-col items-center gap-5 max-w-2xl mx-auto text-center">
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


      {/* ── What is CSS Entry ─────────────────────────────── */}
      <section className="relative py-24">
        <CssGridBeam>
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Eyebrow>{p.what.eyebrow}</Eyebrow>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {p.what.headline}
                  </h2>
                  <p className="text-base leading-relaxed text-zinc-400 max-w-xl">{p.what.body}</p>
                </div>
                <ul className="flex flex-col gap-4 text-left">
                  {p.what.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                      </span>
                      <span className="text-sm text-zinc-400">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </Container>
        </CssGridBeam>
      </section>


      {/* ── Pricing ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <div className="mx-auto w-fit">
                <Eyebrow>{p.pricing.eyebrow}</Eyebrow>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.pricing.headline}
              </h2>
            </div>
          </FadeIn>
          <CssPricing
            tiers={p.pricing.tiers}
            toggleMonthly={p.pricing.toggleMonthly}
            toggleAnnual={p.pricing.toggleAnnual}
            savingsBadge={p.pricing.savingsBadge}
            agbLabel={p.pricing.agbLabel}
            note={p.pricing.note}
            locale={locale}
          />
        </Container>
      </section>


      {/* ── Process ──────────────────────────────────────── */}
      <StarBackground className="py-24 bg-zinc-950">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <div className="mx-auto w-fit">
                <Eyebrow>{p.process.eyebrow}</Eyebrow>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.process.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {p.process.steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="relative flex flex-col items-center text-center gap-4">
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
      </StarBackground>
    </div>
  );
}
