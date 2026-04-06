// ─── Core Types: Partner ─────────────────────────────────────────────────────

export interface Partner {
  id: string;
  aktiv: boolean;
  status: string;
  sortierung: number;
  featured: boolean;
  detailModus: string;

  // Kategorisierung
  bundesland: string;
  stadt: string;
  thema: string;
  unterthema: string;

  // Darstellung
  partnerName: string;
  cardTitle: string;
  badgeText: string;
  badgeTyp: string;
  teaserKurz: string;
  beschreibungKurz: string;

  // Bilder
  logoUrl: string | null;
  coverImageUrl: string | null;
  images: (string | null)[];

  // Detail-Ansicht
  detailTitel: string;
  detailUntertitel: string;
  cardBackText: string;
  popupText: string;
  highlights: string[];

  // Angebot
  angebotTyp: string;
  preisInfo: string;
  mitgliedschaftErforderlich: string;
  beschraenkungen: string;
  gueltigVon: string | null;
  gueltigBis: string | null;
  couponCode: string;
  onlineNutzbar: boolean;
  vorOrtNutzbar: boolean;
  terminNoetig: boolean;

  // Kontakt
  websiteUrl: string;
  bookingUrl: string;
  email: string;
  telefon: string;
  kontaktperson: string;

  // Adresse
  ortName: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  land: string;
  mapsUrl: string;
  oeffnungszeiten: string;

  // Social
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;

  // Hinweise
  popupHinweis: string;
  agbHinweis: string;
  seoSlug: string;

  /** Nur technisch – nicht für UI */
  sourceSheet: string;
}

export interface PartnerText {
  id: string;
  bereich: string;
  position: string;
  text: string;
  aktiv: boolean;
  sortierung: number;
  sourceSheet: string;
}

export type RawRow = Record<string, string>;

export interface PartnerDataResult {
  partner: Partner[];
  texte: PartnerText[];
  lastFetched: Date;
  source: 'live' | 'fallback';
  error?: string;
}
