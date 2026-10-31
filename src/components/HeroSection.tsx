import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onValidateIdea: (prompt: string, industry: string) => void;
  onSelectSampleReport: (reportId: string) => void;
}

const QUICK_PROMPTS = [
  {
    title: "AI Voice Receptionist for Dental Clinics",
    industry: "HealthTech / AI Agents",
    shortText: "24/7 autonomous phone scheduling & insurance verification for dental practices.",
    score: 82
  },
  {
    title: "DocuCraft AI: Instant Code-to-Docs Engine",
    industry: "Developer Tools",
    shortText: "Zero-effort API documentation & interactive playgrounds synced directly with GitHub repos.",
    score: 70
  },
  {
    title: "OmniClip AI: Short-Form Video Engine",
    industry: "Creator Economy",
    shortText: "Turn 60-min podcast episodes into viral 9:16 vertical clips with dynamic kinetic captions.",
    score: 74
  },
  {
    title: "ClarityAI: B2B Enterprise SaaS Contract Auditor",
    industry: "FinTech / Legal",
    shortText: "Scans enterprise vendor contracts to uncover hidden auto-renewal traps & price escalation fees.",
    score: 83
  }
];

const INDUSTRIES = [
  "B2B SaaS",
  "AI & Automation",
  "Developer Tools",
  "FinTech",
  "Creator Economy",
  "Health & Wellness",
  "E-Commerce"
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onValidateIdea, onSelectSampleReport }) => {
  const [ideaInput, setIdeaInput] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("B2B SaaS");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim().length > 0) {
      onValidateIdea(ideaInput.trim(), selectedIndustry);
    } else {
      // Use fallback default
      onValidateIdea("AI-powered customer churn predictor for Shopify subscription brands", selectedIndustry);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-white">
      {/* Background Atmospheric Warm Yellow Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-tr from-yellow-300/30 via-yellow-200/25 to-amber-200/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-400 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">Multi-Model AI Engine</span>
            <span className="text-black/30">|</span>
            <span className="text-xs font-semibold text-neutral-800">Claude 3.5 Sonnet + GPT-4o + Live Web Signals</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-black leading-[1.1]">
            Validate Your Startup Idea with{" "}
            <span className="relative inline-block px-3 py-1 mx-1 rounded-xl bg-yellow-400 text-black font-extrabold shadow-sm -rotate-1 border-2 border-black">
              Institutional AI
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop guessing and build with conviction. Synthesize real-world market telemetry, uncover hidden competitors with SWOT maps, calculate TAM/SAM/SOM, and get an investor-ready validation verdict.
          </p>
        </div>

        {/* Core Interactive Validation Box */}
        <div className="mt-10 sm:mt-12 max-w-3xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-yellow-400/40 via-yellow-200/30 to-transparent shadow-xl">
            <div className="rounded-[15px] bg-white border-2 border-black p-5 sm:p-7 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="startup-idea-input" className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-black fill-yellow-400" />
                    <span>Enter Your Startup Concept or Target Problem</span>
                  </label>
                  <span className="text-xs text-black font-bold font-mono px-2 py-0.5 rounded bg-yellow-100 border border-yellow-300">Instant AI Analysis</span>
                </div>

                <div className="relative">
                  <textarea
                    id="startup-idea-input"
                    rows={3}
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                    placeholder="e.g. An AI-powered contract auditor for B2B tech companies that flags unexpected price hikes and renewal deadlines before finance teams get locked in..."
                    className="w-full bg-neutral-50 text-black placeholder-neutral-400 rounded-xl px-4 py-3 text-sm sm:text-base border-2 border-neutral-200 focus:border-black focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all resize-none font-medium"
                  />
                </div>

                {/* Industry Selector Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-neutral-700 font-bold mr-1">Industry:</span>
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setSelectedIndustry(ind)}
                      className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                        selectedIndustry === ind
                          ? "bg-yellow-400 text-black shadow-sm border-2 border-black"
                          : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-black fill-yellow-400" />
                      <span>No credit card needed</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-black fill-yellow-400" />
                      <span>100% Confidential</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="hero-analyze-button"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-sm shadow-md shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 border-2 border-black"
                  >
                    <Sparkles className="w-4 h-4 text-black fill-yellow-200" />
                    <span>Run AI Validation</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Clickable Real Idea Examples */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Or explore live validation reports:
              </span>
              <span className="text-xs font-bold text-black hover:underline cursor-pointer flex items-center gap-0.5" onClick={() => onSelectSampleReport("doc-builder")}>
                View all reports <ChevronRight className="w-3.5 h-3.5 text-black" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {QUICK_PROMPTS.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIdeaInput(item.shortText);
                    setSelectedIndustry(item.industry.split("/")[0].trim());
                  }}
                  className="group p-3 rounded-xl bg-white hover:bg-yellow-50 border-2 border-neutral-200 hover:border-black cursor-pointer transition-all duration-200 flex items-start justify-between gap-3 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-black group-hover:text-neutral-900 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-100 text-black font-semibold border border-yellow-300">
                        {item.industry}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-1">
                      {item.shortText}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">Score</span>
                    <span className="text-xs font-extrabold text-black bg-yellow-400 px-1.5 py-0.5 rounded border border-black/15 font-mono">
                      {item.score}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
