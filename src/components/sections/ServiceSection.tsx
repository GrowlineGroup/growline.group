import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';

interface Props {
  locale: Locale;
  serviceIndex: number;
}

export function ServiceSection({ locale, serviceIndex }: Props) {
  const t = getTranslations(locale);
  const service = t.services.items[serviceIndex];
  const reversed = serviceIndex % 2 !== 0;
  const bgClass = serviceIndex % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900';

  return (
    <section id={service.key} className={`relative overflow-hidden ${bgClass} py-24 dot-grid`}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute ${reversed ? 'left-1/4' : 'right-1/4'} top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-600/[0.06] blur-3xl`}
      />
      {/* Divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
      />

      <Container className="relative">
        <div
          className={`grid items-center gap-16 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          {/* Text */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <Badge variant="light">{service.tileLabel}</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="block text-white">{service.headline}</span>
                <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  {service.headlineAccent}
                </span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-zinc-400">{service.subtext}</p>
              <ul className="flex flex-col gap-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Button
                  href={`/${locale}/${service.href}`}
                  variant="secondary"
                  className="group border-zinc-700 text-zinc-300 transition-all duration-200 hover:border-emerald-500/40 hover:text-emerald-400"
                >
                  {service.ctaLabel}
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Visual */}
          <FadeIn delay={100} direction="up">
            <div className="relative flex min-h-[280px] items-center justify-center">
              {/* Rings */}
              <div aria-hidden className="absolute h-72 w-72 rounded-full border border-emerald-500/[0.06]" />
              <div aria-hidden className="absolute h-52 w-52 rounded-full border border-emerald-500/[0.1]" />
              {/* Glow */}
              <div aria-hidden className="absolute h-36 w-36 rounded-full bg-emerald-600/10 blur-2xl" />
              {/* Main card */}
              <div className="gradient-border relative z-10 flex h-36 w-36 items-center justify-center rounded-3xl bg-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.5)]">
                <span className="font-mono text-3xl font-bold tracking-tighter text-emerald-400">
                  {service.abbr}
                </span>
              </div>
              {/* Floating accents */}
              <div aria-hidden className="absolute -right-2 top-1/4 h-10 w-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-sm" />
              <div aria-hidden className="absolute -left-3 bottom-1/4 h-7 w-7 rounded-lg border border-zinc-700/50 bg-zinc-800/50" />
              <div aria-hidden className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-emerald-400/50" />
              <div aria-hidden className="absolute left-1/3 top-8 h-2 w-2 rounded-full bg-teal-400/40" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
