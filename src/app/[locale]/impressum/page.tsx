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
  const canonicalUrl = `${baseUrl}/${locale}/impressum`;
  return {
    title: t.imprint.headline,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {imp.headline}
            </h1>
          </FadeIn>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section id="impressum" className="bg-zinc-100 py-24 z-[1] relative">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col gap-8 text-sm leading-relaxed text-zinc-600">
              <p><strong className="text-zinc-900">Angaben gemäß § 5 DDG</strong></p>

              <p>
                <strong className="text-zinc-900">GROWLINE GROUP LTD</strong><br />
                Solomou Solomou 5<br />
                Flat/Office 101<br />
                8036 Paphos<br />
                Cyprus
              </p>

              <p>
                <strong className="text-zinc-900">Vertreten durch:</strong><br />
                Martin Honecker, Director
              </p>

              <p>
                <strong className="text-zinc-900">Kontakt:</strong><br />
                Telefon: <a href="tel:+35797491691" className="text-emerald-600 hover:text-emerald-500">+357 97 491691</a><br />
                E-Mail: <a href="mailto:info@growline.group" className="text-emerald-600 hover:text-emerald-500">info@growline.group</a>
              </p>

              <p>
                <strong className="text-zinc-900">Registereintrag:</strong><br />
                Eingetragen im Register des Department of Registrar of Companies and Intellectual Property, Cyprus<br />
                Registernummer: HE 476478
              </p>

              <p>
                <strong className="text-zinc-900">Umsatzsteuer / VAT:</strong><br />
                VAT-/TIN-Nummer: 60187688V
              </p>

              <p>
                <strong className="text-zinc-900">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
                Martin Honecker<br />
                Solomou Solomou 5<br />
                Flat/Office 101<br />
                8036 Paphos<br />
                Cyprus
              </p>

              <p>
                <strong className="text-zinc-900">Hinweis zur Verbraucherstreitbeilegung:</strong><br />
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
