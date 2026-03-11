import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Commitment } from '@/components/sections/Commitment';
import { baseUrl } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/commitment`;
  return {
    title: t.commitment.eyebrow,
    description: t.commitment.subtext,
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
  };
}

export default async function CommitmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return (
    <>
      <div className="bg-zinc-950 pt-10 pb-2">
        <Container>
          <Button
            href={`/${locale}`}
            variant="ghost"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            {t.common.back}
          </Button>
        </Container>
      </div>
      <Commitment locale={locale as Locale} />
    </>
  );
}
