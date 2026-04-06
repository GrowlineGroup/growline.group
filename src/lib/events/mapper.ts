// ─── Row → Typed Object Mapper (Events) ─────────────────────────────────────

import type { Event, KalenderEintrag, EventText, RawRow } from './types';

function toBool(val: string | undefined): boolean {
  const v = val?.toLowerCase().trim() ?? '';
  return v === 'true' || v === '1' || v === 'ja' || v === 'yes';
}

function toNumber(val: string | undefined, fallback = 0): number {
  const n = parseFloat((val ?? '').replace(',', '.'));
  return isNaN(n) ? fallback : n;
}

function toNumberOrNull(val: string | undefined): number | null {
  if (!val?.trim()) return null;
  const n = parseFloat(val.replace(',', '.'));
  return isNaN(n) ? null : n;
}

function toNullable(val: string | undefined): string | null {
  const v = val?.trim() ?? '';
  return v.length > 0 ? v : null;
}

export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase();
}

export function mapRowToEvent(row: RawRow): Event {
  return {
    id: row['event_id']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    status: row['status']?.trim() || '',
    sortierung: toNumber(row['sortierung'], 999),

    name: row['name']?.trim() || '',
    kurzname: row['kurzname']?.trim() || '',
    thema: row['thema']?.trim() || '',
    eventTyp: row['event_typ']?.trim() || '',
    format: row['format']?.trim() || '',

    freeOrPaid: row['free_or_paid']?.trim() || '',
    preisRegular: toNumber(row['preis_regular']),
    preisMitglied: toNumber(row['preis_mitglied']),
    preisText: row['preis_text']?.trim() || '',
    preisAnzeige: row['preis_anzeige']?.trim() || '',

    kurzbeschreibung: row['kurzbeschreibung']?.trim() || '',
    beschreibungLang: row['beschreibung_lang']?.trim() || '',

    startdatum: row['startdatum']?.trim() || '',
    enddatum: row['enddatum']?.trim() || '',
    startzeit: row['startzeit']?.trim() || '',
    endzeit: row['endzeit']?.trim() || '',
    ganztag: toBool(row['ganztag']),
    anmeldeschluss: toNullable(row['anmeldeschluss']),

    maxPlaetze: toNumberOrNull(row['max_plaetze']),
    warteliste: toBool(row['warteliste']),

    zielgruppe: row['zielgruppe']?.trim() || '',
    beschraenkungen: row['beschraenkungen']?.trim() || '',
    mitgliedschaftErforderlich: row['mitgliedschaft_erforderlich']?.trim() || '',
    mindestalter: toNumberOrNull(row['mindestalter']),
    barrierefrei: toBool(row['barrierefrei']),
    badgeText: row['badge_text']?.trim() || '',

    ortName: row['ort_name']?.trim() || '',
    strasse: row['strasse']?.trim() || '',
    plz: row['plz']?.trim() || '',
    ort: row['ort']?.trim() || '',
    raum: row['raum']?.trim() || '',
    land: row['land']?.trim() || '',
    woText: row['wo_text']?.trim() || '',
    onlineLink: row['online_link']?.trim() || '',
    anmeldungLink: row['anmeldung_link']?.trim() || '',

    bildUrl: toNullable(row['bild_url']),

    kontaktName: row['kontakt_name']?.trim() || '',
    kontaktEmail: row['kontakt_email']?.trim() || '',
    kontaktTelefon: row['kontakt_telefon']?.trim() || '',

    mitbringen: row['mitbringen']?.trim() || '',
    hinweise: row['hinweise']?.trim() || '',
    seoSlug: row['seo_slug']?.trim() || '',

    sourceSheet: row['source_sheet']?.trim() || 'Export_Events',
  };
}

export function mapRowToKalenderEintrag(row: RawRow): KalenderEintrag {
  return {
    eventId: row['event_id']?.trim() || '',
    titel: row['titel']?.trim() || '',
    startdatum: row['startdatum']?.trim() || '',
    enddatum: row['enddatum']?.trim() || '',
    startzeit: row['startzeit']?.trim() || '',
    endzeit: row['endzeit']?.trim() || '',
    ganztag: toBool(row['ganztag']),
    wo: row['wo']?.trim() || '',
    format: row['format']?.trim() || '',
    anmeldungLink: row['anmeldung_link']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    status: row['status']?.trim() || '',
  };
}

export function mapRowToEventText(row: RawRow): EventText {
  return {
    id: row['text_id']?.trim() || '',
    bereich: row['bereich']?.trim() || '',
    titel: row['titel']?.trim() || '',
    text: row['text']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    sortierung: toNumber(row['sortierung'], 999),
    sourceSheet: row['source_sheet']?.trim() || 'Export_Texte',
  };
}
