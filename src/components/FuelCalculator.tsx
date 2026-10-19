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
    description: 'Costed at 13 km/L — a typical real-world average for the Toyota Corolla GLi 1.3, not the brochure claim.',
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
    name: 'KIA Sportage / Hyundai Tucson — 10 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 10,
    description: 'Costed at 10 km/L — standard city fuel consumption for 2.0L crossover SUVs.',
  },
  {
    id: 'revo',
    name: 'Toyota Hilux Revo 2.8 Diesel — 9.5 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 9.5,
    description: 'Costed at 9.5 km/L (High-Speed Diesel) — typical highway and city average for 1GD-FTV 2.8L diesel.',
  },
  {
    id: 'fortuner_diesel',
    name: 'Toyota Fortuner 2.8 Diesel — 9 km/L',
    category: 'SUVs & Pickups',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 9,
    description: 'Costed at 9 km/L (High-Speed Diesel) — real-world average for Toyota Fortuner Sigma 4.',
  },
  // Commercial
  {
    id: 'hiace',
    name: 'Toyota HiAce Van Diesel — 10 km/L',
    category: 'Commercial',
    defaultFuel: 'diesel',
    mileageKmPerLitre: 10,
    description: 'Costed at 10 km/L (Diesel) — commercial intercity route average.',
  },
];

interface FuelCalculatorProps {
  initialPetrolPrice?: number;
  initialDieselPrice?: number;
  initialHiOctanePrice?: number;
}

type CalculatorMode = 'by_car' | 'by_distance' | 'by_litres';
type FuelType = 'petrol' | 'diesel' | 'hi-octane';

export function FuelCalculator({
  initialPetrolPrice = 381.14,
  initialDieselPrice = 389.27,
  initialHiOctanePrice = 415.00,
}: FuelCalculatorProps) {
  // Navigation Mode Tab: By car | By distance | By litres
  const [mode, setMode] = useState<CalculatorMode>('by_car');

  // Common Fuel Selection
  const [fuelType, setFuelType] = useState<FuelType>('petrol');

  // Mode 1: By car state
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('corolla_gli');
  const [carDistanceKm, setCarDistanceKm] = useState<number | ''>(100);
  const [carIsReturnTrip, setCarIsReturnTrip] = useState<boolean>(false);

  // Mode 2: By distance state
  const [distanceKm, setDistanceKm] = useState<number | ''>(100);
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState<number | ''>(14);
  const [distanceIsReturnTrip, setDistanceIsReturnTrip] = useState<boolean>(false);

  // Mode 3: By litres state
  const [litresInput, setLitresInput] = useState<number | ''>(20);

  // Get current active rate by fuel type
  const getRate = (type: FuelType): number => {
    switch (type) {
      case 'petrol':
        return initialPetrolPrice;
      case 'diesel':
        return initialDieselPrice;
      case 'hi-octane':
        return initialHiOctanePrice;
    }
  };

  const currentRate = getRate(fuelType);

  // Vehicle change handler for Mode 1
  const selectedVehicle =
    POPULAR_PAKISTAN_VEHICLES.find(v => v.id === selectedVehicleId) || POPULAR_PAKISTAN_VEHICLES[5];

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    const vehicle = POPULAR_PAKISTAN_VEHICLES.find(v => v.id === vehicleId);
    if (vehicle) {
      setFuelType(vehicle.defaultFuel);
    }
  };

  // Calculations for Mode 1: By Car
  const validCarDistance = typeof carDistanceKm === 'number' && carDistanceKm > 0 ? carDistanceKm : 0;
  const effectiveCarDistance = carIsReturnTrip ? validCarDistance * 2 : validCarDistance;
  const carLitresNeeded = selectedVehicle.mileageKmPerLitre > 0 ? effectiveCarDistance / selectedVehicle.mileageKmPerLitre : 0;
  const carTotalCost = carLitresNeeded * currentRate;
  const carCostPerKm = effectiveCarDistance > 0 ? carTotalCost / effectiveCarDistance : 0;

  // Calculations for Mode 2: By Distance
  const validDistance = typeof distanceKm === 'number' && distanceKm > 0 ? distanceKm : 0;
  const effectiveDistance = distanceIsReturnTrip ? validDistance * 2 : validDistance;
  const validMileage = typeof mileageKmPerLitre === 'number' && mileageKmPerLitre > 0 ? mileageKmPerLitre : 1;
  const distanceLitresNeeded = validMileage > 0 ? effectiveDistance / validMileage : 0;
  const distanceTotalCost = distanceLitresNeeded * currentRate;
  const distanceCostPerKm = effectiveDistance > 0 ? distanceTotalCost / effectiveDistance : 0;

  // Calculations for Mode 3: By Litres
  const validLitres = typeof litresInput === 'number' && litresInput > 0 ? litresInput : 0;
  const litresTotalCost = validLitres * currentRate;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 max-w-xl mx-auto">
      {/* Title */}
      <div className="mb-6">
        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block mb-1">
          Fuel Cost Calculator
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          What Your Trip Costs At Today&apos;s Rate
        </h3>
      </div>

      {/* 3 MODE TABS: By car | By distance | By litres */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl mb-6 border border-slate-200/70">
        <button
          type="button"
          onClick={() => setMode('by_car')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_car'
              ? 'bg-emerald-50 text-emerald-900 shadow-xs border border-emerald-200/60 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          By car
        </button>
        <button
          type="button"
          onClick={() => setMode('by_distance')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_distance'
              ? 'bg-emerald-50 text-emerald-900 shadow-xs border border-emerald-200/60 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          By distance
        </button>
        <button
          type="button"
          onClick={() => setMode('by_litres')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition text-center ${
            mode === 'by_litres'
              ? 'bg-emerald-50 text-emerald-900 shadow-xs border border-emerald-200/60 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          By litres
        </button>
      </div>

      {/* FUEL TYPE SELECTOR (With Active Prices) */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Fuel Type
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setFuelType('petrol')}
            className={`py-3 px-3 rounded-2xl text-center border transition ${
              fuelType === 'petrol'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span className="block text-xs sm:text-sm font-bold">Petrol</span>
            <span className={`block text-[11px] font-semibold mt-0.5 ${fuelType === 'petrol' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Rs {initialPetrolPrice.toFixed(2)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFuelType('diesel')}
            className={`py-3 px-3 rounded-2xl text-center border transition ${
              fuelType === 'diesel'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span className="block text-xs sm:text-sm font-bold">Diesel</span>
            <span className={`block text-[11px] font-semibold mt-0.5 ${fuelType === 'diesel' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Rs {initialDieselPrice.toFixed(2)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFuelType('hi-octane')}
            className={`py-3 px-3 rounded-2xl text-center border transition ${
              fuelType === 'hi-octane'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span className="block text-xs sm:text-sm font-bold">Hi-Octane</span>
            <span className={`block text-[11px] font-semibold mt-0.5 ${fuelType === 'hi-octane' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Rs {initialHiOctanePrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: BY CAR TAB */}
      {/* ========================================================= */}
      {mode === 'by_car' && (
        <div className="space-y-5">
          {/* DISTANCE (KM) */}
          <div>
            <label htmlFor="car-distance" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Distance (KM)
            </label>
            <input
              id="car-distance"
              type="number"
              min="1"
              value={carDistanceKm}
              onChange={e => setCarDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-base font-bold text-slate-900 transition"
              placeholder="100"
            />
          </div>

          {/* YOUR VEHICLE DROPDOWN */}
          <div>
            <label htmlFor="car-vehicle" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Vehicle
            </label>
            <div className="relative">
              <select
                id="car-vehicle"
                value={selectedVehicleId}
                onChange={e => handleVehicleChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-bold text-slate-900 transition appearance-none cursor-pointer"
              >
                {Array.from(new Set(POPULAR_PAKISTAN_VEHICLES.map(v => v.category))).map(category => (
                  <optgroup key={category} label={category} className="font-bold text-slate-800">
                    {POPULAR_PAKISTAN_VEHICLES.filter(v => v.category === category).map(v => (
                      <option key={v.id} value={v.id} className="font-medium text-slate-900">
                        {v.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {selectedVehicle.description}
            </p>
          </div>

          {/* Return trip */}
          <div className="flex items-center gap-3 pt-1">
            <input
              id="car-return-trip"
              type="checkbox"
              checked={carIsReturnTrip}
              onChange={e => setCarIsReturnTrip(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="car-return-trip" className="text-sm font-semibold text-slate-800 cursor-pointer select-none">
              Return trip (double the distance)
            </label>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200/80 p-6 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Total Fuel Cost
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">Rs</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  {Math.round(carTotalCost).toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fuel Needed
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  {carLitresNeeded.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Cost Per KM
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  Rs {carCostPerKm.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 font-mono leading-relaxed border-t border-emerald-200/60">
              {carLitresNeeded.toFixed(1)} L × Rs {currentRate.toFixed(2)} · {fuelType === 'petrol' ? 'Petrol' : fuelType === 'diesel' ? 'Diesel' : 'Hi-Octane'} · {effectiveCarDistance} km · {selectedVehicle.name.split('—')[0].trim()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: BY DISTANCE TAB */}
      {/* ========================================================= */}
      {mode === 'by_distance' && (
        <div className="space-y-5">
          {/* DISTANCE (KM) */}
          <div>
            <label htmlFor="dist-km" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Distance (KM)
            </label>
            <input
              id="dist-km"
              type="number"
              min="1"
              value={distanceKm}
              onChange={e => setDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-base font-bold text-slate-900 transition"
              placeholder="100"
            />
          </div>

          {/* MILEAGE (KM PER LITRE) */}
          <div>
            <label htmlFor="dist-mileage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mileage (KM Per Litre)
            </label>
            <input
              id="dist-mileage"
              type="number"
              min="1"
              step="0.5"
              value={mileageKmPerLitre}
              onChange={e => setMileageKmPerLitre(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-base font-bold text-slate-900 transition"
              placeholder="14"
            />

            {/* QUICK PRESET PILLS: Bike · 45 | Car · 14 | SUV · 9 */}
            <div className="flex gap-2 mt-2.5">
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(45)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                  mileageKmPerLitre === 45
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                Bike · 45
              </button>
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(14)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                  mileageKmPerLitre === 14
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                Car · 14
              </button>
              <button
                type="button"
                onClick={() => setMileageKmPerLitre(9)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                  mileageKmPerLitre === 9
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                SUV · 9
              </button>
            </div>
          </div>

          {/* Return trip */}
          <div className="flex items-center gap-3 pt-1">
            <input
              id="dist-return-trip"
              type="checkbox"
              checked={distanceIsReturnTrip}
              onChange={e => setDistanceIsReturnTrip(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="dist-return-trip" className="text-sm font-semibold text-slate-800 cursor-pointer select-none">
              Return trip (double the distance)
            </label>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200/80 p-6 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Total Fuel Cost
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">Rs</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  {Math.round(distanceTotalCost).toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fuel Needed
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  {distanceLitresNeeded.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Cost Per KM
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  Rs {distanceCostPerKm.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 font-mono leading-relaxed border-t border-emerald-200/60">
              {distanceLitresNeeded.toFixed(1)} L × Rs {currentRate.toFixed(2)} · {fuelType === 'petrol' ? 'Petrol' : fuelType === 'diesel' ? 'Diesel' : 'Hi-Octane'} · {effectiveDistance} km
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: BY LITRES TAB */}
      {/* ========================================================= */}
      {mode === 'by_litres' && (
        <div className="space-y-5">
          {/* LITRES INPUT */}
          <div>
            <label htmlFor="litres-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Litres
            </label>
            <input
              id="litres-input"
              type="number"
              min="0.5"
              step="0.5"
              value={litresInput}
              onChange={e => setLitresInput(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-base font-bold text-slate-900 transition"
              placeholder="20"
            />
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Use this when you already know how much you are putting in — a part fill, or a jerry can.
            </p>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200/80 p-6 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Total Fuel Cost
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">Rs</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  {Math.round(litresTotalCost).toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fuel Needed
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  {validLitres.toFixed(1)} L
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Rate Per Litre
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                  Rs {currentRate.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 font-mono leading-relaxed border-t border-emerald-200/60">
              {validLitres.toFixed(1)} L × Rs {currentRate.toFixed(2)} · {fuelType === 'petrol' ? 'Petrol' : fuelType === 'diesel' ? 'Diesel' : 'Hi-Octane'}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER NOTE */}
      <p className="text-xs text-slate-500 leading-relaxed pt-5 border-t border-slate-100 mt-6">
        Priced at the current OGRA notified rate. The per-vehicle figures are typical real-world averages reported by owners in Pakistan, not manufacturer claims — and mileage still varies with load, traffic, AC use and vehicle condition, so treat the litre figure as an estimate. Picking a vehicle also switches the pump it normally takes; you can change that above.
      </p>
    </div>
  );
}
