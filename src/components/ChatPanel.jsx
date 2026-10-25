/**
 * ChatPanel.jsx
 * Slide-in AI Companion Chat Panel (styled in dark premium navy & cyan glow):
 * - Auto-loads topic and any initial query sent from the search bar or mode detail modal
 * - Streaming/typing animation
 * - Safe crisis detection
 * - Audio/text support
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Brain, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateChatReply, detectCrisis } from '../data/aiResponses';

const INITIAL_MESSAGE = (topic, customInitial) => {
  if (customInitial) {
    return {
      id: 0,
      role: 'ai',
      text: `Hi 👋 I received your note: "${customInitial}". I'm here to support you through this. How can we make things feel 5% more manageable right now?`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
  }
  return {
    id: 0,
    role: 'ai',
    text: topic
      ? `Hi 👋 I see you want to talk about **${topic}**. I am listening with an open mind. What is feeling heaviest about this today?`
      : "Hi 👋 I'm MindMate, your 3D AI companion. What's on your mind today? I'm here to listen without judgment.",
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  };
};

export default function ChatPanel() {
  const { chatOpen, setChatOpen, chatTopic, initialChatMessage, triggerCrisisAlert } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize when panel opens or topic changes
  useEffect(() => {
    if (chatOpen) {
      setMessages([INITIAL_MESSAGE(chatTopic, initialChatMessage)]);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [chatOpen, chatTopic, initialChatMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Check crisis in chat input
    if (detectCrisis(text)) {
      triggerCrisisAlert();
    }

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await generateChatReply(text);
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: "I'm having a brief connection pause, but I'm still here with you. Please try sending your message again.",
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-50 flex flex-col bg-[#0A1630] border-l border-[#3B82F6]/30 shadow-[0_0_60px_rgba(0,0,0,0.8)] text-[#E6EDFF]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/20 bg-[#0F1D3D]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,211,238,0.35)]">
                  <Brain size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                    MindMate AI <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Live</span>
                  </p>
                  <p className="text-xs text-[#8FA3C7]">Empathetic companion · Private</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#0A1630] hover:bg-[#3B82F6]/20 flex items-center justify-center text-[#8FA3C7] hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>

            {/* Active Topic Banner */}
            {chatTopic && (
              <div className="px-4 py-2 bg-[#0F1D3D]/60 border-b border-[#3B82F6]/15 flex items-center gap-2">
                <Sparkles size={13} className="text-cyan-400" />
                <span className="text-xs text-[#8FA3C7]">
                  Focus topic: <strong className="text-cyan-300">{chatTopic}</strong>
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                      <Brain size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-[#0F1D3D] border border-[#3B82F6]/20 text-[#E6EDFF] rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                    <p
                      className={`text-[10px] mt-1.5 ${
                        msg.role === 'user' ? 'text-blue-200' : 'text-[#8FA3C7]'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Brain size={14} className="text-white" />
                  </div>
                  <div className="bg-[#0F1D3D] border border-[#3B82F6]/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                        className="w-2 h-2 rounded-full bg-cyan-400"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[#3B82F6]/20 bg-[#0F1D3D]/80">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Share what's on your mind…"
                  disabled={loading}
                  className="flex-1 text-sm rounded-xl glass-input px-4 py-3 text-[#E6EDFF] placeholder-[#8FA3C7]/60"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex-shrink-0"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="text-[10px] text-[#8FA3C7] mt-2 text-center">
                AI support only · Not medical advice · Crisis helpline: <strong>14416</strong>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
