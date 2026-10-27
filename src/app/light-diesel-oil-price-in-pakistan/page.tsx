import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Light Diesel Oil (LDO) Price in Pakistan Today | Official Rates',
  description:
    'Current verified Light Diesel Oil (LDO) price in Pakistan per litre. Official notifications from OGRA and Ministry of Energy with historical revisions.',
};

export default async function LightDieselOilPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const ldoHistory = await FuelRepository.getProductHistory('ldo');

  const ldo = products.find(p => p.id === 'ldo')!;
  const currentPrice = latestPrices['ldo'];
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const ldoRate = currentPrice?.pricePkr ?? 275.24;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-bold tracking-wide">
          <span>● Regulated Fuel Rate · Light Diesel Oil (LDO)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Light Diesel Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Official ex-depot consumer sale price for Light Diesel used predominantly in agricultural tubewells, water irrigation pumps, and flour mills in Pakistan. Regulated directly by OGRA.
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={ldo} record={currentPrice} featured={true} />
      </div>

      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (8 cols): Trend Chart, History, Details */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Trend Chart */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Light Diesel Price History Trend
            </h2>
            <PriceChart records={ldoHistory} productName="Light Diesel" />
          </section>

          {/* Historical revisions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Recent Light Diesel Price Adjustments
            </h2>
            <HistoricalTable records={ldoHistory} />
          </section>

          {/* Agricultural Impact Note */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
            <h3 className="font-black text-slate-950 dark:text-white text-lg">
              Role in Pakistani Agriculture &amp; Irrigation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Light Diesel Oil (LDO) is lower speed, heavier distillation cut than High-Speed Diesel. It powers slow-speed stationary diesel engines across Punjab and Sindh farming districts. Because agriculture is the backbone of Pakistan&apos;s economy, OGRA maintains specialized freight equalization margins on LDO.
            </p>
          </div>
        </div>

        {/* Right Column (4 cols, sticky): OGRA Status */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <OgraStatusWidget products={products} latestPrices={latestPrices} />
          <AdPlacement slotId="ldo-page-sidebar" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
