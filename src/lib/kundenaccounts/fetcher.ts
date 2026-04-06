// ─── Fetcher: Google Sheets CSV → Kundenaccounts ────────────────────────────
// Server-only (Next.js Server Components / Route Handlers)

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToKundenaccount } from './mapper';
import { FALLBACK_KUNDENACCOUNTS } from './fallback';
import type { Kundenaccount, KundenaccountDataResult } from './types';

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

/** Holt und parst Export_Kundenaccounts. Filtert auf status=aktiv. */
export async function fetchKundenaccounts(): Promise<Kundenaccount[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportKundenaccounts.gid,
      SHEET_CONFIG.tabs.exportKundenaccounts.name
    );
    const rows = parseCsv(csv);
    return rows
      .map(mapRowToKundenaccount)
      .filter(a => a.accountId !== '');
  } catch (err) {
    console.error('[Kundenaccounts] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_KUNDENACCOUNTS;
  }
}

/** Holt alle Kundenaccounts mit Metadaten. */
export async function fetchKundenaccountData(): Promise<KundenaccountDataResult> {
  try {
    const accounts = await fetchKundenaccounts();
    const isLive =
      accounts.length > 0 && accounts[0].accountId !== 'fallback-1';

    return {
      accounts,
      lastFetched: new Date(),
      source: isLive ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      accounts: FALLBACK_KUNDENACCOUNTS,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
