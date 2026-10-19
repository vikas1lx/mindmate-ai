/**
 * ChatPanel.jsx
 * Slide-in chat panel that opens from the right side.
 * Pre-loads a topic when opened from a support mode card.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateChatReply } from '../data/aiResponses';

const INITIAL_MESSAGE = (topic) => ({
  id: 0,
  role: 'ai',
  text: topic
    ? `Hi 👋 I'm MindMate. I see you want to talk about **${topic}** — I'm here and I'm listening. What's going on?`
    : "Hi 👋 I'm MindMate, your AI wellness companion. What's on your mind today? I'm here to listen.",
  time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
});

export default function ChatPanel() {
  const { chatOpen, setChatOpen, chatTopic } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Reset messages when topic changes
  useEffect(() => {
    if (chatOpen) {
      setMessages([INITIAL_MESSAGE(chatTopic)]);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [chatOpen, chatTopic]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await generateChatReply(text);
    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      text: reply,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setChatOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[380px] z-50 flex flex-col bg-white dark:bg-slate-900 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-violet-600 to-purple-700">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">MindMate AI</p>
                <p className="text-xs text-violet-200">Here to listen 💜</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="ml-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Topic pill */}
            {chatTopic && (
              <div className="px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-100 dark:border-violet-800">
                <span className="text-xs text-violet-600 dark:text-violet-400">
                  Talking about: <strong>{chatTopic}</strong>
                </span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Brain size={13} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet-500 text-white rounded-tr-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                    <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-violet-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* AI typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <Brain size={13} className="text-white" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                        className="w-2 h-2 rounded-full bg-slate-400"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message…"
                  disabled={loading}
                  className="flex-1 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all shadow"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                AI responses are for support only. Not medical advice.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
