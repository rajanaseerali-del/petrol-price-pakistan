import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FuelCalculator } from '@/components/FuelCalculator';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Petrol Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Petrol Price in Pakistan Today
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Official ex-depot consumer sale price for Motor Spirit (Super Petrol) across all filling stations in Pakistan. Regulated by OGRA and notified by the Federal Ministry of Energy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <PriceCard product={petrol} record={currentPrice} featured={true} />
        </div>
        <div className="lg:col-span-7">
          <PriceChart records={petrolHistory} productName="Petrol (Motor Spirit)" />
        </div>
      </div>

      <AdPlacement slotId="petrol-page-mid" format="banner" />

      {/* Historical revisions */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Recent Petrol Price Revisions (2026)
        </h2>
        <HistoricalTable records={petrolHistory} />
      </section>

      {/* Calculator for petrol trips */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Calculate Your Journey Petrol Cost
        </h2>
        <FuelCalculator initialPetrolPrice={currentPrice?.pricePkr ?? 390.23} />
      </section>
    </div>
  );
}
