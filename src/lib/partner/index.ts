// ─── Public API: Partner ─────────────────────────────────────────────────────

export type { Partner, PartnerText, PartnerDataResult, RawRow } from './types';
export { SHEET_CONFIG, getCsvUrl } from './config';
export { fetchPartner, fetchPartnerTexte, fetchAllPartnerData } from './fetcher';
export {
  getAktivePartner,
  getFeaturedPartner,
  getPartnerByThema,
  getPartnerByBundesland,
  getPartnerByStadt,
  getPartnerByAngebotTyp,
  getOnlinePartner,
  getVorOrtPartner,
  getPartnerById,
  getPartnerBySlug,
  getAlleThemen,
  getAlleUnterthemen,
  getAlleBundeslaender,
  getAlleStaedte,
  getAlleAngebotTypen,
  getAlleBadgeTypen,
  getTextByBereich,
  getTextById,
} from './selectors';
export { FALLBACK_PARTNER, FALLBACK_PARTNER_TEXTE } from './fallback';
