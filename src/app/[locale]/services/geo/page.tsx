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
    title: t.pages.geo.hero.headline,
    description: t.pages.geo.hero.subtext,
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

      {/* ── The Shift ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl flex flex-col gap-6">
              <Badge>{p.shift.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {p.shift.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-base leading-relaxed text-zinc-600">{p.shift.body}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Demo ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Badge variant="light">{p.demo.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.demo.headline}
              </h2>
              <p className="text-sm text-zinc-500">{p.demo.note}</p>
            </div>
          </FadeIn>
          <div className="mx-auto max-w-2xl flex flex-col gap-8">
            {p.demo.queries.map((query, i) => {
              const parts = query.ai.split(query.highlight);
              return (
                <FadeIn key={i} delay={i * 120}>
                  <div className="flex flex-col gap-3">
                    {/* User bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-zinc-800 px-4 py-3">
                        <p className="text-sm text-zinc-200">{query.user}</p>
                      </div>
                    </div>
                    {/* AI response bubble */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-zinc-900 px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">{p.demo.aiLabel}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {parts.map((part, pi) => (
                            <span key={pi}>
                              {part}
                              {pi < parts.length - 1 && (
                                <span className="rounded-sm bg-emerald-500/20 px-1 py-0.5 font-semibold text-emerald-300">
                                  {query.highlight}
                                </span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}

          </div>
        </Container>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="bg-zinc-900 py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 mb-12">
              <Badge variant="light">{p.what.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.what.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {p.what.services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 80}>
                <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 h-full">
                  <h3 className="text-base font-semibold text-white">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{service.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Urgency ──────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 mb-14 max-w-2xl">
              <Badge variant="light">{p.urgency.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  {p.urgency.headline}
                </span>
              </h2>
              <p className="text-base leading-relaxed text-zinc-400">{p.urgency.body}</p>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-14 md:grid-cols-4">
            {p.urgency.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div className="flex flex-col gap-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <span className="font-mono text-2xl font-bold text-emerald-400 sm:text-3xl">
                    {stat.metric}
                  </span>
                  <span className="text-xs leading-snug text-zinc-500">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Reason cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {p.urgency.points.map((point, i) => (
              <FadeIn key={point.title} delay={i * 80}>
                <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 h-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{point.body}</p>
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
