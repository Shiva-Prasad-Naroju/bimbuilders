import type { Metadata } from "next";
import { TechStack } from "@/components/site/TechStack";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Tools & Technology",
  description:
    "Our engineering stack: Revit, Navisworks, AutoCAD, Dynamo — the tools we use to deliver build-ready BIM.",
});

export default function ToolsPage() {
  return <TechStack />;
}
