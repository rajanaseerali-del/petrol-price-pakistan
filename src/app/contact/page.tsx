import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact & Corrections | Petrol Price Pakistan',
  description:
    'Contact the Petrol Price Pakistan editorial desk for inquiries, data verification feedback, or corrections.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Contact</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Contact &amp; Corrections Desk
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Have you spotted an error or discrepancy with an official OGRA circular? Submit your feedback or correction request below.
        </p>
      </div>

      <form className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Your Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            placeholder="Muhammad Ali"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            placeholder="ali@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Inquiry Type
          </label>
          <select
            id="subject"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
          >
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Data Correction / Discrepancy Report</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">General Feedback</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Press / Media Inquiry</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Advertising &amp; Partnership</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Message &amp; Source Link
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            placeholder="Please detail the notification date and official source URL..."
          />
        </div>

        <button
          type="button"
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-sm hover:shadow-md transition"
        >
          Submit Inquiry to Editorial Team
        </button>
      </form>
    </div>
  );
}
