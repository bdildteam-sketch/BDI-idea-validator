import React, { FC, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";

interface SlideWrapperProps {
  children: React.ReactNode;
  slideIndex?: number;
  slideKey?: number;
  direction: number; // 1 for next, -1 for prev
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "70%" : "-70%",
    y: dir > 0 ? "2%" : "-2%",
    opacity: 0,
    scale: 0.85,
    rotateY: dir > 0 ? 32 : -32,
    rotateX: dir > 0 ? 6 : -6,
    rotateZ: dir > 0 ? 2 : -2,
    z: -320,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    z: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "70%" : "-70%",
    y: dir < 0 ? "2%" : "-2%",
    opacity: 0,
    scale: 0.85,
    rotateY: dir < 0 ? 32 : -32,
    rotateX: dir < 0 ? 6 : -6,
    rotateZ: dir < 0 ? 2 : -2,
    z: -320,
    filter: "blur(6px)",
  }),
};

const transition = {
  x: { type: "spring", stiffness: 280, damping: 26, mass: 0.75 },
  opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  rotateY: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  rotateX: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  rotateZ: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  filter: { duration: 0.22, ease: "easeOut" },
  z: { duration: 0.3 },
};

export const SlideWrapper: FC<SlideWrapperProps> = ({
  children,
  slideKey,
  slideIndex,
  direction,
}) => {
  const activeKey = slideKey !== undefined ? slideKey : (slideIndex !== undefined ? slideIndex : 0);

  // Cursor physical tracking mapping for organic tilt and parallax
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  // Springs for smooth fluid interpolation
  const springX = useSpring(xValue, { stiffness: 55, damping: 20 });
  const springY = useSpring(yValue, { stiffness: 55, damping: 20 });

  // Layered 3D transformations - Front Content
  const contentRotateX = useTransform(springY, [-1, 1], [5, -5]);
  const contentRotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const contentTranslateX = useTransform(springX, [-1, 1], [-14, 14]);
  const contentTranslateY = useTransform(springY, [-1, 1], [-10, 10]);

  // Layered 3D transformations - Backing Card (parallax shift)
  const bgRotateX = useTransform(springY, [-1, 1], [2.5, -2.5]);
  const bgRotateY = useTransform(springX, [-1, 1], [-3, 3]);
  const bgTranslateX = useTransform(springX, [-1, 1], [-5, 5]);
  const bgTranslateY = useTransform(springY, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normalizedY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      xValue.set(normalizedX);
      yValue.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xValue, yValue]);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={activeKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-14 overflow-y-auto bg-transparent"
        style={{ perspective: "2200px", transformStyle: "preserve-3d" }}
      >
        {/* Deep 3D glass panel with layered shadows + subtle manual tilt parallax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% -20%, rgba(212,168,75,0.28) 0%, rgba(120,180,255,0.10) 35%, transparent 70%), rgba(255,255,255,0.22)",
            border: "1px solid rgba(212,168,75,0.30)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 80px rgba(212,168,75,0.14), 0 20px 80px rgba(212,168,75,0.25)",
            backdropFilter: "blur(14px)",
            rotateX: bgRotateX,
            rotateY: bgRotateY,
            x: bgTranslateX,
            y: bgTranslateY,
            z: -120,
            transformStyle: "preserve-3d",
          }}
        />
        {/* Secondary depth layer with inverse drift parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute inset-8 md:inset-10 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,168,75,0.08) 0%, rgba(120,180,255,0.04) 50%, transparent 70%)",
            border: "1px solid rgba(212,168,75,0.18)",
            boxShadow: "inset 0 0 60px rgba(212,168,75,0.10)",
            rotateX: bgRotateX,
            rotateY: bgRotateY,
            x: useTransform(bgTranslateX, (val) => val * -1.2),
            y: useTransform(bgTranslateY, (val) => val * -1.2),
            z: -200,
            transformStyle: "preserve-3d",
          }}
        />
        {/* Glow corner accents */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,168,75,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(120,180,255,0.25) 0%, transparent 70%)",
            filter: "blur(50px)",
            transform: "translate(30%, 30%)",
          }}
        />
        
        {/* Slide contents wrapper floating further up with standard tilt perspective */}
        <motion.div
          style={{
            rotateX: contentRotateX,
            rotateY: contentRotateY,
            x: contentTranslateX,
            y: contentTranslateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full max-w-6xl h-full max-h-[750px] flex items-center justify-center relative z-10"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideWrapper;
