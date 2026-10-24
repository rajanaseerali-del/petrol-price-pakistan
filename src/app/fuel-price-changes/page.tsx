import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';

export const metadata: Metadata = {
  title: 'Fuel Price Changes in Pakistan | Recent Increases & Decreases',
  description:
    'Track verified fuel price increases and decreases in Pakistan. Filter by fuel type to see exact price differences in PKR per litre.',
};

export default async function FuelPriceChangesPage() {
  const revisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Fuel Price Changes</li>
        </ol>
      </nav>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Fuel Price Increases &amp; Decreases in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          Exact rupee revisions calculated directly between sequential verified government notifications. Use the filter below to view changes for a specific fuel.
        </p>
      </div>

      <section className="space-y-4">
        <HistoricalTable
          records={revisions}
          showProductColumn={true}
          enableFuelFilter={true}
          defaultFilter="all"
        />
      </section>
    </div>
  );
}
