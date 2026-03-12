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
    <section id="contact" className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
      />
      {/* Wide soft glow — base layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.08] blur-[120px]"
      />
      {/* Tighter focused glow — adds depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[400px] -translate-x-1/2 -translate-y-[55%] rounded-full bg-teal-500/[0.06] blur-[60px]"
      />
      {/* Bottom fade — softer transition into footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent"
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          {t.cta.headline}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-zinc-400">{t.cta.body}</p>
        <Button
          href={`/${locale}/kontakt`}
          variant="primary"
          className="mt-2 bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.2)]"
        >
          {t.cta.button}
        </Button>
      </Container>
    </section>
  );
}
