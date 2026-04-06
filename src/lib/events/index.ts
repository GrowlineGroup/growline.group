// ─── Public API: Events ──────────────────────────────────────────────────────

export type {
  Event,
  KalenderEintrag,
  EventText,
  EventsDataResult,
  RawRow,
} from './types';
export { SHEET_CONFIG, getCsvUrl } from './config';
export {
  fetchEvents,
  fetchKalender,
  fetchEventTexte,
  fetchAlleEventsDaten,
} from './fetcher';
export {
  getAktiveEvents,
  getKostenlose,
  getKostenpflichtige,
  getEventsByThema,
  getEventsByTyp,
  getEventsByFormat,
  getEventsByOrt,
  getBarrierefreieEvents,
  getKommendeEvents,
  getVergangeneEvents,
  getEventsImZeitraum,
  getEventById,
  getEventBySlug,
  getAlleThemen,
  getAlleTypen,
  getAlleFormate,
  getAlleOrte,
  getKalenderByEventId,
  getTextByBereich,
  getTextById,
} from './selectors';
export { FALLBACK_EVENTS, FALLBACK_KALENDER, FALLBACK_EVENT_TEXTE } from './fallback';
