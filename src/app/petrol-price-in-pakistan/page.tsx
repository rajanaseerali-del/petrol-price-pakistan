import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { FAQSection } from '@/components/FAQSection';
import { getPetrolPageFaqs } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Petrol Price in Pakistan Today | Latest Motor Gasoline Rates',
  description:
    'Current verified Petrol (Motor Spirit / Super) price in Pakistan per litre. View price breakdown, recent government increases/decreases, and historical revisions.',
};

export default async function PetrolPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');

  const petrol = products.find(p => p.id === 'petrol')!;
  const currentPrice = latestPrices['petrol'];
  const petrolRate = currentPrice?.pricePkr ?? 377.71;
  const dieselRate = latestPrices['diesel']?.pricePkr ?? 393.66;
  const hiOctaneRate = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const petrolFaqs = getPetrolPageFaqs(petrolRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Petrol Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-2 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>● Regulated Fuel Rate</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Petrol Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">
          Official ex-depot consumer sale price for Petrol across all filling stations in Pakistan. Regulated by OGRA and notified by the Federal Ministry of Energy.
        </p>
      </div>

      {/* Featured Primary Price Card */}
      <div className="w-full">
        <PriceCard product={petrol} record={currentPrice} featured={true} />
      </div>

      {/* Rate Trend Chart */}
      <div className="w-full">
        <PriceChart records={petrolHistory} productName="Petrol" />
      </div>

      <AdPlacement slotId="petrol-page-mid" format="banner" />

      {/* Tank Fill-up cost calculator for petrol */}
      <section className="space-y-4 sm:space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Calculate Petrol Tank Fill-Up Cost
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Choose your vehicle model to compute total tank fill cost and quarter top-off rates at today&apos;s petrol price.
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
            Recent Petrol Price Revisions (2026)
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Official chronological history of government notifications and price adjustments.
          </p>
        </div>
        <HistoricalTable records={petrolHistory} />
      </section>

      {/* Calculator for petrol trips */}
      <section className="space-y-4 sm:space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Calculate Your Journey Petrol Cost
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 font-medium">
            Plan city and highway trips based on verified per-litre petrol rates.
          </p>
        </div>
        <FuelCalculator
          initialPetrolPrice={petrolRate}
          initialDieselPrice={dieselRate}
        />
      </section>

      {/* FAQs with SEO Schema */}
      <FAQSection
        faqs={petrolFaqs}
        title="Petrol Pricing FAQs (Pakistan)"
        description="Detailed answers on how petrol is taxed, petroleum levy rates, and fortnightly revisions by OGRA."
      />
    </div>
  );
}
