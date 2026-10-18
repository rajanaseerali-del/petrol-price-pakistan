import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Petrol Price History in Pakistan | 2026 Historical Notifications Archive',
  description:
    'Full official historical record of Petrol (Super) price changes in Pakistan. View previous revisions, effective dates, and notification documents.',
};

export default async function PetrolHistoryPage() {
  const petrolHistory = await FuelRepository.getProductHistory('petrol');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Petrol Price History</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Petrol Price History &amp; Revisions Archive
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive, non-destructive audit log of every approved and verified petrol price revision in Pakistan. Each historical record contains the effective start, source notification ID, and price differential.
        </p>
      </div>

      <PriceChart records={petrolHistory} productName="Historical Petrol" />

      <AdPlacement slotId="history-mid" format="leaderboard" />

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          All Recorded Petrol Notifications (2026)
        </h2>
        <HistoricalTable records={petrolHistory} />
      </section>
    </div>
  );
}
