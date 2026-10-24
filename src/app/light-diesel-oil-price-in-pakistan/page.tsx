import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-7">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Light Diesel Oil Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-2 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 text-xs font-bold tracking-wide">
          <span>● Light Diesel Oil (LDO)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
          Light Diesel Oil (LDO) Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Official ex-depot consumer sale price for Light Diesel Oil (LDO) used in agricultural tubewells and flour mills in Pakistan. Regulated directly by OGRA.
        </p>
      </div>

      {/* Featured Price Card */}
      <div className="w-full">
        <PriceCard product={ldo} record={currentPrice} featured={true} />
      </div>

      {/* Trend Chart */}
      <div className="w-full">
        <PriceChart records={ldoHistory} productName="Light Diesel Oil (LDO)" />
      </div>

      <AdPlacement slotId="ldo-page-mid" format="banner" />

      {/* Historical revisions */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Official Light Diesel Oil (LDO) Revisions Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Fortnightly regulatory notifications notified by the Federal Ministry of Energy.
          </p>
        </div>
        <HistoricalTable records={ldoHistory} />
      </section>
    </div>
  );
}
