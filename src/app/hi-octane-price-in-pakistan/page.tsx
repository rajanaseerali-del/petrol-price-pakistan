import { Metadata } from 'next';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Hi-Octane Price in Pakistan</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          <span>ℹ️ Deregulated Fuel Product</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Hi-Octane (RON 97) Price in Pakistan
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Unlike standard petrol, Hi-Octane (95/97 RON) was deregulated by the federal government in 2016. Oil Marketing Companies (OMCs) like PSO, Shell, and TotalEnergies set their respective prices independently based on international import premiums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <PriceCard product={hiOctane} record={currentPrice} />
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            About PSO Octane+ Euro 5
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pakistan State Oil (PSO) publishes retail rates for Octane+ across its company-owned and dealer-operated pump network. Because Hi-Octane is deregulated, minor regional variations may occur in remote areas outside standard inland freight pools.
          </p>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/50 text-xs text-emerald-900 font-medium">
            Verified Source: Pakistan State Oil Published Consumer POL Tariffs.
          </div>
        </div>
      </div>

      <AdPlacement slotId="hioctane-page-bottom" format="banner" />
    </div>
  );
}
