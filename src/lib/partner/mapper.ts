// ─── Row → Typed Object Mapper (Partner) ────────────────────────────────────

import type { Partner, PartnerText, RawRow } from './types';

function toBool(val: string | undefined): boolean {
  const v = val?.toLowerCase().trim() ?? '';
  return v === 'true' || v === '1' || v === 'ja' || v === 'yes';
}

function toNumber(val: string | undefined, fallback = 0): number {
  const n = parseFloat((val ?? '').replace(',', '.'));
  return isNaN(n) ? fallback : n;
}

function toNullable(val: string | undefined): string | null {
  const v = val?.trim() ?? '';
  return v.length > 0 ? v : null;
}

export function normalizeHeader(header: string): string {
  return header
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim()
    .toLowerCase();
}

export function mapRowToPartner(row: RawRow): Partner {
  return {
    id: row['partner_id']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    status: row['status']?.trim() || '',
    sortierung: toNumber(row['sortierung'], 999),
    featured: toBool(row['featured']),
    detailModus: row['detail_modus']?.trim() || '',

    bundesland: row['bundesland']?.trim() || '',
    stadt: row['stadt']?.trim() || '',
    thema: row['thema']?.trim() || '',
    unterthema: row['unterthema']?.trim() || '',

    partnerName: row['partner_name']?.trim() || '',
    cardTitle: row['card_title']?.trim() || '',
    badgeText: row['badge_text']?.trim() || '',
    badgeTyp: row['badge_typ']?.trim() || '',
    teaserKurz: row['teaser_kurz']?.trim() || '',
    beschreibungKurz: row['beschreibung_kurz']?.trim() || '',

    logoUrl: toNullable(row['logo_url']),
    coverImageUrl: toNullable(row['cover_image_url']),
    images: [
      row['image_1_url'],
      row['image_2_url'],
      row['image_3_url'],
      row['image_4_url'],
      row['image_5_url'],
    ]
      .map(toNullable)
      .filter((url): url is string => url !== null),

    detailTitel: row['detail_titel']?.trim() || '',
    detailUntertitel: row['detail_untertitel']?.trim() || '',
    cardBackText: row['card_back_text']?.trim() || '',
    popupText: row['popup_text']?.trim() || '',
    highlights: [row['highlight_1'], row['highlight_2'], row['highlight_3']]
      .map(h => h?.trim() ?? '')
      .filter(Boolean),

    angebotTyp: row['angebot_typ']?.trim() || '',
    preisInfo: row['preis_info']?.trim() || '',
    mitgliedschaftErforderlich: row['mitgliedschaft_erforderlich']?.trim() || '',
    beschraenkungen: row['beschraenkungen']?.trim() || '',
    gueltigVon: toNullable(row['gueltig_von']),
    gueltigBis: toNullable(row['gueltig_bis']),
    couponCode: row['coupon_code']?.trim() || '',
    onlineNutzbar: toBool(row['online_nutzbar']),
    vorOrtNutzbar: toBool(row['vor_ort_nutzbar']),
    terminNoetig: toBool(row['termin_noetig']),

    websiteUrl: row['website_url']?.trim() || '',
    bookingUrl: row['booking_url']?.trim() || '',
    email: row['email']?.trim() || '',
    telefon: row['telefon']?.trim() || '',
    kontaktperson: row['kontaktperson']?.trim() || '',

    ortName: row['ort_name']?.trim() || '',
    strasse: row['strasse']?.trim() || '',
    hausnummer: row['hausnummer']?.trim() || '',
    plz: row['plz']?.trim() || '',
    ort: row['ort']?.trim() || '',
    land: row['land']?.trim() || '',
    mapsUrl: row['maps_url']?.trim() || '',
    oeffnungszeiten: row['oeffnungszeiten']?.trim() || '',

    instagramUrl: row['instagram_url']?.trim() || '',
    facebookUrl: row['facebook_url']?.trim() || '',
    whatsappUrl: row['whatsapp_url']?.trim() || '',

    popupHinweis: row['popup_hinweis']?.trim() || '',
    agbHinweis: row['agb_hinweis']?.trim() || '',
    seoSlug: row['seo_slug']?.trim() || '',

    sourceSheet: row['source_sheet']?.trim() || 'Export_Partner',
  };
}

export function mapRowToPartnerText(row: RawRow): PartnerText {
  return {
    id: row['text_id']?.trim() || '',
    bereich: row['bereich']?.trim() || '',
    position: row['position']?.trim() || '',
    text: row['text']?.trim() || '',
    aktiv: toBool(row['aktiv']),
    sortierung: toNumber(row['sortierung'], 999),
    sourceSheet: row['source_sheet']?.trim() || 'Export_Texte',
  };
}
