import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { baseUrl } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${baseUrl}/${locale}/agb/css-entry`;
  return {
    title: locale === 'de' ? 'AGB – CSS Entry | Growline Group' : 'Terms & Conditions – CSS Entry | Growline Group',
    description: locale === 'de'
      ? 'Allgemeine Geschäftsbedingungen für den CSS-Entry-Dienst der Growline Group.'
      : 'Terms and Conditions for the CSS Entry service of Growline Group.',
    alternates: { canonical: canonicalUrl },
    openGraph: { url: canonicalUrl },
  };
}

export default async function CssEntryAgbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const de = locale === 'de';

  const sections = de ? [
    {
      title: '§ 1 Geltungsbereich',
      body: [
        'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Growline Group (nachfolgend „Anbieter") und dem Kunden (nachfolgend „Auftraggeber") über den CSS-Entry-Dienst.',
        'Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.',
      ],
    },
    {
      title: '§ 2 Leistungsgegenstand',
      body: [
        'Der Anbieter vermittelt dem Auftraggeber den Zugang zu Google Shopping über das CSS-Netzwerk des Anbieters (Comparison Shopping Service). Hierdurch können auf Klickpreisbasis strukturelle Kostenvorteile gegenüber dem Google Standard-Shopping-Kanal erzielt werden.',
        'Der tatsächliche Kostenvorteil von ca. 20 % auf den CPC (Cost-per-Click) ergibt sich aus der Google-Regulierung für zertifizierte CSS-Partner und wird vom Anbieter nicht garantiert, da er von Googles Systemparametern abhängt.',
        'Je nach gebuchtem Paket umfasst die Leistung: Standard-Zugang (bis zu 2 Länder), Admin-Zugang oder mehrere CSS-Entries inklusive Google Premium Support.',
      ],
    },
    {
      title: '§ 3 Vertragsschluss und Laufzeit',
      body: [
        'Der Vertrag kommt durch Bestellung über die Website sowie schriftliche Auftragsbestätigung (E-Mail) seitens des Anbieters zustande.',
        'Der Vertrag beginnt mit dem vereinbarten Go-Live-Datum. Er läuft auf unbestimmte Zeit, sofern kein Jahrespaket vereinbart wurde.',
        'Bei Jahrespaketen beträgt die Mindestlaufzeit 12 Monate.',
      ],
    },
    {
      title: '§ 4 Kündigung',
      body: [
        'Bei monatlicher Abrechnung beträgt die Kündigungsfrist 1 (ein) Monat zum Monatsende. Kündigt der Auftraggeber z. B. am 1. Mai, endet der Vertrag zum 30. Juni.',
        'Die Abrechnung erfolgt jeweils zum 1. eines Kalendermonats für den laufenden Monat.',
        'Die Kündigung bedarf der Textform (E-Mail an info@growline.group).',
        'Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.',
      ],
    },
    {
      title: '§ 5 Vergütung und Zahlung',
      body: [
        'Die Vergütung richtet sich nach dem zum Zeitpunkt der Bestellung gültigen Preisblatt. Alle Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer.',
        'Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug fällig.',
        'Bei Zahlungsverzug behält sich der Anbieter das Recht vor, die Leistung zu unterbrechen, bis der ausstehende Betrag ausgeglichen ist.',
      ],
    },
    {
      title: '§ 6 Mitwirkungspflichten des Auftraggebers',
      body: [
        'Der Auftraggeber stellt dem Anbieter alle für die Einrichtung notwendigen Zugangsdaten und Informationen (Google Ads-Konto, Merchant Center, Produkt-Feed-URL) rechtzeitig zur Verfügung.',
        'Der Auftraggeber ist verantwortlich dafür, dass seine Produkte und Kampagnen den Google Shopping-Richtlinien entsprechen.',
      ],
    },
    {
      title: '§ 7 Haftung',
      body: [
        'Der Anbieter haftet unbeschränkt für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.',
        'Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vorhersehbaren, vertragstypischen Schaden.',
        'Eine Haftung für entgangene CPC-Ersparnisse, Kampagnenperformance oder Änderungen an Googles Richtlinien und Systemen ist ausgeschlossen, da diese außerhalb des Einflussbereichs des Anbieters liegen.',
      ],
    },
    {
      title: '§ 8 Datenschutz',
      body: [
        'Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung des Anbieters, die unter growline.group/de/datenschutz abrufbar ist.',
      ],
    },
    {
      title: '§ 9 Schlussbestimmungen',
      body: [
        'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.',
        'Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz des Anbieters.',
        'Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
      ],
    },
  ] : [
    {
      title: '§ 1 Scope',
      body: [
        'These General Terms and Conditions ("Terms") govern all contracts between Growline Group ("Provider") and the customer ("Client") for the CSS Entry service.',
        'Conflicting terms of the Client are not accepted unless the Provider expressly agrees to them in writing.',
      ],
    },
    {
      title: '§ 2 Scope of Service',
      body: [
        'The Provider grants the Client access to Google Shopping via the Provider\'s CSS network (Comparison Shopping Service). This enables structural cost advantages over the Google standard Shopping channel on a cost-per-click basis.',
        'The typical cost advantage of approx. 20 % on CPC results from Google\'s regulation for certified CSS partners and is not guaranteed by the Provider, as it depends on Google\'s system parameters.',
        'Depending on the booked package, the service includes: Standard access (up to 2 countries), Admin access, or multiple CSS entries including Google Premium Support.',
      ],
    },
    {
      title: '§ 3 Contract Conclusion and Term',
      body: [
        'The contract is concluded upon ordering via the website and written order confirmation (email) by the Provider.',
        'The contract begins on the agreed go-live date. It runs for an indefinite period unless an annual package was agreed.',
        'Annual packages have a minimum term of 12 months.',
      ],
    },
    {
      title: '§ 4 Termination',
      body: [
        'For monthly billing, the notice period is 1 (one) month to the end of the month. If the Client terminates e.g. on May 1st, the contract ends on June 30th.',
        'Billing occurs on the 1st of each calendar month for the current month.',
        'Termination must be in text form (email to info@growline.group).',
        'The right to extraordinary termination for good cause remains unaffected.',
      ],
    },
    {
      title: '§ 5 Fees and Payment',
      body: [
        'Fees are based on the price list valid at the time of ordering. All prices are net plus applicable VAT.',
        'Invoices are due within 14 days of the invoice date without deduction.',
        'In the event of payment default, the Provider reserves the right to suspend the service until the outstanding amount is settled.',
      ],
    },
    {
      title: '§ 6 Client Obligations',
      body: [
        'The Client provides all access data and information required for setup (Google Ads account, Merchant Center, product feed URL) in a timely manner.',
        'The Client is responsible for ensuring that their products and campaigns comply with Google Shopping policies.',
      ],
    },
    {
      title: '§ 7 Liability',
      body: [
        'The Provider is fully liable for damages resulting from intent or gross negligence.',
        'For slight negligence, the Provider is only liable for breaches of essential contractual obligations (cardinal obligations), limited to foreseeable, typical contractual damage.',
        'Liability for lost CPC savings, campaign performance, or changes to Google\'s policies and systems is excluded, as these are outside the Provider\'s control.',
      ],
    },
    {
      title: '§ 8 Data Protection',
      body: [
        'Personal data is processed in accordance with the Provider\'s privacy policy, available at growline.group/en/datenschutz.',
      ],
    },
    {
      title: '§ 9 Final Provisions',
      body: [
        'German law applies, excluding the UN Convention on Contracts for the International Sale of Goods.',
        'The place of jurisdiction for all disputes arising from or in connection with this contract is, to the extent permitted by law, the Provider\'s registered office.',
        'Should individual provisions of these Terms be invalid, the validity of the remaining provisions remains unaffected.',
      ],
    },
  ];

  return (
    <section className="bg-white py-24 min-h-screen">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Button
            href={`/${locale}/services/css-entry`}
            variant="ghost"
            className="mb-10 self-start text-sm text-zinc-500 hover:text-zinc-700"
          >
            {t.common.back.replace('Startseite', 'CSS Entry').replace('Homepage', 'CSS Entry')}
          </Button>

          <div className="flex flex-col gap-3 mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {de ? 'Rechtliches' : 'Legal'}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
              {de ? 'AGB' : 'Terms & Conditions'}
            </h1>
            <p className="text-base text-zinc-500">
              {de ? 'CSS Entry – Growline Group' : 'CSS Entry – Growline Group'}
            </p>
            <p className="text-sm text-zinc-400 mt-1">
              {de ? `Stand: ${new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}` : `As of: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-zinc-900">{section.title}</h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-zinc-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-zinc-200 pt-8">
            <p className="text-sm text-zinc-400">
              {de
                ? 'Bei Fragen zu diesen AGB wenden Sie sich an: '
                : 'For questions regarding these Terms, contact: '}
              <a
                href="mailto:info@growline.group"
                className="text-zinc-600 underline underline-offset-2 hover:text-zinc-900"
              >
                info@growline.group
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
