import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="min-h-dvh pt-16 outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
