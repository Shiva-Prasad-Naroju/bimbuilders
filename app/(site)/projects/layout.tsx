import { InternalPageLayout } from "@/components/site/InternalPageLayout";

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <InternalPageLayout>{children}</InternalPageLayout>;
}
