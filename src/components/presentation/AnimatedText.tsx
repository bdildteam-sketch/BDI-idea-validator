import React, { FC, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Standard presentation easing - faster, ultra-smooth premium curve
const EASE_PREMIUM = [0.19, 1, 0.22, 1];

interface BaseAnimProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

// FadeUp: opacity + y + blur entrance
export const FadeUp: FC<BaseAnimProps> = ({
  children,
  delay = 0,
  className = "",
  duration = 0.42,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ScaleIn: scale + opacity + blur entrance
export const ScaleIn: FC<BaseAnimProps> = ({
  children,
  delay = 0,
  className = "",
  duration = 0.42,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// SlideFromLeft: x translate + opacity + blur
export const SlideFromLeft: FC<BaseAnimProps> = ({
  children,
  delay = 0,
  className = "",
  duration = 0.42,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -35, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// SlideFromRight: x translate + opacity + blur
export const SlideFromRight: FC<BaseAnimProps> = ({
  children,
  delay = 0,
  className = "",
  duration = 0.42,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// RevealLine: overflow-hidden clip reveal
export const RevealLine: FC<BaseAnimProps> = ({
  children,
  delay = 0,
  className = "",
  duration = 0.48,
}) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={{ y: "102%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration, delay, ease: EASE_PREMIUM }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// StaggerContainer/StaggerItem for staggering items
export const StaggerContainer: FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05, // Faster staggering delay
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15, filter: "blur(3px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.38, ease: EASE_PREMIUM },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// GlowLine: animated scaleX gradient line (primary color)
export const GlowLine: FC<{ className?: string; delay?: number }> = ({
  className = "",
  delay = 0.15,
}) => {
  return (
    <div className={`relative h-[2px] w-full bg-slate-200/40 rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE_PREMIUM }}
        className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-amber-400 via-primary to-amber-600 shadow-[0_0_8px_rgba(212,168,75,0.4)]"
      />
    </div>
  );
};

// CountUp: number animation with rAF
interface CountUpProps {
  end: number;
  duration?: number; // in ms
  delay?: number; // in seconds
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountUp: FC<CountUpProps> = ({
  end,
  duration = 1500,
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutExpo/Quart-ish
      const easeVal = 1 - Math.pow(1 - progressPercentage, 3);
      const currentVal = Math.floor(easeVal * end);
      
      setCount(currentVal);
      countRef.current = currentVal;

      if (progress < duration) {
        timerRef.current = requestAnimationFrame(step);
      }
    };

    const delayTimer = setTimeout(() => {
      timerRef.current = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(delayTimer);
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [end, duration, delay]);

  return <span className={className}>{prefix}{count}{suffix}</span>;
};

// Reveal: step-based show/hide (CRITICAL for PowerPoint animations)
interface RevealProps {
  show: boolean;
  from?: "bottom" | "top" | "left" | "right" | "scale";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const Reveal: FC<RevealProps> = ({
  show,
  from = "bottom",
  children,
  className = "",
  delay = 0,
  duration = 0.30,
}) => {
  // Define transitions
  const variants = {
    hidden: {
      y: from === "bottom" ? 16 : from === "top" ? -16 : 0,
      x: from === "left" ? -20 : from === "right" ? 20 : 0,
      scale: from === "scale" ? 0.92 : 1,
      opacity: 0,
      filter: "blur(4px)",
      pointerEvents: "none" as const,
    },
    visible: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      pointerEvents: "auto" as const,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: EASE_PREMIUM,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
