import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
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
  const bgClass = 'bg-zinc-950';

  return (
    <section id={service.key} className={`relative overflow-hidden ${bgClass} py-24 dot-grid`}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute ${reversed ? 'left-1/4' : 'right-1/4'} top-1/2 h-72 w-72 -translate-y-1/2 rounded-full ${reversed ? 'bg-emerald-600/[0.09]' : 'bg-emerald-600/[0.06]'} blur-3xl`}
      />
      {/* Divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
      />

      <Container className="relative">
        <div
          className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          {/* Text */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <Eyebrow>{service.tileLabel}</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight sm:text-4xl">
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
                  className="group border-zinc-600 text-white transition-all duration-200 hover:border-emerald-500/40 hover:text-emerald-400"
                >
                  {service.ctaLabel}
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Visual — differentiated per service */}
          <FadeIn delay={100} direction="up">
            <div className="relative flex min-h-[200px] sm:min-h-[280px] items-center justify-center">

              {/* Shared: main card always centered */}
              <div className="gradient-border relative z-10 flex h-36 w-36 items-center justify-center rounded-3xl bg-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.5)]">
                <span className="font-mono text-3xl font-bold tracking-tighter text-emerald-400">
                  {service.abbr}
                </span>
              </div>

              {/* ── CSS (0): orbit CW + ring breath + accent drift ── */}
              {serviceIndex === 0 && (<>
                <div aria-hidden className="absolute h-72 w-72 rounded-full border border-emerald-500/[0.06]" />
                <div aria-hidden className="absolute h-72 w-72 animate-svc-orbit">
                  <div className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-emerald-400/50" />
                </div>
                <div aria-hidden className="absolute h-52 w-52 rounded-full border border-emerald-500/[0.1] animate-svc-ring-breath" />
                <div aria-hidden className="absolute h-36 w-36 rounded-full bg-emerald-600/10 blur-2xl animate-glow-pulse" />
                <div aria-hidden className="absolute -right-2 top-1/4 h-10 w-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-sm animate-svc-drift-rotate" style={{ animationDelay: '0.5s' }} />
                <div aria-hidden className="absolute -left-3 bottom-1/4 h-7 w-7 rounded-lg border border-zinc-700/50 bg-zinc-800/50 animate-svc-drift-rotate" style={{ animationDelay: '4s', animationDuration: '15s' }} />
                <div aria-hidden className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-emerald-400/50 animate-svc-float" style={{ animationDelay: '0.8s' }} />
                <div aria-hidden className="absolute left-1/3 top-8 h-2 w-2 rounded-full bg-teal-400/40 animate-svc-float" style={{ animationDelay: '2.5s' }} />
              </>)}

              {/* ── GMC (1): only breathe/pulse — calm, tense, no orbit ── */}
              {serviceIndex === 1 && (<>
                <div aria-hidden className="absolute h-72 w-72 rounded-full border border-emerald-500/[0.06] animate-svc-ring-breath" style={{ animationDuration: '11s', animationDelay: '2s' }} />
                <div aria-hidden className="absolute h-52 w-52 rounded-full border border-emerald-500/[0.1] animate-svc-ring-breath" style={{ animationDuration: '9s' }} />
                <div aria-hidden className="absolute h-36 w-36 rounded-full bg-emerald-600/10 blur-2xl animate-glow-pulse" style={{ animationDuration: '5s' }} />
                <div aria-hidden className="absolute -right-2 top-1/4 h-10 w-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-sm animate-svc-drift-rotate" style={{ animationDuration: '16s', animationDelay: '2s' }} />
                <div aria-hidden className="absolute -left-3 bottom-1/4 h-7 w-7 rounded-lg border border-zinc-700/50 bg-zinc-800/50 animate-svc-drift-rotate" style={{ animationDuration: '19s', animationDelay: '6s' }} />
                <div aria-hidden className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-emerald-400/50 animate-svc-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
                <div aria-hidden className="absolute left-1/3 top-8 h-2 w-2 rounded-full bg-teal-400/40 animate-svc-float" style={{ animationDuration: '9s', animationDelay: '3s' }} />
              </>)}

              {/* ── GEO (2): two crossing orbits + cross-directional drift ── */}
              {serviceIndex === 2 && (<>
                <div aria-hidden className="absolute h-72 w-72 rounded-full border border-emerald-500/[0.06]" />
                <div aria-hidden className="absolute h-72 w-72 animate-svc-orbit" style={{ animationDuration: '12s' }}>
                  <div className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-emerald-400/60" />
                </div>
                <div aria-hidden className="absolute h-52 w-52 animate-svc-orbit-reverse" style={{ animationDuration: '16s' }}>
                  <div className="absolute -top-[3px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-teal-400/40" />
                </div>
                <div aria-hidden className="absolute h-52 w-52 rounded-full border border-emerald-500/[0.1] animate-svc-ring-breath" style={{ animationDuration: '5s' }} />
                <div aria-hidden className="absolute h-36 w-36 rounded-full bg-emerald-600/10 blur-2xl animate-glow-pulse" />
                <div aria-hidden className="absolute -right-2 top-1/4 h-10 w-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-sm animate-svc-drift-rotate" style={{ animationDelay: '0.2s', animationDuration: '10s' }} />
                <div aria-hidden className="absolute -left-3 bottom-1/4 h-7 w-7 rounded-lg border border-zinc-700/50 bg-zinc-800/50 animate-svc-drift-rotate" style={{ animationDelay: '2.5s', animationDuration: '13s' }} />
                <div aria-hidden className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-emerald-400/50 animate-svc-float" style={{ animationDuration: '3.5s', animationDelay: '0.4s' }} />
                <div aria-hidden className="absolute left-1/3 top-8 h-2 w-2 rounded-full bg-teal-400/40 animate-svc-drift" style={{ animationDelay: '2s' }} />
                <div aria-hidden className="absolute left-1/4 bottom-1/3 h-2 w-2 rounded-full bg-emerald-300/30 animate-svc-drift-alt" style={{ animationDelay: '3s' }} />
              </>)}

              {/* ── Web Dev (3): orbit CCW — clearly reversed vs CSS ── */}
              {serviceIndex === 3 && (<>
                <div aria-hidden className="absolute h-72 w-72 rounded-full border border-emerald-500/[0.06]" />
                <div aria-hidden className="absolute h-72 w-72 animate-svc-orbit-reverse">
                  <div className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-emerald-400/50" />
                </div>
                <div aria-hidden className="absolute h-52 w-52 rounded-full border border-emerald-500/[0.1] animate-svc-ring-breath" />
                <div aria-hidden className="absolute h-36 w-36 rounded-full bg-emerald-600/10 blur-2xl animate-glow-pulse" />
                <div aria-hidden className="absolute -right-2 top-1/4 h-10 w-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-sm animate-svc-drift-rotate" style={{ animationDelay: '2s', animationDuration: '14s' }} />
                <div aria-hidden className="absolute -left-3 bottom-1/4 h-7 w-7 rounded-lg border border-zinc-700/50 bg-zinc-800/50 animate-svc-drift-rotate" style={{ animationDelay: '5.5s', animationDuration: '11s' }} />
                <div aria-hidden className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-emerald-400/50 animate-svc-float" style={{ animationDelay: '0.8s' }} />
                <div aria-hidden className="absolute left-1/3 top-8 h-2 w-2 rounded-full bg-teal-400/40 animate-svc-float" style={{ animationDelay: '2.5s' }} />
              </>)}

            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
