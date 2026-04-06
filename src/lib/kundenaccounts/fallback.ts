// ─── Fallback-Daten (Kundenaccounts) ─────────────────────────────────────────
// Werden verwendet, wenn das Google Sheet nicht erreichbar ist.

import type { Kundenaccount } from './types';

export const FALLBACK_KUNDENACCOUNTS: Kundenaccount[] = [
  {
    accountId: 'fallback-1',
    kundennummer: 'K-FALLBACK',
    accountStatus: 'aktiv',
    mitgliedschaft: '',
    mitgliedSeit: null,
    vorname: 'Konto',
    nachname: 'Platzhalter',
    anzeigeName: 'Konto Platzhalter',
    email: '',
    telefon: '',
    strasse: '',
    plz: '',
    ort: '',
    land: '',
    sprachen: ['Deutsch'],
    loginName: '',
    pwStatus: '',
    pwResetNoetig: false,
    pwResetAm: null,
    zweiFA: false,
    letzterLoginAm: null,
    accountErstelltAm: null,
    emailVerifiziert: false,
    extraText: '',
    notizenIntern: '',
  },
];
