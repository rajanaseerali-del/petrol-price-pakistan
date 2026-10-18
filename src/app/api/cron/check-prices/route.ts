import { NextRequest, NextResponse } from 'next/server';
import { OgraSourceAdapter, PetroleumDivisionSourceAdapter, PsoSourceAdapter } from '@/lib/source-adapters';
/**
 * Scheduled Cron Job Endpoint
 * Can be triggered periodically via Vercel Cron or GitHub Actions.
 * Secured via CRON_SECRET authorization header.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // In production, enforce secret token
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid cron secret token.' },
      { status: 401 }
    );
  }

  const ograAdapter = new OgraSourceAdapter();
  const petAdapter = new PetroleumDivisionSourceAdapter();
  const psoAdapter = new PsoSourceAdapter();

  // Run all adapters concurrently
  const [ograResult, petResult, psoResult] = await Promise.all([
    ograAdapter.checkAndExtract(),
    petAdapter.checkAndExtract(),
    psoAdapter.checkAndExtract(),
  ]);

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    results: {
      ogra: ograResult,
      petroleumDivision: petResult,
      pso: psoResult,
    },
  });
}
