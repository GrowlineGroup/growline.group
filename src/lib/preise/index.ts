// ─── Public API: Preise ──────────────────────────────────────────────────────

export type { Preis, Anfahrt, PreisText, PreiseDataResult, RawRow } from './types';
export { SHEET_CONFIG, getCsvUrl } from './config';
export {
  fetchPreise,
  fetchAnfahrt,
  fetchPreisTexte,
  fetchAllePreiseDaten,
} from './fetcher';
export {
  getPreiseByKategorie,
  getPreisById,
  getPreiseNachAbsprache,
  getPreiseMitMitgliedschaftsrabatt,
  getAlleKategorien,
  getAlleEinheiten,
  getAnfahrtById,
  getPreisTextById,
} from './selectors';
export { FALLBACK_PREISE, FALLBACK_ANFAHRT, FALLBACK_PREIS_TEXTE } from './fallback';
