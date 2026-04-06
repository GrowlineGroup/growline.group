// ─── Fetcher: Google Sheets CSV → Typed Data ────────────────────────────────
// Server-only (Next.js Server Components / Route Handlers)

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToMitarbeiter, mapRowToArbeitszeit } from './mapper';
import { FALLBACK_MITARBEITER, FALLBACK_ARBEITSZEITEN } from './fallback';
import type { Mitarbeiter, Arbeitszeit, MitarbeiterDataResult } from './types';

async function fetchSheetCsv(gid: string, tabName: string): Promise<string> {
  const url = getCsvUrl(gid);
  const res = await fetch(url, {
    next: { revalidate: SHEET_CONFIG.revalidateSeconds },
  });

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} beim Laden von "${tabName}". ` +
        `Sheet ist möglicherweise nicht öffentlich freigegeben.`
    );
  }

  return res.text();
}

/** Holt und parst Export_Mitarbeiter. Filtert auf status=aktiv, sortiert nach Rolle. */
export async function fetchMitarbeiter(): Promise<Mitarbeiter[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportMitarbeiter.gid,
      SHEET_CONFIG.tabs.exportMitarbeiter.name
    );
    const rows = parseCsv(csv);
    return rows
      .map(mapRowToMitarbeiter)
      .filter(m => m.status === 'aktiv' && m.id !== '');
  } catch (err) {
    console.error('[Mitarbeiter] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_MITARBEITER;
  }
}

/** Holt und parst Export_Arbeitszeiten. Filtert leere Einträge. */
export async function fetchArbeitszeiten(): Promise<Arbeitszeit[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportArbeitszeiten.gid,
      SHEET_CONFIG.tabs.exportArbeitszeiten.name
    );
    const rows = parseCsv(csv);
    return rows
      .map(mapRowToArbeitszeit)
      .filter(a => a.id !== '' && a.datum !== '')
      .sort((a, b) => a.datum.localeCompare(b.datum));
  } catch (err) {
    console.error('[Arbeitszeiten] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_ARBEITSZEITEN;
  }
}

/** Holt beide Tabs parallel. Fallback bei Fehler. */
export async function fetchAllMitarbeiterData(): Promise<MitarbeiterDataResult> {
  try {
    const [mitarbeiter, arbeitszeiten] = await Promise.all([
      fetchMitarbeiter(),
      fetchArbeitszeiten(),
    ]);

    const isLive =
      mitarbeiter.length > 0 && mitarbeiter[0].id !== 'fallback-1';

    return {
      mitarbeiter,
      arbeitszeiten,
      lastFetched: new Date(),
      source: isLive ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      mitarbeiter: FALLBACK_MITARBEITER,
      arbeitszeiten: FALLBACK_ARBEITSZEITEN,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
