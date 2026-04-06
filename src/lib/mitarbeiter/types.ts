// ─── Core Types: Mitarbeiter & Arbeitszeiten ────────────────────────────────
// Basierend auf den echten Spalten in Export_Mitarbeiter und Export_Arbeitszeiten

export interface Mitarbeiter {
  id: string;
  status: 'aktiv' | 'pausiert' | 'ausgeschieden' | string;
  rolle: string;
  vorname: string;
  nachname: string;
  anzeigeName: string;
  email: string;
  telefon: string;
  startdatum: string | null;
  endedatum: string | null;
  arbeitsmodus: string;
  sprachen: string[];
  /** Nur intern – niemals öffentlich rendern */
  stundenlohn: number | null;
  /** Nur intern – niemals öffentlich rendern */
  gehaltMonat: number | null;
  /** Nur intern – niemals öffentlich rendern */
  iban: string | null;
  /** Nur intern – niemals öffentlich rendern */
  steuerId: string | null;
  /** Nur intern – niemals öffentlich rendern */
  notfallkontakt: string | null;
  bild1Url: string | null;
  bild2Url: string | null;
  extraText: string;
  /** Nur intern – niemals öffentlich rendern */
  notizenIntern: string;
}

export interface Arbeitszeit {
  id: string;
  datum: string;
  mitarbeiterId: string;
  rolle: string;
  start: string;
  ende: string;
  pauseMin: number;
  stunden: number;
  genehmigt: boolean;
  notiz: string;
}

export type RawRow = Record<string, string>;

export interface MitarbeiterDataResult {
  mitarbeiter: Mitarbeiter[];
  arbeitszeiten: Arbeitszeit[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
