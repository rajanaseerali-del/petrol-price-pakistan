import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { TomorrowPriceEstimator } from '@/components/TomorrowPriceEstimator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { getDieselPageFaqs } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Diesel Price in Pakistan Today | Latest Official Rates',
  description:
    'Current verified Diesel price in Pakistan per litre. Official notifications from OGRA and Petroleum Division with historical trends.',
};

export default async function DieselPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const dieselHistory = await FuelRepository.getProductHistory('diesel');

  const diesel = products.find(p => p.id === 'diesel')!;
  const currentPrice = latestPrices['diesel'];
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselRate = currentPrice?.pricePkr ?? 395.82;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const dieselFaqs = getDieselPageFaqs(dieselRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Diesel Price in Pakistan</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>● Regulated Fuel Rate · High Speed Diesel (Euro 5)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Diesel Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          Diesel is the primary fuel powering heavy logistics, public transit, and commercial passenger vehicles in Pakistan. Regulated by OGRA and notified by the Federal Ministry of Energy.
        </p>
      </div>

      {/* Featured Primary Diesel Price Card */}
      <div className="w-full">
        <PriceCard product={diesel} record={currentPrice} featured={true} />
      </div>

      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (8 cols): Trend Chart, History, Calculator, FAQs */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Rate Trend Chart */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Diesel Price Trend (2026)
            </h2>
            <PriceChart records={dieselHistory} productName="Diesel" />
          </section>

          {/* Historical revisions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Recent Diesel Price Revisions
            </h2>
            <HistoricalTable records={dieselHistory} />
          </section>

          {/* Calculator for diesel trips */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Calculate Journey Diesel Consumption &amp; Cost
            </h2>
            <FuelCalculator
              initialPetrolPrice={petrolRate}
              initialDieselPrice={dieselRate}
              initialHiOctanePrice={hiOctaneRate}
            />
          </section>

          {/* FAQs with SEO Schema */}
          <FAQSection
            faqs={dieselFaqs}
            title="Diesel Pricing FAQs (Pakistan)"
            description="Detailed explanations of how high-speed diesel prices are determined by OGRA, OMC distribution margins, and levy rates."
          />
        </div>

        {/* Right Column (4 cols, sticky): Forecast, Tank Fill, OGRA Status */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Tomorrow Forecast */}
          <TomorrowPriceEstimator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
          />

          {/* Tank Fill Calculator */}
          <TankFillCalculator
            petrolPrice={petrolRate}
            dieselPrice={dieselRate}
            hiOctanePrice={hiOctaneRate}
          />

          {/* OGRA Verification Status */}
          <OgraStatusWidget products={products} latestPrices={latestPrices} />

          <AdPlacement slotId="diesel-page-sidebar" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
