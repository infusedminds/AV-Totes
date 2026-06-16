/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'Where exactly do you deliver and pick up?',
      answer: 'We service the entire Antelope Valley (AV) area, including Palmdale, Lancaster, Rosamond, Quartz Hill, Acton, and Littlerock. Standard delivery and pickup are 100% FREE in our core zones (Palmdale, Lancaster, Rosamond) with any package order.',
    },
    {
      question: 'How clean are the blue plastic totes when they arrive?',
      answer: 'Extremely clean! Sanitation is our top priority. After every rental, each blue tote is deep-cleaned and treated with a high-pressure, medical-grade disinfectant wash. We hand-wipe every box so they arrive spotless and safe for your clothes, linens, and documents.',
    },
    {
      question: 'Do you charge a security deposit for the totes or dolly?',
      answer: 'No deposit is required! When our driver delivers your totes, we simply sign a quick rental waiver form. The metal moving dolly is completely FREE for you to use during your active rental duration.',
    },
    {
      question: 'Are there interlocking locks on the lids for security?',
      answer: 'Yes! Both sides of the tote have locking loop holes on the interlocking lids. You can easily loop standard zip-ties or padlocks through them to secure private documents, electronics, jewelry, or personal files.',
    },
    {
      question: 'Do blue totes handle the high desert winds of Palmdale and Lancaster?',
      answer: 'Yes, outstandingly so! One of the biggest complaints about cardboard boxes in the Antelope Valley is that they get coated in fine desert dust and can easily blow away or collapse on windy days. Our heavy-duty plastic totes are heavy enough to stay put, seal close, and keep out 100% of flying desert sand and dust!',
    },
    {
      question: 'What happens if I need the totes for a second week?',
      answer: 'No problem! Adding an extra week is easy and heavily discounted. For our 25 Tote Package, each additional week is only $50. For our 50 Tote Package, it is only $75. Just call or text us at least 2 days before your scheduled pickup, and we will update your schedule!',
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="font-sans text-slate-500 mt-3 text-sm sm:text-base">
            Everything you need to know about renting blue moving boxes in the Antelope Valley.
          </p>
        </div>

        {/* Faq List */}
        <div className="space-y-4 font-sans text-left">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl transition-all duration-300 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-slate-800">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600 border-blue-100' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Answer collapsing box */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-slate-100 py-5 px-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 pt-6 border-t border-slate-200/50">
          <p className="text-slate-500 text-xs font-medium">
            Have another question about custom schedules or commercial relocation?
          </p>
          <div className="mt-3">
            <a
              href="tel:6615558683"
              className="text-blue-600 hover:text-blue-700 font-extrabold text-sm hover:underline"
            >
              Call or Text: (661) 555-TOTE &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
