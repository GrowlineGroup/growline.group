// ─── Google Sheets Konfiguration: Events ────────────────────────────────────

const SHEET_ID = '1i__kWZPURfVlAEsc6mAJSNKnMo5lFselSXCSGFztcfk';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    exportEvents: {
      gid: '788139156',
      name: 'Export_Events',
    },
    exportKalender: {
      gid: '1364091576',
      name: 'Export_Kalender',
    },
    exportTexte: {
      gid: '109191491',
      name: 'Export_Texte',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
