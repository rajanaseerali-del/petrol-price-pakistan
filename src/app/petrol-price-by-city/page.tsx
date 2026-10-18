import { Metadata } from 'next';
import { FuelRepository } from '@/lib/fuel-repository';

export const metadata: Metadata = {
  title: 'Petrol Price by City in Pakistan | Lahore, Karachi, Islamabad Rates',
  description:
    'Learn how petroleum pricing works across cities in Pakistan. Why standard petrol and diesel are uniformly priced under IFEM equalization.',
};

export default async function ByCityPage() {
  const latestPrices = await FuelRepository.getLatestPrices();
  const petrolPrice = latestPrices['petrol']?.pricePkr ?? 390.23;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <nav className="text-xs text-slate-500 font-medium">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-emerald-700">Home</a>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold">Petrol Price by City</li>
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Petrol &amp; Fuel Prices Across Pakistani Cities
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          An honest, transparent explanation of how city-level petroleum pricing operates in Pakistan under the Inland Freight Equalization Margin (IFEM).
        </p>
      </div>

      {/* Educational Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-7 space-y-2 text-xs sm:text-sm text-emerald-950">
        <h3 className="font-bold text-base text-emerald-900">
          💡 The Truth About City Rates: Inland Freight Equalization Margin (IFEM)
        </h3>
        <p className="leading-relaxed">
          Many deceptive websites fabricate separate rate cards for each city claiming prices differ by 5-10 PKR between Lahore, Karachi, and Islamabad. In reality, Pakistan’s petroleum regulatory framework uses the <strong>Inland Freight Equalization Margin (IFEM)</strong> to pool national transport costs. This ensures consumers in Quetta or Peshawar pay the exact same regulated ex-depot rate as consumers at the port of Karachi.
        </p>
      </div>

      {/* City Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Current Regulated Notified Rate by Metropolitan Region
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Primary Supply Depot</th>
                <th className="py-3 px-4">Petrol (Rs./L)</th>
                <th className="py-3 px-4">Diesel (Rs./L)</th>
                <th className="py-3 px-4">Pricing Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {majorCities.map(city => (
                <tr key={city.name} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{city.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{city.depot}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-900">Rs. {petrolPrice.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Rs. {dieselPrice.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                      National IFEM Regulated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
