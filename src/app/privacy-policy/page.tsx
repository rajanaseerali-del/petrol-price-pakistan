import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Petrol Price Pakistan',
  description: 'Privacy Policy and data collection disclosure for Petrol Price Pakistan.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Privacy Policy</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Last updated: October 2026 · Transparency on data protection and cookie handling.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
        <p>
          At <strong className="text-slate-900 dark:text-white">Petrol Price Pakistan</strong> (accessible at petrolpricepakistan.pk), user privacy is paramount. This Privacy Policy details the types of information we collect and how we use it.
        </p>
        <div className="space-y-2">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Cookies and Web Beacons</h2>
          <p>
            Like any other modern website, Petrol Price Pakistan uses cookies. These cookies store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited to optimize the user experience.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
