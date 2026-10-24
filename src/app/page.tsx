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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-300 text-sm sm:text-base font-black tracking-wide shadow-xs">
            <span className="w-3 h-3 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping" />
            <span>Official Government Notification Active · October 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Petrol Price Today in Pakistan
          </h1>
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium max-w-4xl mx-auto">
            Real-time verified rates for Motor Gasoline, High-Speed Diesel (HSD), and Octane+ across all provinces of Pakistan. Sourced directly from OGRA regulatory circulars and Ministry of Energy notifications.
          </p>
        </div>

        {/* Current Verified Prices Grid */}
        <section aria-label="Current Fuel Rates" className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                Current Verified Consumer Rates
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mt-2 font-medium">
                Effective fortnightly notification notified for nationwide retail filling stations
              </p>
            </div>
            <span className="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 px-5 py-2.5 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-xs self-start sm:self-auto">
              Verified: 16 October 2026
            </span>
          </div>

          {/* Primary Fuel Card (Petrol) - Prominent and Large */}
          {petrol && (
            <div className="w-full">
              <PriceCard
                product={petrol}
                record={latestPrices[petrol.id]}
                featured={true}
              />
            </div>
          )}

          {/* Secondary Fuel Cards (Diesel, Hi-Octane, Kerosene, LDO, LPG) - Smaller, Compact */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-base font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Other Petroleum Products &amp; Gases
              </span>
              <span className="text-base text-slate-600 dark:text-slate-400 font-bold">
                Secondary regulated rates
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
        <section aria-label="Historical Price Trend" className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                Petrol Price History &amp; Revisions
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mt-2 font-medium">
                Traceable official notifications preserved without silent overwriting
              </p>
            </div>
            <Link
              href="/petrol-price-history"
              className="text-lg font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-2"
            >
              View Full Multi-Month Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <PriceChart records={petrolHistory} productName="Petrol (Super)" />
            </div>
            <div className="lg:col-span-6">
              <HistoricalTable records={recentRevisions.slice(0, 5)} showProductColumn={true} />
            </div>
          </div>
        </section>

        {/* Official Source & Verification Explanation */}
        <section aria-label="Official Verification Methodology" className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 sm:p-14 shadow-lg transition-colors">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              <span>🛡️ Data Integrity Guarantee</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Where Do These Fuel Figures Come From?
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              Unlike blogs that predict or fabricate fuel prices before official gazette notifications, our platform only publishes rates verified through the official <strong>Oil &amp; Gas Regulatory Authority (OGRA) Notified Prices Portal</strong> and the <strong>Ministry of Energy (Petroleum Division)</strong> press releases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700">
                <span className="text-lg font-black text-slate-950 dark:text-white block mb-2">Primary Source</span>
                <span className="text-base text-slate-700 dark:text-slate-300 block leading-relaxed font-medium">OGRA Notified Petroleum circulars published under the Petroleum Products Ordinance.</span>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700">
                <span className="text-lg font-black text-slate-950 dark:text-white block mb-2">Secondary Audit</span>
                <span className="text-base text-slate-700 dark:text-slate-300 block leading-relaxed font-medium">Finance Division &amp; Petroleum Division official media press bulletins.</span>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700">
                <span className="text-lg font-black text-slate-950 dark:text-white block mb-2">Deregulated Fuels</span>
                <span className="text-base text-slate-700 dark:text-slate-300 block leading-relaxed font-medium">PSO published fuel prices for Octane+ Euro 5 (RON 97) retail pumps.</span>
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
