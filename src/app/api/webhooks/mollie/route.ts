import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  try {
    const body = await request.formData();
    const id = body.get('id') as string;
    if (!id) {
      return NextResponse.json({ error: 'Missing payment id' }, { status: 400 });
    }

    const mollie = createMollieClient({ apiKey });
    const payment = await mollie.payments.get(id);

    console.log(`[mollie/webhook] Payment ${id}: status=${payment.status}, metadata=${JSON.stringify(payment.metadata)}`);

    // TODO: Activate CSS entry, send confirmation email, etc.

    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('[mollie/webhook] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
