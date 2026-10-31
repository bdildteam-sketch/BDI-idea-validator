import React, { FC } from "react";
import { Reveal, GlowLine } from "../AnimatedText";
import { Card3D } from "../Card3D";
import { Icon3D } from "../Icon3D";
import { Clock, GitMerge, Building2, ArrowLeftRight } from "lucide-react";

interface SlideProps {
  step: number;
}

const reasons = [
  {
    icon: Clock,
    title: "Relatively New Field",
    desc: "BD as a discipline is still evolving and hasn't had time to consolidate a single, universally accepted definition.",
    num: "01",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    shadowColor: "rgba(245,158,11,0.45)",
    color: "from-amber-50 to-amber-100/40",
    border: "border-amber-200/60",
  },
  {
    icon: GitMerge,
    title: "Overlapping Activities",
    desc: "BD activities heavily overlap with Sales, Marketing, Strategy, and other business functions.",
    num: "02",
    gradient: "linear-gradient(135deg, #38bdf8, #0284c7)",
    shadowColor: "rgba(56,189,248,0.45)",
    color: "from-sky-50 to-sky-100/40",
    border: "border-sky-200/60",
  },
  {
    icon: Building2,
    title: "Context-Dependent",
    desc: "BD objectives and scope change drastically depending on whether it's a Startup, SME, or large Corporate.",
    num: "03",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    shadowColor: "rgba(16,185,129,0.45)",
    color: "from-emerald-50 to-emerald-100/40",
    border: "border-emerald-200/60",
  },
  {
    icon: ArrowLeftRight,
    title: "Confused with Consulting",
    desc: "Many confuse BD with Business Consulting — both help businesses grow, but through fundamentally different approaches.",
    num: "04",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    shadowColor: "rgba(139,92,246,0.45)",
    color: "from-violet-50 to-violet-100/40",
    border: "border-violet-200/60",
  },
];

export const SlideReasons: FC<SlideProps> = ({ step = 0 }) => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 flex flex-col justify-center h-full select-none">
      <Reveal show={step >= 1} from="left">
        <p className="text-primary font-sans text-xs uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-primary/50" /> Understanding the Gap
        </p>
      </Reveal>
      <Reveal show={step >= 2} from="bottom">
        <div className="mb-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-950">
            Why the <span className="text-primary">Confusion</span>?
          </h2>
        </div>
        <GlowLine />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {reasons.map((reason, i) => (
          <Card3D
            key={i}
            show={step >= 3 + i}
            intensity={16}
            className={`bg-gradient-to-br ${reason.color} backdrop-blur-sm border ${reason.border} rounded-2xl p-5 md:p-6 group relative`}
          >
            <div className="absolute top-4 right-5 text-5xl font-serif font-bold text-slate-950/5 group-hover:text-slate-950/10 transition-colors pointer-events-none select-none">
              {reason.num}
            </div>
            <div className="relative z-10 flex items-start gap-4">
              <Icon3D
                icon={reason.icon}
                gradient={reason.gradient}
                shadowColor={reason.shadowColor}
                iconClass="text-white"
                size="sm"
              />
              <div className="flex-1">
                <h3 className="font-sans font-bold text-slate-900 text-base md:text-lg mb-1">
                  {reason.title}
                </h3>
                <p className="font-sans text-slate-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};

export default SlideReasons;
