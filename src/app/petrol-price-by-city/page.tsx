import { Metadata } from 'next';
import Link from 'next/link';
import { FuelRepository } from '@/lib/fuel-repository';
import { FAQSection } from '@/components/FAQSection';
import { CITY_PAGE_FAQS } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Petrol Price by City in Pakistan | Lahore, Karachi, Islamabad Rates',
  description:
    'Learn how petroleum pricing works across cities in Pakistan. Why standard petrol and diesel are uniformly priced under IFEM equalization.',
};

export default async function ByCityPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 386.30;
  const dieselPrice = latestPrices['diesel']?.pricePkr ?? 396.96;

  const majorCities = [
    { name: 'Islamabad / Rawalpindi', depot: 'Morgah / Sihala Depots', uniform: true },
    { name: 'Lahore', depot: 'Machike Depot', uniform: true },
    { name: 'Karachi', depot: 'Keamari / Korangi Depots', uniform: true },
    { name: 'Peshawar', depot: 'Tarujabba Depot', uniform: true },
    { name: 'Faisalabad', depot: 'Gatti Depot', uniform: true },
    { name: 'Multan', depot: 'Sher Shah Depot', uniform: true },
    { name: 'Quetta', depot: 'Quetta Main Depot', uniform: true },
    { name: 'Gujranwala', depot: 'Machike Depot', uniform: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      <nav className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-white font-black">Petrol Price by City</li>
        </ol>
      </nav>

      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
          <span>🏙️ Nationwide Equalization</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight">
          Petrol &amp; Fuel Prices Across Pakistani Cities
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          An honest, transparent explanation of how city-level petroleum pricing operates in Pakistan under the Inland Freight Equalization Margin (IFEM).
        </p>
      </div>

      {/* Educational Banner */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800/80 rounded-3xl p-8 sm:p-10 space-y-4 text-emerald-950 dark:text-emerald-200 transition-colors shadow-sm">
        <h2 className="font-black text-2xl text-emerald-900 dark:text-emerald-300">
          💡 The Truth About City Rates: Inland Freight Equalization Margin (IFEM)
        </h2>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-base sm:text-lg">
          Many deceptive websites fabricate separate rate cards for each city claiming prices differ by 5-10 PKR between Lahore, Karachi, and Islamabad. In reality, Pakistan’s petroleum regulatory framework uses the <strong>Inland Freight Equalization Margin (IFEM)</strong> to pool national transport costs. This ensures consumers in Quetta or Peshawar pay the exact same regulated ex-depot rate as consumers at the port of Karachi.
        </p>
      </div>

      {/* City Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden transition-colors">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Current Regulated Notified Rate by Metropolitan Region
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Verified official consumer rates across major municipal oil terminals
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base sm:text-lg">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-black uppercase tracking-wider text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">City</th>
                <th className="py-4 px-6">Primary Supply Depot</th>
                <th className="py-4 px-6">Petrol (Rs./L)</th>
                <th className="py-4 px-6">Diesel (Rs./L)</th>
                <th className="py-4 px-6">Pricing Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {majorCities.map(city => (
                <tr key={city.name} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  <td className="py-5 px-6 font-black text-slate-950 dark:text-white">{city.name}</td>
                  <td className="py-5 px-6 text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">{city.depot}</td>
                  <td className="py-5 px-6 font-black text-emerald-800 dark:text-emerald-400">Rs. {petrolPrice.toFixed(2)}</td>
                  <td className="py-5 px-6 font-black text-slate-950 dark:text-slate-100">Rs. {dieselPrice.toFixed(2)}</td>
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      National IFEM Regulated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO FAQs */}
      <FAQSection
        faqs={CITY_PAGE_FAQS}
        title="City Fuel Pricing FAQs"
        description="Clarifications regarding freight equalisation, PSO pump variations, and intercity fuel pricing rules."
      />
    </div>
  );
}
