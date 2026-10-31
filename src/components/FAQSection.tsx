import React, { useState } from "react";
import { FAQS } from "../data/sampleReports";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 relative border-t border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-black" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-700">
            Everything you need to know about BDI Validator's AI validation engine.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-50 border-2 border-black overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-black hover:text-neutral-900 transition-colors"
                >
                  <span className="font-display font-extrabold text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-black shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-800 leading-relaxed border-t border-neutral-200 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
