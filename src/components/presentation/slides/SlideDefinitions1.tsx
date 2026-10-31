import React, { FC } from "react";
import { Reveal, GlowLine } from "../AnimatedText";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { Quote, BookOpen, Users, UserCheck, TrendingUp } from "lucide-react";

interface SlideProps {
  step: number;
}

const definitions = [
  { 
    author: "Hans Eibe", 
    role: "Author — Business Development: A Market-Oriented Perspective", 
    quote: "The tasks and processes concerning analytical preparation of potential growth opportunities, the support and monitoring of the implementation of growth opportunities.", 
    icon: BookOpen, 
    gradient: "linear-gradient(135deg, #d4a84b, #a06e1e)", 
    shadowColor: "rgba(212,168,75,0.45)", 
    accent: "from-amber-50 to-amber-100/40", 
    border: "border-amber-200/60" 
  },
  { 
    author: "Anna Kennedy", 
    role: "20+ Years of BD Experience", 
    quote: "The discipline required to achieve growth through the acquisition of profitable net new customers and expansion of existing customers.", 
    icon: Users, 
    gradient: "linear-gradient(135deg, #38bdf8, #0369a1)", 
    shadowColor: "rgba(56,189,248,0.45)", 
    accent: "from-sky-50 to-sky-100/40", 
    border: "border-sky-200/60" 
  },
];

export const SlideDefinitions1: FC<SlideProps> = ({ step = 0 }) => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 flex flex-col justify-center h-full select-none">
      <Reveal show={step >= 1} from="left">
        <p className="text-primary font-sans text-xs uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-primary/50" /> What the Experts Say
        </p>
      </Reveal>
      <Reveal show={step >= 2} from="bottom">
        <div className="mb-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-950">
            Defining <span className="text-primary">BD</span> — Part 1
          </h2>
        </div>
        <GlowLine />
      </Reveal>
      <div className="mt-8 space-y-5">
        {definitions.map((def, i) => (
          <Card3D 
            key={i} 
            show={step >= 3 + i} 
            intensity={12} 
            className={`bg-gradient-to-br ${def.accent} backdrop-blur-sm border ${def.border} rounded-2xl p-6 md:p-7 relative overflow-hidden`}
          >
            <div className="absolute -top-3 -right-2 pointer-events-none opacity-5">
              <Quote className="w-20 h-20 text-primary" />
            </div>
            <div className="relative z-10 flex gap-5">
              <div className="shrink-0">
                <Icon3D 
                  icon={def.icon} 
                  gradient={def.gradient} 
                  shadowColor={def.shadowColor} 
                  iconClass="text-white" 
                  size="sm" 
                />
              </div>
              <div className="flex-1">
                <p className="font-serif text-slate-800 text-sm md:text-base leading-relaxed italic mb-4 border-l-2 border-primary/30 pl-4">
                  "{def.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-sans font-bold text-slate-900 text-sm">{def.author}</p>
                    <p className="font-sans text-slate-500 text-xs">{def.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        ))}
      </div>
      <Reveal show={step >= 5} from="bottom">
        <div className="mt-6 flex items-center gap-3 bg-amber-50/80 border border-amber-200/50 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-primary shrink-0" />
          <p className="font-sans text-xs md:text-sm text-slate-700">
            Both definitions highlight <strong className="text-primary">growth opportunities</strong> as the core of Business Development.
          </p>
        </div>
      </Reveal>
    </div>
  );
};

export default SlideDefinitions1;
