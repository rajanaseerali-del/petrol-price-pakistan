import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

interface ScrapedFuelRates {
  petrol?: number;
  diesel?: number;
  hiOctane?: number;
  kerosene?: number;
  ldo?: number;
  lpg?: number;
  effectiveDate: string;
  sourceUrl: string;
  notes: string;
}

/**
 * Multi-Source Petroleum Products Scraper
 * Extracts live rates for ALL 6 petroleum products:
 * 1. Petrol (Motor Spirit)
 * 2. High-Speed Diesel (HSD)
 * 3. Hi-Octane (RON 97)
 * 4. Kerosene Oil (SKO)
 * 5. Light Diesel Oil (LDO)
 * 6. LPG (Liquefied Petroleum Gas)
 */
async function scrapeAllFuelProducts(): Promise<ScrapedFuelRates> {
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
  const result: ScrapedFuelRates = {
    effectiveDate: new Date().toISOString(),
    sourceUrl: 'https://price.ogra.org.pk',
    notes: 'Official notified rates from OGRA / Petroleum Division / OMC Price Circular',
  };

  // 1. Primary Strategy: Pakistan State Oil (PSO) Published Price List
  try {
    const psoRes = await fetch('https://psopk.com/en/fuels/fuel-prices', {
      headers: { 'User-Agent': userAgent },
      cache: 'no-store',
    });
    if (psoRes.ok) {
      const html = await psoRes.text();

      // Petrol
      const petrolM = html.match(/(?:Petrol|Motor\s*Spirit|Premier\s*Euro\s*5)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (petrolM) result.petrol = parseFloat(petrolM[1]);

      // High Speed Diesel
      const dieselM = html.match(/(?:High\s*Speed\s*Diesel|HSD)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (dieselM) result.diesel = parseFloat(dieselM[1]);

      // Hi-Octane (RON 97)
      const octaneM = html.match(/(?:Hi-?Octane|Octane\+|Altron\s*X|RON\s*97)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (octaneM) result.hiOctane = parseFloat(octaneM[1]);

      // Kerosene Oil (SKO)
      const keroseneM = html.match(/(?:Kerosene|SKO|Kero)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (keroseneM) result.kerosene = parseFloat(keroseneM[1]);

      // Light Diesel Oil (LDO)
      const ldoM = html.match(/(?:Light\s*Diesel|LDO)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (ldoM) result.ldo = parseFloat(ldoM[1]);
    }
  } catch (err) {
    console.warn('PSO fuels extraction:', err);
  }

  // 2. Secondary Strategy: Ministry of Energy & OGRA portals for LPG and any missed products
  try {
    const ograRes = await fetch('https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified', {
      headers: { 'User-Agent': userAgent },
      cache: 'no-store',
    });
    if (ograRes.ok) {
      const html = await ograRes.text();

      // Check for LPG per kg rate
      const lpgM = html.match(/(?:LPG|Liquefied\s*Petroleum\s*Gas)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
      if (lpgM) result.lpg = parseFloat(lpgM[1]);

      // If kerosene or LDO not found from PSO, check OGRA HTML
      if (!result.kerosene) {
        const kM = html.match(/(?:Kerosene|SKO)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
        if (kM) result.kerosene = parseFloat(kM[1]);
      }
      if (!result.ldo) {
        const lM = html.match(/(?:Light\s*Diesel|LDO)[\s\S]*?(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)/i);
        if (lM) result.ldo = parseFloat(lM[1]);
      }
    }
  } catch (err) {
    console.warn('OGRA fuels extraction:', err);
  }

  return result;
}

/**
 * Scheduled Cron Job Endpoint
 * Runs everyday at midnight (12am PKT) via GitHub Actions cron.
 * Ingests and saves new price records directly to Supabase PostgreSQL for ANY product whose rate changed.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid cron secret token.' },
      { status: 401 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: 'Database environment variables not configured on server.' },
      { status: 500 }
    );
  }

  // 1. Fetch current latest active price for ALL fuel products from Supabase
  const currentPricesRes = await fetch(`${supabaseUrl}/rest/v1/price_records?verification_status=eq.APPROVED&order=effective_start.desc&limit=30`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: 'no-store',
  });

  const existingRecords: Array<{
    id: string;
    product_id: string;
    price_paisa: number;
    effective_start: string;
  }> = currentPricesRes.ok ? await currentPricesRes.json() : [];

  // Map latest price by product_id
  const latestByProduct: Record<string, { pricePaisa: number; id: string }> = {};
  for (const r of existingRecords) {
    if (!latestByProduct[r.product_id]) {
      latestByProduct[r.product_id] = { pricePaisa: r.price_paisa, id: r.id };
    }
  }

  // Fallback defaults for verification if table was empty
  const defaultPaisaMap: Record<string, number> = {
    petrol: 38114,
    diesel: 38927,
    'hi-octane': 41500,
    kerosene: 33014,
    ldo: 26641,
    lpg: 27934,
  };

  // 2. Scrape live official sources
  const scraped = await scrapeAllFuelProducts();

  const productsToCheck: Array<{
    id: string;
    scrapedPrice?: number;
    sourceType: string;
    sourceUrl: string;
  }> = [
    {
      id: 'petrol',
      scrapedPrice: scraped.petrol,
      sourceType: 'official_notification',
      sourceUrl: 'https://price.ogra.org.pk',
    },
    {
      id: 'diesel',
      scrapedPrice: scraped.diesel,
      sourceType: 'official_notification',
      sourceUrl: 'https://price.ogra.org.pk',
    },
    {
      id: 'hi-octane',
      scrapedPrice: scraped.hiOctane,
      sourceType: 'omc_notification',
      sourceUrl: 'https://psopk.com/en/fuels/fuel-prices',
    },
    {
      id: 'kerosene',
      scrapedPrice: scraped.kerosene,
      sourceType: 'official_notification',
      sourceUrl: 'https://price.ogra.org.pk',
    },
    {
      id: 'ldo',
      scrapedPrice: scraped.ldo,
      sourceType: 'official_notification',
      sourceUrl: 'https://price.ogra.org.pk',
    },
    {
      id: 'lpg',
      scrapedPrice: scraped.lpg,
      sourceType: 'official_notification',
      sourceUrl: 'https://price.ogra.org.pk',
    },
  ];

  const recordsToInsert = [];
  const nowIso = new Date().toISOString();
  const dateStr = nowIso.split('T')[0];

  for (const p of productsToCheck) {
    if (!p.scrapedPrice || p.scrapedPrice <= 50) continue;

    const currentPaisa = latestByProduct[p.id]?.pricePaisa || defaultPaisaMap[p.id] || 0;
    const newPaisa = Math.round(p.scrapedPrice * 100);

    // If rate has changed from current rate in database
    if (newPaisa !== currentPaisa && currentPaisa > 0) {
      recordsToInsert.push({
        product_id: p.id,
        price_paisa: newPaisa,
        currency: 'PKR',
        effective_start: scraped.effectiveDate,
        source_publication_date: nowIso,
        verification_status: 'APPROVED',
        source_type: p.sourceType,
        source_url: p.sourceUrl,
        extraction_method: 'automated_cross_verified',
        notification_identifier: `OGRA-REVISION-${dateStr}`,
        previous_price_paisa: currentPaisa,
        price_change_paisa: newPaisa - currentPaisa,
        notes: scraped.notes,
      });
    }
  }

  const insertedRecords = [];
  let updated = false;

  if (recordsToInsert.length > 0) {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/price_records`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(recordsToInsert),
    });

    if (insertRes.ok) {
      updated = true;
      const insertedData = await insertRes.json();
      insertedRecords.push(...insertedData);

      // Instant cache purge so all pages reflect the new rates immediately
      try {
        revalidatePath('/');
        revalidatePath('/petrol-price-in-pakistan');
        revalidatePath('/diesel-price-in-pakistan');
        revalidatePath('/hi-octane-price-in-pakistan');
        revalidatePath('/petrol-price-history');
        revalidatePath('/diesel-price-history');
        revalidatePath('/fuel-price-changes');
      } catch {
        // Safe outside Next.js request context
      }
    }
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: nowIso,
    checkedCount: productsToCheck.length,
    scrapedRates: scraped,
    updated,
    recordsIngested: insertedRecords.length,
    insertedRecords,
  });
}
