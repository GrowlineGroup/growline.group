// ─── Selektoren & Hilfsfunktionen (Kundenaccounts) ──────────────────────────

import type { Kundenaccount } from './types';

// ── Status-Filter ────────────────────────────────────────────────────────────

export function getAktiveAccounts(list: Kundenaccount[]): Kundenaccount[] {
  return list.filter(a => a.accountStatus === 'aktiv');
}

export function getAccountsByStatus(
  list: Kundenaccount[],
  status: string
): Kundenaccount[] {
  const lower = status.toLowerCase();
  return list.filter(a => a.accountStatus === lower);
}

export function getGesperrteAccounts(list: Kundenaccount[]): Kundenaccount[] {
  return list.filter(a => a.accountStatus === 'gesperrt');
}

export function getGekuendigteAccounts(list: Kundenaccount[]): Kundenaccount[] {
  return list.filter(
    a => a.accountStatus === 'gekündigt' || a.accountStatus === 'gekuendigt'
  );
}

// ── Mitgliedschaft ───────────────────────────────────────────────────────────

export function getAccountsByMitgliedschaft(
  list: Kundenaccount[],
  typ: string
): Kundenaccount[] {
  const lower = typ.toLowerCase();
  return list.filter(a => a.mitgliedschaft.toLowerCase().includes(lower));
}

export function getAlleMitgliedschaften(list: Kundenaccount[]): string[] {
  return [...new Set(list.map(a => a.mitgliedschaft).filter(Boolean))].sort();
}

// ── Lookup ───────────────────────────────────────────────────────────────────

export function getAccountById(
  list: Kundenaccount[],
  id: string
): Kundenaccount | undefined {
  return list.find(a => a.accountId === id);
}

export function getAccountByKundennummer(
  list: Kundenaccount[],
  nr: string
): Kundenaccount | undefined {
  return list.find(a => a.kundennummer === nr);
}

export function getAccountByEmail(
  list: Kundenaccount[],
  email: string
): Kundenaccount | undefined {
  const lower = email.toLowerCase();
  return list.find(a => a.email.toLowerCase() === lower);
}

export function getAccountByLoginName(
  list: Kundenaccount[],
  name: string
): Kundenaccount | undefined {
  const lower = name.toLowerCase();
  return list.find(a => a.loginName.toLowerCase() === lower);
}

// ── Sprache ──────────────────────────────────────────────────────────────────

export function getAccountsBySprache(
  list: Kundenaccount[],
  sprache: string
): Kundenaccount[] {
  const lower = sprache.toLowerCase();
  return list.filter(a =>
    a.sprachen.some(s => s.toLowerCase().includes(lower))
  );
}

export function getAlleSprachen(list: Kundenaccount[]): string[] {
  return [...new Set(list.flatMap(a => a.sprachen))].sort();
}

// ── Login / Portal ───────────────────────────────────────────────────────────

export function getAktivePortalzugaenge(list: Kundenaccount[]): Kundenaccount[] {
  return list.filter(
    a => a.accountStatus === 'aktiv' && a.loginName !== '' && a.emailVerifiziert
  );
}

export function getAccountsMitResetErforderlich(
  list: Kundenaccount[]
): Kundenaccount[] {
  return list.filter(
    a =>
      a.pwResetNoetig ||
      a.pwStatus.toUpperCase() === 'RESET_ERFORDERLICH'
  );
}

export function getAccountsMitZweiFA(list: Kundenaccount[]): Kundenaccount[] {
  return list.filter(a => a.zweiFA);
}

export function getAccountsOhneVerifizierung(
  list: Kundenaccount[]
): Kundenaccount[] {
  return list.filter(a => !a.emailVerifiziert && a.accountStatus === 'aktiv');
}

// ── Ort / Land ───────────────────────────────────────────────────────────────

export function getAccountsByOrt(
  list: Kundenaccount[],
  ort: string
): Kundenaccount[] {
  const lower = ort.toLowerCase();
  return list.filter(a => a.ort.toLowerCase().includes(lower));
}

export function getAccountsByLand(
  list: Kundenaccount[],
  land: string
): Kundenaccount[] {
  const lower = land.toLowerCase();
  return list.filter(a => a.land.toLowerCase() === lower);
}

export function getAlleOrte(list: Kundenaccount[]): string[] {
  return [...new Set(list.map(a => a.ort).filter(Boolean))].sort();
}

// ── Aggregationen ────────────────────────────────────────────────────────────

export function getAlleStatus(list: Kundenaccount[]): string[] {
  return [...new Set(list.map(a => a.accountStatus).filter(Boolean))].sort();
}

// ── Public-View (ohne sensible Felder) ───────────────────────────────────────

export interface KundenaccountPublic {
  accountId: string;
  kundennummer: string;
  accountStatus: string;
  mitgliedschaft: string;
  vorname: string;
  nachname: string;
  anzeigeName: string;
  email: string;
  sprachen: string[];
  extraText: string;
}

export function toPublic(a: Kundenaccount): KundenaccountPublic {
  return {
    accountId: a.accountId,
    kundennummer: a.kundennummer,
    accountStatus: a.accountStatus,
    mitgliedschaft: a.mitgliedschaft,
    vorname: a.vorname,
    nachname: a.nachname,
    anzeigeName: a.anzeigeName,
    email: a.email,
    sprachen: a.sprachen,
    extraText: a.extraText,
  };
}

export function getPublicAccounts(list: Kundenaccount[]): KundenaccountPublic[] {
  return list.filter(a => a.accountStatus === 'aktiv').map(toPublic);
}
