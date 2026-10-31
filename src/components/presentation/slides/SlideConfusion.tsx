import React, { FC } from "react";
import { motion } from "motion/react";
import { Reveal, GlowLine } from "../AnimatedText";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { HelpCircle, Search, BookMarked, Users as Users2 } from "lucide-react";

interface SlideProps {
  step: number;
}

const sources = [
  {
    icon: Search,
    label: "Online Search",
    sub: "Dozens of conflicting definitions",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    shadowColor: "rgba(59,130,246,0.45)",
    color: "from-blue-50 to-blue-100/40",
    border: "border-blue-200/60",
  },
  {
    icon: BookMarked,
    label: "Books & Literature",
    sub: "Academic vs practitioner views",
    gradient: "linear-gradient(135deg, #10b981, #065f46)",
    shadowColor: "rgba(16,185,129,0.45)",
    color: "from-emerald-50 to-emerald-100/40",
    border: "border-emerald-200/60",
  },
  {
    icon: Users2,
    label: "Industry Experts",
    sub: "Each expert has their own lens",
    gradient: "linear-gradient(135deg, #8b5cf6, #4c1d95)",
    shadowColor: "rgba(139,92,246,0.45)",
    color: "from-violet-50 to-violet-100/40",
    border: "border-violet-200/60",
  },
];

export const SlideConfusion: FC<SlideProps> = ({ step = 0 }) => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 flex flex-col justify-center h-full select-none">
      <Reveal show={step >= 1} from="left">
        <p className="text-primary font-sans text-xs uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-primary/50" /> The Challenge
        </p>
      </Reveal>
      <Reveal show={step >= 2} from="bottom">
        <div className="mb-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-950">
            A World of <span className="text-primary">Confusion</span>
          </h2>
        </div>
        <GlowLine />
      </Reveal>
      <Reveal show={step >= 3} from="bottom">
        <p className="text-slate-600 font-sans text-base md:text-lg mt-5 mb-8 max-w-3xl leading-relaxed">
          Try to find a definition for Business Development — whether online, in books, or by asking people in the field — and you will encounter a great deal of{" "}
          <strong className="text-slate-900/80 font-semibold">varying perspectives</strong>.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
        {sources.map((source, i) => (
          <Card3D
            key={source.label}
            show={step >= 4 + i}
            intensity={18}
            className={`bg-gradient-to-br ${source.color} backdrop-blur-sm border ${source.border} rounded-2xl p-6 text-center h-full flex flex-col justify-between`}
          >
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-4">
                <Icon3D
                  icon={source.icon}
                  gradient={source.gradient}
                  shadowColor={source.shadowColor}
                  iconClass="text-white"
                  size="md"
                />
              </div>
              <p className="font-sans text-slate-900 font-semibold text-sm md:text-base">
                {source.label}
              </p>
              <p className="font-sans text-slate-500 text-xs mt-1 leading-relaxed">
                {source.sub}
              </p>
            </div>
          </Card3D>
        ))}
      </div>
      <Reveal show={step >= 7} from="right">
        <motion.div
          whileHover={{ x: 4, boxShadow: "0 4px 24px rgba(212,168,75,0.15)" }}
          className="flex items-center gap-3 bg-amber-50/80 border border-amber-200/60 rounded-xl p-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <HelpCircle className="w-6 h-6 text-primary shrink-0" />
          </motion.div>
          <p className="font-sans text-sm md:text-base text-slate-700">
            The field of BD is relatively new — people view it through the lens of their own discipline.
          </p>
        </motion.div>
      </Reveal>
    </div>
  );
};

export default SlideConfusion;
