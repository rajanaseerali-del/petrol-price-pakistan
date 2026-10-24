'use client';

import React, { useState } from 'react';

export interface VehiclePreset {
  id: string;
  name: string;
  category: 'Bikes' | 'Hatchbacks' | 'Sedans' | 'SUVs & Pickups' | 'Commercial';
  defaultFuel: 'petrol' | 'diesel' | 'hi-octane';
  mileageKmPerLitre: number;
  description: string;
}

export const POPULAR_PAKISTAN_VEHICLES: VehiclePreset[] = [
  // Bikes
  {
    id: 'cd70',
    name: 'Honda CD 70 — 55 km/L',
    category: 'Bikes',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 55,
    description: 'Costed at 55 km/L — typical real-world commuter average for Honda CD 70 in mixed city traffic.',
  },
  {
    id: 'cg125',
    name: 'Honda CG 125 — 42 km/L',
    category: 'Bikes',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 42,
    description: 'Costed at 42 km/L — real-world average for Honda CG 125 / YBR 125.',
  },
  // Hatchbacks
  {
    id: 'alto',
    name: 'Suzuki Alto 660cc — 19 km/L',
    category: 'Hatchbacks',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 19,
    description: 'Costed at 19 km/L — typical real-world city average for Suzuki Alto 660cc with AC.',
  },
  {
    id: 'cultus',
    name: 'Suzuki Cultus / Wagon R — 16 km/L',
    category: 'Hatchbacks',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 16,
    description: 'Costed at 16 km/L — practical 1.0L K10B engine average in urban Pakistan.',
  },
  {
    id: 'swift',
    name: 'Suzuki Swift 1.2 — 14 km/L',
    category: 'Hatchbacks',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 14,
    description: 'Costed at 14 km/L — typical real-world average for Suzuki Swift 1.2L.',
  },
  // Sedans
  {
    id: 'corolla_gli',
    name: 'Corolla GLi 1.3 — 13 km/L',
    category: 'Sedans',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 13,
    description: 'Costed at 13 km/L — a typical real-world average for the Toyota Corolla GLi 1.3, not brochure claim.',
  },
  {
    id: 'corolla_16_18',
    name: 'Corolla Altis 1.6 / 1.8 — 12 km/L',
    category: 'Sedans',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 12,
    description: 'Costed at 12 km/L — typical real-world average for Toyota Corolla Altis 1.6/1.8 with AC.',
  },
  {
    id: 'civic',
    name: 'Honda Civic 1.5T / 1.8 — 11 km/L',
    category: 'Sedans',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 11,
    description: 'Costed at 11 km/L — realistic city consumption for Honda Civic.',
  },
  {
    id: 'city',
    name: 'Honda City 1.2 / 1.5 — 14.5 km/L',
    category: 'Sedans',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 14.5,
    description: 'Costed at 14.5 km/L — typical daily commute average for Honda City.',
  },
  {
    id: 'yaris',
    name: 'Toyota Yaris 1.3 / 1.5 — 15 km/L',
    category: 'Sedans',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 15,
    description: 'Costed at 15 km/L — real-world consumption for Toyota Yaris in mixed driving.',
  },
  // SUVs & Pickups
  {
    id: 'sportage',
    name: 'KIA Sportage / Tucson — 10.5 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 10.5,
    description: 'Costed at 10.5 km/L — typical 2.0L FWD/AWD crossover consumption in Pakistan.',
  },
  {
    id: 'fortuner_diesel',
    name: 'Toyota Fortuner 2.8 Diesel — 9.5 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 9.5,
    description: 'Costed at 9.5 km/L — 1GD-FTV 2.8L turbo-diesel realistic average.',
  },
  {
    id: 'hilux_revo',
    name: 'Toyota Hilux Revo 2.8 Diesel — 9.5 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 9.5,
    description: 'Costed at 9.5 km/L — Hilux Revo double cabin diesel real-world consumption.',
  },
  // Commercial
  {
    id: 'hiace',
    name: 'Toyota HiAce Van Diesel — 9 km/L',
    category: 'Commercial',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 9,
    description: 'Costed at 9 km/L — commercial passenger and freight van realistic diesel consumption.',
  },
];

interface FuelCalculatorProps {
  initialPetrolPrice?: number;
  initialDieselPrice?: number;
  initialHiOctanePrice?: number;
}

export function FuelCalculator({
  initialPetrolPrice = 382.02,
  initialDieselPrice = 389.80,
  initialHiOctanePrice = 415.00,
}: FuelCalculatorProps) {
  const [mode, setMode] = useState<'by_car' | 'by_distance' | 'by_litres'>('by_car');
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'hi-octane'>('petrol');

  const [carDistanceKm, setCarDistanceKm] = useState<number | ''>(100);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('alto');
  const [carIsReturnTrip, setCarIsReturnTrip] = useState<boolean>(false);

  const [distanceKm, setDistanceKm] = useState<number | ''>(100);
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState<number | ''>(14);
  const [distanceIsReturnTrip, setDistanceIsReturnTrip] = useState<boolean>(false);

  const [litresInput, setLitresInput] = useState<number | ''>(20);

  const selectedVehicle =
    POPULAR_PAKISTAN_VEHICLES.find(v => v.id === selectedVehicleId) ||
    POPULAR_PAKISTAN_VEHICLES[2];

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    const vehicle = POPULAR_PAKISTAN_VEHICLES.find(v => v.id === vehicleId);
    if (vehicle) {
      setFuelType(vehicle.defaultFuel);
    }
  };

  const getCurrentRate = () => {
    switch (fuelType) {
      case 'petrol':
        return initialPetrolPrice;
      case 'diesel':
        return initialDieselPrice;
      case 'hi-octane':
        return initialHiOctanePrice;
    }
  };

  const currentRate = getCurrentRate();

  const validCarDistance = typeof carDistanceKm === 'number' && carDistanceKm > 0 ? carDistanceKm : 0;
  const effectiveCarDistance = carIsReturnTrip ? validCarDistance * 2 : validCarDistance;
  const carLitresNeeded = selectedVehicle.mileageKmPerLitre > 0 ? effectiveCarDistance / selectedVehicle.mileageKmPerLitre : 0;
  const carTotalCost = carLitresNeeded * currentRate;
  const carCostPerKm = effectiveCarDistance > 0 ? carTotalCost / effectiveCarDistance : 0;

  const validDistance = typeof distanceKm === 'number' && distanceKm > 0 ? distanceKm : 0;
  const effectiveDistance = distanceIsReturnTrip ? validDistance * 2 : validDistance;
  const validMileage = typeof mileageKmPerLitre === 'number' && mileageKmPerLitre > 0 ? mileageKmPerLitre : 1;
  const distanceLitresNeeded = validMileage > 0 ? effectiveDistance / validMileage : 0;
  const distanceTotalCost = distanceLitresNeeded * currentRate;
  const distanceCostPerKm = effectiveDistance > 0 ? distanceTotalCost / effectiveDistance : 0;

  const validLitres = typeof litresInput === 'number' && litresInput > 0 ? litresInput : 0;
  const litresTotalCost = validLitres * currentRate;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-5 sm:p-7 max-w-4xl mx-auto transition-colors">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide mb-2">
          <span>⚡ Fuel Trip Calculator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
          What Your Trip Costs At Today&apos;s Rate
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Estimate precise fuel expenses by vehicle model, custom distance, or exact litres pumped.
        </p>
      </div>

      {/* 3 MODE TABS */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5 border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('by_car')}
          className={`py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_car'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          By Vehicle
        </button>
        <button
          type="button"
          onClick={() => setMode('by_distance')}
          className={`py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_distance'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          By Distance
        </button>
        <button
          type="button"
          onClick={() => setMode('by_litres')}
          className={`py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_litres'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          By Litres
        </button>
      </div>

      {/* FUEL TYPE SELECTOR */}
      <div className="mb-5">
        <label className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
          Select Fuel Type
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setFuelType('petrol')}
            className={`py-2 px-2 rounded-xl text-center border transition ${
              fuelType === 'petrol'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block text-sm font-black">Petrol</span>
            <span className="block text-[11px] font-semibold mt-0.5 opacity-90">
              Rs. {initialPetrolPrice.toFixed(2)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFuelType('diesel')}
            className={`py-2 px-2 rounded-xl text-center border transition ${
              fuelType === 'diesel'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block text-sm font-black">Diesel</span>
            <span className="block text-[11px] font-semibold mt-0.5 opacity-90">
              Rs. {initialDieselPrice.toFixed(2)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFuelType('hi-octane')}
            className={`py-2 px-2 rounded-xl text-center border transition ${
              fuelType === 'hi-octane'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block text-sm font-black">Hi-Octane</span>
            <span className="block text-[11px] font-semibold mt-0.5 opacity-90">
              Rs. {initialHiOctanePrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* MODE 1: BY CAR TAB */}
      {mode === 'by_car' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="car-distance" className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
              Trip Distance (KM)
            </label>
            <input
              id="car-distance"
              type="number"
              min="1"
              value={carDistanceKm}
              onChange={e => setCarDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-base font-bold text-slate-950 dark:text-white transition"
              placeholder="100"
            />
          </div>

          <div>
            <label htmlFor="car-vehicle" className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
              Your Vehicle Model &amp; Mileage
            </label>
            <div className="relative">
              <select
                id="car-vehicle"
                value={selectedVehicleId}
                onChange={e => handleVehicleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-sm font-bold text-slate-900 dark:text-white transition appearance-none cursor-pointer"
              >
                {Array.from(new Set(POPULAR_PAKISTAN_VEHICLES.map(v => v.category))).map(category => (
                  <optgroup key={category} label={category} className="font-bold text-slate-900 dark:text-white">
                    {POPULAR_PAKISTAN_VEHICLES.filter(v => v.category === category).map(v => (
                      <option key={v.id} value={v.id} className="font-medium text-slate-900 dark:text-slate-100">
                        {v.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {selectedVehicle.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-0.5">
            <input
              id="car-return-trip"
              type="checkbox"
              checked={carIsReturnTrip}
              onChange={e => setCarIsReturnTrip(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />
            <label htmlFor="car-return-trip" className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
              Return trip (double the distance to {effectiveCarDistance} KM)
            </label>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/60 to-emerald-200/40 dark:from-slate-800 dark:via-slate-800/90 dark:to-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-slate-700 p-5 space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Estimated Trip Fuel Cost
              </span>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-500 dark:text-slate-400">Rs.</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                  {Math.round(carTotalCost).toLocaleString('en-PK')}
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">PKR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Fuel Needed
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  {carLitresNeeded.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Cost Per KM
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  Rs. {carCostPerKm.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-bold leading-relaxed border-t border-emerald-200 dark:border-slate-700">
              {carLitresNeeded.toFixed(1)} L × Rs. {currentRate.toFixed(2)} · {effectiveCarDistance} KM · {selectedVehicle.name.split('—')[0].trim()}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BY DISTANCE TAB */}
      {mode === 'by_distance' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="dist-km" className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
              Distance (KM)
            </label>
            <input
              id="dist-km"
              type="number"
              min="1"
              value={distanceKm}
              onChange={e => setDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-base font-bold text-slate-950 dark:text-white transition"
              placeholder="100"
            />
          </div>

          <div>
            <label htmlFor="dist-mileage" className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
              Mileage (KM Per Litre)
            </label>
            <input
              id="dist-mileage"
              type="number"
              min="1"
              step="0.5"
              value={mileageKmPerLitre}
              onChange={e => setMileageKmPerLitre(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-base font-bold text-slate-950 dark:text-white transition"
              placeholder="14"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(45)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${
                  mileageKmPerLitre === 45
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                Bike · 45 km/L
              </button>
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(14)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${
                  mileageKmPerLitre === 14
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                Car · 14 km/L
              </button>
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(9)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${
                  mileageKmPerLitre === 9
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                SUV · 9 km/L
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-0.5">
            <input
              id="dist-return-trip"
              type="checkbox"
              checked={distanceIsReturnTrip}
              onChange={e => setDistanceIsReturnTrip(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />
            <label htmlFor="dist-return-trip" className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
              Return trip (double the distance to {effectiveDistance} KM)
            </label>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/60 to-emerald-200/40 dark:from-slate-800 dark:via-slate-800/90 dark:to-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-slate-700 p-5 space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Total Fuel Cost
              </span>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-500 dark:text-slate-400">Rs.</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                  {Math.round(distanceTotalCost).toLocaleString('en-PK')}
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">PKR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Fuel Needed
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  {distanceLitresNeeded.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Cost Per KM
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  Rs. {distanceCostPerKm.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-bold leading-relaxed border-t border-emerald-200 dark:border-slate-700">
              {distanceLitresNeeded.toFixed(1)} L × Rs. {currentRate.toFixed(2)} · {effectiveDistance} KM
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: BY LITRES TAB */}
      {mode === 'by_litres' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="litres-input" className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1.5">
              Litres to Pump
            </label>
            <input
              id="litres-input"
              type="number"
              min="0.5"
              step="0.5"
              value={litresInput}
              onChange={e => setLitresInput(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:border-emerald-600 text-base font-bold text-slate-950 dark:text-white transition"
              placeholder="20"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Use this when you already know how much you are putting in — e.g. a partial fill or canister.
            </p>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/60 to-emerald-200/40 dark:from-slate-800 dark:via-slate-800/90 dark:to-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-slate-700 p-5 space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Total Fuel Cost
              </span>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-500 dark:text-slate-400">Rs.</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                  {Math.round(litresTotalCost).toLocaleString('en-PK')}
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">PKR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Fuel Quantity
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  {validLitres.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-700 shadow-xs">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Rate Per Litre
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-0.5 block">
                  Rs. {currentRate.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-bold leading-relaxed border-t border-emerald-200 dark:border-slate-700">
              {validLitres.toFixed(1)} L × Rs. {currentRate.toFixed(2)} · {fuelType === 'petrol' ? 'Petrol' : fuelType === 'diesel' ? 'Diesel' : 'Hi-Octane'}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER NOTE */}
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-4 border-t border-slate-200 dark:border-slate-800 mt-5">
        Priced at the official active OGRA notified rate. Vehicle mileage estimates reflect typical real-world city consumption reported by motorists in Pakistan.
      </p>
    </div>
  );
}
