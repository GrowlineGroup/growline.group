import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface Props {
  locale: Locale;
}

export function CTA({ locale }: Props) {
  const t = getTranslations(locale);

  return (
    <section id="contact" className="relative py-24 z-[1]">
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t.cta.headline}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-zinc-400">{t.cta.body}</p>
        <Button
          href={`/${locale}/kontakt`}
          variant="primary"
          className="mt-2 bg-emerald-600 text-white hover:bg-emerald-500"
        >
          {t.cta.button}
        </Button>
      </Container>
    </section>
  );
}
