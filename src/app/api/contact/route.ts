import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── Types ────────────────────────────────────────────────────────────────────

export type ContactTag = 'css' | 'gmc' | 'webDev' | 'geo';

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  whatsapp?: string;
  tags: ContactTag[];
  // CSS-specific
  cssMerchantId?: string;
  // GMC-specific
  collaboratorCode?: string;
  // Shared URL (GMC / WebDev / GEO)
  siteUrl?: string;
  // GEO-specific
  geoService?: string;
  geoCity?: string;
  // Common
  message: string;
  gdpr: boolean;
}

export interface ContactResponse {
  success: boolean;
  error?: string;
}

// ── Validation ───────────────────────────────────────────────────────────────

const VALID_TAGS: ContactTag[] = ['css', 'gmc', 'webDev', 'geo'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, company: 120, email: 254, whatsapp: 30, message: 4000 };

function validate(data: unknown): ContactPayload {
  if (!data || typeof data !== 'object') throw new Error('Invalid payload');
  const d = data as Record<string, unknown>;

  const name = typeof d.name === 'string' ? d.name.trim() : '';
  if (!name || name.length > MAX.name) throw new Error('Invalid name');

  const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(email) || email.length > MAX.email) throw new Error('Invalid email');

  const message = typeof d.message === 'string' ? d.message.trim() : '';
  if (!message || message.length > MAX.message) throw new Error('Invalid message');

  if (d.gdpr !== true) throw new Error('GDPR consent required');

  const tags = Array.isArray(d.tags)
    ? (d.tags as unknown[]).filter((t): t is ContactTag =>
        typeof t === 'string' && VALID_TAGS.includes(t as ContactTag),
      )
    : [];

  const str = (val: unknown, max: number): string | undefined => {
    if (val === undefined || val === null || val === '') return undefined;
    if (typeof val !== 'string') return undefined;
    const trimmed = val.trim();
    return trimmed.length > 0 && trimmed.length <= max ? trimmed : undefined;
  };

  const cssMerchantId = str(d.cssMerchantId, 10);
  if (cssMerchantId !== undefined && !/^[0-9]{10}$/.test(cssMerchantId)) {
    throw new Error('Invalid Merchant Center ID');
  }

  const collaboratorCode = str(d.collaboratorCode, 4);
  if (collaboratorCode !== undefined && !/^[0-9]{4}$/.test(collaboratorCode)) {
    throw new Error('Invalid Collaborator Code');
  }

  return {
    name,
    email,
    message,
    gdpr: true,
    tags,
    company: str(d.company, MAX.company),
    whatsapp: str(d.whatsapp, MAX.whatsapp),
    cssMerchantId,
    collaboratorCode,
    siteUrl: str(d.siteUrl, 2048),
    geoService: str(d.geoService, 200),
    geoCity: str(d.geoCity, 100),
  };
}

// ── Email template ────────────────────────────────────────────────────────────

const TAG_LABELS: Record<ContactTag, string> = {
  css: 'CSS Entry',
  gmc: 'GMC Entsperrung',
  webDev: 'Web Development',
  geo: 'GEO',
};

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr><td style="padding:4px 12px 4px 0;color:#71717a;font-size:13px;white-space:nowrap">${esc(label)}</td><td style="padding:4px 0;font-size:13px;color:#18181b">${esc(value)}</td></tr>`;
}

function buildHtml(p: ContactPayload): string {
  const tags = p.tags.map((t) => TAG_LABELS[t]).join(', ') || '—';
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;background:#f4f4f5;margin:0;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7">
    <div style="background:#10b981;padding:24px 32px">
      <p style="margin:0;color:#fff;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase">Growline Group</p>
      <h1 style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:700">Neue Kontaktanfrage</h1>
    </div>
    <div style="padding:32px">
      <table style="border-collapse:collapse;width:100%">
        ${row('Name', p.name)}
        ${row('Unternehmen', p.company)}
        ${row('E-Mail', p.email)}
        ${row('WhatsApp', p.whatsapp)}
        ${row('Leistungen', tags)}
        ${row('CSS Merchant ID', p.cssMerchantId)}
        ${row('Website / Shop-URL', p.siteUrl)}
        ${row('Shopify Collaborator Code', p.collaboratorCode)}
        ${row('Branche', p.geoService)}
        ${row('Zielregion', p.geoCity)}
      </table>
      <hr style="margin:20px 0;border:none;border-top:1px solid #e4e4e7"/>
      <p style="margin:0 0 6px;color:#71717a;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase">Nachricht</p>
      <p style="margin:0;font-size:14px;color:#18181b;white-space:pre-wrap;line-height:1.6">${esc(p.message)}</p>
    </div>
    <div style="padding:16px 32px;background:#f4f4f5;border-top:1px solid #e4e4e7">
      <p style="margin:0;font-size:11px;color:#a1a1aa">Gesendet über growline.group · DSGVO-konform</p>
    </div>
  </div>
</body>
</html>`;
}

// ── Rate Limiting (in-memory, per IP, 5 requests per minute) ─────────────────

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  // Origin check (CSRF protection)
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://growline.group',
    'https://www.growline.group',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body: unknown = await request.json();
    const payload = validate(body);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'kontakt@growline.group';

    if (!apiKey || !toEmail) {
      if (process.env.NODE_ENV === 'production') {
        console.error('[contact/route] Missing RESEND_API_KEY or CONTACT_TO_EMAIL in production');
        return NextResponse.json({ success: false, error: 'Service temporarily unavailable' }, { status: 503 });
      }
      // Development only: log payload and simulate success
      console.log('[contact] Dev mode — submission received (no env vars set):', JSON.stringify(payload, null, 2));
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);
    const tags = payload.tags.map((t) => TAG_LABELS[t]).join(', ') || 'Keine Auswahl';

    const { error } = await resend.emails.send({
      from: `Growline Kontakt <${fromEmail}>`,
      to: [toEmail],
      replyTo: payload.email,
      subject: `Neue Anfrage von ${payload.name.replace(/[<>"]/g, '')}${payload.tags.length ? ` · ${tags}` : ''}`,
      html: buildHtml(payload),
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact/route] Error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
