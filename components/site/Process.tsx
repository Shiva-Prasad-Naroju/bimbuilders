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
    <section
      id="process"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      ref={sectionRef}
      aria-label="Process"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="mb-12 text-center sm:mb-14 md:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">
              Our Process
            </p>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
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

          <div className="space-y-8 sm:space-y-10 md:space-y-16">
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
                  <div className="absolute left-1/2 top-6 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background text-sm font-bold text-accent shadow-sm md:flex">
                    {step.number}
                  </div>

                  {/* Step circle (mobile) */}
                  <div className="absolute left-6 top-5 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background text-[11px] font-bold text-accent sm:h-10 sm:w-10 sm:text-xs md:hidden">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    <div className={`${isLeft ? "md:pr-8" : "md:col-start-2 md:pl-8"} pl-12 md:pl-0`}>
                      <div className="rounded-xl border border-border bg-surface-elevated p-5 transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-6">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent sm:h-10 sm:w-10 sm:rounded-xl">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[14px] leading-relaxed text-text-secondary sm:text-sm">
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
