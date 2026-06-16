/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, Sparkles, Check, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { TOTE_PACKAGES, SERVICE_CITIES, calculateTotalEstimate, EXTRA_TOTE_PRICES } from '../data/pricing';

interface PricingCalculatorProps {
  onSelectEstimate: (data: {
    packageId: 'package25' | 'package50' | 'custom';
    weeks: number;
    extraTotes: number;
    cityName: string;
    total: number;
  }) => void;
}

export default function PricingCalculator({ onSelectEstimate }: PricingCalculatorProps) {
  const [selectedPackId, setSelectedPackId] = useState<'package25' | 'package50' | 'custom'>('package25');
  const [weeks, setWeeks] = useState<number>(1);
  const [extraTotes, setExtraTotes] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>('Palmdale');
  const [totalEstimate, setTotalEstimate] = useState<number>(150);

  // Re-calculate the total price whenever inputs change
  useEffect(() => {
    const total = calculateTotalEstimate(selectedPackId, weeks, extraTotes, selectedCity);
    setTotalEstimate(total);
  }, [selectedPackId, weeks, extraTotes, selectedCity]);

  // Adjust default extra totes when package changes to avoid weird state sizes
  const handlePackChange = (id: 'package25' | 'package50' | 'custom') => {
    setSelectedPackId(id);
    if (id === 'custom') {
      setExtraTotes(40); // Standard start for custom count
    } else {
      setExtraTotes(0);
    }
  };

  const handleApplyEstimate = () => {
    onSelectEstimate({
      packageId: selectedPackId,
      weeks,
      extraTotes,
      cityName: selectedCity,
      total: totalEstimate,
    });
  };

  const activePackage = TOTE_PACKAGES.find(p => p.id === selectedPackId) || TOTE_PACKAGES[0];
  const cityConfig = SERVICE_CITIES.find(c => c.name === selectedCity);

  return (
    <section id="pricing-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-slate-500 font-bold uppercase text-xs tracking-widest font-sans bg-slate-100 px-3 py-1 rounded-full">
            Transparent Pricing Structure
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Select Your Package & Calculate Cost
          </h2>
          <p className="font-sans text-slate-500 mt-4 text-base sm:text-lg">
            No hidden fees, no credit card required to request. Adjust weeks and quantity to find your perfect fit. Our metal moving dolly rentals are always <span className="text-blue-600 font-semibold uppercase">100% Free</span>.
          </p>
        </div>

        {/* Calculator Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block - Controls */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Step 1: Select Package */}
            <div className="space-y-4">
              <label id="calculator-step1-label" className="block text-sm font-extrabold text-slate-800 uppercase tracking-wider font-sans">
                Step 1: Choose Your Core Tote Package
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TOTE_PACKAGES.map((totePack) => {
                  const isSelected = selectedPackId === totePack.id;
                  return (
                    <button
                      key={totePack.id}
                      onClick={() => handlePackChange(totePack.id)}
                      className={`relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 select-none ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/30 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-slate-100 hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                            {totePack.name}
                          </h4>
                          {isSelected && (
                            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {totePack.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100/80 mt-2">
                        {totePack.id !== 'custom' ? (
                          <div className="font-sans">
                            <span className="font-display font-black text-2xl text-slate-900">${totePack.priceWeek1}</span>
                            <span className="text-xs text-slate-500 font-medium"> / 1st week</span>
                            <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                              +${totePack.priceAdditionalWeek}/add’l week
                            </div>
                          </div>
                        ) : (
                          <div className="font-sans">
                            <span className="font-display font-black text-lg text-slate-900">Custom Quantities</span>
                            <span className="text-xs text-slate-400 block mt-0.5">Starting at $4 per tote</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider weeks and count */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 space-y-6">
              
              {/* Additional Totes Slider / Input */}
              {selectedPackId !== 'custom' ? (
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center">
                    <label id="calculator-extra-totes-label" className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      Add Extra Totes (Optional)
                    </label>
                    <span className="text-sm font-extrabold text-blue-600 bg-white rounded-lg px-2.5 py-1 border border-slate-200 shadow-sm">
                      +{extraTotes} Extra Totes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                    {selectedPackId === 'package25' ? '$5' : '$4'} per extra tote. Add on to ensure everything fits!
                  </p>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={extraTotes}
                      onChange={(e) => setExtraTotes(parseInt(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex space-x-1 shrink-0">
                      <button
                        onClick={() => setExtraTotes(Math.max(0, extraTotes - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setExtraTotes(Math.min(30, extraTotes + 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center">
                    <label id="calculator-custom-totes-label" className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                      Custom Number of Blue Totes
                    </label>
                    <span className="text-sm font-extrabold text-blue-600 bg-white rounded-lg px-2.5 py-1 border border-slate-200 shadow-sm">
                      {extraTotes} Blue Totes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                    Volume scaling rates: Slide to adjust. Min order of 15.
                  </p>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="15"
                      max="150"
                      step="5"
                      value={extraTotes}
                      onChange={(e) => setExtraTotes(parseInt(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex space-x-1 shrink-0">
                      <button
                        onClick={() => setExtraTotes(Math.max(15, extraTotes - 5))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setExtraTotes(Math.min(150, extraTotes + 5))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Rental Duration Slider */}
              <div className="space-y-3 font-sans pt-4 border-t border-slate-200/50">
                <div className="flex justify-between items-center">
                  <label id="calculator-duration-label" className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    Rental Duration (weeks)
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 bg-white rounded-lg px-2.5 py-1 border border-slate-200 shadow-sm">
                    {weeks} {weeks === 1 ? 'Week' : 'Weeks'} ({weeks * 7} Days)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={weeks}
                    onChange={(e) => setWeeks(parseInt(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex space-x-1 shrink-0">
                    <button
                      onClick={() => setWeeks(Math.max(1, weeks - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setWeeks(Math.min(8, weeks + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 cursor-pointer text-slate-700 flex items-center justify-center font-bold font-sans text-sm active:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Serviced City Dropdown */}
              <div className="space-y-3 font-sans pt-4 border-t border-slate-200/50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <label id="calculator-delivery-city-label" className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    Delivery City in Antelope Valley
                  </label>
                  <div className="text-xs text-blue-600 font-bold flex items-center space-x-10 block">
                    <span>
                      {cityConfig && cityConfig.deliveryFee === 0 ? (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">✓ Free Delivery Area</span>
                      ) : (
                        <span className="text-slate-500 font-semibold">+${cityConfig?.deliveryFee} Delivery fee</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <select
                    id="calculator-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-2xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 active:outline-none transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    {SERVICE_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} (Delivery fee: {c.deliveryFee === 0 ? 'FREE' : `$${c.deliveryFee}`})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

          </div>

          {/* Right Block - Cost Summary & Invoice Design */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between self-start">
            
            {/* Background design grids */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-blue-400" />
                  <span className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-400">Order Estimate</span>
                </div>
                <span className="text-[10px] bg-blue-600/30 text-blue-300 font-black font-sans px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Price Estimate
                </span>
              </div>

              {/* Package Recap */}
              <div className="space-y-4 font-sans text-left">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base Selection</h4>
                  <p className="text-lg font-black text-white mt-1">{activePackage.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Included Totes</h5>
                    <p className="text-base font-extrabold text-white">
                      {selectedPackId !== 'custom' 
                        ? activePackage.toteCount + extraTotes 
                        : extraTotes} Blue Totes
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Dolly Rentals</h5>
                    <p className="text-base font-extrabold text-emerald-400 flex items-center space-x-1">
                      <span>{selectedPackId === 'package50' ? '2 Dollys' : '1 Dolly'}</span>
                      <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded text-emerald-300">FREE</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Duration</h5>
                    <p className="text-base font-extrabold text-white">{weeks} {weeks === 1 ? 'Week' : 'Weeks'}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Delivery & Return</h5>
                    <p className="text-base font-extrabold text-blue-400">{selectedCity}</p>
                  </div>
                </div>
              </div>

              {/* Package Bullet Recap Checklist */}
              <div className="border-t border-white/5 pt-4 space-y-2 text-left font-sans text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sanitized blue boxes with attached hazard-style lids</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy-duty steel dolly with quiet rolling caster wheels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eco-friendlier alternative: zero cardboard dumpster runs</span>
                </div>
              </div>

              {/* Pricing breakdown summary receipt */}
              <div className="bg-white/5 p-4 rounded-2xl space-y-2 border border-white/5 text-left font-sans text-xs">
                {selectedPackId !== 'custom' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base Week 1 rate:</span>
                    <span className="text-white font-bold">${activePackage.priceWeek1}.00</span>
                  </div>
                )}
                
                {weeks > 1 && selectedPackId !== 'custom' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Additional {weeks - 1} weeks rental:</span>
                    <span className="text-white font-bold">+${(weeks - 1) * activePackage.priceAdditionalWeek}.00</span>
                  </div>
                )}

                {extraTotes > 0 && selectedPackId !== 'custom' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">{extraTotes} Extra Totes add-on:</span>
                    <span className="text-white font-bold">
                      +${extraTotes * (selectedPackId === 'package25' ? EXTRA_TOTE_PRICES.package25Rate : EXTRA_TOTE_PRICES.package50Rate)}.00
                    </span>
                  </div>
                )}

                {selectedPackId === 'custom' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">{extraTotes} Totes custom base rate:</span>
                    <span className="text-white font-bold">
                      ${extraTotes * (extraTotes >= 40 ? 4 : 5)}.00
                    </span>
                  </div>
                )}

                {selectedPackId === 'custom' && weeks > 1 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Custom rate add’l {weeks - 1} weeks:</span>
                    <span className="text-white font-bold">
                      +${((weeks - 1) * (extraTotes * 1.5)).toFixed(0)}.00
                    </span>
                  </div>
                )}

                {cityConfig && cityConfig.deliveryFee > 0 && (
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-slate-400">Delivery service ({selectedCity}):</span>
                    <span className="text-white font-bold">+${cityConfig.deliveryFee}.00</span>
                  </div>
                )}
              </div>

            </div>

            {/* Price Total Estimate Section */}
            <div className="pt-6 border-t border-white/15 space-y-4 text-left font-sans">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Total Estimated Cost</span>
                  <span className="text-[10px] text-slate-500 font-medium tracking-wide">Pay later at delivery</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-4xl sm:text-5xl text-blue-400 tracking-tight">${totalEstimate}</span>
                  <span className="text-sm font-medium text-slate-400 block mt-0.5">({weeks} {weeks === 1 ? 'Week' : 'Weeks'})</span>
                </div>
              </div>

              {/* Click to Pre-fill Delivery inquiry */}
              <button
                id="apply-estimate-btn"
                onClick={handleApplyEstimate}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl cursor-pointer text-center tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-2 active:scale-98 shadow-lg shadow-blue-500/10 group"
              >
                <span>Lock Estimate & Book Form</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-slate-500 text-[10px] text-center">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Estimate only. No charge until delivery details are confirmed with you.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
