// ─── Core Types: Kundenaccounts ─────────────────────────────────────────────
// Basierend auf den echten Spalten in Export_Kundenaccounts

export interface Kundenaccount {
  /** Eindeutige Account-ID (z. B. A-000001) */
  accountId: string;
  /** Kundennummer (z. B. K-000001) */
  kundennummer: string;
  accountStatus: 'aktiv' | 'pausiert' | 'gesperrt' | 'gekündigt' | string;
  mitgliedschaft: string;
  mitgliedSeit: string | null;

  // Kontaktdaten
  vorname: string;
  nachname: string;
  anzeigeName: string;
  email: string;
  telefon: string;

  // Adresse
  strasse: string;
  plz: string;
  ort: string;
  land: string;

  // Sprachen (normalisiert)
  sprachen: string[];

  // Login / Portal
  loginName: string;
  /** z. B. NICHT_SPEICHERN / SETUP_ABGESCHLOSSEN / RESET_ERFORDERLICH */
  pwStatus: string;
  pwResetNoetig: boolean;
  pwResetAm: string | null;
  zweiFA: boolean;
  letzterLoginAm: string | null;
  accountErstelltAm: string | null;
  emailVerifiziert: boolean;

  // Zusatzfelder
  extraText: string;
  /** Nur intern – niemals öffentlich rendern */
  notizenIntern: string;
}

export type RawRow = Record<string, string>;

export interface KundenaccountDataResult {
  accounts: Kundenaccount[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
