import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: t.imprint.headline,
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const imp = t.imprint;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pb-24 pt-16 dot-grid">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[100px]"
        />
        <Container className="relative">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {imp.headline}
            </h1>
          </FadeIn>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col gap-12">
              {imp.content.map((item) => (
                <section key={item.title}>
                  <h2 className="mb-3 text-lg font-semibold text-zinc-900">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-zinc-600">{item.body}</p>
                </section>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
