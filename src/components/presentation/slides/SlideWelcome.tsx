import React, { FC } from "react";
import { motion } from "motion/react";
import { TrendingUp, Lightbulb } from "lucide-react";
import { Icon3D } from "../Icon3D";
import { Reveal } from "../AnimatedText";

interface SlideProps {
  step: number;
}

export const SlideWelcome: FC<SlideProps> = ({ step }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto select-none">
      
      {/* Central Icon3D Block with surrounding orbiting rings and dots */}
      <Reveal show={step >= 1} from="scale" className="relative mb-6 flex justify-center items-center">
        {/* Animated Rings Group */}
        <div className="absolute w-44 h-44 border border-primary/25 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-52 h-52 border border-slate-300/30 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        
        {/* Custom orbiting ring with a physical dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute w-36 h-36 rounded-full border border-dashed border-primary/40 flex items-center justify-start"
        >
          <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_#d4a84b] -ml-1.5" />
        </motion.div>

        {/* Core physical 3D icon */}
        <div className="relative z-10 scale-125">
          <Icon3D icon={TrendingUp} size="lg" gradient="from-amber-400 to-amber-600" />
        </div>
      </Reveal>

      {/* Course Label and Decorative Lines */}
      <Reveal show={step >= 2} from="bottom" className="mb-4">
        <div className="flex items-center justify-center gap-4">
          <div 
            className="h-[1.2px] w-12 md:w-24 shrink-0" 
            style={{ 
              background: "linear-gradient(to right, transparent, rgba(212,168,75,0.6) 80%)" 
            }} 
          />
          <span className="text-[11px] md:text-[12px] uppercase tracking-[0.35em] font-bold text-amber-500/90 font-sans">
            Course 01 — The Journey Begins
          </span>
          <div 
            className="h-[1.2px] w-12 md:w-24 shrink-0" 
            style={{ 
              background: "linear-gradient(to left, transparent, rgba(212,168,75,0.6) 80%)" 
            }} 
          />
        </div>
      </Reveal>

      {/* Main Title paired with Gold Highlighting */}
      <Reveal show={step >= 3} from="bottom" className="w-full flex flex-col items-center">
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-serif font-bold tracking-tight text-slate-950 leading-[1.08] mb-1">
          What is
        </h1>
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-serif font-bold tracking-tight text-primary leading-[1.08]">
          Business Development?
        </h1>
      </Reveal>

      {/* Elegantly styled line with floating Lightbulb badge on the right */}
      <Reveal show={step >= 3} from="bottom" className="w-full max-w-4xl px-4">
        <div className="relative w-full h-[2px] flex items-center justify-center my-8">
          {/* Main dividing line */}
          <div 
            className="w-full h-[1.5px]" 
            style={{ 
              background: "linear-gradient(to right, transparent, rgba(212,168,75,0.45) 20%, rgba(212,168,75,0.45) 80%, transparent)" 
            }} 
          />
          
          {/* Floating glass/3D bubble with a lightbulb on the right */}
          <div className="absolute right-[12%] md:right-[20%] -translate-y-1/2 top-1/2 z-20">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-10 h-10 rounded-full border border-amber-500/25 shadow-lg shadow-amber-500/10"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(245, 158, 11, 0.1) 70%)",
                boxShadow: "0 8px 24px rgba(212, 168, 75, 0.25), inset 0 0 8px rgba(255, 255, 255, 0.6)",
              }}
            >
              {/* Surrounding thin orbiting ring */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-amber-500/20 animate-[spin_10s_linear_infinite]" />
              {/* Pulsing lightbulb icon */}
              <Lightbulb className="w-4.5 h-4.5 text-amber-600 animate-pulse drop-shadow-[0_0_4px_rgba(212,168,75,0.6)]" />
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* Description Body & Interaction Prompt */}
      <Reveal show={step >= 4} from="bottom" className="max-w-2xl px-4 mt-2">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed leading-extra-relaxed font-sans mb-8 max-w-xl mx-auto">
          Welcome to the first course in our journey! Let's address a rather perplexing question that many professionals struggle to answer.
        </p>
        
        {/* Interaction Prompt styled beautifully */}
        <motion.div
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-400 font-sans text-[12.5px] tracking-widest uppercase flex items-center justify-center gap-1 cursor-default select-none mt-2"
        >
          <span>Click or press → to continue</span>
          <span className="text-primary font-bold ml-1 animate-[bounce_1.5s_infinite]">&gt;</span>
        </motion.div>
      </Reveal>

    </div>
  );
};

export default SlideWelcome;
