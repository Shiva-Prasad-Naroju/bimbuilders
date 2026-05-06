import type { Metadata } from "next";
import { Trust } from "@/components/site/Trust";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "BIM Builders — LOD 300–500 precision, architecture and structure coordination, Dynamo automation, and international standards.",
});

export default function AboutPage() {
  return <Trust />;
}
