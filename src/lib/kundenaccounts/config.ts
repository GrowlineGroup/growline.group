// ─── Google Sheets Konfiguration: Kundenaccounts ────────────────────────────

const SHEET_ID = '17Ite1P8G_LD1YP7UwgUdk1l3XVP0TNNS2aWy8s7wkl4';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    exportKundenaccounts: {
      gid: '523384283',
      name: 'Export_Kundenaccounts',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,

  /** Cache-Dauer in Sekunden (Next.js fetch revalidate) */
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
