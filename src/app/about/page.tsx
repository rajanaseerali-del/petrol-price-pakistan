import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Petrol Price Pakistan',
  description:
    'About Petrol Price Pakistan: Our mission to provide reliable, transparent petroleum pricing data for Pakistani citizens and businesses.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
        About Petrol Price Pakistan
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          <strong>Petrol Price Pakistan</strong> was founded to solve a pervasive problem across Pakistani digital media: sensationalized, contradictory, and fabricated fuel price rumors.
        </p>
        <p>
          Prior to official government announcements, social media channels frequently circulate speculative numbers that cause consumer panic, long lines at gas stations, and artificial fuel hoarding.
        </p>
        <p>
          Our mission is simple and unwavering: <strong>provide 100% verified, traceable, and timestamped petroleum price data</strong> based solely on notified government circulars from the Oil &amp; Gas Regulatory Authority (OGRA) and the Ministry of Energy.
        </p>
        <h3 className="text-base font-bold text-slate-900 pt-2">Our Operating Standards</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Traceability:</strong> Every published rate links to its official source documentation.</li>
          <li><strong>No Predictions:</strong> We do not publish speculative predictions or claim insider access.</li>
          <li><strong>Free Tools:</strong> We provide free journey and fuel cost calculators for Pakistani drivers.</li>
        </ul>
      </div>
    </div>
  );
}
