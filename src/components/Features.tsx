/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, X, Shield, RefreshCw, Zap, Sparkles, Smile } from 'lucide-react';

export default function Features() {
  const singleToteImg = '/src/assets/images/single_blue_tote_clean_1780696373219.png';

  const comparisonData = [
    {
      feature: 'Setup Time',
      totes: '0 Seconds. Arrives ready to pack. Interlocking lids close instantly.',
      cardboard: '3-5 minutes per box. Folding, taping top and bottom, scoring.',
      yes: true,
    },
    {
      feature: 'Strength & Safety',
      totes: 'Heavy-duty commercial plastic. Holds up to 75 lbs. Absolutely crush-proof.',
      cardboard: 'Flimsy paperboard. Easily buckles, ruptures, or drops bottom contents.',
      yes: true,
    },
    {
      feature: 'Weather Protection',
      totes: '100% Waterproof. Protects from rain, desert dust, mud, and spills.',
      cardboard: 'Soggy and weak when wet. Offers zero protection from moisture.',
      yes: true,
    },
    {
      feature: 'Sanitation Level',
      totes: 'Deep-cleaned and sanitized with eco-friendly sanitizers after every single user.',
      cardboard: 'Collects dirt, dust, and insects throughout storage and transport.',
      yes: true,
    },
    {
      feature: 'Ease of Carrying',
      totes: 'Built-in comfortable handles. Stack neatly on our FREE rolling Dolly.',
      cardboard: 'No real handles (or weak punched tabs). Hard to carry several at once.',
      yes: true,
    },
    {
      feature: 'Eco Footprint',
      totes: '100% reusable and recyclable. Saving thousands of trees across the AV.',
      cardboard: 'Single-use garbage generating massive waste bins after your move.',
      yes: true,
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for an <span className="text-blue-600">Effortless Move</span>
          </h2>
          <p className="font-sans text-slate-500 mt-4 text-base sm:text-lg">
            Compare our professional-grade Blue Moving Totes with normal cardboard boxes. You will see why local moving pros refuse to go back to tape and scissors!
          </p>
        </div>

        {/* Bento Grid Features Layout with Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Detailed Bento Block: The Tote Closeup */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Industrial Grace
              </span>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                The Blue Tote Advantage
              </h3>
              <div className="space-y-4">
                <p className="font-sans text-slate-500 text-sm leading-relaxed">
                  Our professional blue moving totes are built to withstand heavy-duty hauling while securing your personal property flawlessly.
                </p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-xs font-sans text-slate-600 shadow-inner">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">EXTERIOR DIMENSIONS</span>
                    <span className="font-mono font-bold text-slate-800">27" x 17" x 12"</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">INTERIOR DIMENSIONS</span>
                    <span className="font-mono font-bold text-slate-800">25.5" x 15.5" x 11.8"</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">CAPACITY</span>
                    <span className="font-mono font-bold text-blue-600">18.75 GALLONS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">VOLUME</span>
                    <span className="font-mono font-bold text-blue-600">2.50 CU. FT.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Render single tote image strictly with no-referrer */}
            <div className="my-6 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute inset-0 bg-blue-100/40 rounded-full blur-xl -z-10" />
                <img
                  src={singleToteImg}
                  alt="Single Blue AVtotes Commercial Plastic Moving Box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 divide-x divide-slate-100 text-center">
              <div>
                <span className="font-display text-base font-bold text-blue-600 block">18.75 Gal</span>
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wide">Capacity</span>
              </div>
              <div>
                <span className="font-display text-base font-bold text-blue-600 block">2.50 Cu.Ft</span>
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wide">Volume</span>
              </div>
              <div>
                <span className="font-display text-base font-bold text-blue-600 block">100%</span>
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wide font-medium">Sanitized</span>
              </div>
            </div>
          </div>

          {/* Detailed Bento Block: Comparisons Table */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <span>The Heavyweight Battle</span>
                <span className="text-[10px] bg-slate-100 uppercase tracking-widest text-slate-500 font-extrabold px-2 py-1 rounded-sm">Totes vs Cardboard</span>
              </h3>

              <div className="space-y-4 font-sans text-sm">
                {comparisonData.map((row, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="sm:w-1/4 shrink-0">
                      <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">{row.feature}</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      {/* Totes Row */}
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-slate-700 text-xs font-semibold">
                          <strong className="text-blue-600">AVtotes:</strong> {row.totes}
                        </span>
                      </div>
                      {/* Cardboard Row */}
                      <div className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <span className="text-slate-400 text-xs">
                          <strong className="text-slate-500">Cardboard:</strong> {row.cardboard}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Banner / Mini Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-left font-sans">
              <h4 className="text-base font-extrabold text-slate-900">Zero Box Assembly</h4>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Save hours of your life! Totes are delivered, cleaned, nested, and absolutely ready to pack.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-left font-sans">
              <h4 className="text-base font-extrabold text-slate-900">Lockable Security</h4>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Lids contain lock loops on both sides. Secure your confidential documents or fancy goods easily using zip-ties.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="text-left font-sans">
              <h4 className="text-base font-extrabold text-slate-900">100% Recycled & Safe</h4>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Designed to operate for years, minimizing the local landfill impact and protecting California forests.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function StrongText({ text }: { text: string }) {
  return <strong className="text-slate-800 font-bold">{text}</strong>;
}
