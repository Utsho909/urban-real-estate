"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMenu } from "@/components/MenuContext";

import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [animStep, setAnimStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { setIsScrollLocked } = useMenu();

  // Parallax scroll for the hero section
  const { scrollY } = useScroll();
  const videoParallaxY = useTransform(scrollY, [0, 800], [0, 120]);    // video drifts slower than scroll
  const textParallaxY  = useTransform(scrollY, [0, 800], [0, -60]);    // text drifts up faster
  const heroOpacity    = useTransform(scrollY, [0, 600], [1, 0]);      // hero fades as you scroll

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (animStep < 3) {
      document.body.classList.add("hide-logo");
      setIsScrollLocked(true);
    } else {
      document.body.classList.remove("hide-logo");
      setIsScrollLocked(false);
    }
    return () => {
      document.body.classList.remove("hide-logo");
      // Don't auto-unlock on unmount to prevent race conditions
    };
  }, [animStep, setIsScrollLocked]);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimStep(1), 2000);
    const t2 = setTimeout(() => setAnimStep(2), 3500);
    const t3 = setTimeout(() => setAnimStep(3), 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const isFullscreen = animStep <= 1;
  const isCropped    = animStep === 2;

  return (
    <>
      <div ref={heroRef} className="h-screen w-full bg-background p-[25px] overflow-hidden flex flex-col relative">
      <main className="relative w-full h-full flex flex-row pt-16">

        {/* Left Content — visible only at step 3 */}
        <div className="absolute left-0 top-0 h-full w-full z-20 pointer-events-none overflow-visible">
          <AnimatePresence>
            {animStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ y: textParallaxY }}
                className="w-full md:w-1/2 h-full relative overflow-visible px-6 md:px-20 flex flex-col justify-center pt-24 md:pt-0"
              >
                {/* Vertical Text — far left */}
                <div className="hidden md:flex absolute left-6 bottom-12 flex-col items-center gap-2">
                  <span
                    className="text-[10px] font-medium tracking-widest text-foreground/40 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    01 Services
                  </span>
                </div>

                <div className="flex flex-col gap-6 md:gap-8 max-w-xl">
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-serif italic text-foreground/70 text-2xl md:text-[32px]"
                  >
                    Diverse Industries, Singular Vision
                  </motion.p>

                  {/* Main heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.55 }}
                    className="text-[11vw] md:text-[7.5vw] leading-[0.9] font-sans font-normal tracking-tight text-foreground whitespace-nowrap"
                  >
                    Building a Legacy <br /> of Excellence
                  </motion.h1>

                  {/* Body copy */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="font-serif italic text-base md:text-lg text-foreground/70 leading-relaxed max-w-xs md:mt-12"
                  >
                    Expanding into new ventures across Real Estate, Hospitality, and beyond.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video container — morphs through steps + parallax on scroll */}
        <motion.div
          initial={false}
          animate={{
            top:    isFullscreen ? "-25px"  : (isCropped ? "25px"  : (isMobile ? "50%" : "180px")),
            left:   isFullscreen ? "-25px"  : (isCropped ? "25px"  : (isMobile ? "0%"   : "50%")),
            width:  isFullscreen ? "100vw"  : (isCropped ? "calc(100% - 50px)" : (isMobile ? "100%" : "50%")),
            height: isFullscreen ? "100vh"  : (isCropped ? "calc(100% - 50px)" : (isMobile ? "50%" : "calc(100% - 180px)")),
            borderRadius: isFullscreen ? "0px" : "6px",
          }}
          style={{ y: animStep === 3 ? videoParallaxY : 0 }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute z-10 flex items-center justify-center overflow-hidden bg-black"
        >
          <motion.video
            src="/videos/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ scale: 1.08 }} // slight over-scale so parallax never shows edges
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Step 0 — Logo */}
          <AnimatePresence>
            {animStep === 0 && (
              <motion.div
                key="urbana"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/urbana-white-logo.png"
                  alt="Urbana"
                  className="w-64 md:w-96 max-w-[70%] drop-shadow-2xl select-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dark shade during intro */}
          <AnimatePresence>
            {animStep <= 1 && (
              <motion.div
                key="shade"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-black/50 z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Step 1 — tagline */}
          <AnimatePresence>
            {animStep === 1 && (
              <motion.div
                key="tagline"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-8"
              >
                <p className="text-white text-3xl md:text-5xl font-serif italic text-center drop-shadow-xl select-none leading-snug">
                  A Legacy of Growth &amp; Excellence
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fade from black on mount */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-40 pointer-events-none"
          />

          {/* Play Showreel */}
          <AnimatePresence>
            {animStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group/btn z-30"
              >
                <button className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm group-hover/btn:scale-105 transition-transform mb-3 bg-white/10">
                  <Play fill="currentColor" size={14} className="ml-1" />
                </button>
                <span className="text-white text-sm font-medium tracking-wide drop-shadow-md">
                  Play showreel
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      </div>

      <AboutSection />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
