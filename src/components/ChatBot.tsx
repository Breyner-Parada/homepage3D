import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { OpenRouter } from "@openrouter/sdk";
import { BsRobot } from "react-icons/bs";
import Loading from "./Loading";
// import OpenAI from "openai";

// Workaround for react-icons type incompatibility with some TypeScript setups:
// cast the imported icon to a React component type so it can be used in JSX.
const RobotIcon = BsRobot as unknown as React.ComponentType<{ size?: number }>;

/**
 * ChatBot.tsx
 *
 * Simple chatbot UI that:
 * - Gathers a snapshot of the current page content (title, url, visible text).
 * - Sends user questions + page content to an LLM-backed endpoint (OpenRouter by default).
 * - Tries to call a local backend at /api/chat (recommended for security).
 * - If an OpenRouter key is present in the build env it will call OpenRouter directly from the browser (NOT recommended for production).
 *
 * Notes for integration:
 * - Recommended: implement a server endpoint (POST /api/chat) that accepts JSON { messages: ChatMessage[], pageContent: string }
 *   and proxies the request to OpenAI using your server-side OpenAI API key, then returns the assistant reply.
 * - If you want to call OpenAI directly from the browser (not recommended), set one of:
 *     REACT_APP_OPENAI_KEY (for CRA), VITE_OPENAI_KEY (for Vite as import.meta.env.VITE_OPENAI_KEY),
 *     or window.ENV_OPENAI_KEY before mounting the app.
 */

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const uid = (n = 8) =>
  Math.random()
    .toString(36)
    .slice(2, 2 + n);

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Hi — I can answer questions about this website. Ask me anything about the site or its owner.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageContent, setPageContent] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Gather an excerpt of page text (avoid extremely large payloads)
    try {
      const title = document.title || "";
      const url = window.location.href || "";
      // visible text only to avoid script/style content
      const bodyText = (() => {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              if (!node || !node.nodeValue) return NodeFilter.FILTER_REJECT;
              // filter out empty or whitespace-only nodes
              if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
              // skip script/style text nodes
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              const tag = parent.tagName?.toLowerCase();
              if (tag === "script" || tag === "style" || tag === "noscript")
                return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            },
          }
        );
        const chunks: string[] = [];
        while (walker.nextNode()) {
          const t = walker.currentNode?.nodeValue?.trim();
          if (t) chunks.push(t);
          if (chunks.join(" ").length > 15000) break; // cap size
        }
        return chunks.join(" ");
      })();

      const excerpt = `${title}\n${url}\n\n${bodyText}`.slice(0, 16000);
      setPageContent(excerpt);
    } catch (err) {
      setPageContent(
        `${document.title || ""}\n${
          window.location.href || ""
        }\nPage content unavailable.`
      );
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const openRouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  });

  // Form submit handler: send the user message locally (implement real LLM call on server)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build system message with page content to provide context
      const systemWithPage = {
        role: "system",
        content:
          "You are an assistant. Use the following page content when answering user questions about the site or its owner. If the question is not about the site, answer normally.\n\n---PAGE CONTENT START---\n" +
          pageContent +
          "\n---PAGE CONTENT END---",
      };

      const model = "meta-llama/llama-4-maverick:free"; // OpenRouter model

      // Create the chat completion via OpenRouter SDK
      const resp = await openRouter.chat.send({
        model,
        messages: [systemWithPage, { role: "user", content: text }],
      } as any);

      // Extract assistant text from possible response shapes
      const assistantText: string | null =
        (resp as any)?.choices?.[0]?.message?.content ||
        (resp as any)?.output?.[0]?.content?.[0]?.text ||
        (resp as any)?.result?.output ||
        null;

      if (!assistantText) {
        throw new Error("No assistant reply received from OpenRouter.");
      }

      const reply: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: assistantText,
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: `Error: ${err?.message || err}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Chat panel */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 8, scale: 0.98 }
        }
        transition={{ duration: 0.18 }}
        className="mb-3"
        aria-hidden={!isOpen}
      >
        <div className="w-[360px] max-w-[calc(100%-32px)] shadow-lg rounded-xl overflow-hidden font-sans bg-white">
          <div className="p-3 border-b bg-gray-100 flex items-center justify-between">
            <div>
              <strong className="text-sm text-[#804dee]">Site Assistant</strong>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="ml-3 p-1 rounded-md hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-3 bg-white">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-2.5 flex flex-col ${
                  m.role === "assistant" ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`max-w-full px-2.5 py-2 rounded-lg whitespace-pre-wrap text-sm ${
                    m.role === "assistant"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-[#804dee] text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <Loading />}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-3 border-t bg-gray-50"
          >
            <input
              aria-label="Ask a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this site..."
              className="flex-1 p-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 rounded-lg bg-[#804dee] text-white font-semibold disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>

      {/* Toggle button */}
      <div className="flex items-center justify-end relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen((s) => !s)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#804dee] to-[#a366ff] text-white shadow-[0_10px_30px_rgba(128,77,238,0.18)] flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-200"
          initial={{ scale: 1 }}
          animate={
            isOpen ? { rotate: 45, scale: 0.98 } : { rotate: 0, scale: 1 }
          }
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
        >
          <motion.span
            className="flex items-center justify-center"
            key={isOpen ? "open" : "closed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <RobotIcon size={24} />
            )}
          </motion.span>

          {/* unread indicator */}
          {messages.length > 2 && !isOpen && (
            <span className="absolute -top-0.5 -right-0.5 inline-flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5a5f] border-2 border-white" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
