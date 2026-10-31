import React, { FC, useRef, useState } from "react";
import { motion } from "motion/react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
  show?: boolean;
}

export const Card3D: FC<Card3DProps> = ({
  children,
  className = "",
  delay = 0,
  intensity = 16,
  show = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [gx, setGx] = useState(50);
  const [gy, setGy] = useState(50);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRy(((x - rect.width / 2) / (rect.width / 2)) * intensity);
    setRx(-(((y - rect.height / 2) / (rect.height / 2)) * intensity));
    setGx((x / rect.width) * 100);
    setGy((y / rect.height) * 100);
  };

  const onLeave = () => {
    setRx(0);
    setRy(0);
    setGx(50);
    setGy(50);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22, scale: 0.94, rotateX: 10, filter: "blur(4px)" }}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 22, scale: 0.94, rotateX: 10, filter: "blur(4px)" }
      }
      transition={{ duration: 0.32, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) ${
          hovered ? "translateZ(24px) scale(1.035)" : ""
        }`,
        transition: hovered
          ? "transform 0.07s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered
          ? "0 0 0 2px rgba(250,204,21,0.6) inset, 0 16px 40px rgba(0,0,0,0.12), 0 0 40px rgba(250,204,21,0.2)"
          : "0 0 0 1px rgba(0,0,0,0.08) inset, 0 4px 16px rgba(0,0,0,0.06)",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic 3D ambient morph glow on hover */}
      <motion.div
        animate={{
          opacity: hovered ? [0.15, 0.3, 0.15] : [0.03, 0.08, 0.03],
          scale: hovered ? [1, 1.06, 1] : [0.98, 1.02, 0.98],
        }}
        transition={{ duration: hovered ? 2 : 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(250,204,21,0.4) 0%, rgba(255,255,255,0.2) 50%, transparent 80%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
        className="absolute -inset-2 rounded-[inherit] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 60%, rgba(212,168,75,0.3) 0%, transparent 65%)",
        }}
      />

      {/* Cursor radial glow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(212,168,75,0.24) 0%, rgba(120,180,255,0.12) 40%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Iridescent border on hover */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `conic-gradient(from ${(gx / 100) * 360}deg at ${gx}% ${gy}%, rgba(212,168,75,0.55), rgba(120,180,255,0.35), rgba(255,120,200,0.28), rgba(212,168,75,0.55))`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Top glass shimmer + depth overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,${
            hovered ? 0.8 : 0.25
          }), transparent)`,
          transition: "all 0.35s ease",
          boxShadow: `0 2px 8px rgba(212,168,75,${hovered ? 0.3 : 0.1})`,
        }}
      />
      {/* Bottom depth shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,${
            hovered ? 0.15 : 0.05
          }))`,
          transition: "all 0.35s ease",
        }}
      />

      {/* Card content - project slightly outwards */}
      <div
        style={{
          transform: hovered ? "translateZ(10px)" : "translateZ(0px)",
          transition: "transform 0.25s ease",
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D;
