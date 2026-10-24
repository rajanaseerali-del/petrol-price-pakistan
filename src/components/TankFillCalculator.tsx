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

  const selectedPreset = PAKISTAN_TANK_PRESETS.find(p => p.id === selectedTankId);

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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md p-6 sm:p-8 max-w-4xl mx-auto transition-colors">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide mb-2">
          <span>⛽ Tank Full Cost Tool</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
          Fuel Tank Fill-Up Cost Calculator
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          Quickly calculate how many rupees you need to completely fill up or top-off your bike, car, or SUV in Pakistan at today&apos;s verified rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Selector */}
          <div>
            <label htmlFor="tank-preset-select" className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Select Your Vehicle Preset
            </label>
            <div className="relative">
              <select
                id="tank-preset-select"
                value={selectedTankId}
                onChange={e => handlePresetChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 transition appearance-none cursor-pointer"
              >
                {Array.from(new Set(PAKISTAN_TANK_PRESETS.map(p => p.category))).map(category => (
                  <optgroup key={category} label={category} className="font-extrabold text-slate-800 dark:text-slate-200">
                    {PAKISTAN_TANK_PRESETS.filter(p => p.category === category).map(p => (
                      <option key={p.id} value={p.id} className="font-medium">
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fuel Type Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFuelType('petrol')}
                className={`py-3 px-3 rounded-2xl text-center border transition ${
                  fuelType === 'petrol'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-xs sm:text-sm font-bold">Petrol</span>
                <span className="block text-[11px] font-semibold mt-0.5 opacity-90">Rs {petrolPrice.toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType('diesel')}
                className={`py-3 px-3 rounded-2xl text-center border transition ${
                  fuelType === 'diesel'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-xs sm:text-sm font-bold">Diesel</span>
                <span className="block text-[11px] font-semibold mt-0.5 opacity-90">Rs {dieselPrice.toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFuelType('hi-octane')}
                className={`py-3 px-3 rounded-2xl text-center border transition ${
                  fuelType === 'hi-octane'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="block text-xs sm:text-sm font-bold">Hi-Octane</span>
                <span className="block text-[11px] font-semibold mt-0.5 opacity-90">Rs {hiOctanePrice.toFixed(2)}</span>
              </button>
            </div>
          </div>

          {/* Tank Capacity Input */}
          <div>
            <label htmlFor="tank-capacity-input" className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
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
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-base font-bold text-slate-900 dark:text-slate-100 transition"
              />
              <span className="absolute right-4 top-3 text-xs text-slate-400 font-extrabold uppercase">Litres</span>
            </div>
          </div>

          {/* Current Fuel Gauge Level Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Current Fuel Level in Tank
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Empty (0%)', value: 0 },
                { label: '1/4 Tank', value: 0.25 },
                { label: 'Half Tank (1/2)', value: 0.5 },
                { label: '3/4 Tank', value: 0.75 },
              ].map(level => (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setCurrentLevel(level.value)}
                  className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold border transition text-center ${
                    currentLevel === level.value
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-emerald-50 to-emerald-100/60 dark:from-slate-800/90 dark:to-slate-800/40 rounded-3xl border border-emerald-200/80 dark:border-slate-700 p-6 sm:p-7 space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block mb-1">
              {currentLevel === 0 ? 'Full Tank Cost' : 'Top-Up / Refill Cost'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">Rs</span>
              <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                {Math.round(refillCost).toLocaleString('en-PK')}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Required to fill <strong className="text-slate-900 dark:text-white">{litresToFill.toFixed(1)} Litres</strong> from {currentLevel * 100}% to 100% full.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-emerald-200/60 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Full Tank Total (0 to 100%):</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                Rs {Math.round(fullTankTotalCost).toLocaleString('en-PK')}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Price per Litre:</span>
              <span className="font-extrabold text-emerald-800 dark:text-emerald-400">
                Rs {activeRate.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Selected Fuel:</span>
              <span className="font-bold text-slate-900 dark:text-white capitalize">
                {fuelType === 'hi-octane' ? 'Hi-Octane (RON 97)' : fuelType}
              </span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-4 border border-emerald-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
            {litresToFill.toFixed(1)} L × Rs {activeRate.toFixed(2)} = Rs {Math.round(refillCost).toLocaleString('en-PK')}
          </div>
        </div>
      </div>
    </div>
  );
}
