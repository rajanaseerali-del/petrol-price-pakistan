import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { FAQSection } from '@/components/FAQSection';
import { DIESEL_PAGE_FAQS } from '@/lib/faq-data';
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
  const petrolRate = latestPrices['petrol']?.pricePkr ?? 386.30;
  const dieselRate = currentPrice?.pricePkr ?? 396.96;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10 sm:space-y-16 w-full">
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

      <div className="space-y-3 sm:space-y-4 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
          <span>● High-Speed Diesel (HSD)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          High-Speed Diesel Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base lg:text-xl text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed font-medium">
          High-Speed Diesel (HSD) is the primary fuel powering heavy logistics, public transit, and agriculture in Pakistan. Rates are strictly regulated by the Oil &amp; Gas Regulatory Authority (OGRA).
        </p>
      </div>

      {/* Featured Primary Diesel Price Card */}
      <div className="w-full">
        <PriceCard product={diesel} record={currentPrice} featured={true} />
      </div>

      {/* Rate Trend Chart */}
      <div className="w-full">
        <PriceChart records={dieselHistory} productName="High-Speed Diesel (HSD)" />
      </div>

      <AdPlacement slotId="diesel-page-mid" format="banner" />

      {/* Tank Fill-up cost calculator for diesel */}
      <section className="space-y-4 sm:space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Calculate Commercial &amp; SUV Diesel Tank Fill-Up Cost
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Compute exact diesel fill-up expenses for Hilux Revo, HiAce, Fortuner, and commercial fleets.
          </p>
        </div>
        <TankFillCalculator
          petrolPrice={petrolRate}
          dieselPrice={dieselRate}
          hiOctanePrice={hiOctaneRate}
        />
      </section>

      {/* Historical revisions */}
      <section className="space-y-4 sm:space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Official Diesel Price Revisions Archive (2026)
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Fortnightly regulatory decisions notified by the Federal Ministry of Energy.
          </p>
        </div>
        <HistoricalTable records={dieselHistory} />
      </section>

      {/* Calculator */}
      <section className="space-y-4 sm:space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Commercial &amp; Freight Diesel Calculator
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Estimate diesel fuel expenses by kilometers, route distance, or volume.
          </p>
        </div>
        <FuelCalculator
          initialPetrolPrice={petrolRate}
          initialDieselPrice={dieselRate}
        />
      </section>

      {/* FAQs with SEO Schema */}
      <FAQSection
        faqs={DIESEL_PAGE_FAQS}
        title="Diesel Pricing FAQs (Pakistan)"
        description="Comprehensive answers regarding High-Speed Diesel (HSD) pricing, subsidies, and commercial freight impact."
      />
    </div>
  );
}
