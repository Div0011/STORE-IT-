import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X, Brain } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, aiData }) => {
    const icons = {
        success: <CheckCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />,
        ai: <Brain size={20} className="animate-pulse" />
    };

    const colors = {
        success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400',
        warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
        ai: 'bg-brand-pastel/20 dark:bg-brand-burgundy/20 border-brand-pastel dark:border-brand-burgundy text-brand-burgundy dark:text-brand-pastel'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md ${colors[type]}`}
        >
            <div className="mt-0.5">{icons[type]}</div>
            <div className="flex-1">
                <p className="font-bold text-sm">{message}</p>
                {aiData && (
                    <div className="mt-2 space-y-1">
                        {aiData.document_type && (
                            <p className="text-xs opacity-80">
                                <span className="font-mono">Type:</span> {aiData.document_type}
                            </p>
                        )}
                        {aiData.pii_detected && aiData.pii_detected.length > 0 && (
                            <p className="text-xs opacity-80">
                                <span className="font-mono">PII:</span> {aiData.pii_detected.join(', ')}
                            </p>
                        )}
                        {aiData.sensitivity_level && (
                            <p className="text-xs opacity-80">
                                <span className="font-mono">Sensitivity:</span> {aiData.sensitivity_level}/5
                            </p>
                        )}
                    </div>
                )}
            </div>
            <button
                onClick={onClose}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-[200] space-y-3 max-w-md">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        aiData={toast.aiData}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
