// ─── Selektoren & Hilfsfunktionen (Events) ──────────────────────────────────

import type { Event, KalenderEintrag, EventText } from './types';

// ── Filter ───────────────────────────────────────────────────────────────────

export function getAktiveEvents(list: Event[]): Event[] {
  return list.filter(e => e.aktiv && e.status.toUpperCase() === 'LIVE');
}

export function getKostenlose(list: Event[]): Event[] {
  return list.filter(e => e.freeOrPaid.toUpperCase() === 'FREE');
}

export function getKostenpflichtige(list: Event[]): Event[] {
  return list.filter(e => e.freeOrPaid.toUpperCase() === 'PAID');
}

export function getEventsByThema(list: Event[], thema: string): Event[] {
  const lower = thema.toLowerCase();
  return list.filter(e => e.thema.toLowerCase().includes(lower));
}

export function getEventsByTyp(list: Event[], typ: string): Event[] {
  const lower = typ.toLowerCase();
  return list.filter(e => e.eventTyp.toLowerCase().includes(lower));
}

export function getEventsByFormat(list: Event[], format: string): Event[] {
  const lower = format.toLowerCase();
  return list.filter(e => e.format.toLowerCase().includes(lower));
}

export function getEventsByOrt(list: Event[], ort: string): Event[] {
  const lower = ort.toLowerCase();
  return list.filter(e => e.ort.toLowerCase().includes(lower));
}

export function getBarrierefreieEvents(list: Event[]): Event[] {
  return list.filter(e => e.barrierefrei);
}

// ── Zeitbasiert ──────────────────────────────────────────────────────────────

export function getKommendeEvents(list: Event[], abDatum?: string): Event[] {
  const heute = abDatum ?? new Date().toISOString().split('T')[0];
  return list.filter(e => {
    const d = normalizeDatum(e.startdatum);
    return d >= heute;
  });
}

export function getVergangeneEvents(list: Event[], bisDatum?: string): Event[] {
  const heute = bisDatum ?? new Date().toISOString().split('T')[0];
  return list.filter(e => {
    const d = normalizeDatum(e.startdatum);
    return d < heute;
  });
}

export function getEventsImZeitraum(
  list: Event[],
  von: string,
  bis: string
): Event[] {
  return list.filter(e => {
    const d = normalizeDatum(e.startdatum);
    return d >= von && d <= bis;
  });
}

// ── Lookup ───────────────────────────────────────────────────────────────────

export function getEventById(list: Event[], id: string): Event | undefined {
  return list.find(e => e.id === id);
}

export function getEventBySlug(list: Event[], slug: string): Event | undefined {
  return list.find(e => e.seoSlug === slug || e.id === slug);
}

// ── Aggregationen ────────────────────────────────────────────────────────────

export function getAlleThemen(list: Event[]): string[] {
  return [...new Set(list.map(e => e.thema).filter(Boolean))].sort();
}

export function getAlleTypen(list: Event[]): string[] {
  return [...new Set(list.map(e => e.eventTyp).filter(Boolean))].sort();
}

export function getAlleFormate(list: Event[]): string[] {
  return [...new Set(list.map(e => e.format).filter(Boolean))].sort();
}

export function getAlleOrte(list: Event[]): string[] {
  return [...new Set(list.map(e => e.ort).filter(Boolean))].sort();
}

// ── Kalender ─────────────────────────────────────────────────────────────────

export function getKalenderByEventId(
  list: KalenderEintrag[],
  eventId: string
): KalenderEintrag | undefined {
  return list.find(k => k.eventId === eventId);
}

// ── Texte ────────────────────────────────────────────────────────────────────

export function getTextByBereich(texte: EventText[], bereich: string): EventText[] {
  const lower = bereich.toLowerCase();
  return texte.filter(t => t.bereich.toLowerCase().includes(lower));
}

export function getTextById(texte: EventText[], id: string): EventText | undefined {
  return texte.find(t => t.id === id);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Konvertiert DD.MM.YYYY → YYYY-MM-DD für Vergleiche */
function normalizeDatum(d: string): string {
  const parts = d.split('.');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return d; // schon ISO oder unbekanntes Format
}
