"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// Split images into 3 columns
const col1 = images.slice(0, 3);
const col2 = images.slice(3, 6);
const col3 = images.slice(6, 9);

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different translation speeds for each column (using pixels to avoid massive gaps)
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);

  return (
    <section id="gallery" ref={containerRef} className="pt-48 pb-24 bg-sand relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-serif text-foreground mb-6"
        >
          Visual Symphony
        </motion.h2>
      </div>

      {/* Multi-speed columns */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pb-32">
        
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-12">
          {col1.map((src, idx) => (
            <div 
              key={src} 
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-[4/5] cursor-zoom-in group overflow-hidden bg-charcoal"
            >
              <Image src={src} alt="Gallery" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-12 -mt-48">
          {col2.map((src, idx) => (
            <div 
              key={src} 
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-[3/4] cursor-zoom-in group overflow-hidden bg-charcoal"
            >
              <Image src={src} alt="Gallery" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-12 mt-24">
          {col3.map((src, idx) => (
            <div 
              key={src} 
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-square cursor-zoom-in group overflow-hidden bg-charcoal"
            >
              <Image src={src} alt="Gallery" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              className="absolute top-8 right-8 text-white bg-charcoal/50 p-2 rounded-full hover:bg-copper transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] shadow-2xl rounded-sm overflow-hidden"
            >
              <Image
                src={selectedImage}
                alt="Selected Image"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
