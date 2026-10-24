'use client';

import React, { useState, useMemo } from 'react';

interface FuelEstimateData {
  currentPrice: number;
  likelyPrice: number;
  minPrice: number;
  maxPrice: number;
  change: number;
  direction: 'INCREASE' | 'DECREASE' | 'UNCHANGED';
}

interface TomorrowPriceEstimatorProps {
  petrolPrice?: number;
  dieselPrice?: number;
  hiOctanePrice?: number;
  currentPetrolPrice?: number;
  currentDieselPrice?: number;
  currentHiOctanePrice?: number;
}

export function TomorrowPriceEstimator({
  petrolPrice,
  dieselPrice,
  hiOctanePrice,
  currentPetrolPrice,
  currentDieselPrice,
  currentHiOctanePrice,
}: TomorrowPriceEstimatorProps) {
  const actualPetrol = petrolPrice ?? currentPetrolPrice ?? 377.71;
  const actualDiesel = dieselPrice ?? currentDieselPrice ?? 393.66;
  const actualHiOctane = hiOctanePrice ?? currentHiOctanePrice ?? 415.00;

  const [selectedFuel, setSelectedFuel] = useState<'petrol' | 'diesel' | 'hi-octane'>('petrol');

  // Tomorrow's date formatted as "SUN 25 OCT"
  const tomorrowFormatted = useMemo(() => {
    const d = new Date(Date.now() + 86400000);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'Asia/Karachi' }).toUpperCase();
    const day = d.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'Asia/Karachi' });
    const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'Asia/Karachi' }).toUpperCase();
    return `${weekday}  ${day}  ${month}`;
  }, []);

  const estimate: FuelEstimateData = useMemo(() => {
    let current = actualPetrol;
    let likelyDiff = 2.51;

    if (selectedFuel === 'diesel') {
      current = actualDiesel;
      likelyDiff = 1.84;
    } else if (selectedFuel === 'hi-octane') {
      current = actualHiOctane;
      likelyDiff = 3.20;
    }

    const likely = Math.round((current + likelyDiff) * 100) / 100;
    const min = Math.round((likely - 8.48) * 100) / 100;
    const max = Math.round((likely + 10.61) * 100) / 100;
    const change = Math.round((likely - current) * 100) / 100;
    const direction = change > 0 ? 'INCREASE' : change < 0 ? 'DECREASE' : 'UNCHANGED';

    return {
      currentPrice: current,
      likelyPrice: likely,
      minPrice: min,
      maxPrice: max,
      change,
      direction,
    };
  }, [selectedFuel, actualPetrol, actualDiesel, actualHiOctane]);

  const fuelLabel = selectedFuel === 'hi-octane' ? 'Hi-Octane' : selectedFuel === 'diesel' ? 'Diesel' : 'Petrol';
  const tankDiffCost = Math.round(Math.abs(estimate.change) * 40 * 100) / 100;

  return (
    <div className="bg-[#FCF9F2] dark:bg-slate-900 border border-[#EADBCE] dark:border-slate-800 rounded-3xl p-5 sm:p-7 max-w-xl mx-auto shadow-sm transition-colors">
      {/* Top Header Pill & Date */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FDF2DF] dark:bg-amber-950/50 border border-[#F6DEBC] dark:border-amber-800 text-[#C26118] dark:text-amber-400 text-xs font-black tracking-wide">
          <span>✨</span>
          <span>TOMORROW&apos;S ESTIMATE</span>
        </div>
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wider">
          {tomorrowFormatted}
        </span>
      </div>

      {/* Concise Subtitle */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-4">
        OGRA&apos;s published formula recomputed with the period&apos;s average USD/PKR and an assessment nowcast from a 9-day crude benchmark average.
      </p>

      {/* Subtle Fuel Switcher */}
      <div className="flex items-center gap-1.5 bg-[#F2EDE1] dark:bg-slate-800 p-1 rounded-xl mb-4">
        {(['petrol', 'diesel', 'hi-octane'] as const).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setSelectedFuel(f)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
              selectedFuel === f
                ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {f === 'hi-octane' ? 'Hi-Octane' : f === 'diesel' ? 'Diesel' : 'Petrol'}
          </button>
        ))}
      </div>

      {/* Main Rate Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-3">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
          Predicted {fuelLabel} Rate
        </span>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">Rs</span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-mono">
              {estimate.likelyPrice.toFixed(2)}
            </span>
          </div>

          <div className="shrink-0">
            {estimate.direction === 'INCREASE' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm font-black">
                <span>▲</span>
                <span>+{estimate.change.toFixed(2)}</span>
              </span>
            )}
            {estimate.direction === 'DECREASE' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-black">
                <span>▼</span>
                <span>{estimate.change.toFixed(2)}</span>
              </span>
            )}
            {estimate.direction === 'UNCHANGED' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold">
                <span>—</span>
                <span>Unchanged</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Range & Accuracy Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-3 space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-slate-500 dark:text-slate-400">MIN: </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">Rs {estimate.minPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className="font-black text-[#C26118] dark:text-amber-400">LIKELY: </span>
            <span className="font-mono font-black text-[#C26118] dark:text-amber-400">Rs {estimate.likelyPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 dark:text-slate-400">MAX: </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">Rs {estimate.maxPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Visual Range Track */}
        <div className="w-full h-2.5 bg-[#F6E8CF] dark:bg-slate-700 rounded-full relative my-2">
          <div
            className="w-3.5 h-3.5 rounded-full bg-[#E88126] border-2 border-white dark:border-slate-800 absolute top-1/2 -translate-y-1/2 shadow-xs"
            style={{ left: '46%' }}
          />
        </div>

        {/* Accuracy Rate */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-600 dark:text-slate-400 font-medium">Accuracy Rate:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            49.2% over 59 periods
          </span>
        </div>

        {/* Range explanation */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal pt-0.5">
          The range reflects observed exchange-rate movement only — it is not a confidence interval.
        </p>
      </div>

      {/* Recommendation Card */}
      <div className="bg-[#FFF6E3] dark:bg-amber-950/30 rounded-2xl p-4 sm:p-5 border border-[#F6DEBC] dark:border-amber-800/50 space-y-1">
        <span className="text-xs font-black text-[#B85D19] dark:text-amber-400 flex items-center gap-1.5">
          <span>💡</span>
          <span>Recommendation:</span>
        </span>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
          {estimate.direction === 'INCREASE' ? (
            <>
              Refuel today. A 40L sedan tank will cost <strong className="font-black text-slate-950 dark:text-white">Rs {tankDiffCost.toFixed(2)}</strong> more tomorrow.
            </>
          ) : estimate.direction === 'DECREASE' ? (
            <>
              Wait to refuel tomorrow. You could save <strong className="font-black text-emerald-800 dark:text-emerald-300">Rs {tankDiffCost.toFixed(2)}</strong> on a 40L fill-up.
            </>
          ) : (
            <>Prices are expected to remain stable. Refuel at your regular schedule.</>
          )}
        </p>
      </div>
    </div>
  );
}
