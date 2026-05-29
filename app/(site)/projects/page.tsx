import type { Metadata } from "next";
import { CaseStudy } from "@/components/site/CaseStudy";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected BIM projects: high-rise office, healthcare, and more — model quality and coordination in practice.",
});

export default function ProjectsPage() {
  return <CaseStudy />;
}
