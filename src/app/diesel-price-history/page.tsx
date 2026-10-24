import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoryExplorer } from '@/components/HistoryExplorer';

export const metadata: Metadata = {
  title: 'Diesel Price History in Pakistan | Official Revisions Archive',
  description:
    'Full official historical record of Diesel price changes in Pakistan. View previous revisions, effective dates, and OGRA notifications.',
};

export default async function DieselHistoryPage() {
  const allRevisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Diesel Price History</li>
        </ol>
      </nav>

      <div className="space-y-2 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>📜 Historical Data Ledger</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Diesel Price History &amp; Revisions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          Historical analysis and verified regulatory notifications for Diesel in Pakistan. Filter by fuel to compare trends.
        </p>
      </div>

      <HistoryExplorer initialFuelId="diesel" allRecords={allRevisions} />
    </div>
  );
}
