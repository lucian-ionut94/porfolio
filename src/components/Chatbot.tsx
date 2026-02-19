"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import ChatbotRobot from "./ChatbotRobot";

type RobotState = "idle" | "thinking" | "talking" | "waving" | "celebrating";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CELEBRATE_PATTERNS_EN =
  /happy to help|glad i could|perfect|excellent|you're welcome|no problem|anytime/i;
const CELEBRATE_PATTERNS_RO =
  /cu plăcere|cu placere|bucur|succes|nicio problemă|nicio problema|oricând|oricand/i;

export default function Chatbot() {
  const t = useTranslations("chatbot");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [robotState, setRobotState] = useState<RobotState>("idle");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<Message[]>(messages);

  // Keep ref in sync with state to avoid stale closures
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const shouldCelebrate = useCallback(() => {
    const lastMsg = messagesRef.current[messagesRef.current.length - 1];
    if (!lastMsg || lastMsg.role !== "assistant") return false;
    const patterns =
      locale === "ro" ? CELEBRATE_PATTERNS_RO : CELEBRATE_PATTERNS_EN;
    return patterns.test(lastMsg.content);
  }, [locale]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasGreeted) {
      setRobotState("waving");
      setMessages([{ role: "assistant", content: t("greeting") }]);
      setHasGreeted(true);
      setTimeout(() => setRobotState("idle"), 2400);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setRobotState("thinking");
    setIsStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          locale,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let buffer = "";

      setRobotState("talking");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "text_delta") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + parsed.text,
                  };
                }
                return updated;
              });
            }
          } catch {
            // skip malformed JSON
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && !last.content) {
          updated[updated.length - 1] = {
            ...last,
            content: t("error_message"),
          };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
      if (shouldCelebrate()) {
        setRobotState("celebrating");
        setTimeout(() => setRobotState("idle"), 2500);
      } else {
        setRobotState("idle");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const statusText = isStreaming
    ? t("thinking")
    : robotState === "celebrating"
      ? t("celebrating")
      : t("online");

  return (
    <>
      {/* Floating Button — robot instead of icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[60] w-[60px] h-[65px] cursor-pointer"
            aria-label="Open chatbot"
          >
            <div className="absolute top-0 left-0 origin-top-left scale-[0.5]">
              <ChatbotRobot state="waving" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[520px] z-[60] flex flex-col bg-zinc-950 md:rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-gradient-to-r from-zinc-900/90 to-zinc-900/80 backdrop-blur-sm">
              <div className="relative w-[48px] h-[52px] flex-shrink-0">
                <div className="absolute top-0 left-0 origin-top-left scale-[0.4]">
                  <ChatbotRobot
                    state={robotState}
                    className="robot-no-float"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-zinc-100">
                  {t("title")}
                </h3>
                <p className="text-xs text-lime-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block" />
                  {statusText}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                aria-label={t("close")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
              {/* Lime accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-lime-400 text-zinc-900 rounded-br-md"
                          : "bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                      {msg.role === "assistant" &&
                        !msg.content &&
                        isStreaming && (
                          <span className="inline-flex gap-1 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400/80 animate-bounce [animation-delay:0ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400/80 animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400/80 animate-bounce [animation-delay:300ms]" />
                          </span>
                        )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  disabled={isStreaming}
                  className="flex-1 bg-zinc-800 text-zinc-100 text-sm rounded-xl px-4 py-2.5 border border-zinc-700 focus:border-lime-400 focus:outline-none placeholder:text-zinc-500 disabled:opacity-50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-900 disabled:opacity-40 disabled:hover:bg-lime-400 transition-colors cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                  aria-label={t("send")}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
