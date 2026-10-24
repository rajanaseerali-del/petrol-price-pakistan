import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Kerosene Oil Price in Pakistan Today | Superior Kerosene (SKO) Rates',
  description:
    'Current verified Superior Kerosene Oil (SKO) price in Pakistan per litre. Official notifications from OGRA and Petroleum Division with historical trends.',
};

export default async function KerosenePage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const keroseneHistory = await FuelRepository.getProductHistory('kerosene');

  const kerosene = products.find(p => p.id === 'kerosene')!;
  const currentPrice = latestPrices['kerosene'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-7">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Kerosene Oil Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-2 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-bold tracking-wide">
          <span>● Regulated Fuel Rate</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
          Kerosene Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Official ex-depot consumer sale price for Kerosene across Pakistan. Regulated under the Petroleum Products Ordinance by the Oil &amp; Gas Regulatory Authority (OGRA).
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={kerosene} record={currentPrice} featured={true} />
      </div>

      {/* Trend Chart */}
      <div className="w-full">
        <PriceChart records={keroseneHistory} productName="Kerosene" />
      </div>

      <AdPlacement slotId="kerosene-page-mid" format="banner" />

      {/* Historical revisions */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Official Kerosene Oil Price Revisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Fortnightly regulatory decisions notified by the Federal Ministry of Energy and OGRA.
          </p>
        </div>
        <HistoricalTable records={keroseneHistory} />
      </section>
    </div>
  );
}
