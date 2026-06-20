import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  ExternalLink,
  Phone,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// ─────────────────────────────────────────────
// Utility: parse simple markdown links [text](url) and render as anchor tags
// ─────────────────────────────────────────────
function renderMessageContent(text) {
  // Match [text](url) patterns
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'link', content: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  if (parts.length === 0) return <span>{text}</span>;

  return (
    <>
      {parts.map((part, i) =>
        part.type === 'link' ? (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors duration-150"
          >
            {part.content}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// AI Chatbot Widget
// ─────────────────────────────────────────────
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Greetings. I am **J.A.R.V.I.S.**, the advanced digital intelligence system for LACSO HUB.\n\nMy protocols are fully online. You may inquire about our [services](/services), [pricing](/pricing), or any aspect of our operations.",
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: data.reply || data.message || "I'm sorry, I didn't understand that. Could you rephrase?",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: "Oops! I'm having trouble connecting right now. Please try again or [contact us](mailto:lacsohub@gmail.com) directly.",
        time: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[520px] flex flex-col rounded-xl border border-cyan-500/30 bg-[#040814]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 flex-shrink-0">
              {/* Shimmer line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] border-2 border-[#040814]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold tracking-widest text-cyan-100 uppercase">J.A.R.V.I.S.</p>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-cyan-500">System Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                      msg.role === 'bot'
                        ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                        : 'border-blue-500/30 bg-blue-500/10'
                    }`}
                  >
                    {msg.role === 'bot' ? (
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-lg text-sm leading-relaxed border backdrop-blur-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-50 rounded-tr-none'
                          : msg.isError
                          ? 'bg-red-500/10 border-red-500/30 text-red-200 rounded-tl-none'
                          : 'bg-cyan-900/20 border-cyan-500/30 text-cyan-50 shadow-[inset_0_0_15px_rgba(34,211,238,0.05)] rounded-tl-none'
                      }`}
                    >
                      {renderMessageContent(msg.text)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-cyan-600/50 px-1">{formatTime(msg.time)}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="px-4 py-3 rounded-lg rounded-tl-none bg-cyan-900/20 border border-cyan-500/30 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 px-4 py-3 border-t border-cyan-500/20 bg-[#02040a]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Query system..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 resize-none bg-cyan-950/20 border border-cyan-500/30 rounded-lg px-3.5 py-2.5 text-sm text-cyan-50 placeholder-cyan-700 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/30 transition-all duration-200 disabled:opacity-50 max-h-24 scrollbar-thin scrollbar-thumb-cyan-500/20"
                  style={{ minHeight: '40px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-[#02040a] transition-all duration-200 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 px-1">
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="w-1 h-1 bg-cyan-500/50 rounded-full" />
                  <span className="w-1 h-1 bg-cyan-500/20 rounded-full" />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-cyan-600/60">
                  Secure Connection Established
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Chat Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-16 right-4 sm:right-6 z-50 w-14 h-14 rounded-full group"
        aria-label="Open AI Chat"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Iron Man Arc Reactor Glow effect */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/40 transition-colors duration-500" />
          
          {/* Outer spinning ring */}
          <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] animate-[spin_4s_linear_infinite] opacity-60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="10 4 2 4" />
          </svg>
          
          {/* Inner pulsating ring */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite_reverse] opacity-80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="30 10" />
          </svg>

          {/* Core button */}
          <div className="relative w-full h-full rounded-full border border-cyan-300/50 bg-[#020617] flex items-center justify-center shadow-[inset_0_0_15px_rgba(34,211,238,0.5)] z-10 overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10" />
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="x"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bot className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </>
  );
}

// ─────────────────────────────────────────────
// WhatsApp Float Button
// ─────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/918866371807?text=Hi%20LACSO%20HUB%2C%20I%27m%20interested%20in%20your%20services!"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 280, damping: 22 }}
      className="fixed bottom-4 right-4 sm:right-6 z-50 w-12 h-12 rounded-2xl bg-[#25D366] hover:bg-[#20c05c] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] transition-all duration-300"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-6 h-6"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// Layout — Root Wrapper
// ─────────────────────────────────────────────
export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <WhatsAppFloat />
      <AIChatbot />
    </div>
  );
}
