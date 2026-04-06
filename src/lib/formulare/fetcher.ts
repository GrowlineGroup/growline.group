// ─── Fetcher: Google Sheets CSV → Formulare ─────────────────────────────────

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToAnfrage, mapRowToMitgliedschaft, mapRowToFormLog } from './mapper';
import { FALLBACK_ANFRAGEN, FALLBACK_MITGLIEDSCHAFTEN, FALLBACK_LOGS } from './fallback';
import type { Anfrage, Mitgliedschaft, FormLog, FormulareDataResult } from './types';

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

export async function fetchAnfragen(): Promise<Anfrage[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.anfrage.gid,
      SHEET_CONFIG.tabs.anfrage.name
    );
    return parseCsv(csv)
      .map(mapRowToAnfrage)
      .filter(a => a.createdAt !== '')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error('[Anfragen] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_ANFRAGEN;
  }
}

export async function fetchMitgliedschaften(): Promise<Mitgliedschaft[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.mitgliedschaft.gid,
      SHEET_CONFIG.tabs.mitgliedschaft.name
    );
    return parseCsv(csv)
      .map(mapRowToMitgliedschaft)
      .filter(m => m.createdAt !== '')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error('[Mitgliedschaften] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_MITGLIEDSCHAFTEN;
  }
}

export async function fetchFormLogs(): Promise<FormLog[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.log.gid,
      SHEET_CONFIG.tabs.log.name
    );
    return parseCsv(csv)
      .map(mapRowToFormLog)
      .filter(l => l.createdAt !== '')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error('[FormLogs] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_LOGS;
  }
}

export async function fetchAlleFormulareDaten(): Promise<FormulareDataResult> {
  try {
    const [anfragen, mitgliedschaften, logs] = await Promise.all([
      fetchAnfragen(),
      fetchMitgliedschaften(),
      fetchFormLogs(),
    ]);
    return {
      anfragen,
      mitgliedschaften,
      logs,
      lastFetched: new Date(),
      source: anfragen.length > 0 || mitgliedschaften.length > 0 ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      anfragen: FALLBACK_ANFRAGEN,
      mitgliedschaften: FALLBACK_MITGLIEDSCHAFTEN,
      logs: FALLBACK_LOGS,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
