import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise With Us | Petrol Price Pakistan',
  description:
    'Explore advertising opportunities on Petrol Price Pakistan. Reach automotive, commuter, and business audiences across Pakistan.',
};

export default function AdvertisePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 w-full">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Advertise With Us
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Promote your brand, products, or services to an active audience of motorists and businesses in Pakistan.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Why Advertise on Petrol Price Pakistan?
          </h2>
          <p>
            Petrol Price Pakistan provides daily fuel price updates, calculators, and historical charts to visitors across the country. Our audience includes vehicle owners, daily commuters, and transport operators checking fuel rates and calculating travel expenses.
          </p>
        </section>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Relevant Audience</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Reach motorists, car owners, and daily commuters across Pakistan.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Flexible Formats</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Header, sidebar, and in-content display banners and custom packages.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">High Visibility</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Clean, responsive layouts designed for mobile and desktop screens.
            </p>
          </div>
        </div>

        {/* Contact Us CTA */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            For advertising opportunities, rates, or custom placements, please reach out to our team through our Contact Us page.
          </p>
          <div className="pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition"
            >
              Contact Us for Advertising &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
