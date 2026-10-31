import React, { FC, useState } from "react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

interface Icon3DProps {
  icon: keyof typeof LucideIcons | React.ComponentType<any>;
  gradient?: string; // Standard linear CSS gradient or Tailwind color gradient e.g. "from-amber-400 to-amber-600"
  shadowColor?: string; // Glow/shadow color (e.g. rgba(212,168,75,0.3))
  iconClass?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const SIZES = {
  sm: { outer: 56,  inner: 46, icon: 20, ring1: 78,  ring2: 64  },
  md: { outer: 80,  inner: 64, icon: 28, ring1: 110, ring2: 92  },
  lg: { outer: 110, inner: 88, icon: 38, ring1: 150, ring2: 126 },
};

export const Icon3D: FC<Icon3DProps> = ({
  icon,
  gradient = "linear-gradient(135deg, #d4a84b, #a06e1e)",
  shadowColor = "rgba(212,168,75,0.3)",
  iconClass = "text-white",
  size = "md",
  delay = 0,
}) => {
  const IconComponent = typeof icon === "string" ? (LucideIcons[icon] as React.ComponentType<any>) : icon;

  if (!IconComponent) {
    return null;
  }

  const d = SIZES[size] || SIZES.md;

  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRy((x / (rect.width / 2)) * 26);
    setRx(-(y / (rect.height / 2)) * 26);
  };

  const handleMouseLeave = () => {
    setRx(0);
    setRy(0);
    setHovered(false);
  };

  // Map common tailwind gradients/colors to standard high-fidelity CSS linear-gradients
  const isCustomBg = gradient.includes("-gradient") || gradient.startsWith("#") || gradient.startsWith("rgb") || gradient.startsWith("hsl");
  
  let resolvedGradient = gradient;
  if (!isCustomBg) {
    if (gradient.includes("amber")) {
      resolvedGradient = "linear-gradient(135deg, #f59e0b, #d97706)";
    } else if (gradient.includes("sky")) {
      resolvedGradient = "linear-gradient(135deg, #38bdf8, #0284c7)";
    } else if (gradient.includes("emerald") || gradient.includes("green")) {
      resolvedGradient = "linear-gradient(135deg, #10b981, #059669)";
    } else if (gradient.includes("violet") || gradient.includes("purple") || gradient.includes("indigo")) {
      resolvedGradient = "linear-gradient(135deg, #8b5cf6, #7c3aed)";
    } else if (gradient.includes("rose") || gradient.includes("red")) {
      resolvedGradient = "linear-gradient(135deg, #f43f5e, #e11d48)";
    } else if (gradient.includes("blue")) {
      resolvedGradient = "linear-gradient(135deg, #3b82f6, #2563eb)";
    } else if (gradient.includes("orange")) {
      resolvedGradient = "linear-gradient(135deg, #f97316, #ea580c)";
    } else {
      resolvedGradient = "linear-gradient(135deg, #d4a84b, #a06e1e)";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.35, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.32, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: d.outer,
        height: d.outer,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Outer blurred radial atmosphere glow */}
      <motion.div
        animate={{ scale: hovered ? [1.4, 1.8, 1.4] : [1, 1.35, 1], opacity: hovered ? [0.4, 0.7, 0.4] : [0.15, 0.35, 0.15] }}
        transition={{ duration: hovered ? 2 : 3.5, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
        style={{
          position: "absolute",
          width: d.outer * 2.2,
          height: d.outer * 2.2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${shadowColor} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Main outer planetary orbit wireframe ring */}
      <motion.div
        animate={{ 
          rotate: 360, 
          scale: hovered ? 1.25 : 1,
          rotateX: hovered ? 46 : 15,
          rotateY: hovered ? -22 : -10,
        }}
        transition={{ 
          rotate: { duration: hovered ? 6 : 12, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 220, damping: 16 },
          rotateX: { type: "spring", stiffness: 180, damping: 14 },
          rotateY: { type: "spring", stiffness: 180, damping: 14 },
        }}
        style={{
          position: "absolute",
          width: d.ring1,
          height: d.ring1,
          borderRadius: "50%",
          border: `1px solid ${shadowColor}`,
          opacity: hovered ? 0.5 : 0.25,
          pointerEvents: "none",
        }}
      />

      {/* Outer dashed spinning ring with an embedded glowing satellite moon */}
      <motion.div
        animate={{ 
          rotate: -360, 
          scale: hovered ? 1.18 : 1,
          rotateX: hovered ? -36 : -15,
          rotateY: hovered ? 42 : 15,
        }}
        transition={{ 
          rotate: { duration: hovered ? 5 : 8, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 220, damping: 16 },
          rotateX: { type: "spring", stiffness: 180, damping: 14 },
          rotateY: { type: "spring", stiffness: 180, damping: 14 },
        }}
        style={{
          position: "absolute",
          width: d.ring2,
          height: d.ring2,
          borderRadius: "50%",
          border: `1px dashed ${shadowColor}`,
          opacity: hovered ? 0.6 : 0.35,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: shadowColor,
            boxShadow: `0 0 12px 4px ${shadowColor}`,
          }}
        />
      </motion.div>

      {/* Second inner planetary ring with opposite spinning glowing dot star */}
      <motion.div
        animate={{ 
          rotate: 360, 
          scale: hovered ? 1.12 : 1,
          rotateX: hovered ? 28 : 10,
          rotateY: hovered ? 28 : 10,
        }}
        transition={{ 
          rotate: { duration: hovered ? 6 : 10, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 220, damping: 16 },
          rotateX: { type: "spring", stiffness: 180, damping: 14 },
          rotateY: { type: "spring", stiffness: 180, damping: 14 },
        }}
        style={{
          position: "absolute",
          width: d.ring1,
          height: d.ring1,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -3,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(250,204,21,0.9)",
            boxShadow: "0 0 10px 3px rgba(250,204,21,0.6)",
          }}
        />
      </motion.div>

      {/* Sphere Body float container */}
      <motion.div
        animate={hovered ? { y: -16 } : { y: [0, -8, 0] }}
        transition={hovered ? { type: "spring", stiffness: 280, damping: 16 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }}
        style={{ position: "relative" }}
      >
        {/* Sphere Body with custom glass reflection & 3D morphing shape */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setHovered(true)}
          animate={{
            borderRadius: hovered
              ? [
                  "38% 62% 64% 36% / 44% 48% 52% 56%",
                  "58% 42% 52% 48% / 46% 58% 42% 54%",
                  "42% 58% 44% 56% / 56% 42% 58% 44%",
                  "38% 62% 64% 36% / 44% 48% 52% 56%",
                ]
              : [
                  "50%",
                  "46% 54% 58% 42% / 48% 52% 48% 52%",
                  "54% 46% 44% 56% / 52% 48% 52% 48%",
                  "48% 52% 46% 54% / 46% 54% 46% 54%",
                  "50%",
                ],
            rotate: hovered ? 12 : 0,
          }}
          transition={{
            borderRadius: {
              duration: hovered ? 2.2 : 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              type: "spring",
              stiffness: 140,
              damping: 12,
            }
          }}
          style={{
            width: d.inner,
            height: d.inner,
            background: resolvedGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transformStyle: "preserve-3d",
            perspective: 600,
            transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${hovered ? "28px" : "0px"}) scale(${hovered ? 1.18 : 1})`,
            transition: hovered ? "transform 0.07s cubic-bezier(0.16, 1, 0.3, 1)" : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: hovered
              ? [
                  `0 0 0 2px rgba(255,255,255,0.4) inset`,
                  `0 20px 45px ${shadowColor}`,
                  `0 0 90px ${shadowColor}90`,
                  `0 4px 14px rgba(0,0,0,0.35)`,
                ].join(", ")
              : [
                  `0 0 0 1px rgba(255,255,255,0.2) inset`,
                  `0 8px 30px ${shadowColor}`,
                  `0 0 50px ${shadowColor}40`,
                  `0 2px 6px rgba(0,0,0,0.2)`,
                ].join(", "),
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {/* Highlight Specular Arc at top left */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: "radial-gradient(circle at 26% 20%, rgba(255,255,255,0.65) 0%, transparent 52%)",
            }}
          />

          {/* Symmetrical bounce reflection at bottom right */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: "radial-gradient(circle at 72% 18%, rgba(255,255,255,0.22) 0%, transparent 35%)",
            }}
          />

          {/* Multi-angle color iridescence shimmer overlay */}
          <motion.div
            animate={{ 
              opacity: [0.25, 0.65, 0.25],
              rotate: hovered ? 180 : 0
            }}
            transition={{ 
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: hovered ? 4 : 10, repeat: Infinity, ease: "linear" }
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background:
                "conic-gradient(from 200deg at 50% 50%, rgba(250,204,21,0.35) 0deg, rgba(255,255,255,0.3) 120deg, rgba(250,204,21,0.2) 240deg, rgba(250,204,21,0.35) 360deg)",
            }}
          />

          {/* Lower internal shadow layer for volume illusion */}
          <div
            style={{
              position: "absolute",
              bottom: "6%",
              left: "18%",
              right: "18%",
              height: "22%",
              borderRadius: "inherit",
              background: "rgba(255,255,255,0.1)",
              filter: "blur(4px)",
              pointerEvents: "none",
            }}
          />

          {/* Ambient inner core glowing pulse */}
          <motion.div
            animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.6, 1.0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 + 0.3 }}
            style={{
              position: "absolute",
              inset: "22%",
              borderRadius: "inherit",
              pointerEvents: "none",
              background: `radial-gradient(circle, ${shadowColor} 0%, transparent 75%)`,
            }}
          />

          {/* Tiny glistening point highlight */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 + 0.8 }}
            style={{
              position: "absolute",
              top: "14%",
              left: "22%",
              width: 4,
              height: 4,
              borderRadius: "inherit",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 0 6px 3px rgba(255,255,255,0.6)",
              pointerEvents: "none",
            }}
          />

          {/* The centered Icon component floating forward in 3D morph */}
          <IconComponent
            style={{
              width: d.icon,
              height: d.icon,
              transform: hovered ? "translateZ(34px) scale(1.22) rotate(8deg)" : "translateZ(0px) scale(1) rotate(0deg)",
              transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`relative z-10 drop-shadow-xl ${iconClass}`}
          />
        </motion.div>

        {/* 3D ground shadow underneath the floating planet */}
        <motion.div
          animate={hovered ? { opacity: 0.25, scaleX: 0.55, scaleY: 0.55, filter: "blur(10px)" } : { opacity: [0.35, 0.6, 0.35], scaleX: [0.7, 0.95, 0.7] }}
          transition={hovered ? { duration: 0.25 } : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.4 }}
          style={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: d.inner * 0.7,
            height: 10,
            borderRadius: "50%",
            background: shadowColor,
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Icon3D;
