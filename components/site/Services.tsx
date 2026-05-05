"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { stagger, fadeUp, medium } from "@/lib/motion";
import {
  Building2,
  Columns3,
  ScanLine,
  GitMerge,
  Zap,
  ArrowRight
} from "lucide-react";

const servicesData = [
  {
    id: "architectural",
    title: "Architectural BIM",
    subtitle: "Concept to Construction",
    description: "We deliver full-lifecycle 3D modeling that transforms conceptual geometry into execution-ready assets. Our models drastically improve visualization and eliminate costly late-stage revisions by unifying design and execution priorities.",
    points: [
      "Precision 3D modeling workflows",
      "Real-time team collaboration pipelines",
      "Accelerated client approval processes",
    ],
    icon: Building2,
    colors: {
       text: "text-blue-500",
       bg: "bg-blue-500/10",
       border: "border-blue-500/20",
       indicator: "bg-blue-500"
    }
  },
  {
    id: "structural",
    title: "Structural BIM",
    subtitle: "Flawless Execution",
    description: "Ensure foundational integrity with our robust reinforcement detailing. We engineer clash-free structural models that integrate seamlessly with architectural and MEP systems, guaranteeing zero on-site rework.",
    points: [
      "Exact rebar & foundation detailing",
      "Construction-ready layout drawings",
      "Cross-discipline system integration",
    ],
    icon: Columns3,
    colors: {
       text: "text-amber-500",
       bg: "bg-amber-500/10",
       border: "border-amber-500/20",
       indicator: "bg-amber-500"
    }
  },
  {
    id: "scan-to-bim",
    title: "Scan-to-BIM",
    subtitle: "Reality Captured",
    description: "Safely convert high-density point clouds and laser scans into intelligent, exact as-built Revit structures. We provide the absolute precision necessary for sophisticated retrofitting and facility management.",
    points: [
      "High-density laser scan conversion",
      "Intelligent as-built generation",
      "Minimized material waste & delays",
    ],
    icon: ScanLine,
    colors: {
       text: "text-fuchsia-500",
       bg: "bg-fuchsia-500/10",
       border: "border-fuchsia-500/20",
       indicator: "bg-fuchsia-500"
    }
  },
  {
    id: "coordination",
    title: "BIM Coordination",
    subtitle: "Proactive Conflict Resolution",
    description: "We integrate multiple discipline models—Architectural, Structural, and MEP—to proactively pinpoint spatial conflicts. Our preemptive coordination approach secures massive cost and time savings.",
    points: [
      "Comprehensive clash detection",
      "Streamlined conflict resolution",
      "Cost-effective project delivery",
    ],
    icon: GitMerge,
    colors: {
       text: "text-emerald-500",
       bg: "bg-emerald-500/10",
       border: "border-emerald-500/20",
       indicator: "bg-emerald-500"
    }
  },
  {
    id: "automation",
    title: "Dynamo Automation",
    subtitle: "Accelerated Workflows",
    description: "Multiply your design team's output. We author custom Revit API scripts that eradicate repetitive manual tasks—from sheet creation to complex parameter management—ensuring perfect consistency.",
    points: [
      "Custom algorithmic scripting",
      "Elimination of manual operations",
      "Guaranteed operational consistency",
    ],
    icon: Zap,
    colors: {
       text: "text-rose-500",
       bg: "bg-rose-500/10",
       border: "border-rose-500/20",
       indicator: "bg-rose-500"
    }
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === activeTab) || servicesData[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <Container>
        <motion.div
          variants={stagger(40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
        >
          {/* Left Column: Navigation & Header */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start">
            <motion.div variants={fadeUp} transition={medium} className="mb-10 lg:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="h-0.5 w-6 bg-accent/30" />
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-accent">
                  Services We Provide
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                Enterprise BIM Solutions.
              </h2>
              <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed text-balance">
                Precision engineering, sophisticated coordination, and seamless automation crafted to supercharge your design lifecycle.
              </p>
            </motion.div>

            {/* Mobile/Tablet Horizontal Scroll Tabs | Desktop Vertical List */}
            <motion.div 
              variants={fadeUp} 
              transition={medium}
              className="flex overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-col lg:overflow-visible lg:border-l lg:border-border-subtle lg:pl-6 space-x-2 lg:space-x-0 lg:space-y-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x lg:snap-none"
            >
              {servicesData.map((service) => {
                const isActive = activeTab === service.id;
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`group relative flex items-center gap-4 px-4 py-3.5 lg:px-5 lg:py-4 rounded-xl lg:rounded-2xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal snap-start ${
                      isActive
                        ? "bg-surface-elevated text-text-primary shadow-sm ring-1 ring-border"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                    }`}
                  >
                    <Icon 
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isActive ? service.colors.text : `${service.colors.text} opacity-60 group-hover:opacity-100 group-hover:scale-110`
                      }`} 
                    />
                    <span className="text-sm lg:text-base font-medium font-sans">
                      {service.title}
                    </span>
                    {/* Desktop Active Edge Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className={`hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full ${service.colors.indicator}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Display Panel */}
          <motion.div 
            variants={fadeUp} 
            transition={medium}
            className="w-full lg:w-[60%] lg:min-h-[460px]"
          >
            <div className="relative w-full h-full overflow-hidden rounded-3xl bg-surface-elevated border border-border p-8 md:p-12 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full"
                >
                  {/* Internal Panel Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${activeService.colors.bg} ${activeService.colors.text}`}>
                      <ActiveIcon className="h-7 w-7 stroke-[1.5px]" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className={`text-[13px] font-bold uppercase tracking-wider mb-2 block transition-colors duration-500 ${activeService.colors.text}`}>
                      {activeService.subtitle}
                    </span>
                    <h3 className="text-3xl font-semibold tracking-tight text-text-primary">
                      {activeService.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary max-w-xl">
                    {activeService.description}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {activeService.points.map((point, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 text-sm md:text-base font-medium text-text-primary"
                      >
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${activeService.colors.bg} ${activeService.colors.border}`}>
                          <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${activeService.colors.indicator}`} />
                        </div>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto pt-10">
                    <button className={`group flex items-center gap-2 text-sm font-semibold text-text-primary transition-all hover:${activeService.colors.text}`}>
                      Explore capabilities 
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
