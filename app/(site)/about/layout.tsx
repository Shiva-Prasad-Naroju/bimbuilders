import { InternalPageLayout } from "@/components/site/InternalPageLayout";

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
