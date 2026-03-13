'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

export function GmcAgbModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-zinc-600 underline underline-offset-2 decoration-zinc-800 hover:text-zinc-400 hover:decoration-zinc-600 transition-colors"
      >
        AGB
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
                <h3 className="flex-1 min-w-0 text-sm font-semibold text-zinc-200 leading-snug">Allgemeine Geschäftsbedingungen – GMC-Paket</h3>
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

                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Stand: 13.03.2026</p>

                {/* TOC */}
                <div className="flex flex-col gap-1 text-xs">
                  {[
                    ['#geltung','1. Geltungsbereich'],
                    ['#anbieter','2. Anbieter'],
                    ['#leistungen','3. Leistungen des GMC-Pakets'],
                    ['#vertragsschluss','4. Vertragsschluss'],
                    ['#mitwirkung','5. Mitwirkungspflichten des Kunden'],
                    ['#scope','6. Beschränkung auf Hauptdomain und myshopify-Domain'],
                    ['#approved','7. Definition „Approved" / Leistungsbeginn'],
                    ['#preise','8. Preise / Fälligkeit / Zahlung'],
                    ['#laufzeit','9. Laufzeit / Verlängerung / Kündigung'],
                    ['#nichtzahlung','10. Folgen von Nichtzahlung'],
                    ['#aenderungen','11. Änderungsregeln / Schutzphase'],
                    ['#google','12. Fremdplattformen / kein Erfolgsgarantieversprechen'],
                    ['#refund','13. Suspendierung / Re-Approval / Erstattungen'],
                    ['#vertraulichkeit','14. Vertraulichkeit'],
                    ['#datenschutz-agb','15. Datenschutz'],
                    ['#haftung','16. Haftung'],
                    ['#verbraucher','17. Verbraucherhinweise / Widerruf'],
                    ['#recht','18. Rechtswahl / Gerichtsstand'],
                    ['#schluss','19. Schlussbestimmungen'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="text-emerald-600 hover:text-emerald-500">{label}</a>
                  ))}
                </div>

                {/* 1 */}
                <p id="geltung"><strong className="text-zinc-200">1. Geltungsbereich</strong></p>
                <p>Diese Allgemeinen Geschäftsbedingungen gelten für das von Growline Group LTD angebotene GMC-Paket sowie für damit zusammenhängende Leistungen im Zusammenhang mit Google Merchant Center, Store-Prüfung, Store-Anpassungen, Freigabe-/Stabilisierungsmaßnahmen und laufender Betreuung.</p>
                <p>Diese AGB gelten gegenüber Unternehmern und – soweit rechtlich zulässig und im Einzelfall angeboten – auch gegenüber Verbrauchern. Zwingende gesetzliche Schutzvorschriften für Verbraucher bleiben unberührt.</p>
                <p>Individuelle Angebote, Bestellformulare, Service Agreements, Auftragsbestätigungen oder sonstige Individualvereinbarungen gehen diesen AGB im Kollisionsfall vor.</p>

                {/* 2 */}
                <p id="anbieter"><strong className="text-zinc-200">2. Anbieter</strong></p>
                <p>Growline Group LTD<br />Solomou Solomou 5, Flat/Office 101<br />8036 Paphos<br />Cyprus<br />Register-Nr.: HE 476478<br />VAT-ID: CY60187688V<br />E-Mail: <a href="mailto:info@growline.group" className="text-emerald-600 hover:text-emerald-500">info@growline.group</a><br />Telefon: <a href="tel:+35797491691" className="text-emerald-600 hover:text-emerald-500">+357 97 491691</a></p>

                {/* 3 */}
                <p id="leistungen"><strong className="text-zinc-200">3. Leistungen des GMC-Pakets</strong></p>
                <p>Das GMC-Paket ist eine digitale Dienstleistung zur:</p>
                <p>(a) Prüfung, Vorbereitung, Entsperrung oder Entsuspendierung eines Google Merchant Center Kontos oder eines damit verbundenen Shops,<br />(b) Herstellung eines aus Sicht des Anbieters verwendbaren GMC-Status,<br />(c) laufenden Betreuung, Stabilisierung und risikominimierenden Wartung des GMC-Setups.</p>
                <p>Geschuldet ist eine Dienstleistung, kein garantierter Erfolg. Nicht geschuldet sind, sofern nicht ausdrücklich anders vereinbart, insbesondere allgemeine Marketingstrategie, CRO, Branding, Umsatzsteigerung, SEO, Social-Media-Leistungen oder sonstige Leistungen außerhalb des konkret gebuchten GMC-Pakets.</p>

                {/* 4 */}
                <p id="vertragsschluss"><strong className="text-zinc-200">4. Vertragsschluss</strong></p>
                <p>Ein Vertrag kommt durch Annahme eines individuellen Angebots, durch Abschluss eines Bestellformulars, durch schriftliche oder in Textform bestätigte Beauftragung oder durch gesonderten Einzelvertrag zustande.</p>
                <p>Der Anbieter ist berechtigt, Anfragen oder Bestellungen ohne Angabe von Gründen abzulehnen, insbesondere wenn der Fall technisch blockiert, wirtschaftlich unzumutbar, policy-kritisch oder aus Risikosicht nicht vertretbar erscheint.</p>
                <p>E-Signatur, unterschriebenes PDF, E-Mail oder ausdrücklich bestätigende Nachricht in einem vereinbarten Kommunikationskanal können ausreichend sein, sofern der Anbieter dies akzeptiert.</p>

                {/* 5 */}
                <p id="mitwirkung"><strong className="text-zinc-200">5. Mitwirkungspflichten des Kunden</strong></p>
                <p>Der Kunde ist verpflichtet, alle für die Leistungserbringung erforderlichen Informationen, Unterlagen, Freigaben, Verifizierungen und Zugänge rechtzeitig, vollständig und wahrheitsgemäß bereitzustellen.</p>
                <p>Der Kunde wirkt aktiv mit und reagiert innerhalb angemessener Zeit auf Rückfragen, Änderungsanforderungen oder technische Erfordernisse. Verzögerungen auf Kundenseite verlängern Leistungs- und Bearbeitungszeiten angemessen.</p>
                <p>Soweit für die Leistung erforderlich, stellt der Kunde insbesondere Shop-Zugänge, Collaborator-Einladungen, Verifizierungen, GMC-relevante Informationen oder sonstige technische Freigaben bereit.</p>

                {/* 6 */}
                <p id="scope"><strong className="text-zinc-200">6. Beschränkung auf Hauptdomain und myshopify-Domain</strong></p>
                <p>Das GMC-Paket bezieht sich ausschließlich auf die im jeweiligen Angebot, Bestellformular oder Einzelvertrag konkret benannte Hauptdomain und die dazugehörige myshopify-Domain.</p>
                <p>Weitere Domains, Länderstores, Subdomains, Mirror-Domains, zusätzliche Shops, Marktplätze, alternative Frontends oder sonstige Oberflächen sind nicht umfasst, sofern ihre Einbeziehung nicht ausdrücklich in Textform vereinbart wird.</p>

                {/* 7 */}
                <p id="approved"><strong className="text-zinc-200">7. Definition „Approved" / Leistungsbeginn</strong></p>
                <p>„Approved" bezeichnet den Status, in dem das betroffene GMC nach Einschätzung des Anbieters wieder freigegeben, nutzbar oder produktiv verwendbar ist.</p>
                <p>„Approved" gilt insbesondere als erreicht, wenn mindestens eines der folgenden Kriterien erfüllt ist:</p>
                <p>(a) eine Mitteilung von Google bestätigt die Aufhebung einer Suspendierung oder Sperre, oder<br />(b) das Merchant Center zeigt aus Sicht des Anbieters einen funktionsfähigen produktiven Status.</p>
                <p>Sobald „Approved" erreicht ist, beginnt – sofern im Angebot oder Einzelvertrag nichts anderes geregelt ist – der entgeltliche Leistungszeitraum automatisch sofort. Das Freigabedatum ist zugleich Leistungsbeginn und Abrechnungsanker.</p>
                <p>Vorbereitende Tätigkeiten vor dem Freigabedatum sind vom Anbieter im Rahmen des gebuchten Pakets zulässig und verkürzen den ersten bezahlten Leistungsmonat nicht.</p>

                {/* 8 */}
                <p id="preise"><strong className="text-zinc-200">8. Preise / Fälligkeit / Zahlung</strong></p>
                <p>Es gelten die im Angebot, Bestellformular, Checkout, Einzelvertrag oder auf der jeweils aktuellen Produktseite ausgewiesenen Preise.</p>
                <p>Alle Preise verstehen sich netto zuzüglich gesetzlich anfallender Steuern, soweit nicht ausdrücklich anders ausgewiesen. Bei Unternehmerkunden kann Reverse Charge gelten, soweit die gesetzlichen Voraussetzungen vorliegen.</p>
                <p>Soweit nichts Abweichendes vereinbart ist, sind wiederkehrende Entgelte im Voraus fällig. Der Anbieter kann den Beginn der Arbeiten vom Eingang der ersten Zahlung abhängig machen.</p>

                {/* 9 */}
                <p id="laufzeit"><strong className="text-zinc-200">9. Laufzeit / Verlängerung / Kündigung</strong></p>
                <p>Soweit das GMC-Paket als laufende Betreuung gebucht wird, beginnt die Laufzeit mit dem in Ziffer 7 definierten Leistungsbeginn / Freigabedatum.</p>
                <p>Sofern nicht anders vereinbart, läuft das GMC-Paket monatlich und verlängert sich jeweils automatisch um einen weiteren Monat, wenn es nicht in Textform gekündigt wird.</p>
                <p>Eine Kündigung wirkt zum Ende des bereits bezahlten Leistungszeitraums. Eine anteilige Erstattung für bereits begonnene oder bezahlte Leistungszeiträume erfolgt nur, soweit dies ausdrücklich vereinbart oder gesetzlich zwingend vorgeschrieben ist.</p>

                {/* 10 */}
                <p id="nichtzahlung"><strong className="text-zinc-200">10. Folgen von Nichtzahlung</strong></p>
                <p>Bei Zahlungsverzug ist der Anbieter berechtigt, Leistungen zu pausieren, den Zugriff auf betreute Strukturen einzuschränken, Bearbeitungen zurückzustellen oder nach vorheriger angemessener Mahnung außerordentlich zu kündigen.</p>
                <p>Soweit im Rahmen des konkreten Modells Accounts, Verknüpfungen, Setups oder administrative Strukturen durch den Anbieter verwaltet werden, kann der Anbieter diese bei fortdauernder Nichtzahlung deaktivieren, lösen oder löschen, soweit dies vertraglich vorgesehen und rechtlich zulässig ist.</p>

                {/* 11 */}
                <p id="aenderungen"><strong className="text-zinc-200">11. Änderungsregeln / Schutzphase</strong></p>
                <p>Der Kunde informiert den Anbieter vor Änderungen an GMC-relevanten Bereichen des betroffenen Stores, insbesondere an Produkten, Policies, Apps, Theme, Navigation, Feeds, Collections, Checkout-bezogenen Einstellungen oder vergleichbaren Oberflächen.</p>
                <p>Ab dem Freigabedatum kann eine Schutzphase gelten. Während dieser Schutzphase dürfen Änderungen nur nach vorheriger Abstimmung mit dem Anbieter erfolgen, soweit diese Änderungen die GMC-Stabilität beeinflussen können.</p>
                <p>Nimmt der Kunde unkoordinierte oder risikosteigernde Änderungen vor, ist der Anbieter berechtigt, die Leistung vorübergehend zu pausieren, eine Rückumsetzung zu verlangen oder die weitere Betreuung von einer Risikoklärung abhängig zu machen.</p>

                {/* 12 */}
                <p id="google"><strong className="text-zinc-200">12. Fremdplattformen / kein Erfolgsgarantieversprechen</strong></p>
                <p>Der Anbieter hat keinen Einfluss auf Entscheidungen, Prüfungen, Richtlinienauslegungen, Sperren, Entsperrungen, Re-Reviews oder technische Veränderungen von Google oder sonstigen Drittplattformen.</p>
                <p>Der Anbieter übernimmt daher keine Garantie für eine bestimmte Freigabeentscheidung, eine bestimmte Freigabedauer, eine bestimmte Umsatzentwicklung oder die dauerhafte Suspendierungsfreiheit.</p>

                {/* 13 */}
                <p id="refund"><strong className="text-zinc-200">13. Suspendierung / Re-Approval / Erstattungen</strong></p>
                <p>Tritt während eines laufenden bezahlten Leistungszeitraums eine Suspendierung oder ein vergleichbarer gravierender GMC-Rückfall ein, richtet sich das weitere Vorgehen nach dem jeweils gebuchten Paket, dem Einzelvertrag oder dem konkreten Angebot.</p>
                <p>Soweit dort nichts Abweichendes geregelt ist, kann der Anbieter nach eigener Wahl:</p>
                <p>(a) ohne zusätzliche Vergütung an einer Re-Approval im angemessenen Rahmen weiterarbeiten und die Abrechnung für die Suspendierungsphase pausieren, oder<br />(b) eine angemessene Teil-Erstattung für den betroffenen Zeitraum gewähren.</p>
                <p>Erstattungen sind ausgeschlossen oder können angemessen gekürzt werden, wenn die Suspendierung wesentlich durch Pflichtverletzungen, Falschangaben, nicht abgestimmte Änderungen oder sonstige zurechenbare Handlungen des Kunden verursacht oder begünstigt wurde.</p>

                {/* 14 */}
                <p id="vertraulichkeit"><strong className="text-zinc-200">14. Vertraulichkeit</strong></p>
                <p>Der Kunde verpflichtet sich, alle nicht öffentlichen Informationen des Anbieters vertraulich zu behandeln. Dies gilt insbesondere für Methoden, Prüfprozesse, Tools, interne Abläufe, Kontostrukturen, technische Maßnahmen, Risikoanalysen, Workflows und Know-how.</p>
                <p>Diese Vertraulichkeitsverpflichtung gilt auch nach Vertragsende fort, soweit gesetzlich zulässig.</p>

                {/* 15 */}
                <p id="datenschutz-agb"><strong className="text-zinc-200">15. Datenschutz</strong></p>
                <p>Der Anbieter verarbeitet personenbezogene Daten nur im Rahmen der gesetzlichen Vorschriften und der jeweils geltenden Datenschutzerklärung.</p>
                <p>Sofern im Rahmen der Leistungserbringung personenbezogene Daten im Auftrag verarbeitet werden und hierfür eine Vereinbarung zur Auftragsverarbeitung erforderlich ist, kann eine gesonderte AVV / DPA abgeschlossen werden.</p>

                {/* 16 */}
                <p id="haftung"><strong className="text-zinc-200">16. Haftung</strong></p>
                <p>Der Anbieter haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.</p>
                <p>Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen, soweit gesetzlich zulässig.</p>
                <p>Eine Haftung für Entscheidungen von Google oder sonstigen Drittplattformen, für Policy-Änderungen, Plattformausfälle, Sperren oder sonstige nicht vom Anbieter beherrschbare externe Ereignisse ist ausgeschlossen, soweit dem keine zwingenden gesetzlichen Vorschriften entgegenstehen.</p>

                {/* 17 */}
                <p id="verbraucher"><strong className="text-zinc-200">17. Verbraucherhinweise / Widerruf</strong></p>
                <p>Soweit der Kunde Verbraucher ist und der Vertrag im Fernabsatz oder außerhalb von Geschäftsräumen geschlossen wird, gelten die gesetzlichen Verbraucherrechte, insbesondere ein etwaiges gesetzliches Widerrufsrecht.</p>
                <p>Verlangt der Verbraucher ausdrücklich, dass der Anbieter vor Ablauf der Widerrufsfrist mit der Leistung beginnt, kann der Verbraucher im Fall eines Widerrufs zum Wertersatz für die bis zum Widerruf erbrachten Leistungen verpflichtet sein, soweit die gesetzlichen Voraussetzungen vorliegen.</p>
                <p>Eine gesonderte Widerrufsbelehrung und – soweit erforderlich – ein gesondertes Muster-Widerrufsformular werden Verbrauchern gesondert zur Verfügung gestellt.</p>

                {/* 18 */}
                <p id="recht"><strong className="text-zinc-200">18. Rechtswahl / Gerichtsstand</strong></p>
                <p>Es gilt das Recht der Republik Zypern unter Ausschluss des UN-Kaufrechts, soweit dem keine zwingenden gesetzlichen Verbraucherschutzvorschriften entgegenstehen.</p>
                <p>Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist – soweit gesetzlich zulässig – Paphos, Cyprus, ausschließlicher Gerichtsstand.</p>

                {/* 19 */}
                <p id="schluss"><strong className="text-zinc-200">19. Schlussbestimmungen</strong></p>
                <p>Änderungen und Ergänzungen dieser AGB oder des zugrunde liegenden Vertrags bedürfen mindestens der Textform, soweit nicht gesetzlich eine strengere Form vorgeschrieben ist.</p>
                <p>Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>

              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
