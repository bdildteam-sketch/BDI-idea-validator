import React from "react";
import { ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC<{ onStartValidation: () => void }> = ({ onStartValidation }) => {
  return (
    <footer className="border-t-2 border-black bg-white text-neutral-700 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 border-2 border-black flex items-center justify-center text-black shadow-xs">
            <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display font-black text-base text-black block">BDI Validator</span>
            <span className="text-[11px] text-neutral-600 font-medium">Plain English Idea Verification</span>
          </div>
        </div>

        {/* Reassurance */}
        <p className="text-neutral-600 text-xs text-center max-w-md">
          Don't spend 6 months building something nobody wants. Validate first with real data and plain numbers.
        </p>

        {/* Quick CTA */}
        <button
          onClick={onStartValidation}
          className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Validate Idea (Free)
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
        <div>© {new Date().getFullYear()} BDI Validator. All rights reserved. Confidential & Private.</div>
        <div>Support: bdildteam@gmail.com</div>
      </div>
    </footer>
  );
};
