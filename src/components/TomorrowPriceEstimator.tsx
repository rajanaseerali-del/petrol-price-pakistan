'use client';

import React, { useState, useMemo, useEffect } from 'react';

export type FuelType = 'petrol' | 'diesel' | 'hi-octane' | 'kerosene' | 'ldo' | 'lpg';

interface TomorrowPriceEstimatorProps {
  petrolPrice?: number;
  dieselPrice?: number;
  hiOctanePrice?: number;
  kerosenePrice?: number;
  ldoPrice?: number;
  lpgPrice?: number;
  currentPetrolPrice?: number;
  currentDieselPrice?: number;
  currentHiOctanePrice?: number;
}

interface ProductProfile {
  id: FuelType;
  label: string;
  unit: string;
  basePrice: number;
  crudeWeight: number; // sensitivity to $/bbl
  fxWeight: number;    // sensitivity to USD/PKR
  pdlCurrent: number;  // current levy in PKR
  pdlEligible: boolean;
}

export function TomorrowPriceEstimator({
  petrolPrice,
  dieselPrice,
  hiOctanePrice,
  kerosenePrice,
  ldoPrice,
  lpgPrice,
  currentPetrolPrice,
  currentDieselPrice,
  currentHiOctanePrice,
}: TomorrowPriceEstimatorProps) {
  const actualPetrol = petrolPrice ?? currentPetrolPrice ?? 377.71;
  const actualDiesel = dieselPrice ?? currentDieselPrice ?? 393.66;
  const actualHiOctane = hiOctanePrice ?? currentHiOctanePrice ?? 415.00;
  const actualKerosene = kerosenePrice ?? 330.96;
  const actualLdo = ldoPrice ?? 275.24;
  const actualLpg = lpgPrice ?? 279.34;

  const [selectedFuel, setSelectedFuel] = useState<FuelType>('petrol');
  
  // Interactive scenario variables
  const [crudeDeltaUsd, setCrudeDeltaUsd] = useState<number>(0); // change in benchmark $/bbl (-10 to +10)
  const [fxDeltaPkr, setFxDeltaPkr] = useState<number>(0);       // change in USD/PKR (-5 to +5)
  const [pdlDeltaPkr, setPdlDeltaPkr] = useState<number>(0);     // expected change in PDL levy (0 to +10)
  const [tankSize, setTankSize] = useState<number>(45);

  // Time until next fortnightly revision (1st / 16th of each month at 00:00 PKT)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const nextRevisionDateStr = useMemo(() => {
    const now = new Date();
    // In Pakistan, reviews are effective 1st and 16th
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    let target: Date;
    if (date < 15) {
      target = new Date(Date.UTC(year, month, 15, 19, 0, 0)); // 16th 00:00 PKT
    } else {
      // 1st of next month
      target = new Date(Date.UTC(year, month + 1, 0, 19, 0, 0)); // 1st 00:00 PKT
    }
    return target;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, nextRevisionDateStr.getTime() - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [nextRevisionDateStr]);

  const tomorrowDateFormatted = useMemo(() => {
    const d = new Date(Date.now() + 86400000);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Karachi',
    });
  }, []);

  const productProfiles: Record<FuelType, ProductProfile> = useMemo(() => ({
    petrol: {
      id: 'petrol',
      label: 'Petrol',
      unit: 'Litre',
      basePrice: actualPetrol,
      crudeWeight: 1.35, // ~1 barrel = 159 litres, imported products reflect ~Rs 1.35 per $1/bbl shift
      fxWeight: 0.85,    // ~Rs 0.85 per Rs 1 USD/PKR movement
      pdlCurrent: 60.0,
      pdlEligible: true,
    },
    diesel: {
      id: 'diesel',
      label: 'Diesel',
      unit: 'Litre',
      basePrice: actualDiesel,
      crudeWeight: 1.45,
      fxWeight: 0.90,
      pdlCurrent: 60.0,
      pdlEligible: true,
    },
    'hi-octane': {
      id: 'hi-octane',
      label: 'Hi-Octane',
      unit: 'Litre',
      basePrice: actualHiOctane,
      crudeWeight: 1.60,
      fxWeight: 1.10,
      pdlCurrent: 50.0,
      pdlEligible: true,
    },
    kerosene: {
      id: 'kerosene',
      label: 'Kerosene',
      unit: 'Litre',
      basePrice: actualKerosene,
      crudeWeight: 1.25,
      fxWeight: 0.75,
      pdlCurrent: 0.0,
      pdlEligible: false,
    },
    ldo: {
      id: 'ldo',
      label: 'Light Diesel',
      unit: 'Litre',
      basePrice: actualLdo,
      crudeWeight: 1.20,
      fxWeight: 0.70,
      pdlCurrent: 0.0,
      pdlEligible: false,
    },
    lpg: {
      id: 'lpg',
      label: 'LPG',
      unit: 'kg',
      basePrice: actualLpg,
      crudeWeight: 0.95,
      fxWeight: 0.65,
      pdlCurrent: 0.0,
      pdlEligible: false,
    },
  }), [actualPetrol, actualDiesel, actualHiOctane, actualKerosene, actualLdo, actualLpg]);

  const currentProfile = productProfiles[selectedFuel];

  // Algorithmic projection based on Platts benchmark formula
  const calculation = useMemo(() => {
    const base = currentProfile.basePrice;
    
    // Impact of crude benchmark ($/bbl change)
    const crudeImpact = crudeDeltaUsd * currentProfile.crudeWeight;
    // Impact of currency depreciation/appreciation
    const fxImpact = fxDeltaPkr * currentProfile.fxWeight;
    // Impact of government levy revision
    const pdlImpact = currentProfile.pdlEligible ? pdlDeltaPkr : 0;

    const totalChange = Math.round((crudeImpact + fxImpact + pdlImpact) * 100) / 100;
    const projectedPrice = Math.round((base + totalChange) * 100) / 100;

    // Plausibility bounds
    const minBand = Math.round((projectedPrice - Math.abs(totalChange) * 0.3 - 2.5) * 100) / 100;
    const maxBand = Math.round((projectedPrice + Math.abs(totalChange) * 0.3 + 2.5) * 100) / 100;

    const percentChange = base > 0 ? Number(((totalChange / base) * 100).toFixed(2)) : 0;
    const direction = totalChange > 0 ? 'INCREASE' : totalChange < 0 ? 'DECREASE' : 'UNCHANGED';

    // Approximate component breakdown
    const estimatedExRefinery = Math.max(50, Math.round((projectedPrice * 0.58) * 100) / 100);
    const estimatedPdl = currentProfile.pdlCurrent + pdlImpact;
    const estimatedMargins = Math.round((projectedPrice - estimatedExRefinery - estimatedPdl) * 100) / 100;

    const tankTotalCost = Math.round(tankSize * projectedPrice * 100) / 100;
    const tankDifference = Math.round(Math.abs(totalChange * tankSize) * 100) / 100;

    return {
      basePrice: base,
      projectedPrice,
      totalChange,
      percentChange,
      direction,
      minBand,
      maxBand,
      estimatedExRefinery,
      estimatedPdl,
      estimatedMargins,
      tankTotalCost,
      tankDifference,
    };
  }, [currentProfile, crudeDeltaUsd, fxDeltaPkr, pdlDeltaPkr, tankSize]);

  // Reset scenario to flat neutral nowcast
  const handleResetScenario = () => {
    setCrudeDeltaUsd(0);
    setFxDeltaPkr(0);
    setPdlDeltaPkr(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm transition-all w-full">
      {/* Top Banner: Title & Revision Countdown */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Interactive Financial Forecasting Model
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Tomorrow &amp; Next Revision Price Estimator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            Dynamic import-parity model computing expected fuel revisions based on Arabian Gulf Platts crude, interbank USD/PKR, and Petroleum Development Levy.
          </p>
        </div>

        {/* Countdown Pill to Next Fortnightly Revision */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
          <div className="text-xs">
            <span className="block font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
              Next OGRA Cycle Window
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {tomorrowDateFormatted}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-black text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span>⏳</span>
            <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
          </div>
        </div>
      </div>

      {/* Fuel Selection Tabs - All 6 Products */}
      <div className="mt-6 mb-6">
        <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Select Petroleum Product to Estimate
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(['petrol', 'diesel', 'hi-octane', 'kerosene', 'ldo', 'lpg'] as FuelType[]).map(fuelKey => {
            const prof = productProfiles[fuelKey];
            const isSelected = selectedFuel === fuelKey;
            return (
              <button
                key={fuelKey}
                type="button"
                onClick={() => setSelectedFuel(fuelKey)}
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-black text-sm tracking-tight truncate">
                  {prof.label}
                </span>
                <span className={`block text-xs font-bold mt-1 ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  Rs. {prof.basePrice.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Forecast Results (Left) + Interactive Model Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Projection Card & Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gradient-to-br from-slate-50 via-emerald-50/20 to-emerald-100/30 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-emerald-950/30 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Projected {currentProfile.label} Rate
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-400">Rs.</span>
                  <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-mono">
                    {calculation.projectedPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    / {currentProfile.unit}
                  </span>
                </div>
              </div>

              <div className="text-right">
                {calculation.direction === 'INCREASE' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-300 font-black text-sm">
                    <span>▲</span>
                    <span>Expected Hike: +Rs. {calculation.totalChange.toFixed(2)} ({calculation.percentChange}%)</span>
                  </span>
                )}
                {calculation.direction === 'DECREASE' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-black text-sm">
                    <span>▼</span>
                    <span>Expected Relief: -Rs. {Math.abs(calculation.totalChange).toFixed(2)} ({Math.abs(calculation.percentChange)}%)</span>
                  </span>
                )}
                {calculation.direction === 'UNCHANGED' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm">
                    <span>—</span>
                    <span>Rate Expected Steady</span>
                  </span>
                )}
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  Active OGRA Rate: Rs. {calculation.basePrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Projection Range Band */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Min Estimate: Rs. {calculation.minBand.toFixed(2)}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-black">Most Likely: Rs. {calculation.projectedPrice.toFixed(2)}</span>
                <span className="text-slate-500 dark:text-slate-400">Max Estimate: Rs. {calculation.maxBand.toFixed(2)}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-1/4 right-1/4 bg-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Price Component Estimate Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-xs">
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Ex-Refinery</span>
                <span className="font-mono font-black text-slate-900 dark:text-white">Rs. {calculation.estimatedExRefinery.toFixed(2)}</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Govt PDL</span>
                <span className="font-mono font-black text-slate-900 dark:text-white">Rs. {calculation.estimatedPdl.toFixed(2)}</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">OMC &amp; IFEM</span>
                <span className="font-mono font-black text-slate-900 dark:text-white">Rs. {calculation.estimatedMargins.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Practical Refuel Advice & Tank Impact */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>💡</span>
                <span>Refueling Strategy &amp; Vehicle Tank Impact</span>
              </span>
              <div className="flex items-center gap-1.5">
                {[15, 35, 50, 70].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTankSize(size)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                      tankSize === size
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {size}L
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {calculation.direction === 'INCREASE' ? (
                <>
                  <strong className="text-rose-700 dark:text-rose-400 font-black">Recommendation: Refuel Today.</strong> Filling a standard {tankSize} {currentProfile.unit} tank of {currentProfile.label} before midnight avoids an estimated price difference of{' '}
                  <strong className="text-slate-950 dark:text-white font-black font-mono">Rs. {calculation.tankDifference.toFixed(2)}</strong>. Total tank fill will cost Rs. {calculation.tankTotalCost.toFixed(2)}.
                </>
              ) : calculation.direction === 'DECREASE' ? (
                <>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-black">Recommendation: Wait To Refuel.</strong> If your tank has enough reserve, waiting for the new notification could save approximately{' '}
                  <strong className="text-emerald-700 dark:text-emerald-300 font-black font-mono">Rs. {calculation.tankDifference.toFixed(2)}</strong> on a {tankSize} {currentProfile.unit} fill-up.
                </>
              ) : (
                <>
                  <strong className="text-slate-900 dark:text-white font-black">Recommendation: Maintain Regular Refuel Schedule.</strong> Prices are calculated to remain stable. Full {tankSize} {currentProfile.unit} fill remains approximately Rs. {calculation.tankTotalCost.toFixed(2)}.
                </>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Simulation Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Live Scenario Simulators
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Adjust key Pakistani pricing variables to test what-if rates
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetScenario}
              className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Reset Inputs
            </button>
          </div>

          {/* Variable 1: International Crude Benchmark */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Arabian Platts / Brent Crude ($/bbl)
              </span>
              <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">
                {crudeDeltaUsd >= 0 ? `+${crudeDeltaUsd}` : crudeDeltaUsd} $/barrel
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={crudeDeltaUsd}
              onChange={e => setCrudeDeltaUsd(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-$10 (Bearish)</span>
              <span>$74/bbl baseline</span>
              <span>+$10 (Bullish)</span>
            </div>
          </div>

          {/* Variable 2: USD / PKR Exchange Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Interbank USD/PKR Drift
              </span>
              <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">
                {fxDeltaPkr >= 0 ? `+${fxDeltaPkr}` : fxDeltaPkr} PKR
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.25"
              value={fxDeltaPkr}
              onChange={e => setFxDeltaPkr(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-Rs. 5 (Appreciation)</span>
              <span>278.50 baseline</span>
              <span>+Rs. 5 (Depreciation)</span>
            </div>
          </div>

          {/* Variable 3: Petroleum Development Levy (PDL) */}
          {currentProfile.pdlEligible ? (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Expected Govt Levy Change (PDL)
                </span>
                <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">
                  {pdlDeltaPkr > 0 ? `+${pdlDeltaPkr}` : pdlDeltaPkr} PKR/Ltr
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={pdlDeltaPkr}
                onChange={e => setPdlDeltaPkr(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Current Rs. 60/L</span>
                <span>Max Ceiling: Rs. 70/L</span>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              ℹ️ {currentProfile.label} is exempt from standard petroleum development levy adjustments.
            </div>
          )}

          {/* Formula Transparency Note */}
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-normal border-t border-slate-100 dark:border-slate-700">
            <strong>Formula Reference:</strong> Import Parity Price = (Platts FOB Benchmark × USD/PKR) + Ocean Freight + Port Charges + PDL (Levy) + Inland Freight Equalization Margin (IFEM) + OMC/Dealer Margins.
          </div>
        </div>
      </div>
    </div>
  );
}
