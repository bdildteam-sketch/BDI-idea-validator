import React, { FC } from "react";
import { PenLine, Building2, Terminal, Sparkles } from "lucide-react";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { Reveal, GlowLine } from "../AnimatedText";
import { motion } from "motion/react";

interface SlideProps {
  step: number;
}

export const SlideDefinitions2: FC<SlideProps> = ({ step }) => {
  const keywords = [
    { label: "Long-Term Value", gradient: "from-amber-500/10 to-amber-500/5", border: "border-amber-500/30 text-amber-700" },
    { label: "Relationships", gradient: "from-sky-500/10 to-sky-500/5", border: "border-sky-500/30 text-sky-700" },
    { label: "Sustainable Business", gradient: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/30 text-emerald-700" },
    { label: "Growth Opportunities", gradient: "from-rose-500/10 to-rose-500/5", border: "border-rose-500/30 text-rose-700" },
    { label: "Markets & Customers", gradient: "from-indigo-500/10 to-indigo-500/5", border: "border-indigo-500/30 text-indigo-700" },
    { label: "Strategic Value", gradient: "from-violet-500/10 to-violet-500/5", border: "border-violet-500/30 text-violet-700" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 max-w-5xl mx-auto select-none">
      
      {/* Label */}
      <Reveal show={step >= 1} from="top" className="mb-2">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/40">
          More Perspectives
        </span>
      </Reveal>

      {/* Title */}
      <Reveal show={step >= 2} from="bottom" className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900">
          Defining BD — <span className="text-primary italic">Part 2</span>
        </h2>
        <div className="w-40 mx-auto mt-4">
          <GlowLine delay={0.15} />
        </div>
      </Reveal>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
        
        {/* Scott Pollack Quote (Card 1) */}
        <Card3D show={step >= 3} className="bg-white/95 backdrop-blur-md p-8 flex flex-col justify-between border-slate-200/40">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <Icon3D
                icon={PenLine}
                gradient="from-rose-400 to-rose-600"
                shadowColor="rgba(244,117,117,0.25)"
                size="md"
              />
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-lg">Scott Pollack</h4>
                <p className="text-xs text-slate-400 font-sans tracking-wide">AUTHOR, "WHAT EXACTLY IS BD" / FORBES</p>
              </div>
            </div>
            
            {/* Visual quote block */}
            <div className="relative">
              <span className="absolute -top-6 -left-3 text-6xl font-serif text-slate-200 pointer-events-none select-none">“</span>
              <p className="text-slate-650 text-sm italic font-serif leading-relaxed relative z-10 pl-2">
                Business development is the creation of long-term value for an organization from customers, markets, and relationships.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs font-medium font-sans">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Approach</span>
            <span className="text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider text-[9px]">Value & Relationships Structure</span>
          </div>
        </Card3D>

        {/* Gartner Quote (Card 2) */}
        <Card3D show={step >= 4} className="bg-white/95 backdrop-blur-md p-8 flex flex-col justify-between border-slate-200/40">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <Icon3D
                icon={Building2}
                gradient="from-indigo-400 to-indigo-600"
                shadowColor="rgba(99, 102, 241, 0.25)"
                size="md"
              />
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-lg">Gartner</h4>
                <p className="text-xs text-slate-400 font-sans tracking-wide">GLOBAL ADVISORY & RESEARCH LEADERS</p>
              </div>
            </div>
            
            {/* Visual quote block */}
            <div className="relative">
              <span className="absolute -top-6 -left-3 text-6xl font-serif text-slate-200 pointer-events-none select-none">“</span>
              <p className="text-slate-650 text-sm italic font-serif leading-relaxed relative z-10 pl-2">
                Business development includes various activities and processes to build and implement growth opportunities to create a sustainable and profitable business.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs font-medium font-sans">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Approach</span>
            <span className="text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider text-[9px]">Processes & Sustainability</span>
          </div>
        </Card3D>

      </div>

      {/* Keywords Subsection */}
      <Reveal show={step >= 5} from="bottom" className="w-full flex flex-col items-center">
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 font-sans mb-4 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          The Core Overlapping Keywords
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
          {keywords.map((keyCircle, i) => (
            <motion.div
              key={keyCircle.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-2xl border bg-gradient-to-br ${keyCircle.gradient} ${keyCircle.border} text-xs font-semibold font-sans shadow-sm cursor-default hover:shadow-md transition-shadow`}
            >
              {keyCircle.label}
            </motion.div>
          ))}
        </div>
      </Reveal>

    </div>
  );
};
