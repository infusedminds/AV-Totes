/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Package, Phone, MapPin, Menu, X } from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onScrollToPricing: () => void;
  onScrollToFaq: () => void;
  onOpenAdmin: () => void;
}

export default function Header({
  onScrollToForm,
  onScrollToPricing,
  onScrollToFaq,
  onOpenAdmin,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      action();
    }, 100);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3 border-b border-blue-100'
          : 'bg-white/95 backdrop-blur-sm md:bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <Package className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-400 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
                AV<span className="text-blue-600">totes</span>
                <span className="text-xs font-semibold text-slate-400 font-sans tracking-normal ml-0.5">.com</span>
              </span>
              <div className="hidden sm:block text-[10px] font-bold text-blue-500 tracking-wider uppercase font-sans -mt-1">
                Antelope Valley Moving Boxes
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-sans font-medium text-slate-600">
            <button
              onClick={onScrollToPricing}
              className="hover:text-blue-600 transition-colors cursor-pointer text-sm font-semibold uppercase tracking-wide"
            >
              Pricing Packages
            </button>
            <button
              onClick={onScrollToFaq}
              className="hover:text-blue-600 transition-colors cursor-pointer text-sm font-semibold uppercase tracking-wide"
            >
              FAQs
            </button>
            <span className="flex items-center text-slate-500 space-x-1.5 text-xs bg-slate-100 px-3 py-1.5 rounded-full font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Servicing Palmdale • Lancaster • Rosamond</span>
            </span>
          </nav>

          {/* Call and Book */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:6615558683"
              className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 transition-colors group font-sans"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Local AV Office</p>
                <p className="text-sm font-bold text-slate-700">(661) 555-TOTE</p>
              </div>
            </a>
            <button
              id="header-book-btn"
              onClick={onScrollToForm}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:translate-y-0.5 cursor-pointer"
            >
              Rent Totes Now
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href="tel:6615558683"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 active:scale-95"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-6 space-y-4 font-sans">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleMobileNav(onScrollToPricing)}
                className="w-full text-left py-2 px-3 text-slate-700 font-bold hover:bg-slate-50 rounded-lg"
              >
                Pricing Packages
              </button>
              <button
                onClick={() => handleMobileNav(onScrollToFaq)}
                className="w-full text-left py-2 px-3 text-slate-700 font-bold hover:bg-slate-50 rounded-lg"
              >
                Frequently Asked Questions
              </button>
              <button
                onClick={() => handleMobileNav(onOpenAdmin)}
                className="w-full text-left py-2 px-3 text-slate-400 font-medium text-xs hover:bg-slate-50 rounded-lg"
              >
                Owner Administration Dashboard
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 px-3 text-slate-500 text-xs font-semibold">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Palmdale, Lancaster, Rosamond & Quartz Hill</span>
              </div>
              <button
                id="mobile-book-btn"
                onClick={() => handleMobileNav(onScrollToForm)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-center font-bold active:scale-99 hover:bg-blue-700"
              >
                Rent Blue Totes Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
