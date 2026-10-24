import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-200 dark:text-slate-300 border-t-2 border-slate-800 dark:border-slate-800/80 mt-12 sm:mt-20 lg:mt-28 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Brand info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md shrink-0">
                PK
              </div>
              <span className="font-black text-white text-xl sm:text-2xl tracking-tight">Petrol Price Pakistan</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Pakistan&apos;s independent, authoritative consumer portal for verified OGRA notified fuel rates, high-speed diesel, and historical pricing revisions.
            </p>
            <div className="text-xs sm:text-sm text-emerald-400 font-extrabold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Directly verified from OGRA &amp; Ministry of Energy.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white mb-3 sm:mb-5">
              Fuel Rates
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5 text-sm sm:text-base">
              <li>
                <Link href="/petrol-price-in-pakistan" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Petrol Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-in-pakistan" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Diesel Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/hi-octane-price-in-pakistan" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Hi-Octane Price (PSO RON 97)
                </Link>
              </li>
              <li>
                <Link href="/fuel-price-changes" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Latest Price Increases &amp; Decreases
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-by-city" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Rates by City &amp; Depots
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & History */}
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white mb-3 sm:mb-5">
              Tools &amp; History
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5 text-sm sm:text-base">
              <li>
                <Link href="/petrol-calculator" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Fuel Tank Fill-Up Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-calculator#calculator" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Journey Distance Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-history" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Historical Petrol Price Archive
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-history" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Historical Diesel Price Archive
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Verification Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white mb-3 sm:mb-5">
              Editorial &amp; Legal
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5 text-sm sm:text-base">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  About Us &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Editorial &amp; Correction Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Official Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition font-medium min-h-[32px] flex items-center">
                  Contact &amp; Data Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8 text-xs sm:text-sm text-slate-400 leading-relaxed text-center sm:text-left space-y-2 sm:space-y-3">
          <p>
            Official petroleum retail prices in Pakistan are regulated by the Oil &amp; Gas Regulatory Authority (OGRA) and the Ministry of Energy (Petroleum Division). We do not predict or fabricate government announcements. All historical and active records reflect officially notified circulars.
          </p>
          <p className="text-slate-500 font-semibold text-xs">
            &copy; 2026 Petrol Price Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
