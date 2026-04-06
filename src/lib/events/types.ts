// ─── Core Types: Events ─────────────────────────────────────────────────────

export interface Event {
  id: string;
  aktiv: boolean;
  status: string;
  sortierung: number;

  // Basis
  name: string;
  kurzname: string;
  thema: string;
  eventTyp: string;
  format: string;

  // Preis
  freeOrPaid: string;
  preisRegular: number;
  preisMitglied: number;
  preisText: string;
  preisAnzeige: string;

  // Beschreibung
  kurzbeschreibung: string;
  beschreibungLang: string;

  // Datum/Zeit
  startdatum: string;
  enddatum: string;
  startzeit: string;
  endzeit: string;
  ganztag: boolean;
  anmeldeschluss: string | null;

  // Kapazität
  maxPlaetze: number | null;
  warteliste: boolean;

  // Zielgruppe
  zielgruppe: string;
  beschraenkungen: string;
  mitgliedschaftErforderlich: string;
  mindestalter: number | null;
  barrierefrei: boolean;
  badgeText: string;

  // Ort
  ortName: string;
  strasse: string;
  plz: string;
  ort: string;
  raum: string;
  land: string;
  woText: string;
  onlineLink: string;
  anmeldungLink: string;

  // Medien
  bildUrl: string | null;

  // Kontakt
  kontaktName: string;
  kontaktEmail: string;
  kontaktTelefon: string;

  // Zusatz
  mitbringen: string;
  hinweise: string;
  seoSlug: string;

  /** Nur technisch */
  sourceSheet: string;
}

export interface KalenderEintrag {
  eventId: string;
  titel: string;
  startdatum: string;
  enddatum: string;
  startzeit: string;
  endzeit: string;
  ganztag: boolean;
  wo: string;
  format: string;
  anmeldungLink: string;
  aktiv: boolean;
  status: string;
}

export interface EventText {
  id: string;
  bereich: string;
  titel: string;
  text: string;
  aktiv: boolean;
  sortierung: number;
  sourceSheet: string;
}

export type RawRow = Record<string, string>;

export interface EventsDataResult {
  events: Event[];
  kalender: KalenderEintrag[];
  texte: EventText[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
