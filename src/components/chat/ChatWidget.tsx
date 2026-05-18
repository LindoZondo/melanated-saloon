"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChatBubbleLeftRight, HiXMark, HiPaperAirplane, HiSparkles } from "react-icons/hi2";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey queen! 👑 I'm your AI beauty assistant. I can help you find the perfect style, answer questions about our services, or recommend products for your hair type. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || "I'm here to help! Could you rephrase that?",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again in a moment.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-gold shadow-gold-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {isOpen ? (
          <HiXMark className="text-deep-900 text-xl" />
        ) : (
          <HiChatBubbleLeftRight className="text-deep-900 text-xl" />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] card-luxury flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold-700/20 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <HiSparkles className="text-deep-900" />
              </div>
              <div>
                <h3 className="text-cream-50 font-semibold text-sm">
                  Beauty AI Assistant
                </h3>
                <p className="text-green-400 text-xs">● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      message.role === "user"
                        ? "bg-gold-500 text-deep-900"
                        : "bg-melanin-800/50 text-cream-100 border border-gold-700/10"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-melanin-800/50 border border-gold-700/10 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gold-700/20">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about styles, products..."
                  className="flex-1 bg-melanin-800/50 border border-gold-700/20 rounded-full px-4 py-2.5 text-sm text-cream-50 placeholder-melanin-400 focus:border-gold-500 outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-colors disabled:opacity-50"
                >
                  <HiPaperAirplane className="text-deep-900 text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
