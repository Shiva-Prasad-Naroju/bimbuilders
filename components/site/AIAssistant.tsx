"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

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

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
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
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ rotate: 10 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            1
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[100] flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl backdrop-blur-xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-accent/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <Bot className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">BIM Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-text-tertiary">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent/50" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-text-tertiary hover:bg-border hover:text-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border ${m.role === "user" ? "bg-accent text-white" : "bg-surface"}`}>
                      {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm tracking-tight ${
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
              className="border-t border-border p-4 bg-surface"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our BIM services..."
                  className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 pr-12 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white transition-all hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
