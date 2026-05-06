"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, stagger, medium } from "@/lib/motion";

const tools = [
  {
    name: "Autodesk Revit",
    role: "Architecture, Structure, MEP",
    logo: "/images/tech/revit.svg",
  },
  {
    name: "Autodesk Navisworks",
    role: "Clash detection and model review",
    logo: "/images/tech/navisworks.svg",
  },
  {
    name: "AutoCAD",
    role: "2D drafting and documentation",
    logo: "/images/tech/autocad.svg",
  },
  {
    name: "Dynamo",
    role: "Automation scripting for Revit",
    logo: "/images/tech/dynamo.svg",
  },
] as const;

export function TechStack() {
  return (
    <section className="py-20 md:py-28" aria-label="Tools and technology">
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
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  className="group rounded-xl border border-border bg-surface-elevated p-6 text-center transition-all duration-200 hover:border-accent/30 hover:shadow-md hover:-translate-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-background p-2 shadow-sm transition-colors duration-200 group-hover:border-accent/25">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={48}
                      height={48}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{tool.name}</p>
                  <p className="mt-1 text-xs text-text-tertiary leading-relaxed">{tool.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
