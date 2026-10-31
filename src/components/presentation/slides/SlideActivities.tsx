import React, { FC } from "react";
import { motion } from "motion/react";
import { Reveal, GlowLine } from "../AnimatedText";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { LineChart, Crosshair, Network, Handshake, BarChart3, Globe } from "lucide-react";

interface SlideProps {
  step: number;
}

const activities = [
  { 
    icon: LineChart,  
    label: "Market Research",    
    sub: "Analyze trends & competitors",     
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", 
    shadowColor: "rgba(59,130,246,0.45)",  
    color: "from-blue-50 to-blue-100/40",     
    border: "border-blue-200/60" 
  },
  { 
    icon: Crosshair,  
    label: "Lead Generation",    
    sub: "Identify & qualify prospects",     
    gradient: "linear-gradient(135deg, #10b981, #059669)", 
    shadowColor: "rgba(16,185,129,0.45)",  
    color: "from-emerald-50 to-emerald-100/40", 
    border: "border-emerald-200/60" 
  },
  { 
    icon: Network,    
    label: "Networking",          
    sub: "Build powerful relationships",     
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", 
    shadowColor: "rgba(139,92,246,0.45)", 
    color: "from-violet-50 to-violet-100/40",  
    border: "border-violet-200/60" 
  },
  { 
    icon: Handshake,  
    label: "Partnership Mgmt",   
    sub: "Negotiate & manage alliances",     
    gradient: "linear-gradient(135deg, #f97316, #ea580c)", 
    shadowColor: "rgba(249,115,22,0.45)",  
    color: "from-orange-50 to-orange-100/40", 
    border: "border-orange-200/60" 
  },
  { 
    icon: BarChart3,  
    label: "Growth Strategy",    
    sub: "Plan & execute expansion",         
    gradient: "linear-gradient(135deg, #f43f5e, #e11d48)", 
    shadowColor: "rgba(244,63,94,0.45)",   
    color: "from-rose-50 to-rose-100/40",     
    border: "border-rose-200/60" 
  },
  { 
    icon: Globe,     
    label: "Market Expansion",   
    sub: "Enter new markets globally",       
    gradient: "linear-gradient(135deg, #d4a84b, #a06e1e)", 
    shadowColor: "rgba(212,168,75,0.45)",  
    color: "from-amber-50 to-amber-100/40",   
    border: "border-amber-200/60" 
  },
];

export const SlideActivities: FC<SlideProps> = ({ step = 0 }) => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 flex flex-col justify-center h-full select-none">
      <Reveal show={step >= 1} from="left">
        <p className="text-primary font-sans text-xs uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-primary/50" /> What BD Professionals Do
        </p>
      </Reveal>
      <Reveal show={step >= 2} from="bottom">
        <div className="mb-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-950">
            Key <span className="text-primary">Activities</span>
          </h2>
        </div>
        <GlowLine />
      </Reveal>
      <Reveal show={step >= 3} from="bottom">
        <p className="text-slate-600 font-sans text-sm md:text-base mt-4 mb-7 max-w-3xl leading-relaxed">
          Based on research with{" "}
          <motion.strong 
            animate={{ color: ["hsl(45,30%,35%)", "hsl(42,85%,42%)", "hsl(45,30%,35%)"] }} 
            transition={{ duration: 3, repeat: Infinity, delay: 1 }} 
            className="font-semibold"
          >
            200+ companies
          </motion.strong>{" "}
          — practical knowledge on what BD professionals are hired to do.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {activities.map((activity, i) => (
          <Card3D
            key={i}
            show={step >= 4 + Math.floor(i / 2)}
            intensity={18}
            className={`bg-gradient-to-br ${activity.color} backdrop-blur-sm border ${activity.border} rounded-2xl p-4 md:p-5 text-center h-full flex flex-col justify-between`}
          >
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-3">
                <Icon3D
                  icon={activity.icon}
                  gradient={activity.gradient}
                  shadowColor={activity.shadowColor}
                  iconClass="text-white"
                  size="sm"
                />
              </div>
              <p className="font-sans font-bold text-slate-900 text-xs md:text-sm">
                {activity.label}
              </p>
              <p className="font-sans text-slate-500 text-xs mt-1 leading-snug">
                {activity.sub}
              </p>
            </div>
          </Card3D>
        ))}
      </div>
      <Reveal show={step >= 8} from="bottom">
        <p className="text-slate-400 font-sans text-xs mt-6 text-center italic">
          All topics covered from a <strong className="text-slate-500">practical</strong>, not theoretical, perspective.
        </p>
      </Reveal>
    </div>
  );
};

export default SlideActivities;
