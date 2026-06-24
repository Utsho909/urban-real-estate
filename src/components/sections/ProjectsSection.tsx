"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Resort",
    location: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Township Dev",
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Ocean Hotel",
    location: "Kuakata",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "Prime Apartments",
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
  }
];

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
}

function ProjectCard({ project, index, total }: { project: Project, index: number, total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // Scale the image down slightly as it comes in
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  // Text comes in from below faster than the card itself
  const textY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div ref={ref} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority={index === 0}
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="absolute bottom-16 md:bottom-32 left-6 md:left-24 z-10"
      >
        <p className="text-copper font-sans uppercase tracking-[0.2em] text-sm md:text-base font-semibold mb-2">
          0{index + 1} / 0{total}
        </p>
        <h2 className="text-5xl md:text-8xl font-serif text-white mb-4 drop-shadow-lg">
          {project.title}
        </h2>
        <div className="flex items-center gap-4 text-white/80">
          <span className="text-lg md:text-2xl font-light">{project.location}</span>
          <div className="w-10 h-[1px] bg-white/40" />
          <button className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold hover:text-copper transition-colors">
            View Project <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-background">
      {/* Intro to the section */}
      <div className="h-screen flex items-center justify-center sticky top-0 bg-background z-0">
        <div className="text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif text-foreground mb-6"
          >
            Our Ventures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg text-foreground/60 max-w-xl mx-auto font-light"
          >
            Explore our expanding portfolio across Real Estate, Hospitality, and Township Development.
          </motion.p>
        </div>
      </div>

      {/* The stacked project cards */}
      <div className="relative z-10">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
