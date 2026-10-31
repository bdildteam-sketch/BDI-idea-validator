import React, { useState, useEffect, useCallback, FC } from "react";
import { Scene3D } from "../components/presentation/Scene3D";
import { SlideWrapper } from "../components/presentation/SlideWrapper";
import { SlideNav } from "../components/presentation/SlideNav";
import { BDILogo } from "../components/presentation/BDILogo";
import { SlideWelcome } from "../components/presentation/slides/SlideWelcome";
import { SlideConfusion } from "../components/presentation/slides/SlideConfusion";
import { SlideDefinitions1 } from "../components/presentation/slides/SlideDefinitions1";
import { SlideDefinitions2 } from "../components/presentation/slides/SlideDefinitions2";
import { SlideReasons } from "../components/presentation/slides/SlideReasons";
import { SlideBDIDefinition } from "../components/presentation/slides/SlideBDIDefinition";
import { SlideActivities } from "../components/presentation/slides/SlideActivities";
import { SlideCTA } from "../components/presentation/slides/SlideCTA";

interface SlideConfig {
  component: FC<{ step: number }>;
  maxSteps: number;
}

const slidesConfig: SlideConfig[] = [
  { component: SlideWelcome,       maxSteps: 4 },
  { component: SlideConfusion,     maxSteps: 7 },
  { component: SlideDefinitions1,  maxSteps: 5 },
  { component: SlideDefinitions2,  maxSteps: 5 },
  { component: SlideReasons,       maxSteps: 6 },
  { component: SlideBDIDefinition, maxSteps: 6 },
  { component: SlideActivities,    maxSteps: 8 },
  { component: SlideCTA,           maxSteps: 5 },
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [step, setStep] = useState(0);

  const goNext = useCallback(() => {
    const maxSteps = slidesConfig[currentSlide].maxSteps;
    if (step < maxSteps) {
      setStep((s) => s + 1);
    } else if (currentSlide < slidesConfig.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      setStep(0);
    }
  }, [currentSlide, step]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setStep(slidesConfig[currentSlide - 1].maxSteps);
    }
  }, [currentSlide, step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  const CurrentSlideComponent = slidesConfig[currentSlide].component;

  return (
    <div className="fixed inset-0 bg-background overflow-hidden select-none">
      <Scene3D slideIndex={currentSlide} />
      <BDILogo position="top-left" delay={0.3} />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/30 via-transparent to-white/20" />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-r from-white/15 via-transparent to-white/15" />
      
      {/* Slide counter progress pill */}
      <div
        className="fixed top-6 right-6 z-50 flex items-center gap-2 font-sans text-sm rounded-full px-4 py-2"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(212,168,75,0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        <span className="text-amber-500 font-semibold" style={{ textShadow: "0 0 12px rgba(212,168,75,0.6)" }}>
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="text-slate-350">/</span>
        <span className="text-slate-500">{String(slidesConfig.length).padStart(2, "0")}</span>
      </div>

      <div className="relative z-10 w-full h-full">
        <SlideWrapper slideKey={currentSlide} direction={direction}>
          <CurrentSlideComponent step={step} />
        </SlideWrapper>
      </div>

      <SlideNav
        current={currentSlide}
        total={slidesConfig.length}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={(idx) => {
          if (idx !== currentSlide) {
            setDirection(idx > currentSlide ? 1 : -1);
            setCurrentSlide(idx);
            setStep(0);
          }
        }}
      />
    </div>
  );
}

export default Presentation;
