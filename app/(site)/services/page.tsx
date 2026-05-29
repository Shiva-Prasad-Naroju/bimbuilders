import type { Metadata } from "next";
import { Services } from "@/components/site/Services";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "BIM modeling, coordination and clash detection, shop drawings, masonry and LGS detailing, scan-to-BIM, QTO/BOM, modular/prefab, digital twin, and Dynamo automation.",
});

export default function ServicesPage() {
  return <Services />;
}
