import type { Metadata } from "next";
import { Process } from "@/components/site/Process";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Process",
  description:
    "Discover, model, coordinate, deliver — our structured process from engagement to handover.",
});

export default function ProcessPage() {
  return <Process />;
}
