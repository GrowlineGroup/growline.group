// ─── Selektoren & Hilfsfunktionen (Preise) ──────────────────────────────────

import type { Preis, Anfahrt, PreisText } from './types';

// ── Preise ───────────────────────────────────────────────────────────────────

export function getPreiseByKategorie(list: Preis[], kategorie: string): Preis[] {
  const lower = kategorie.toLowerCase();
  return list.filter(p => p.kategorie.toLowerCase().includes(lower));
}

export function getPreisById(list: Preis[], id: string): Preis | undefined {
  return list.find(p => p.id === id);
}

export function getPreiseNachAbsprache(list: Preis[]): Preis[] {
  return list.filter(p => p.nachAbsprache);
}

export function getPreiseMitMitgliedschaftsrabatt(list: Preis[]): Preis[] {
  return list.filter(p => p.preisSilber !== null || p.preisGold !== null);
}

export function getAlleKategorien(list: Preis[]): string[] {
  return [...new Set(list.map(p => p.kategorie).filter(Boolean))].sort();
}

export function getAlleEinheiten(list: Preis[]): string[] {
  return [...new Set(list.map(p => p.einheit).filter(Boolean))].sort();
}

// ── Anfahrt ──────────────────────────────────────────────────────────────────

export function getAnfahrtById(list: Anfahrt[], id: string): Anfahrt | undefined {
  return list.find(a => a.id === id);
}

// ── Texte ────────────────────────────────────────────────────────────────────

export function getPreisTextById(list: PreisText[], id: string): PreisText | undefined {
  return list.find(t => t.id === id);
}
