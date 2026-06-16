/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PricingCalculator from './components/PricingCalculator';
import InquiryForm from './components/InquiryForm';
import FaqSection from './components/FaqSection';
import LeadManager from './components/LeadManager';
import Footer from './components/Footer';

export default function App() {
  const [selectedEstimate, setSelectedEstimate] = useState<{
    packageId: 'package25' | 'package50' | 'custom';
    weeks: number;
    extraTotes: number;
    cityName: string;
    total: number;
  } | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [leadCounter, setLeadCounter] = useState(0);

  const handleSelectEstimate = (data: {
    packageId: 'package25' | 'package50' | 'custom';
    weeks: number;
    extraTotes: number;
    cityName: string;
    total: number;
  }) => {
    setSelectedEstimate(data);
    // Smooth scroll to Inquiry Form
    const el = document.getElementById('inquiry-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmitted = () => {
    // Increment submission counter to trigger a reload inside LeadManager
    setLeadCounter((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Scroll indicator anchor */}
      <div id="top-anchor" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      {/* Navigation Header */}
      <Header
        onScrollToForm={() => scrollToSection('inquiry-form-section')}
        onScrollToPricing={() => scrollToSection('pricing-section')}
        onScrollToFaq={() => scrollToSection('faq-section')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Splash/Hero */}
        <Hero
          onScrollToForm={() => scrollToSection('inquiry-form-section')}
          onScrollToPricing={() => scrollToSection('pricing-section')}
        />

        {/* Brand Comparison & Dimensions Box */}
        <Features />

        {/* Pricing Selection & Cost Calculator */}
        <PricingCalculator onSelectEstimate={handleSelectEstimate} />

        {/* Leads Collection Form */}
        <InquiryForm
          prefilledEstimate={selectedEstimate}
          onSubmissionSuccess={handleInquirySubmitted}
        />

        {/* Collapse FAQs */}
        <FaqSection />
      </main>

      {/* Lead/Database Administration Panel */}
      <LeadManager
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        renderTriggerCount={leadCounter}
      />

      {/* Site Footer */}
      <Footer
        onScrollToPricing={() => scrollToSection('pricing-section')}
        onScrollToFaq={() => scrollToSection('faq-section')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
