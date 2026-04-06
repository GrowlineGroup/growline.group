// ─── Public API: Kundenaccounts ──────────────────────────────────────────────
// Import alles aus diesem Modul – niemals direkt aus Untermodulen.

// Types
export type {
  Kundenaccount,
  KundenaccountDataResult,
  RawRow,
} from './types';

// Config
export { SHEET_CONFIG, getCsvUrl } from './config';

// Fetcher (Server-only)
export {
  fetchKundenaccounts,
  fetchKundenaccountData,
} from './fetcher';

// Selektoren & Helpers
export {
  getAktiveAccounts,
  getAccountsByStatus,
  getGesperrteAccounts,
  getGekuendigteAccounts,
  getAccountsByMitgliedschaft,
  getAlleMitgliedschaften,
  getAccountById,
  getAccountByKundennummer,
  getAccountByEmail,
  getAccountByLoginName,
  getAccountsBySprache,
  getAlleSprachen,
  getAktivePortalzugaenge,
  getAccountsMitResetErforderlich,
  getAccountsMitZweiFA,
  getAccountsOhneVerifizierung,
  getAccountsByOrt,
  getAccountsByLand,
  getAlleOrte,
  getAlleStatus,
  toPublic,
  getPublicAccounts,
} from './selectors';

export type { KundenaccountPublic } from './selectors';

// Fallbacks
export { FALLBACK_KUNDENACCOUNTS } from './fallback';
