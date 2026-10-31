import React, { FC } from "react";
import { motion } from "motion/react";

interface BDILogoProps {
  position?: "top-left" | "top-right" | "bottom-left";
  className?: string;
  delay?: number;
}

export const BDILogo: FC<BDILogoProps> = ({
  position = "top-left",
  className = "",
  delay = 0.15,
}) => {
  const logoUrl = "https://lwfiles.mycourse.app/66c1c622d2244665b901e0ed-public/bdeb8cd5a089647ca48bed02d6f274e9.png";

  // Position coordinates map
  const positionClasses = {
    "top-left": "top-6 left-6 md:top-8 md:left-10",
    "top-right": "top-6 right-6 md:top-8 md:right-10",
    "bottom-left": "bottom-6 left-6 md:bottom-8 md:left-10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      }}
      className={`fixed ${positionClasses[position]} z-40 select-none ${className}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={logoUrl}
          alt="BDI - Business Development Institute"
          referrerPolicy="no-referrer"
          className="w-32 md:w-36 h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
        />
      </div>
    </motion.div>
  );
};

export default BDILogo;
