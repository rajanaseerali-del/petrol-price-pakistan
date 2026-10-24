import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';

export const metadata: Metadata = {
  title: 'Diesel Price History in Pakistan | High-Speed Diesel Revisions',
  description:
    'Full official historical record of High-Speed Diesel (HSD) price changes in Pakistan. View historical rate fluctuations and OGRA circulars.',
};

export default async function DieselHistoryPage() {
  const dieselHistory = await FuelRepository.getProductHistory('diesel');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Diesel Price History</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          High-Speed Diesel (HSD) Price History
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          Historical analysis and verified regulatory circulars for High-Speed Diesel revisions in Pakistan.
        </p>
      </div>

      <PriceChart records={dieselHistory} productName="Historical Diesel (HSD)" />

      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          All Recorded Diesel Notifications (2026)
        </h2>
        <HistoricalTable records={dieselHistory} />
      </section>
    </div>
  );
}
