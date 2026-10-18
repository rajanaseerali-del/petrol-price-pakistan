import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification Methodology & Sources | Petrol Price Pakistan',
  description:
    'Our verification pipeline, source adapters, arithmetic standards, and conflict resolution protocols for Pakistani petroleum prices.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Methodology</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Data Integrity &amp; Verification Methodology
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          How Petrol Price Pakistan ensures zero-tolerance for fabricated numbers, phantom rate changes, and unverified rumors.
        </p>
      </div>

      <div className="prose prose-slate text-sm space-y-6">
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Hierarchy of Official Sources</h2>
          <p className="text-slate-600 leading-relaxed">
            Data accuracy is our supreme priority. We consume sources in the following strict order:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Primary Official Source:</strong> Oil &amp; Gas Regulatory Authority (OGRA) notified petroleum-price portal (<code>https://price.ogra.org.pk</code>).
            </li>
            <li>
              <strong>Secondary Verification Source:</strong> Ministry of Energy (Petroleum Division) official press releases and Finance Division circulars.
            </li>
            <li>
              <strong>Commercial Deregulated Fuels:</strong> Pakistan State Oil (PSO) published consumer price tariffs for RON 97 Octane+.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Decimal Precision: Integer Paisa Arithmetic</h2>
          <p className="text-slate-600 leading-relaxed">
            Floating-point numbers in computer software are notorious for minute rounding errors (e.g. <code>390.230000000004</code>). To preserve 100% mathematical fidelity with government gazettes, all prices are stored internally as <strong>64-bit integer Paisas</strong> (where 1 PKR = 100 Paisa). Rupee values are generated using exact division only for display.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Conflict Resolution Protocol</h2>
          <p className="text-slate-600 leading-relaxed">
            If a news headline disagrees with an OGRA regulatory circular:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>We <strong>never</strong> average the prices.</li>
            <li>We <strong>never</strong> overwrite verified historical records.</li>
            <li>The candidate record is flagged with status <code>CONFLICT_FLAGGED</code> and held in a secure staging queue until manually validated with the official signed PDF circular.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Transparent Freshness Thresholds</h2>
          <p className="text-slate-600 leading-relaxed">
            We never label an old price record as &quot;verified today&quot; simply because the visitor loaded the page today. Every rate displays its exact verification timestamp in Pakistan Standard Time (PKT). If a record has not been checked within 72 hours, an automated warning banner informs the visitor.
          </p>
        </section>
      </div>
    </div>
  );
}
