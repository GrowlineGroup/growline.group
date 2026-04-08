import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { baseUrl } from '@/lib/config';
import { PageStarCanvas } from '@/components/ui/PageStarCanvas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const canonicalUrl = `${baseUrl}/${locale}/datenschutz`;
  return {
    title: t.privacy.headline,
    description: locale === 'de'
      ? 'Datenschutzerklärung der Growline Group LTD – Informationen zur Verarbeitung personenbezogener Daten.'
      : 'Privacy policy of Growline Group LTD – Information on the processing of personal data.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}/de/datenschutz`,
        en: `${baseUrl}/en/datenschutz`,
        'x-default': `${baseUrl}/de/datenschutz`,
      },
    },
    openGraph: { url: canonicalUrl, siteName: 'Growline Group' },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const priv = t.privacy;

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-0">
        <PageStarCanvas />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pb-24 pt-16 dot-grid z-[1]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[100px]"
        />
        <Container className="relative">
          <FadeIn>
            <div className="flex flex-col gap-5 max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {priv.headline}
              </h1>
              <p className="text-base leading-relaxed text-zinc-400">{priv.intro}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section id="datenschutz" className="bg-zinc-100 py-24 z-[1] relative">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl flex flex-col gap-6 text-sm leading-relaxed text-zinc-600">

              <p><strong className="text-zinc-900">Datenschutzerklärung</strong></p>

              {/* Inhaltsverzeichnis */}
              <div className="flex flex-col gap-1">
                <a href="#verantwortlicher" className="text-emerald-600 hover:text-emerald-500">1. Verantwortlicher</a>
                <a href="#geltungsbereich" className="text-emerald-600 hover:text-emerald-500">2. Geltungsbereich</a>
                <a href="#allgemeine-informationen" className="text-emerald-600 hover:text-emerald-500">3. Allgemeine Informationen zur Datenverarbeitung</a>
                <a href="#hosting-logfiles" className="text-emerald-600 hover:text-emerald-500">4. Website / Hosting / Server-Logfiles</a>
                <a href="#kontakt" className="text-emerald-600 hover:text-emerald-500">5. Kontaktaufnahme</a>
                <a href="#whatsapp" className="text-emerald-600 hover:text-emerald-500">6. Kommunikation über WhatsApp</a>
                <a href="#meetings" className="text-emerald-600 hover:text-emerald-500">7. Videokonferenzen und Online-Meetings</a>
                <a href="#aufzeichnungen" className="text-emerald-600 hover:text-emerald-500">8. Aufzeichnungen und Transkriptionen</a>
                <a href="#vertraege" className="text-emerald-600 hover:text-emerald-500">9. Vertragsanbahnung, Kundenverwaltung und Leistungserbringung</a>
                <a href="#kundenkonten" className="text-emerald-600 hover:text-emerald-500">10. Zugriff auf Kundenkonten, Shops und Plattformen</a>
                <a href="#fernzugriff" className="text-emerald-600 hover:text-emerald-500">11. Fernzugriff / Remote-Support</a>
                <a href="#zahlungen" className="text-emerald-600 hover:text-emerald-500">12. Zahlungsabwicklung</a>
                <a href="#email-marketing" className="text-emerald-600 hover:text-emerald-500">13. E-Mail-Marketing und Bestandskundenkommunikation</a>
                <a href="#ki-tools" className="text-emerald-600 hover:text-emerald-500">14. KI- und Produktivitätstools</a>
                <a href="#bewerber" className="text-emerald-600 hover:text-emerald-500">15. Bewerbungen, Beschäftigte, Freelancer und Subunternehmer</a>
                <a href="#empfaenger" className="text-emerald-600 hover:text-emerald-500">16. Empfänger und Kategorien von Empfängern</a>
                <a href="#datenquellen" className="text-emerald-600 hover:text-emerald-500">17. Datenquellen</a>
                <a href="#drittland" className="text-emerald-600 hover:text-emerald-500">18. Drittlandübermittlungen</a>
                <a href="#cookies" className="text-emerald-600 hover:text-emerald-500">19. Cookies, ähnliche Technologien und Consent-Management</a>
                <a href="#speicherdauer" className="text-emerald-600 hover:text-emerald-500">20. Speicherdauer</a>
                <a href="#bereitstellung" className="text-emerald-600 hover:text-emerald-500">21. Pflicht zur Bereitstellung von Daten</a>
                <a href="#profiling" className="text-emerald-600 hover:text-emerald-500">22. Automatisierte Entscheidungen / Profiling</a>
                <a href="#rechte" className="text-emerald-600 hover:text-emerald-500">23. Rechte betroffener Personen</a>
                <a href="#beschwerde" className="text-emerald-600 hover:text-emerald-500">24. Beschwerderecht bei einer Aufsichtsbehörde</a>
                <a href="#sicherheit" className="text-emerald-600 hover:text-emerald-500">25. Datensicherheit</a>
                <a href="#social" className="text-emerald-600 hover:text-emerald-500">26. Keine Unternehmensprofile in sozialen Netzwerken</a>
                <a href="#aenderungen" className="text-emerald-600 hover:text-emerald-500">27. Änderungen dieser Datenschutzerklärung</a>
              </div>

              {/* 1 */}
              <p id="verantwortlicher"><strong className="text-zinc-900">1. Verantwortlicher</strong></p>
              <p>Growline Group LTD<br />Solomou Solomou 5, Flat/Office 101<br />8036 Paphos<br />Cyprus<br />E-Mail: <a href="mailto:info@growline.group" className="text-emerald-600 hover:text-emerald-500">info@growline.group</a><br />Telefon: <a href="tel:+35797491691" className="text-emerald-600 hover:text-emerald-500">+357 97 491691</a></p>
              <p>Einen gesonderten Datenschutzbeauftragten haben wir derzeit nicht benannt.</p>

              {/* 2 */}
              <p id="geltungsbereich"><strong className="text-zinc-900">2. Geltungsbereich</strong></p>
              <p>Diese Datenschutzerklärung gilt für unsere Website <strong>growline.group</strong> sowie für die damit verbundenen Geschäfts-, Kommunikations- und Serviceprozesse gegenüber Interessenten, Kunden, Ansprechpartnern von Unternehmen, Privatkunden, Bewerbern, Beschäftigten, Freelancern, Subunternehmern und sonstigen Kontaktpersonen.</p>
              <p>Unsere Leistungen richten sich sowohl an Geschäftskunden als auch an Privatkunden.</p>

              {/* 3 */}
              <p id="allgemeine-informationen"><strong className="text-zinc-900">3. Allgemeine Informationen zur Datenverarbeitung</strong></p>
              <p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website, zur Bearbeitung von Anfragen, zur Vertragsanbahnung, zur Leistungserbringung, zur Kommunikation, zur Abrechnung, zur Sicherheit oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.</p>
              <p>Zu den verarbeiteten Daten können insbesondere gehören: Stamm- und Kontaktdaten, Unternehmensdaten, Vertragsdaten, Kommunikationsdaten, Inhaltsdaten, Zahlungsdaten, Supportdaten, technische Nutzungsdaten, Geräte- und Metadaten, Zugriffs- und Berechtigungsdaten sowie projektbezogene Daten aus Kundensystemen.</p>

              {/* 4 */}
              <p id="hosting-logfiles"><strong className="text-zinc-900">4. Website / Hosting / Server-Logfiles</strong></p>
              <p>Beim Aufruf unserer Website werden technisch erforderliche Daten verarbeitet, um die Website bereitzustellen, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch zu verhindern. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners und aufgerufene Inhalte gehören.</p>
              <p>Die Verarbeitung erfolgt zur sicheren und funktionsfähigen Bereitstellung der Website sowie zur IT-Sicherheit und Fehleranalyse.</p>
              <p>Für Hosting- und Infrastrukturleistungen nutzen wir externe technische Dienstleister, insbesondere IONOS.</p>

              {/* 5 */}
              <p id="kontakt"><strong className="text-zinc-900">5. Kontaktaufnahme</strong></p>
              <p>Wenn Sie uns per E-Mail, Telefon oder über ein Kontaktformular kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten sowie die zur Bearbeitung Ihrer Anfrage erforderlichen Begleitdaten. Dazu können insbesondere Name, Firma, E-Mail-Adresse, Telefonnummer, Anfrageinhalt, Zeitpunkt der Anfrage und Kommunikationshistorie gehören.</p>
              <p>Das auf unserer Website eingesetzte Kontaktformular wird aktuell direkt durch uns betrieben. Ein gesonderter externer Formular-Dienstleister wird hierfür derzeit nicht eingesetzt. Unberührt davon bleiben technische Verarbeitungen durch den Hosting-Anbieter.</p>
              <p>Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage, zur Kommunikation mit Ihnen sowie zur Anbahnung oder Durchführung eines Vertragsverhältnisses.</p>

              {/* 6 */}
              <p id="whatsapp"><strong className="text-zinc-900">6. Kommunikation über WhatsApp</strong></p>
              <p>Wir bieten geschäftliche Kommunikation auch über WhatsApp Business an. Wenn Sie diesen Kommunikationsweg nutzen oder uns über WhatsApp kontaktieren, verarbeiten wir die dabei übermittelten Kontakt-, Kommunikations- und Inhaltsdaten.</p>
              <p>Bitte beachten Sie, dass bei der Nutzung von Messenger-Diensten Daten auch durch den jeweiligen Anbieter verarbeitet werden können. Wir empfehlen, über Messenger keine besonders sensiblen Informationen zu übermitteln, sofern dies nicht zwingend erforderlich ist.</p>
              <p>Die Verarbeitung erfolgt zur schnellen Bearbeitung von Anfragen, zur Kundenbetreuung, Projektkommunikation und Vertragsdurchführung.</p>

              {/* 7 */}
              <p id="meetings"><strong className="text-zinc-900">7. Videokonferenzen und Online-Meetings</strong></p>
              <p>Für Besprechungen, Beratungen, Support-Calls und Abstimmungen nutzen wir insbesondere Google Meet. Dabei können Bild-, Ton-, Chat-, Verbindungs-, Geräte-, Teilnehmer- und Metadaten verarbeitet werden.</p>
              <p>Die Verarbeitung erfolgt zur Durchführung von Beratungen, Supportleistungen, Vertragsanbahnung, Projektabwicklung und interner Abstimmung.</p>

              {/* 8 */}
              <p id="aufzeichnungen"><strong className="text-zinc-900">8. Aufzeichnungen und Transkriptionen</strong></p>
              <p>Gespräche, Meetings oder Support-Sitzungen werden nicht in jedem Fall aufgezeichnet oder transkribiert. Eine Aufzeichnung oder Transkription kann jedoch im Einzelfall stattfinden, etwa zu Dokumentations-, Qualitäts-, Nachweis-, Schulungs-, Fehleranalyse- oder Nachbereitungszwecken.</p>
              <p>Soweit eine Aufzeichnung oder Transkription erfolgt, geschieht dies nur nach vorheriger transparenter Information und – soweit erforderlich – auf Grundlage einer Einwilligung oder einer sonst zulässigen Rechtsgrundlage.</p>

              {/* 9 */}
              <p id="vertraege"><strong className="text-zinc-900">9. Vertragsanbahnung, Kundenverwaltung und Leistungserbringung</strong></p>
              <p>Wir verarbeiten personenbezogene Daten zur Anbahnung, Begründung, Durchführung, Dokumentation und Abwicklung unserer Verträge und Dienstleistungen. Dazu gehören insbesondere Agenturleistungen, Media Buying, Kundensupport, Dispute Management, E-Mail-Marketing, Beratung, technische Betreuung sowie Fernunterstützung und Remote-Support für Privatkunden.</p>
              <p>Dabei verarbeiten wir insbesondere Kontakt- und Stammdaten, Unternehmensdaten, Leistungsdaten, Vertragsdaten, Kommunikationsdaten, Abrechnungsdaten, Zahlungsdaten, Zugriffsdaten, Ticket- und Supportdaten sowie – je nach Leistung – Daten aus den vom Kunden bereitgestellten Systemen oder Unterlagen.</p>

              {/* 10 */}
              <p id="kundenkonten"><strong className="text-zinc-900">10. Zugriff auf Kundenkonten, Shops und Plattformen</strong></p>
              <p>Im Rahmen unserer Agenturleistungen erhalten wir – je nach Auftrag – Zugriff auf Systeme und Konten unserer Kunden, insbesondere auf Shop-Systeme, Google Merchant Center, Werbekonten, Analyse- und Tracking-Tools, Search-Console-Daten, E-Mail-Marketing-Systeme, CRM-Systeme, Supportumgebungen oder vergleichbare Plattformen.</p>
              <p>Dabei können wir auch personenbezogene Daten verarbeiten, die Kunden, Mitarbeiter, Ansprechpartner oder Endkunden unserer Auftraggeber betreffen. Welche Daten konkret betroffen sind, hängt vom jeweiligen Projekt, der Plattform und den Freigaben des Kunden ab.</p>
              <p>Soweit wir personenbezogene Daten ausschließlich im Auftrag und nach Weisung unserer Geschäftskunden verarbeiten, handeln wir regelmäßig als Auftragsverarbeiter. Soweit wir Daten für eigene Zwecke verarbeiten, insbesondere für Kommunikation, Vertragsverwaltung, Rechnungsstellung, Sicherheitsmaßnahmen, Dokumentation oder Rechtsverteidigung, handeln wir als eigenständiger Verantwortlicher.</p>

              {/* 11 */}
              <p id="fernzugriff"><strong className="text-zinc-900">11. Fernzugriff / Remote-Support</strong></p>
              <p>Sofern wir Support- oder Beratungsleistungen per Fernzugriff erbringen, können im Rahmen der Sitzung Inhalte sichtbar oder zugänglich werden, die sich auf dem Endgerät, im Konto oder in der Umgebung des betroffenen Nutzers befinden. Dazu können etwa Dateien, Einstellungen, Anwendungsinhalte, technische Fehlermeldungen, Nutzungsdaten oder Kommunikationsinhalte gehören.</p>
              <p>Der Fernsupport erfolgt aktuell im Wesentlichen über eigene Prozesse bzw. eigene organisatorische Abläufe. Soweit hierfür im Einzelfall zusätzliche technische Hilfsmittel eingesetzt werden, beschränken wir die Verarbeitung auf das für die Leistungserbringung erforderliche Maß.</p>
              <p>Wir verarbeiten solche Daten ausschließlich, soweit dies zur Erbringung der angeforderten Unterstützung, Fehleranalyse, Problemlösung, Dokumentation oder Nachbereitung erforderlich ist.</p>

              {/* 12 */}
              <p id="zahlungen"><strong className="text-zinc-900">12. Zahlungsabwicklung</strong></p>
              <p>Zur Abwicklung von Zahlungen, Rückerstattungen, Buchhaltung, Forderungsmanagement, Steuer- und Compliance-Prozessen verarbeiten wir die hierfür erforderlichen Daten. Dazu gehören insbesondere Name, Rechnungsdaten, Zahlungsbetrag, Währung, Transaktionsdaten, Steuerinformationen, Vertragsbezug und erforderliche Nachweise.</p>
              <p>Für Zahlungsabwicklungen können externe Zahlungsdienstleister, insbesondere Mollie, sowie Banken und sonstige an der Zahlung beteiligte Stellen eingebunden werden.</p>

              {/* 13 */}
              <p id="email-marketing"><strong className="text-zinc-900">13. E-Mail-Marketing und Bestandskundenkommunikation</strong></p>
              <p>Soweit wir E-Mail-Marketing, Angebotsnachfassungen, Informationen zu Leistungen oder vergleichbare Kommunikation versenden, verarbeiten wir die hierfür erforderlichen Kontakt-, Kommunikations- und Interaktionsdaten.</p>
              <p>Der Versand erfolgt – je nach Fall – im Rahmen bestehender Kundenbeziehungen, zur Vertragsanbahnung oder auf sonst zulässiger Grundlage.</p>
              <p>Für geschäftliche E-Mail-Kommunikation nutzen wir insbesondere Zoho und Google Workspace.</p>

              {/* 14 */}
              <p id="ki-tools"><strong className="text-zinc-900">14. KI- und Produktivitätstools</strong></p>
              <p>Soweit projektbezogen oder intern erforderlich, können wir eigene Tools, eigene Abläufe sowie unterstützende digitale Produktivitäts- oder KI-Dienste einsetzen, etwa zur Strukturierung von Informationen, Texterstellung, Analyse, Protokollierung, Qualitätssicherung, Übersetzung oder internen Unterstützung.</p>
              <p>Soweit dabei externe Anbieter eingebunden werden, beschränken wir die übermittelten Daten auf das erforderliche Maß.</p>

              {/* 15 */}
              <p id="bewerber"><strong className="text-zinc-900">15. Bewerbungen, Beschäftigte, Freelancer und Subunternehmer</strong></p>
              <p>Wir verarbeiten personenbezogene Daten von Bewerbern, Beschäftigten, Freelancern, Subunternehmern und sonstigen projektbezogen eingebundenen Personen, soweit dies für die Auswahl, Begründung, Durchführung und Beendigung des jeweiligen Vertrags- oder Beschäftigungsverhältnisses erforderlich ist.</p>
              <p>Dazu können insbesondere Bewerbungsunterlagen, Lebenslaufdaten, Kontaktdaten, Qualifikationsdaten, Kommunikationsdaten, Vertragsdaten, Einsatz- und Leistungsdaten, Zahlungsdaten, Nachweise, Identifikationsdaten und sicherheitsrelevante Informationen gehören.</p>
              <p>Soweit Freelancer oder Subunternehmer in Projekte eingebunden werden, erfolgt dies nur im erforderlichen Rahmen und unter Vertraulichkeits- bzw. Datenschutzverpflichtungen.</p>

              {/* 16 */}
              <p id="empfaenger"><strong className="text-zinc-900">16. Empfänger und Kategorien von Empfängern</strong></p>
              <p>Personenbezogene Daten können – soweit erforderlich – an folgende Kategorien von Empfängern übermittelt werden:</p>
              <p>Hosting- und Infrastrukturprovider, IT- und Kommunikationsdienstleister, E-Mail- und Office-Anbieter, Zahlungsdienstleister, Banken, Video-Meeting- und Messenger-Anbieter, technische Supportpartner, Freelancer, Subunternehmer, Steuerberater, Rechtsberater, Behörden, Gerichte sowie sonstige Stellen, soweit dies für die jeweiligen Zwecke erforderlich ist.</p>
              <p>Zu den von uns eingesetzten oder projektbezogen eingesetzten Dienstleistern können insbesondere IONOS, Zoho, Google Workspace, Google Meet, WhatsApp Business und Mollie gehören.</p>

              {/* 17 */}
              <p id="datenquellen"><strong className="text-zinc-900">17. Datenquellen</strong></p>
              <p>Wir erhalten personenbezogene Daten grundsätzlich direkt von der betroffenen Person. Soweit dies für unsere Leistungen erforderlich ist, können Daten auch von unseren Kunden, deren Mitarbeitern oder Ansprechpartnern, von Zahlungsdienstleistern, Plattformbetreibern, Geschäftspartnern oder aus öffentlich zugänglichen Quellen stammen.</p>

              {/* 18 */}
              <p id="drittland"><strong className="text-zinc-900">18. Drittlandübermittlungen</strong></p>
              <p>Im Zusammenhang mit dem Einsatz externer Dienstleister kann es zu Übermittlungen personenbezogener Daten in Staaten außerhalb des Europäischen Wirtschaftsraums kommen. Solche Übermittlungen erfolgen nur im gesetzlich zulässigen Rahmen.</p>
              <p>Soweit erforderlich, stützen wir Übermittlungen auf geeignete Garantien, etwa Standardvertragsklauseln, ergänzende Schutzmaßnahmen oder andere zulässige Übermittlungsmechanismen.</p>

              {/* 19 */}
              <p id="cookies"><strong className="text-zinc-900">19. Cookies, ähnliche Technologien und Consent-Management</strong></p>
              <p>Unsere Website kann technisch notwendige Cookies oder vergleichbare Technologien verwenden, soweit diese für den sicheren und funktionalen Betrieb der Website erforderlich sind.</p>
              <p>Nach unserem derzeitigen Stand setzen wir auf <strong>growline.group</strong> aktuell keine einwilligungspflichtigen Analyse-, Marketing- oder Remarketing-Tools produktiv ein.</p>
              <p>Sollten wir künftig optionale Dienste aktivieren, insbesondere Analyse-, Tracking- oder Marketingtechnologien, werden wir diese Datenschutzerklärung entsprechend anpassen und – soweit erforderlich – vor deren Einsatz eine Einwilligung über ein Consent-Tool einholen.</p>

              {/* 20 */}
              <p id="speicherdauer"><strong className="text-zinc-900">20. Speicherdauer</strong></p>
              <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>
              <p>Maßgebliche Kriterien sind insbesondere die Dauer der Vertragsbeziehung oder Vertragsanbahnung, laufende Kommunikation, Support- und Projektzwecke, gesetzliche Aufbewahrungspflichten, Verjährungsfristen sowie die Durchsetzung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
              <p>Soweit eine sofortige Löschung gesetzlich oder tatsächlich nicht möglich ist, wird die Verarbeitung auf das erforderliche Maß beschränkt.</p>

              {/* 21 */}
              <p id="bereitstellung"><strong className="text-zinc-900">21. Pflicht zur Bereitstellung von Daten</strong></p>
              <p>Die Bereitstellung personenbezogener Daten ist grundsätzlich freiwillig. Ohne bestimmte Daten können wir Anfragen, Verträge, Zahlungen, Supportleistungen, Fernzugriffe oder Kommunikationsvorgänge unter Umständen nicht oder nicht vollständig bearbeiten.</p>

              {/* 22 */}
              <p id="profiling"><strong className="text-zinc-900">22. Automatisierte Entscheidungen / Profiling</strong></p>
              <p>Eine ausschließlich automatisierte Entscheidungsfindung mit rechtlicher oder vergleichbar erheblicher Wirkung findet durch uns grundsätzlich nicht statt.</p>
              <p>Soweit automatisierte Funktionen in Einzelfällen eingesetzt werden, dienen diese in der Regel der technischen Abwicklung, Priorisierung, Betrugsprävention, Qualitätssicherung oder internen Unterstützung.</p>

              {/* 23 */}
              <p id="rechte"><strong className="text-zinc-900">23. Rechte betroffener Personen</strong></p>
              <p>Betroffene Personen haben im Rahmen der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.</p>
              <p>Soweit eine Verarbeitung auf einer Einwilligung beruht, kann die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen werden.</p>
              <p>Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an: <a href="mailto:info@growline.group" className="text-emerald-600 hover:text-emerald-500">info@growline.group</a></p>

              {/* 24 */}
              <p id="beschwerde"><strong className="text-zinc-900">24. Beschwerderecht bei einer Aufsichtsbehörde</strong></p>
              <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Ortes des mutmaßlichen Verstoßes.</p>

              {/* 25 */}
              <p id="sicherheit"><strong className="text-zinc-900">25. Datensicherheit</strong></p>
              <p>Wir treffen angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten vor Verlust, Zerstörung, unbefugtem Zugriff, unbefugter Veränderung oder unbefugter Offenlegung zu schützen.</p>
              <p>Dazu gehören insbesondere Zugriffsbegrenzungen, Vertraulichkeitsverpflichtungen, rollenbasierte Berechtigungen sowie organisatorische und technische Sicherheitsmaßnahmen.</p>

              {/* 26 */}
              <p id="social"><strong className="text-zinc-900">26. Keine Unternehmensprofile in sozialen Netzwerken</strong></p>
              <p>Nach unserem derzeitigen Stand betreiben wir keine offiziellen Unternehmensprofile in sozialen Netzwerken, die Gegenstand dieser Datenschutzerklärung sind.</p>

              {/* 27 */}
              <p id="aenderungen"><strong className="text-zinc-900">27. Änderungen dieser Datenschutzerklärung</strong></p>
              <p>Wir behalten uns vor, diese Datenschutzerklärung mit Wirkung für die Zukunft anzupassen, insbesondere bei Änderungen unserer Website, unserer Dienstleistungen, eingesetzten Tools, Datenverarbeitungen oder der rechtlichen Rahmenbedingungen.</p>
              <p>Stand: 13.03.2026</p>

            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
