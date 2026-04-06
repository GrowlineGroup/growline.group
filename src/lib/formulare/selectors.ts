// ─── Selektoren & Hilfsfunktionen (Formulare) ───────────────────────────────

import type { Anfrage, Mitgliedschaft, FormLog } from './types';

// ── Anfragen ─────────────────────────────────────────────────────────────────

export function getAnfragenByStatus(list: Anfrage[], status: string): Anfrage[] {
  const lower = status.toLowerCase();
  return list.filter(a => a.status.toLowerCase() === lower);
}

export function getAnfragenByLeistung(list: Anfrage[], leistung: string): Anfrage[] {
  const lower = leistung.toLowerCase();
  return list.filter(a => a.leistung.toLowerCase().includes(lower));
}

export function getAnfrageByEmail(list: Anfrage[], email: string): Anfrage[] {
  const lower = email.toLowerCase();
  return list.filter(a => a.email.toLowerCase() === lower);
}

// ── Mitgliedschaften ─────────────────────────────────────────────────────────

export function getMitgliedschaftenByStatus(
  list: Mitgliedschaft[],
  status: string
): Mitgliedschaft[] {
  const lower = status.toLowerCase();
  return list.filter(m => m.status.toLowerCase() === lower);
}

export function getMitgliedschaftenByModell(
  list: Mitgliedschaft[],
  modell: string
): Mitgliedschaft[] {
  const lower = modell.toLowerCase();
  return list.filter(m => m.mitgliedsmodell.toLowerCase().includes(lower));
}

export function getMitgliedschaftByEmail(
  list: Mitgliedschaft[],
  email: string
): Mitgliedschaft | undefined {
  const lower = email.toLowerCase();
  return list.find(m => m.email.toLowerCase() === lower);
}

export function getMitgliedschaftByNummer(
  list: Mitgliedschaft[],
  nr: string
): Mitgliedschaft | undefined {
  return list.find(m => m.mitgliedsnummer === nr);
}

export function getMitgliedschaftByBenutzername(
  list: Mitgliedschaft[],
  name: string
): Mitgliedschaft | undefined {
  const lower = name.toLowerCase();
  return list.find(m => m.benutzername.toLowerCase() === lower);
}

export function getAlleModelle(list: Mitgliedschaft[]): string[] {
  return [...new Set(list.map(m => m.mitgliedsmodell).filter(Boolean))].sort();
}

export function getAlleZahlweisen(list: Mitgliedschaft[]): string[] {
  return [...new Set(list.map(m => m.zahlweise).filter(Boolean))].sort();
}

// ── Logs ─────────────────────────────────────────────────────────────────────

export function getLogsByForm(list: FormLog[], form: string): FormLog[] {
  const lower = form.toLowerCase();
  return list.filter(l => l.form.toLowerCase() === lower);
}

export function getLogsByStatus(list: FormLog[], status: string): FormLog[] {
  const lower = status.toLowerCase();
  return list.filter(l => l.status.toLowerCase() === lower);
}

export function getErrorLogs(list: FormLog[]): FormLog[] {
  return list.filter(l => l.status.toLowerCase() === 'error');
}
