import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/ui/FadeIn';

interface Props {
  locale: Locale;
}

export function About({ locale }: Props) {
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <section id="about" className="relative bg-white py-24 dark:bg-zinc-50">
      {/* Emerald top gradient line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left: text */}
          <FadeIn>
            <div className="flex flex-col gap-5">
              <Badge>{a.eyebrow}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {a.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-base leading-relaxed text-zinc-600">{a.subtext}</p>
              <p className="text-sm leading-relaxed text-zinc-500">{a.body}</p>
            </div>
          </FadeIn>

          {/* Right: value cards */}
          <div className="flex flex-col gap-4">
            {a.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 100}>
                <div className="group flex gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 transition-all duration-300 hover:border-emerald-100 hover:shadow-md">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-zinc-900">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500">{value.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
