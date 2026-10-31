import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const CTASection: React.FC<{ onStartValidation: (prompt?: string) => void }> = ({ onStartValidation }) => {
  const [inputPrompt, setInputPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartValidation(inputPrompt.trim() || undefined);
  };

  return (
    <section className="py-20 md:py-28 relative border-t border-neutral-200 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-black fill-yellow-400" />
          <span>Stop Guessing • Start Validating</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl text-black tracking-tight leading-tight max-w-3xl mx-auto">
          Don't Spend 6 Months Building Something Nobody Wants.
        </h2>

        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto">
          Receive your comprehensive viability analysis, competitor SWOT, and investor-ready report in minutes.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Describe your startup concept..."
            className="flex-1 bg-neutral-50 border-2 border-black rounded-xl px-4 py-3.5 text-sm text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-sm transition-all shadow-md shadow-yellow-400/25 flex items-center justify-center gap-2 shrink-0 border-2 border-black hover:scale-[1.02]"
          >
            <span>Validate Now (Free)</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-800 font-semibold pt-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black fill-yellow-400" />
            <span>Instant AI validation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-black fill-yellow-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black fill-yellow-400" />
            <span>100% Confidential analysis</span>
          </div>
        </div>

      </div>
    </section>
  );
};
