// ─── CSV Parser ─────────────────────────────────────────────────────────────

import type { RawRow } from './types';
import { normalizeHeader } from './mapper';

/**
 * Parst einen CSV-String in ein Array von RawRow-Objekten.
 * Unterstützt: quoted fields, Kommas in Anführungszeichen, leere Zeilen.
 * Header werden normalisiert: lowercase, Klammerzusätze entfernt.
 */
export function parseCsv(csvText: string): RawRow[] {
  const lines = csvText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);

  return lines
    .slice(1)
    .map(line => {
      const values = parseCsvLine(line);
      const row: RawRow = {};
      headers.forEach((header, i) => {
        row[header] = (values[i] ?? '').trim();
      });
      return row;
    })
    .filter(row => Object.values(row).some(v => v !== ''));
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}
