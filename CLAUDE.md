# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Webseite der **Growline Group** — zweisprachig Deutsch (Standard) und Englisch, gebaut mit Next.js 16 App Router.

## Befehle

```bash
npm run dev      # Dev-Server starten (http://localhost:3000)
npm run build    # Produktions-Build (TypeScript-Check + statische Generierung)
npm run start    # Produktions-Server starten
npm run lint     # ESLint ausführen
```

Kein Test-Runner konfiguriert.

## Stack

- **Next.js 16**, App Router, Turbopack
- **React 19**, **TypeScript 5** (strict mode)
- **Tailwind CSS v4** — kein `tailwind.config.js`; Konfiguration erfolgt direkt in `globals.css` via `@theme`
- Import-Alias: `@/*` → `./src/*`

## i18n-Architektur

Alle Routen sind locale-prefixed: `/de/...` und `/en/...`. Standardsprache ist `de`.

| Datei | Zweck |
|---|---|
| `src/proxy.ts` | Next.js 16 Proxy (ersetzt `middleware.ts`). Liest `Accept-Language`, leitet `/` auf `/de` oder `/en` weiter. Export muss `proxy` heißen — **nicht** `middleware`. |
| `src/i18n/config.ts` | Einzige Quelle für `locales`, `Locale`-Typ und `defaultLocale`. |
| `src/i18n/index.ts` | `getTranslations(locale)` — gibt das Übersetzungsobjekt zurück. |
| `src/i18n/translations/de.ts` / `en.ts` | Übersetzungsschlüssel. Beide Dateien immer synchron halten. |
| `src/app/[locale]/layout.tsx` | Setzt `<html lang={locale}>`, generiert Metadata, definiert `generateStaticParams`. |
| `src/app/layout.tsx` | Minimales Root-Layout, rendert nur `{children}`. |

### Wichtiger TypeScript-Gotcha

Next.js generiert `params` als `Promise<{ locale: string }>` — **nicht** als `Promise<{ locale: Locale }>`. Immer `string` in der Props-Signatur verwenden und intern mit `as Locale` casten:

```ts
async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
}
```

### Neue Seite anlegen

1. `src/app/[locale]/seite/page.tsx` erstellen
2. Props-Signatur wie oben verwenden
3. Übersetzungsschlüssel in `de.ts` **und** `en.ts` ergänzen

### Neue Sprache hinzufügen

1. Locale-Kürzel in `locales` (`src/i18n/config.ts`) eintragen
2. `src/i18n/translations/[locale].ts` nach Vorbild von `de.ts` erstellen
3. `generateStaticParams` und der Proxy greifen automatisch
