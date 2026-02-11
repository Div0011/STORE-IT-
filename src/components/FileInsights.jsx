import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, FileText, Tag, Sparkles, Clock, Globe, Shield,
    Download, Trash, Share, ChevronRight, Search, Zap, AlertTriangle, Brain
} from 'lucide-react';

const FileInsights = ({ isOpen, onClose, fileData, onShowToast, onRefresh }) => {
    const [similarity, setSimilarity] = useState(50);
    const [isRedacting, setIsRedacting] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRescanning, setIsRescanning] = useState(false);

    // Fetch AI analysis when file data changes
    useEffect(() => {
        if (fileData && isOpen) {
            setAiAnalysis(fileData);
        }
    }, [fileData, isOpen]);

    const getSensitivityColor = (level) => {
        if (level >= 4) return 'text-red-500 bg-red-50 border-red-100';
        if (level >= 3) return 'text-amber-500 bg-amber-50 border-amber-100';
        return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    };

    const getSensitivityLabel = (level) => {
        if (level >= 4) return 'High Risk';
        if (level >= 3) return 'Elevated';
        if (level >= 2) return 'Moderate';
        return 'Low';
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
                        className="fixed inset-0 bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-[2px] z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-950 z-[70] shadow-2xl flex flex-col border-l border-slate-100 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-brand-pastel/30 dark:bg-brand-burgundy/30 text-brand-burgundy dark:text-brand-pastel shadow-sm">
                                    <Brain size={20} />
                                </div>
                                <div>
                                    <h2 className="font-heading font-bold text-slate-800 dark:text-white tracking-tight">AI Insights Engine</h2>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Gemini-Powered Analysis</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* AI Summary section */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-brand-burgundy dark:text-brand-pastel">
                                    <Sparkles size={16} />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">AI-Generated Summary</h3>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <Sparkles size={60} />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed relative z-10">
                                        {aiAnalysis?.summary || "This document appears to be a standard file. Upload a document to see AI-powered insights."}
                                    </p>

                                    {aiAnalysis?.document_type && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest mb-2">Document Type</p>
                                            <p className="text-brand-burgundy dark:text-brand-pastel font-bold text-sm">{aiAnalysis.document_type || aiAnalysis.type}</p>
                                        </div>
                                    )}

                                    {aiAnalysis?.sensitivity_level && (
                                        <div className="mt-3">
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest mb-2">Sensitivity Level</p>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${getSensitivityColor(aiAnalysis.sensitivity_level)}`}>
                                                {getSensitivityLabel(aiAnalysis.sensitivity_level)} ({aiAnalysis.sensitivity_level}/5)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* PII Detection Section */}
                            {aiAnalysis?.pii_types && aiAnalysis.pii_types.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-4 text-amber-500">
                                        <AlertTriangle size={16} />
                                        <h3 className="text-xs font-bold uppercase tracking-widest">Detected PII</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {aiAnalysis.pii_types.map((pii, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl group hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <Shield size={14} className="text-amber-500" />
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{pii}</p>
                                                </div>
                                                <span className="text-[8px] font-mono text-amber-400 dark:text-amber-600">SENSITIVE</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Tags Section */}
                            {aiAnalysis?.tags && aiAnalysis.tags.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-4 text-slate-400 dark:text-slate-500">
                                        <Tag size={16} />
                                        <h3 className="text-xs font-bold uppercase tracking-widest">AI-Generated Tags</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-brand-pastel/20 dark:bg-brand-burgundy/20 text-brand-burgundy dark:text-brand-pastel text-xs font-bold rounded-xl border border-brand-pastel/30 dark:border-brand-burgundy/30">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* File Metadata */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 text-slate-400 dark:text-slate-500">
                                    <FileText size={16} />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">File Metadata</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border-b border-slate-50 dark:border-slate-800">
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-widest">Filename</p>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{aiAnalysis?.name || 'Unknown'}</p>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border-b border-slate-50 dark:border-slate-800">
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-widest">Size</p>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{aiAnalysis?.size || 'Unknown'}</p>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border-b border-slate-50 dark:border-slate-800">
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-widest">Status</p>
                                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 border border-emerald-100 dark:border-emerald-900/30">
                                            Sharded & Replicated
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Auto Redact Toggle */}
                            <section className="bg-brand-burgundy/5 dark:bg-brand-burgundy/10 p-6 rounded-[2rem] border border-brand-burgundy/10 dark:border-brand-burgundy/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl transition-all ${isRedacting ? 'bg-brand-burgundy text-white' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>
                                            <Shield size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Privacy Guard</p>
                                            <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Auto-Redact PII</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsRedacting(!isRedacting)}
                                        className={`w-10 h-6 rounded-full relative transition-all ${isRedacting ? 'bg-brand-burgundy' : 'bg-slate-200 dark:bg-slate-700'}`}
                                    >
                                        <motion.div
                                            animate={{ x: isRedacting ? 18 : 3 }}
                                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                                        />
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20 backdrop-blur-md space-y-3">
                            <button
                                onClick={async () => {
                                    if (!aiAnalysis?.id || isRescanning) return;

                                    try {
                                        setIsRescanning(true);
                                        const response = await fetch(`http://localhost:8000/rescan/${aiAnalysis.id}`, {
                                            method: 'POST'
                                        });

                                        const result = await response.json();

                                        if (response.ok) {
                                            onShowToast?.('File rescanned successfully!', 'success', result.analysis);
                                            onClose();
                                            onRefresh?.();
                                        } else {
                                            onShowToast?.('Rescan failed: ' + result.message, 'warning');
                                        }
                                    } catch (err) {
                                        console.error('Rescan error:', err);
                                        onShowToast?.('Rescan failed. Please try again.', 'warning');
                                    } finally {
                                        setIsRescanning(false);
                                    }
                                }}
                                disabled={isRescanning}
                                className="w-full py-5 bg-brand-burgundy text-white font-heading font-bold text-sm rounded-3xl shadow-xl shadow-brand-burgundy/20 hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRescanning ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        RESCANNING...
                                    </>
                                ) : (
                                    <>
                                        <Brain size={18} />
                                        RESCAN WITH AI
                                    </>
                                )}
                            </button>

                            <button
                                onClick={async () => {
                                    if (!aiAnalysis?.id || isDeleting) return;

                                    const confirmed = confirm(`Are you sure you want to delete "${aiAnalysis.name}"? This action cannot be undone.`);
                                    if (!confirmed) return;

                                    try {
                                        setIsDeleting(true);
                                        const response = await fetch(`http://localhost:8000/delete/${aiAnalysis.id}`, {
                                            method: 'DELETE'
                                        });

                                        const result = await response.json();

                                        if (response.ok) {
                                            onShowToast?.('File deleted successfully!', 'success');
                                            onClose();
                                            onRefresh?.();
                                        } else {
                                            onShowToast?.('Delete failed: ' + result.message, 'warning');
                                        }
                                    } catch (err) {
                                        console.error('Delete error:', err);
                                        onShowToast?.('Delete failed. Please try again.', 'warning');
                                    } finally {
                                        setIsDeleting(false);
                                    }
                                }}
                                disabled={isDeleting}
                                className="w-full py-5 bg-red-500 text-white font-heading font-bold text-sm rounded-3xl shadow-xl shadow-red-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        DELETING...
                                    </>
                                ) : (
                                    <>
                                        <Trash size={18} />
                                        DELETE FILE
                                    </>
                                )}
                            </button>

                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-brand-pastel transition-all flex items-center justify-center gap-2">
                                    <Download size={14} />
                                    Download
                                </button>
                                <button className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-brand-pastel transition-all flex items-center justify-center gap-2">
                                    <Share size={14} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FileInsights;
