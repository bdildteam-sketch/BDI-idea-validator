import React, { FC } from "react";
import { Database, Link2, Target, Sparkles, TrendingUp } from "lucide-react";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { Reveal, GlowLine } from "../AnimatedText";
import { motion } from "motion/react";

interface SlideProps {
  step: number;
}

export const SlideBDIDefinition: FC<SlideProps> = ({ step }) => {
  // Phrase words list for word-by-word subtle highlights
  const words = [
    { text: "Driving", highlight: false },
    { text: "Growth", highlight: true },
    { text: "using", highlight: false },
    { text: "the", highlight: false },
    { text: "power", highlight: false },
    { text: "of", highlight: false },
    { text: "Information", highlight: true, color: "text-amber-500" },
    { text: "and", highlight: false },
    { text: "Connections", highlight: true, color: "text-sky-500" },
    { text: "to", highlight: false },
    { text: "Explore,", highlight: true, color: "text-primary font-bold" },
    { text: "Create,", highlight: true, color: "text-primary font-bold" },
    { text: "and", highlight: false },
    { text: "Grab", highlight: true, color: "text-primary font-bold" },
    { text: "Opportunities", highlight: true, color: "text-emerald-500 font-extrabold" },
    { text: "for", highlight: false },
    { text: "Growth.", highlight: true },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 max-w-5xl mx-auto select-none">
      
      {/* Label */}
      <Reveal show={step >= 1} from="top" className="mb-2">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/40">
          Our Perspective
        </span>
      </Reveal>

      {/* Title */}
      <Reveal show={step >= 2} from="bottom" className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900">
          The BDI <span className="text-primary italic">Definition</span>
        </h2>
        <div className="w-36 mx-auto mt-4">
          <GlowLine delay={0.155} />
        </div>
      </Reveal>

      {/* Large definition card - step >= 3 */}
      <div className="w-full max-w-4xl mb-8">
        <Card3D show={step >= 3} className="bg-white/95 backdrop-blur-md p-8 border border-primary/20 shadow-xl shadow-amber-50/20 relative" delay={0}>
          
          {/* Sparkly corner accents */}
          <Sparkles className="absolute top-4 left-4 w-4 h-4 text-primary/40 animate-pulse" />
          <Sparkles className="absolute bottom-4 right-4 w-5 h-5 text-primary/30 animate-pulse" />

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            
            {/* Dashed Orbit around TrendingUp Icon3D */}
            <div className="relative flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full border-2 border-dashed border-primary/30"
              />
              <Icon3D
                icon={TrendingUp}
                gradient="from-amber-400 to-amber-600"
                shadowColor="rgba(212,168,75,0.3)"
                size="md"
              />
            </div>

            {/* Structured words row */}
            <div className="text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2 block">The Core Creed</span>
              <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-805">
                {words.map((w, index) => {
                  if (w.highlight) {
                    return (
                      <span key={index} className={`inline-block mx-1 ${w.color || 'text-primary'}`}>
                        {w.text}
                      </span>
                    );
                  }
                  return <span key={index} className="inline-block mx-1 text-slate-700">{w.text}</span>;
                })}
              </p>
            </div>

          </div>
        </Card3D>
      </div>

      {/* Pillar Cards - step >= 4, 5, 6 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        
        {/* Pillar 1: Information */}
        <Card3D show={step >= 4} className="bg-slate-50/80 p-5 border border-slate-200/40 hover:border-amber-400/30" delay={0}>
          <div className="flex items-center gap-3.5 mb-3">
            <Icon3D
              icon={Database}
              gradient="from-amber-400 to-amber-500"
              shadowColor="rgba(245, 158, 11, 0.15)"
              size="sm"
            />
            <h4 className="font-serif font-bold text-slate-900 text-[15px]">1. Information</h4>
          </div>
          <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed">
            Market Research & scoping. Finding target customers, studying competitors, and identifying gaps.
          </p>
        </Card3D>

        {/* Pillar 2: Connections */}
        <Card3D show={step >= 5} className="bg-slate-50/80 p-5 border border-slate-200/40 hover:border-sky-400/30" delay={0.1}>
          <div className="flex items-center gap-3.5 mb-3">
            <Icon3D
              icon={Link2}
              gradient="from-sky-400 to-sky-500"
              shadowColor="rgba(56, 189, 248, 0.15)"
              size="sm"
            />
            <h4 className="font-serif font-bold text-slate-900 text-[15px]">2. Connections</h4>
          </div>
          <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed">
            Relationships, lead generation, and key stakeholder mapping across strategic organizational accounts.
          </p>
        </Card3D>

        {/* Pillar 3: Opportunities */}
        <Card3D show={step >= 6} className="bg-slate-50/80 p-5 border border-slate-200/40 hover:border-emerald-400/30" delay={0.2}>
          <div className="flex items-center gap-3.5 mb-3">
            <Icon3D
              icon={Target}
              gradient="from-emerald-400 to-emerald-500"
              shadowColor="rgba(16, 185, 129, 0.15)"
              size="sm"
            />
            <h4 className="font-serif font-bold text-slate-900 text-[15px]">3. Opportunities</h4>
          </div>
          <p className="text-slate-550 text-xs md:text-[13px] leading-relaxed">
            The final prize: long-term, scalable, win-win business partnerships that generate high-quality growth.
          </p>
        </Card3D>

      </div>

    </div>
  );
};
