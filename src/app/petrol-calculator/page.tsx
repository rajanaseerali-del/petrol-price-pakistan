import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';
import { FuelCalculator } from '@/components/FuelCalculator';

export const metadata: Metadata = {
  title: 'Petrol & Diesel Trip Cost Calculator Pakistan | Fuel Mileage Estimates',
  description:
    'Calculate exact petrol and diesel fuel cost for trips across Pakistan. Free calculator with customized vehicle mileage and official notified prices.',
};

export default async function CalculatorPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 390.23;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 396.96;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Petrol Calculator</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Fuel &amp; Trip Cost Calculator Pakistan
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Plan journey expenses for motorbikes, sedans, SUVs, and commercial vehicles with current notified Pakistani fuel rates.
        </p>
      </div>

      <FuelCalculator
        initialPetrolPrice={petrolPrice}
        initialDieselPrice={dieselPrice}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Popular Route Distances in Pakistan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Lahore to Islamabad</span>
            <span className="text-slate-500">M-2 Motorway: ~375 KM</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Karachi to Hyderabad</span>
            <span className="text-slate-500">M-9 Motorway: ~165 KM</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Islamabad to Peshawar</span>
            <span className="text-slate-500">M-1 Motorway: ~180 KM</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-900 block">Multan to Lahore</span>
            <span className="text-slate-500">M-3/M-4 Motorway: ~340 KM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
