import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { baseUrl } from '@/lib/config';

const PLANS = {
  beginner: { monthly: '25.00', annual: '240.00', label: 'CSS Entry – Beginner' },
  pro:      { monthly: '60.00', annual: '576.00', label: 'CSS Entry – Pro' },
  bundle:   { monthly: '135.00', annual: '1296.00', label: 'CSS Entry – Bundle' },
} as const;

type PlanKey = keyof typeof PLANS;
type Period = 'monthly' | 'annual';

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const plan = body.plan as string;
    const period = body.period as string;
    const locale = (body.locale as string) || 'de';

    if (!plan || !PLANS[plan as PlanKey]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    if (period !== 'monthly' && period !== 'annual') {
      return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
    }

    const config = PLANS[plan as PlanKey];
    const amount = config[period as Period];
    const periodLabel = period === 'annual' ? 'Jährlich' : 'Monatlich';

    const mollie = createMollieClient({ apiKey });

    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: amount },
      description: `${config.label} (${periodLabel})`,
      redirectUrl: `${baseUrl}/${locale}/checkout/success?plan=${plan}&period=${period}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: { plan, period, locale },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (err) {
    console.error('[checkout/css] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
