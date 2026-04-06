// ─── Selektoren & Hilfsfunktionen (Partner) ─────────────────────────────────

import type { Partner, PartnerText } from './types';

// ── Filter ───────────────────────────────────────────────────────────────────

export function getAktivePartner(list: Partner[]): Partner[] {
  return list.filter(p => p.aktiv && p.status.toUpperCase() === 'LIVE');
}

export function getFeaturedPartner(list: Partner[]): Partner[] {
  return list.filter(p => p.featured);
}

export function getPartnerByThema(list: Partner[], thema: string): Partner[] {
  const lower = thema.toLowerCase();
  return list.filter(p => p.thema.toLowerCase().includes(lower));
}

export function getPartnerByBundesland(list: Partner[], bl: string): Partner[] {
  const lower = bl.toLowerCase();
  return list.filter(p => p.bundesland.toLowerCase().includes(lower));
}

export function getPartnerByStadt(list: Partner[], stadt: string): Partner[] {
  const lower = stadt.toLowerCase();
  return list.filter(p => p.stadt.toLowerCase().includes(lower));
}

export function getPartnerByAngebotTyp(list: Partner[], typ: string): Partner[] {
  const lower = typ.toLowerCase();
  return list.filter(p => p.angebotTyp.toLowerCase().includes(lower));
}

export function getOnlinePartner(list: Partner[]): Partner[] {
  return list.filter(p => p.onlineNutzbar);
}

export function getVorOrtPartner(list: Partner[]): Partner[] {
  return list.filter(p => p.vorOrtNutzbar);
}

// ── Lookup ───────────────────────────────────────────────────────────────────

export function getPartnerById(list: Partner[], id: string): Partner | undefined {
  return list.find(p => p.id === id);
}

export function getPartnerBySlug(list: Partner[], slug: string): Partner | undefined {
  return list.find(p => p.seoSlug === slug || p.id === slug);
}

// ── Aggregationen ────────────────────────────────────────────────────────────

export function getAlleThemen(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.thema).filter(Boolean))].sort();
}

export function getAlleUnterthemen(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.unterthema).filter(Boolean))].sort();
}

export function getAlleBundeslaender(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.bundesland).filter(Boolean))].sort();
}

export function getAlleStaedte(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.stadt).filter(Boolean))].sort();
}

export function getAlleAngebotTypen(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.angebotTyp).filter(Boolean))].sort();
}

export function getAlleBadgeTypen(list: Partner[]): string[] {
  return [...new Set(list.map(p => p.badgeTyp).filter(Boolean))].sort();
}

// ── Texte ────────────────────────────────────────────────────────────────────

export function getTextByBereich(texte: PartnerText[], bereich: string): PartnerText[] {
  const lower = bereich.toLowerCase();
  return texte.filter(t => t.bereich.toLowerCase().includes(lower));
}

export function getTextById(texte: PartnerText[], id: string): PartnerText | undefined {
  return texte.find(t => t.id === id);
}
