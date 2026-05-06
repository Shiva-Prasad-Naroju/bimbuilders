import { InternalPageLayout } from "@/components/site/InternalPageLayout";

export default function InternalSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
