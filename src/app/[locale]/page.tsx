import { Locale } from '@/i18n/config';
import { StickySlideShow } from '@/components/sections/premium/StickySlideShow';
import { PremiumHero } from '@/components/sections/premium/PremiumHero';
import { PremiumStatement } from '@/components/sections/premium/PremiumStatement';
import { PremiumServices } from '@/components/sections/premium/PremiumServices';
import { PremiumMetrics } from '@/components/sections/premium/PremiumMetrics';
import { PremiumProcess } from '@/components/sections/premium/PremiumProcess';
import { PremiumCommitment } from '@/components/sections/premium/PremiumCommitment';
import { PremiumCTA } from '@/components/sections/premium/PremiumCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <div className="bg-[#080808]">
      <StickySlideShow>
        <PremiumHero locale={typedLocale} />
        <PremiumStatement />
        <PremiumServices locale={typedLocale} />
        <PremiumMetrics />
        <PremiumProcess />
        <PremiumCommitment />
        <PremiumCTA locale={typedLocale} />
      </StickySlideShow>
    </div>
  );
}
