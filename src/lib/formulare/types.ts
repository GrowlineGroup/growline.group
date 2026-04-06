// ─── Core Types: Formulare ──────────────────────────────────────────────────

export interface Anfrage {
  createdAt: string;
  status: string;
  source: string;
  vorname: string;
  nachname: string;
  anzeigeName: string;
  email: string;
  telefon: string;
  adresse: string;
  leistung: string;
  nachricht: string;
  datenschutz: boolean;
}

export interface Mitgliedschaft {
  createdAt: string;
  status: string;
  source: string;
  mitgliedsmodell: string;
  zahlweise: string;
  zahlungsart: string;
  benutzername: string;
  mitgliedsnummer: string;
  vorname: string;
  nachname: string;
  anzeigeName: string;
  /** Nur intern – niemals öffentlich rendern */
  geburtsdatum: string;
  /** Nur intern – niemals öffentlich rendern */
  passnummer: string;
  email: string;
  telefon: string;
  adresse: string;
  angehoerigeKontaktperson: string;
  agb: boolean;
  datenschutz: boolean;
  einwilligung: boolean;
}

export interface FormLog {
  createdAt: string;
  form: string;
  status: string;
  message: string;
  details: string;
}

export type RawRow = Record<string, string>;

export interface FormulareDataResult {
  anfragen: Anfrage[];
  mitgliedschaften: Mitgliedschaft[];
  logs: FormLog[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
