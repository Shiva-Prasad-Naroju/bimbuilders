import type { Metadata } from "next";
import { Services } from "@/components/site/Services";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Architectural BIM, structural BIM, scan-to-BIM, coordination, and Dynamo automation — from concept to construction.",
});

export default function ServicesPage() {
  return <Services />;
}
