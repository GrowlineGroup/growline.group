import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { baseUrl } from '@/lib/config';

const PACKAGES = {
  starter: { amount: '100.00', label: 'GEO – Einstieg (monatlich)' },
  growth:  { amount: '500.00', label: 'GEO – Wachstum (monatlich)' },
} as const;

type PackageKey = keyof typeof PACKAGES;

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const pkg = body.package as string;
    const locale = (body.locale as string) || 'de';

    if (!pkg || !PACKAGES[pkg as PackageKey]) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    const config = PACKAGES[pkg as PackageKey];
    const mollie = createMollieClient({ apiKey });

    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: config.amount },
      description: config.label,
      redirectUrl: `${baseUrl}/${locale}/checkout/success?service=geo&package=${pkg}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: { service: 'geo', package: pkg, locale },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (err) {
    console.error('[checkout/geo] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
