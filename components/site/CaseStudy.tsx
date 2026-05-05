"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { Building, Building2, Heart, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, X } from "lucide-react";

const projects = [
  {
    type: "Commercial",
    title: "25-Floor Office Building",
    image: "/images/25FloorBuilding.png",
    overview:
      "Fully coordinated commercial BIM project integrating architectural and structural systems using Revit and Navisworks. We delivered absolute precision from concept to final drawings.",
    scope: [
      "Comprehensive architectural & structural models",
      "Intelligent layouts and zoning coordination",
      "Advanced 3D clash detection workflows",
      "Construction-ready layout visualizations",
    ],
    outcome: [
      "Drastically improved inter-team coordination",
      "Eradicated design conflicts before execution",
      "Secured massive time and cost savings",
    ],
    colors: { text: "text-blue-500", bg: "bg-blue-500", bgLight: "bg-blue-500/5", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
    badgeLabel: "Featured Architecture",
    icon: Building,
    gallery: [
      "/images/25F_ProjectImages/1.avif",
      "/images/25F_ProjectImages/2.avif",
      "/images/25F_ProjectImages/3.avif",
      "/images/25F_ProjectImages/4.avif",
      "/images/25F_ProjectImages/5.avif",
      "/images/25F_ProjectImages/7.avif",
      "/images/25F_ProjectImages/8.avif",
      "/images/25F_ProjectImages/9.avif",
    ]
  },
  {
    type: "Healthcare",
    title: "Hospital Space Planning",
    image: "/images/Hospital.jpeg",
    overview:
      "Optimized space utilization and incredibly dense MEP workflow efficiency for a master healthcare facility using cutting-edge BIM modeling.",
    scope: [
      "Rigorous space planning and zoning",
      "Coordination of Architectural, Structural & MEP",
      "Pre-construction spatial clash validation",
      "Advanced medical equipment zoning",
    ],
    outcome: [
      "Maximized spatial and operational efficiency",
      "Optimized acute medical workflow routing",
      "Flawless multi-disciplinary system integration",
    ],
    colors: { text: "text-emerald-500", bg: "bg-emerald-500", bgLight: "bg-emerald-500/5", glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
    badgeLabel: "Healthcare Infrastructure",
    icon: Heart,
    gallery: [
      "/images/Hospital_ProjectImages/1.avif",
      "/images/Hospital_ProjectImages/2.avif",
      "/images/Hospital_ProjectImages/3.avif",
      "/images/Hospital_ProjectImages/4.avif",
      "/images/Hospital_ProjectImages/5.avif",
      "/images/Hospital_ProjectImages/6.avif",
      "/images/Hospital_ProjectImages/7.avif",
      "/images/Hospital_ProjectImages/8.avif",
      "/images/Hospital_ProjectImages/9.avif",
      "/images/Hospital_ProjectImages/10.avif",
    ],
  },
  {
    type: "Commercial",
    title: "Vaageswari solutions",
    image: "/images/VageshwariSolutions.jpeg",
    overview:
      "Delivered intelligently coordinated, high-fidelity BIM models for the Vaageswari solutions complex to accelerate enterprise collaboration and eradicate structural design errors.",
    scope: [
      "Multi-disciplinary intricate BIM modeling",
      "Proactive spatial and structural coordination",
      "High-fidelity execution documentation generation",
      "Real-time visual simulation rendering",
    ],
    outcome: [
      "Synchronized communication between engineering units",
      "Absolute reduction of logical execution inconsistencies",
      "Accelerated master design delivery phases",
    ],
    colors: { text: "text-amber-500", bg: "bg-amber-500", bgLight: "bg-amber-500/5", glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]" },
    badgeLabel: "Enterprise Development",
    icon: Building2,
    gallery: [
      "/images/VaageswariSolutions/1.avif",
      "/images/VaageswariSolutions/2.avif",
      "/images/VaageswariSolutions/3.avif",
      "/images/VaageswariSolutions/4.avif",
      "/images/VaageswariSolutions/5.avif",
    ],
  },
];

export function CaseStudy() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    if (expandedProjectIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedProjectIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setExpandedProjectIndex(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setExpandedProjectIndex(null);
  };

  return (
    <section id="projects" className="relative py-24 md:py-36 bg-surface overflow-hidden">
      {/* Soft Animated Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] opacity-70 pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <Container className="relative z-10 max-w-7xl">
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Header Section */}
          <motion.div variants={fadeUp} transition={medium} className="w-full text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-0.5 w-6 bg-accent/30" />
              </span>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-accent">
                Case Studies
              </p>
            </div>
            <h2 className="text-4xl text-pretty font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              Work that speaks for itself.
            </h2>
          </motion.div>

          {/* Premium Segmented Navigation Tabs */}
          <motion.div variants={fadeUp} transition={medium} className="w-full max-w-5xl mx-auto mb-12 sm:mb-16 px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-12">
              {projects.map((project, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setExpandedProjectIndex(null);
                    }}
                    className="group relative flex-1 w-full text-left transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-3 px-2">
                      <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? project.colors.text : 'text-text-tertiary group-hover:text-text-secondary'}`}>
                        0{idx + 1} //
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-500 ${isActive ? 'text-text-primary' : 'text-text-tertiary group-hover:text-text-secondary'}`}>
                        {project.badgeLabel}
                      </span>
                    </div>

                    {/* Progress Track Line */}
                    <div className="h-1.5 w-full rounded-full bg-surface-elevated border border-border overflow-hidden relative">
                       {isActive && (
                         <motion.div 
                           layoutId="activeSlideIndicator"
                           className={`absolute inset-y-0 left-0 right-0 rounded-full ${project.colors.bg} ${project.colors.glow}`}
                           transition={{ type: "spring", stiffness: 300, damping: 30 }}
                         />
                       )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive Drag Track Window with Flanking Arrows */}
          <motion.div variants={fadeUp} transition={medium} className="w-full relative px-0 sm:px-14 lg:px-20 py-4">
            
            {/* Flanking Left Arrow */}
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 items-center justify-center h-14 w-14 rounded-full border border-border bg-surface-elevated/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-text-secondary hover:text-accent hover:border-accent hover:scale-110 transition-all duration-300"
              aria-label="Previous Project"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Flanking Right Arrow */}
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 items-center justify-center h-14 w-14 rounded-full border border-border bg-surface-elevated/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-text-secondary hover:text-accent hover:border-accent hover:scale-110 transition-all duration-300"
              aria-label="Next Project"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Drag Container */}
            <div className={`w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-surface-elevated transition-all duration-700 ${expandedProjectIndex !== null ? 'ring-2 ring-border/50' : ''}`}>
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 32, mass: 0.9 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(e, { offset }) => {
                  const threshold = 50; // pixels
                  if (offset.x < -threshold) {
                    nextSlide();
                  } else if (offset.x > threshold) {
                    prevSlide();
                  }
                }}
              >
                {projects.map((project, idx) => {
                  const Icon = project.icon;
                  const isExpanded = expandedProjectIndex === idx;
                  
                  return (
                    <div key={idx} className="w-full shrink-0 flex flex-col lg:flex-row lg:min-h-[640px] pointer-events-auto">
                      
                      {/* Left Content Half */}
                      <div className="relative z-20 flex w-full lg:w-[45%] flex-col justify-between p-8 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-border/50 bg-surface-elevated">
                        <div>
                          <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-8 backdrop-blur-md shadow-sm pointer-events-none`}>
                            <Icon className={`h-3.5 w-3.5 ${project.colors.text}`} />
                            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ${project.colors.text}`}>
                              {project.title}
                            </span>
                          </div>

                          <h3 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary text-balance leading-[1.1] pointer-events-none">
                            {project.title}
                          </h3>
                          
                          <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-balance pointer-events-none">
                            {project.overview}
                          </p>
                        </div>

                        <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 pointer-events-none">
                          <div>
                            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-tertiary mb-4">Project Scope</h4>
                            <ul className="space-y-3">
                              {project.scope.map((item, i) => (
                                <li key={i} className="flex items-start text-[13px] sm:text-sm font-medium text-text-primary leading-snug">
                                  <span className={`mt-1.5 mr-3 h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_8px_currentColor] ${project.colors.text} ${project.colors.bg}`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 ${project.colors.text}`}>Key Outcomes</h4>
                            <ul className="space-y-3">
                              {project.outcome.map((item, i) => (
                                <li key={i} className="flex items-start text-[13px] sm:text-sm font-medium text-text-primary leading-snug">
                                  <span className={`mt-1.5 mr-3 h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_8px_currentColor] ${project.colors.text} ${project.colors.bg}`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border/50">
                          {project.gallery ? (
                            <button 
                              onClick={() => setExpandedProjectIndex(isExpanded ? null : idx)}
                              className={`group flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${project.colors.text} hover:opacity-80`}
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? "Close Gallery" : "Explore Details"}
                              <span className={`flex items-center justify-center h-8 w-8 rounded-full border border-current ${project.colors.bgLight} transition-transform duration-500 ${isExpanded ? 'group-hover:-translate-y-1' : 'group-hover:translate-y-1'}`}>
                                {isExpanded ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                              </span>
                            </button>
                          ) : (
                            <button className={`group flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-40 cursor-not-allowed ${project.colors.text}`} disabled>
                              Coming Soon
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Image Half */}
                      <div className={`relative w-full lg:w-[55%] min-h-[400px] sm:min-h-[500px] lg:min-h-full flex items-center justify-center overflow-hidden group border-l border-border/50 ${project.title.includes('Hospital') ? 'bg-white' : 'p-8 md:p-12 bg-gradient-to-br from-surface to-surface-elevated'}`}>
                        {/* Background layers conditioned upon project type */}
                        {project.title.includes('Hospital') ? (
                          <div className="absolute inset-0 z-10 bg-gradient-to-r from-surface-elevated/40 via-transparent to-transparent pointer-events-none transition-colors duration-1000" />
                        ) : (
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] ${project.colors.bgLight} blur-[120px] rounded-full pointer-events-none transition-colors duration-[1.5s]`} />
                        )}
                        
                        <div className="relative z-10 w-full h-full min-h-[400px] lg:min-h-[640px] pointer-events-none flex items-center justify-center">
                          <div className="relative w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                              <Image 
                                src={project.image}
                                alt={`${project.title} BIM Render`}
                                fill
                                draggable={false}
                                className={`${project.title.includes('Hospital') ? 'object-cover' : 'object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]'} object-center`}
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                quality={100}
                                priority={idx === 0}
                              />
                          </div>
                        </div>
                        
                        {/* Elegant Minimal Badge */}
                        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border shadow-xl px-5 py-2.5 transition-transform duration-700 hover:scale-105 pointer-events-none">
                          <Icon className={`h-4 w-4 ${project.colors.text}`} />
                          <span className="text-[10px] font-bold text-text-primary tracking-[0.1em] uppercase">Original Output</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Cinematic Overlay Modal Full Gallery */}
            <AnimatePresence>
              {expandedProjectIndex !== null && projects[expandedProjectIndex].gallery && (
                <>
                  {/* Fixed close button - separate from scrollable content */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpandedProjectIndex(null)}
                    className="fixed top-20 right-4 md:top-24 md:right-8 flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-surface-elevated border border-border shadow-md hover:scale-110 transition-all duration-300 text-text-secondary hover:text-text-primary z-[120]"
                    aria-label="Close Gallery"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>

                  {/* Scrollable overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] overflow-y-auto bg-surface/95 backdrop-blur-xl"
                  >

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full relative z-[105]"
                  >
                    
                    {/* Header */}
                    <div className="text-center py-12 md:py-16 px-4 max-w-3xl mx-auto">
                       <span className={`inline-block mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-border bg-surface ${projects[expandedProjectIndex].colors.text}`}>
                         {projects[expandedProjectIndex].title}
                       </span>
                       <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight text-balance">
                         Project Gallery
                       </h3>
                       <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                         A comprehensive look into the architectural execution of the {projects[expandedProjectIndex].title}.
                       </p>
                    </div>

                    {/* Full-width images stacked vertically with side padding */}
                    <div className="flex flex-col px-8 sm:px-16 md:px-28 lg:px-40 xl:px-52 gap-8 md:gap-12">
                      {projects[expandedProjectIndex].gallery?.map((img, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           viewport={{ once: true, margin: "-5%" }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                           className="w-full flex items-center justify-center"
                         >
                            <Image 
                               src={img} 
                               alt={`${projects[expandedProjectIndex].title} - View ${i+1}`} 
                               width={2400}
                               height={1600}
                               className="w-full h-auto block max-h-[85vh] object-contain" 
                               sizes="100vw"
                               quality={100}
                            />
                         </motion.div>
                      ))}
                    </div>

                    {/* Bottom Close Action */}
                    <div className="py-12 flex justify-center bg-surface">
                      <button 
                        onClick={() => setExpandedProjectIndex(null)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full bg-surface-elevated border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm font-bold uppercase tracking-widest ${projects[expandedProjectIndex].colors.text}`}
                      >
                        Close Gallery
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                  </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
