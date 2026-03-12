import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { baseUrl } from '@/lib/config';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/datenschutz`;
  return {
    title: t.privacy.headline,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const priv = t.privacy;

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pb-24 pt-16 dot-grid z-[1]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[100px]"
        />
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col gap-5 max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {priv.headline}
              </h1>
              <p className="text-base leading-relaxed text-zinc-400">{priv.intro}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="bg-white py-24 z-[1] relative">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col gap-12">
              {priv.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 text-lg font-semibold text-zinc-900">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-zinc-600">{section.body}</p>
                </section>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
