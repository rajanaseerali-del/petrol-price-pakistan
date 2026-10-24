import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
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

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 386.30;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 396.96;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  // JSON-LD Structured Data for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Petrol Price Today in Pakistan',
    url: 'https://petrolpricepakistan.pk',
    description: 'Official verified petroleum prices, diesel rates, and fuel cost calculators in Pakistan.',
    publisher: {
      '@type': 'Organization',
      name: 'Petrol Price Pakistan',
    },
    mainEntity: [
      {
        '@type': 'Product',
        name: 'Petrol (Motor Spirit)',
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
        name: 'High-Speed Diesel (HSD)',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-10">
        {/* Above-The-Fold Header Bar: Instant Rate Access Without Scrolling */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official Government Notification Active · October 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Petrol Price Today in Pakistan
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800">
              Verified: 16 October 2026
            </span>
          </div>
        </div>

        {/* Current Verified Prices Grid - PRIMARY PETROL CARD ABOVE THE FOLD */}
        <section aria-label="Current Fuel Rates" className="space-y-5">
          {/* Primary Fuel Card (Petrol) */}
          {petrol && (
            <div className="w-full">
              <PriceCard
                product={petrol}
                record={latestPrices[petrol.id]}
                featured={true}
              />
            </div>
          )}

          {/* Secondary Fuel Cards (Diesel, Hi-Octane, Kerosene, LDO, LPG) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Other Regulated Petroleum &amp; Gases
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Secondary regulated rates
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
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

        {/* Fuel Tank Fill-Up Cost Calculator Tool */}
        <section aria-label="Fuel Tank Fill-Up Calculator" id="tank-calculator">
          <TankFillCalculator
            petrolPrice={petrolPrice}
            dieselPrice={dieselPrice}
            hiOctanePrice={hiOctanePrice}
          />
        </section>

        {/* Ad Placement Slot 1 */}
        <AdPlacement slotId="home-top-leaderboard" format="leaderboard" />

        {/* Trip Cost Calculator Section */}
        <section aria-label="Trip Cost Calculator" id="calculator">
          <FuelCalculator
            initialPetrolPrice={petrolPrice}
            initialDieselPrice={dieselPrice}
          />
        </section>

        {/* Price History Chart & Summary */}
        <section aria-label="Historical Price Trend" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Petrol Price History &amp; Revisions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Traceable official notifications preserved without silent overwriting
              </p>
            </div>
            <Link
              href="/petrol-price-history"
              className="text-sm font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-2"
            >
              View Full Multi-Month Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <PriceChart records={petrolHistory} productName="Petrol (Super)" />
            </div>
            <div className="lg:col-span-6">
              <HistoricalTable records={recentRevisions.slice(0, 5)} showProductColumn={true} />
            </div>
          </div>
        </section>

        {/* Official Source & Verification Explanation */}
        <section aria-label="Official Verification Methodology" className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              <span>🛡️ Data Integrity Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Where Do These Fuel Figures Come From?
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              Unlike blogs that predict or fabricate fuel prices before official gazette notifications, our platform only publishes rates verified through the official <strong>Oil &amp; Gas Regulatory Authority (OGRA) Notified Prices Portal</strong> and the <strong>Ministry of Energy (Petroleum Division)</strong> press releases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="text-base font-black text-slate-950 dark:text-white block mb-1">Primary Source</span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block leading-relaxed font-medium">OGRA Notified Petroleum circulars published under the Petroleum Products Ordinance.</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="text-base font-black text-slate-950 dark:text-white block mb-1">Secondary Audit</span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block leading-relaxed font-medium">Finance Division &amp; Petroleum Division official media press bulletins.</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="text-base font-black text-slate-950 dark:text-white block mb-1">Deregulated Fuels</span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block leading-relaxed font-medium">PSO published fuel prices for Octane+ Euro 5 (RON 97) retail pumps.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQs Section with SEO Schema */}
        <FAQSection
          faqs={HOME_FAQS}
          title="Frequently Asked Questions (Petrol &amp; Fuel Rates in Pakistan)"
          description="Accurate, official answers regarding petroleum pricing mechanisms, fortnightly OGRA notifications, and retail variations in Pakistan."
        />

        {/* Ad Placement Slot 2 */}
        <AdPlacement slotId="home-bottom-banner" format="banner" />
      </div>
    </>
  );
}
