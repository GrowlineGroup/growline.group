// ─── Google Sheets Konfiguration: Partner ───────────────────────────────────

const SHEET_ID = '1iA_UXpnTB-g_iKvFWWhQheJoTM9uMmFua_VZ5DQVbVM';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    exportPartner: {
      gid: '189644459',
      name: 'Export_Partner',
    },
    exportTexte: {
      gid: '248539570',
      name: 'Export_Texte',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
