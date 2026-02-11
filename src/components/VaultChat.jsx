import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, FileText, Database, Shield } from 'lucide-react';

const VaultChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! I am your Store It! Cognitive Assistant. I have indexed all your files. What would you like to know about your vault today?' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: input })
            });

            if (!response.ok) throw new Error('Gateway Offline');

            const result = await response.json();

            setMessages(prev => [...prev, {
                role: 'ai',
                content: typeof result === 'string' ? result : result.answer,
                sources: result.sources || []
            }]);
        } catch (error) {
            console.error('[VaultChat] Error:', error);
            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'ERROR: The Cognitive Gateway is unreachable. Please verify that the backend is running.'
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[80]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white dark:bg-slate-950 z-[90] shadow-2xl flex flex-col border-l border-slate-100 dark:border-slate-800"
                    >
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-brand-burgundy text-white shadow-lg shadow-brand-burgundy/20">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-800 dark:text-white">VAULT_CHAT_v1.0</h3>
                                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">RAG: ENABLED | LATENCY: 24ms</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-brand-burgundy text-white rounded-tr-none'
                                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                        {msg.sources && (
                                            <div className="mt-4 pt-3 border-t border-slate-200/50 flex flex-col gap-2">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                                    <Database size={10} /> Referenced Blocks:
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {msg.sources.map(src => (
                                                        <div key={src} className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] text-brand-burgundy font-medium">
                                                            <FileText size={10} /> {src}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <motion.div className="flex justify-start">
                                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ delay: i * 0.2, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 rounded-full bg-brand-burgundy/30"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">Scanning Shards...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="p-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything about your files..."
                                    className="w-full pl-6 pr-16 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-burgundy/20 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-2 w-10 h-10 bg-brand-burgundy text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-burgundy/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-6 opacity-30">
                                <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest">
                                    <Shield size={10} /> End-to-End Encrypted
                                </div>
                                <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest">
                                    <Database size={10} /> Vector DB Indexed
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VaultChat;
