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
  title: 'Hi-Octane Price in Pakistan Today | PSO RON 97 Rates',
  description:
    'Current verified Hi-Octane (Octane+ Euro 5 / 97 RON) price in Pakistan published by Pakistan State Oil (PSO) and private oil marketing companies.',
};

export default async function HiOctanePage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const hiOctaneHistory = await FuelRepository.getProductHistory('hi-octane');
  const hiOctane = products.find(p => p.id === 'hi-octane')!;
  const currentPrice = latestPrices['hi-octane'];
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 377.71;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 393.66;
  const hiOctaneRate = currentPrice?.pricePkr ?? 415.00;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Hi-Octane Price in Pakistan</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
          <span>⚡ Premium Fuel · Deregulated High-Octane (RON 97)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Hi-Octane Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Unlike standard petrol, Hi-Octane (95/97 RON) was deregulated by the federal government in 2016. Oil Marketing Companies (OMCs) like PSO, Shell, and TotalEnergies set their respective prices independently based on international import premiums.
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={hiOctane} record={currentPrice} featured={true} />
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Trend Chart */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Hi-Octane Price History Trend
            </h2>
            <PriceChart records={hiOctaneHistory} productName="Hi-Octane" />
          </section>

          {/* Historical Table */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Recent Hi-Octane Rate Adjustments
            </h2>
            <HistoricalTable records={hiOctaneHistory} />
          </section>

          {/* About Octane Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
            <h3 className="font-black text-slate-900 dark:text-white text-lg">
              Understanding PSO Octane+ Euro 5 in Pakistan
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Pakistan State Oil (PSO) publishes retail rates for Octane+ across its company-owned and dealer-operated pump network. Because Hi-Octane is deregulated, minor regional variations may occur in remote areas outside standard inland freight pools. High compression engines and turbocharged vehicles typically require RON 95 or RON 97 to avoid engine knocking.
            </p>
          </div>
        </div>

        {/* Sidebar Column (4 cols, sticky) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <TomorrowPriceEstimator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
          />
          <TankFillCalculator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
          />
          <OgraStatusWidget products={products} latestPrices={latestPrices} />
          <AdPlacement slotId="hioctane-sidebar" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
