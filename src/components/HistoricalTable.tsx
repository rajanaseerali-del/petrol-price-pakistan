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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400 text-base font-bold">
        No verified historical records found for this selection.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase tracking-wider text-xs sm:text-sm">
              {showProductColumn && <th className="py-4 px-5">Fuel Product</th>}
              <th className="py-4 px-5">Effective Date</th>
              <th className="py-4 px-5">Price (PKR / Unit)</th>
              <th className="py-4 px-5">Price Revision</th>
              <th className="py-4 px-5">Source Authority</th>
              <th className="py-4 px-5">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
            {records.map(record => {
              const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);
              const formattedDate = new Intl.DateTimeFormat('en-PK', {
                dateStyle: 'medium',
                timeZone: 'Asia/Karachi',
              }).format(new Date(record.effectiveStart));

              return (
                <tr key={record.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  {showProductColumn && (
                    <td className="py-4 px-5 font-black text-slate-950 dark:text-white capitalize">
                      {record.productId}
                    </td>
                  )}
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="py-4 px-5 font-black text-emerald-800 dark:text-emerald-400 whitespace-nowrap">
                    Rs. {record.pricePkr.toFixed(2)}
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    {change.direction === 'INCREASE' && (
                      <span className="inline-flex items-center gap-1 text-sm font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 px-3 py-1 rounded-xl">
                        <span>▲</span>
                        <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
                      </span>
                    )}
                    {change.direction === 'DECREASE' && (
                      <span className="inline-flex items-center gap-1 text-sm font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-xl">
                        <span>▼</span>
                        <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
                      </span>
                    )}
                    {change.direction === 'UNCHANGED' && (
                      <span className="inline-flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                        Unchanged
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <a
                      href={record.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold truncate inline-block max-w-[180px]"
                    >
                      {record.notificationIdentifier || (record.sourceType === 'OGRA_NOTIFIED' ? 'OGRA Circular' : record.sourceType === 'PSO_OFFICIAL' ? 'PSO Official' : 'Official Gazette')} ↗
                    </a>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
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
