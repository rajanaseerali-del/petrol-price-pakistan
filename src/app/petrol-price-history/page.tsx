import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { FAQSection } from '@/components/FAQSection';
import { HISTORY_PAGE_FAQS } from '@/lib/faq-data';
import { AdPlacement } from '@/components/AdPlacement';

export const metadata: Metadata = {
  title: 'Petrol Price History in Pakistan | 2026 Historical Notifications Archive',
  description:
    'Full official historical record of Petrol (Super) price changes in Pakistan. View previous revisions, effective dates, and notification documents.',
};

export default async function PetrolHistoryPage() {
  const petrolHistory = await FuelRepository.getProductHistory('petrol');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Petrol Price History</li>
        </ol>
      </nav>

      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black tracking-wide">
          <span>📜 Historical Data Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Petrol Price History &amp; Revisions Archive
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          Comprehensive, non-destructive audit log of every approved and verified petrol price revision in Pakistan. Each historical record contains the effective start, source notification ID, and price differential.
        </p>
      </div>

      <PriceChart records={petrolHistory} productName="Historical Petrol" />

      <AdPlacement slotId="history-mid" format="leaderboard" />

      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            All Recorded Petrol Notifications (2026)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chronological audit archive of signed notifications and gazette circulars.
          </p>
        </div>
        <HistoricalTable records={petrolHistory} />
      </section>

      {/* SEO FAQs */}
      <FAQSection
        faqs={HISTORY_PAGE_FAQS}
        title="Petrol History &amp; Notification FAQs"
        description="Key information regarding Pakistan's fortnightly fuel cycle, historical pricing trends, and official gazette archives."
      />
    </div>
  );
}
