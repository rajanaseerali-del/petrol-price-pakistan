import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial & Correction Policy | Petrol Price Pakistan',
  description: 'Our journalistic and regulatory standards for verifying fuel rates in Pakistan.',
};

export default function EditorialPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 w-full">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Editorial Policy</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Editorial &amp; Correction Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Strict verification criteria and correction standards for government fuel notifications.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
        <div className="space-y-2">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Fact-Checking Standard</h2>
          <p>
            We do not treat social media posts, TV tickers, or unnamed government sources as verified data. A petroleum price is considered verified only upon release of an official written circular from the Oil &amp; Gas Regulatory Authority (OGRA) or the Ministry of Energy (Petroleum Division).
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Correction Guidelines</h2>
          <p>
            When an error is detected in a gazette number or revision calculation, we issue an immediate correction and record it in our administrative audit logs. We never silently purge incorrect data without public notice.
          </p>
        </div>
      </div>
    </div>
  );
}
