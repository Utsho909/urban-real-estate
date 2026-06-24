"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMenu } from "@/components/MenuContext";

const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Architecture",
    title: "Minimalist Villa Facade"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Landscape",
    title: "Infinity Pool Shoreline"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Urbanism",
    title: "Modern Township Masterplan"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Interiors",
    title: "Double-Height Glass Lounge"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Architecture",
    title: "Corporate Tower Lobby"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Urbanism",
    title: "Metropolitan Business Hub"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Landscape",
    title: "Coastal Resort Terraces"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Interiors",
    title: "Luxe Penthouse Bathroom"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Architecture",
    title: "Symmetrical Atrium Skylight"
  }
];

const categories = ["All", "Architecture", "Landscape", "Urbanism", "Interiors"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setIsScrollLocked } = useMenu();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      setIsScrollLocked(true);
    } else {
      document.body.style.overflow = "";
      setIsScrollLocked(false);
    }
    return () => {
      document.body.style.overflow = "";
      setIsScrollLocked(false);
    };
  }, [lightboxIndex, setIsScrollLocked]);

  const filteredItems = galleryItems.filter(
    item => selectedCategory === "All" || item.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
      if (e.key === "ArrowLeft") setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* ── Header & Filters ── */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-copper font-sans uppercase tracking-[0.25em] text-xs font-semibold mb-4"
          >
            Visual Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-none mb-12"
          >
            Gallery
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs md:text-sm font-sans tracking-widest uppercase transition-colors px-3 py-1.5 border-b-2 ${
                  selectedCategory === cat 
                    ? "border-copper text-foreground" 
                    : "border-transparent text-foreground/40 hover:text-foreground/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Clean Grid ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-charcoal mb-4">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-[10px] font-sans uppercase tracking-widest border border-white/30 px-5 py-2 backdrop-blur-sm">
                      Expand
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="text-center">
                  <p className="text-copper text-[9px] font-sans uppercase tracking-[0.2em] mb-1.5">
                    {item.category}
                  </p>
                  <h3 className="text-foreground text-sm md:text-base font-serif">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── Minimal Lightbox (Rendered in Portal) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${lightboxIndex}`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-white"
                  >
                    <p className="text-copper text-[10px] font-sans uppercase tracking-[0.2em] mb-1">
                      {filteredItems[lightboxIndex].category}
                    </p>
                    <h3 className="text-lg md:text-xl font-serif">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
                <button 
                  className="text-white/60 hover:text-white transition-colors p-2"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav Arrows */}
              <button
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <button
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-50"
                onClick={handleNext}
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>

              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-24 pointer-events-none z-10">
                <div className="relative w-full max-w-6xl h-[70vh] md:h-[85vh] pointer-events-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={filteredItems[lightboxIndex].src}
                        alt={filteredItems[lightboxIndex].title}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs z-50">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
