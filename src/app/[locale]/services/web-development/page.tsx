import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { WebDevProjects } from '@/components/webdev/WebDevProjects';
import { baseUrl } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/services/web-development`;
  return {
    title: t.pages.webDev.hero.headline,
    description: t.pages.webDev.hero.subtext,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
  };
}

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const p = t.pages.webDev;

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

      {/* ── What we build ────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 dot-grid">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 max-w-2xl mb-12">
              <Eyebrow>{p.what.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.what.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-base leading-relaxed text-zinc-400">{p.what.body}</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <BentoGrid items={p.bento} />
          </FadeIn>
        </Container>
      </section>

      {/* ── Tech Stack ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-[1]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-[1]" />
        <Container className="relative z-10">
          <FadeIn>
            <div className="flex flex-col gap-4 max-w-2xl mb-12">
              <Eyebrow>{p.tech.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.tech.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-500">{p.tech.note}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.tech.items.map((item, i) => (
              <FadeIn key={item.name} delay={i * 60}>
                <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <span className="font-mono text-base font-bold text-white">{item.name}</span>
                  <span className="text-xs text-zinc-500">{item.desc}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Performance Metrics ──────────────────────────── */}
      <section className="bg-zinc-950 py-24 dot-grid">
        <Container>
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-24">
            <FadeIn className="lg:max-w-sm lg:shrink-0">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {p.performance.headline.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-500">{p.performance.note}</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              {p.performance.points.map((point, i) => (
                <FadeIn key={point.label} delay={i * 80}>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-4xl font-bold text-emerald-400 sm:text-5xl">
                      {point.metric}
                    </span>
                    <span className="text-xs leading-snug text-zinc-500">{point.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-[1]" />
        <Container className="relative z-10">
          <FadeIn>
            <WebDevProjects
              projects={p.projects.placeholders}
              eyebrow={p.projects.eyebrow}
              headline={p.projects.headline}
              note={p.projects.note}
            />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
