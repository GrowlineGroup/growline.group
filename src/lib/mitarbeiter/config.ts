// ─── Google Sheets Konfiguration ────────────────────────────────────────────

const SHEET_ID = '1NweLDBtNAG3iknj7WQmYGwBSZzjnaKxeYwhIyqB-qc8';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    exportMitarbeiter: {
      gid: '220874780',
      name: 'Export_Mitarbeiter',
    },
    exportArbeitszeiten: {
      gid: '122308673',
      name: 'Export_Arbeitszeiten',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,

  /** Cache-Dauer in Sekunden (Next.js fetch revalidate) */
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
