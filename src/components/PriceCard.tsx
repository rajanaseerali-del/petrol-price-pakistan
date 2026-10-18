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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.displayName}</span>
          <p className="text-sm text-slate-500 mt-2">No active verified price record found.</p>
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

  return (
    <div
      className={`rounded-2xl transition-all duration-200 flex flex-col justify-between ${
        featured
          ? 'bg-gradient-to-b from-white to-emerald-50/40 border-2 border-emerald-600/40 p-6 sm:p-7 shadow-md relative overflow-hidden'
          : 'bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-600/30'
      }`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
          Regulated National Rate
        </div>
      )}

      <div>
        {/* Product header */}
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
              {product.displayName}
            </h3>
            {product.displayNameUr && (
              <span className="text-xs font-semibold text-emerald-800 font-serif">
                {product.displayNameUr}
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-medium">Per {product.unit}</span>
        </div>

        {/* Price Display */}
        <div className="mt-4 mb-3 flex items-baseline gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rs.</span>
          <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {record.pricePkr.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-slate-500">PKR</span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-2 mb-4">
          {change.direction === 'INCREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-1 rounded-full">
              <span>▲</span>
              <span>+Rs. {change.changePkr.toFixed(2)} ({change.percentage}%)</span>
            </span>
          )}
          {change.direction === 'DECREASE' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
              <span>▼</span>
              <span>-Rs. {Math.abs(change.changePkr).toFixed(2)} ({Math.abs(change.percentage)}%)</span>
            </span>
          )}
          {change.direction === 'UNCHANGED' && (
            <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              No change from preceding notification
            </span>
          )}
          <span className="text-[11px] text-slate-400">vs prev revision</span>
        </div>

        {/* Freshness Warning if applicable */}
        {freshness.warning && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-4 text-xs text-amber-900">
            <span className="font-bold">⚠️ Notice: </span>
            {freshness.warning}
          </div>
        )}

        {/* Details list */}
        <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Today&apos;s Status:</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 text-[11px]">
              ● Active Today ({todayInPakistan})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Effective Since:</span>
            <span className="font-bold text-slate-800">{formattedEffectiveDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Last Verified:</span>
            <span className="font-medium text-emerald-700">{formattedVerificationDate} PKT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Source:</span>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 underline font-medium truncate max-w-[170px]"
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

      {/* Action link */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/${product.slug}`}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
        >
          <span>Detailed analysis &amp; historical trend</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
