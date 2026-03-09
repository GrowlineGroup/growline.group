import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/ui/FadeIn';

interface Props {
  locale: Locale;
}

export function Commitment({ locale }: Props) {
  const t = getTranslations(locale);
  const c = t.commitment;

  return (
    <section
      id="commitment"
      className="relative overflow-hidden bg-zinc-950 py-24 dot-grid"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent"
      />

      <Container className="relative">
        <FadeIn>
          <div className="mb-14 flex flex-col items-center gap-4 text-center">
            <Badge variant="light">{c.eyebrow}</Badge>
            <h2 className="max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {c.headline.split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-emerald-400' : ''}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500">{c.subtext}</p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.points.map((point, i) => (
            <FadeIn key={point.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-emerald-500/25 hover:bg-zinc-900 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]">
                <div className="h-8 w-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-white">{point.title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-500">{point.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
