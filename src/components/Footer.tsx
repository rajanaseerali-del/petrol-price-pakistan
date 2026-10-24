import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-200 dark:text-slate-300 border-t-2 border-slate-800 dark:border-slate-800/80 mt-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-black text-2xl shadow-md">
                PK
              </div>
              <span className="font-black text-white text-2xl tracking-tight">Petrol Price Pakistan</span>
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Pakistan&apos;s independent, authoritative consumer portal for verified OGRA notified fuel rates, high-speed diesel, and historical pricing revisions.
            </p>
            <div className="text-base text-emerald-400 font-extrabold flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Directly verified from OGRA &amp; Ministry of Energy.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-5">
              Fuel Rates
            </h3>
            <ul className="space-y-3.5 text-base sm:text-lg">
              <li>
                <Link href="/petrol-price-in-pakistan" className="hover:text-emerald-400 transition font-medium">
                  Petrol Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-in-pakistan" className="hover:text-emerald-400 transition font-medium">
                  Diesel Price in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/hi-octane-price-in-pakistan" className="hover:text-emerald-400 transition font-medium">
                  Hi-Octane Price (PSO RON 97)
                </Link>
              </li>
              <li>
                <Link href="/fuel-price-changes" className="hover:text-emerald-400 transition font-medium">
                  Latest Price Increases &amp; Decreases
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-by-city" className="hover:text-emerald-400 transition font-medium">
                  Rates by City &amp; Depots
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & History */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-5">
              Tools &amp; History
            </h3>
            <ul className="space-y-3.5 text-base sm:text-lg">
              <li>
                <Link href="/petrol-calculator" className="hover:text-emerald-400 transition font-medium">
                  Fuel Tank Fill-Up Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-calculator#calculator" className="hover:text-emerald-400 transition font-medium">
                  Journey Distance Calculator
                </Link>
              </li>
              <li>
                <Link href="/petrol-price-history" className="hover:text-emerald-400 transition font-medium">
                  Historical Petrol Price Archive
                </Link>
              </li>
              <li>
                <Link href="/diesel-price-history" className="hover:text-emerald-400 transition font-medium">
                  Historical Diesel Price Archive
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-emerald-400 transition font-medium">
                  Verification Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-5">
              Editorial &amp; Legal
            </h3>
            <ul className="space-y-3.5 text-base sm:text-lg">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition font-medium">
                  About Us &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-emerald-400 transition font-medium">
                  Editorial &amp; Correction Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition font-medium">
                  Official Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition font-medium">
                  Contact &amp; Data Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="border-t-2 border-slate-800 pt-10 text-sm sm:text-base text-slate-300 leading-relaxed text-center sm:text-left space-y-3">
          <p>
            Official petroleum retail prices in Pakistan are regulated by the Oil &amp; Gas Regulatory Authority (OGRA) and the Ministry of Energy (Petroleum Division). We do not predict or fabricate government announcements. All historical and active records reflect officially notified circulars.
          </p>
          <p className="text-slate-400 font-semibold">
            &copy; 2026 Petrol Price Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
