// ─── Core Types: Preise ─────────────────────────────────────────────────────

export interface Preis {
  id: string;
  kategorie: string;
  leistung: string;
  preis: number;
  einheit: string;
  nachAbsprache: boolean;
  beschreibung: string;
  aktiv: boolean;
  preisSilber: number | null;
  preisGold: number | null;
  preisSilberText: string;
  preisGoldText: string;
  sortierung: number;
}

export interface Anfahrt {
  id: string;
  zone: string;
  preis: number;
  aktiv: boolean;
  sortierung: number;
}

export interface PreisText {
  id: string;
  text: string;
  aktiv: boolean;
  sortierung: number;
}

export type RawRow = Record<string, string>;

export interface PreiseDataResult {
  preise: Preis[];
  anfahrt: Anfahrt[];
  texte: PreisText[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
