import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-950/10 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top verified bar */}
      <div className="bg-emerald-900 dark:bg-emerald-950 text-emerald-100 text-xs sm:text-sm py-1.5 px-4 font-semibold tracking-wide border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Official OGRA &amp; Petroleum Division verified rates for Pakistan</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-emerald-200 text-xs font-medium">
            <span>Latest Notified Rates (October 2026)</span>
            <span className="hidden md:inline text-emerald-500">|</span>
            <Link href="/methodology" className="hover:text-white underline decoration-emerald-400/50">
              Verification Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-emerald-800 dark:group-hover:bg-emerald-500 transition-colors">
                <span>PK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-slate-950 dark:text-white tracking-tight leading-none group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Petrol Price Pakistan
                </span>
                <span className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-400 font-extrabold tracking-wider uppercase mt-1">
                  Official Consumer Rates
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              Today&apos;s Rates
            </Link>
            <Link
              href="/petrol-price-in-pakistan"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              Petrol
            </Link>
            <Link
              href="/diesel-price-in-pakistan"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              Diesel
            </Link>
            <Link
              href="/petrol-price-history"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              History
            </Link>
            <Link
              href="/fuel-price-changes"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              Price Changes
            </Link>
            <Link
              href="/petrol-calculator"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              Calculator
            </Link>
            <Link
              href="/petrol-price-by-city"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 transition"
            >
              By City
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/petrol-calculator"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-emerald-700/20 dark:border-emerald-500/30 text-xs sm:text-sm font-extrabold rounded-xl text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition shadow-xs"
            >
              Fill-Up Calculator
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
