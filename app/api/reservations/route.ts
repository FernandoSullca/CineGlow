import { NextResponse } from 'next/server';

export async function POST() {
  // BFF: delegar a services/booking.service
  return NextResponse.json({ ok: true });
}
