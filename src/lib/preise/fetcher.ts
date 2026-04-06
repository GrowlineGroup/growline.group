// ─── Fetcher: Google Sheets CSV → Preise ────────────────────────────────────

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToPreis, mapRowToAnfahrt, mapRowToPreisText } from './mapper';
import { FALLBACK_PREISE, FALLBACK_ANFAHRT, FALLBACK_PREIS_TEXTE } from './fallback';
import type { Preis, Anfahrt, PreisText, PreiseDataResult } from './types';

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

export async function fetchPreise(): Promise<Preis[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportPreise.gid,
      SHEET_CONFIG.tabs.exportPreise.name
    );
    return parseCsv(csv)
      .map(mapRowToPreis)
      .filter(p => p.aktiv && p.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[Preise] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_PREISE;
  }
}

export async function fetchAnfahrt(): Promise<Anfahrt[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportAnfahrt.gid,
      SHEET_CONFIG.tabs.exportAnfahrt.name
    );
    return parseCsv(csv)
      .map(mapRowToAnfahrt)
      .filter(a => a.aktiv && a.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[Anfahrt] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_ANFAHRT;
  }
}

export async function fetchPreisTexte(): Promise<PreisText[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportTexte.gid,
      SHEET_CONFIG.tabs.exportTexte.name
    );
    return parseCsv(csv)
      .map(mapRowToPreisText)
      .filter(t => t.aktiv && t.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[PreisTexte] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_PREIS_TEXTE;
  }
}

export async function fetchAllePreiseDaten(): Promise<PreiseDataResult> {
  try {
    const [preise, anfahrt, texte] = await Promise.all([
      fetchPreise(),
      fetchAnfahrt(),
      fetchPreisTexte(),
    ]);
    return {
      preise,
      anfahrt,
      texte,
      lastFetched: new Date(),
      source: preise.length > 0 ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      preise: FALLBACK_PREISE,
      anfahrt: FALLBACK_ANFAHRT,
      texte: FALLBACK_PREIS_TEXTE,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
