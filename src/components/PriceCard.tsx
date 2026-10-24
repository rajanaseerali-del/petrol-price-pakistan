import React from 'react';
import Link from 'next/link';
import { PriceRecord, FuelProduct } from '@/types/fuel';
import { VerificationEngine } from '@/lib/verification-engine';

interface PriceCardProps {
  product: FuelProduct;
  record?: PriceRecord | null;
  featured?: boolean;
}

export function PriceCard({ product, record, featured = false }: PriceCardProps) {
  if (!record) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-base text-slate-500 mt-2">No active verified price record found.</p>
        </div>
      </div>
    );
  }

  const freshness = VerificationEngine.checkFreshness(record.verificationTimestamp, 72);
  const change = VerificationEngine.calculateChange(record.pricePaisa, record.previousPricePaisa);

  const formattedEffectiveDate = new Intl.DateTimeFormat('en-PK', {
    dateStyle: 'medium',
    timeZone: 'Asia/Karachi',
  }).format(new Date(record.effectiveStart));

  const todayInPakistan = new Intl.DateTimeFormat('en-PK', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Karachi',
  }).format(new Date());

  const formattedVerificationDate = new Intl.DateTimeFormat('en-PK', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Karachi',
  }).format(new Date(record.verificationTimestamp));

  // Primary card (Petrol) styling vs secondary fuel styling
  if (featured) {
    return (
      <div className="bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 rounded-3xl border-2 border-emerald-600/60 dark:border-emerald-500/60 p-7 sm:p-8 shadow-xl relative overflow-hidden transition-all hover:border-emerald-600">
        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-sm">
          ★ Primary National Rate
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-3">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Most Popular Fuel
              </span>
              <h3 className="font-black text-slate-950 dark:text-white text-2xl sm:text-3xl tracking-tight">
                {product.displayName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                Regulated ex-depot nationwide rate for passenger vehicles and bikes
              </p>
            </div>
            <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-xl">
              /{product.unit}
            </span>
          </div>

          {/* Big Price Display */}
          <div className="mt-5 mb-4 flex items-baseline gap-2.5">
            <span className="text-lg sm:text-xl font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rs.</span>
            <span className="text-5xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight">
              {record.pricePkr.toFixed(2)}
            </span>
            <span className="text-base font-extrabold text-slate-600 dark:text-slate-400">PKR</span>
          </div>

          {/* Change Indicator */}
          <div className="flex items-center gap-2 mb-5">
            {change.direction === 'INCREASE' && (
              <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 px-3.5 py-1.5 rounded-full">
                <span>▲</span>
                <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
              </span>
            )}
            {change.direction === 'DECREASE' && (
              <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 px-3.5 py-1.5 rounded-full">
                <span>▼</span>
                <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
              </span>
            )}
            {change.direction === 'UNCHANGED' && (
              <span className="inline-flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full">
                No change from preceding notification
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400">vs prev revision</span>
          </div>

          {freshness.warning && (
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-2xl p-3 mb-4 text-xs text-amber-900 dark:text-amber-300 font-medium">
              <span className="font-bold">⚠️ Notice: </span>
              {freshness.warning}
            </div>
          )}

          {/* Details list with larger readable fonts */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Today&apos;s Status:</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 text-xs">
                ● Active Today ({todayInPakistan})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Effective Since:</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{formattedEffectiveDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Last Verified:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{formattedVerificationDate} PKT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Source:</span>
              <a
                href={record.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold truncate max-w-[200px]"
              >
                {record.sourceType === 'OGRA_NOTIFIED'
                  ? 'OGRA Official Portal'
                  : record.sourceType === 'PSO_OFFICIAL'
                  ? 'PSO Official Rates'
                  : 'Govt Notification'}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link
            href={`/${product.slug}`}
            className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-200 flex items-center gap-1.5 group"
          >
            <span>Detailed petrol analysis &amp; multi-month trends</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    );
  }

  // Secondary fuel cards (compact, readable, smaller than primary petrol)
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
              {product.displayName}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {product.id === 'hi-octane'
                ? 'Quoted per city by PSO — see city table'
                : product.id === 'lpg'
                ? 'Priced per kilogram, not per litre'
                : 'Nationwide — not quoted per city'}
            </p>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
            /{product.unit}
          </span>
        </div>

        {/* Price Display */}
        <div className="mt-3 mb-2 flex items-baseline gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rs.</span>
          <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            {record.pricePkr.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">PKR</span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-2 mb-3">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 px-2.5 py-0.5 rounded-full">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              No change vs prev revision
            </span>
          )}
        </div>

        {/* Details list */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Today&apos;s Status:</span>
            <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 text-[11px]">
              ● Active ({todayInPakistan})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Effective Since:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{formattedEffectiveDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Last Verified:</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{formattedVerificationDate} PKT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Source:</span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium truncate max-w-[150px]"
            >
              {record.sourceType === 'OGRA_NOTIFIED'
                ? 'OGRA Official Portal'
                : record.sourceType === 'PSO_OFFICIAL'
                ? 'PSO Official Rates'
                : 'Govt Notification'}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/${product.slug}`}
          className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1 group"
        >
          <span>Analysis &amp; trends</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
