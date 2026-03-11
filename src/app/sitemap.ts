import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { baseUrl } from '@/lib/config';

const pages = [
  '',
  '/kontakt',
  '/ueber-uns',
  '/commitment',
  '/impressum',
  '/datenschutz',
  '/services/css-entry',
  '/services/google-merchant',
  '/services/web-development',
  '/services/geo',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );
}
