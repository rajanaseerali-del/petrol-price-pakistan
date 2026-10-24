import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Petrol Price Pakistan',
  description:
    'Get in touch with the Petrol Price Pakistan team for questions, feedback, media inquiries, or general support.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <nav className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-bold">Contact Us</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <span>💬 We&apos;d Love to Hear From You</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Have feedback on our fuel calculators, general questions, or want to partner with us? Reach out through the form below and our team will get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">Direct Support</span>
          <a href="mailto:contact@petrolpricepakistan.pk" className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600">
            contact@petrolpricepakistan.pk
          </a>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">Response Time</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Typically within 24 hours
          </span>
        </div>
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
            Inquiry Topic
          </label>
          <select
            id="subject"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
          >
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">General Inquiry / Question</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Feature Suggestion &amp; Feedback</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Business / Advertising Inquiry</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Press &amp; Media Relations</option>
            <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Data Verification Notice</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Your Message
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            placeholder="How can we help you today? Please share your question or comments..."
          />
        </div>

        <button
          type="button"
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-sm hover:shadow-md transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
