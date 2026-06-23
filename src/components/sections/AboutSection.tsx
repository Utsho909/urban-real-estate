"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate the content horizontally
  // We want to move from x: 0 to x: -100% of the scrollable width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  
  // Parallax for the image inside the sliding container
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section id="about" ref={targetRef} className="relative h-[300vh] bg-background">
      {/* Sticky container that stays in view while we scroll past 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* The horizontal sliding track */}
        <motion.div style={{ x }} className="flex gap-[10vw] pl-[10vw] pr-[20vw] items-center h-full w-[200vw]">
          
          {/* Panel 1: Heading */}
          <div className="w-[80vw] flex-shrink-0 pt-16">
            <h1 className="text-5xl md:text-8xl font-serif text-foreground leading-[1.1] tracking-tight">
              A Legacy of <br /> Growth &amp; <br />
              <span className="text-foreground/40 italic">Excellence.</span>
            </h1>
          </div>

          {/* Panel 2: Image */}
          <div className="w-[60vw] md:w-[40vw] flex-shrink-0 h-[60vh] relative overflow-hidden rounded-sm bg-charcoal">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Founder Julian Vance"
                fill
                sizes="(max-width: 768px) 60vw, 40vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Panel 3: Vision Text */}
          <div className="w-[80vw] md:w-[60vw] flex-shrink-0">
            <h2 className="text-3xl font-serif text-champagne mb-8">Who We Are</h2>
            <blockquote className="text-xl md:text-3xl text-foreground/80 font-light leading-relaxed mb-8 border-l-2 border-copper pl-8 md:pl-12">
              Urbana Group is an emerging business conglomerate with a prosperous and rewarding journey across diverse industries. We have a distinguished and rich history in Real Estate, Textiles, Export-oriented Footwear business, and Medical Testing services.
              <br /><br />
              We are now expanding into new ventures including Hotel management on fully owned lands in Kuakata and Cox’s Bazar, a Resort near Dhaka, multiple Township Development Projects, and several Apartment Development Projects in prime locations of Dhaka.
            </blockquote>
            <p className="text-foreground/60 uppercase tracking-widest text-sm font-medium">
              — Urbana Group
            </p>
          </div>

          {/* Panel 4: Stats */}
          <div className="w-[100vw] flex-shrink-0 flex gap-12 items-center justify-start text-center pr-32">
            <div>
              <div className="text-6xl md:text-9xl font-serif text-copper mb-4">25+</div>
              <p className="text-foreground/70 uppercase tracking-widest text-sm">Years of Experience</p>
            </div>
            <div className="w-[1px] h-32 bg-foreground/10" />
            <div>
              <div className="text-6xl md:text-9xl font-serif text-copper mb-4">140+</div>
              <p className="text-foreground/70 uppercase tracking-widest text-sm">Projects Completed</p>
            </div>
            <div className="w-[1px] h-32 bg-foreground/10" />
            <div>
              <div className="text-6xl md:text-9xl font-serif text-copper mb-4">5</div>
              <p className="text-foreground/70 uppercase tracking-widest text-sm">Design Awards</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
