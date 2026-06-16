/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, Phone, Mail, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToPricing: () => void;
  onScrollToFaq: () => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onScrollToPricing, onScrollToFaq, onOpenAdmin }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800">
      
      {/* Upper footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/10">
                <Package className="w-5.5 h-5.5" />
              </div>
              <span className="font-display font-black text-xl tracking-tight">
                AV<span className="text-blue-500">totes</span>.com
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We specialize in renting sanitized, industrial-grade blue plastic moving totes in the Antelope Valley. Skip the stress of cardboard and move clean!
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Authorized AV operator
              </span>
            </div>
          </div>

          {/* Serviced Areas List */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Services Zones</h4>
            <ul className="space-y-2 text-xs">
              <li>Palmdale (Central, Rancho Vista, West Palmdale, Anaverde)</li>
              <li>Lancaster (Quartz Hill, West Lancaster, Challenger Way)</li>
              <li>Rosamond (Kern County border line)</li>
              <li>Littlerock, Acton, and surrounding AV hubs</li>
            </ul>
          </div>

          {/* Quick Contact Box */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Contact Dispatch</h4>
            <div className="space-y-3.5 text-xs">
              <a
                href="tel:6615558683"
                className="flex items-center space-x-2.5 text-slate-350 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 bg-slate-850 border border-slate-800 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Call / Text Dispatch</p>
                  <p className="font-bold text-slate-200">(661) 555-TOTE</p>
                </div>
              </a>

              <a
                href="mailto:support@avtotes.com"
                className="flex items-center space-x-2.5 text-slate-350 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 bg-slate-850 border border-slate-800 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Email Inquiry Unit</p>
                  <p className="font-semibold text-slate-200">support@avtotes.com</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Under footer bottom credit line */}
      <div className="bg-slate-950/80 subpixel-antialiased text-slate-500 py-6 text-xs border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-medium text-center">
            
            <div className="text-slate-400 text-[11px]">
              &copy; {new Date().getFullYear()} AVtotes.com. All Rights Reserved. 
              <span className="hidden sm:inline"> • Designed for Palmdale, Lancaster, & Rosamond movers.</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={onScrollToPricing}
                className="hover:text-white cursor-pointer active:text-slate-200 transition-colors"
              >
                Packages
              </button>
              <button
                onClick={onScrollToFaq}
                className="hover:text-white cursor-pointer active:text-slate-200 transition-colors"
              >
                FAQs
              </button>
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1 border border-blue-500/25 px-2.5 py-1 rounded bg-blue-500/5 active:scale-97 cursor-pointer"
              >
                <span>Owner Portal</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
