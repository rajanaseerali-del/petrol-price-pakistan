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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-lg font-black text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-medium mt-2">No active verified price record found.</p>
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

  // ==========================================
  // 1. PRIMARY FEATURED HERO CARD (PETROL)
  // ==========================================
  if (featured) {
    return (
      <div className="bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/50 rounded-3xl border-2 sm:border-3 border-emerald-500 dark:border-emerald-500/80 p-7 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden transition-all hover:border-emerald-600">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-emerald-600 text-white text-sm sm:text-base font-black uppercase tracking-wider shadow-md">
            <span className="text-lg">★</span>
            <span>Primary National Rate</span>
          </div>
          <span className="text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-4 sm:px-5 py-2 rounded-2xl border border-emerald-300 dark:border-emerald-800">
            ● Active Fortnight Notification
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block mb-1.5">
                REGULATED CONSUMER FUEL
              </span>
              <h3 className="font-black text-slate-950 dark:text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                {product.displayName}
              </h3>
            </div>
            <span className="text-base sm:text-xl font-black text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 px-5 py-2 rounded-2xl self-start sm:self-auto">
              Per {product.unit === 'litre' ? 'Litre' : product.unit}
            </span>
          </div>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium mt-3 leading-relaxed max-w-4xl">
            Standard ex-depot nationwide retail price for motorbikes, cars, and passenger transport in Pakistan.
          </p>
        </div>

        {/* Massive Price Display */}
        <div className="my-8 p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-800/90 border-2 border-emerald-300/80 dark:border-emerald-500/30 shadow-inner">
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-600 dark:text-slate-400 uppercase">
              Rs.
            </span>
            <span className="text-6xl sm:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white tracking-tight">
              {record.pricePkr.toFixed(2)}
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-700 dark:text-emerald-400">
              PKR
            </span>
          </div>

          {/* Rate Difference Pill */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            {change.direction === 'INCREASE' && (
              <span className="inline-flex items-center gap-2 text-base sm:text-lg font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-300 dark:border-rose-900 px-5 py-2.5 rounded-2xl shadow-xs">
                <span className="text-xl">▲</span>
                <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
              </span>
            )}
            {change.direction === 'DECREASE' && (
              <span className="inline-flex items-center gap-2 text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 border-2 border-emerald-300 dark:border-emerald-800 px-5 py-2.5 rounded-2xl shadow-xs">
                <span className="text-xl">▼</span>
                <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
              </span>
            )}
            {change.direction === 'UNCHANGED' && (
              <span className="inline-flex items-center text-base sm:text-lg font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/80 px-5 py-2.5 rounded-2xl">
                No change from previous revision
              </span>
            )}
            <span className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-400">
              compared to previous official gazette
            </span>
          </div>
        </div>

        {freshness.warning && (
          <div className="bg-amber-50 dark:bg-amber-950/70 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-4 sm:p-5 mb-8 text-base text-amber-950 dark:text-amber-200 font-bold">
            <span className="font-black text-lg">⚠️ Verification Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-6 border-t-2 border-slate-200 dark:border-slate-800">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs sm:text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Active Today
            </span>
            <span className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              {todayInPakistan} (Active)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs sm:text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Effective Since
            </span>
            <span className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              {formattedEffectiveDate}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs sm:text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Last Verified
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400">
              {formattedVerificationDate} PKT
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs sm:text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Official Source
            </span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400 hover:underline truncate block"
            >
              {record.sourceType === 'OGRA_NOTIFIED'
                ? 'OGRA Official Portal ↗'
                : record.sourceType === 'PSO_OFFICIAL'
                ? 'PSO Notified Rates ↗'
                : 'Govt Gazette ↗'}
            </a>
          </div>
        </div>

        {/* Link to petrol details */}
        <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link
            href={`/${product.slug}`}
            className="text-lg sm:text-xl font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 flex items-center gap-2.5 group"
          >
            <span>View historical petrol revisions, price trends &amp; analysis</span>
            <span className="group-hover:translate-x-2 transition-transform text-2xl font-black">→</span>
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. SECONDARY COMPACT FUEL CARDS
  // ==========================================
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/70 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h3 className="font-black text-slate-950 dark:text-white text-2xl sm:text-3xl tracking-tight">
              {product.displayName}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-semibold mt-1">
              {product.id === 'hi-octane'
                ? 'PSO Euro 5 RON 97'
                : product.id === 'lpg'
                ? 'Regulated per kilogram rate'
                : 'Nationwide regulated rate'}
            </p>
          </div>
          <span className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-xl">
            /{product.unit}
          </span>
        </div>

        {/* Price Display */}
        <div className="my-5 flex items-baseline gap-2.5 sm:gap-3">
          <span className="text-xl sm:text-2xl font-black text-slate-500 dark:text-slate-400 uppercase">
            Rs.
          </span>
          <span className="text-5xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight">
            {record.pricePkr.toFixed(2)}
          </span>
          <span className="text-base sm:text-lg font-black text-slate-600 dark:text-slate-400">
            PKR
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-2 mb-5">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-3.5 py-1.5 rounded-xl">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3.5 py-1.5 rounded-xl">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl">
              Unchanged from prev revision
            </span>
          )}
        </div>

        {/* Key details */}
        <div className="border-t-2 border-slate-100 dark:border-slate-800/90 pt-5 space-y-3 text-sm sm:text-base">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Status:</span>
            <span className="font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
              ● Active Today
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Effective Date:</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">{formattedEffectiveDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Last Verified:</span>
            <span className="font-extrabold text-emerald-700 dark:text-emerald-400">{formattedVerificationDate} PKT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">Source:</span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-black truncate max-w-[200px]"
            >
              {record.sourceType === 'OGRA_NOTIFIED'
                ? 'OGRA Portal ↗'
                : record.sourceType === 'PSO_OFFICIAL'
                ? 'PSO Official ↗'
                : 'Govt Gazette ↗'}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/${product.slug}`}
          className="text-sm sm:text-base font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 flex items-center gap-1.5 group"
        >
          <span>View historical rates &amp; trends</span>
          <span className="group-hover:translate-x-1.5 transition-transform text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}
