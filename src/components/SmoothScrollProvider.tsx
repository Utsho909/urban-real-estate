"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMenu } from "./MenuContext";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isOpen, isScrollLocked } = useMenu();
  const pathname = usePathname();

  // Reset scroll to top on route changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Pause / resume Lenis when menu opens/closes or scroll is locked programmatically
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isOpen || isScrollLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isOpen, isScrollLocked]);

  return (
    // This wrapper gets pushed down when menu opens
    <motion.div
      animate={{ y: isOpen ? "30vh" : "0vh" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
