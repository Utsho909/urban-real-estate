"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Send, Loader2, MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax reveal effect
  const contentY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate premium API roundtrip
    await new Promise(resolve => setTimeout(resolve, 1800));
    setStatus("success");
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden pt-24 min-h-screen flex flex-col justify-between">
      
      {/* Scrollable Content */}
      <motion.div style={{ y: contentY }} className="w-full flex-1 flex flex-col pt-12 pb-24 justify-center">
        
        {/* Infinite Marquee Header */}
        <div className="w-full border-y border-black/10 pt-6 pb-6 mb-16 md:mb-24 bg-sand">
          <motion.div 
            animate={{ x: [0, -1036] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex whitespace-nowrap items-center"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center select-none">
                <span className="text-black/20 mx-8 text-4xl">—</span>
                <span className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-black">Talk to us.</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Coordinates & Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <p className="text-xs font-sans tracking-widest text-black/40 uppercase mb-4">Contact Details</p>
              <h1 className="text-4xl md:text-6xl font-serif text-black leading-[1.1] tracking-tight">
                Let&apos;s build <br />
                <span className="text-black/40 italic">together.</span>
              </h1>
            </div>

            {/* Contact cards */}
            <div className="border-t border-black/10 pt-10 space-y-8 text-sm">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-copper flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-1">Headquarters</p>
                  <a 
                    href="https://maps.app.goo.gl/U1EWnV4cT9V9j9Xq7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base text-black hover:text-copper transition-colors font-serif italic"
                  >
                    5th Floor, Plot 1136/A, JCX Business Tower, <br />
                    Road Japan Street, Dhaka 1229, Bangladesh
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-copper flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-1">Call Us</p>
                  <a href="tel:01329737900" className="text-base text-black hover:text-copper transition-colors font-serif italic">
                    +880 1329 737 900
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-copper flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-sans tracking-widest text-black/40 uppercase mb-1">Write Us</p>
                  <a href="mailto:hello@urbanarealestate.com" className="text-base text-black hover:text-copper transition-colors font-serif italic">
                    hello@urbanarealestate.com
                  </a>
                </div>
              </div>

            </div>

            {/* Social Coordinates */}
            <div className="flex gap-6 pt-6 border-t border-black/10">
              {["LinkedIn", "Instagram", "Facebook"].map(soc => (
                <a 
                  key={soc} 
                  href="#" 
                  className="text-xs font-sans tracking-widest text-black/50 hover:text-copper transition-colors uppercase flex items-center gap-1"
                >
                  {soc} <ArrowUpRight size={12} className="text-black/30" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7 bg-sand/40 border border-black/5 p-8 md:p-12 rounded-sm relative">
            <h2 className="text-xl md:text-2xl font-serif text-black mb-8">Send an Inquiry</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Name Field */}
              <div className="relative border-b border-black/15 focus-within:border-copper transition-colors py-2">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formState.name ? "text-[10px] uppercase tracking-widest text-copper -top-4" : "text-sm text-black/40 top-2"
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-none outline-none py-1 text-base text-black font-sans"
                />
              </div>

              {/* Email Field */}
              <div className="relative border-b border-black/15 focus-within:border-copper transition-colors py-2">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formState.email ? "text-[10px] uppercase tracking-widest text-copper -top-4" : "text-sm text-black/40 top-2"
                }`}>
                  Your Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-none outline-none py-1 text-base text-black font-sans"
                />
              </div>

              {/* Subject Field */}
              <div className="relative border-b border-black/15 focus-within:border-copper transition-colors py-2">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formState.subject ? "text-[10px] uppercase tracking-widest text-copper -top-4" : "text-sm text-black/40 top-2"
                }`}>
                  Subject of Inquiry
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-none outline-none py-1 text-base text-black font-sans"
                />
              </div>

              {/* Message Field */}
              <div className="relative border-b border-black/15 focus-within:border-copper transition-colors py-2">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  formState.message ? "text-[10px] uppercase tracking-widest text-copper -top-4" : "text-sm text-black/40 top-2"
                }`}>
                  Message / Details
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-none outline-none py-1 text-base text-black font-sans resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.button
                      key="submit"
                      type="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-white bg-copper hover:bg-black px-6 py-4 transition-all duration-300 rounded-sm shadow-md cursor-pointer"
                    >
                      Send Message <Send size={12} />
                    </motion.button>
                  )}

                  {status === "submitting" && (
                    <motion.button
                      key="submitting"
                      disabled
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-white bg-copper/70 px-6 py-4 rounded-sm shadow-md cursor-not-allowed"
                    >
                      Sending... <Loader2 size={12} className="animate-spin" />
                    </motion.button>
                  )}

                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-600 font-sans font-bold text-xs uppercase tracking-widest"
                    >
                      Inquiry Sent <Check size={16} className="text-emerald-600 border border-emerald-600 rounded-full p-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs text-black/50 text-right max-w-xs font-sans"
                    >
                      Thank you! We will get back to you within 24 hours.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
