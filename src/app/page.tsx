import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculator } from '@/components/FuelCalculator';
import { TankFillCalculator } from '@/components/TankFillCalculator';
import { TomorrowPriceEstimator } from '@/components/TomorrowPriceEstimator';
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

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 377.71;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 393.66;
  const hiOctanePrice = latestPrices['hi-octane']?.pricePkr ?? 415.00;

  // JSON-LD Structured Data for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Petrol Price Today in Pakistan',
    url: 'https://petrolpricepakistan.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://petrolpricepakistan.pk/petrol-price-by-city?q={search_term_string}',
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

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-5 space-y-6 sm:space-y-8 w-full">
        {/* Compact Above-The-Fold Header Bar - Eliminates wasted top spacing */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Petrol Price Today in Pakistan
            </h1>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline-block">
            Official OGRA Rates Active
          </span>
        </div>

        {/* Current Verified Prices Grid - PRIMARY PETROL CARD ABOVE THE FOLD */}
        <section aria-label="Current Fuel Rates" className="space-y-4">
          <h2 className="sr-only">Verified Pakistani Petroleum Prices &amp; Fuel Rates</h2>
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

          {/* Secondary Fuel Cards (Diesel, Hi-Octane, Kerosene, Light Diesel, LPG) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Other Fuel Rates
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Official ex-depot rates
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

        {/* Tomorrow's Estimated Price Feature */}
        <section aria-label="Tomorrow's Price Projection" id="tomorrow-forecast">
          <TomorrowPriceEstimator
            petrolPrice={petrolPrice}
            dieselPrice={dieselPrice}
            hiOctanePrice={hiOctanePrice}
          />
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
        <section aria-label="Historical Price Trend" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-3">
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
              className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-2"
            >
              View Full Price History Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6">
              <PriceChart records={petrolHistory} productName="Petrol" />
            </div>
            <div className="lg:col-span-6">
              <HistoricalTable records={recentRevisions.slice(0, 6)} showProductColumn={true} />
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
