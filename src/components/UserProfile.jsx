import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Settings, Shield, Bell, LogOut, Code } from 'lucide-react';

const UserProfile = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl z-[110] overflow-hidden border border-slate-100 dark:border-slate-800"
                    >
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 relative bg-brand-pastel/10 dark:bg-brand-burgundy/20">
                            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-xl mb-4 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white">Felix Cognition</h3>
                                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Tier: Enterprise Architect</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-2">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                    <User size={20} className="group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors" />
                                    <span className="text-sm font-medium">Personal Information</span>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                    <Shield size={20} className="group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors" />
                                    <span className="text-sm font-medium">Privacy & Security</span>
                                </div>
                            </button>

                            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                    <Settings size={20} className="group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors" />
                                    <span className="text-sm font-medium">System Preferences</span>
                                </div>
                            </button>

                            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                    <Code size={20} className="group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors" />
                                    <span className="text-sm font-medium">API Tokens</span>
                                </div>
                            </button>
                        </div>

                        <div className="p-8 pt-4">
                            <button className="w-full py-4 bg-brand-burgundy text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-burgundy/20 flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all">
                                <LogOut size={18} />
                                TERMINATE_SESSION
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default UserProfile;
