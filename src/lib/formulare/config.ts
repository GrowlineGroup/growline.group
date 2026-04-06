// ─── Google Sheets Konfiguration: Formulare ─────────────────────────────────

const SHEET_ID = '1ZEEBlMBK_AEjiJAC-WWORQwbzCauUokb9AybbDN5bVE';

export const SHEET_CONFIG = {
  sheetId: SHEET_ID,

  tabs: {
    anfrage: {
      gid: '1651674613',
      name: 'ANFRAGE',
    },
    mitgliedschaft: {
      gid: '3235839',
      name: 'MITGLIEDSCHAFT',
    },
    log: {
      gid: '1323580460',
      name: 'LOG',
    },
  },

  csvBaseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=`,
  revalidateSeconds: 300,
} as const;

export function getCsvUrl(gid: string): string {
  return `${SHEET_CONFIG.csvBaseUrl}${gid}`;
}
