import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "@fontsource/google-sans-flex/latin-400.css";
import "@fontsource/google-sans-flex/latin-500.css";
import "@fontsource/google-sans-flex/latin-ext-400.css";
import "@fontsource/google-sans-flex/latin-ext-500.css";
import "@fontsource/google-sans/latin-400.css";
import "@fontsource/google-sans/latin-500.css";
import "@fontsource/google-sans/latin-ext-400.css";
import "@fontsource/google-sans/latin-ext-500.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "BIM Builders - Precision BIM That Makes Your Designs Build-Ready",
  description:
    "We create coordinated BIM models that improve design clarity, reduce conflicts, and support smooth construction — from concept to execution.",
  icons: {
    icon: [{ url: "/images/bb_logo.png", type: "image/png" }],
    apple: "/images/bb_logo.png",
  },
  openGraph: {
    title: "BIM Builders - Precision BIM That Makes Your Designs Build-Ready",
    description:
      "End-to-end BIM services covering modeling, coordination, documentation, and automation across the project lifecycle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-text-primary antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('dark');localStorage.setItem('theme','dark')}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
