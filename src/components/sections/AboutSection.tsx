"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Translate from 0 to -(total track width - 100vw)
  // Track = 350vw, so we scroll 250vw to expose everything
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-250vw"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="about" className="bg-background">

      {/* ── MOBILE: simple vertical layout ── */}
      <div className="block md:hidden px-6 py-24 space-y-20">

        {/* Heading */}
        <h1 className="text-5xl font-serif text-foreground leading-[1.1] tracking-tight">
          A Legacy of <br /> Growth &amp; <br />
          <span className="text-foreground/40 italic">Excellence.</span>
        </h1>

        {/* Image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-charcoal">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Urbana Group"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl font-serif text-copper mb-6">Who We Are</h2>
          <blockquote className="text-lg text-foreground/80 font-light leading-relaxed border-l-2 border-copper pl-6 mb-6">
            Urbana Group is an emerging business conglomerate with a prosperous and rewarding journey across diverse industries. We have a distinguished and rich history in Real Estate, Textiles, Export-oriented Footwear business, and Medical Testing services.
            <br /><br />
            We are now expanding into new ventures including Hotel management on fully owned lands in Kuakata and Cox's Bazar, a Resort near Dhaka, multiple Township Development Projects, and several Apartment Development Projects in prime locations of Dhaka.
          </blockquote>
          <p className="text-foreground/50 uppercase tracking-widest text-sm">— Urbana Group</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-foreground/10">
          <div className="text-center">
            <div className="text-4xl font-serif text-copper mb-2">25+</div>
            <p className="text-foreground/60 uppercase tracking-widest text-[10px]">Years</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif text-copper mb-2">140+</div>
            <p className="text-foreground/60 uppercase tracking-widest text-[10px]">Projects</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif text-copper mb-2">5</div>
            <p className="text-foreground/60 uppercase tracking-widest text-[10px]">Awards</p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: cinematic horizontal scroll ── */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-[10vw] pl-[10vw] items-center h-full w-[350vw]"
          >
            {/* Panel 1: Heading */}
            <div className="w-[80vw] flex-shrink-0 pt-16">
              <h1 className="text-8xl font-serif text-foreground leading-[1.1] tracking-tight">
                A Legacy of <br /> Growth &amp; <br />
                <span className="text-foreground/40 italic">Excellence.</span>
              </h1>
            </div>

            {/* Panel 2: Image */}
            <div className="w-[40vw] flex-shrink-0 h-[60vh] relative overflow-hidden rounded-sm bg-charcoal">
              <motion.div style={{ scale: imgScale }} className="absolute inset-0 w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Urbana Group"
                  fill
                  sizes="40vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Panel 3: Vision Text */}
            <div className="w-[60vw] flex-shrink-0 pr-[8vw]">
              <h2 className="text-3xl font-serif text-copper mb-8">Who We Are</h2>
              <blockquote className="text-lg text-foreground/80 font-light leading-relaxed mb-8 border-l-2 border-copper pl-8">
                Urbana Group is an emerging business conglomerate with a prosperous and rewarding journey across diverse industries. We have a distinguished and rich history in Real Estate, Textiles, Export-oriented Footwear business, and Medical Testing services.
                <br /><br />
                We are now expanding into new ventures including Hotel management on fully owned lands in Kuakata and Cox's Bazar, a Resort near Dhaka, multiple Township Development Projects, and several Apartment Development Projects in prime locations of Dhaka.
              </blockquote>
              <p className="text-foreground/60 uppercase tracking-widest text-sm font-medium">
                — Urbana Group
              </p>
            </div>

            {/* Panel 4: Stats */}
            <div className="w-[100vw] flex-shrink-0 flex gap-12 items-center justify-start text-center pr-32">
              <div>
                <div className="text-9xl font-serif text-copper mb-4">25+</div>
                <p className="text-foreground/70 uppercase tracking-widest text-sm">Years of Experience</p>
              </div>
              <div className="w-[1px] h-32 bg-foreground/10" />
              <div>
                <div className="text-9xl font-serif text-copper mb-4">140+</div>
                <p className="text-foreground/70 uppercase tracking-widest text-sm">Projects Completed</p>
              </div>
              <div className="w-[1px] h-32 bg-foreground/10" />
              <div>
                <div className="text-9xl font-serif text-copper mb-4">5</div>
                <p className="text-foreground/70 uppercase tracking-widest text-sm">Business Sectors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
