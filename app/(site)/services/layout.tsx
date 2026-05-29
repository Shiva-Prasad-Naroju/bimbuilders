import { InternalPageLayout } from "@/components/site/InternalPageLayout";

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
