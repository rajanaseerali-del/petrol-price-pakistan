import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
      {/* Top verified bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official OGRA &amp; Petroleum Division verified rates for Pakistan</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span>Latest Notified Rates (October 2026)</span>
            <span className="hidden md:inline">|</span>
            <Link href="/methodology" className="hover:text-white underline decoration-emerald-400/50">
              Verification Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-emerald-800 transition">
                <span>PK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-800 transition">
                  Petrol Price Pakistan
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold tracking-wider uppercase mt-0.5">
                  Official Consumer Rates
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              Today&apos;s Rates
            </Link>
            <Link
              href="/petrol-price-in-pakistan"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              Petrol
            </Link>
            <Link
              href="/diesel-price-in-pakistan"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              Diesel
            </Link>
            <Link
              href="/petrol-price-history"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              History
            </Link>
            <Link
              href="/fuel-price-changes"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              Price Changes
            </Link>
            <Link
              href="/petrol-calculator"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              Calculator
            </Link>
            <Link
              href="/petrol-price-by-city"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 transition"
            >
              By City
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/petrol-calculator"
              className="inline-flex items-center justify-center px-3.5 py-1.5 border border-emerald-700/20 text-xs font-bold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition"
            >
              Fuel Calculator
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
