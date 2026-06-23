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

  const { scrollY } = useScroll();
  const videoParallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  const textParallaxY = useTransform(scrollY, [0, 800], [0, -60]);

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
    return () => { document.body.classList.remove("hide-logo"); };
  }, [animStep, setIsScrollLocked]);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimStep(1), 2000);
    const t2 = setTimeout(() => setAnimStep(2), 3500);
    const t3 = setTimeout(() => setAnimStep(3), 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const isFullscreen = animStep <= 1;
  const isCropped = animStep === 2;

  return (
    <>
      <div ref={heroRef} className="h-screen w-full bg-background overflow-hidden relative">

        {/* ── Text layer (always on top) ── */}
        <AnimatePresence>
          {animStep === 3 && (
            <motion.div
              key="text-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ y: textParallaxY }}
              className="absolute inset-0 z-20 pointer-events-none flex flex-col md:flex-row"
            >
              {/* Left / top half: text */}
              <div className="
                w-full md:w-1/2 h-[52%] md:h-full
                flex flex-col justify-center
                px-6 md:pl-20 md:pr-8
                pt-20 md:pt-0
              ">
                {/* Vertical label — desktop only */}
                <div className="hidden md:flex absolute left-6 bottom-12 flex-col items-center gap-2">
                  <span
                    className="text-[10px] font-medium tracking-widest text-foreground/40 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    01 Services
                  </span>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-serif italic text-black text-xl md:text-[28px]"
                  >
                    Diverse Industries, Singular Vision
                  </motion.p>

                  {/* Main heading — editorial composition */}
                  <div className="flex flex-col gap-0">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.45 }}
                      className="font-sans font-normal uppercase tracking-[0.25em] text-foreground/40 text-[11px] md:text-xs mb-3"
                    >

                    </motion.span>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.55 }}
                      className="font-serif font-normal tracking-tight text-foreground leading-[0.9] 
                                 text-[15vw] md:text-[8.5vw] md:whitespace-nowrap"
                    >
                      Building a
                    </motion.h1>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.65 }}
                      className="font-sans font-semibold tracking-tighter text-[#e4d2c2] leading-[0.85]
                                 text-[15vw] md:text-[8.5vw] md:whitespace-nowrap"
                    >
                      Legacy.
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="font-serif italic text-foreground/50 text-lg md:text-2xl mt-5 md:mt-5"
                    >
                      — of Growth &amp; Excellence
                    </motion.p>
                  </div>

                  {/* Body copy */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="font-serif italic text-base text-foreground/60 leading-relaxed max-w-xs md:mt-6 ml-12 md:ml-0"
                  >
                    Expanding into new ventures across Real Estate, Hospitality, and beyond.
                  </motion.p>
                </div>
              </div>

              {/* Right / bottom half: empty — video sits here */}
              <div className="w-full md:w-1/2 h-[48%] md:h-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Video container ── */}
        <motion.div
          initial={false}
          animate={{
            top: isFullscreen ? "0px" : (isCropped ? "25px" : (isMobile ? "52%" : "25px")),
            left: isFullscreen ? "0px" : (isCropped ? "25px" : (isMobile ? "16px" : "50%")),
            width: isFullscreen ? "100%" : (isCropped ? "calc(100% - 50px)" : (isMobile ? "calc(100% - 32px)" : "calc(50% - 50px)")),
            height: isFullscreen ? "100%" : (isCropped ? "calc(100% - 50px)" : (isMobile ? "calc(48% - 32px)" : "calc(100% - 50px)")),
            borderRadius: isFullscreen ? "0px" : "6px",
          }}
          style={{ y: animStep === 3 ? videoParallaxY : 0, position: "absolute" }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          className="z-10 flex items-center justify-center overflow-hidden bg-black"
        >
          <motion.video
            src="/videos/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ scale: 1.08 }}
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
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group/btn z-30"
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
      </div>

      <AboutSection />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
