import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { SITE_NAME } from "@/lib/site/nav";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Precision BIM That Makes Your Designs Build-Ready`,
  description:
    "We create coordinated BIM models that improve design clarity, reduce conflicts, and support smooth construction — from concept to execution.",
  openGraph: {
    title: `${SITE_NAME} — Precision BIM That Makes Your Designs Build-Ready`,
    description:
      "End-to-end BIM services covering modeling, coordination, documentation, and automation across the project lifecycle.",
    type: "website",
  },
};

export default function HomePage() {
  return <Hero />;
}
