import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { OgraStatusWidget } from '@/components/OgraStatusWidget';
import { FAQSection } from '@/components/FAQSection';
import { HOME_FAQS } from '@/lib/faq-data';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export default async function HomePage() {
  const products = await FuelRepository.getActiveProducts();
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');
  const recentRevisions = await FuelRepository.getAllApprovedRevisions();

  const petrol = products.find(p => p.id === 'petrol');
  const otherFuels = products.filter(p => p.id !== 'petrol');

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 379.25;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 395.82;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;
  const kerosenePrice = latestPrices['kerosene']?.pricePkr ?? 330.96;
  const ldoPrice = latestPrices['ldo']?.pricePkr ?? 275.24;
  const lpgPrice = latestPrices['lpg']?.pricePkr ?? 279.34;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Petrol Price Today in Pakistan',
    url: 'https://petrolpricepakistan.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://petrolpricepakistan.pk/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    hasPart: [
      {
        '@type': 'Product',
        name: 'Petrol',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: petrolPrice.toString(),
          priceValidUntil: '2026-10-31',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Product',
        name: 'Diesel',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: dieselPrice.toString(),
          priceValidUntil: '2026-10-31',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 w-full">
        {/* Compact Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Petrol Price Today in Pakistan
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Official Ex-Depot Rates Regulated by OGRA &amp; Ministry of Energy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <span>📅 Current Circular:</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black">27 October 2026</span>
          </div>
        </div>

        {/* Current Verified Prices Grid - Full Widescreen Utilization */}
        <section aria-label="Current Fuel Rates" className="space-y-4">
          <h2 className="sr-only">Verified Pakistani Petroleum Prices &amp; Fuel Rates</h2>
          
          {/* Primary Featured Hero Card (Petrol) */}
          {petrol && (
            <div className="w-full">
              <PriceCard
                product={petrol}
                record={latestPrices[petrol.id]}
                featured={true}
              />
            </div>
          )}

          {/* Secondary Fuel Cards (Diesel, Hi-Octane, Kerosene, Light Diesel, LPG) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                All Other Regulated Petroleum Products
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Official Consumer Rates
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {otherFuels.map(product => (
                <PriceCard
                  key={product.id}
                  product={product}
                  record={latestPrices[product.id]}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Desktop 2-Column Dashboard Layout (8 Columns Main Content + 4 Columns Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* MAIN CONTENT COLUMN (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">

            {/* 2. Price History Chart */}
            <section aria-label="Historical Price Trend" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                    Petrol Price History &amp; Revisions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                    Official chronological notifications published by OGRA
                  </p>
                </div>
                <Link
                  href="/petrol-price-history"
                  className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-2 shrink-0"
                >
                  Full History Archive →
                </Link>
              </div>

              <div className="w-full">
                <PriceChart records={petrolHistory} productName="Petrol" />
              </div>
            </section>

            {/* 3. Recent Official Revisions Table */}
            <section aria-label="Recent Fuel Revisions" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                  Recent Official Price Adjustments
                </h3>
                <Link
                  href="/fuel-price-changes"
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  All Price Changes →
                </Link>
              </div>
              <HistoricalTable records={recentRevisions.slice(0, 6)} showProductColumn={true} />
            </section>

            {/* 4. Trip Cost Calculator */}
            <section aria-label="Trip Cost Calculator" id="calculator">
              <FuelCalculator
                initialPetrolPrice={petrolPrice}
                initialDieselPrice={dieselPrice}
                initialHiOctanePrice={hiOctanePrice}
              />
            </section>

            {/* 5. Comprehensive FAQs */}
            <FAQSection
              faqs={HOME_FAQS}
              title="Frequently Asked Questions (Petrol &amp; Fuel Rates in Pakistan)"
              description="Accurate, official answers regarding petroleum pricing mechanisms, fortnightly OGRA notifications, and retail variations in Pakistan."
            />
          </div>

          {/* SIDEBAR COLUMN (4 Cols) - Sticks elegantly on desktop */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* OGRA Source Status & Verification Widget */}
            <OgraStatusWidget products={products} latestPrices={latestPrices} />

            {/* Fuel Tank Fill-Up Calculator Tool */}
            <div id="tank-calculator">
              <TankFillCalculator
                compact={true}
                petrolPrice={petrolPrice}
                dieselPrice={dieselPrice}
                hiOctanePrice={hiOctanePrice}
              />
            </div>

            {/* Intercity Distance & Travel Benchmarks */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-base">🛣️</span>
                <h4 className="font-black text-sm text-slate-950 dark:text-white">
                  Motorway Route Benchmarks
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Lahore to Islamabad</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">M-2 (~375 KM)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Karachi to Hyderabad</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">M-9 (~165 KM)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Islamabad to Peshawar</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">M-1 (~180 KM)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Multan to Lahore</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">M-3 (~340 KM)</span>
                </div>
              </div>
            </div>

            {/* Ad Placement Slot */}
            <AdPlacement slotId="home-sidebar" format="rectangle" />
          </aside>
        </div>

        {/* Bottom Leaderboard Ad */}
        <AdPlacement slotId="home-bottom-banner" format="leaderboard" />
      </div>
    </>
  );
}
