import Image from "next/image";
import { InternalPageLayout } from "@/components/site/InternalPageLayout";

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate min-h-screen">
      {/* Full-page background — fixed so it stays put while scrolling */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src="/images/slides/bim-arch-and-structure.avif"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Colour-preserving overlay — keeps image vivid but readable */}
        <div className="absolute inset-0 bg-background/60" />
        {/* Directional fade: left stays readable, right opens up */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.65) 40%, rgba(9,9,11,0.30) 70%, rgba(9,9,11,0.10) 100%)",
          }}
        />
        {/* Brand blue glow — top right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 90% 10%, rgba(59,130,246,0.22) 0%, transparent 65%)",
          }}
        />
        {/* Warm amber tint — bottom left, for colour interest */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 8% 92%, rgba(251,191,36,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <InternalPageLayout>{children}</InternalPageLayout>
    </div>
  );
}
