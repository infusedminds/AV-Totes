/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, AlertCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { InquiryLead } from '../types';
import { calculateTotalEstimate, SERVICE_CITIES } from '../data/pricing';

interface InquiryFormProps {
  prefilledEstimate: {
    packageId: 'package25' | 'package50' | 'custom';
    weeks: number;
    extraTotes: number;
    cityName: string;
    total: number;
  } | null;
  onSubmissionSuccess: () => void;
}

export default function InquiryForm({ prefilledEstimate, onSubmissionSuccess }: InquiryFormProps) {
  // Input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Package specifics
  const [packageId, setPackageId] = useState<'package25' | 'package50' | 'custom'>('package25');
  const [durationWeeks, setDurationWeeks] = useState(1);
  const [extraTotesCount, setExtraTotesCount] = useState(0);
  const [city, setCity] = useState('Palmdale');
  
  // Date preferences
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [generatedLeadCode, setGeneratedLeadCode] = useState('');
  const [computedTotal, setComputedTotal] = useState(150);

  // Sync state if a prefilled estimate is selected from the calculator
  useEffect(() => {
    if (prefilledEstimate) {
      setPackageId(prefilledEstimate.packageId);
      setDurationWeeks(prefilledEstimate.weeks);
      setExtraTotesCount(prefilledEstimate.extraTotes);
      setCity(prefilledEstimate.cityName);
      
      // Scroll smoothly to form
      const el = document.getElementById('inquiry-form-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefilledEstimate]);

  // Compute total estimate whenever package details or city changes
  useEffect(() => {
    const total = calculateTotalEstimate(packageId, durationWeeks, extraTotesCount, city);
    setComputedTotal(total);
  }, [packageId, durationWeeks, extraTotesCount, city]);

  // Set default dates (e.g. delivery in 3 days, pickup depending on weeks)
  useEffect(() => {
    const today = new Date();
    
    // Default delivery in 3 days
    const defaultDelivery = new Date(today);
    defaultDelivery.setDate(today.getDate() + 3);
    const delStr = defaultDelivery.toISOString().split('T')[0];
    setDeliveryDate(delStr);

    // Default pickup depends on rental weeks
    const defaultPickup = new Date(defaultDelivery);
    defaultPickup.setDate(defaultDelivery.getDate() + (durationWeeks * 7));
    const pickStr = defaultPickup.toISOString().split('T')[0];
    setPickupDate(pickStr);
  }, [durationWeeks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!fullName.trim()) return setFormError('Please enter your full name.');
    if (!phone.trim()) return setFormError('Please enter your telephone number.');
    if (!email.trim() || !email.includes('@')) return setFormError('Please enter a valid email address.');
    if (!deliveryAddress.trim()) return setFormError('Please enter your delivery street address.');
    if (!deliveryDate) return setFormError('Please select a preferred delivery date.');
    if (!pickupDate) return setFormError('Please select a preferred pickup date.');

    // Ensure pickup is after delivery
    const dDel = new Date(deliveryDate);
    const dPick = new Date(pickupDate);
    if (dPick <= dDel) {
      return setFormError('Preferred pickup date must be at least 1 day after the delivery date.');
    }

    setIsSubmitting(true);

    try {
      // Simulate real API networking delay
      setTimeout(() => {
        // Generate a localized lead confirmation number
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const code = `AVT-${randNum}`;
        setGeneratedLeadCode(code);

        const newLead: InquiryLead = {
          id: code,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          deliveryAddress: deliveryAddress.trim(),
          city,
          zipCode: zipCode.trim(),
          packageId,
          durationWeeks,
          extraTotesCount,
          preferredDeliveryDate: deliveryDate,
          preferredPickupDate: pickupDate,
          specialInstructions: specialInstructions.trim() || undefined,
          totalEstimate: computedTotal,
          submittedAt: new Date().toISOString(),
          status: 'New',
        };

        // Write lead to local storage array
        const existingLeadsRaw = localStorage.getItem('avtotes_leads');
        const existingLeads: InquiryLead[] = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
        existingLeads.unshift(newLead);
        localStorage.setItem('avtotes_leads', JSON.stringify(existingLeads));

        // Done
        setIsSubmitting(false);
        setFormSubmitted(true);
        onSubmissionSuccess();
      }, 1200);

    } catch (err) {
      setIsSubmitting(false);
      setFormError('An unexpected error occurred. Please try again or call office directly.');
      console.error(err);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setDeliveryAddress('');
    setZipCode('');
    setSpecialInstructions('');
    setFormSubmitted(false);
  };

  // Get package object label
  const getPackageName = () => {
    if (packageId === 'package25') return '25 Blue Tote Package';
    if (packageId === 'package50') return '50 Blue Tote Package';
    return 'Custom Blue Tote Package';
  };

  return (
    <section id="inquiry-form-section" className="py-20 bg-blue-600 relative overflow-hidden text-white">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-3/4 h-1/2 bg-blue-500 rounded-full blur-3xl opacity-40 -z-0" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-700/50 rounded-full blur-2xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail & Direct Info */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="text-[10px] bg-blue-500 border border-blue-400 font-extrabold uppercase tracking-wide px-3 py-1 rounded-full text-blue-100 font-sans">
              Simple 2-Minute Process
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start Your Stress-Free Move
            </h2>
            <p className="font-sans text-blue-100 text-sm leading-relaxed">
              Complete this simple form to submit your rental inquiry. No payment details or deposits are required today. Our team will verify space slot availability and call you to lock in delivery timings!
            </p>

            <div className="border-t border-blue-500/85 pt-6 space-y-4 font-sans text-xs text-blue-100">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/60 flex items-center justify-center shrink-0">
                  <span className="font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Request Sent</h4>
                  <p className="text-blue-200 mt-0.5">Your estimate is logged and saved in our queue.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/60 flex items-center justify-center shrink-0">
                  <span className="font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Call Confirmation</h4>
                  <p className="text-blue-200 mt-0.5">We will call you (within 2 business hours) to establish final delivery slot.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/60 flex items-center justify-center shrink-0">
                  <span className="font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Guaranteed Delivery</h4>
                  <p className="text-blue-200 mt-0.5">Our driver unloads boxes, shows you how they lock, and rolls them in!</p>
                </div>
              </div>
            </div>

            {/* Local Trust Note */}
            <div className="bg-blue-700/60 rounded-2xl p-4 border border-blue-500/40 font-sans text-[11px] text-blue-200">
              <MapPin className="w-4 h-4 text-emerald-400 inline shrink-0 mr-1.5 -mt-0.5" />
              <span>We strictly live and work inside Palmdale-Lancaster. Keeping local business dollars centered in the AV!</span>
            </div>
          </div>

          {/* Right inquiry form paper card */}
          <div className="lg:col-span-8">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Success Screen */}
              {formSubmitted ? (
                <div className="py-10 space-y-6 text-center font-sans">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto animate-bounce shadow-md">
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold uppercase px-3 py-1 rounded">
                      Confirmation Number {generatedLeadCode}
                    </span>
                    <h3 className="font-display text-2.5xl font-black text-slate-900 tracking-tight">
                      Rental Request Received!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-lg mx-auto">
                      Thank you, <strong className="text-slate-800 font-bold">{fullName}</strong>. We have logged your request. We will follow up via phone at <strong className="text-slate-800">{phone}</strong> shortly to finalize the setup!
                    </p>
                  </div>

                  {/* Submit Recap Invoice */}
                  <div className="max-w-md mx-auto bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left text-xs space-y-3 dark:border-slate-200">
                    <h4 className="font-bold text-slate-800 uppercase tracking-widest text-[10px] border-b pb-2">Selected Estimate Summary</h4>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package Style:</span>
                      <span className="text-slate-900 font-bold">{getPackageName()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rental Duration:</span>
                      <span className="text-slate-900 font-bold">{durationWeeks} {durationWeeks === 1 ? 'Week' : 'Weeks'}</span>
                    </div>
                    {extraTotesCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Extra Totes added:</span>
                        <span className="text-slate-900 font-bold">+{extraTotesCount} boxes</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery Location:</span>
                      <span className="text-slate-900 font-bold">{deliveryAddress}, {city}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-slate-800 font-bold">Estimated Total:</span>
                      <span className="text-blue-600 font-extrabold text-sm">${computedTotal}.00</span>
                    </div>
                    <div className="pt-2 text-[10px] text-slate-400 italic text-center">
                      No charge is filed now. You pay upon safe hand delivery!
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      File Another Inquiry
                    </button>
                    <a
                      href="tel:6615558683"
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer inline-flex items-center justify-center space-x-1"
                    >
                      <span>Call (661) 555-TOTE</span>
                    </a>
                  </div>
                </div>
              ) : (
                
                /* Real Inquiry Form */
                <form id="rental-inquiry-form" onSubmit={handleSubmit} className="space-y-6 text-left font-sans text-xs">
                  
                  {/* Form section title */}
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display text-xl font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                      <span>Rental Inquiry Form</span>
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">Please provide delivery detail logs.</p>
                  </div>

                  {formError && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span className="font-semibold text-xs leading-none">{formError}</span>
                    </div>
                  )}

                  {/* Primary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5 col-span-1">
                      <label id="form-name-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-medium text-slate-800 transition-colors"
                      />
                    </div>

                    {/* Telephone */}
                    <div className="space-y-1.5 col-span-1">
                      <label id="form-phone-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="(661) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-medium text-slate-800 transition-colors"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5 col-span-1">
                      <label id="form-email-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-medium text-slate-800 transition-colors"
                      />
                    </div>

                    {/* City Dropdown Selector */}
                    <div className="space-y-1.5 col-span-1">
                      <label id="form-city-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Antelope Valley City <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="form-city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        {SERVICE_CITIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} {c.deliveryFee === 0 ? '(Free delivery)' : `(+$${c.deliveryFee} Del)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-1.5 col-span-1 md:col-span-2">
                      <label id="form-address-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Street Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="street-address"
                        required
                        placeholder="1234 W Rancho Vista Blvd"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-medium text-slate-800 transition-colors"
                      />
                    </div>

                    {/* Sizing prefill recaps inside form */}
                    <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-2xl col-span-1 md:col-span-2 space-y-3">
                      <h4 className="font-extrabold text-[10px] uppercase text-blue-700 tracking-wider">
                        Estimate Details (Adjustable)
                      </h4>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Package Type */}
                        <div>
                          <label id="form-package-selection-label" className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            Package Selection
                          </label>
                          <select
                            id="form-package-select"
                            value={packageId}
                            onChange={(e) => setPackageId(e.target.value as any)}
                            className="mt-1 w-full bg-white border border-slate-200 p-2 text-[10.5px] font-bold rounded-lg text-slate-700 cursor-pointer"
                          >
                            <option value="package25">25 Tote Pack ($150)</option>
                            <option value="package50">50 Tote Pack ($200)</option>
                            <option value="custom">Custom Pack Builder</option>
                          </select>
                        </div>

                        {/* Extra Totes */}
                        <div>
                          <label id="form-extra-totes-label" className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            Extra Blue Totes
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="150"
                            value={extraTotesCount}
                            onChange={(e) => setExtraTotesCount(Math.max(0, parseInt(e.target.value) || 0))}
                            className="mt-1 w-full bg-white border border-slate-200 p-1.5 text-[10.5px] font-bold rounded-lg text-slate-700"
                          />
                        </div>

                        {/* Weeks slider */}
                        <div>
                          <label id="form-rentalwks-label" className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            Rental Duration
                          </label>
                          <select
                            id="form-weeks-select"
                            value={durationWeeks}
                            onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                            className="mt-1 w-full bg-white border border-slate-200 p-2 text-[10.5px] font-bold rounded-lg text-slate-700 cursor-pointer"
                          >
                            <option value="1">1 Week (Min)</option>
                            <option value="2">2 Weeks</option>
                            <option value="3">3 Weeks</option>
                            <option value="4">4 Weeks</option>
                            <option value="5">5 Weeks</option>
                            <option value="6">6 Weeks</option>
                            <option value="8">8 Weeks</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-blue-900 font-semibold border-t border-blue-100 pt-2 shrink-0">
                        <span>Includes: FREE Dolly Rental + sanitized blue totes</span>
                        <span className="font-extrabold text-blue-700 text-sm">Estimated Price: ${computedTotal}.00</span>
                      </div>
                    </div>

                    {/* Preferred Dates */}
                    <div className="space-y-1.5 col-span-1">
                      <label id="form-delivery-date-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 text-blue-500" />
                        Preferred Delivery Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-bold text-slate-700 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-1">
                      <label id="form-pickup-date-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 text-blue-500" />
                        Preferred Pickup Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-bold text-slate-700 cursor-pointer"
                      />
                    </div>

                    {/* Comments */}
                    <div className="space-y-1.5 col-span-1 md:col-span-2">
                      <label id="form-instructions-label" className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        Special Delivery Instructions / Gate Code (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please deliver to backyard patio or keep boxes stacked near garage door..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 active:outline-none rounded-xl font-medium text-slate-800 transition-colors"
                      />
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      id="submit-inquiry-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/15 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Logging Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4.5 h-4.5" />
                          <span>Submit Rental Inquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 mt-2.5 text-center leading-relaxed">
                      By submitting this form, you authorize AVtotes.com drivers to contact you. We never share your data.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
