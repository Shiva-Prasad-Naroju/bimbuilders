import type { Metadata } from "next";
import { Contact } from "@/components/site/Contact";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start your project with BIM Builders — reach us by email, phone, or the inquiry form.",
});

export default function ContactPage() {
  return <Contact />;
}
