"use client";

import { useState } from "react";
import { AIAssistant } from "@/components/site/AIAssistant";
import { SocialContactRail } from "@/components/site/SocialContactRail";

export function SiteContactFloats() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <SocialContactRail
        onChatClick={() => setIsChatOpen((open) => !open)}
        isChatOpen={isChatOpen}
      />
      <AIAssistant isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
