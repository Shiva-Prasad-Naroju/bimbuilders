"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";
import { Box, GitMerge, FileCode2, Workflow } from "lucide-react";

const tools = [
  {
    name: "Autodesk Revit",
    role: "Architecture, Structure, MEP",
    icon: Box,
  },
  {
    name: "Autodesk Navisworks",
    role: "Clash detection and model review",
    icon: GitMerge,
  },
  {
    name: "AutoCAD",
    role: "2D drafting and documentation",
    icon: FileCode2,
  },
  {
    name: "Dynamo",
    role: "Automation scripting for Revit",
    icon: Workflow,
  },
];

export function TechStack() {
  return (
    <section id="stack" className="py-20 md:py-28">
      <Container>
        <motion.div
          variants={stagger(100)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} transition={medium} className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
              Tools &amp; Technology
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Our Engineering Stack
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} transition={medium}>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    className="group rounded-xl border border-border bg-surface-elevated p-6 text-center transition-all duration-200 hover:border-accent/30 hover:shadow-md hover:-translate-y-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4 transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-xs text-text-tertiary leading-relaxed">
                      {tool.role}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
