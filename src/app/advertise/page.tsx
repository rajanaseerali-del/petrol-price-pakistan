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
            Petrol Price Pakistan provides daily fuel price updates, calculators, and historical charts to thousands of visitors each month. Our audience includes private vehicle owners, motorcycle commuters, public transport operators, and logistics professionals who regularly check fuel rates and plan travel budgets.
          </p>
        </section>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Relevant Audience</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Engage motorists, vehicle owners, and commercial fleet operators nationwide.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Flexible Formats</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Standard IAB display banners, sidebar units, and custom sponsored placements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">High Visibility</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Clean, responsive layouts designed for optimal visibility on mobile and desktop.
            </p>
          </div>
        </div>

        {/* Available Placements */}
        <section className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Available Advertising Placements
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900 dark:text-white">Header Leaderboard:</strong> Top placement across major pages for prominent brand exposure.</li>
            <li><strong className="text-slate-900 dark:text-white">Sidebar Units:</strong> Sticky display ads alongside fuel information and calculation tools.</li>
            <li><strong className="text-slate-900 dark:text-white">In-Content Banners:</strong> Native responsive banners placed within dedicated fuel rate pages.</li>
            <li><strong className="text-slate-900 dark:text-white">Custom Packages:</strong> Tailored sponsorship packages for long-term campaigns.</li>
          </ul>
        </section>

        {/* Inquiry Form */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Advertising Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            To request information about available inventory, rates, or custom packages, please complete the form below or contact us.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ad-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  id="ad-name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="ad-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  id="ad-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ad-company" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Company / Organization
                </label>
                <input
                  id="ad-company"
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="ad-placement" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Interested Placement
                </label>
                <select
                  id="ad-placement"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                >
                  <option>Header Leaderboard</option>
                  <option>Sidebar Banner</option>
                  <option>In-Content Display</option>
                  <option>Custom Sponsorship / Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ad-message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Campaign Overview
              </label>
              <textarea
                id="ad-message"
                rows={3}
                placeholder="Share brief details about your proposed campaign, duration, or questions..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition"
            >
              Submit Inquiry
            </button>
          </form>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            You can also reach our general support team through our{' '}
            <Link href="/contact" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Contact Us page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
