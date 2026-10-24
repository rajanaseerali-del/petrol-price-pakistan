'use client';

import React, { useState } from 'react';

export interface TankPreset {
  id: string;
  name: string;
  category: 'Bikes' | 'Hatchbacks' | 'Sedans' | 'SUVs & Crossovers' | 'Commercial & 4x4';
  tankCapacityLitres: number;
  fuelType: 'petrol' | 'diesel' | 'hi-octane';
}

export const PAKISTAN_TANK_PRESETS: TankPreset[] = [
  // Bikes
  { id: 'cd70_tank', name: 'Honda CD 70 — 9 Litres', category: 'Bikes', tankCapacityLitres: 9.0, fuelType: 'petrol' },
  { id: 'cg125_tank', name: 'Honda CG 125 — 9.2 Litres', category: 'Bikes', tankCapacityLitres: 9.2, fuelType: 'petrol' },
  { id: 'ybr_tank', name: 'Yamaha YBR 125 — 13 Litres', category: 'Bikes', tankCapacityLitres: 13.0, fuelType: 'petrol' },
  { id: 'suzuki_gd_tank', name: 'Suzuki GD 110S — 9 Litres', category: 'Bikes', tankCapacityLitres: 9.0, fuelType: 'petrol' },

  // Hatchbacks
  { id: 'alto_tank', name: 'Suzuki Alto (660cc) — 27 Litres', category: 'Hatchbacks', tankCapacityLitres: 27.0, fuelType: 'petrol' },
  { id: 'cultus_tank', name: 'Suzuki Cultus / Wagon R — 35 Litres', category: 'Hatchbacks', tankCapacityLitres: 35.0, fuelType: 'petrol' },
  { id: 'swift_tank', name: 'Suzuki Swift 1.2 — 37 Litres', category: 'Hatchbacks', tankCapacityLitres: 37.0, fuelType: 'petrol' },

  // Sedans
  { id: 'corolla_tank', name: 'Toyota Corolla (Altis / GLi) — 50 Litres', category: 'Sedans', tankCapacityLitres: 50.0, fuelType: 'petrol' },
  { id: 'civic_tank', name: 'Honda Civic (1.5T / 1.8) — 47 Litres', category: 'Sedans', tankCapacityLitres: 47.0, fuelType: 'petrol' },
  { id: 'city_tank', name: 'Honda City (1.2 / 1.5) — 40 Litres', category: 'Sedans', tankCapacityLitres: 40.0, fuelType: 'petrol' },
  { id: 'yaris_tank', name: 'Toyota Yaris — 42 Litres', category: 'Sedans', tankCapacityLitres: 42.0, fuelType: 'petrol' },
  { id: 'elantra_tank', name: 'Hyundai Elantra — 50 Litres', category: 'Sedans', tankCapacityLitres: 50.0, fuelType: 'petrol' },

  // SUVs & Crossovers
  { id: 'sportage_tank', name: 'KIA Sportage / Hyundai Tucson — 62 Litres', category: 'SUVs & Crossovers', tankCapacityLitres: 62.0, fuelType: 'petrol' },
  { id: 'haval_tank', name: 'Haval H6 / Jolion — 58 Litres', category: 'SUVs & Crossovers', tankCapacityLitres: 58.0, fuelType: 'petrol' },
  { id: 'mg_tank', name: 'MG HS — 55 Litres', category: 'SUVs & Crossovers', tankCapacityLitres: 55.0, fuelType: 'petrol' },
  { id: 'fortuner_tank', name: 'Toyota Fortuner Diesel — 80 Litres', category: 'SUVs & Crossovers', tankCapacityLitres: 80.0, fuelType: 'diesel' },

  // Commercial & 4x4
  { id: 'revo_tank', name: 'Toyota Hilux Revo Diesel — 80 Litres', category: 'Commercial & 4x4', tankCapacityLitres: 80.0, fuelType: 'diesel' },
  { id: 'hiace_tank', name: 'Toyota HiAce Van Diesel — 70 Litres', category: 'Commercial & 4x4', tankCapacityLitres: 70.0, fuelType: 'diesel' },
];

interface TankFillCalculatorProps {
  petrolPrice?: number;
  dieselPrice?: number;
  hiOctanePrice?: number;
}

export function TankFillCalculator({
  petrolPrice = 382.02,
  dieselPrice = 389.80,
  hiOctanePrice = 415.00,
}: TankFillCalculatorProps) {
  const [selectedTankId, setSelectedTankId] = useState<string>('corolla_tank');
  const [tankCapacity, setTankCapacity] = useState<number | ''>(50);
  const [currentLevel, setCurrentLevel] = useState<number>(0); // 0 = empty, 0.25 = 1/4, 0.5 = 1/2, 0.75 = 3/4
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'hi-octane'>('petrol');

  const handlePresetChange = (presetId: string) => {
    setSelectedTankId(presetId);
    const p = PAKISTAN_TANK_PRESETS.find(item => item.id === presetId);
    if (p) {
      setTankCapacity(p.tankCapacityLitres);
      setFuelType(p.fuelType);
    }
  };

  const getPrice = () => {
    switch (fuelType) {
      case 'petrol':
        return petrolPrice;
      case 'diesel':
        return dieselPrice;
      case 'hi-octane':
        return hiOctanePrice;
    }
  };

  const activeRate = getPrice();
  const validCapacity = typeof tankCapacity === 'number' && tankCapacity > 0 ? tankCapacity : 0;
  const fractionToFill = 1 - currentLevel;
  const litresToFill = validCapacity * fractionToFill;
  const fullTankTotalCost = validCapacity * activeRate;
  const refillCost = litresToFill * activeRate;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl p-7 sm:p-10 max-w-5xl mx-auto transition-colors">
      {/* Header */}
      <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-black tracking-wide mb-3">
          <span>⛽ Vehicle Tank Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Fuel Tank Fill-Up Cost Calculator
        </h2>
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
          Calculate the exact cost to completely fill up or top-off your vehicle in Pakistan based on today&apos;s verified OGRA fuel rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-7">
          {/* Preset Selector */}
          <div>
            <label htmlFor="tank-preset-select" className="block text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Select Vehicle Model
            </label>
            <div className="relative">
              <select
                id="tank-preset-select"
                value={selectedTankId}
                onChange={e => handlePresetChange(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-lg sm:text-xl font-bold text-slate-900 dark:text-white transition appearance-none cursor-pointer"
              >
                {Array.from(new Set(PAKISTAN_TANK_PRESETS.map(p => p.category))).map(category => (
                  <optgroup key={category} label={category} className="font-extrabold text-slate-900 dark:text-white">
                    {PAKISTAN_TANK_PRESETS.filter(p => p.category === category).map(p => (
                      <option key={p.id} value={p.id} className="font-semibold text-slate-900 dark:text-slate-100">
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-500">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fuel Type Selector */}
          <div>
            <label className="block text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setFuelType('petrol')}
                className={`py-4 px-3 sm:px-4 rounded-2xl text-center border-2 transition ${
                  fuelType === 'petrol'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-lg font-black">Petrol</span>
                <span className="block text-sm sm:text-base font-bold mt-1 opacity-90">Rs. {petrolPrice.toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType('diesel')}
                className={`py-4 px-3 sm:px-4 rounded-2xl text-center border-2 transition ${
                  fuelType === 'diesel'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-lg font-black">Diesel</span>
                <span className="block text-sm sm:text-base font-bold mt-1 opacity-90">Rs. {dieselPrice.toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType('hi-octane')}
                className={`py-4 px-3 sm:px-4 rounded-2xl text-center border-2 transition ${
                  fuelType === 'hi-octane'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-lg font-black">Hi-Octane</span>
                <span className="block text-sm sm:text-base font-bold mt-1 opacity-90">Rs. {hiOctanePrice.toFixed(2)}</span>
              </button>
            </div>
          </div>

          {/* Tank Capacity Input */}
          <div>
            <label htmlFor="tank-capacity-input" className="block text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Total Tank Capacity (Litres)
            </label>
            <div className="relative">
              <input
                id="tank-capacity-input"
                type="number"
                min="1"
                step="0.5"
                value={tankCapacity}
                onChange={e => setTankCapacity(e.target.value === '' ? '' : Math.max(1, parseFloat(e.target.value)))}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-xl sm:text-2xl font-black text-slate-950 dark:text-white transition"
              />
              <span className="absolute right-5 top-4 text-base font-black text-slate-500 uppercase tracking-wider">Litres</span>
            </div>
          </div>

          {/* Current Fuel Gauge Level Selector */}
          <div>
            <div className="flex justify-between items-baseline mb-2.5">
              <label className="block text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Current Fuel Level in Tank
              </label>
              <span className="text-base font-black text-emerald-800 dark:text-emerald-300">
                Needs {(fractionToFill * 100).toFixed(0)}% to full
              </span>
            </div>

            {/* Visual Gauge Progress Bar */}
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-600 transition-all duration-300"
                style={{ width: `${currentLevel * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Empty (0%)', value: 0 },
                { label: '1/4 Tank (25%)', value: 0.25 },
                { label: 'Half Tank (50%)', value: 0.5 },
                { label: '3/4 Tank (75%)', value: 0.75 },
              ].map(level => (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setCurrentLevel(level.value)}
                  className={`py-3.5 px-3 rounded-2xl text-sm sm:text-base font-black border-2 transition text-center ${
                    currentLevel === level.value
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-emerald-100/70 to-emerald-200/50 dark:from-slate-800 dark:via-slate-800/90 dark:to-emerald-950/50 rounded-3xl border-2 border-emerald-400/80 dark:border-slate-700 p-7 sm:p-9 space-y-7 shadow-lg">
          <div>
            <span className="text-sm font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-2">
              {currentLevel === 0 ? 'Full Tank Fill-Up Cost' : 'Top-Off Refill Cost'}
            </span>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-3xl font-black text-slate-600 dark:text-slate-400">Rs.</span>
              <span className="text-6xl sm:text-7xl font-black text-slate-950 dark:text-white tracking-tight">
                {Math.round(refillCost).toLocaleString('en-PK')}
              </span>
              <span className="text-2xl font-black text-slate-600 dark:text-slate-400">PKR</span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 mt-3 font-semibold leading-relaxed">
              Required to pump <strong className="text-emerald-800 dark:text-emerald-300 font-black text-xl">{litresToFill.toFixed(1)} Litres</strong> to reach 100% full.
            </p>
          </div>

          <div className="space-y-4 pt-5 border-t-2 border-emerald-200 dark:border-slate-700 text-base sm:text-lg">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">0 to 100% Full Tank:</span>
              <span className="font-black text-slate-950 dark:text-white text-lg sm:text-xl">
                Rs. {Math.round(fullTankTotalCost).toLocaleString('en-PK')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Price per Litre:</span>
              <span className="font-black text-emerald-800 dark:text-emerald-300 text-lg sm:text-xl">
                Rs. {activeRate.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Selected Fuel:</span>
              <span className="font-black text-slate-950 dark:text-white capitalize">
                {fuelType === 'hi-octane' ? 'Hi-Octane (RON 97)' : fuelType}
              </span>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 dark:border-slate-700 text-base sm:text-lg font-mono font-black text-slate-900 dark:text-slate-100 leading-relaxed shadow-sm">
            {litresToFill.toFixed(1)} L × Rs. {activeRate.toFixed(2)} = Rs. {Math.round(refillCost).toLocaleString('en-PK')}
          </div>
        </div>
      </div>
    </div>
  );
}
