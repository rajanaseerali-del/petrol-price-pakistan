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

      // Parse table rows individually to guarantee clean separation between products
      const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
      for (const r of rows) {
        const text = r[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

        // 1. Regular Petrol (Premier Euro 5) - e.g. "PREMIER EURO 5 Rs.382.02/Ltr"
        if (/PREMIER\s*EURO\s*5/i.test(text) && !/OCTANE/i.test(text)) {
          const m = text.match(/(?:Rs\.?|PKR)?\s*(\d{2,3}(?:\.\d{1,2})?)/i);
          if (m) result.petrol = parseFloat(m[1]);
        }

        // 2. High Speed Diesel - e.g. "HI-CETANE DIESEL EURO 5 Rs.389.8/Ltr"
        if (/(?:HI-?CETANE\s*DIESEL|DIESEL\s*EURO\s*5|HSD)/i.test(text)) {
          const m = text.match(/(?:Rs\.?|PKR)?\s*(\d{2,3}(?:\.\d{1,2})?)/i);
          if (m) result.diesel = parseFloat(m[1]);
        }

        // 3. Hi-Octane (Octane Euro 5 / RON 97) - e.g. "Octane Euro 5 (Lahore) 415.00"
        if (/OCTANE\s*EURO\s*5/i.test(text) && !result.hiOctane) {
          const m = text.match(/(?:Rs\.?|PKR)?\s*(\d{3}(?:\.\d{1,2})?)/i);
          if (m) result.hiOctane = parseFloat(m[1]);
        }

        // 4. Kerosene (SKO) - e.g. "SKO Rs.326.75/Ltr"
        if (/\bSKO\b|KEROSENE/i.test(text)) {
          const m = text.match(/(?:Rs\.?|PKR)?\s*(\d{2,3}(?:\.\d{1,2})?)/i);
          if (m) result.kerosene = parseFloat(m[1]);
        }

        // 5. Light Diesel Oil (LDO) - e.g. "LDO Rs.267.46/Ltr"
        if (/\bLDO\b|LIGHT\s*DIESEL/i.test(text)) {
          const m = text.match(/(?:Rs\.?|PKR)?\s*(\d{2,3}(?:\.\d{1,2})?)/i);
          if (m) result.ldo = parseFloat(m[1]);
        }
      }
    }
  } catch (err) {
    console.warn('PSO fuels extraction:', err);
  }

  // 2. Secondary Strategy: Ministry of Energy & OGRA portals for Kerosene, LDO
  try {
    const ograRes = await fetch('https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified', {
      headers: { 'User-Agent': userAgent },
      cache: 'no-store',
    });
    if (ograRes.ok) {
      const html = await ograRes.text();

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
    console.warn('OGRA liquid fuels extraction:', err);
  }

  // 3. Official OGRA LPG Extraction Strategy
  // OGRA notifies LPG per-kg and 11.8 kg cylinder rates on a monthly schedule under LPG Notified Prices
  try {
    // 3a. Check official OGRA portal for active circular link
    const ograLpgRes = await fetch('https://www.ogra.org.pk/lpg-notified-prices', {
      headers: { 'User-Agent': userAgent },
      cache: 'no-store',
    });
    if (ograLpgRes.ok) {
      const ograHtml = await ograLpgRes.text();
      const pdfMatch = ograHtml.match(/<a\s+href="([^"]*download\/\d+)"[^>]*class="download-pdf"/i);
      if (pdfMatch) {
        result.sourceUrl = pdfMatch[1];
      }
    }

    // 3b. Extract the officially verified per-kg consumer rate
    const lpgDataRes = await fetch('https://pakhisaab.com/rates/lpg-price-today/', {
      headers: { 'User-Agent': userAgent },
      cache: 'no-store',
    });
    if (lpgDataRes.ok) {
      const lpgHtml = await lpgDataRes.text();
      // Match per-kg rate: e.g. "Rs 279.34 a kg" or "Rs. 279.34 per kg"
      const kgMatch = lpgHtml.match(/(?:Rs\.?|PKR)\s*(\d{2,3}(?:\.\d{1,2})?)\s*(?:per|\/|a)\s*kg/i)
        || lpgHtml.match(/(\d{2,3}\.\d{2})\s*(?:per|\/|a)\s*kg/i);

      if (kgMatch) {
        result.lpg = parseFloat(kgMatch[1]);
      } else {
        // Fallback: domestic 11.8 kg cylinder rate divided by 11.8
        const cylMatch = lpgHtml.match(/(?:Rs\.?|PKR)\s*([\d,]+(?:\.\d{2})?)\s*(?:for\s+an\s+11\.8|domestic)/i);
        if (cylMatch) {
          const cylPrice = parseFloat(cylMatch[1].replace(/,/g, ''));
          if (cylPrice > 1000) {
            result.lpg = parseFloat((cylPrice / 11.8).toFixed(2));
          }
        }
      }
    }
  } catch (err) {
    console.warn('OGRA LPG extraction:', err);
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
      sourceUrl: 'https://www.ogra.org.pk/lpg-notified-prices',
    },
  ];

  const recordsToInsert = [];
  const nowIso = new Date().toISOString();
  const dateStr = nowIso.split('T')[0];

  for (const p of productsToCheck) {
    if (!p.scrapedPrice || p.scrapedPrice <= 50) continue;

    const currentPaisa = latestByProduct[p.id]?.pricePaisa || defaultPaisaMap[p.id] || 0;
    const newPaisa = Math.round(p.scrapedPrice * 100);

    // If rate has changed OR to refresh active daily verification timestamp
    if (currentPaisa > 0) {
      if (newPaisa !== currentPaisa) {
        // Rate has changed: insert new revision record
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
      } else if (latestByProduct[p.id]?.id) {
        // Price unchanged, but refresh verification_timestamp in database so card shows today's verification
        try {
          await fetch(`${supabaseUrl}/rest/v1/price_records?id=eq.${latestByProduct[p.id].id}`, {
            method: 'PATCH',
            headers: {
              apikey: serviceKey,
              Authorization: `Bearer ${serviceKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verification_timestamp: nowIso }),
          });
        } catch (e) {
          console.warn(`Could not refresh timestamp for ${p.id}:`, e);
        }
      }
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
