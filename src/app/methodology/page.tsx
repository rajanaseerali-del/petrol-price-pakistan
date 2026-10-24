import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verification Methodology & Sources | Petrol Price Pakistan',
  description:
    'Our verification pipeline, source adapters, arithmetic standards, and conflict resolution protocols for Pakistani petroleum prices.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Methodology</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Data Integrity &amp; Verification Methodology
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          How Petrol Price Pakistan ensures zero-tolerance for fabricated numbers, phantom rate changes, and unverified rumors.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">1. Hierarchy of Official Sources</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Data accuracy is our supreme priority. We consume sources in the following strict order:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            <li>
              <strong className="text-slate-900 dark:text-white">Primary Official Source:</strong> Oil &amp; Gas Regulatory Authority (OGRA) notified petroleum-price portal (<code className="bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">https://price.ogra.org.pk</code>).
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Secondary Verification Source:</strong> Ministry of Energy (Petroleum Division) official press releases and Finance Division circulars.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">Commercial Deregulated Fuels:</strong> Pakistan State Oil (PSO) published consumer price tariffs for RON 97 Octane+.
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">2. Decimal Precision: Integer Paisa Arithmetic</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Floating-point numbers in computer software are notorious for minute rounding errors (e.g. <code className="bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">390.230000000004</code>). To preserve 100% mathematical fidelity with government gazettes, all prices are stored internally as <strong className="text-slate-900 dark:text-white">64-bit integer Paisas</strong> (where 1 PKR = 100 Paisa). Rupee values are generated using exact division only for display.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">3. Conflict Resolution Protocol</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            If a news headline disagrees with an OGRA regulatory circular:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            <li>We <strong className="text-slate-900 dark:text-white">never</strong> average the prices.</li>
            <li>We <strong className="text-slate-900 dark:text-white">never</strong> overwrite verified historical records.</li>
            <li>The candidate record is flagged with status <code className="bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">CONFLICT_FLAGGED</code> and held in a secure staging queue until manually validated with the official signed PDF circular.</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">4. Transparent Freshness Thresholds</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            We never label an old price record as &quot;verified today&quot; simply because the visitor loaded the page today. Every rate displays its exact verification timestamp in Pakistan Standard Time (PKT). If a record has not been checked within 72 hours, an automated warning banner informs the visitor.
          </p>
        </section>
      </div>
    </div>
  );
}
