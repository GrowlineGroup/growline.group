// ─── Google Sheets Konfiguration: Preise ────────────────────────────────────

const SHEET_ID = '1RYlwTmxjCVNGrrZUjliCJpRDJPwcmjlFURyNdRdgX1M';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    exportPreise: {
      gid: '2096588842',
      name: 'Export_Preise',
    },
    exportAnfahrt: {
      gid: '114664669',
      name: 'Export_Anfahrt',
    },
    exportTexte: {
      gid: '505692182',
      name: 'Export_Texte',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
