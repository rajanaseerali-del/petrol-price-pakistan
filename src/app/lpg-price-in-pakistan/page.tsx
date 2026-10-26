import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { TomorrowPriceEstimator } from '@/components/TomorrowPriceEstimator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'LPG Price in Pakistan Today | Official OGRA Cylinder & Per KG Rates',
  description:
    'Current verified Liquefied Petroleum Gas (LPG) consumer price in Pakistan per kg and 11.8kg domestic cylinder. Official monthly notifications from OGRA.',
};

export default async function LPGPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const lpgHistory = await FuelRepository.getProductHistory('lpg');

  const lpg = products.find(p => p.id === 'lpg')!;
  const currentPrice = latestPrices['lpg'];
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const lpgRate = currentPrice?.pricePkr ?? 279.34;
  const domesticCylinderCost = (lpgRate * 11.8).toFixed(2);
  const commercialCylinderCost = (lpgRate * 45.4).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">LPG Price in Pakistan</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-bold tracking-wide">
          <span>● Regulated LPG Rate · Monthly OGRA Notification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          LPG Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Official maximum consumer retail price for Liquefied Petroleum Gas (LPG) in Pakistan. Notified on a monthly basis by the Oil &amp; Gas Regulatory Authority (OGRA).
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={lpg} record={currentPrice} featured={true} />
      </div>

      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (8 cols): Cylinder Breakdown, Trend Chart, History */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Cylinder Sizes Pricing Grid */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
            <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Official Cylinder Price Breakdown (OGRA Notified)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Domestic Cylinder (11.8 KG)
                </span>
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">Rs.</span>
                  <span className="text-3xl font-mono font-black text-slate-950 dark:text-white">{domesticCylinderCost}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard household cylinder used across residential Pakistan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Commercial Cylinder (45.4 KG)
                </span>
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">Rs.</span>
                  <span className="text-3xl font-mono font-black text-slate-950 dark:text-white">{commercialCylinderCost}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Heavy commercial cylinder for restaurants and catering businesses.
                </p>
              </div>
            </div>
          </section>

          {/* Trend Chart */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              LPG Price History Trend
            </h2>
            <PriceChart records={lpgHistory} productName="LPG" />
          </section>

          {/* Historical revisions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Monthly OGRA LPG Notifications
            </h2>
            <HistoricalTable records={lpgHistory} />
          </section>
        </div>

        {/* Right Column (4 cols, sticky): Forecast, OGRA Status */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <TomorrowPriceEstimator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
            lpgPrice={lpgRate}
          />
          <OgraStatusWidget products={products} latestPrices={latestPrices} />
          <AdPlacement slotId="lpg-page-sidebar" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
