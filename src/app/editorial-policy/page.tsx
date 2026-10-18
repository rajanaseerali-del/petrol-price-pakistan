import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial & Correction Policy | Petrol Price Pakistan',
  description: 'Our journalistic and regulatory standards for verifying fuel rates in Pakistan.',
};

export default function EditorialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-950 tracking-tight">Editorial &amp; Correction Policy</h1>
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <h2 className="font-bold text-slate-900 text-base">Fact-Checking Standard</h2>
        <p>
          We do not treat social media posts, TV tickers, or unnamed government sources as verified data. A petroleum price is considered verified only upon release of an official written circular from the Oil &amp; Gas Regulatory Authority (OGRA) or the Ministry of Energy (Petroleum Division).
        </p>
        <h2 className="font-bold text-slate-900 text-base">Correction Guidelines</h2>
        <p>
          When an error is detected in a gazette number or revision calculation, we issue an immediate correction and record it in our administrative audit logs. We never silently purge incorrect data without public notice.
        </p>
      </div>
    </div>
  );
}
