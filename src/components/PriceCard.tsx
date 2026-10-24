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
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col justify-between overflow-hidden">
        <div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">No active verified price record found.</p>
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
      <div className="bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-emerald-950/40 rounded-2xl border-2 border-emerald-500/80 dark:border-emerald-500/60 p-4 sm:p-5 shadow-md relative overflow-hidden transition-all hover:border-emerald-600 w-full min-w-0">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-xs">
              <span>★</span>
              <span>Petrol Rate</span>
            </span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-2.5 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800">
              ● Active Notification
            </span>
          </div>

          <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-lg shrink-0">
            Per {product.unit === 'litre' ? 'Litre' : product.unit}
          </span>
        </div>

        {/* Main Price & Title Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center my-1 min-w-0">
          {/* Left: Title & Change */}
          <div className="md:col-span-6 space-y-1 min-w-0">
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              OFFICIAL RETAIL RATE
            </span>
            <h3 className="font-black text-slate-950 dark:text-white text-xl sm:text-2xl tracking-tight leading-tight break-words">
              {product.displayName}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-normal">
              Official nationwide consumer rate across filling stations in Pakistan.
            </p>

            {/* Difference Pill */}
            <div className="pt-0.5 flex items-center gap-1.5 flex-wrap min-w-0">
              {change.direction === 'INCREASE' && (
                <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-2 py-0.5 rounded-md">
                  <span>▲</span>
                  <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
                </span>
              )}
              {change.direction === 'DECREASE' && (
                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                  <span>▼</span>
                  <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
                </span>
              )}
              {change.direction === 'UNCHANGED' && (
                <span className="inline-flex items-center text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded-md">
                  Unchanged
                </span>
              )}
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">vs prev revision</span>
            </div>
          </div>

          {/* Right: Price Hero */}
          <div className="md:col-span-6 bg-white/90 dark:bg-slate-800/90 border border-emerald-300/80 dark:border-emerald-500/30 rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-baseline justify-center md:justify-end gap-1.5 sm:gap-2.5 min-w-0 overflow-hidden">
            <span className="text-lg sm:text-xl font-black text-slate-500 dark:text-slate-400 uppercase">
              Rs.
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight break-all">
              {record.pricePkr.toFixed(2)}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400">
              PKR
            </span>
          </div>
        </div>

        {freshness.warning && (
          <div className="bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 rounded-lg p-2 my-2 text-xs text-amber-950 dark:text-amber-200 font-bold min-w-0 overflow-hidden">
            <span className="font-black">⚠️ Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 mt-2 border-t border-slate-200 dark:border-slate-800 min-w-0">
          <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 min-w-0 overflow-hidden">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Active Today
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-white truncate block">
              {todayInPakistan} (Active)
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 min-w-0 overflow-hidden">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Effective Since
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-950 dark:text-white truncate block">
              {formattedEffectiveDate}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 min-w-0 overflow-hidden">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Last Verified
            </span>
            <span className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400 truncate block">
              {formattedVerificationDate} PKT
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 min-w-0 overflow-hidden">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Source
            </span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400 hover:underline truncate block"
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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-xs hover:shadow-md hover:border-emerald-500/70 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between overflow-hidden w-full min-w-0">
      <div className="min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-1.5 mb-1.5 min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-black text-slate-950 dark:text-white text-xs sm:text-sm tracking-tight leading-snug line-clamp-2" title={product.displayName}>
              {product.displayName}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate block mt-0.5">
              {product.id === 'hi-octane'
                ? 'Commercial retail rate'
                : product.id === 'lpg'
                ? 'Per kilogram rate'
                : 'Nationwide rate'}
            </p>
          </div>
          <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded shrink-0">
            /{product.unit}
          </span>
        </div>

        {/* Price Display */}
        <div className="my-2 flex items-baseline gap-1 min-w-0 flex-wrap">
          <span className="text-xs font-black text-slate-400 uppercase">
            Rs.
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight break-all">
            {record.pricePkr.toFixed(2)}
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1 mb-2 min-w-0 flex-wrap">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 px-1.5 py-0.5 rounded truncate max-w-full">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.5 rounded truncate max-w-full">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)}</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Unchanged
            </span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-1 min-w-0">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate min-w-0">
          Eff: {formattedEffectiveDate}
        </span>
        <Link
          href={`/${product.slug}`}
          className="font-bold text-xs text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
