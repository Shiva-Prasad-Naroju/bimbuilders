import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site/nav";

const DEFAULT_DESCRIPTION =
  "We create coordinated BIM models that improve design clarity, reduce conflicts, and support smooth construction — from concept to execution.";

export function pageMetadata(opts: {
  title: string;
  description?: string;
}): Metadata {
  const description = opts.description ?? DEFAULT_DESCRIPTION;
  const title = `${opts.title} — ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}
