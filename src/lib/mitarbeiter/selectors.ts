// ─── Selektoren & Hilfsfunktionen ───────────────────────────────────────────

import type { Mitarbeiter, Arbeitszeit } from './types';

// ── Mitarbeiter ──────────────────────────────────────────────────────────────

export function getAktiveMitarbeiter(list: Mitarbeiter[]): Mitarbeiter[] {
  return list.filter(m => m.status === 'aktiv');
}

/** Nur public-sichere Felder (keine Gehälter, IBAN, Steuer-ID, Notizen intern) */
export interface MitarbeiterPublic {
  id: string;
  rolle: string;
  vorname: string;
  nachname: string;
  anzeigeName: string;
  email: string;
  telefon: string;
  arbeitsmodus: string;
  sprachen: string[];
  bild1Url: string | null;
  bild2Url: string | null;
  extraText: string;
}

export function toPublic(m: Mitarbeiter): MitarbeiterPublic {
  return {
    id: m.id,
    rolle: m.rolle,
    vorname: m.vorname,
    nachname: m.nachname,
    anzeigeName: m.anzeigeName,
    email: m.email,
    telefon: m.telefon,
    arbeitsmodus: m.arbeitsmodus,
    sprachen: m.sprachen,
    bild1Url: m.bild1Url,
    bild2Url: m.bild2Url,
    extraText: m.extraText,
  };
}

export function getPublicMitarbeiter(list: Mitarbeiter[]): MitarbeiterPublic[] {
  return list.filter(m => m.status === 'aktiv').map(toPublic);
}

export function getMitarbeiterById(
  list: Mitarbeiter[],
  id: string
): Mitarbeiter | undefined {
  return list.find(m => m.id === id);
}

export function getMitarbeiterBySlug(
  list: Mitarbeiter[],
  slug: string
): Mitarbeiter | undefined {
  return list.find(
    m => toSlug(m.anzeigeName) === slug || toSlug(m.id) === slug
  );
}

export function getMitarbeiterByRolle(
  list: Mitarbeiter[],
  rolle: string
): Mitarbeiter[] {
  const lower = rolle.toLowerCase();
  return list.filter(m => m.rolle.toLowerCase().includes(lower));
}

export function getMitarbeiterByStandort(
  list: Mitarbeiter[],
  standort: string
): Mitarbeiter[] {
  const lower = standort.toLowerCase();
  return list.filter(m => m.arbeitsmodus.toLowerCase().includes(lower));
}

export function getMitarbeiterBySprache(
  list: Mitarbeiter[],
  sprache: string
): Mitarbeiter[] {
  const lower = sprache.toLowerCase();
  return list.filter(m =>
    m.sprachen.some(s => s.toLowerCase().includes(lower))
  );
}

// ── Aggregationen ────────────────────────────────────────────────────────────

export function getAlleRollen(list: Mitarbeiter[]): string[] {
  return [...new Set(list.map(m => m.rolle).filter(Boolean))].sort();
}

export function getAlleArbeitsmodi(list: Mitarbeiter[]): string[] {
  return [...new Set(list.map(m => m.arbeitsmodus).filter(Boolean))].sort();
}

export function getAlleSprachen(list: Mitarbeiter[]): string[] {
  return [...new Set(list.flatMap(m => m.sprachen))].sort();
}

// ── Arbeitszeiten ────────────────────────────────────────────────────────────

export function getArbeitszeitenFuerMitarbeiter(
  list: Arbeitszeit[],
  mitarbeiterId: string
): Arbeitszeit[] {
  return list.filter(a => a.mitarbeiterId === mitarbeiterId);
}

export function getArbeitszeitenImZeitraum(
  list: Arbeitszeit[],
  von: string,
  bis: string
): Arbeitszeit[] {
  return list.filter(a => a.datum >= von && a.datum <= bis);
}

export function getGesamtstundenFuerMitarbeiter(
  list: Arbeitszeit[],
  mitarbeiterId: string
): number {
  return getArbeitszeitenFuerMitarbeiter(list, mitarbeiterId).reduce(
    (sum, a) => sum + a.stunden,
    0
  );
}

// ── Verknüpfung Mitarbeiter ↔ Arbeitszeiten ──────────────────────────────────

export interface MitarbeiterMitArbeitszeiten extends Mitarbeiter {
  arbeitszeiten: Arbeitszeit[];
  gesamtstunden: number;
}

export function verknuepfeMitarbeiterMitArbeitszeiten(
  mitarbeiter: Mitarbeiter[],
  arbeitszeiten: Arbeitszeit[]
): MitarbeiterMitArbeitszeiten[] {
  return mitarbeiter.map(m => ({
    ...m,
    arbeitszeiten: getArbeitszeitenFuerMitarbeiter(arbeitszeiten, m.id),
    gesamtstunden: getGesamtstundenFuerMitarbeiter(arbeitszeiten, m.id),
  }));
}

// ── Slug-Helper ──────────────────────────────────────────────────────────────

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
