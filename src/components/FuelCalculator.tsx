'use client';

import React, { useState } from 'react';

interface FuelCalculatorProps {
  initialPetrolPrice?: number;
  initialDieselPrice?: number;
}

export function FuelCalculator({
  initialPetrolPrice = 390.23,
  initialDieselPrice = 396.96,
}: FuelCalculatorProps) {
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel'>('petrol');
  const [distanceKm, setDistanceKm] = useState<number | ''>(50);
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState<number | ''>(14);
  const [customPrice, setCustomPrice] = useState<number | ''>(initialPetrolPrice);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  const activePrice =
    typeof customPrice === 'number'
      ? customPrice
      : fuelType === 'petrol'
      ? initialPetrolPrice
      : initialDieselPrice;

  const validDistance = typeof distanceKm === 'number' && distanceKm > 0 ? distanceKm : 0;
  const effectiveDistance = isRoundTrip ? validDistance * 2 : validDistance;
  const validMileage =
    typeof mileageKmPerLitre === 'number' && mileageKmPerLitre > 0 ? mileageKmPerLitre : 0;

  // Calculation logic
  const litresRequired = validMileage > 0 ? effectiveDistance / validMileage : 0;
  const totalCost = litresRequired * activePrice;
  const costPerKm = effectiveDistance > 0 ? totalCost / effectiveDistance : 0;

  const handleFuelTypeChange = (type: 'petrol' | 'diesel') => {
    setFuelType(type);
    setCustomPrice(type === 'petrol' ? initialPetrolPrice : initialDieselPrice);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-6 sm:p-8">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Fuel &amp; Trip Cost Calculator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Calculate estimated fuel consumption and journey cost for Pakistani roads using active notified prices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Fuel selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Fuel Product
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFuelTypeChange('petrol')}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold border transition text-center ${
                  fuelType === 'petrol'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Petrol (Rs. {initialPetrolPrice.toFixed(2)})
              </button>
              <button
                type="button"
                onClick={() => handleFuelTypeChange('diesel')}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold border transition text-center ${
                  fuelType === 'diesel'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Diesel (Rs. {initialDieselPrice.toFixed(2)})
              </button>
            </div>
          </div>

          {/* Distance input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="distance-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Trip Distance (Kilometres)
              </label>
              <span className="text-[11px] text-slate-400">e.g. Lahore to Islamabad ~ 375 km</span>
            </div>
            <div className="relative">
              <input
                id="distance-input"
                type="number"
                min="0"
                step="1"
                value={distanceKm}
                onChange={e => setDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm font-medium text-slate-900"
                placeholder="50"
              />
              <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-bold">KM</span>
            </div>
          </div>

          {/* Vehicle mileage */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="mileage-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Average Mileage (KM / Litre)
              </label>
              <span className="text-[11px] text-slate-400">Bike: 40-50 | Car: 12-18 | SUV: 8-11</span>
            </div>
            <div className="relative">
              <input
                id="mileage-input"
                type="number"
                min="0.1"
                step="0.5"
                value={mileageKmPerLitre}
                onChange={e => setMileageKmPerLitre(e.target.value === '' ? '' : Math.max(0.1, parseFloat(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm font-medium text-slate-900"
                placeholder="14"
              />
              <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-bold">KM/L</span>
            </div>
          </div>

          {/* Price per litre */}
          <div>
            <label htmlFor="price-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Price per Litre (PKR)
            </label>
            <div className="relative">
              <input
                id="price-input"
                type="number"
                min="1"
                step="0.01"
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm font-medium text-slate-900"
                placeholder="390.23"
              />
              <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-bold">PKR</span>
            </div>
          </div>

          {/* Round trip toggle */}
          <div className="flex items-center gap-3 pt-1">
            <input
              id="round-trip-check"
              type="checkbox"
              checked={isRoundTrip}
              onChange={e => setIsRoundTrip(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <label htmlFor="round-trip-check" className="text-xs font-bold text-slate-700 cursor-pointer">
              Include return journey (Round Trip — {validDistance * 2} KM)
            </label>
          </div>
        </div>

        {/* Results display */}
        <div className="lg:col-span-5 bg-emerald-950/5 rounded-2xl border border-emerald-900/10 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
              Trip Cost Estimate
            </span>
            <div className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-emerald-900/10 shadow-xs">
                <span className="text-xs text-slate-500 block">Total Estimated Fuel Cost</span>
                <span className="text-3xl font-black text-emerald-900 tracking-tight mt-1 block">
                  Rs. {totalCost.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-900/10 shadow-xs">
                  <span className="text-[11px] text-slate-500 block">Litres Needed</span>
                  <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                    {litresRequired.toFixed(2)} L
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-emerald-900/10 shadow-xs">
                  <span className="text-[11px] text-slate-500 block">Cost Per KM</span>
                  <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                    Rs. {costPerKm.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-emerald-900/10 pt-4">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              * Calculations are estimates based on standard driving conditions, AC consumption, and declared mileage. Actual fuel economy may vary according to traffic and vehicle condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
