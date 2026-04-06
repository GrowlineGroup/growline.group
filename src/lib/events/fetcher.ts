// ─── Fetcher: Google Sheets CSV → Events ────────────────────────────────────

import { getCsvUrl, SHEET_CONFIG } from './config';
import { parseCsv } from './parser';
import { mapRowToEvent, mapRowToKalenderEintrag, mapRowToEventText } from './mapper';
import { FALLBACK_EVENTS, FALLBACK_KALENDER, FALLBACK_EVENT_TEXTE } from './fallback';
import type { Event, KalenderEintrag, EventText, EventsDataResult } from './types';

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

export async function fetchEvents(): Promise<Event[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportEvents.gid,
      SHEET_CONFIG.tabs.exportEvents.name
    );
    return parseCsv(csv)
      .map(mapRowToEvent)
      .filter(e => e.aktiv && e.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[Events] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_EVENTS;
  }
}

export async function fetchKalender(): Promise<KalenderEintrag[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportKalender.gid,
      SHEET_CONFIG.tabs.exportKalender.name
    );
    return parseCsv(csv)
      .map(mapRowToKalenderEintrag)
      .filter(k => k.aktiv && k.eventId !== '');
  } catch (err) {
    console.error('[Kalender] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_KALENDER;
  }
}

export async function fetchEventTexte(): Promise<EventText[]> {
  try {
    const csv = await fetchSheetCsv(
      SHEET_CONFIG.tabs.exportTexte.gid,
      SHEET_CONFIG.tabs.exportTexte.name
    );
    return parseCsv(csv)
      .map(mapRowToEventText)
      .filter(t => t.aktiv && t.id !== '')
      .sort((a, b) => a.sortierung - b.sortierung);
  } catch (err) {
    console.error('[EventTexte] Fetch fehlgeschlagen → Fallback:', err);
    return FALLBACK_EVENT_TEXTE;
  }
}

export async function fetchAlleEventsDaten(): Promise<EventsDataResult> {
  try {
    const [events, kalender, texte] = await Promise.all([
      fetchEvents(),
      fetchKalender(),
      fetchEventTexte(),
    ]);
    return {
      events,
      kalender,
      texte,
      lastFetched: new Date(),
      source: events.length > 0 ? 'live' : 'fallback',
    };
  } catch (err) {
    return {
      events: FALLBACK_EVENTS,
      kalender: FALLBACK_KALENDER,
      texte: FALLBACK_EVENT_TEXTE,
      lastFetched: new Date(),
      source: 'fallback',
      error: err instanceof Error ? err.message : 'Unbekannter Fehler',
    };
  }
}
