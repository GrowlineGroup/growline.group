import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Props {
  locale: Locale;
}

export function ComingSoon({ locale }: Props) {
  const t = getTranslations(locale);

  return (
    <div className="border-y border-zinc-800/60 bg-zinc-950/80 py-4">
      <Container className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Badge variant="light">{t.comingSoon.badge}</Badge>
          <p className="text-sm text-zinc-500">{t.comingSoon.headline}</p>
        </div>
        <Button
          href={`/${locale}/kontakt`}
          variant="ghost"
          className="text-xs text-zinc-600 hover:text-zinc-400"
        >
          {t.comingSoon.notify} →
        </Button>
      </Container>
    </div>
  );
}
