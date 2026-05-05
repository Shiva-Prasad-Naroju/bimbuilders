import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Trust } from "@/components/site/Trust";
import { Services } from "@/components/site/Services";
import { BIMInAction } from "@/components/site/BIMInAction";
import { Process } from "@/components/site/Process";
import { CaseStudy } from "@/components/site/CaseStudy";
import { TechStack } from "@/components/site/TechStack";
import { DemoCTA } from "@/components/site/DemoCTA";
import { Footer } from "@/components/site/Footer";

import { AIAssistant } from "@/components/site/AIAssistant";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <BIMInAction />
        <Process />
        <CaseStudy />
        <TechStack />
        <DemoCTA />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
