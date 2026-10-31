import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lightbulb, FileDown } from "lucide-react";

interface Props {
  onValidateIdea: (prompt?: string, industry?: string) => void;
  onSelectSampleReport?: (id: string) => void;
}

export const FocusedLandingSection: React.FC<Props> = ({
  onValidateIdea,
}) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      onValidateIdea("AI automated contract reviewer for small businesses");
    } else {
      onValidateIdea(prompt.trim());
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto text-center space-y-8 relative z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black uppercase tracking-wider shadow-sm">
          <Sparkles className="w-4 h-4 text-black fill-yellow-400" />
          <span>Stop Guessing • Test Your Idea Before Building</span>
        </div>

        {/* The Exact Requested Main Headline */}
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Don't Spend 6 Months Building Something Nobody Wants.
        </h1>

        {/* Plain-English Grandfather-Friendly Subtitle */}
        <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          Find out if real people will buy your product before you write code or spend your savings.
          Get an instant, plain-English validation report that anyone can understand — even your grandfather.
        </p>

        {/* Big Interactive Idea Input Form */}
        <div className="max-w-2xl mx-auto bg-neutral-50 p-4 sm:p-5 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your startup or app idea in plain words..."
              className="flex-1 bg-white border-2 border-black rounded-xl px-4 py-4 text-base text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
            />

            <button
              type="submit"
              className="py-4 px-7 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-base transition-all flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 shrink-0 cursor-pointer"
            >
              <span>Validate Idea (Free)</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </form>

          {/* Quick Explanation */}
          <p className="text-xs text-neutral-600 pt-1 flex items-center justify-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-600" />
            <span>Tip: Enter any simple sentence like: "A subscription box for organic puppy food"</span>
          </p>
        </div>

        {/* 3 Reassurance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-800 font-bold pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-black fill-yellow-400 shrink-0" />
            <span>100% Free idea check</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black fill-yellow-400 shrink-0" />
            <span>Plain English (No business jargon)</span>
          </div>
          <div className="flex items-center gap-2">
            <FileDown className="w-4 h-4 text-black fill-yellow-400 shrink-0" />
            <span>Downloadable PDF report</span>
          </div>
        </div>
      </div>
    </div>
  );
};
