import { Locale } from './config';
import de from './translations/de';
import en from './translations/en';

const translations = { de, en };

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations['de'];
}
