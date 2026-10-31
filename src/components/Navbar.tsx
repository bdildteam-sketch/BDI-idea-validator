import React from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onStartValidation: (initialPrompt?: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartValidation, onOpenAuth }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md border-2 border-black group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-black">BDI Validator</span>
            </div>
            <span className="text-[11px] text-neutral-600 font-bold tracking-wide">Plain English Idea Verification</span>
          </div>
        </div>

        {/* Right CTA / Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-black px-3 py-2 transition-colors"
            id="login-button"
          >
            Sign in
          </button>

          <button
            onClick={() => onStartValidation()}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-black bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
            id="header-validate-cta"
          >
            <Sparkles className="w-4 h-4 text-black fill-yellow-400" />
            <span>Test Your Idea (Free)</span>
            <ArrowRight className="w-3.5 h-3.5 text-black stroke-[3]" />
          </button>
        </div>
      </div>
    </header>
  );
};
