/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Truck, ShieldAlert, Award, ChevronRight } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onScrollToPricing: () => void;
}

export default function Hero({ onScrollToForm, onScrollToPricing }: HeroProps) {
  // Exact path of the generated hero image from turn 1
  const heroImgSrc = '/src/assets/images/avtotes_hero_clean_stack_1780696362948.png';

  return (
    <section id="hero-section" className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-blue-50/70 via-white to-white overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-slate-50 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left animate-in fade-in slide-in-from-left-6 duration-700">
            {/* Promo Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="font-sans text-xs font-bold text-blue-700 tracking-wide uppercase">
                Eco-Friendly Plastic Totes in the Antelope Valley
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Rent Sturdy <span className="text-blue-600 relative">Blue Moving Totes</span> <br className="hidden sm:inline" /> 
              & Skip Cardboard Boxes
            </h1>

            {/* H2/Description */}
            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Why hassle with tape, flimsy cardboard boxes, and post-move waste? 
              <strong className="text-slate-800"> AVtotes.com</strong> delivers sanitized, heavy-duty interlocking plastic moving boxes right to your doorstep in 
              <span className="text-blue-700 font-semibold"> Palmdale, Lancaster, and Rosamond</span>. Move easier, pack faster, and we'll pick them up when you're done!
            </p>

            {/* Micro Benefits Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center space-x-2.5 text-slate-700 font-sans">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 font-bold" />
                </div>
                <span className="text-sm font-semibold">No tapes or folding needed</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-700 font-sans">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 font-bold" />
                </div>
                <span className="text-sm font-semibold">FREE heavy-duty Dolly rental</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-700 font-sans">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 font-bold" />
                </div>
                <span className="text-sm font-semibold">Crush-proof & Stackable (Zero Slid)</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-700 font-sans">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 font-bold" />
                </div>
                <span className="text-sm font-semibold">Sanitized after every single rental</span>
              </div>
            </div>

            {/* Actions CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                id="hero-book-cta"
                onClick={onScrollToForm}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Calculate & Reserve Totes</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                id="hero-pricing-cta"
                onClick={onScrollToPricing}
                className="w-full sm:w-auto px-7 py-4 bg-white text-slate-800 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-2xl font-bold text-sm transition-all duration-300 active:bg-slate-50 cursor-pointer flex items-center justify-center"
              >
                View Package Pricing &rarr;
              </button>
            </div>

            {/* Delivery Alert Text */}
            <div className="flex items-start space-x-2.5 text-slate-500 text-xs bg-slate-50 border border-slate-200/50 p-3 rounded-xl max-w-xl">
              <Truck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Antelope Valley Hub Delivery</strong>: Daily delivery routes in Palmdale, Quartz Hill, West Lancaster, East Lancaster, and Rosamond. Check out our pricing packages below!
              </span>
            </div>
          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-right-6 duration-700">
            {/* Soft decorative shadow frame */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl -rotate-2 transform scale-102 blur-lg -z-10" />
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 bg-white">
              <img
                src={heroImgSrc}
                alt="Stacked Blue Moving Totes on a Heavy-Duty Steel Dolly with Wheels"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-101"
              />
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xl flex items-center space-x-3 max-w-xs animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left font-sans">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Free Dolly Rental</h4>
                <p className="text-[10px] text-slate-500 font-medium">Included with every package order. Safe on your back!</p>
              </div>
            </div>

            {/* Floating Speed Delivery Badge */}
            <div className="absolute -top-5 -right-5 bg-blue-600 rounded-2xl p-3 shadow-lg flex items-center space-x-2 shadow-blue-500/10">
              <div className="p-1 rounded-md bg-white/20 text-white shrink-0">
                <Truck className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-sans">
                <span className="text-[10px] font-bold text-blue-100 block uppercase tracking-wider">Serving AV 100%</span>
                <span className="text-xs font-extrabold text-white">Local Daily Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
