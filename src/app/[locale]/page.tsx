import { Locale } from '@/i18n/config';
import { Hero } from '@/components/sections/Hero';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { About } from '@/components/sections/About';
import { Commitment } from '@/components/sections/Commitment';
import { ComingSoon } from '@/components/sections/ComingSoon';
import { CTA } from '@/components/sections/CTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <>
      <Hero locale={typedLocale} />
      <ServiceSection locale={typedLocale} serviceIndex={0} />
      <ServiceSection locale={typedLocale} serviceIndex={1} />
      <ServiceSection locale={typedLocale} serviceIndex={2} />
      <ServiceSection locale={typedLocale} serviceIndex={3} />
      <About locale={typedLocale} />
      <Commitment locale={typedLocale} />
      <ComingSoon locale={typedLocale} />
      <CTA locale={typedLocale} />
    </>
  );
}
