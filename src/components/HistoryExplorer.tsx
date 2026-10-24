'use client';

import React, { useState, useMemo } from 'react';
import { PriceRecord } from '@/types/fuel';
import { PriceChart } from '@/components/PriceChart';
import { HistoricalTable, PRODUCT_LABELS } from '@/components/HistoricalTable';

interface HistoryExplorerProps {
  initialFuel?: string;
  initialFuelId?: string;
  allRecords: PriceRecord[];
}

const FUEL_TABS = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'hi-octane', label: 'Hi-Octane' },
  { id: 'kerosene', label: 'Kerosene' },
  { id: 'ldo', label: 'Light Diesel' },
  { id: 'lpg', label: 'LPG' },
];

export function HistoryExplorer({ initialFuel = 'petrol', initialFuelId, allRecords }: HistoryExplorerProps) {
  const [activeFuel, setActiveFuel] = useState<string>(initialFuelId || initialFuel);

  const filteredRecords = useMemo(() => {
    return allRecords
      .filter(r => r.productId === activeFuel)
      .sort((a, b) => new Date(b.effectiveStart).getTime() - new Date(a.effectiveStart).getTime());
  }, [allRecords, activeFuel]);

  const fuelName = PRODUCT_LABELS[activeFuel] || activeFuel;

  // Key stats for the selected fuel
  const stats = useMemo(() => {
    if (filteredRecords.length === 0) return null;
    const prices = filteredRecords.map(r => r.pricePkr);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const latest = filteredRecords[0]?.pricePkr;
    return { max, min, latest, count: filteredRecords.length };
  }, [filteredRecords]);

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Fuel Selection Tabs */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
              Historical Fuel Selector
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Select a fuel to view its price chart, highest/lowest rates, and chronological revisions.
            </p>
          </div>
          {stats && (
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg shrink-0">
              {stats.count} Notifications Archived
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {FUEL_TABS.map(tab => {
            const active = activeFuel === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFuel(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer select-none active:scale-95 ${
                  active
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuel Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block">
              Current Rate ({fuelName})
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              Rs. {stats.latest?.toFixed(2)}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block">
              2026 Peak Rate
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
              Rs. {stats.max?.toFixed(2)}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block">
              2026 Lowest Rate
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
              Rs. {stats.min?.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Price Chart */}
      <div className="w-full">
        <PriceChart records={filteredRecords} productName={`${fuelName} Historical Price`} />
      </div>

      {/* Table Section */}
      <div className="space-y-3">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between items-baseline">
          <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
            Official Revisions for {fuelName} (2026)
          </h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Chronological Audit Log
          </span>
        </div>
        <HistoricalTable records={filteredRecords} showProductColumn={false} />
      </div>
    </div>
  );
}
