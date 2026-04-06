'use client';

import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/ui/marquee';
import { Meteors } from '@/components/ui/meteors';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';

const MARQUEE_ITEMS = [
  'Google Shopping',
  'CSS Entry',
  'Merchant Center',
  'GEO',
  'KI-Sichtbarkeit',
  'Web Development',
  'Performance',
  'Conversion',
  'ChatGPT-Sichtbarkeit',
  'Google Ads',
  'Perplexity',
  'Webseiten',
];

interface Props {
  locale: Locale;
}

export function Footer({ locale }: Props) {
  const t = getTranslations(locale);
  const waNumber = t.footer.whatsappNumber.replace(/\s+/g, '').replace('+', '');

  return (
    <footer className="relative bg-[#050505] overflow-hidden">

      {/* ── Meteors ─────────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Meteors number={8} minDuration={14} maxDuration={26} angle={220} className="bg-emerald-400/40 shadow-[0_0_0_1px_#6ee7b715]" />
      </div>

      {/* ── Ambient glow ────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[280px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-700/10 blur-[140px]" />
      </div>

      {/* ── Top border ───────────────────────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* ── Marquee band ─────────────────────────────────────────────────── */}
      <div className="relative border-b border-zinc-800/40 py-4">
        <Marquee className="[--duration:30s] [--gap:2.5rem]" pauseOnHover>
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-zinc-600 uppercase">
              <span className="h-1 w-1 rounded-full bg-emerald-500/50 flex-shrink-0" />
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <Container className="relative py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand + Contact */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href={`/${locale}`} className="w-fit">
              <AnimatedGradientText
                colorFrom="#34d399"
                colorTo="#6ee7b7"
                speed={0.6}
                className="text-base font-semibold"
              >
                Growline Group
              </AnimatedGradientText>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              {t.footer.tagline}
            </p>

            {/* Direct contact */}
            <div className="mt-1 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {t.footer.contactLabel}
              </p>
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <span className="text-xs text-emerald-500/60">E-Mail</span>
                {t.contact.email}
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <span className="text-xs text-emerald-500/60">WhatsApp</span>
                {t.footer.whatsappNumber}
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {t.footer.nav.services}
            </p>
            {t.nav.servicesDropdown.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Company + Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {t.footer.nav.company}
            </p>
            <Link href={`/${locale}/ueber-uns`} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
              {t.footer.nav.about}
            </Link>
            <Link href={`/${locale}/commitment`} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
              {t.footer.nav.commitment}
            </Link>
            <Link href={`/${locale}/kontakt`} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
              {t.footer.nav.contact}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-800/40 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-700">{t.footer.copyright}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/impressum`} className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors duration-200">
              {t.footer.nav.imprint}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors duration-200">
              {t.footer.nav.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
