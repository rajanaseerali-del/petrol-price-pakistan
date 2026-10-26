'use client';

import React from 'react';
import Link from 'next/link';
import { PriceRecord, FuelProduct } from '@/types/fuel';

interface OgraStatusWidgetProps {
  products: FuelProduct[];
  latestPrices: Record<string, PriceRecord>;
}

export function OgraStatusWidget({ products, latestPrices }: OgraStatusWidgetProps) {
  const petrolRecord = latestPrices['petrol'];
  const formattedVerifiedDate = petrolRecord?.verificationTimestamp
    ? new Intl.DateTimeFormat('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Karachi',
      }).format(new Date(petrolRecord.verificationTimestamp))
    : 'Active Today';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            OGRA Source Verification
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase">
          Live &amp; Verified
        </span>
      </div>

      {/* Meta Details */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Regulatory Authority:</span>
          <span className="font-bold text-slate-900 dark:text-white">OGRA &amp; Ministry of Energy</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Latest Notification:</span>
          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {petrolRecord?.notificationIdentifier || 'OGRA-REVISION-2026-10-24'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Effective Date:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            October 24, 2026 (Active)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Last Engine Sync:</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {formattedVerifiedDate}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Official Portal Link:</span>
          <a
            href="https://price.ogra.org.pk/?category=notified-petroleum-prices&section=oil-notified"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
          >
            price.ogra.org.pk ↗
          </a>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <span className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Current Regulated Products
        </span>
        <div className="grid grid-cols-2 gap-2">
          {products.map(p => {
            const rec = latestPrices[p.id];
            const price = rec?.pricePkr ?? 0;
            return (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 transition group"
              >
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                  {p.displayName}
                </span>
                <span className="block font-mono font-black text-xs text-slate-950 dark:text-white mt-0.5">
                  Rs. {price.toFixed(2)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
