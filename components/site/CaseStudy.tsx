"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { Building, Building2, Heart } from "lucide-react";

const projects = [
  {
    icon: Building,
    type: "Commercial",
    title: "25-Floor Office Building",
    overview:
      "Fully coordinated commercial BIM project integrating architectural and structural systems using Revit and Navisworks.",
    scope: [
      "Developed architectural and structural models",
      "Coordinated layouts and zoning",
      "Performed clash detection",
      "Produced drawings and 3D visualizations",
    ],
    outcome: [
      "Improved coordination across teams",
      "Reduced design conflicts through early clash detection",
      "Enabled smoother project execution",
    ],
    color: "border-l-blue-500",
  },
  {
    icon: Heart,
    type: "Healthcare",
    title: "Hospital Space Planning",
    overview:
      "Optimized space utilization and workflow efficiency for a healthcare facility using BIM.",
    scope: [
      "Space planning and zoning",
      "Coordination of architectural, structural, and MEP systems",
      "Clash detection and validation",
    ],
    outcome: [
      "Improved spatial efficiency",
      "Better workflow organization",
      "Enhanced coordination between systems",
    ],
    color: "border-l-emerald-500",
  },
  {
    icon: Building2,
    type: "Commercial",
    title: "Commercial Development",
    overview:
      "Delivered coordinated BIM models for a commercial complex to improve collaboration and reduce errors.",
    scope: [
      "Multi-disciplinary BIM modeling",
      "Clash detection and coordination",
      "Documentation and visualization",
    ],
    outcome: [
      "Improved communication between teams",
      "Reduced inconsistencies",
      "Faster design iteration",
    ],
    color: "border-l-amber-500",
  },
];

export function CaseStudy() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-surface">
      <Container>
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
              Projects
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Work that speaks for itself
            </h2>
          </motion.div>

          {/* Project cards */}
          <motion.div variants={fadeUp} transition={medium} className="space-y-6">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  className={`rounded-2xl border border-border border-l-4 ${project.color} bg-surface-elevated overflow-hidden transition-shadow duration-300 hover:shadow-md`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-surface border border-border px-2.5 py-0.5 text-xs font-medium text-text-tertiary">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary mb-5">
                      {project.overview}
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Scope */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                          Scope
                        </p>
                        <ul className="space-y-1.5">
                          {project.scope.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-text-secondary">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcome */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                          Outcome
                        </p>
                        <ul className="space-y-1.5">
                          {project.outcome.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-text-secondary">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
