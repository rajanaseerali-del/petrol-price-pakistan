import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Petrol Price Pakistan',
  description: 'Privacy Policy and data collection disclosure for Petrol Price Pakistan.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <h1 className="text-3xl font-black text-slate-950 tracking-tight">Privacy Policy</h1>
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>Last updated: October 2026</p>
        <p>
          At <strong>Petrol Price Pakistan</strong> (accessible at petrolpricepakistan.pk), user privacy is paramount. This Privacy Policy details the types of information we collect and how we use it.
        </p>
        <h2 className="font-bold text-slate-900 text-base">Cookies and Web Beacons</h2>
        <p>
          Like any other modern website, Petrol Price Pakistan uses &apos;cookies&apos;. These cookies store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited.
        </p>
        <h2 className="font-bold text-slate-900 text-base">Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
        </p>
      </div>
    </div>
  );
}
