import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';

export const metadata: Metadata = {
  title: 'Fuel Price Changes in Pakistan | Recent Increases & Decreases',
  description:
    'Track verified fuel price increases and decreases in Pakistan. Calculated exact price differences in PKR per litre.',
};

export default async function FuelPriceChangesPage() {
  const revisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Fuel Price Changes</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Fuel Price Increases &amp; Decreases in Pakistan
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Exact rupee revisions calculated directly between sequential verified government notifications. No artificial estimates or unverified claims.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Verified Revision Log
        </h2>
        <HistoricalTable records={revisions} showProductColumn={true} />
      </section>
    </div>
  );
}
