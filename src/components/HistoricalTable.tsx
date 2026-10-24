'use client';

import React, { useState, useMemo } from 'react';
import { PriceRecord } from '@/types/fuel';
import { VerificationEngine } from '@/lib/verification-engine';

export const FUEL_OPTIONS = [
  { id: 'all', label: 'All Fuels' },
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'hi-octane', label: 'Hi-Octane' },
  { id: 'kerosene', label: 'Kerosene' },
  { id: 'ldo', label: 'Light Diesel' },
  { id: 'lpg', label: 'LPG' },
];

export const PRODUCT_LABELS: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  'hi-octane': 'Hi-Octane',
  kerosene: 'Kerosene',
  ldo: 'Light Diesel',
  lpg: 'LPG',
};

interface HistoricalTableProps {
  records: PriceRecord[];
  showProductColumn?: boolean;
  enableFuelFilter?: boolean;
  defaultFilter?: string;
}

export function HistoricalTable({
  records,
  showProductColumn = false,
  enableFuelFilter = false,
  defaultFilter = 'all',
}: HistoricalTableProps) {
  const [selectedFuel, setSelectedFuel] = useState<string>(defaultFilter);

  const filteredRecords = useMemo(() => {
    if (!enableFuelFilter || selectedFuel === 'all') {
      return records;
    }
    return records.filter(r => r.productId === selectedFuel);
  }, [records, selectedFuel, enableFuelFilter]);

  return (
    <div className="space-y-4 w-full">
      {/* Interactive Fuel Filter Bar */}
      {enableFuelFilter && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Filter by Fuel:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {FUEL_OPTIONS.map(opt => {
              const count = opt.id === 'all' 
                ? records.length 
                : records.filter(r => r.productId === opt.id).length;

              if (opt.id !== 'all' && count === 0) return null;

              const active = selectedFuel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFuel(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer select-none active:scale-95 flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      active
                        ? 'bg-emerald-800 text-emerald-100'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Table Container */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400 text-sm font-bold">
          No verified records found for {PRODUCT_LABELS[selectedFuel] || 'this fuel'}.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors w-full">
          {/* Mobile Swipe Hint */}
          <div className="sm:hidden px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Swipe horizontally to view full audit data</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-black">⇄ Scroll</span>
          </div>

          <div className="overflow-x-auto w-full -webkit-overflow-scrolling-touch">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-black uppercase tracking-wider text-[11px] sm:text-xs">
                  {showProductColumn && <th className="py-3 px-3 sm:py-3.5 sm:px-4">Fuel Product</th>}
                  <th className="py-3 px-3 sm:py-3.5 sm:px-4">Effective Date</th>
                  <th className="py-3 px-3 sm:py-3.5 sm:px-4">Price (PKR)</th>
                  <th className="py-3 px-3 sm:py-3.5 sm:px-4">Revision</th>
                  <th className="py-3 px-3 sm:py-3.5 sm:px-4">Source Authority</th>
                  <th className="py-3 px-3 sm:py-3.5 sm:px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-800 dark:text-slate-200">
                {filteredRecords.map(record => {
                  const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);
                  const formattedDate = new Intl.DateTimeFormat('en-PK', {
                    dateStyle: 'medium',
                    timeZone: 'Asia/Karachi',
                  }).format(new Date(record.effectiveStart));

                  const productName = PRODUCT_LABELS[record.productId] || record.productId;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition">
                      {showProductColumn && (
                        <td className="py-3 px-3 sm:py-3.5 sm:px-4 font-black text-slate-950 dark:text-white whitespace-nowrap">
                          {productName}
                        </td>
                      )}
                      <td className="py-3 px-3 sm:py-3.5 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-3 px-3 sm:py-3.5 sm:px-4 font-black text-emerald-800 dark:text-emerald-400 whitespace-nowrap text-sm sm:text-base">
                        Rs. {record.pricePkr.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 sm:py-3.5 sm:px-4 whitespace-nowrap">
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
                      <td className="py-3 px-3 sm:py-3.5 sm:px-4">
                        <a
                          href={record.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 dark:text-emerald-400 hover:underline font-black truncate inline-block max-w-[140px] sm:max-w-[200px]"
                        >
                          {record.notificationIdentifier || (record.sourceType === 'OGRA_NOTIFIED' ? 'OGRA Circular' : record.sourceType === 'PSO_OFFICIAL' ? 'PSO Official' : 'Official Gazette')} ↗
                        </a>
                      </td>
                      <td className="py-3 px-3 sm:py-3.5 sm:px-4">
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
      )}
    </div>
  );
}
