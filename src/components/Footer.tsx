import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 border-t border-slate-800 dark:border-slate-800/80 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                PK
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">Petrol Price Pakistan</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 leading-relaxed">
              Pakistan&apos;s independent, authoritative consumer portal for verified OGRA notified fuel rates, high-speed diesel, and historical pricing revisions.
            </p>
            <div className="text-xs text-emerald-400 font-bold">
              Data strictly verified from OGRA &amp; Ministry of Energy.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">
              Fuel Rates
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/petrol-price-in-pakistan" className="hover:text-emerald-400 transition">
                  Petrol Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-in-pakistan" className="hover:text-emerald-400 transition">
                  Diesel Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/hi-octane-price-in-pakistan" className="hover:text-emerald-400 transition">
                  Hi-Octane Price (PSO RON 97)
                </Link>
              </li>
              <li>
                <Link href="/fuel-price-changes" className="hover:text-emerald-400 transition">
                  Latest Price Increases &amp; Decreases
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-by-city" className="hover:text-emerald-400 transition">
                  Rates by City &amp; Depots
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Analytics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">
              Tools &amp; History
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/petrol-calculator" className="hover:text-emerald-400 transition">
                  Fuel &amp; Trip Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-history" className="hover:text-emerald-400 transition">
                  Historical Petrol Price Archive
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-history" className="hover:text-emerald-400 transition">
                  Historical Diesel Price Archive
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-emerald-400 transition">
                  Verification Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">
              Editorial &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  About Us &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-emerald-400 transition">
                  Editorial &amp; Correction Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition">
                  Official Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Contact &amp; Data Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <p>
            Official petroleum retail prices in Pakistan are regulated by the Oil &amp; Gas Regulatory Authority (OGRA) and the Ministry of Energy (Petroleum Division). We do not predict or fabricate government announcements. All historical and active records reflect officially notified circulars.
          </p>
          <p className="mt-2 text-slate-600">
            &copy; 2026 Petrol Price Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
