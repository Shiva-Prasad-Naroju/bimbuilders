"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import {
  Building2,
  Columns3,
  ScanLine,
  GitMerge,
  Zap,
  Paintbrush,
} from "lucide-react";

const services = [
  {
    id: "architectural",
    icon: Building2,
    title: "Architectural BIM",
    points: [
      "Develop detailed 3D models from concept to construction",
      "Support design visualization and documentation",
      "Improve coordination between design and execution teams",
    ],
  },
  {
    id: "structural",
    icon: Columns3,
    title: "Structural BIM",
    points: [
      "Reinforcement detailing for slabs, beams, columns, and foundations",
      "Coordination-ready models integrated with architectural systems",
      "Accurate drawings to support construction execution",
    ],
  },
  {
    id: "scan-to-bim",
    icon: ScanLine,
    title: "Scan-to-BIM",
    points: [
      "Convert laser scan data into accurate as-built models",
      "Support renovation, retrofitting, and facility management",
      "Capture existing conditions with precision",
    ],
  },
  {
    id: "coordination",
    icon: GitMerge,
    title: "BIM Coordination",
    points: [
      "Integrate architectural, structural, and MEP models",
      "Perform clash detection using Navisworks",
      "Resolve conflicts before construction begins",
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Dynamo Automation",
    points: [
      "Automate repetitive Revit workflows",
      "Improve speed, consistency, and productivity",
      "Reduce manual effort in modeling and documentation",
    ],
  },
  {
    id: "interior",
    icon: Paintbrush,
    title: "Interior Design (SketchUp)",
    points: [
      "Space planning and layout development",
      "Material, lighting, and furniture visualization",
      "Realistic 3D interior representations",
    ],
  },
];

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
              What We Do
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              End-to-end BIM services
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-text-secondary text-lg">
              We provide end-to-end BIM services covering modeling, coordination,
              documentation, and automation across the project lifecycle.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={medium} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedId === service.id;

              return (
                <motion.div
                  key={service.id}
                  className={`group relative rounded-2xl border bg-surface-elevated p-6 sm:p-8 transition-all duration-300 cursor-pointer ${
                    isExpanded
                      ? "border-accent/40 shadow-lg shadow-accent-glow"
                      : "border-border hover:border-accent/20 hover:shadow-md"
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isExpanded ? "bg-accent text-white" : "bg-accent-soft text-accent"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary">{service.title}</h3>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-5 space-y-2.5">
                          {service.points.map((point) => (
                            <li key={point} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <p className="mt-4 text-xs font-medium text-accent">
                      View details &rarr;
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
