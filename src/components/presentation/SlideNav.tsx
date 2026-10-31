import React, { FC } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavProps {
  currentSlide?: number;
  current?: number;
  totalSlides?: number;
  total?: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo?: (idx: number) => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export const SlideNav: FC<SlideNavProps> = ({
  currentSlide,
  current,
  totalSlides,
  total,
  onPrev,
  onNext,
  onGoTo,
}) => {
  const activeCurrent = current !== undefined ? current : (currentSlide !== undefined ? currentSlide : 0);
  const activeTotal = total !== undefined ? total : (totalSlides !== undefined ? totalSlides : 1);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
      <div className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl shadow-slate-200/50">
        
        {/* Previous Button */}
        <motion.button
          onClick={onPrev}
          disabled={activeCurrent === 0}
          whileHover={{ scale: activeCurrent === 0 ? 1 : 1.1 }}
          whileTap={{ scale: activeCurrent === 0 ? 1 : 0.95 }}
          className={`p-2 rounded-full border bg-white/70 shadow-sm transition-all duration-300 flex items-center justify-center text-slate-700 hover:text-primary ${
            activeCurrent === 0
              ? "opacity-30 border-slate-200/50 cursor-not-allowed"
              : "opacity-100 border-primary/20 hover:border-primary/50 cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Indicators Row */}
        <div className="flex items-center gap-2 px-1">
          {Array.from({ length: activeTotal }).map((_, idx) => {
            const isActive = activeCurrent === idx;
            return (
              <motion.button
                key={idx}
                onClick={() => onGoTo?.(idx)}
                className="relative h-2 rounded-full overflow-hidden cursor-pointer"
                animate={{
                  width: isActive ? 24 : 8,
                  backgroundColor: isActive ? "rgba(212, 168, 75, 1)" : "rgba(100, 116, 139, 0.25)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: isActive ? "rgba(212, 168, 75, 1)" : "rgba(100, 116, 139, 0.45)",
                }}
              >
                {/* Glow ring inside dot */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          disabled={activeCurrent === activeTotal - 1}
          whileHover={{ scale: activeCurrent === activeTotal - 1 ? 1 : 1.1 }}
          whileTap={{ scale: activeCurrent === activeTotal - 1 ? 1 : 0.95 }}
          className={`p-2 rounded-full border bg-white/70 shadow-sm transition-all duration-300 flex items-center justify-center text-slate-700 hover:text-primary ${
            activeCurrent === activeTotal - 1
              ? "opacity-30 border-slate-200/50 cursor-not-allowed"
              : "opacity-100 border-primary/20 hover:border-primary/50 cursor-pointer"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        
      </div>
    </div>
  );
};

export default SlideNav;
