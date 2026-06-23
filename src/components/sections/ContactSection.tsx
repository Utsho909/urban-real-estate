"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax the content down so it feels like it's being "revealed"
  const contentY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section ref={containerRef} id="contact" className="relative bg-white overflow-hidden z-0">
      <motion.div style={{ y: contentY }} className="w-full flex flex-col pt-24 pb-24 min-h-screen justify-center">
        
        {/* Infinite Marquee Header */}
        <div className="w-full border-b border-black/10 pt-8 pb-8 mb-16 md:mb-32 bg-sand">
          <motion.div 
            animate={{ x: [0, -1036] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap items-center"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="text-black/20 mx-8 text-4xl">—</span>
                <span className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-black">Talk to us.</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between gap-16 md:gap-24">
          
          {/* Left Column: Text & Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-sans tracking-widest text-black/40 uppercase mb-8">Get In Touch</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium text-black leading-[1.1] tracking-tight mb-12 max-w-2xl">
                We are dedicated to finding the right solutions for you.
              </h1>
              
              <a 
                href="mailto:hello@urbanarealestate.com?subject=Inquiry from Urbana Website"
                className="flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest text-black hover:text-copper transition-colors pb-2 border-b-2 border-black hover:border-copper inline-flex mb-16"
              >
                Get In Touch <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Contact Details Grid */}
            <div className="w-full border-t border-black/10 pt-8 grid grid-cols-2 gap-y-8 gap-x-4">
              <div className="col-span-2">
                <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-2">Office</p>
                <a 
                  href="https://maps.app.goo.gl/U1EWnV4cT9V9j9Xq7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-sans text-black hover:text-copper transition-colors inline-flex items-start gap-1 group"
                >
                  5th Floor, Plot 1136/A, JCX Business Tower,<br />
                  Road Japan Street, Dhaka 1229
                  <ArrowUpRight size={14} className="mt-0.5 text-black/40 group-hover:text-copper transition-colors" />
                </a>
              </div>
              <div>
                <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-2">Phone</p>
                <a href="tel:01329737900" className="text-sm font-sans text-black hover:text-copper transition-colors">01329737900</a>
              </div>
              <div>
                <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-2">Email</p>
                <a href="mailto:hello@urbanarealestate.com" className="text-sm font-sans text-black hover:text-copper transition-colors">hello@urbanarealestate.com</a>
              </div>
              <div className="col-span-2 flex gap-6 pt-4 border-t border-black/5 mt-2">
                <a href="#" className="text-[10px] font-sans tracking-widest text-black/40 uppercase hover:text-black transition-colors">LinkedIn</a>
                <a href="#" className="text-[10px] font-sans tracking-widest text-black/40 uppercase hover:text-black transition-colors">Instagram</a>
                <a href="#" className="text-[10px] font-sans tracking-widest text-black/40 uppercase hover:text-black transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full md:w-[40%] flex justify-end items-end">
            <div className="relative w-full max-w-[400px] aspect-[4/5] bg-gray-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Representative"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
