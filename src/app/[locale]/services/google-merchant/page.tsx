import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { baseUrl } from '@/lib/config';
import { LegalNoteLinks } from '@/components/gmc/LegalNoteLinks';
import { DottedSurface } from '@/components/ui/DottedSurface';

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

      {/* ── 2. Nachweise / Evidence ───────────────────────── */}
      <DottedSurface className="bg-zinc-950 py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-[2]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-[2]" />
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
                  <p className="text-sm font-medium text-center text-zinc-300">{ph.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </DottedSurface>

      {/* ── 3. Pakete & Preise ────────────────────────────── */}
      <section className="bg-zinc-950 py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <Eyebrow>{p.pricing.eyebrow}</Eyebrow>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {p.pricing.headline}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
            {p.pricing.packages.map((pkg, i) => {
              const isCustom = i === 2;
              const isPro    = i === 1;
              return (
                <FadeIn key={pkg.name} delay={i * 100}>
                  <div
                    className={[
                      'relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300',
                      isPro
                        ? 'gradient-border bg-zinc-950 shadow-[0_8px_40px_rgba(16,185,129,0.12)] hover:shadow-[0_24px_64px_rgba(16,185,129,0.2)] scale-[1.10] z-10 hover:scale-[1.13]'
                        : 'border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:scale-[1.02]',
                    ].join(' ')}
                  >
                    {/* Pro glow top bar */}
                    {isPro && (
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[2px]"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #34d399, #6ee7b7, #34d399, transparent)',
                          boxShadow: '0 0 12px 2px rgba(52,211,153,0.4)',
                        }}
                      />
                    )}

                    {/* Badge strip */}
                    {pkg.label && (
                      <div className="bg-emerald-500/10 border-b border-emerald-500/15 px-6 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
                        {pkg.label}
                      </div>
                    )}

                    <div className="flex flex-col gap-6 flex-1 p-7">
                      {/* Header */}
                      <div className="flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          {pkg.name}
                        </span>
                        <div className="flex items-baseline gap-2 justify-center">
                          <span className={`font-mono font-bold tracking-tight text-white ${isCustom ? 'text-2xl' : 'text-4xl'}`}>
                            {pkg.price}
                          </span>
                        </div>
                        {!isCustom && (
                          <span className="text-xs text-zinc-600">einmalig, zzgl. MwSt.</span>
                        )}
                      </div>

                      <div className="h-px bg-zinc-800/80" />

                      {/* Features */}
                      <ul className="flex flex-col gap-4 flex-1">
                        {pkg.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                                <path d="M1 3.5L3 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="text-sm leading-snug text-zinc-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        href={`/${locale}/kontakt`}
                        variant={isPro ? 'primary' : 'secondary'}
                        className="w-full justify-center"
                      >
                        {pkg.cta}
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={300}>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
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
            <div className="mx-auto max-w-2xl flex flex-col items-center gap-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.trust.headline}
              </h2>
              <ul className="flex flex-col gap-4 text-left w-full">
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
      <section className="relative overflow-hidden bg-zinc-950 py-24 dot-grid">
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
                <div className="flex flex-col items-center gap-4 text-center">
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
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Eyebrow>{p.causes.eyebrow}</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {p.causes.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-stretch">
            {p.causes.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80} className="h-full">
                <div className="group relative flex flex-col justify-between gap-6 rounded-3xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 h-full overflow-hidden transition-all duration-500 hover:border-emerald-500/25 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_20px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(16,185,129,0.04)]">

                  {/* giant watermark number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-mono font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-emerald-400/[0.06]"
                    style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}
                  >
                    {i + 1}
                  </span>

                  {/* left glow bar */}
                  <div
                    aria-hidden
                    className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to bottom, transparent, #34d399, transparent)' }}
                  />

                  {/* top shimmer line */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }}
                  />

                  <div className="relative flex flex-col gap-4 pr-20">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{item.body}</p>
                  </div>

                  {/* bottom glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-3/4 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/[0.04] transition-all duration-700"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24">
        {/* deep radial glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        />
        {/* star-like sparkle dots */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { top: '18%', left: '12%',  size: 2 },
            { top: '32%', left: '82%',  size: 1.5 },
            { top: '55%', left: '6%',   size: 1.5 },
            { top: '65%', left: '91%',  size: 2 },
            { top: '20%', left: '55%',  size: 1 },
            { top: '78%', left: '38%',  size: 1.5 },
            { top: '42%', left: '70%',  size: 1 },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-emerald-400/30 animate-glow-pulse"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
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
                className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_32px_rgba(16,185,129,0.3)]"
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
