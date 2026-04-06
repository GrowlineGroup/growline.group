// ─── Row → Typed Object Mapper (Kundenaccounts) ─────────────────────────────
// Gemappt auf die echten Spalten in Export_Kundenaccounts

import type { Kundenaccount, RawRow } from './types';

function toBool(val: string | undefined): boolean {
  const v = val?.toLowerCase().trim() ?? '';
  return v === 'true' || v === '1' || v === 'ja' || v === 'yes';
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

/** Normalisiert den Header (entfernt Klammerzusätze wie "(1 Satz)") */
export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase()
    // Sonderzeichen normalisieren (straße → strasse im Header)
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue');
}

export function mapRowToKundenaccount(row: RawRow): Kundenaccount {
  const vorname = row['vorname']?.trim() ?? '';
  const nachname = row['nachname']?.trim() ?? '';

  return {
    accountId: row['kundenaccount_id']?.trim() || '',
    kundennummer: row['kundennummer']?.trim() || '',
    accountStatus: (row['account_status']?.trim() || 'aktiv').toLowerCase(),
    mitgliedschaft: row['mitgliedschaft']?.trim() || '',
    mitgliedSeit: toNullable(row['mitglied_seit']),

    vorname,
    nachname,
    anzeigeName: `${vorname} ${nachname}`.trim(),
    email: row['email']?.trim() || '',
    telefon: row['telefon']?.trim() || '',

    // Adresse: original header "straße" wird durch normalizeHeader zu "strasse"
    strasse: row['strasse'] ?? row['straße'] ?? '',
    plz: row['plz']?.trim() || '',
    ort: row['ort']?.trim() || '',
    land: row['land']?.trim() || '',

    sprachen: normalizeLanguages(row),

    loginName: row['login_name']?.trim() || '',
    pwStatus: row['pw_status']?.trim() || '',
    pwResetNoetig: toBool(row['pw_reset_noetig']),
    pwResetAm: toNullable(row['pw_reset_am']),
    zweiFA: toBool(row['2fa_aktiv']),
    letzterLoginAm: toNullable(row['letzter_login_am']),
    accountErstelltAm: toNullable(row['account_erstellt_am']),
    emailVerifiziert: toBool(row['email_verifiziert']),

    extraText: row['extra_text']?.trim() || '',
    notizenIntern: row['notizen_intern']?.trim() || '',
  };
}
