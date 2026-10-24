import React from 'react';
import { PriceRecord } from '@/types/fuel';
import { VerificationEngine } from '@/lib/verification-engine';

interface HistoricalTableProps {
  records: PriceRecord[];
  showProductColumn?: boolean;
}

export function HistoricalTable({ records, showProductColumn = false }: HistoricalTableProps) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-center text-slate-500 dark:text-slate-400 text-sm sm:text-base font-bold">
        No verified historical records found for this selection.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm sm:shadow-lg overflow-hidden transition-colors w-full">
      {/* Mobile Swipe Hint */}
      <div className="sm:hidden px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
        <span>Swipe horizontally to view full audit data</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-black">⇄ Scroll</span>
      </div>

      <div className="overflow-x-auto w-full -webkit-overflow-scrolling-touch">
        <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-black uppercase tracking-wider text-[11px] sm:text-xs">
              {showProductColumn && <th className="py-3 px-3 sm:py-4 sm:px-5">Fuel Product</th>}
              <th className="py-3 px-3 sm:py-4 sm:px-5">Effective Date</th>
              <th className="py-3 px-3 sm:py-4 sm:px-5">Price (PKR)</th>
              <th className="py-3 px-3 sm:py-4 sm:px-5">Revision</th>
              <th className="py-3 px-3 sm:py-4 sm:px-5">Source Authority</th>
              <th className="py-3 px-3 sm:py-4 sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-800 dark:text-slate-200">
            {records.map(record => {
              const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);
              const formattedDate = new Intl.DateTimeFormat('en-PK', {
                dateStyle: 'medium',
                timeZone: 'Asia/Karachi',
              }).format(new Date(record.effectiveStart));

              return (
                <tr key={record.id} className="hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition">
                  {showProductColumn && (
                    <td className="py-3 px-3 sm:py-4 sm:px-5 font-black text-slate-950 dark:text-white capitalize whitespace-nowrap">
                      {record.productId}
                    </td>
                  )}
                  <td className="py-3 px-3 sm:py-4 sm:px-5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-5 font-black text-emerald-800 dark:text-emerald-400 whitespace-nowrap text-sm sm:text-base">
                    Rs. {record.pricePkr.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-5 whitespace-nowrap">
                    {change.direction === 'INCREASE' && (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-2 py-0.5 rounded-lg">
                        <span>▲</span>
                        <span>+Rs. {change.changePkr.toFixed(2)}</span>
                      </span>
                    )}
                    {change.direction === 'DECREASE' && (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-lg">
                        <span>▼</span>
                        <span>-Rs. {Math.abs(change.changePkr).toFixed(2)}</span>
                      </span>
                    )}
                    {change.direction === 'UNCHANGED' && (
                      <span className="inline-flex items-center text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                        Unchanged
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-5">
                    <a
                      href={record.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-black truncate inline-block max-w-[140px] sm:max-w-[200px]"
                    >
                      {record.notificationIdentifier || (record.sourceType === 'OGRA_NOTIFIED' ? 'OGRA Circular' : record.sourceType === 'PSO_OFFICIAL' ? 'PSO Official' : 'Official Gazette')} ↗
                    </a>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 whitespace-nowrap">
                      ✓ {record.verificationStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
