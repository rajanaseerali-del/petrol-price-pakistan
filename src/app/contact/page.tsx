import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Corrections | Petrol Price Pakistan',
  description:
    'Contact the Petrol Price Pakistan editorial desk for inquiries, data verification feedback, or corrections.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
        Contact &amp; Corrections Desk
      </h1>
      <p className="text-sm text-slate-600">
        Have you spotted an error or discrepancy with an official OGRA circular? Submit your feedback or correction request below.
      </p>

      <form className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Your Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            placeholder="Muhammad Ali"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            placeholder="ali@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Inquiry Type
          </label>
          <select
            id="subject"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          >
            <option>Data Correction / Discrepancy Report</option>
            <option>General Feedback</option>
            <option>Press / Media Inquiry</option>
            <option>Advertising &amp; Partnership</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Message &amp; Source Link
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            placeholder="Please detail the notification date and official source URL..."
          />
        </div>

        <button
          type="button"
          className="w-full py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition"
        >
          Submit Inquiry to Editorial Team
        </button>
      </form>
    </div>
  );
}
