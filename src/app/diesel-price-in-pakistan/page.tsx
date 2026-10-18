import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Diesel Price in Pakistan Today | Latest High-Speed Diesel (HSD) Rates',
  description:
    'Current verified High-Speed Diesel (HSD) price in Pakistan per litre. Official notifications from OGRA and Petroleum Division with historical trends.',
};

export default async function DieselPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const dieselHistory = await FuelRepository.getProductHistory('diesel');

  const diesel = products.find(p => p.id === 'diesel')!;
  const currentPrice = latestPrices['diesel'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Diesel Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          High-Speed Diesel Price in Pakistan Today
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          High-Speed Diesel (HSD) is the primary fuel powering heavy logistics, public transit, and agriculture in Pakistan. Rates are strictly regulated by the Oil &amp; Gas Regulatory Authority (OGRA).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <PriceCard product={diesel} record={currentPrice} featured={true} />
        </div>
        <div className="lg:col-span-7">
          <PriceChart records={dieselHistory} productName="High-Speed Diesel (HSD)" />
        </div>
      </div>

      <AdPlacement slotId="diesel-page-mid" format="banner" />

      {/* Historical revisions */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Official Diesel Price Revisions Archive (2026)
        </h2>
        <HistoricalTable records={dieselHistory} />
      </section>

      {/* Calculator */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Commercial &amp; Freight Diesel Calculator
        </h2>
        <FuelCalculator
          initialPetrolPrice={390.23}
          initialDieselPrice={currentPrice?.pricePkr ?? 396.96}
        />
      </section>
    </div>
  );
}
