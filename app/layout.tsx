import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BIM Builders — Precision BIM That Makes Your Designs Build-Ready",
  description:
    "We create coordinated BIM models that improve design clarity, reduce conflicts, and support smooth construction — from concept to execution.",
  icons: {
    icon: [{ url: "/images/bb_logo.png", type: "image/png" }],
    apple: "/images/bb_logo.png",
  },
  openGraph: {
    title: "BIM Builders — Precision BIM That Makes Your Designs Build-Ready",
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
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
