// ─── Public API: Mitarbeiterdaten ────────────────────────────────────────────
// Import alles aus diesem Modul – niemals direkt aus Untermodulen.

// Types
export type {
  Mitarbeiter,
  Arbeitszeit,
  MitarbeiterDataResult,
  RawRow,
} from './types';

// Config
export { SHEET_CONFIG, getCsvUrl } from './config';

// Fetcher (Server-only)
export {
  fetchMitarbeiter,
  fetchArbeitszeiten,
  fetchAllMitarbeiterData,
} from './fetcher';

// Selektoren & Helpers
export {
  getAktiveMitarbeiter,
  getPublicMitarbeiter,
  toPublic,
  getMitarbeiterById,
  getMitarbeiterBySlug,
  getMitarbeiterByRolle,
  getMitarbeiterByStandort,
  getMitarbeiterBySprache,
  getAlleRollen,
  getAlleArbeitsmodi,
  getAlleSprachen,
  getArbeitszeitenFuerMitarbeiter,
  getArbeitszeitenImZeitraum,
  getGesamtstundenFuerMitarbeiter,
  verknuepfeMitarbeiterMitArbeitszeiten,
  toSlug,
} from './selectors';

export type {
  MitarbeiterPublic,
  MitarbeiterMitArbeitszeiten,
} from './selectors';

// Fallbacks
export { FALLBACK_MITARBEITER, FALLBACK_ARBEITSZEITEN } from './fallback';
