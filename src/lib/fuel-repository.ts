import { PriceRecord, FuelProduct } from '@/types/fuel';
import ARCHIVE_DATA from './fuel-data-archive.json';

/**
 * Fuel Data Store
 * Dynamically queries Supabase REST API with zero-delay fallback to verified 2026 archive.
 */

export const INITIAL_PRODUCTS: FuelProduct[] = [
  {
    id: 'petrol',
    displayName: 'Petrol (Super / Motor Spirit)',
    displayNameUr: 'پیٹرول',
    slug: 'petrol-price-in-pakistan',
    unit: 'Litre',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'diesel',
    displayName: 'High-Speed Diesel (HSD)',
    displayNameUr: 'ہائی اسپیڈ ڈیزل',
    slug: 'diesel-price-in-pakistan',
    unit: 'Litre',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'hi-octane',
    displayName: 'Hi-Octane RON 97 (Octane+)',
    displayNameUr: 'ہائی اوکٹین',
    slug: 'hi-octane-price-in-pakistan',
    unit: 'Litre',
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'kerosene',
    displayName: 'Kerosene Oil (SKO)',
    displayNameUr: 'مٹی کا تیل',
    slug: 'kerosene-oil-price-in-pakistan',
    unit: 'Litre',
    isActive: true,
    displayOrder: 4,
  },
  {
    id: 'ldo',
    displayName: 'Light Diesel Oil (LDO)',
    displayNameUr: 'لائٹ ڈیزل آئل',
    slug: 'light-diesel-oil-price-in-pakistan',
    unit: 'Litre',
    isActive: true,
    displayOrder: 5,
  },
  {
    id: 'lpg',
    displayName: 'LPG (Liquefied Petroleum Gas)',
    displayNameUr: 'ایل پی جی',
    slug: 'lpg-price-in-pakistan',
    unit: 'kg',
    isActive: true,
    displayOrder: 6,
  },
];

export const INITIAL_PRICE_RECORDS: PriceRecord[] = ARCHIVE_DATA as PriceRecord[];

export class FuelRepository {
  private static cachedRecords: PriceRecord[] = [...INITIAL_PRICE_RECORDS];
  private static lastFetchTime = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static mapDbRecord(r: any): PriceRecord {
    return {
      id: r.id,
      productId: r.product_id,
      pricePaisa: r.price_paisa,
      pricePkr: Number((r.price_paisa / 100).toFixed(2)),
      currency: 'PKR',
      effectiveStart: r.effective_start,
      effectiveEnd: r.effective_end || null,
      sourcePublicationDate: r.source_publication_date || r.effective_start,
      verificationTimestamp: r.verification_timestamp || r.created_at,
      sourceUrl: r.source_url || 'https://price.ogra.org.pk',
      sourceType: (r.source_type || 'OGRA_NOTIFIED').toUpperCase().includes('PSO') ? 'PSO_OFFICIAL' : 'OGRA_NOTIFIED',
      extractionMethod: 'PORTAL_AUTOMATED',
      verificationStatus: 'APPROVED',
      notificationIdentifier: r.notification_identifier || 'OGRA-2026',
      previousPricePaisa: r.previous_price_paisa || null,
      priceChangePaisa: r.price_change_paisa !== undefined ? r.price_change_paisa : null,
      notes: r.notes || '',
    };
  }

  private static async fetchAllRecords(): Promise<PriceRecord[]> {
    const now = Date.now();
    // In-memory cache for 10s during SSR / SSG
    if (this.cachedRecords.length > 0 && now - this.lastFetchTime < 10000) {
      return this.cachedRecords;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && anonKey && !supabaseUrl.includes('your-project')) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/price_records?verification_status=eq.APPROVED&order=effective_start.desc`, {
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            this.cachedRecords = data.map(this.mapDbRecord);
            this.lastFetchTime = now;
            return this.cachedRecords;
          }
        }
      } catch (err) {
        console.warn('Supabase fetch fallback to local 2026 archive:', err);
      }
    }

    return this.cachedRecords;
  }

  static async getActiveProducts(): Promise<FuelProduct[]> {
    return INITIAL_PRODUCTS.filter(p => p.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getLatestPrices(): Promise<Record<string, PriceRecord>> {
    const records = await this.fetchAllRecords();
    const latest: Record<string, PriceRecord> = {};
    for (const p of INITIAL_PRODUCTS) {
      const productRecords = records
        .filter(r => r.productId === p.id && r.verificationStatus === 'APPROVED')
        .sort((a, b) => new Date(b.effectiveStart).getTime() - new Date(a.effectiveStart).getTime());

      if (productRecords.length > 0) {
        latest[p.id] = productRecords[0];
      }
    }
    return latest;
  }

  static async getProductHistory(productId: string): Promise<PriceRecord[]> {
    const records = await this.fetchAllRecords();
    return records
      .filter(r => r.productId === productId && r.verificationStatus === 'APPROVED')
      .sort((a, b) => new Date(b.effectiveStart).getTime() - new Date(a.effectiveStart).getTime());
  }

  static async getAllApprovedRevisions(): Promise<PriceRecord[]> {
    const records = await this.fetchAllRecords();
    return records
      .filter(r => r.verificationStatus === 'APPROVED')
      .sort((a, b) => new Date(b.effectiveStart).getTime() - new Date(a.effectiveStart).getTime());
  }
}
