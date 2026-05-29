"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function FormattedMessage({ content }: { content: string }) {
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph, pIdx) => {
        // Handle bold text **bold**
        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
        
        return (
          <p key={pIdx} className="leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={i} className="font-bold text-text-primary">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              // Handle single newlines as line breaks
              return part.split("\n").map((line, lIdx, array) => (
                <span key={lIdx}>
                  {line}
                  {lIdx < array.length - 1 && <br />}
                </span>
              ));
            })}
          </p>
        );
      })}
    </div>
  );
}

export function AIAssistant({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I can help you with **BIM services**. What do you need help with?\n\n1. **BIM Modeling**\n2. **Clash Detection**\n3. **Shop Drawings**\n4. **Scan to BIM**\n5. **Quantity Takeoff**\n6. **Not sure** — help me decide",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }].map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again or contact us directly at **info@bimbuilders.in**",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="bim-assistant-panel"
            role="dialog"
            aria-modal="true"
            aria-label="BIM Assistant chat"
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
            }}
            // Mobile: compact popup anchored bottom-right (~20rem × 28rem),
            // doesn't blanket the page. sm+ keeps the original generous size.
            className="fixed right-4 z-[100] flex h-[min(28rem,calc(100dvh-7rem))] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl backdrop-blur-xl sm:right-6 sm:h-[min(35rem,calc(100dvh-6rem))] sm:w-[min(25rem,calc(100vw-3rem))]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-accent/5 p-3 sm:p-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 sm:h-10 sm:w-10">
                  <Bot className="h-4 w-4 text-accent sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-text-primary sm:text-sm">BIM Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-text-tertiary">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="hidden h-4 w-4 text-accent/50 sm:block" />
                <button
                  onClick={() => onOpenChange(false)}
                  className="rounded-full p-1 text-text-tertiary hover:bg-border hover:text-text-primary transition-colors"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 scroll-smooth sm:space-y-6 sm:p-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[88%] items-start gap-2 sm:gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border sm:h-8 sm:w-8 ${m.role === "user" ? "bg-accent text-white" : "bg-surface"}`}>
                      {m.role === "user" ? <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </div>
                    <div className={`rounded-2xl px-3 py-2.5 text-[13px] leading-relaxed tracking-tight sm:px-4 sm:py-3 sm:text-sm ${
                      m.role === "user"
                        ? "bg-accent text-white rounded-tr-none"
                        : "bg-surface border border-border text-text-secondary rounded-tl-none shadow-sm"
                    }`}>
                      <FormattedMessage content={m.content} />
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span className="text-xs text-text-tertiary">BIM Assistant is typing...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border bg-surface p-3 sm:p-4"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2.5 pr-11 text-[13px] text-text-primary transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:px-4 sm:py-3 sm:pr-12 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white transition-all hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent sm:right-2 sm:h-9 sm:w-9"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" /> : <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
