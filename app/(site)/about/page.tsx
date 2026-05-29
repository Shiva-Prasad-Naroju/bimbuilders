import type { Metadata } from "next";
import { About } from "@/components/site/About";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "BIM Builders delivers Architectural, Structural, Scan-to-BIM, Prefabrication, LGS, and Construction Visualization services — turning concepts into coordinated, construction-ready models.",
});

export default function AboutPage() {
  return <About />;
}
