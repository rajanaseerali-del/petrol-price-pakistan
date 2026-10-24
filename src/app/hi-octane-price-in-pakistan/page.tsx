import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Hi-Octane Price in Pakistan Today | PSO RON 97 Rates',
  description:
    'Current verified Hi-Octane (Octane+ Euro 5 / 97 RON) price in Pakistan published by Pakistan State Oil (PSO) and private oil marketing companies.',
};

export default async function HiOctanePage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const products = await FuelRepository.getActiveProducts();
  const hiOctane = products.find(p => p.id === 'hi-octane')!;
  const currentPrice = latestPrices['hi-octane'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-7">
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

      <div className="space-y-2 max-w-4xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
          <span>ℹ️ Deregulated Fuel Product</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
          Hi-Octane (RON 97) Price in Pakistan Today
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Unlike standard petrol, Hi-Octane (95/97 RON) was deregulated by the federal government in 2016. Oil Marketing Companies (OMCs) like PSO, Shell, and TotalEnergies set their respective prices independently based on international import premiums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PriceCard product={hiOctane} record={currentPrice} featured={true} />
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3.5 shadow-xs">
          <h2 className="font-bold text-slate-900 dark:text-white text-base">
            About PSO Octane+ Euro 5
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pakistan State Oil (PSO) publishes retail rates for Octane+ across its company-owned and dealer-operated pump network. Because Hi-Octane is deregulated, minor regional variations may occur in remote areas outside standard inland freight pools.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-950/60 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
            Verified Source: Pakistan State Oil Published Consumer POL Tariffs.
          </div>
        </div>
      </div>

      <AdPlacement slotId="hioctane-page-bottom" format="banner" />
    </div>
  );
}
