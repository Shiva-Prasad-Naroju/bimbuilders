"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, medium } from "@/lib/motion";
import { Search, Box, GitMerge, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Define project scope, BIM standards, and requirements.",
  },
  {
    icon: Box,
    number: "02",
    title: "Model",
    description: "Develop detailed BIM models aligned with project needs.",
  },
  {
    icon: GitMerge,
    number: "03",
    title: "Coordinate",
    description: "Identify and resolve clashes across disciplines.",
  },
  {
    icon: PackageCheck,
    number: "04",
    title: "Deliver",
    description: "Provide coordinated models, drawings, and documentation.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 md:py-28" ref={sectionRef} aria-label="Process">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
              Our Process
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Discover &rarr; Model &rarr; Coordinate &rarr; Deliver
            </h2>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Timeline line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full w-full bg-border" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline line (mobile) */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
            <div className="h-full w-full bg-border" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Step circle (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background text-accent font-bold text-sm shadow-sm">
                    {step.number}
                  </div>

                  {/* Step circle (mobile) */}
                  <div className="md:hidden absolute left-6 top-6 -translate-x-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full border-2 border-accent bg-background text-accent font-bold text-xs">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    <div className={`${isLeft ? "md:pr-8" : "md:col-start-2 md:pl-8"} pl-14 md:pl-0`}>
                      <div className="rounded-2xl border border-border bg-surface-elevated p-6 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold text-text-primary">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
