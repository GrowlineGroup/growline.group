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
    <section id="contact" className="relative overflow-hidden bg-white py-28 dark:bg-zinc-50">
      {/* Emerald gradient top line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"
      />
      {/* Subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          {t.cta.headline}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-zinc-500">{t.cta.body}</p>
        <Button
          href={`/${locale}/kontakt`}
          variant="primary"
          className="mt-2 bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500"
        >
          {t.cta.button}
        </Button>
      </Container>
    </section>
  );
}
