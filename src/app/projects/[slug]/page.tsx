"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Maximize, CheckCircle, Compass } from "lucide-react";
import { use } from "react";

const projectsData: Record<string, {
  index: string;
  title: string;
  location: string;
  scope: string;
  size: string;
  timeline: string;
  status: string;
  year: string;
  description: string;
  longDescription: string;
  amenities: string[];
  heroImage: string;
  galleryImages: string[];
}> = {
  "luxury-resort": {
    index: "01",
    title: "Luxury Resort",
    location: "Cox's Bazar, Bangladesh",
    scope: "Hospitality & Landscape Design",
    size: "450,000 sq.ft.",
    timeline: "Q4 2027",
    status: "Under Construction",
    year: "2027",
    description: "A five-star luxury beachfront resort along the world's longest natural sandy beach.",
    longDescription: "Nestled along the world's longest natural sandy beach, this five-star beachfront resort redefines coastal luxury. Designed with climate-resilient architecture, the structure integrates local materials — handcrafted bamboo screens, terracotta panels, and weathered timber — into a modernist language that breathes with the coastline.\n\nThe landscape masterplan extends the resort seamlessly into the surrounding ecology, with dune-stabilizing native plantings, tidal observation decks, and a private lagoon carved from the natural shoreline. Every suite faces the Bay of Bengal, framed by floor-to-ceiling glass panels that dissolve the boundary between interior and ocean.",
    amenities: [
      "Private beach access & sun deck",
      "Rooftop infinity pool overlooking Bay of Bengal",
      "Wellness spa & yoga pavilion",
      "Signature seafood & farm-to-ocean dining",
      "Eco-friendly greywater & solar systems",
      "Cultural tour & local crafts program"
    ],
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "urbana-township": {
    index: "02",
    title: "Urbana Township",
    location: "Dhaka, Bangladesh",
    scope: "Masterplanning & Urbanism",
    size: "120 Acres",
    timeline: "2026 – 2030",
    status: "Phase 1 Pre-launch",
    year: "2030",
    description: "A self-sustaining mega-township redefining urban integration in Bangladesh's capital.",
    longDescription: "Urbana Township is conceived as a complete urban ecosystem — a city within a city. The 120-acre masterplan integrates residential towers, corporate campuses, a commercial high-street, and a central park zone around an artificial freshwater lake, all connected by a pedestrian-first circulation network.\n\nThe planning philosophy prioritizes mixed-use density alongside green corridors, ensuring that nature is never more than a 5-minute walk from any dwelling. EV charging infrastructure, a centralized smart grid, and district-level rainwater harvesting are embedded into the infrastructure from the ground up.",
    amenities: [
      "12km integrated jogging tracks & bicycle lanes",
      "Central artificial lake with biotope zones",
      "EV charging network throughout",
      "Commercial high-street with 200+ retail units",
      "24/7 central smart grid security system",
      "International school & medical centre"
    ],
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "ocean-hotel": {
    index: "03",
    title: "Ocean Hotel",
    location: "Kuakata, Bangladesh",
    scope: "Hotel & Resort Development",
    size: "180,000 sq.ft.",
    timeline: "Completed 2025",
    status: "Operative",
    year: "2025",
    description: "A coastal retreat offering panoramic vistas of both sunrise and sunset over the Bay of Bengal.",
    longDescription: "Kuakata is one of the few places on earth where you can watch the sun both rise and set over the ocean. Ocean Hotel was designed to make that singular experience the organizing principle of every space.\n\nCrafted using local wood, hand-cut sandstone, and open-plan facades, the structure invites the ocean breeze while a passive ventilation system eliminates the need for conventional air conditioning in common areas. The hotel operates on a hybrid solar grid, with reverse-osmosis water purification supplying every room and kitchen.",
    amenities: [
      "Sunrise & sunset observation platform",
      "Organic farm-to-table coastal dining",
      "Hybrid solar grid infrastructure",
      "Reverse-osmosis water purification",
      "Traditional crafts & fishing workshop",
      "Private jetty & boat excursions"
    ],
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "prime-apartments": {
    index: "04",
    title: "Prime Apartments",
    location: "Gulshan, Dhaka",
    scope: "High-Rise Residential Architecture",
    size: "24 Premium Duplex Units",
    timeline: "Q3 2026",
    status: "Under Construction",
    year: "2026",
    description: "Bespoke ultra-luxury duplex apartments in Dhaka's most prestigious residential neighbourhood.",
    longDescription: "Prime Apartments occupies a corner plot in Gulshan — Dhaka's most coveted address — and makes no compromise on architectural ambition. The 18-floor tower features just 24 units, ensuring each residence has the scale and privacy of a private home within a vertical address.\n\nThe design language merges clean modernist geometry with biophilic elements: double-height balcony gardens cascade down the façade, while interior partitions use full-height glassmorphic panels to amplify the sense of space. A double-height entry lobby clad in Bangladeshi marble greets residents, and a concierge team is on call around the clock.",
    amenities: [
      "Double-height reception lobby with marble finishes",
      "Private high-speed elevators per unit",
      "Climate-controlled indoor lap pool",
      "Lush rooftop terrace & sky garden",
      "24/7 concierge & valet parking",
      "Smart-home automation in every unit"
    ],
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projectsData[slug];

  if (!project) notFound();

  const slugList = Object.keys(projectsData);
  const currentIndex = slugList.indexOf(slug);
  const nextSlug = slugList[(currentIndex + 1) % slugList.length];
  const nextProject = projectsData[nextSlug];

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-charcoal">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-28 left-6 md:left-12 z-20"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-sans uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            All Projects
          </Link>
        </motion.div>

        {/* Hero text */}
        <div className="absolute bottom-10 md:bottom-16 left-6 md:left-12 right-6 md:right-12 z-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-copper text-xs font-sans uppercase tracking-[0.25em] font-semibold mb-3"
          >
            {project.index} — {project.scope}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tight leading-none mb-4"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/60 font-serif italic text-lg flex items-center gap-2"
          >
            <MapPin size={15} className="text-copper" /> {project.location}
          </motion.p>
        </div>
      </section>

      {/* ── Specs Row ── */}
      <section className="border-b border-foreground/10 bg-background">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/8">
            {[
              { icon: <Maximize size={14} className="text-copper" />, label: "Scale", value: project.size },
              { icon: <Calendar size={14} className="text-copper" />, label: "Timeline", value: project.timeline },
              { icon: <CheckCircle size={14} className="text-copper" />, label: "Status", value: project.status },
              { icon: <MapPin size={14} className="text-copper" />, label: "Location", value: project.location.split(",")[0] },
            ].map((item) => (
              <div key={item.label} className="py-8 px-6 md:px-10 first:pl-0 last:pr-0">
                <p className="text-[9px] font-sans tracking-widest uppercase text-foreground/35 mb-2">{item.label}</p>
                <p className="font-serif italic flex items-center gap-2 text-sm md:text-base text-foreground">
                  {item.icon} {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: pull-quote */}
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-serif text-foreground/80 leading-snug border-l-2 border-copper pl-6"
            >
              &ldquo;{project.description}&rdquo;
            </motion.p>
          </div>

          {/* Right: long form */}
          <div className="lg:col-span-8">
            {project.longDescription.split("\n\n").map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-foreground/75 leading-relaxed text-base md:text-lg font-light mb-6 last:mb-0"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[9px] font-sans tracking-widest uppercase text-foreground/35 mb-8">Gallery / Renders</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className={`relative overflow-hidden bg-charcoal group ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-[4/3]"}`}
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-charcoal text-background">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[9px] font-sans tracking-widest uppercase text-background/35 mb-10">Premium Highlights</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.amenities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 p-6 border border-white/8 hover:border-copper/40 transition-colors duration-400 group"
              >
                <Compass size={16} className="text-copper mt-0.5 flex-shrink-0" />
                <span className="text-sm text-background/80 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next Project ── */}
      <Link href={`/projects/${nextSlug}`} className="block group">
        <div className="relative h-64 md:h-80 overflow-hidden bg-charcoal">
          <Image
            src={nextProject.heroImage}
            alt={nextProject.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-white/40 text-xs font-sans uppercase tracking-widest mb-3">Next Project</p>
            <h2 className="text-white font-serif text-3xl md:text-5xl tracking-tight group-hover:text-copper transition-colors duration-400">
              {nextProject.title} <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
            </h2>
            <p className="text-white/40 text-sm mt-2 font-serif italic">{nextProject.location}</p>
          </div>
        </div>
      </Link>

    </div>
  );
}
