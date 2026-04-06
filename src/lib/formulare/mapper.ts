// ─── Row → Typed Object Mapper (Formulare) ──────────────────────────────────

import type { Anfrage, Mitgliedschaft, FormLog, RawRow } from './types';

function toBool(val: string | undefined): boolean {
  const v = val?.toLowerCase().trim() ?? '';
  return v === 'true' || v === '1' || v === 'ja' || v === 'yes';
}

export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase();
}

export function mapRowToAnfrage(row: RawRow): Anfrage {
  const vorname = row['vorname']?.trim() ?? '';
  const nachname = row['nachname']?.trim() ?? '';

  return {
    createdAt: row['created_at']?.trim() || '',
    status: row['status']?.trim() || '',
    source: row['source']?.trim() || '',
    vorname,
    nachname,
    anzeigeName: `${vorname} ${nachname}`.trim(),
    email: row['email']?.trim() || '',
    telefon: row['telefon']?.trim() || '',
    adresse: row['adresse']?.trim() || '',
    leistung: row['leistung']?.trim() || '',
    nachricht: row['nachricht']?.trim() || '',
    datenschutz: toBool(row['datenschutz']),
  };
}

export function mapRowToMitgliedschaft(row: RawRow): Mitgliedschaft {
  const vorname = row['vorname']?.trim() ?? '';
  const nachname = row['nachname']?.trim() ?? '';

  return {
    createdAt: row['created_at']?.trim() || '',
    status: row['status']?.trim() || '',
    source: row['source']?.trim() || '',
    mitgliedsmodell: row['mitgliedsmodell']?.trim() || '',
    zahlweise: row['zahlweise']?.trim() || '',
    zahlungsart: row['zahlungsart']?.trim() || '',
    benutzername: row['benutzername']?.trim() || '',
    mitgliedsnummer: row['mitgliedsnummer']?.trim() || '',
    vorname,
    nachname,
    anzeigeName: `${vorname} ${nachname}`.trim(),
    geburtsdatum: row['geburtsdatum']?.trim() || '',
    passnummer: row['passnummer']?.trim() || '',
    email: row['email']?.trim() || '',
    telefon: row['telefon']?.trim() || '',
    adresse: row['adresse']?.trim() || '',
    angehoerigeKontaktperson: row['angehoerige_kontaktperson']?.trim() || '',
    agb: toBool(row['agb']),
    datenschutz: toBool(row['datenschutz']),
    einwilligung: toBool(row['einwilligung']),
  };
}

export function mapRowToFormLog(row: RawRow): FormLog {
  return {
    createdAt: row['created_at']?.trim() || '',
    form: row['form']?.trim() || '',
    status: row['status']?.trim() || '',
    message: row['message']?.trim() || '',
    details: row['details']?.trim() || '',
  };
}
