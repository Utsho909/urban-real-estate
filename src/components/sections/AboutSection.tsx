"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for parallax effects
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Subtle vertical parallax for the image (moves slower than scroll)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={targetRef} className="bg-background py-24 md:py-48 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="mb-16 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-copper font-serif italic text-xl md:text-2xl mb-4"
          >
            Our Heritage
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] tracking-tight max-w-5xl"
          >
            A Legacy of Growth &amp; <span className="text-foreground/40 italic">Excellence.</span>
          </motion.h2>
        </div>

        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
          
          {/* Left Column: Image with Parallax */}
          <div className="md:col-span-5 relative">
            {/* Sand accent box behind the image for depth (Desktop only) */}
            <div className="absolute -top-8 -left-8 w-[80%] h-full bg-sand rounded-sm -z-10 hidden md:block" />
            
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-charcoal">
              <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Urbana Group Leadership"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Text & Stats */}
          <div className="md:col-span-7 flex flex-col justify-center md:pt-24 lg:pt-32">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-3xl font-serif text-foreground mb-8">Who We Are</h3>
              <blockquote className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-12 border-l-2 border-copper pl-6 md:pl-8">
                Urbana Group is an emerging business conglomerate with a prosperous and rewarding journey across diverse industries. We have a distinguished and rich history in Real Estate, Textiles, Export-oriented Footwear business, and Medical Testing services.
                <br /><br />
                We are now expanding into new ventures including Hotel management on fully owned lands in Kuakata and Cox's Bazar, a Resort near Dhaka, multiple Township Development Projects, and several Apartment Development Projects in prime locations of Dhaka.
              </blockquote>
              <p className="text-foreground/50 uppercase tracking-widest text-sm font-medium mb-16 md:mb-32">
                — Urbana Group
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-foreground/10"
            >
              <div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-serif text-copper mb-2 md:mb-4">25+</div>
                <p className="text-foreground/70 uppercase tracking-widest text-[10px] md:text-xs">Years of Experience</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-serif text-copper mb-2 md:mb-4">140+</div>
                <p className="text-foreground/70 uppercase tracking-widest text-[10px] md:text-xs">Projects Completed</p>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="text-5xl md:text-6xl lg:text-7xl font-serif text-copper mb-2 md:mb-4">5</div>
                <p className="text-foreground/70 uppercase tracking-widest text-[10px] md:text-xs">Business Sectors</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
