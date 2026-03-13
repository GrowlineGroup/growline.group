'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

export function GmcContractModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-zinc-600 underline underline-offset-2 decoration-zinc-800 hover:text-zinc-400 hover:decoration-zinc-600 transition-colors"
      >
        Vertragsdetails
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
            onClick={() => setOpen(false)}
          >
          <div
            className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start gap-3 px-5 py-4 border-b border-zinc-800 shrink-0">
              <h3 className="flex-1 min-w-0 text-sm font-semibold text-zinc-200 leading-snug">Dienstleistungsvertrag – GMC-Freigabe und laufende Betreuung</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Schließen"
                className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-7 py-6 flex flex-col gap-4 text-sm leading-relaxed text-zinc-400">

              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Deutsche Fassung</p>

              {/* TOC */}
              <div className="flex flex-col gap-1 text-xs">
                {[
                  ['#parteien','1. Parteien'],
                  ['#einordnung','2. B2B-/B2C-Einordnung'],
                  ['#definitionen','3. Definitionen'],
                  ['#vertragsgegenstand','4. Vertragsgegenstand'],
                  ['#zugriffe','5. Zugriffe / Scope / Mitwirkung'],
                  ['#approved','6. Definition „Approved", Nachweis, Mitteilung, Startdatum'],
                  ['#vertragsschluss','7. Arbeitsbeginn / Vertragsschluss / Kommunikation'],
                  ['#leistungsfokus','8. Leistungsfokus / Nicht geschuldete Leistungen'],
                  ['#aenderungen','9. Änderungsregeln für den Store'],
                  ['#verguetung','10. Vergütung'],
                  ['#abrechnung','11. Abrechnung / Fälligkeit / Zahlung'],
                  ['#nichtzahlung','12. Nichtzahlung'],
                  ['#laufzeit','13. Laufzeit / Kündigung'],
                  ['#suspendierung','14. Suspendierung / Re-Approval / Erstattung'],
                  ['#vertraulichkeit','15. Vertraulichkeit / NDA'],
                  ['#datenschutz-v','16. Datenschutz'],
                  ['#haftung','17. Haftung'],
                  ['#schluss','18. Recht / Gerichtsstand / Schlussbestimmungen'],
                  ['#unterschriften','19. Unterschriften'],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="text-emerald-600 hover:text-emerald-500">{label}</a>
                ))}
              </div>

              {/* 1 */}
              <p id="parteien"><strong className="text-zinc-200">1. Parteien</strong></p>
              <p><strong className="text-zinc-300">ANBIETER</strong><br />Growline Group LTD<br />Solomou Solomou 5, Flat/Office 101<br />8036 Paphos, Cyprus<br />Register-Nr.: HE 476478<br />VAT-ID: CY60187688V<br />Vertreten durch: Martin Honecker (Director)<br />E-Mail: <a href="mailto:info@growline.group" className="text-emerald-600 hover:text-emerald-500">info@growline.group</a></p>
              <p><strong className="text-zinc-300">KUNDE</strong><br />[Name / Firma des Kunden]<br />[Rechtsform]<br />[Register-/Company-Nummer, falls vorhanden]<br />[Adresse]<br />Vertreten durch: [Name / Funktion]<br />E-Mail: [E-Mail des Kunden]</p>

              {/* 2 */}
              <p id="einordnung"><strong className="text-zinc-200">2. B2B-/B2C-Einordnung</strong></p>
              <p>Sofern der KUNDE als Unternehmer handelt, gilt dieser Vertrag als Unternehmergeschäft. Sofern der KUNDE als Verbraucher handelt, gelten zwingende Verbraucherschutzvorschriften vorrangig, soweit sie anwendbar sind.</p>
              <p>Allgemeine Geschäftsbedingungen des KUNDEN gelten nur, wenn der ANBIETER diesen ausdrücklich in Textform zustimmt.</p>

              {/* 3 */}
              <p id="definitionen"><strong className="text-zinc-200">3. Definitionen</strong></p>
              <p>„Store" bezeichnet ausschließlich die nachstehend bezeichnete Hauptdomain und die zugehörige myshopify-Domain des KUNDEN:</p>
              <p>Hauptdomain: [domain.tld]<br />myshopify-Domain: [store-name.myshopify.com]</p>
              <p>Andere Domains, Stores, Mirror-Domains, Länderstores, Subdomains, Marktplätze oder sonstige Shop-Oberflächen sind nicht Vertragsgegenstand, sofern sie nicht ausdrücklich in Textform nachträglich aufgenommen werden.</p>
              <p>„GMC" bezeichnet das Google Merchant Center Konto, das für den vorstehend definierten Store genutzt wird.<br />„Approved" bezeichnet den in Ziffer 6 definierten Status.<br />„Leistungsbeginn / Stichtag" bezeichnet das Approved-Datum gemäß Ziffer 6.4 und ist zugleich der Abrechnungsanker.</p>

              {/* 4 */}
              <p id="vertragsgegenstand"><strong className="text-zinc-200">4. Vertragsgegenstand</strong></p>
              <p>Der ANBIETER erbringt eine digitale Dienstleistung zur: (a) Entsperrung / Entsuspendierung / Herstellung eines verwendbaren GMC-Status für den oben definierten Store, und (b) anschließenden laufenden Wartung / Stabilisierung des GMC.</p>
              <p>Der ANBIETER schuldet eine Dienstleistung, keinen garantierten Erfolg. Entscheidungen, Prüfungen, Richtlinienauslegung, Plattformverhalten, Sperren oder Freigaben von Google liegen außerhalb des Einflussbereichs des ANBIETERS.</p>
              <p>Der ANBIETER kann ein Onboarding ablehnen oder abbrechen, wenn der Fall aus Sicht des ANBIETERS nicht realisierbar, zu risikoreich oder technisch blockiert ist. Wird der Fall vor Arbeitsbeginn abgelehnt, werden bereits erhaltene Zahlungen vollständig erstattet.</p>

              {/* 5 */}
              <p id="zugriffe"><strong className="text-zinc-200">5. Zugriffe / Scope / Mitwirkung</strong></p>
              <p><strong className="text-zinc-300">5.1 Mindestangaben des KUNDEN</strong><br />Der KUNDE stellt mindestens folgende Informationen bzw. Zugänge bereit: Hauptdomain, myshopify-Domain, Shopify Collaborator Code oder Einladung, erforderliche Freigaben, Ansprechpartner und Reaktionskanal, kundenseitige E-Mail für Mitteilungen.</p>
              <p><strong className="text-zinc-300">5.2 Beschränkung auf den definierten Store</strong><br />Die Leistung des ANBIETERS bezieht sich ausschließlich auf die in Ziffer 3 genannte Hauptdomain und myshopify-Domain.</p>
              <p><strong className="text-zinc-300">5.3 Mitwirkungspflicht</strong><br />Der KUNDE macht zutreffende Angaben, reagiert in angemessener Zeit und unterlässt widersprüchliche oder nicht abgestimmte Maßnahmen, die das GMC-Risiko erhöhen können.</p>

              {/* 6 */}
              <p id="approved"><strong className="text-zinc-200">6. Definition „Approved", Nachweis, Mitteilung, Startdatum</strong></p>
              <p><strong className="text-zinc-300">6.1</strong> „Approved" gilt als erreicht, wenn (a) eine Google-Mitteilung die Aufhebung der Suspendierung bestätigt, oder (b) das Merchant Center aus Sicht des ANBIETERS einen funktionsfähigen, produktiven Status zeigt.</p>
              <p><strong className="text-zinc-300">6.2</strong> Der ANBIETER informiert den KUNDEN in Textform (E-Mail oder WhatsApp), dass Approved erreicht wurde.</p>
              <p><strong className="text-zinc-300">6.3</strong> Der ANBIETER kann das Approved-Datum um bis zu 2 Kalendertage rückdatieren, sofern dies plausibel und nachvollziehbar ist.</p>
              <p><strong className="text-zinc-300">6.4</strong> Sobald Approved erreicht ist, beginnt der entgeltliche Leistungszeitraum automatisch sofort. Das Approved-Datum ist der Leistungsbeginn / Stichtag und zugleich der Abrechnungsanker.</p>
              <p><strong className="text-zinc-300">6.5</strong> Vorbereitende Tätigkeiten vor dem Approved-Datum sind im vereinbarten Modell enthalten und verkürzen den ersten bezahlten Monat nicht.</p>

              {/* 7 */}
              <p id="vertragsschluss"><strong className="text-zinc-200">7. Arbeitsbeginn / Vertragsschluss / Kommunikation</strong></p>
              <p><strong className="text-zinc-300">7.1</strong> Der Vertrag kommt durch Zustimmung beider Parteien in Textform zustande. E-Signatur, unterschriebenes PDF oder ausdrücklich bestätigende E-Mail / WhatsApp genügen.</p>
              <p><strong className="text-zinc-300">7.2</strong> Der ANBIETER darf vorbereitende Arbeiten bereits vor Approved aufnehmen, sobald (a) der Vertrag geschlossen ist und (b) die vereinbarte erste Zahlung eingegangen ist.</p>
              <p><strong className="text-zinc-300">7.3</strong> Der erste bezahlte Leistungsmonat beginnt erst automatisch mit Eintritt von Approved gemäß Ziffer 6.4.</p>
              <p><strong className="text-zinc-300">7.4</strong> Zulässige Mitteilungskanäle sind E-Mail und WhatsApp.</p>

              {/* 8 */}
              <p id="leistungsfokus"><strong className="text-zinc-200">8. Leistungsfokus / Nicht geschuldete Leistungen</strong></p>
              <p>Die Leistung fokussiert sich auf GMC-Freigabe, Stabilisierung und die dafür erforderlichen Maßnahmen.</p>
              <p>Nicht geschuldet sind insbesondere: allgemeine Marketingstrategie, CRO, Branding, Umsatzberatung, SEO, Social Media Betreuung, sonstige Leistungen außerhalb des definierten Stores.</p>
              <p>Konkrete Tools, Services, Prozesse und Workflows des ANBIETERS sind Geschäftsgeheimnisse und werden nicht offengelegt.</p>

              {/* 9 */}
              <p id="aenderungen"><strong className="text-zinc-200">9. Änderungsregeln für den Store</strong></p>
              <p><strong className="text-zinc-300">9.1</strong> Der KUNDE informiert den ANBIETER vor Änderungen an store-relevanten Bereichen (Theme, Policies, Produkte, Kollektionen, Apps, Navigation, Checkout, Feeds).</p>
              <p><strong className="text-zinc-300">9.2</strong> Ab dem Stichtag gilt für 14 Kalendertage eine strenge Schutzphase. In dieser Zeit sind ohne vorherige Zustimmung des ANBIETERS keine Live-, Draft- oder Teiländerungen zulässig.</p>
              <p><strong className="text-zinc-300">9.3</strong> Nimmt der KUNDE unkoordinierte Änderungen vor, kann der ANBIETER die Leistung pausieren, einen Rückbau verlangen oder Erstattungsansprüche ausschließen.</p>

              {/* 10 */}
              <p id="verguetung"><strong className="text-zinc-200">10. Vergütung</strong></p>
              <p>Aktiver Service: EUR [Betrag] netto pro Monat pro Store/GMC, im Voraus zahlbar.<br />Optional einmalige Setup-/Onboarding-Fee: EUR [Betrag] netto.<br />Alle Preise verstehen sich netto zzgl. etwaig gesetzlich anfallender Umsatzsteuer / VAT. Reverse Charge kann bei B2B anwendbar sein.</p>

              {/* 11 */}
              <p id="abrechnung"><strong className="text-zinc-200">11. Abrechnung / Fälligkeit / Zahlung</strong></p>
              <p><strong className="text-zinc-300">11.1</strong> Jeder Abrechnungsmonat läuft vom Stichtag bis zum Tag vor dem nächsten monatlichen Jahrestag. Fällt der Stichtag auf den 29., 30. oder 31., endet der Zyklus am letzten Kalendertag des Folgemonats.</p>
              <p><strong className="text-zinc-300">11.2</strong> Die monatliche Vergütung ist im Voraus fällig.</p>
              <p><strong className="text-zinc-300">11.3</strong> Zahlung per Überweisung oder über den vom ANBIETER angebotenen Zahlungsweg.</p>

              {/* 12 */}
              <p id="nichtzahlung"><strong className="text-zinc-200">12. Nichtzahlung</strong></p>
              <p>Bei Zahlungsverzug kann der ANBIETER nach Mahnung: Leistungen pausieren, Zugriffe einschränken, Arbeiten zurückstellen, den Vertrag außerordentlich kündigen und/oder das GMC für den betroffenen Store beenden.</p>

              {/* 13 */}
              <p id="laufzeit"><strong className="text-zinc-200">13. Laufzeit / Kündigung</strong></p>
              <p><strong className="text-zinc-300">13.1</strong> Der Vertrag läuft ab dem Stichtag monatlich und verlängert sich jeweils um einen weiteren Monat, sofern er nicht in Textform gekündigt wird.</p>
              <p><strong className="text-zinc-300">13.2</strong> Beide Parteien können den Vertrag jederzeit in Textform kündigen. Die Kündigung wirkt zum Ende des bereits bezahlten Leistungszeitraums.</p>
              <p><strong className="text-zinc-300">13.3</strong> Bei ordentlicher Kündigung erfolgt keine anteilige Erstattung für einen bereits begonnenen oder bezahlten Abrechnungszeitraum.</p>

              {/* 14 */}
              <p id="suspendierung"><strong className="text-zinc-200">14. Suspendierung / Re-Approval / Erstattung</strong></p>
              <p><strong className="text-zinc-300">14.1 Erster bezahlter Zyklus</strong><br />Wenn innerhalb des ersten bezahlten Zyklus Approved nicht erreicht wird oder eine erneute Suspendierung eintritt:</p>
              <p>Option 1: Teil-Erstattung in Höhe von EUR [Betrag] netto; ein Restbetrag verbleibt als Aufwandentschädigung.<br />Option 2: Weiterarbeit an der Re-Approval ohne zusätzliche Gebühr bis zu einem angemessenen Zeitpunkt, bei pausierter oder angepasster Abrechnung.</p>
              <p><strong className="text-zinc-300">14.2 Ab Zyklus 2</strong><br />Approved &lt; 7 Tage im laufenden Zyklus: 75 % Erstattung<br />Approved 7–13 Tage: 50 % Erstattung<br />Approved 14–20 Tage: 25 % Erstattung<br />Approved 21+ Tage: keine Erstattung</p>
              <p><strong className="text-zinc-300">14.3</strong> Erstattungen können ausgeschlossen sein, wenn die Suspendierung wesentlich durch Pflichtverletzungen des KUNDEN verursacht wurde.</p>

              {/* 15 */}
              <p id="vertraulichkeit"><strong className="text-zinc-200">15. Vertraulichkeit / NDA</strong></p>
              <p>Der KUNDE behandelt alle nicht öffentlichen Informationen des ANBIETERS streng vertraulich. Dies umfasst Methoden, Tools, Prozesse, interne Workflows, Know-how, Kontostrukturen und sonstige Geschäftsgeheimnisse. Die Vertraulichkeitsverpflichtung gilt zeitlich unbefristet.</p>

              {/* 16 */}
              <p id="datenschutz-v"><strong className="text-zinc-200">16. Datenschutz</strong></p>
              <p>Der ANBIETER verarbeitet personenbezogene Daten nur, soweit dies zur Durchführung dieses Vertrags erforderlich ist. Sofern eine Vereinbarung zur Auftragsverarbeitung (AVV / DPA) erforderlich ist, kann der ANBIETER eine Vorlage auf Anfrage bereitstellen.</p>

              {/* 17 */}
              <p id="haftung"><strong className="text-zinc-200">17. Haftung</strong></p>
              <p>Unbeschränkte Haftung gilt bei Vorsatz, grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.</p>
              <p>Im Übrigen ist die Haftung des ANBIETERS, soweit gesetzlich zulässig, ausgeschlossen. Soweit ein Haftungsausschluss rechtlich nicht möglich ist, ist die Haftung auf die zuletzt für den betroffenen Store/GMC gezahlte Monatsgebühr begrenzt.</p>
              <p>Keine Haftung besteht für Entscheidungen von Google, Policy-Änderungen, Plattformausfälle, Kontoereignisse oder externe Umstände, die nicht vom ANBIETER zu vertreten sind.</p>

              {/* 18 */}
              <p id="schluss"><strong className="text-zinc-200">18. Recht / Gerichtsstand / Schlussbestimmungen</strong></p>
              <p>Es gilt das Recht der Republik Zypern, soweit zwingendes Recht nicht entgegensteht. Gerichtsstand ist, soweit rechtlich zulässig, Paphos, Cyprus.</p>
              <p>Änderungen und Ergänzungen dieses Vertrags bedürfen mindestens der Textform.</p>
              <p>Sollte eine Bestimmung dieses Vertrags unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>

              {/* 19 */}
              <p id="unterschriften"><strong className="text-zinc-200">19. Unterschriften</strong></p>
              <p>Ort / Datum: ______________________</p>
              <p><strong className="text-zinc-300">ANBIETER:</strong><br />________________________________<br />Martin Honecker<br />für Growline Group LTD</p>
              <p><strong className="text-zinc-300">KUNDE:</strong><br />________________________________<br />[Name]<br />für [Kundenname / Firma]</p>

            </div>
          </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
