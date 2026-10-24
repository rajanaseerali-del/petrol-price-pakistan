import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise With Us | Petrol Price Pakistan',
  description:
    'Partner with Pakistan’s leading verified fuel rate and automotive portal. Reach millions of vehicle owners, fleet managers, and high-intent motorists nationwide.',
};

export default function AdvertisePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Advertise</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <span>📢 Partnership &amp; Advertising</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Advertise With Petrol Price Pakistan
        </h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          Connect your brand directly with Pakistan&apos;s most active audience of daily motorists, commercial fleet operators, car buyers, and logistics professionals.
        </p>
      </div>

      {/* Audience Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="block text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">100%</span>
          <span className="block text-sm font-bold text-slate-900 dark:text-white mt-1">Vehicle &amp; Commuter Focus</span>
          <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">Car owners, bike commuters, and logistics operators actively planning travel costs.</span>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="block text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">High Intent</span>
          <span className="block text-sm font-bold text-slate-900 dark:text-white mt-1">Prime Receptive Audience</span>
          <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">Users visiting specifically to calculate budgets for auto insurance, fuel cards, and maintenance.</span>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="block text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">National</span>
          <span className="block text-sm font-bold text-slate-900 dark:text-white mt-1">Nationwide City Reach</span>
          <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">Balanced audience distribution across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and Peshawar.</span>
        </div>
      </div>

      {/* Available Placements */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            High-Impact Advertising Formats
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Choose from flexible display ad slots and interactive tool sponsorships tailored to your conversion goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Top Banner</span>
              <span className="text-xs font-bold text-slate-500">728x90 / 320x100</span>
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Above-The-Fold Leaderboard</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Maximum visibility placed immediately beneath the primary rate display. Perfect for banks, fuel cards, car insurance, and auto finance brands.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Sponsored Tool</span>
              <span className="text-xs font-bold text-slate-500">Integrated</span>
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Calculator Sponsorship</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Co-branded placement within our Journey Fuel Cost &amp; Tank Fill-Up Calculators, engaging users at the exact moment they compute travel spend.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">In-Content</span>
              <span className="text-xs font-bold text-slate-500">Responsive Display</span>
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Mid-Article Responsive Banners</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Contextual banners embedded seamlessly across our dedicated Petrol, Diesel, By-City, and Historical notification archives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Direct Media</span>
              <span className="text-xs font-bold text-slate-500">Custom Campaign</span>
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Brand Partnerships &amp; Takeovers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Exclusive category ownership for oil marketing companies (OMCs), tyre manufacturers, lubricant brands, and electric vehicle providers.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Request an Advertising Proposal
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 font-normal">
            Fill in your details below and our partnerships desk will respond within 24 business hours with rate cards and placement availability.
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Company / Brand Name
              </label>
              <input
                id="company"
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g. Shell / PakWheels / Mobil"
              />
            </div>
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Contact Person Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ad-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Corporate Email Address
              </label>
              <input
                id="ad-email"
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                placeholder="marketing@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Phone / WhatsApp Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                placeholder="+92 300 1234567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="campaign-type" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Interested Placement
            </label>
            <select
              id="campaign-type"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            >
              <option>Above-The-Fold Leaderboard Banner</option>
              <option>Calculator Tool Exclusive Sponsorship</option>
              <option>Responsive In-Content Display Banner</option>
              <option>Full Site Brand Sponsorship / Takeover</option>
              <option>Other / Custom Proposal</option>
            </select>
          </div>

          <div>
            <label htmlFor="ad-notes" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Campaign Goals &amp; Estimated Timeline
            </label>
            <textarea
              id="ad-notes"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              placeholder="Tell us about your campaign objectives, target launch date, and duration..."
            />
          </div>

          <button
            type="button"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-sm hover:shadow-md transition"
          >
            Send Advertising Inquiry
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          <span>Or contact our advertising desk directly at </span>
          <a href="mailto:ads@petrolpricepakistan.pk" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
            ads@petrolpricepakistan.pk
          </a>
        </div>
      </div>
    </div>
  );
}
