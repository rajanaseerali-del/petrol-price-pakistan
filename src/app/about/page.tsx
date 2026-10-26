import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Petrol Price Pakistan',
  description:
    'About Petrol Price Pakistan: Our mission to provide reliable, transparent petroleum pricing data for Pakistani citizens and businesses.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 w-full">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">About Us</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          About Petrol Price Pakistan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Dedicated to eliminating rumors with transparent, official petroleum rate reporting.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
        <p>
          <strong className="text-slate-900 dark:text-white">Petrol Price Pakistan</strong> was founded to solve a pervasive problem across Pakistani digital media: sensationalized, contradictory, and fabricated fuel price rumors.
        </p>
        <p>
          Prior to official government announcements, social media channels frequently circulate speculative numbers that cause consumer panic, long lines at gas stations, and artificial fuel hoarding.
        </p>
        <p>
          Our mission is simple and unwavering: <strong className="text-slate-900 dark:text-white">provide 100% verified, traceable, and timestamped petroleum price data</strong> based solely on notified government circulars from the Oil &amp; Gas Regulatory Authority (OGRA) and the Ministry of Energy.
        </p>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-2">Our Operating Standards</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-slate-900 dark:text-white">Traceability:</strong> Every published rate links to its official source documentation.</li>
          <li><strong className="text-slate-900 dark:text-white">No Predictions:</strong> We do not publish speculative predictions or claim insider access.</li>
          <li><strong className="text-slate-900 dark:text-white">Free Tools:</strong> We provide free journey and fuel cost calculators for Pakistani drivers.</li>
        </ul>
      </div>
    </div>
  );
}
