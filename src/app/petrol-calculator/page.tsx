import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { FAQSection } from '@/components/FAQSection';
import { CALCULATOR_PAGE_FAQS } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Petrol & Diesel Fuel Tank Fill-Up & Trip Cost Calculator Pakistan',
  description:
    'Calculate exact petrol, diesel and hi-octane fuel tank fill up cost and trip fuel consumption for cars and bikes across Pakistan with live OGRA rates.',
};

export default async function CalculatorPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 386.30;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 396.96;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Petrol Calculator</li>
        </ol>
      </nav>

      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>⚡ Live Pakistani Fuel Rate Tools</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Fuel Tank Fill-Up &amp; Trip Cost Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Plan fuel budgets for Pakistani motorbikes, hatchbacks, sedans, SUVs, and commercial vehicles with current officially verified OGRA petroleum prices.
        </p>
      </div>

      {/* Tool 1: Fuel Tank Fill-Up Cost Calculator */}
      <TankFillCalculator
        petrolPrice={petrolPrice}
        dieselPrice={dieselPrice}
        hiOctanePrice={hiOctanePrice}
      />

      {/* Tool 2: Distance & Mileage Journey Calculator */}
      <FuelCalculator
        initialPetrolPrice={petrolPrice}
        initialDieselPrice={dieselPrice}
      />

      {/* Route Distances Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-7 sm:p-9 shadow-xs space-y-5 transition-colors">
        <div>
          <h2 className="font-black text-slate-950 dark:text-white text-xl tracking-tight">
            Popular Intercity Route Distances in Pakistan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Common highway and motorway benchmark distances for calculating one-way fuel expenses.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-extrabold text-slate-950 dark:text-white block mb-0.5">Lahore to Islamabad</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">M-2 Motorway: ~375 KM</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-extrabold text-slate-950 dark:text-white block mb-0.5">Karachi to Hyderabad</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">M-9 Motorway: ~165 KM</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-extrabold text-slate-950 dark:text-white block mb-0.5">Islamabad to Peshawar</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">M-1 Motorway: ~180 KM</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-extrabold text-slate-950 dark:text-white block mb-0.5">Multan to Lahore</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">M-3/M-4 Motorway: ~340 KM</span>
          </div>
        </div>
      </div>

      {/* SEO FAQs */}
      <FAQSection
        faqs={CALCULATOR_PAGE_FAQS}
        title="Fuel Calculator FAQs"
        description="Common queries regarding vehicle fuel tank capacities, fuel economy estimation, and fuel cost computation in Pakistan."
      />
    </div>
  );
}
