// ─── Fallback-Daten ──────────────────────────────────────────────────────────
// Werden verwendet, wenn das Google Sheet nicht erreichbar ist.

import type { Mitarbeiter, Arbeitszeit } from './types';

export const FALLBACK_MITARBEITER: Mitarbeiter[] = [
  {
    id: 'fallback-1',
    status: 'aktiv',
    rolle: 'Team',
    vorname: 'Team',
    nachname: 'Growline',
    anzeigeName: 'Team Growline',
    email: '',
    telefon: '',
    startdatum: null,
    endedatum: null,
    arbeitsmodus: '',
    sprachen: ['Deutsch'],
    stundenlohn: null,
    gehaltMonat: null,
    iban: null,
    steuerId: null,
    notfallkontakt: null,
    bild1Url: null,
    bild2Url: null,
    extraText: '',
    notizenIntern: '',
  },
];

export const FALLBACK_ARBEITSZEITEN: Arbeitszeit[] = [];
