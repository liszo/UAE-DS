'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Product {
  name: string;
  price: string;
  benefits: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Welches Protein für Muskelaufbau?",
  "Beste Supplements für Anfänger?",
  "Laktosefreie Proteine verfügbar?",
  "Pre-Workout Empfehlung?"
];

function parseProducts(text: string): { products: Product[], cleanText: string } {
  const productRegex = /PRODUCT:\s*([^|]+)\s*\|\s*PRICE:\s*([^|]+)\s*\|\s*BENEFITS:\s*([^\n]+)/g;
  const products: Product[] = [];
  let match;
  
  while ((match = productRegex.exec(text)) !== null) {
    products.push({
      name: match[1].trim(),
      price: match[2].trim(),
      benefits: match[3].split(',').map(b => b.trim()).filter(Boolean)
    });
  }
  
  const cleanText = text.replace(productRegex, '').trim();
  return { products, cleanText };
}

export default function BodylabChatWidget({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hallo! 👋 Ich bin dein Bodylab24 AI Berater. Wie kann ich dir bei der Auswahl von Sport Supplements helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://bodylab-chatbot-api.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          history: messages.slice(-6).map(m => ({
            user: m.role === 'user' ? m.content : '',
            assistant: m.role === 'assistant' ? m.content : ''
          })).filter(h => h.user || h.assistant)
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuche es erneut.' 
      }]);
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl h-[700px] flex flex-col border border-cyan-500/30 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] animate-gradient p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-3xl">💪</span>
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-xl">Bodylab24 AI Berater</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-cyan-100 text-sm">Online • Sport Supplement Experte</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-white hover:bg-white/20 rounded-xl p-2 transition-all hover:rotate-90 duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-3`}
                  >
                    {msg.role === 'user' ? (
                      <div className="max-w-[85%] rounded-2xl p-5 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-w-[85%] bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl p-5 shadow-lg">
                          <div className="flex items-center gap-2 mb-2 text-cyan-400">
                            <span className="text-lg">🤖</span>
                            <span className="text-xs font-semibold">AI Assistant</span>
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed">{parseProducts(msg.content).cleanText}</p>
                        </div>
                        
                        {parseProducts(msg.content).products.map((product, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="w-full max-w-[85%] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-xl p-4 cursor-pointer transition-all"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-white text-lg">{product.name}</h4>
                              <span className="text-cyan-400 font-bold text-xl ml-4">{product.price}</span>
                            </div>
                            <ul className="space-y-2">
                              {product.benefits.map((benefit, i) => (
                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 text-sm">Denkt nach...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pb-4">
                <p className="text-slate-400 text-sm mb-3 font-medium">💡 Beliebte Fragen:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(q)}
                      className="text-sm px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl transition-all border border-slate-700 hover:border-cyan-500/50"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="p-6 border-t border-slate-700 bg-slate-900/80 backdrop-blur">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Stelle deine Frage über Supplements..."
                  disabled={loading}
                  className="flex-1 bg-slate-800 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700 placeholder-slate-500 disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}