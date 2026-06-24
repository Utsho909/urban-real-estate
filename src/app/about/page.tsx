"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AboutSection from "@/components/sections/AboutSection";

const values = [
  {
    number: "01",
    title: "Visionary Innovation",
    description: "Pioneering state-of-the-art designs and masterplans that redefine luxury living and township development."
  },
  {
    number: "02",
    title: "Uncompromising Quality",
    description: "Crafting excellence with premium materials, immaculate engineering, and absolute attention to detail."
  },
  {
    number: "03",
    title: "Sustainable Legacy",
    description: "Integrating eco-conscious landscaping, energy-efficient solutions, and green spaces into every project."
  },
  {
    number: "04",
    title: "Customer Trust",
    description: "Building lifelong relationships on transparency, dependability, and delivering on our promises."
  }
];

const team = [
  {
    name: "Fahim Chowdhury",
    role: "Managing Director",
    bio: "Visionary business leader guiding Urbana Group's expansion across textiles, real estate, and hospitality sectors.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Nyla Rahman",
    role: "Chief Design Officer",
    bio: "Award-winning architect focusing on spatial ergonomics, luxury aesthetics, and sustainable design integration.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tariq Aziz",
    role: "Director of Planning",
    bio: "Veteran urban developer with 20+ years of expertise overseeing infrastructure planning and township projects.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background pt-24"
    >
      {/* Editorial Page Hero */}
      <section className="relative py-20 md:py-32 border-b border-foreground/10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-copper font-sans uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-4"
          >
            About Urbana Group
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif text-foreground tracking-tight leading-[1.0] max-w-6xl mb-6"
          >
            Sculpting landmarks, <br />
            <span className="text-foreground/40 italic">redefining luxury.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-2xl font-light text-foreground/70 max-w-3xl leading-relaxed font-serif italic"
          >
            We align bold architecture with landscape and urbanism, building timeless structures that uplift human experience.
          </motion.p>
        </div>
      </section>

      {/* Heritage & stats Section */}
      <AboutSection />

      {/* Core Values Section */}
      <section className="py-24 md:py-36 bg-charcoal text-background px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <p className="text-copper font-sans uppercase tracking-[0.25em] text-xs font-semibold mb-4">
              Our Principles
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Driven by <span className="text-white/40 italic">purpose &amp; vision.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {values.map((val, idx) => (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 border border-white/10 hover:border-copper/40 transition-colors duration-500 flex flex-col justify-between min-h-[250px] relative overflow-hidden"
              >
                {/* Decorative gold shimmer line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-copper scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div>
                  <span className="text-copper/40 font-mono text-sm block mb-6 group-hover:text-copper transition-colors duration-300">
                    {val.number}
                  </span>
                  <h3 className="text-xl font-serif text-white mb-4">
                    {val.title}
                  </h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 md:py-36 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <p className="text-copper font-sans uppercase tracking-[0.25em] text-xs font-semibold mb-4">
              Governance
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight">
              Leadership <span className="text-foreground/40 italic">Excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal mb-6 rounded-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-copper/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Details */}
                <h3 className="text-2xl font-serif text-foreground group-hover:text-copper transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs font-sans uppercase tracking-widest text-foreground/50 mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed font-light">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
