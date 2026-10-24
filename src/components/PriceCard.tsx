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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-base font-black text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mt-1">No active verified price record found.</p>
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
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 dark:from-slate-900 dark:via-slate-900/95 dark:to-emerald-950/40 rounded-3xl border-2 border-emerald-500/90 dark:border-emerald-500/70 p-5 sm:p-7 shadow-xl relative overflow-hidden transition-all hover:border-emerald-600">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-xs">
              <span>★</span>
              <span>Primary National Rate</span>
            </span>
            <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-3 py-1 rounded-xl border border-emerald-300 dark:border-emerald-800">
              ● Active Fortnight Notification
            </span>
          </div>

          <span className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-xl">
            Per {product.unit === 'litre' ? 'Litre' : product.unit}
          </span>
        </div>

        {/* Main Price & Title Row (Side-by-side on desktop for compact height) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-2">
          {/* Left: Title & Change */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              REGULATED CONSUMER FUEL
            </span>
            <h3 className="font-black text-slate-950 dark:text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
              {product.displayName}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-normal">
              Ex-depot nationwide retail rate for passenger vehicles across Pakistan.
            </p>

            {/* Difference Pill */}
            <div className="pt-1 flex items-center gap-2">
              {change.direction === 'INCREASE' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-3 py-1 rounded-xl">
                  <span>▲</span>
                  <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'DECREASE' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-xl">
                  <span>▼</span>
                  <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
                </span>
              )}
              {change.direction === 'UNCHANGED' && (
                <span className="inline-flex items-center text-sm font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/80 px-3 py-1 rounded-xl">
                  Unchanged
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">vs prev gazette</span>
            </div>
          </div>

          {/* Right: Massive Price Hero */}
          <div className="md:col-span-7 bg-white/90 dark:bg-slate-800/90 border-2 border-emerald-300/80 dark:border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-wrap items-baseline justify-center md:justify-end gap-2.5 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-black text-slate-500 dark:text-slate-400 uppercase">
              Rs.
            </span>
            <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tight">
              {record.pricePkr.toFixed(2)}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400">
              PKR
            </span>
          </div>
        </div>

        {freshness.warning && (
          <div className="bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 rounded-xl p-3 my-3 text-xs text-amber-950 dark:text-amber-200 font-bold">
            <span className="font-black">⚠️ Verification Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 mt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Active Today
            </span>
            <span className="text-sm sm:text-base font-black text-slate-950 dark:text-white truncate block">
              {todayInPakistan} (Active)
            </span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Effective Since
            </span>
            <span className="text-sm sm:text-base font-black text-slate-950 dark:text-white truncate block">
              {formattedEffectiveDate}
            </span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Last Verified
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400 truncate block">
              {formattedVerificationDate} PKT
            </span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Source
            </span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400 hover:underline truncate block"
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
    );
  }

  // ==========================================
  // 2. SECONDARY COMPACT FUEL CARDS
  // ==========================================
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-emerald-500/70 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <h3 className="font-black text-slate-950 dark:text-white text-base sm:text-lg tracking-tight">
              {product.displayName}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
              {product.id === 'hi-octane'
                ? 'PSO Euro 5 (RON 97)'
                : product.id === 'lpg'
                ? 'Per kilogram rate'
                : 'Nationwide rate'}
            </p>
          </div>
          <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-lg">
            /{product.unit}
          </span>
        </div>

        {/* Price Display */}
        <div className="my-3 flex items-baseline gap-1.5">
          <span className="text-sm font-black text-slate-400 uppercase">
            Rs.
          </span>
          <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            {record.pricePkr.toFixed(2)}
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5 mb-3">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-2.5 py-0.5 rounded-lg">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-lg">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
              Unchanged
            </span>
          )}
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium truncate">
          Eff: {formattedEffectiveDate}
        </span>
        <Link
          href={`/${product.slug}`}
          className="font-black text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
