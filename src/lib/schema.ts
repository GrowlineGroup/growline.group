import { baseUrl } from './config';

// ── Helpers ──────────────────────────────────────────────────────────────────

export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 0);
}

// ── Organization ─────────────────────────────────────────────────────────────

export function organizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Growline Group',
    legalName: 'GROWLINE GROUP LTD',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    email: 'info@growline.group',
    telephone: '+35797491691',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Solomou Solomou 5, Flat/Office 101',
      addressLocality: 'Paphos',
      postalCode: '8036',
      addressCountry: 'CY',
    },
    sameAs: [
      'https://www.linkedin.com/in/martin-honecker-607a4617a',
    ],
    founder: {
      '@type': 'Person',
      name: 'Martin Honecker',
      jobTitle: 'Director',
    },
    description:
      locale === 'de'
        ? 'Spezialisierte Digitalagentur für CSS Entry, Google Merchant Center Entsperrung, GEO-Sichtbarkeit und High-Performance-Webentwicklung.'
        : 'Specialized digital agency for CSS Entry, Google Merchant Center reinstatement, GEO visibility, and high-performance web development.',
  };
}

// ── WebSite ──────────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Growline Group',
    url: baseUrl,
    publisher: { '@id': `${baseUrl}/#organization` },
    inLanguage: ['de', 'en'],
  };
}

// ── WebPage ──────────────────────────────────────────────────────────────────

export function webPageSchema(opts: {
  locale: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/${opts.locale}${opts.path}#webpage`,
    url: `${baseUrl}/${opts.locale}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${baseUrl}/#website` },
    about: { '@id': `${baseUrl}/#organization` },
    inLanguage: opts.locale,
  };
}

// ── BreadcrumbList ───────────────────────────────────────────────────────────

export interface Breadcrumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Service ──────────────────────────────────────────────────────────────────

export function serviceSchema(opts: {
  locale: string;
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${baseUrl}/${opts.locale}${opts.path}`,
    provider: { '@id': `${baseUrl}/#organization` },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 50.1109, longitude: 8.6821 },
      geoRadius: '5000',
    },
  };
}

// ── ProfessionalService ──────────────────────────────────────────────────────

export function professionalServiceSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#professionalservice`,
    name: 'Growline Group',
    url: baseUrl,
    telephone: '+35797491691',
    email: 'info@growline.group',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Solomou Solomou 5, Flat/Office 101',
      addressLocality: 'Paphos',
      postalCode: '8036',
      addressCountry: 'CY',
    },
    priceRange: '€€',
    knowsAbout: [
      'CSS Entry',
      'Google Merchant Center',
      'Generative Engine Optimization',
      'Web Development',
      'Next.js',
      'Google Shopping',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'de' ? 'Leistungen' : 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CSS Entry',
            url: `${baseUrl}/${locale}/services/css-entry`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'de' ? 'GMC Entsperrung' : 'GMC Reinstatement',
            url: `${baseUrl}/${locale}/services/google-merchant`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'GEO',
            url: `${baseUrl}/${locale}/services/geo`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            url: `${baseUrl}/${locale}/services/web-development`,
          },
        },
      ],
    },
  };
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
