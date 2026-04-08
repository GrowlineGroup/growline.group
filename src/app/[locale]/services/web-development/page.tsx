import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { WebDevProjects } from '@/components/webdev/WebDevProjects';
import { WebDevMetrics } from '@/components/webdev/WebDevMetrics';
import { baseUrl } from '@/lib/config';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BorderBeam } from '@/components/ui/border-beam';
import { MagicCard } from '@/components/ui/magic-card';
import { Meteors } from '@/components/ui/meteors';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';
import { serviceSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

// ── Color palettes ────────────────────────────────────────────────────────────

const PROJECT_COLORS = [
  { gradientColor: 'rgba(16,185,129,0.10)',  gradientFrom: '#34d399', gradientTo: '#2dd4bf', accent: '#34d399' },
  { gradientColor: 'rgba(20,184,166,0.10)',  gradientFrom: '#2dd4bf', gradientTo: '#06b6d4', accent: '#2dd4bf' },
  { gradientColor: 'rgba(139,92,246,0.10)',  gradientFrom: '#a78bfa', gradientTo: '#818cf8', accent: '#a78bfa' },
  { gradientColor: 'rgba(245,158,11,0.10)',  gradientFrom: '#fbbf24', gradientTo: '#f97316', accent: '#fbbf24' },
  { gradientColor: 'rgba(244,63,94,0.10)',   gradientFrom: '#fb7185', gradientTo: '#f43f5e', accent: '#fb7185' },
  { gradientColor: 'rgba(6,182,212,0.10)',   gradientFrom: '#22d3ee', gradientTo: '#0ea5e9', accent: '#22d3ee' },
  { gradientColor: 'rgba(168,85,247,0.10)',  gradientFrom: '#c084fc', gradientTo: '#a855f7', accent: '#c084fc' },
  { gradientColor: 'rgba(16,185,129,0.10)',  gradientFrom: '#34d399', gradientTo: '#2dd4bf', accent: '#34d399' },
  { gradientColor: 'rgba(20,184,166,0.10)',  gradientFrom: '#2dd4bf', gradientTo: '#06b6d4', accent: '#2dd4bf' },
] as const;

const STEP_COLORS = [
  'text-emerald-400',
  'text-teal-400',
  'text-violet-400',
  'text-amber-400',
] as const;

const STEP_BORDER = [
  'border-l-emerald-500/50',
  'border-l-teal-500/50',
  'border-l-violet-500/50',
  'border-l-amber-500/50',
] as const;

const TECH_COLORS = [
  { gradientColor: 'rgba(16,185,129,0.10)',  gradientFrom: '#34d399', gradientTo: '#2dd4bf', dot: 'bg-emerald-400' },
  { gradientColor: 'rgba(20,184,166,0.10)',  gradientFrom: '#2dd4bf', gradientTo: '#06b6d4', dot: 'bg-teal-400' },
  { gradientColor: 'rgba(139,92,246,0.10)',  gradientFrom: '#a78bfa', gradientTo: '#818cf8', dot: 'bg-violet-400' },
  { gradientColor: 'rgba(245,158,11,0.10)',  gradientFrom: '#fbbf24', gradientTo: '#f97316', dot: 'bg-amber-400' },
  { gradientColor: 'rgba(6,182,212,0.10)',   gradientFrom: '#22d3ee', gradientTo: '#0ea5e9', dot: 'bg-cyan-400' },
  { gradientColor: 'rgba(168,85,247,0.10)',  gradientFrom: '#c084fc', gradientTo: '#a855f7', dot: 'bg-purple-400' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────

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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de/services/web-development`,
        en: `${baseUrl}/en/services/web-development`,
        'x-default': `${baseUrl}/de/services/web-development`,
      },
    },
    openGraph: {
      url: canonicalUrl,
      title: t.pages.webDev.hero.headline + ' – ' + t.pages.webDev.hero.headlineAccent,
      description: t.pages.webDev.hero.subtext,
      siteName: 'Growline Group',
    },
    twitter: {
      card: 'summary',
      title: t.pages.webDev.hero.headline,
      description: t.pages.webDev.hero.subtext,
    },
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

  const webDevServiceLd = serviceSchema({
    locale: locale as string,
    name: p.hero.headline + ' ' + p.hero.headlineAccent,
    description: p.hero.subtext,
    path: '/services/web-development',
  });

  const webDevBreadcrumbLd = breadcrumbSchema([
    { name: t.nav.home, url: `https://growline.group/${locale}` },
    { name: t.nav.services, url: `https://growline.group/${locale}` },
    { name: 'Web Development', url: `https://growline.group/${locale}/services/web-development` },
  ]);

  return (
    <div className="relative bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webDevServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webDevBreadcrumbLd) }} />

      {/* ── Stars — full page ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>

      {/* ── Page-level ambient glows (not clipped by sections) ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        {/* Hero: emerald top-center */}
        <div className="absolute left-1/2 top-[-120px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px]" />
        {/* Hero: violet top-right */}
        <div className="absolute right-[-80px] top-[-60px] h-[420px] w-[520px] rounded-full bg-violet-600/7 blur-[130px]" />
        {/* "Was wir bauen": teal left */}
        <div className="absolute left-[-100px] top-[30%] h-[550px] w-[450px] rounded-full bg-teal-500/6 blur-[120px]" />
        {/* Process: violet right */}
        <div className="absolute right-[-80px] top-[48%] h-[650px] w-[520px] rounded-full bg-violet-600/6 blur-[140px]" />
        {/* Tech: amber bottom-right */}
        <div className="absolute right-[-60px] top-[65%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
        {/* CTA: emerald bottom-center */}
        <div
          className="absolute bottom-[-60px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px]"
        />
        {/* CTA: teal bottom-right */}
        <div className="absolute bottom-[0px] right-[-80px] h-[350px] w-[400px] rounded-full bg-teal-500/7 blur-[110px]" />
      </div>

      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative py-16 pb-16 sm:pb-24 pt-16 dot-grid z-[1]">
        {/* Meteors in own clip wrapper so overflow stays contained */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Meteors number={12} minDuration={8} maxDuration={18} />
        </div>

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
                <AnimatedGradientText
                  colorFrom="#6ee7b7"
                  colorTo="#2dd4bf"
                  speed={0.5}
                  className="block"
                >
                  {p.hero.headlineAccent}
                </AnimatedGradientText>
              </h1>
              <p className="text-base leading-relaxed text-zinc-300 max-w-xl">
                {p.hero.subtext}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── 2. Was wir für dich bauen ────────────────────── */}
      <section className="relative py-16 sm:py-24 dot-grid z-[1]">
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-12">
              <Eyebrow>{p.what.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.what.headline.split('\n').map((line, i) => (
                  <span key={i} className={`block ${i === 1 ? 'text-teal-300' : ''}`}>
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-base leading-relaxed text-zinc-400">{p.what.body}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.what.projects.map((project, i) => {
              const c = PROJECT_COLORS[i % PROJECT_COLORS.length];
              return (
                <FadeIn key={project.type} delay={i * 60}>
                  <MagicCard
                    className="h-full rounded-2xl"
                    gradientColor={c.gradientColor}
                    gradientFrom={c.gradientFrom}
                    gradientTo={c.gradientTo}
                    gradientSize={220}
                  >
                    <div className="flex flex-col gap-3 p-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="shrink-0 h-1.5 w-1.5 rounded-full"
                          style={{ background: c.accent }}
                        />
                        <span className="text-base font-semibold text-white">{project.type}</span>
                      </div>
                      <span className="text-sm leading-relaxed text-zinc-400">{project.desc}</span>
                    </div>
                  </MagicCard>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 3. Wie es abläuft ────────────────────────────── */}
      <section className="relative py-16 sm:py-24 z-[1]">
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center mb-14">
              <Eyebrow>{p.process.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.process.headline}
              </h2>
            </div>
          </FadeIn>
          <div className="relative rounded-3xl border border-zinc-800/60 overflow-hidden p-8 sm:p-10">
            <BorderBeam size={250} duration={14} colorFrom="transparent" colorTo="#a78bfa" delay={10} reverse />
            <BorderBeam size={180} duration={22} colorFrom="transparent" colorTo="#34d399" delay={5} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {p.process.steps.map((step, i) => (
                <FadeIn key={step.number} delay={i * 100}>
                  <div className={`flex items-start gap-4 pl-4 border-l-2 ${STEP_BORDER[i]}`}>
                    <span className={`font-mono text-4xl font-bold leading-none shrink-0 pt-0.5 ${STEP_COLORS[i]}`}>
                      {step.number}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-semibold text-white leading-snug min-h-[2.5rem] flex items-start">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Warum individuell / Bento ─────────────────── */}
      <section className="relative py-16 sm:py-24 dot-grid z-[1]">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-12">
              <Eyebrow>{p.why.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.why.headline}
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <BentoGrid items={p.bento} magic />
          </FadeIn>
        </Container>
      </section>

      {/* ── 5. Worauf du dich verlassen kannst ───────────── */}
      <section className="relative py-16 sm:py-24 z-[1]">
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-12">
              <Eyebrow>{p.tech.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.tech.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400">{p.tech.note}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.tech.items.map((item, i) => {
              const c = TECH_COLORS[i % TECH_COLORS.length];
              return (
                <FadeIn key={item.name} delay={i * 60}>
                  <MagicCard
                    className="rounded-2xl"
                    gradientColor={c.gradientColor}
                    gradientFrom={c.gradientFrom}
                    gradientTo={c.gradientTo}
                    gradientSize={180}
                  >
                    <div className="flex items-start gap-3 p-5">
                      <span className={`mt-1.5 shrink-0 h-2 w-2 rounded-full ${c.dot}`} />
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-base font-bold text-white">{item.name}</span>
                        <span className="text-xs text-zinc-400">{item.desc}</span>
                      </div>
                    </div>
                  </MagicCard>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 6. Langsame Seiten kosten dich Kunden ────────── */}
      <section className="relative py-16 sm:py-24 dot-grid z-[1]">
        <Container>
          <div className="flex flex-col items-center gap-12 text-center">
            <FadeIn className="max-w-xl">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {p.performance.headline.split('\n').map((line, i) => (
                    <span key={i} className={`block ${i === 0 ? 'text-white' : 'text-rose-400'}`}>
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">{p.performance.note}</p>
              </div>
            </FadeIn>
            <WebDevMetrics points={p.performance.points} />
          </div>
        </Container>
      </section>

      {/* ── 7. Projekte ───────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 z-[1]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Meteors number={10} minDuration={10} maxDuration={22} />
        </div>
        <Container className="relative">
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

      {/* ── 8. CTA ────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 z-[1]">
        {/* Sparkle dots */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { top: '15%', left: '10%',  size: 2,   color: 'bg-emerald-400/40' },
            { top: '28%', left: '84%',  size: 1.5, color: 'bg-violet-400/40' },
            { top: '60%', left: '5%',   size: 1.5, color: 'bg-teal-400/40' },
            { top: '70%', left: '92%',  size: 2,   color: 'bg-emerald-400/40' },
            { top: '22%', left: '52%',  size: 1,   color: 'bg-amber-400/30' },
            { top: '80%', left: '40%',  size: 1.5, color: 'bg-teal-400/40' },
            { top: '45%', left: '72%',  size: 1,   color: 'bg-violet-400/30' },
          ].map((s, i) => (
            <span
              key={i}
              className={`absolute rounded-full ${s.color} animate-glow-pulse`}
              style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-xl flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {p.cta.headline}
                <AnimatedGradientText
                  colorFrom="#6ee7b7"
                  colorTo="#2dd4bf"
                  speed={0.5}
                  className="mt-1 block"
                >
                  {p.cta.headlineAccent}
                </AnimatedGradientText>
              </h2>
              <p className="text-base leading-relaxed text-zinc-300">{p.cta.body}</p>
              <Button
                href={`/${locale}/kontakt`}
                variant="primary"
                className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
              >
                {p.cta.button}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
