// ─── Row → Typed Object Mapper (Preise) ─────────────────────────────────────

import type { Preis, Anfahrt, PreisText, RawRow } from './types';

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

export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase();
}

export function mapRowToPreis(row: RawRow): Preis {
  return {
    id: row['id']?.trim() || '',
    kategorie: row['kategorie']?.trim() || '',
    leistung: row['leistung']?.trim() || '',
    preis: toNumber(row['preis']),
    einheit: row['einheit']?.trim() || '',
    nachAbsprache: toBool(row['nach_absprache']),
    beschreibung: row['beschreibung']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    preisSilber: toNumberOrNull(row['preis_silber']),
    preisGold: toNumberOrNull(row['preis_gold']),
    preisSilberText: row['preis_silber_text']?.trim() || '',
    preisGoldText: row['preis_gold_text']?.trim() || '',
    sortierung: toNumber(row['sortierung'], 999),
  };
}

export function mapRowToAnfahrt(row: RawRow): Anfahrt {
  return {
    id: row['id']?.trim() || '',
    zone: row['zone']?.trim() || '',
    preis: toNumber(row['preis']),
    aktiv: toBool(row['aktiv']),
    sortierung: toNumber(row['sortierung'], 999),
  };
}

export function mapRowToPreisText(row: RawRow): PreisText {
  return {
    id: row['id']?.trim() || '',
    text: row['text']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    sortierung: toNumber(row['sortierung'], 999),
  };
}
