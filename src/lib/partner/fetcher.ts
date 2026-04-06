// ─── Fetcher: Google Sheets CSV → Partner ───────────────────────────────────

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToPartner, mapRowToPartnerText } from './mapper';
import { FALLBACK_PARTNER, FALLBACK_PARTNER_TEXTE } from './fallback';
import type { Partner, PartnerText, PartnerDataResult } from './types';

async function fetchSheetCsv(gid: string, tabName: string): Promise<string> {
  const url = getCsvUrl(gid);
  const res = await fetch(url, {
    next: { revalidate: SHEET_CONFIG.revalidateSeconds },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} beim Laden von "${tabName}".`);
  }
  return res.text();
}

export async function fetchPartner(): Promise<Partner[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportPartner.gid,
      SHEET_CONFIG.tabs.exportPartner.name
    );
    return parseCsv(csv)
      .map(mapRowToPartner)
      .filter(p => p.aktiv && p.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[Partner] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_PARTNER;
  }
}

export async function fetchPartnerTexte(): Promise<PartnerText[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportTexte.gid,
      SHEET_CONFIG.tabs.exportTexte.name
    );
    return parseCsv(csv)
      .map(mapRowToPartnerText)
      .filter(t => t.aktiv && t.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[PartnerTexte] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_PARTNER_TEXTE;
  }
}

export async function fetchAllPartnerData(): Promise<PartnerDataResult> {
  try {
    const [partner, texte] = await Promise.all([
      fetchPartner(),
      fetchPartnerTexte(),
    ]);
    return {
      partner,
      texte,
      lastFetched: new Date(),
      source: partner.length > 0 ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      partner: FALLBACK_PARTNER,
      texte: FALLBACK_PARTNER_TEXTE,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
