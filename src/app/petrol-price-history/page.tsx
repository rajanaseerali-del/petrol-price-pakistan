import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoryExplorer } from '@/components/HistoryExplorer';
import { FAQSection } from '@/components/FAQSection';
import { HISTORY_PAGE_FAQS } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Fuel & Petrol Price History in Pakistan | Notifications Archive',
  description:
    'Full official historical record of Petrol, Diesel, and petroleum price changes in Pakistan. Filter revisions, effective dates, and notification archives.',
};

export default async function PetrolHistoryPage() {
  const allRevisions = await FuelRepository.getAllApprovedRevisions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">

      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          <span>📜 Historical Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Fuel Price History &amp; Revisions Archive
        </h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          Select any fuel below to view its complete historical pricing curve, chronological OGRA gazette notifications, and verified rupee adjustments.
        </p>
      </div>

      {/* Interactive History Explorer with Fuel Filter Tabs */}
      <HistoryExplorer initialFuelId="petrol" allRecords={allRevisions} />

      <AdPlacement slotId="history-mid" format="leaderboard" />

      {/* SEO FAQs */}
      <FAQSection
        faqs={HISTORY_PAGE_FAQS}
        title="Petrol History &amp; Notification FAQs"
        description="Key information regarding Pakistan's fortnightly fuel cycle, historical pricing trends, and official gazette archives."
      />
    </div>
  );
}
