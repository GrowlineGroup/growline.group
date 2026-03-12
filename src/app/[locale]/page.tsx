import { Locale } from '@/i18n/config';
import { Hero } from '@/components/sections/Hero';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { CTA } from '@/components/sections/CTA';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>
      <div className="z-[1] relative">
        <Hero locale={typedLocale} />
      </div>
      <div className="z-[1] relative">
        <ServiceSection locale={typedLocale} serviceIndex={0} />
      </div>
      <div className="z-[1] relative">
        <ServiceSection locale={typedLocale} serviceIndex={1} />
      </div>
      <div className="z-[1] relative">
        <ServiceSection locale={typedLocale} serviceIndex={2} />
      </div>
      <div className="z-[1] relative">
        <ServiceSection locale={typedLocale} serviceIndex={3} />
      </div>
      <div className="z-[1] relative">
        <CTA locale={typedLocale} />
      </div>
    </div>
  );
}
