import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { baseUrl } from '@/lib/config';

const pages: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '',                          priority: 1.0, changeFrequency: 'weekly' },
  { path: '/kontakt',                  priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/css-entry',       priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/google-merchant', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/geo',            priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/web-development', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ueber-uns',               priority: 0.8, changeFrequency: 'monthly' },
  { path: '/commitment',              priority: 0.7, changeFrequency: 'monthly' },
  { path: '/impressum',               priority: 0.3, changeFrequency: 'monthly' },
  { path: '/datenschutz',             priority: 0.3, changeFrequency: 'monthly' },
  { path: '/agb/css-entry',           priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );
}
