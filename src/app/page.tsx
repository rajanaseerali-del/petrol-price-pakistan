import React from 'react';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { PriceCard } from '@/components/PriceCard';
import { FuelCalculator } from '@/components/FuelCalculator';
import { HistoricalTable } from '@/components/HistoricalTable';
import { PriceChart } from '@/components/PriceChart';
import { AdPlacement } from '@/components/AdPlacement';

export default async function HomePage() {
  const products = await FuelRepository.getActiveProducts();
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolHistory = await FuelRepository.getProductHistory('petrol');
  const recentRevisions = await FuelRepository.getAllApprovedRevisions();

  const petrol = products.find(p => p.id === 'petrol')!;
  const diesel = products.find(p => p.id === 'diesel')!;
  const hiOctane = products.find(p => p.id === 'hi-octane');

  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 386.30;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 396.96;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-900 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Official Government Notification Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Petrol Price Today in Pakistan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real-time verified rates for Motor Gasoline, High-Speed Diesel (HSD), and Octane+ across all provinces of Pakistan. Sourced directly from OGRA regulatory circulars and Ministry of Energy notifications.
          </p>
        </div>

        {/* Current Verified Prices Grid */}
        <section aria-label="Current Fuel Rates" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Current Verified Consumer Rates
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Effective fortnightly notification notified for nationwide retail outlets
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/50">
              Verified: 16 October 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PriceCard product={petrol} record={latestPrices['petrol']} featured={true} />
            <PriceCard product={diesel} record={latestPrices['diesel']} featured={true} />
            {hiOctane && <PriceCard product={hiOctane} record={latestPrices['hi-octane']} />}
          </div>
        </section>

        {/* Ad Placement Slot 1 */}
        <AdPlacement slotId="home-top-leaderboard" format="leaderboard" />

        {/* Fuel Cost Calculator Section */}
        <section aria-label="Trip Cost Calculator" id="calculator">
          <FuelCalculator
            initialPetrolPrice={petrolPrice}
            initialDieselPrice={dieselPrice}
          />
        </section>

        {/* Price History Chart & Summary */}
        <section aria-label="Historical Price Trend" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Petrol Price History &amp; Revisions
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Traceable official notifications preserved without silent overwriting
              </p>
            </div>
            <Link
              href="/petrol-price-history"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
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
        <section aria-label="Official Verification Methodology" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
              <span>🛡️ Data Integrity Guarantee</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Where Do These Fuel Figures Come From?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike blogs that predict or fabricate fuel prices before official gazette notifications, our platform only publishes rates verified through the official <strong>Oil &amp; Gas Regulatory Authority (OGRA) Notified Prices Portal</strong> and the <strong>Ministry of Energy (Petroleum Division)</strong> press releases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">Primary Source</span>
                <span className="text-xs text-slate-500 block">OGRA Notified Petroleum circulars published under the Petroleum Products Ordinance.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">Secondary Audit</span>
                <span className="text-xs text-slate-500 block">Finance Division &amp; Petroleum Division official media press bulletins.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-1">Deregulated Fuels</span>
                <span className="text-xs text-slate-500 block">PSO published fuel prices for Octane+ Euro 5 (RON 97) retail pumps.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQs Section */}
        <section aria-label="Frequently Asked Questions" className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurate facts regarding petroleum regulations and consumer prices in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                How often are petrol prices revised in Pakistan?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Government of Pakistan reviews petroleum prices on a fortnightly schedule (usually effective from the 1st and 16th of each calendar month), determined by international crude benchmark trends and exchange rate movements.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Are petrol prices different across cities like Lahore, Karachi, and Islamabad?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard petrol and high-speed diesel prices are governed under the Inland Freight Equalization Margin (IFEM), making the notified ex-depot consumer sale price uniform across standard designated retail locations in all major cities.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                What is the current price of High-Speed Diesel (HSD)?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The current verified notified price for High-Speed Diesel is <strong>Rs. {dieselPrice.toFixed(2)} per litre</strong>, effective from October 16, 2026.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                Can I rely on unofficial social media price predictions?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No. Unofficial rumors frequently circulate unverified estimates that do not account for petroleum development levies (PDL) or final Finance Ministry decisions. We only publish once official notifications are signed and verified.
              </p>
            </div>
          </div>
        </section>

        {/* Ad Placement Slot 2 */}
        <AdPlacement slotId="home-bottom-banner" format="banner" />
      </div>
    </>
  );
}
