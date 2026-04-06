// ─── Row → Typed Object Mapper ───────────────────────────────────────────────
// Gemappt auf die echten Spalten in Export_Mitarbeiter / Export_Arbeitszeiten

import type { Mitarbeiter, Arbeitszeit, RawRow } from './types';

function toBool(val: string | undefined): boolean {
  const v = val?.toLowerCase().trim() ?? '';
  return v === 'true' || v === '1' || v === 'ja' || v === 'yes';
}

function toNumber(val: string | undefined): number | null {
  if (!val?.trim()) return null;
  const n = parseFloat(val.replace(',', '.'));
  return isNaN(n) ? null : n;
}

function toNumberOrZero(val: string | undefined): number {
  return toNumber(val) ?? 0;
}

function toNullable(val: string | undefined): string | null {
  const v = val?.trim() ?? '';
  return v.length > 0 ? v : null;
}

function normalizeLanguages(row: RawRow): string[] {
  return [row['sprache_1'], row['sprache_2'], row['sprache_3']]
    .map(l => l?.trim() ?? '')
    .filter(Boolean)
    .map(l => l.charAt(0).toUpperCase() + l.slice(1).toLowerCase());
}

/** Normalisiert den Header (entfernt Klammerzusätze wie "(optional)") */
export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase();
}

export function mapRowToMitarbeiter(row: RawRow): Mitarbeiter {
  const vorname = row['vorname']?.trim() ?? '';
  const nachname = row['nachname']?.trim() ?? '';

  return {
    id: row['mitarbeiter_id']?.trim() || '',
    status: (row['status']?.trim() || 'aktiv').toLowerCase(),
    rolle: row['rolle']?.trim() || '',
    vorname,
    nachname,
    anzeigeName: `${vorname} ${nachname}`.trim(),
    email: row['email']?.trim() || '',
    telefon: row['telefon']?.trim() || '',
    startdatum: toNullable(row['startdatum']),
    endedatum: toNullable(row['endedatum']),
    arbeitsmodus: row['arbeitsmodus']?.trim() || '',
    sprachen: normalizeLanguages(row),
    stundenlohn: toNumber(row['stundenlohn']),
    gehaltMonat: toNumber(row['gehalt_monat']),
    iban: toNullable(row['iban']),
    steuerId: toNullable(row['steuer_id']),
    notfallkontakt: toNullable(row['notfallkontakt']),
    bild1Url: toNullable(row['bild_1_url']),
    bild2Url: toNullable(row['bild_2_url']),
    extraText: row['extra_text']?.trim() || '',
    notizenIntern: row['notizen_intern']?.trim() || '',
  };
}

export function mapRowToArbeitszeit(row: RawRow): Arbeitszeit {
  return {
    id: row['eintrag_id']?.trim() || '',
    datum: row['datum']?.trim() || '',
    mitarbeiterId: row['mitarbeiter_id']?.trim() || '',
    rolle: row['rolle']?.trim() || '',
    start: row['start']?.trim() || '',
    ende: row['ende']?.trim() || '',
    pauseMin: toNumberOrZero(row['pause_min']),
    stunden: toNumberOrZero(row['stunden']),
    genehmigt: toBool(row['genehmigt']),
    notiz: row['notiz']?.trim() || '',
  };
}
