import React, { FC } from "react";
import { motion } from "motion/react";
import { Reveal, GlowLine } from "../AnimatedText";
import { Icon3D } from "../Icon3D";
import { Award, ArrowRight, BookOpen, TrendingUp, Users as Users2, Sparkles } from "lucide-react";

interface SlideProps {
  step: number;
}

const features = [
  { icon: BookOpen,   text: "Practical, Real-World Content",  gradient: "linear-gradient(135deg, #d4a84b, #a06e1e)", shadowColor: "rgba(212,168,75,0.4)" },
  { icon: TrendingUp, text: "Proven Growth Frameworks",       gradient: "linear-gradient(135deg, #10b981, #059669)", shadowColor: "rgba(16,185,129,0.4)" },
  { icon: Users2,     text: "Based on 200+ Companies",        gradient: "linear-gradient(135deg, #6366f1, #4338ca)", shadowColor: "rgba(99,102,241,0.4)" },
];

export const SlideCTA: FC<SlideProps> = ({ step = 0 }) => {
  return (
    <div className="max-w-4xl mx-auto text-center w-full px-4 flex flex-col justify-center h-full select-none">
      <Reveal show={step >= 1} from="scale">
        <div className="relative inline-flex items-center justify-center mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 rounded-full border border-dashed border-primary/25" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-24 h-24 rounded-full border border-primary/12" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary" style={{ boxShadow: "0 0 10px rgba(212,168,75,0.8)" }} />
          </motion.div>
          <Icon3D icon={Award} gradient="linear-gradient(135deg, #d4a84b, #a06e1e)" shadowColor="rgba(212,168,75,0.45)" iconClass="text-amber-50" size="md" />
        </div>
      </Reveal>
      <Reveal show={step >= 2} from="bottom">
        <div className="mb-4">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-slate-950">
            Stay <span className="text-primary">Tuned</span>!
          </h2>
        </div>
        <GlowLine />
      </Reveal>
      <Reveal show={step >= 3} from="bottom">
        <p className="text-slate-600 font-sans text-base md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          This is just the beginning. In upcoming lessons, we'll dive deep into every aspect of Business Development with <strong className="text-slate-900/80 font-semibold">practical, real-world knowledge</strong>.
        </p>
      </Reveal>
      <Reveal show={step >= 4} from="bottom">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20, scale: 0.85 }} 
              animate={step >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.85 }} 
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.05, boxShadow: "0 8px 30px rgba(212,168,75,0.15)" }}
              className="flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-sm border border-amber-200/50 rounded-2xl"
              style={{ boxShadow: "0 4px 16px rgba(212,168,75,0.07)" }}
            >
              <Icon3D icon={f.icon} gradient={f.gradient} shadowColor={f.shadowColor} iconClass="text-white" size="sm" />
              <span className="font-sans text-slate-705 text-xs md:text-sm font-medium">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
      <Reveal show={step >= 5} from="bottom">
        <motion.div 
          whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(212,168,75,0.35)" }} 
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full font-sans font-semibold text-base md:text-lg text-white cursor-default relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(42,85%,55%), hsl(42,85%,44%))", boxShadow: "0 10px 40px rgba(212,168,75,0.28)" }}
        >
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Your BD Journey Starts Here</span>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight className="w-5 h-5" /></motion.div>
        </motion.div>
        <p className="text-slate-400 font-sans text-xs mt-8 tracking-widest uppercase">Powered by BDI — Business Development Institute</p>
      </Reveal>
    </div>
  );
};

export default SlideCTA;
