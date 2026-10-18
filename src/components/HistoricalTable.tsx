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
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
        No verified historical records found for this selection.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              {showProductColumn && <th className="py-3 px-4">Fuel Product</th>}
              <th className="py-3 px-4">Effective Date</th>
              <th className="py-3 px-4">Price (PKR / Litre)</th>
              <th className="py-3 px-4">Price Revision</th>
              <th className="py-3 px-4">Verification Source</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
            {records.map(record => {
              const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);
              const formattedDate = new Intl.DateTimeFormat('en-PK', {
                dateStyle: 'medium',
                timeZone: 'Asia/Karachi',
              }).format(new Date(record.effectiveStart));

              return (
                <tr key={record.id} className="hover:bg-slate-50/60 transition">
                  {showProductColumn && (
                    <td className="py-3.5 px-4 font-bold text-slate-900 capitalize">
                      {record.productId}
                    </td>
                  )}
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {formattedDate}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Rs. {record.pricePkr.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    {change.direction === 'INCREASE' && (
                      <span className="text-rose-700 font-bold">
                        ▲ +Rs. {change.changePkr.toFixed(2)}
                      </span>
                    )}
                    {change.direction === 'DECREASE' && (
                      <span className="text-emerald-700 font-bold">
                        ▼ -Rs. {Math.abs(change.changePkr).toFixed(2)}
                      </span>
                    )}
                    {change.direction === 'UNCHANGED' && (
                      <span className="text-slate-400">Unchanged</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={record.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 underline font-medium truncate inline-block max-w-[150px]"
                    >
                      {record.notificationIdentifier || record.sourceType}
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
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
