"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "./MenuContext";

const navLinks = [
  { name: "Home",       href: "/" },
  { name: "About Us",   href: "#about" },
  { name: "Projects",   href: "#projects" },
  { name: "Gallery",    href: "#gallery" },
  { name: "Contact Us", href: "#contact" },
];

const secondaryLinks = [
  { name: "Urbanism",     href: "/" },
  { name: "Landscape",    href: "/" },
  { name: "Architecture", href: "/" },
];

const LETTERS = "URBANA".split("");
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const { isOpen, setIsOpen, isScrollLocked } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 py-8 px-[25px]"
        animate={{ opacity: isScrollLocked ? 0 : 1, y: isScrollLocked ? -16 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isScrollLocked ? "none" : "auto" }}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            id="navbar-logo"
            className="relative flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative flex-shrink-0" style={{ width: "54px", height: "54px" }}>
              {/* Black symbol (visible when closed) */}
              <motion.div
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src="/urbana-symbol-black.png"
                  alt="Urbana symbol black"
                  fill
                  sizes="54px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              {/* White symbol (visible when open) */}
              <motion.div
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src="/urbana-symbol-white.png"
                  alt="Urbana symbol white"
                  fill
                  sizes="54px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            <div className="flex items-center overflow-hidden">
              {LETTERS.map((letter, i) => {
                const reverseIndex = LETTERS.length - 1 - i;
                const dissolveDelay = scrolled
                  ? reverseIndex * 0.07
                  : (LETTERS.length - 1 - reverseIndex) * 0.07;
                return (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: scrolled ? 0 : 1,
                      y:       scrolled ? -8 : 0,
                      filter:  scrolled ? "blur(4px)" : "blur(0px)",
                      color:   isOpen ? "#ffffff" : "#111111",
                    }}
                    transition={{ duration: 0.35, delay: dissolveDelay, ease: "easeInOut" }}
                    style={{
                      display: "inline-block",
                      fontSize: "28px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </div>
          </Link>

          {/* Menu button */}
          <button
            className="rounded-full flex items-center justify-center z-[60] relative"
            style={{
              width: "56px",
              height: "56px",
              background: isOpen ? "#fff" : "var(--foreground)",
              color:      isOpen ? "#111" : "var(--background)",
              transition: "background 0.4s ease, color 0.4s ease",
            }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div style={{ width: "22px", height: "16px", position: "relative" }}>
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ position: "absolute", top: 0, display: "block", width: "22px", height: "1.5px", background: "currentColor", borderRadius: "2px", transformOrigin: "center" }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ position: "absolute", top: "50%", marginTop: "-0.75px", display: "block", width: "22px", height: "1.5px", background: "currentColor", borderRadius: "2px", transformOrigin: "center" }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ position: "absolute", bottom: 0, display: "block", width: "22px", height: "1.5px", background: "currentColor", borderRadius: "2px", transformOrigin: "center" }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* ── Fullscreen black menu overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{    y: "-100%" }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ willChange: "transform" }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col px-[25px] pt-36 pb-16 overflow-hidden"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-24 items-center max-w-screen-xl mx-auto w-full">

              {/* Primary nav links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{    opacity: 0, y: 20 }}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group relative leading-none"
                      style={{ fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 400, color: "#fff", fontFamily: "var(--font-inter)", display: "block" }}
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 -bottom-1 h-[1.5px] bg-white w-0 group-hover:w-full transition-all duration-500 ease-out" aria-hidden />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                className="hidden md:flex flex-col justify-between gap-16 self-stretch py-2"
              >
                <div className="flex flex-col gap-3">
                  {secondaryLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors duration-300 text-base font-serif italic">
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2 text-sm text-white/40 font-serif italic">
                  <span className="text-white/60 not-italic font-sans tracking-widest text-xs uppercase mb-2">Contact</span>
                  <a href="mailto:hello@urbana.com" className="hover:text-white transition-colors duration-300">hello@urbana.com</a>
                  <a href="tel:+8801700000000" className="hover:text-white transition-colors duration-300">+880 17 0000 0000</a>
                </div>
              </motion.div>
            </div>

            {/* Bottom strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex items-center justify-between text-white/25 text-xs tracking-widest uppercase font-sans max-w-screen-xl mx-auto w-full border-t border-white/10 pt-6"
            >
              <span>© {new Date().getFullYear()} Urbana Real Estate Ltd.</span>
              <span>Dhaka, Bangladesh</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
