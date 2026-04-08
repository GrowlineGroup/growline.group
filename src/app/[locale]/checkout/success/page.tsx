import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const CSS_LABELS: Record<string, string> = {
  beginner: 'Beginner', pro: 'Pro', bundle: 'Bundle',
};

const GMC_LABELS: Record<string, Record<string, string>> = {
  de: { starter: 'Starter', professional: 'Professional' },
  en: { starter: 'Starter', professional: 'Professional' },
};

const GEO_LABELS: Record<string, Record<string, string>> = {
  de: { starter: 'Einstieg', growth: 'Wachstum' },
  en: { starter: 'Starter', growth: 'Growth' },
};

const PERIOD_LABELS: Record<string, Record<string, string>> = {
  de: { monthly: 'Monatlich', annual: 'Jährlich' },
  en: { monthly: 'Monthly', annual: 'Annual' },
};

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string; period?: string; service?: string; package?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = getTranslations(locale as Locale);
  const isDE = locale === 'de';

  const isGmc = sp.service === 'gmc';
  const isGeo = sp.service === 'geo';
  const label = isGmc
    ? GMC_LABELS[locale]?.[sp.package ?? ''] ?? sp.package ?? ''
    : isGeo
    ? GEO_LABELS[locale]?.[sp.package ?? ''] ?? sp.package ?? ''
    : CSS_LABELS[sp.plan ?? ''] ?? sp.plan ?? '';
  const periodLabel = PERIOD_LABELS[locale]?.[sp.period ?? ''] ?? '';

  return (
    <div className="relative bg-transparent min-h-[60vh] flex items-center">
      <Container className="py-24">
        <div className="mx-auto max-w-lg text-center flex flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {isDE ? 'Zahlung erfolgreich!' : 'Payment successful!'}
          </h1>

          {label && (
            <p className="text-base text-zinc-400">
              {isGmc
                ? (isDE
                    ? `Dein GMC Entsperrung ${label}-Paket ist bestätigt.`
                    : `Your GMC Reinstatement ${label} package is confirmed.`)
                : isGeo
                ? (isDE
                    ? `Dein GEO ${label}-Paket ist bestätigt.`
                    : `Your GEO ${label} package is confirmed.`)
                : (isDE
                    ? `Dein CSS Entry ${label}-Plan${periodLabel ? ` (${periodLabel})` : ''} ist bestätigt.`
                    : `Your CSS Entry ${label} plan${periodLabel ? ` (${periodLabel})` : ''} is confirmed.`)}
            </p>
          )}

          <p className="text-sm text-zinc-500">
            {isDE
              ? 'Wir melden uns innerhalb von 12 Stunden bei dir und legen direkt los.'
              : 'We will get back to you within 12 hours and get started right away.'}
          </p>

          <Button href={`/${locale}`} variant="primary" className="mt-4">
            {t.common.back}
          </Button>
        </div>
      </Container>
    </div>
  );
}
