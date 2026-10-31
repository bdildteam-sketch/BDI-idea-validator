import React from "react";
import { MessageSquare, Cpu, CheckCircle, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export const HowItWorksSection: React.FC<{ onStartValidation: () => void }> = ({ onStartValidation }) => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Describe Your Idea in Plain English",
      description: "Enter a one-sentence pitch, product description, or paste a link to an existing landing page. No business plan or pitch deck required.",
      accent: "from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30"
    },
    {
      number: "02",
      icon: Cpu,
      title: "Multi-Model AI Cross-Validation",
      description: "Our ensemble of Claude 3.5 Sonnet, GPT-4o, and Gemini cross-references live authoritative market databases, competitor pricing, and market sizing algorithms.",
      accent: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30"
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Get Evidence-Backed Verdict & Strategy",
      description: "Receive an evidence-backed viability analysis, competitor SWOT map, financial projections, and clear strategic verdict to move forward with certainty.",
      accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black uppercase tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 text-black" />
            <span>Structured Process</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
            How BDI Validator Works
          </h2>
          <p className="text-base sm:text-lg text-neutral-700">
            From raw concept to institutional-grade clarity.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-neutral-50 border-2 border-black p-8 space-y-5 hover:border-black transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black border-2 border-black flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display font-extrabold text-2xl text-neutral-400 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-black">
                    {step.title}
                  </h3>

                  <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center gap-2 text-xs font-bold text-black">
                  <Sparkles className="w-3.5 h-3.5 text-black fill-yellow-400" />
                  <span>Real-time multi-model synthesis</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-yellow-100 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-extrabold text-lg text-black">Ready to test your startup hypothesis?</h4>
            <p className="text-xs sm:text-sm text-neutral-800 font-medium">Instant startup analysis. No credit card required.</p>
          </div>
          <button
            onClick={onStartValidation}
            className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-xs transition-all shadow-md shadow-yellow-400/25 flex items-center gap-2 shrink-0 border-2 border-black hover:scale-[1.02]"
          >
            <span>Start Free Validation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </section>
  );
};
