'use client';

import React, { useState } from 'react';

export interface VehiclePreset {
  id: string;
  name: string;
  category: 'Bikes' | 'Hatchbacks' | 'Sedans' | 'SUVs & Pickups' | 'Commercial';
  defaultFuel: 'petrol' | 'diesel';
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
  {
    id: 'custom',
    name: 'Custom / Other Vehicle',
    category: 'Commercial',
    defaultFuel: 'petrol',
    mileageKmPerLitre: 14,
    description: 'Enter your custom fuel mileage manually below.',
  },
];

interface FuelCalculatorProps {
  initialPetrolPrice?: number;
  initialDieselPrice?: number;
}

export function FuelCalculator({
  initialPetrolPrice = 381.14,
  initialDieselPrice = 389.27,
}: FuelCalculatorProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('corolla_gli');
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel'>('petrol');
  const [distanceKm, setDistanceKm] = useState<number | ''>(100);
  const [mileageKmPerLitre, setMileageKmPerLitre] = useState<number | ''>(13);
  const [customPrice, setCustomPrice] = useState<number | ''>(initialPetrolPrice);
  const [isReturnTrip, setIsReturnTrip] = useState<boolean>(false);

  const selectedVehicle = POPULAR_PAKISTAN_VEHICLES.find(v => v.id === selectedVehicleId) || POPULAR_PAKISTAN_VEHICLES[5];

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    const vehicle = POPULAR_PAKISTAN_VEHICLES.find(v => v.id === vehicleId);
    if (vehicle && vehicle.id !== 'custom') {
      setMileageKmPerLitre(vehicle.mileageKmPerLitre);
      setFuelType(vehicle.defaultFuel);
      setCustomPrice(vehicle.defaultFuel === 'petrol' ? initialPetrolPrice : initialDieselPrice);
    }
  };

  const handleFuelTypeChange = (type: 'petrol' | 'diesel') => {
    setFuelType(type);
    setCustomPrice(type === 'petrol' ? initialPetrolPrice : initialDieselPrice);
  };

  const activePrice =
    typeof customPrice === 'number' && customPrice > 0
      ? customPrice
      : fuelType === 'petrol'
      ? initialPetrolPrice
      : initialDieselPrice;

  const validDistance = typeof distanceKm === 'number' && distanceKm > 0 ? distanceKm : 0;
  const effectiveDistance = isReturnTrip ? validDistance * 2 : validDistance;
  const validMileage =
    typeof mileageKmPerLitre === 'number' && mileageKmPerLitre > 0 ? mileageKmPerLitre : 0;

  // Calculation logic
  const litresRequired = validMileage > 0 ? effectiveDistance / validMileage : 0;
  const totalCost = litresRequired * activePrice;
  const costPerKm = effectiveDistance > 0 ? totalCost / effectiveDistance : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">Live Pakistani Road Cost Estimator</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Fuel &amp; Trip Cost Calculator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Priced at the current OGRA notified rate with typical real-world Pakistani vehicle fuel averages.
        </p>
      </div>

      <div className="space-y-6">
        {/* DISTANCE (KM) */}
        <div>
          <label htmlFor="distance-km" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Distance (KM)
          </label>
          <div className="relative">
            <input
              id="distance-km"
              type="number"
              min="1"
              step="1"
              value={distanceKm}
              onChange={e => setDistanceKm(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-base font-bold text-slate-900 transition"
              placeholder="100"
            />
            <span className="absolute right-4 top-3 text-xs text-slate-400 font-extrabold uppercase">KM</span>
          </div>
        </div>

        {/* YOUR VEHICLE PRESET DROPDOWN */}
        <div>
          <label htmlFor="vehicle-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Your Vehicle
          </label>
          <div className="relative">
            <select
              id="vehicle-select"
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

        {/* RETURN TRIP (DOUBLE THE DISTANCE) CHECKBOX */}
        <div className="flex items-center gap-3 pt-1">
          <input
            id="return-trip-check"
            type="checkbox"
            checked={isReturnTrip}
            onChange={e => setIsReturnTrip(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
          />
          <label htmlFor="return-trip-check" className="text-sm font-semibold text-slate-800 cursor-pointer select-none">
            Return trip (double the distance — {validDistance * 2} KM)
          </label>
        </div>

        {/* ACCORDION / CUSTOM CONTROLS TOGGLE */}
        <div className="pt-2 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label htmlFor="fuel-type-toggle" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Fuel Type
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('petrol')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                    fuelType === 'petrol'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Petrol
                </button>
                <button
                  type="button"
                  onClick={() => handleFuelTypeChange('diesel')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                    fuelType === 'diesel'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Diesel
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="custom-mileage" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Mileage (KM/L)
              </label>
              <input
                id="custom-mileage"
                type="number"
                min="1"
                step="0.5"
                value={mileageKmPerLitre}
                onChange={e => {
                  setMileageKmPerLitre(e.target.value === '' ? '' : parseFloat(e.target.value));
                  setSelectedVehicleId('custom');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="custom-price" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Rate (PKR/Litre)
              </label>
              <input
                id="custom-price"
                type="number"
                min="1"
                step="0.01"
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* RESULTS CARD (Matching the exact look & feel of the reference tool) */}
        <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200/80 p-6 sm:p-7 space-y-5">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Total Fuel Cost
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">Rs</span>
              <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                {Math.round(totalCost).toLocaleString('en-PK')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Fuel Needed
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                {litresRequired.toFixed(1)} L
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Cost Per KM
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                Rs {costPerKm.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Formula calculation trace footer */}
          <div className="pt-2 text-xs text-slate-600 font-medium font-mono leading-relaxed border-t border-emerald-200/60">
            {litresRequired.toFixed(1)} L × Rs {activePrice.toFixed(2)} · {fuelType === 'petrol' ? 'Petrol' : 'Diesel'} · {effectiveDistance} km · {selectedVehicle.name.split('—')[0].trim()}
          </div>
        </div>

        {/* Descriptive disclaimer footer */}
        <p className="text-xs text-slate-500 leading-relaxed pt-2">
          Priced at the current OGRA notified rate. The per-vehicle figures are typical real-world averages reported by owners in Pakistan, not manufacturer claims — and mileage still varies with load, traffic, AC use and vehicle condition, so treat the litre figure as an estimate. Picking a vehicle also switches the pump it normally takes; you can change that above.
        </p>
      </div>
    </div>
  );
}
