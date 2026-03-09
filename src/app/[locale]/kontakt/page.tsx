import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { ContactForm } from '@/components/sections/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: t.contact.headline,
    description: t.contact.subtext,
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

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pb-20 pt-16 dot-grid">
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
            <div className="flex flex-col gap-6 max-w-2xl">
              <Badge variant="light">{c.eyebrow}</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {c.headline}
              </h1>
              <p className="text-base leading-relaxed text-zinc-400 max-w-xl">{c.subtext}</p>

              {/* Email + response time inline */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <a
                  href={`mailto:${c.email}`}
                  className="group inline-flex items-center gap-1.5 text-base font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {c.email}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <div className="flex items-center gap-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-sm text-zinc-500">{c.responseTime}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Form + Info ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            {/* Left: Form — wider */}
            <div className="lg:col-span-3">
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

            {/* Right: Trust info */}
            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                  {/* Direct contact */}
                  <div className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
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
                  </div>

                  {/* Availability */}
                  <div className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        {c.availabilityLabel}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600">{c.availabilityBody}</p>
                  </div>

                  {/* Response time */}
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm text-emerald-700">{c.responseTime}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
