import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { GlowCard } from '@/components/ui/GlowCard';
import { SparklesCore } from '@/components/ui/SparklesCore';
import { ContactForm } from '@/components/sections/ContactForm';
import { baseUrl } from '@/lib/config';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/kontakt`;
  return {
    title: t.contact.headline,
    description: t.contact.subtext,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de/kontakt`,
        en: `${baseUrl}/en/kontakt`,
        'x-default': `${baseUrl}/de/kontakt`,
      },
    },
    openGraph: {
      url: canonicalUrl,
      title: t.contact.headline,
      description: t.contact.subtext,
      siteName: 'Growline Group',
    },
    twitter: {
      card: 'summary',
      title: t.contact.headline,
      description: t.contact.subtext,
    },
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const c = t.contact;

  const kontaktBreadcrumbLd = breadcrumbSchema([
    { name: t.nav.home, url: `https://growline.group/${locale}` },
    { name: t.nav.contact, url: `https://growline.group/${locale}/kontakt` },
  ]);

  return (
    <div className="relative bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(kontaktBreadcrumbLd) }} />
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pb-24 pt-16 dot-grid z-[1]">
        {/* Ambient radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[100px]"
        />
        {/* Subtle sparkle canvas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        </div>

        <Container className="relative z-10 flex flex-col gap-8">
          <Button
            href={`/${locale}`}
            variant="ghost"
            className="self-start text-sm text-zinc-500 hover:text-zinc-300"
          >
            {t.common.back}
          </Button>

          <FadeIn delay={100}>
            <div className="flex flex-col gap-6 max-w-2xl">
              {/* Minimal eyebrow — no badge/pill */}
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-emerald-400/60" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400/70">
                  {c.eyebrow}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {c.headline}
              </h1>
              <p className="text-base leading-relaxed text-zinc-400 max-w-xl">{c.subtext}</p>

              {/* Email — subtle, in hero */}
              <a
                href={`mailto:${c.email}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400/80 transition-colors hover:text-emerald-300"
              >
                {c.email}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Form + Info ───────────────────────────────────── */}
      <section className="bg-white pt-12 pb-20 z-[1] relative">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-5 lg:gap-16">

            {/* ── Info cards — first in DOM = first on mobile
                On desktop: explicit placement cols 4–5, row 1 */}
            <div className="lg:col-start-4 lg:col-span-2 lg:row-start-1">
              <FadeIn delay={150}>
                <div className="flex flex-col gap-4 lg:sticky lg:top-28">

                  {/* Direct contact */}
                  <GlowCard className="flex flex-col gap-3 rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.05),0_4px_20px_rgba(0,0,0,0.04)]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      {c.alternativeHeadline}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="group inline-flex items-center gap-1.5 text-base font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
                    >
                      {c.email}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  </GlowCard>

                  {/* WhatsApp */}
                  <GlowCard className="flex flex-col gap-3 rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.05),0_4px_20px_rgba(0,0,0,0.04)]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/35794550142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-base font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
                    >
                      {t.footer.whatsappNumber}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  </GlowCard>

                  {/* Availability */}
                  <GlowCard className="flex flex-col gap-3 rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.05),0_4px_20px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-glow-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        {c.availabilityLabel}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600">{c.availabilityBody}</p>
                  </GlowCard>

                  {/* Response time */}
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm text-emerald-700">{c.responseTime}</span>
                  </div>

                </div>
              </FadeIn>
            </div>

            {/* ── Form — second in DOM = second on mobile
                On desktop: explicit placement cols 1–3, row 1 */}
            <div className="lg:col-start-1 lg:col-span-3 lg:row-start-1">
              <FadeIn delay={100}>
                <ContactForm
                  form={c.form}
                  contactEmail={c.email}
                  responseTime={c.responseTime}
                  alternativeHeadline={c.alternativeHeadline}
                  availabilityLabel={c.availabilityLabel}
                  availabilityBody={c.availabilityBody}
                />
              </FadeIn>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
