"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "luxury-resort",
    index: "01",
    title: "Luxury Resort",
    location: "Cox's Bazar",
    scope: "Hospitality",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    aspect: "tall",   // tall card
  },
  {
    id: "urbana-township",
    index: "02",
    title: "Urbana Township",
    location: "Dhaka",
    scope: "Masterplanning",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    aspect: "wide",   // wide card spanning 2 cols
  },
  {
    id: "ocean-hotel",
    index: "03",
    title: "Ocean Hotel",
    location: "Kuakata",
    scope: "Hotel & Resort",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    aspect: "square",
  },
  {
    id: "prime-apartments",
    index: "04",
    title: "Prime Apartments",
    location: "Dhaka",
    scope: "Residential",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    aspect: "tall",
  },
];

export default function ProjectsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-copper font-sans uppercase tracking-[0.25em] text-xs font-semibold mb-4"
          >
            Portfolio
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-none"
            >
              Our <span className="italic text-foreground/35">Ventures.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm text-foreground/50 max-w-xs leading-relaxed"
            >
              {projects.length} projects across real estate, hospitality and urban development.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

          {/* Card 1 — tall, col 1 row 1+2 */}
          <ProjectCard project={projects[0]} delay={0} hovered={hoveredId} setHovered={setHoveredId}
            className="lg:row-span-2"
            aspectClass="aspect-[3/4] lg:aspect-auto lg:h-full min-h-[480px]"
          />

          {/* Card 2 — wide, col 2+3 row 1 */}
          <ProjectCard project={projects[1]} delay={0.08} hovered={hoveredId} setHovered={setHoveredId}
            className="md:col-span-1 lg:col-span-2"
            aspectClass="aspect-[16/9]"
          />

          {/* Card 3 — col 2, row 2 */}
          <ProjectCard project={projects[2]} delay={0.14} hovered={hoveredId} setHovered={setHoveredId}
            className=""
            aspectClass="aspect-[4/3]"
          />

          {/* Card 4 — col 3, row 2 */}
          <ProjectCard project={projects[3]} delay={0.2} hovered={hoveredId} setHovered={setHoveredId}
            className=""
            aspectClass="aspect-[4/3]"
          />

        </div>

        {/* Bottom line */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-foreground/10 text-[11px] font-sans uppercase tracking-widest text-foreground/30">
          <span>{projects.length} Projects Total</span>
          <span>Urbana Group · Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  delay,
  hovered,
  setHovered,
  className = "",
  aspectClass = "aspect-[4/3]",
}: {
  project: typeof projects[0];
  delay: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  className?: string;
  aspectClass?: string;
}) {
  const isHovered = hovered === project.id;
  const isDimmed  = hovered !== null && !isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ opacity: isDimmed ? 0.55 : 1, transition: "opacity 0.4s ease" }}
      className={`relative overflow-hidden bg-charcoal group ${aspectClass} ${className}`}
      onMouseEnter={() => setHovered(project.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-30" aria-label={project.title} />

      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={project.index === "01"}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Top-right index */}
      <div className="absolute top-5 right-5 z-20">
        <span className={`font-mono text-xs transition-colors duration-300 ${isHovered ? "text-copper" : "text-white/30"}`}>
          {project.index}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <p className={`text-[10px] font-sans uppercase tracking-widest mb-1.5 transition-colors duration-300 ${isHovered ? "text-copper" : "text-white/40"}`}>
          {project.scope} · {project.location}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl leading-tight">
            {project.title}
          </h2>
          <div className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-400 ${
            isHovered ? "bg-copper border-copper" : "bg-transparent border-white/25"
          }`}>
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
