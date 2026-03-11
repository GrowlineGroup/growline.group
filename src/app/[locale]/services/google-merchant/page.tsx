import type { Metadata } from 'next';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { baseUrl } from '@/lib/config';
import { LegalNoteLinks } from '@/components/gmc/LegalNoteLinks';
import { BalloonPopBackground } from '@/components/ui/BalloonPopBackground';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/services/google-merchant`;
  return {
    title: t.pages.googleMerchant.hero.headline,
    description: t.pages.googleMerchant.hero.subtext,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
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
      {/* ── 1. Hero ───────────────────────────────────────── */}
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
              {/* Logo + Badge row */}
              <div className="flex items-center gap-3">
                <Image
                  src="/gmc-logo.png"
                  alt="Google Merchant Center"
                  width={22}
                  height={22}
                  className="rounded-md opacity-80"
                />
                <Eyebrow>{p.hero.badge}</Eyebrow>
              </div>
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

      {/* ── 2. Nachweise / Evidence ───────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 py-24">
        <BalloonPopBackground className="absolute inset-0" />
        <Container className="relative z-10">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Eyebrow>{p.evidence.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.evidence.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {p.evidence.placeholders.map((ph, i) => (
              <FadeIn key={ph.label} delay={i * 100}>
                <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700/60 bg-zinc-900/60">
                    <span className="h-8 w-8 rounded-lg border border-zinc-700/60 bg-zinc-800/60" />
                    <span className="px-4 text-center text-xs text-zinc-600">{ph.hint}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-300">{ph.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Pakete & Preise ────────────────────────────── */}
      <section className="bg-[#0d0d11] py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Eyebrow>{p.pricing.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.pricing.headline}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-start">
            {p.pricing.packages.map((pkg, i) => {
              const isCustom = i === 2;
              const isPro = i === 1;
              return (
                <FadeIn key={pkg.name} delay={i * 100}>
                  <div
                    className={[
                      'gradient-border relative flex flex-col gap-6 rounded-3xl bg-zinc-950 p-8',
                      'shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.5)]',
                      'transition-all duration-300',
                      isPro
                        ? 'ring-1 ring-emerald-500/[0.14]'
                        : 'hover:shadow-[0_0_0_1px_rgba(16,185,129,0.18),0_20px_60px_rgba(0,0,0,0.5),0_0_50px_rgba(16,185,129,0.06)]',
                      isCustom ? 'opacity-70 hover:opacity-90' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {/* Pro accent line */}
                    {isPro && (
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
                      />
                    )}

                    <div className="flex flex-col gap-1.5 border-b border-zinc-800 pb-6">
                      {/* Pro label */}
                      {pkg.label ? (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400/80">
                          {pkg.label}
                        </span>
                      ) : (
                        <span className="text-[10px] opacity-0 select-none">–</span>
                      )}
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                        {pkg.name}
                      </span>
                      <div className="mt-1 flex items-end gap-1.5">
                        <span
                          className={`font-bold tracking-tight text-white${isCustom ? ' text-2xl' : ' text-4xl'}`}
                        >
                          {pkg.price}
                        </span>
                        {!isCustom && (
                          <span className="mb-1 text-xs text-zinc-500">{p.pricing.perMonth}</span>
                        )}
                      </div>
                    </div>

                    <ul className="flex flex-1 flex-col gap-3">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </span>
                          <span className="text-sm leading-relaxed text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      href={`/${locale}/kontakt`}
                      variant="secondary"
                      className={[
                        'w-full transition-all duration-200',
                        isPro
                          ? 'border-emerald-500/25 text-emerald-400/80 hover:border-emerald-500/40 hover:text-emerald-400'
                          : 'border-zinc-700 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400',
                      ].join(' ')}
                    >
                      {pkg.cta}
                    </Button>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={300}>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="text-xs text-zinc-600">{p.pricing.note}</p>
              <LegalNoteLinks items={p.legalNote.items} />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── 4. Warum Growline Group ───────────────────────── */}
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
                    <span className="text-sm leading-relaxed text-zinc-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── 5. Unsere Herangehensweise ────────────────────── */}
      <section className="relative overflow-hidden bg-[#0d0d11] py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Eyebrow>{p.process.eyebrow}</Eyebrow>
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
                  <p className="text-sm leading-relaxed text-zinc-300">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Häufige Ursachen ───────────────────────────── */}
      <section className="bg-zinc-950 py-20">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 mb-12">
              <Eyebrow>{p.causes.eyebrow}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {p.causes.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {p.causes.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 h-full">
                  <h3 className="text-sm font-semibold text-zinc-300">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.07] blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
        />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-xl flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.cta.headline}
                <span className="mt-1 block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  {p.cta.headlineAccent}
                </span>
              </h2>
              <p className="text-base leading-relaxed text-zinc-400">{p.cta.body}</p>
              <Button
                href={`/${locale}/kontakt`}
                variant="primary"
                className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.25)]"
              >
                {p.cta.button}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
