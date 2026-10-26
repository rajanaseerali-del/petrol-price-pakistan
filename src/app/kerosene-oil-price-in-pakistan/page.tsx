import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { TomorrowPriceEstimator } from '@/components/TomorrowPriceEstimator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
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
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const keroseneRate = currentPrice?.pricePkr ?? 330.96;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">
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

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-bold tracking-wide">
          <span>● Regulated Fuel Rate · Superior Kerosene Oil (SKO)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Kerosene Oil Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Official ex-depot consumer sale price for Kerosene across Pakistan. Regulated under the Petroleum Products Ordinance by the Oil &amp; Gas Regulatory Authority (OGRA).
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={kerosene} record={currentPrice} featured={true} />
      </div>

      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (8 cols): Trend Chart, History, Details */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Trend Chart */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Kerosene Oil Price Trend
            </h2>
            <PriceChart records={keroseneHistory} productName="Kerosene" />
          </section>

          {/* Historical revisions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Recent Kerosene Price Revisions
            </h2>
            <HistoricalTable records={keroseneHistory} />
          </section>

          {/* Kerosene Usage Note */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
            <h3 className="font-black text-slate-950 dark:text-white text-lg">
              Kerosene Regulation &amp; Subsidized Pricing
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Superior Kerosene Oil (SKO) is predominantly utilized by domestic households in rural areas and northern Pakistan for heating and cooking during winter months. It is regulated strictly by OGRA to prevent diversion and adulteration into high-speed diesel streams.
            </p>
          </div>
        </div>

        {/* Right Column (4 cols, sticky): Forecast, Tank Fill, OGRA Status */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <TomorrowPriceEstimator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
            kerosenePrice={keroseneRate}
          />
          <OgraStatusWidget products={products} latestPrices={latestPrices} />
          <AdPlacement slotId="kerosene-page-sidebar" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
