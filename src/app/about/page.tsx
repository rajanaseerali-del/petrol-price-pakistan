import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us & Mission | Petrol Price Pakistan',
  description:
    'Learn more about Petrol Price Pakistan: providing up-to-date fuel rates, historical price archives, and fuel calculators for motorists across Pakistan.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 w-full">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          About Us &amp; Our Mission
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Providing simple, accessible, and transparent petroleum price information across Pakistan.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Who We Are
          </h2>
          <p>
            <strong className="text-slate-900 dark:text-white">Petrol Price Pakistan</strong> is an independent digital information portal dedicated to tracking and publishing the latest petroleum product prices across Pakistan.
          </p>
          <p>
            We compile notified rates for Petrol (Motor Spirit), High-Speed Diesel (HSD), Hi-Octane (RON 97), Kerosene Oil (SKO), Light Diesel Oil (LDO), and Liquefied Petroleum Gas (LPG) sourced from regulatory circulars issued by the Oil and Gas Regulatory Authority (OGRA) and authorized Oil Marketing Companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Our Mission
          </h2>
          <p>
            Our mission is to give Pakistani motorists, transport operators, and daily commuters quick, convenient access to current fuel prices, revision histories, and helpful budget estimation tools.
          </p>
          <p>
            Whether you are planning a long highway journey or budgeting monthly business fuel expenses, our goal is to deliver clear and useful information without unnecessary complexity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            What We Offer
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-slate-900 dark:text-white">Current Rates:</strong> Up-to-date retail rates for all primary fuel categories regulated in Pakistan.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Historical Archives:</strong> Chronological records of previous government price revisions and notifications.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Fuel Calculators:</strong> Free online tools to estimate trip travel costs and vehicle tank refill budgets.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <p>
            We welcome feedback, suggestions, and inquiries from our users. Feel free to reach out to our team through our{' '}
            <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Contact Us page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
