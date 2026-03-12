import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';

interface Props {
  locale: Locale;
}

export function Footer({ locale }: Props) {
  const t = getTranslations(locale);
  const waNumber = t.footer.whatsappNumber.replace(/\s+/g, '').replace('+', '');

  return (
    <footer className="relative border-t border-zinc-800/50 bg-zinc-950/40 backdrop-blur-md">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link
              href={`/${locale}`}
              className="text-base font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              Growline Group
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
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                <span className="text-xs text-emerald-500/60">E-Mail</span>
                {t.contact.email}
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
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
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
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
            <Link
              href={`/${locale}/ueber-uns`}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {t.footer.nav.about}
            </Link>
            <Link
              href={`/${locale}/commitment`}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {t.footer.nav.commitment}
            </Link>
            <Link
              href={`/${locale}/kontakt`}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {t.footer.nav.contact}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">{t.footer.copyright}</p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/impressum`}
              className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
            >
              {t.footer.nav.imprint}
            </Link>
            <Link
              href={`/${locale}/datenschutz`}
              className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
            >
              {t.footer.nav.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
