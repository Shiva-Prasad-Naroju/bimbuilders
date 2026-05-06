import type { Metadata } from "next";
import { BIMInAction } from "@/components/site/BIMInAction";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "BIM in Action",
  description:
    "See coordinated models, clash detection, and resolution workflows — how BIM comes together in practice.",
});

export default function BIMInActionPage() {
  return <BIMInAction />;
}
